// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SponsorPool
 * @notice Manages sponsor-funded budgets with three independent accounting buckets on Fuji C-Chain:
 * 1. principalBudget: Funds Yield Chests (1 USDC) and Sponsor Chests (2 USDC).
 * 2. questBudget: Funds Quest Chest tutorial grants by tier (0.5, 1, 2, 3 USDC).
 * 3. rewardReserve: Backs simulated APR yields when users withdraw from YieldVault.
 *
 * @dev Enforces strict financial invariants:
 * - Allocations and payouts never exceed the remaining balance of each respective bucket.
 * - Only authorized callers (Gateway, QuestRouter, Vault) can allocate or draw from respective buckets.
 */
contract SponsorPool is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant QUEST_ROUTER_ROLE = keccak256("QUEST_ROUTER_ROLE");
    bytes32 public constant VAULT_ROLE = keccak256("VAULT_ROLE");

    enum BudgetType {
        PRINCIPAL,
        QUEST,
        REWARD
    }

    IERC20 public immutable usdc;

    // Remaining available balances in each bucket
    uint256 public principalBudget;
    uint256 public questBudget;
    uint256 public rewardReserve;

    // Cumulative accounting for auditing & invariant verification
    uint256 public totalPrincipalFunded;
    uint256 public totalPrincipalAllocated;
    uint256 public totalQuestFunded;
    uint256 public totalQuestAllocated;
    uint256 public totalRewardFunded;
    uint256 public totalRewardPaid;

    event BudgetFunded(
        BudgetType indexed budgetType,
        address indexed funder,
        uint256 amount,
        uint256 newBalance
    );

    event BudgetAllocated(
        BudgetType indexed budgetType,
        address indexed recipient,
        uint256 amount,
        uint256 remainingBalance
    );

    event RewardPaid(
        address indexed recipient,
        uint256 amount,
        uint256 remainingReserve
    );

    error ZeroAddress();
    error ZeroAmount();
    error InsufficientPrincipalBudget(uint256 requested, uint256 available);
    error InsufficientQuestBudget(uint256 requested, uint256 available);
    error InsufficientRewardReserve(uint256 requested, uint256 available);
    error InvariantViolation();

    constructor(address usdcAddress, address initialAdmin) {
        if (usdcAddress == address(0)) revert ZeroAddress();
        address admin = initialAdmin == address(0) ? msg.sender : initialAdmin;

        usdc = IERC20(usdcAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // -------------------------------------------------------------
    // Funding Operations (Funders deposit MockUSDC)
    // -------------------------------------------------------------

    /**
     * @notice Funds the principal budget bucket.
     * @param amount Amount of MockUSDC in 6 decimals.
     */
    function fundPrincipal(uint256 amount) external nonReentrant {
        if (amount == 0) revert ZeroAmount();

        principalBudget += amount;
        totalPrincipalFunded += amount;

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        emit BudgetFunded(BudgetType.PRINCIPAL, msg.sender, amount, principalBudget);
    }

    /**
     * @notice Funds the quest budget bucket.
     * @param amount Amount of MockUSDC in 6 decimals.
     */
    function fundQuest(uint256 amount) external nonReentrant {
        if (amount == 0) revert ZeroAmount();

        questBudget += amount;
        totalQuestFunded += amount;

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        emit BudgetFunded(BudgetType.QUEST, msg.sender, amount, questBudget);
    }

    /**
     * @notice Funds the reward reserve bucket.
     * @param amount Amount of MockUSDC in 6 decimals.
     */
    function fundRewards(uint256 amount) external nonReentrant {
        if (amount == 0) revert ZeroAmount();

        rewardReserve += amount;
        totalRewardFunded += amount;

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        emit BudgetFunded(BudgetType.REWARD, msg.sender, amount, rewardReserve);
    }

    /**
     * @notice Helper to fund all 3 buckets in a single transaction.
     */
    function fundAll(
        uint256 principalAmount,
        uint256 questAmount,
        uint256 rewardAmount
    ) external nonReentrant {
        uint256 total = principalAmount + questAmount + rewardAmount;
        if (total == 0) revert ZeroAmount();

        if (principalAmount > 0) {
            principalBudget += principalAmount;
            totalPrincipalFunded += principalAmount;
            emit BudgetFunded(BudgetType.PRINCIPAL, msg.sender, principalAmount, principalBudget);
        }
        if (questAmount > 0) {
            questBudget += questAmount;
            totalQuestFunded += questAmount;
            emit BudgetFunded(BudgetType.QUEST, msg.sender, questAmount, questBudget);
        }
        if (rewardAmount > 0) {
            rewardReserve += rewardAmount;
            totalRewardFunded += rewardAmount;
            emit BudgetFunded(BudgetType.REWARD, msg.sender, rewardAmount, rewardReserve);
        }

        usdc.safeTransferFrom(msg.sender, address(this), total);
    }

    // -------------------------------------------------------------
    // Allocation Operations (Restricted Roles)
    // -------------------------------------------------------------

    /**
     * @notice Allocates principal budget to YieldVault for sponsored Yield/Sponsor chests.
     * @param to Target address (typically YieldVault).
     * @param amount Amount in MockUSDC.
     */
    function allocatePrincipal(address to, uint256 amount) external onlyRole(GATEWAY_ROLE) nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        if (amount > principalBudget) {
            revert InsufficientPrincipalBudget(amount, principalBudget);
        }

        principalBudget -= amount;
        totalPrincipalAllocated += amount;

        usdc.safeTransfer(to, amount);

        emit BudgetAllocated(BudgetType.PRINCIPAL, to, amount, principalBudget);
    }

    /**
     * @notice Allocates quest budget to a player claiming their tutorial funds.
     * @param to Recipient player address.
     * @param amount Amount in MockUSDC corresponding to quest tier.
     */
    function allocateQuest(address to, uint256 amount) external nonReentrant {
        if (!hasRole(QUEST_ROUTER_ROLE, msg.sender) && !hasRole(GATEWAY_ROLE, msg.sender)) {
            revert AccessControlUnauthorizedAccount(msg.sender, QUEST_ROUTER_ROLE);
        }
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        if (amount > questBudget) {
            revert InsufficientQuestBudget(amount, questBudget);
        }

        questBudget -= amount;
        totalQuestAllocated += amount;

        usdc.safeTransfer(to, amount);

        emit BudgetAllocated(BudgetType.QUEST, to, amount, questBudget);
    }

    /**
     * @notice Pays out accrued yield rewards to a withdrawing position holder or vault.
     * @param to Recipient address (withdrawing player or YieldVault executing the withdrawal).
     * @param amount Amount of reward in MockUSDC.
     */
    function payoutReward(address to, uint256 amount) external onlyRole(VAULT_ROLE) nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        if (amount > rewardReserve) {
            revert InsufficientRewardReserve(amount, rewardReserve);
        }

        rewardReserve -= amount;
        totalRewardPaid += amount;

        usdc.safeTransfer(to, amount);

        emit RewardPaid(to, amount, rewardReserve);
        emit BudgetAllocated(BudgetType.REWARD, to, amount, rewardReserve);
    }

    // -------------------------------------------------------------
    // Views & Invariant Verification
    // -------------------------------------------------------------

    /**
     * @notice Returns current available budgets across all three buckets.
     */
    function getBudgets()
        external
        view
        returns (uint256 principal, uint256 quest, uint256 reward)
    {
        return (principalBudget, questBudget, rewardReserve);
    }

    /**
     * @notice Returns the total active budget expected across all three buckets.
     */
    function totalBudget() public view returns (uint256) {
        return principalBudget + questBudget + rewardReserve;
    }

    /**
     * @notice Verifies all solvency and accounting invariants defined in PRD Section 12.2:
     * 1. Total principal allocations <= total principal funded.
     * 2. Total quest allocations <= total quest funded.
     * 3. Total reward paid <= total reward funded.
     * 4. Token balance on contract >= sum of all remaining budgets.
     */
    function verifyInvariants() external view returns (bool) {
        if (totalPrincipalAllocated > totalPrincipalFunded) return false;
        if (totalQuestAllocated > totalQuestFunded) return false;
        if (totalRewardPaid > totalRewardFunded) return false;

        uint256 currentBalance = usdc.balanceOf(address(this));
        if (currentBalance < totalBudget()) return false;

        return true;
    }
}

