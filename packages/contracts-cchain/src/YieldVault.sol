// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SponsorPool} from "./SponsorPool.sol";

/**
 * @title YieldVault
 * @notice Core yield-bearing vault on Fuji C-Chain for DeFi Trail.
 * @dev Manages player positions (principal, accrued simulated yield, weighted APR, streak),
 * enforces restricted sponsored and quest deposits, time-weighted simulated yield accrual,
 * and ensures ONLY the position owner can withdraw their funds.
 */
contract YieldVault is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant QUEST_ROUTER_ROLE = keccak256("QUEST_ROUTER_ROLE");

    uint256 public constant QUALIFYING_ASSETS_THRESHOLD = 1_000_000; // 1 MockUSDC (6 decimals)
    uint256 public constant SECONDS_PER_YEAR = 365 days; // 31,536,000 seconds
    uint256 public constant BPS_DENOMINATOR = 10_000;

    struct Position {
        uint256 principal;
        uint256 accruedReward;
        uint32 weightedAprBps;
        uint64 lastAccruedAt;
        uint64 qualifyingSince;
    }

    struct PositionView {
        uint256 principal;
        uint256 accruedReward;
        uint256 pendingReward;
        uint256 totalAssets;
        uint32 weightedAprBps;
        uint32 positionStreak;
        uint64 qualifyingSince;
        uint64 lastAccruedAt;
    }

    struct PositionSnapshot {
        bytes32 requestId;
        address player;
        uint256 principal;
        uint256 accruedReward;
        uint32 weightedAprBps;
        uint32 positionStreak;
        uint64 updatedAt;
        bool questCompleted;
    }

    IERC20 public immutable usdc;
    SponsorPool public immutable sponsorPool;

    // Mapping from player address to their position
    mapping(address => Position) public positions;

    // Cumulative stats
    uint256 public totalPrincipalDeposited;
    uint256 public totalAccruedReward;

    event PositionDeposited(
        address indexed player,
        uint256 amount,
        uint32 depositAprBps,
        uint32 newWeightedAprBps,
        uint256 totalPrincipal
    );

    event RewardAccrued(
        address indexed player,
        uint256 newReward,
        uint256 totalAccruedReward
    );

    event PositionWithdrawn(
        address indexed player,
        uint256 amount,
        uint256 principalWithdrawn,
        uint256 rewardWithdrawn,
        uint256 remainingPrincipal,
        uint256 remainingAccruedReward
    );

    error ZeroAddress();
    error ZeroAmount();
    error InsufficientPositionBalance(uint256 requested, uint256 available);

    constructor(
        address usdcAddress,
        address payableSponsorPool,
        address initialAdmin
    ) {
        if (usdcAddress == address(0) || payableSponsorPool == address(0)) {
            revert ZeroAddress();
        }
        address admin = initialAdmin == address(0) ? msg.sender : initialAdmin;

        usdc = IERC20(usdcAddress);
        sponsorPool = SponsorPool(payableSponsorPool);

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // -------------------------------------------------------------
    // Deposit Operations
    // -------------------------------------------------------------

    /**
     * @notice Deposits sponsored principal funded by SponsorPool on behalf of player.
     * @dev Restricted strictly to CChainICMGateway.
     * @param player Recipient player.
     * @param amount Principal amount in MockUSDC.
     * @param aprBps Simulated APR in basis points (e.g. 500 = 5.00%).
     */
    function depositSponsored(
        address player,
        uint256 amount,
        uint32 aprBps
    ) external onlyRole(GATEWAY_ROLE) nonReentrant {
        _deposit(player, amount, aprBps);
    }

    /**
     * @notice Deposits principal from QuestRouter on behalf of player completing quest.
     * @dev Restricted strictly to QuestRouter.
     * @param player Recipient player.
     * @param amount Principal amount in MockUSDC.
     * @param aprBps Simulated APR in basis points.
     */
    function depositForQuest(
        address player,
        uint256 amount,
        uint32 aprBps
    ) external onlyRole(QUEST_ROUTER_ROLE) nonReentrant {
        usdc.safeTransferFrom(player, address(this), amount);
        _deposit(player, amount, aprBps);
    }

    function _deposit(
        address player,
        uint256 amount,
        uint32 aprBps
    ) internal {
        if (player == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();

        // 1. Accrue prior rewards before modifying principal
        _accrueReward(player);

        Position storage pos = positions[player];

        // 2. Compute weighted APR: (P_old * APR_old + P_new * APR_new) / (P_old + P_new)
        if (pos.principal == 0) {
            pos.weightedAprBps = aprBps;
        } else {
            pos.weightedAprBps = uint32(
                (pos.principal * pos.weightedAprBps + amount * aprBps) /
                    (pos.principal + amount)
            );
        }

        // 3. Update principal & timestamp
        pos.principal += amount;
        totalPrincipalDeposited += amount;
        pos.lastAccruedAt = uint64(block.timestamp);

        // 4. Update qualifyingSince if crossing threshold for first time
        if (
            pos.principal + pos.accruedReward >= QUALIFYING_ASSETS_THRESHOLD &&
            pos.qualifyingSince == 0
        ) {
            pos.qualifyingSince = uint64(block.timestamp);
        }

        emit PositionDeposited(
            player,
            amount,
            aprBps,
            pos.weightedAprBps,
            pos.principal
        );
    }

    // -------------------------------------------------------------
    // Reward Accrual
    // -------------------------------------------------------------

    /**
     * @notice Accrues pending simulated yield rewards for player.
     * @dev Can be invoked publicly (e.g. UI refresh or contract interactions).
     * Yield calculation: (principal * weightedAprBps * elapsedSeconds) / (10000 * 365 days)
     * Payout is capped by remaining available rewardReserve in SponsorPool.
     */
    function accrueReward(address player) public nonReentrant returns (uint256) {
        return _accrueReward(player);
    }

    function _accrueReward(address player) internal returns (uint256) {
        Position storage pos = positions[player];

        if (pos.principal == 0 || pos.weightedAprBps == 0 || pos.lastAccruedAt == 0) {
            pos.lastAccruedAt = uint64(block.timestamp);
            return 0;
        }

        uint256 elapsed = block.timestamp > pos.lastAccruedAt
            ? block.timestamp - pos.lastAccruedAt
            : 0;

        if (elapsed == 0) {
            return 0;
        }

        // Calculate gross reward
        uint256 grossReward = (pos.principal * pos.weightedAprBps * elapsed) /
            (BPS_DENOMINATOR * SECONDS_PER_YEAR);

        pos.lastAccruedAt = uint64(block.timestamp);

        if (grossReward == 0) {
            return 0;
        }

        // Enforce rewardReserve solvency cap from SponsorPool
        uint256 poolReserve = sponsorPool.rewardReserve();
        uint256 availableReserve = poolReserve > totalAccruedReward
            ? poolReserve - totalAccruedReward
            : 0;

        uint256 reward = grossReward > availableReserve ? availableReserve : grossReward;

        pos.accruedReward += reward;
        totalAccruedReward += reward;

        // Check qualifyingSince
        if (
            pos.principal + pos.accruedReward >= QUALIFYING_ASSETS_THRESHOLD &&
            pos.qualifyingSince == 0
        ) {
            pos.qualifyingSince = uint64(block.timestamp);
        }

        if (reward > 0) {
            emit RewardAccrued(player, reward, pos.accruedReward);
        }

        return reward;
    }

    // -------------------------------------------------------------
    // Withdrawal Operations
    // -------------------------------------------------------------

    /**
     * @notice Withdraws principal and/or accrued rewards.
     * @dev Invariant: ONLY the position owner (msg.sender) can withdraw their funds.
     * Tokens are sent directly to msg.sender.
     * Rewards are drawn from SponsorPool rewardReserve; principal is returned from YieldVault balance.
     * @param amount Amount in MockUSDC (6 decimals) to withdraw.
     */
    function withdraw(
        uint256 amount
    ) external nonReentrant returns (uint256 principalWithdrawn, uint256 rewardWithdrawn) {
        address player = msg.sender;
        if (amount == 0) revert ZeroAmount();

        // 1. Accrue any pending rewards before calculation
        _accrueReward(player);

        Position storage pos = positions[player];
        uint256 totalAssets = pos.principal + pos.accruedReward;

        if (amount > totalAssets) {
            revert InsufficientPositionBalance(amount, totalAssets);
        }

        // 2. Order of withdrawal: reward first, remainder from principal
        if (amount <= pos.accruedReward) {
            rewardWithdrawn = amount;
            principalWithdrawn = 0;
        } else {
            rewardWithdrawn = pos.accruedReward;
            principalWithdrawn = amount - rewardWithdrawn;
        }

        // 3. Update state
        pos.accruedReward -= rewardWithdrawn;
        pos.principal -= principalWithdrawn;
        totalAccruedReward -= rewardWithdrawn;
        totalPrincipalDeposited -= principalWithdrawn;

        if (pos.principal == 0) {
            pos.weightedAprBps = 0;
        }

        // 4. Update streak qualifying state (PRD 5.4: when assets < 1 USDC, reset qualifyingSince)
        uint256 newTotalAssets = pos.principal + pos.accruedReward;
        if (newTotalAssets < QUALIFYING_ASSETS_THRESHOLD) {
            pos.qualifyingSince = 0;
        }

        // 5. Transfer funds: reward from SponsorPool, total to msg.sender
        if (rewardWithdrawn > 0) {
            sponsorPool.payoutReward(address(this), rewardWithdrawn);
        }

        usdc.safeTransfer(player, amount);

        emit PositionWithdrawn(
            player,
            amount,
            principalWithdrawn,
            rewardWithdrawn,
            pos.principal,
            pos.accruedReward
        );
    }

    // -------------------------------------------------------------
    // Views & Snapshot Helpers
    // -------------------------------------------------------------

    /**
     * @notice Returns lazy streak in continuous 24h periods since qualifyingSince.
     */
    function calculateStreak(address player) public view returns (uint32) {
        Position storage pos = positions[player];
        if (pos.qualifyingSince == 0) return 0;
        if (pos.principal + pos.accruedReward < QUALIFYING_ASSETS_THRESHOLD) return 0;
        if (block.timestamp <= pos.qualifyingSince) return 0;
        return uint32((block.timestamp - pos.qualifyingSince) / 1 days);
    }

    /**
     * @notice Preview pending unaccrued rewards capped by available reserve.
     */
    function pendingReward(address player) public view returns (uint256) {
        Position storage pos = positions[player];
        if (pos.principal == 0 || pos.weightedAprBps == 0 || pos.lastAccruedAt == 0) {
            return 0;
        }
        uint256 elapsed = block.timestamp > pos.lastAccruedAt
            ? block.timestamp - pos.lastAccruedAt
            : 0;
        if (elapsed == 0) return 0;

        uint256 gross = (pos.principal * pos.weightedAprBps * elapsed) /
            (BPS_DENOMINATOR * SECONDS_PER_YEAR);

        uint256 poolReserve = sponsorPool.rewardReserve();
        uint256 availableReserve = poolReserve > totalAccruedReward
            ? poolReserve - totalAccruedReward
            : 0;

        return gross > availableReserve ? availableReserve : gross;
    }

    /**
     * @notice Returns comprehensive position information for UI and Gateway.
     */
    function getPosition(
        address player
    ) external view returns (PositionView memory viewData) {
        Position storage pos = positions[player];
        uint256 pending = pendingReward(player);

        viewData.principal = pos.principal;
        viewData.accruedReward = pos.accruedReward;
        viewData.pendingReward = pending;
        viewData.totalAssets = pos.principal + pos.accruedReward + pending;
        viewData.weightedAprBps = pos.weightedAprBps;
        viewData.positionStreak = calculateStreak(player);
        viewData.qualifyingSince = pos.qualifyingSince;
        viewData.lastAccruedAt = pos.lastAccruedAt;
    }

    /**
     * @notice Formats canonical PositionSnapshot matching PRD Section 10.1 for ICM transmission.
     */
    function getPositionSnapshot(
        bytes32 requestId,
        address player,
        bool questCompleted
    ) external view returns (PositionSnapshot memory snapshot) {
        Position storage pos = positions[player];

        snapshot.requestId = requestId;
        snapshot.player = player;
        snapshot.principal = pos.principal;
        snapshot.accruedReward = pos.accruedReward + pendingReward(player);
        snapshot.weightedAprBps = pos.weightedAprBps;
        snapshot.positionStreak = calculateStreak(player);
        snapshot.updatedAt = uint64(block.timestamp);
        snapshot.questCompleted = questCompleted;
    }
}
