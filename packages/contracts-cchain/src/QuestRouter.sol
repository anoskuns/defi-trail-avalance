// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SponsorPool} from "./SponsorPool.sol";
import {YieldVault} from "./YieldVault.sol";

interface ICChainICMGateway {
    function sendQuestCompletion(bytes32 requestId, address player) external returns (bytes32);
}

/**
 * @title QuestRouter
 * @notice Handles the complete Quest Chest tutorial lifecycle on Fuji C-Chain (PRD §4.3, §5.5, §9.2, §10.1).
 * @dev Flow:
 *   1. Gateway calls registerQuest(...) upon receiving QuestRegistration from Game L1.
 *   2. Player calls claimQuestBudget(questId) to receive tutorial funds from SponsorPool.questBudget once.
 *   3. Player approves QuestRouter for MockUSDC and calls depositForQuest(questId, requiredAmount).
 *   4. QuestRouter deposits into YieldVault for the player and triggers Gateway to send PositionSnapshot
 *      with questCompleted = true back to Game L1.
 */
contract QuestRouter is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    struct Quest {
        bytes32 requestId;
        bytes32 questId;
        address player;
        uint8 tier;
        uint256 requiredAmount;
        uint64 expiresAt;
        bool budgetClaimed;
        bool completed;
    }

    IERC20 public immutable usdc;
    SponsorPool public immutable sponsorPool;
    YieldVault public immutable yieldVault;
    address public gateway;

    mapping(bytes32 => Quest) public quests;

    event QuestRegistered(
        bytes32 indexed questId,
        bytes32 indexed requestId,
        address indexed player,
        uint8 tier,
        uint256 requiredAmount,
        uint64 expiresAt
    );
    event QuestBudgetClaimed(
        bytes32 indexed questId,
        address indexed player,
        uint256 amount
    );
    event QuestCompleted(
        bytes32 indexed questId,
        address indexed player,
        uint256 amount,
        uint32 aprBps
    );
    event GatewayConfigured(address indexed newGateway);

    error ZeroAddress();
    error ZeroAmount();
    error QuestNotFound(bytes32 questId);
    error QuestAlreadyRegistered(bytes32 questId);
    error UnauthorizedPlayer(address caller, address expected);
    error QuestExpired(uint64 expiresAt, uint64 currentTimestamp);
    error BudgetAlreadyClaimed(bytes32 questId);
    error QuestAlreadyCompleted(bytes32 questId);
    error InvalidAmount(uint256 provided, uint256 required);
    error InsufficientAllowance(uint256 currentAllowance, uint256 requiredAllowance);
    error InvalidTier(uint8 tier);

    constructor(
        address usdcAddress,
        address sponsorPoolAddress,
        address yieldVaultAddress,
        address gatewayAddress,
        address initialAdmin
    ) {
        if (
            usdcAddress == address(0) ||
            sponsorPoolAddress == address(0) ||
            yieldVaultAddress == address(0)
        ) {
            revert ZeroAddress();
        }

        usdc = IERC20(usdcAddress);
        sponsorPool = SponsorPool(sponsorPoolAddress);
        yieldVault = YieldVault(yieldVaultAddress);
        gateway = gatewayAddress;

        address admin = initialAdmin == address(0) ? msg.sender : initialAdmin;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);

        if (gatewayAddress != address(0)) {
            _grantRole(GATEWAY_ROLE, gatewayAddress);
        }
    }

    /**
     * @notice Configures or updates the CChainICMGateway address.
     * @param newGateway Address of CChainICMGateway contract.
     */
    function setGateway(address newGateway) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newGateway == address(0)) revert ZeroAddress();
        if (gateway != address(0)) {
            _revokeRole(GATEWAY_ROLE, gateway);
        }
        gateway = newGateway;
        _grantRole(GATEWAY_ROLE, newGateway);
        emit GatewayConfigured(newGateway);
    }

    /**
     * @notice Registers a new Quest received from Game L1 via CChainICMGateway.
     * @param requestId Teleporter request identifier for tracking and reconciliation.
     * @param questId Canonical quest identifier.
     * @param player Address of the player authorized to execute the quest.
     * @param tier Quest tier (1 = Common, 2 = Rare, 3 = Epic, 4 = Legendary).
     * @param requiredAmount Amount of MockUSDC required for the tutorial deposit.
     * @param expiresAt Unix timestamp after which the quest can no longer be claimed/completed.
     */
    function registerQuest(
        bytes32 requestId,
        bytes32 questId,
        address player,
        uint8 tier,
        uint256 requiredAmount,
        uint64 expiresAt
    ) public onlyRole(GATEWAY_ROLE) {
        if (questId == bytes32(0)) revert QuestNotFound(questId);
        if (player == address(0)) revert ZeroAddress();
        if (requiredAmount == 0) revert ZeroAmount();
        if (expiresAt <= block.timestamp) revert QuestExpired(expiresAt, uint64(block.timestamp));
        if (quests[questId].player != address(0)) revert QuestAlreadyRegistered(questId);
        if (tier < 1 || tier > 4) revert InvalidTier(tier);

        quests[questId] = Quest({
            requestId: requestId,
            questId: questId,
            player: player,
            tier: tier,
            requiredAmount: requiredAmount,
            expiresAt: expiresAt,
            budgetClaimed: false,
            completed: false
        });

        emit QuestRegistered(questId, requestId, player, tier, requiredAmount, expiresAt);
    }

    /**
     * @notice Overload for registerQuest using questId as requestId.
     */
    function registerQuest(
        bytes32 questId,
        address player,
        uint8 tier,
        uint256 requiredAmount,
        uint64 expiresAt
    ) external onlyRole(GATEWAY_ROLE) {
        registerQuest(questId, questId, player, tier, requiredAmount, expiresAt);
    }

    /**
     * @notice Allows the designated player to claim tutorial funds once from SponsorPool.questBudget.
     * @param questId The quest to claim funds for.
     */
    function claimQuestBudget(bytes32 questId) external nonReentrant {
        Quest storage quest = quests[questId];
        if (quest.player == address(0)) revert QuestNotFound(questId);
        if (msg.sender != quest.player) revert UnauthorizedPlayer(msg.sender, quest.player);
        if (block.timestamp > quest.expiresAt) revert QuestExpired(quest.expiresAt, uint64(block.timestamp));
        if (quest.budgetClaimed) revert BudgetAlreadyClaimed(questId);

        quest.budgetClaimed = true;

        sponsorPool.allocateQuest(quest.player, quest.requiredAmount);

        emit QuestBudgetClaimed(questId, quest.player, quest.requiredAmount);
    }

    /**
     * @notice Executes the player's tutorial deposit into YieldVault.
     * @dev Requires player to have approved MockUSDC for QuestRouter.
     *      Transfers requiredAmount from player into YieldVault, marks quest as completed,
     *      and triggers the Gateway to dispatch PositionSnapshot with questCompleted = true.
     * @param questId The quest being fulfilled.
     * @param amount Deposit amount, must exactly match quest.requiredAmount.
     */
    function depositForQuest(bytes32 questId, uint256 amount) external nonReentrant {
        Quest storage quest = quests[questId];
        if (quest.player == address(0)) revert QuestNotFound(questId);
        if (msg.sender != quest.player) revert UnauthorizedPlayer(msg.sender, quest.player);
        if (block.timestamp > quest.expiresAt) revert QuestExpired(quest.expiresAt, uint64(block.timestamp));
        if (quest.completed) revert QuestAlreadyCompleted(questId);
        if (amount != quest.requiredAmount) revert InvalidAmount(amount, quest.requiredAmount);

        uint256 allowance = usdc.allowance(msg.sender, address(this));
        if (allowance < quest.requiredAmount) {
            revert InsufficientAllowance(allowance, quest.requiredAmount);
        }

        quest.completed = true;

        // 1. Pull requiredAmount MockUSDC from player into QuestRouter
        usdc.safeTransferFrom(msg.sender, address(this), quest.requiredAmount);

        // 2. Approve YieldVault to pull tokens from QuestRouter
        SafeERC20.forceApprove(usdc, address(yieldVault), quest.requiredAmount);

        // 3. Deposit into YieldVault for the player
        uint32 aprBps = _aprForTier(quest.tier);
        yieldVault.depositForQuest(quest.player, quest.requiredAmount, aprBps);

        emit QuestCompleted(questId, quest.player, quest.requiredAmount, aprBps);

        // 4. Trigger Gateway to send PositionSnapshot with questCompleted = true to Game L1
        if (gateway != address(0)) {
            ICChainICMGateway(gateway).sendQuestCompletion(quest.requestId, quest.player);
        }
    }

    /**
     * @notice Returns the simulated APR basis points corresponding to quest tier (PRD §5.5).
     */
    function _aprForTier(uint8 tier) internal pure returns (uint32) {
        if (tier == 1) return 500;  // 5.00%
        if (tier == 2) return 625;  // 6.25%
        if (tier == 3) return 750;  // 7.50%
        return 1000;                // 10.00%
    }

    /**
     * @notice View helper to check full Quest details.
     */
    function getQuest(bytes32 questId) external view returns (Quest memory) {
        return quests[questId];
    }

    /**
     * @notice View helper to check if a quest is completed.
     */
    function isQuestCompleted(bytes32 questId) external view returns (bool) {
        return quests[questId].completed;
    }

    /**
     * @notice View helper to check if quest budget was already claimed.
     */
    function isBudgetClaimed(bytes32 questId) external view returns (bool) {
        return quests[questId].budgetClaimed;
    }
}

