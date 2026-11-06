// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title PlayerState
 * @notice Manages on-chain player state on the Avalanche Game L1.
 * @dev Stores energy, exploration metrics, and the latest PositionSnapshot
 *      bridged back from Fuji C-Chain via ICM. Only GameICMGateway may apply
 *      position snapshots. Energy refills automatically on the first action
 *      of a new 24-hour epoch.
 *
 * PRD references: §5.1 (Epoch), §5.2 (Location), §5.3 (Energy), §5.4 (Progression),
 *                 §9.2 (Contract responsibilities), §10.1 (Types)
 */
contract PlayerState is AccessControl {
    // -----------------------------------------------------------------------
    // Roles
    // -----------------------------------------------------------------------
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    // -----------------------------------------------------------------------
    // Constants — Progression
    // -----------------------------------------------------------------------
    uint256 public constant EPOCH_DURATION = 86_400; // 24 hours in seconds

    // Balance thresholds (6 decimals Mock USDC)
    uint256 public constant BALANCE_TIER1_MIN = 1_000_000;  // 1 USDC
    uint256 public constant BALANCE_TIER2_MIN = 5_000_000;  // 5 USDC
    uint256 public constant BALANCE_TIER3_MIN = 10_000_000; // 10 USDC

    // -----------------------------------------------------------------------
    // Data Structures
    // -----------------------------------------------------------------------

    /**
     * @dev Rarity levels (PRD §5.5 and §10.1).
     */
    enum Rarity { COMMON, RARE, EPIC, LEGENDARY }

    /**
     * @notice Canonical snapshot structure bridged from C-Chain (PRD §10.1).
     */
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

    /**
     * @notice Full player state stored on-chain.
     */
    struct Player {
        // Energy
        uint8 energyCurrent;
        uint64 lastEnergyEpoch; // epoch number (block.timestamp / EPOCH_DURATION)

        // Exploration & Progression
        uint32 uniqueH3Count;
        uint32 xp;
        uint32 questsCompleted;

        // Latest position snapshot from C-Chain
        uint256 principal;
        uint256 accruedReward;
        uint32 weightedAprBps;
        uint32 positionStreak;
        uint64 lastSnapshotAt;
    }

    /**
     * @notice Returns uniqueH3Count for a player (helper for external callers).
     */
    function getUniqueH3Count(address player) external view returns (uint32) {
        return players[player].uniqueH3Count;
    }

    // -----------------------------------------------------------------------
    // State
    // -----------------------------------------------------------------------

    /// @notice Mapping from player address to their state.
    mapping(address => Player) public players;

    /// @notice H3 cells opened per player (for uniqueH3Count tracking).
    mapping(address => mapping(bytes32 => bool)) public openedH3Cells;

    /// @notice Tracks whether a quest completion snapshot has already awarded XP/exploration for a requestId.
    mapping(bytes32 => bool) public completedQuestRequests;

    /// @notice Quest completion rewards (PRD §4.3, §6 FR-008).
    uint32 public constant QUEST_XP = 100;
    uint32 public constant QUEST_EXPLORATION_POINTS = 1;

    /// @dev Epoch length override (admin-only during deploy; not changeable post-deploy in public mode).
    uint256 public immutable epochSeconds;

    // -----------------------------------------------------------------------
    // Events
    // -----------------------------------------------------------------------

    event EnergyRefilled(address indexed player, uint8 newEnergy, uint64 epoch);
    event EnergyConsumed(address indexed player, uint8 remainingEnergy);
    event H3CellOpened(address indexed player, bytes32 h3Cell, uint32 totalUnique);
    event QuestRewardApplied(
        address indexed player,
        bytes32 indexed requestId,
        uint32 xpAwarded,
        uint32 totalXp,
        uint32 totalQuestsCompleted
    );
    event PlayerStatsUpdated(
        address indexed player,
        uint256 principal,
        uint256 accruedReward,
        uint8 powerLevel,
        uint8 energyMax,
        uint32 openRadius,
        Rarity rarity
    );

    // -----------------------------------------------------------------------
    // Errors
    // -----------------------------------------------------------------------

    error ZeroAddress();
    error OutOfEnergy(address player, uint8 current);
    error UnauthorizedGateway();

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    /**
     * @param epochSecs   Epoch length in seconds. Use 86400 for production.
     * @param initialAdmin Admin address. If zero, defaults to msg.sender.
     */
    constructor(uint256 epochSecs, address initialAdmin) {
        epochSeconds = epochSecs == 0 ? EPOCH_DURATION : epochSecs;
        address admin = initialAdmin == address(0) ? msg.sender : initialAdmin;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // -----------------------------------------------------------------------
    // Progression pure helpers
    // -----------------------------------------------------------------------

    /**
     * @notice Compute balance tier (0-3) from positionAssets (PRD §5.4).
     */
    function _balanceTier(uint256 assets) internal pure returns (uint8) {
        if (assets >= BALANCE_TIER3_MIN) return 3;
        if (assets >= BALANCE_TIER2_MIN) return 2;
        if (assets >= BALANCE_TIER1_MIN) return 1;
        return 0;
    }

    /**
     * @notice Compute streak tier (0-3) from positionStreak (PRD §5.4).
     */
    function _streakTier(uint32 streak) internal pure returns (uint8) {
        if (streak >= 7) return 3;
        if (streak >= 3) return 2;
        if (streak >= 1) return 1;
        return 0;
    }

    /**
     * @notice Compute power level 0-3: min(3, floor((balanceTier + streakTier) / 2)) (PRD §5.4).
     */
    function _powerLevel(uint8 bt, uint8 st) internal pure returns (uint8) {
        uint8 combined = (bt + st) / 2;
        return combined > 3 ? 3 : combined;
    }

    /**
     * @notice Compute energyMax = 3 + powerLevel (PRD §5.4).
     */
    function _energyMax(uint8 power) internal pure returns (uint8) {
        return 3 + power;
    }

    /**
     * @notice Compute open radius in metres = 30 + 5 * powerLevel (PRD §5.4).
     */
    function _openRadius(uint8 power) internal pure returns (uint32) {
        return 30 + uint32(5) * power;
    }

    /**
     * @notice Compute Compass level = 1 + powerLevel (PRD §5.4).
     */
    function _compassLevel(uint8 power) internal pure returns (uint8) {
        return 1 + power;
    }

    /**
     * @notice Compute exploration score = uniqueH3Count + min(streak, 7) + questBonus (PRD §4.3, §5.4).
     */
    function _explorationScore(uint32 uniqueH3, uint32 streak, uint32 questBonus) internal pure returns (uint32) {
        uint32 streakCapped = streak > 7 ? 7 : streak;
        return uniqueH3 + streakCapped + questBonus;
    }

    function _explorationScore(uint32 uniqueH3, uint32 streak) internal pure returns (uint32) {
        return _explorationScore(uniqueH3, streak, 0);
    }

    /**
     * @notice Map exploration score to Rarity (PRD §5.5).
     */
    function _rarity(uint32 score) internal pure returns (Rarity) {
        if (score >= 10) return Rarity.LEGENDARY;
        if (score >= 6)  return Rarity.EPIC;
        if (score >= 3)  return Rarity.RARE;
        return Rarity.COMMON;
    }

    // -----------------------------------------------------------------------
    // Energy management (internal)
    // -----------------------------------------------------------------------

    /**
     * @dev Returns current epoch number.
     */
    function _currentEpoch() internal view returns (uint64) {
        return uint64(block.timestamp / epochSeconds);
    }

    /**
     * @dev Refill energy to max if player is in a new epoch (PRD §5.3).
     *      Called before any energy-consuming action.
     */
    function _refillIfNewEpoch(address player) internal {
        Player storage p = players[player];
        uint64 epoch = _currentEpoch();

        if (p.lastEnergyEpoch < epoch) {
            uint256 assets = p.principal + p.accruedReward;
            uint8 bt = _balanceTier(assets);
            uint8 st = _streakTier(p.positionStreak);
            uint8 power = _powerLevel(bt, st);
            uint8 newMax = _energyMax(power);

            p.energyCurrent = newMax;
            p.lastEnergyEpoch = epoch;

            emit EnergyRefilled(player, newMax, epoch);
        }
    }

    // -----------------------------------------------------------------------
    // Gateway-only: apply snapshot from C-Chain
    // -----------------------------------------------------------------------

    /**
     * @notice Apply a PositionSnapshot received from C-Chain via ICM.
     * @dev Only callable by GameICMGateway (GATEWAY_ROLE). Updates assets/streak,
     *      re-derives all tiers, and clamps energy if energyMax decreases (PRD §4.5).
     * @param snap The canonical PositionSnapshot from C-Chain.
     */
    function applyPositionSnapshot(PositionSnapshot calldata snap)
        external
        onlyRole(GATEWAY_ROLE)
    {
        address player = snap.player;
        if (player == address(0)) revert ZeroAddress();

        Player storage p = players[player];

        p.principal = snap.principal;
        p.accruedReward = snap.accruedReward;
        p.weightedAprBps = snap.weightedAprBps;
        p.positionStreak = snap.positionStreak;
        p.lastSnapshotAt = snap.updatedAt;

        // Re-derive stats
        uint256 assets = snap.principal + snap.accruedReward;
        uint8 bt = _balanceTier(assets);
        uint8 st = _streakTier(snap.positionStreak);
        uint8 power = _powerLevel(bt, st);
        uint8 newMax = _energyMax(power);

        // Clamp energyCurrent to newMax (PRD §4.5: "if energyCurrent > energyMax, clamp")
        if (p.energyCurrent > newMax) {
            p.energyCurrent = newMax;
        }

        // Credit XP and update exploration if this snapshot completes a quest (PRD §4.3: "XP và exploration chỉ cộng một lần")
        if (snap.questCompleted && !completedQuestRequests[snap.requestId]) {
            completedQuestRequests[snap.requestId] = true;
            p.xp += QUEST_XP;
            p.questsCompleted += QUEST_EXPLORATION_POINTS;
            emit QuestRewardApplied(player, snap.requestId, QUEST_XP, p.xp, p.questsCompleted);
        }

        uint32 score = _explorationScore(p.uniqueH3Count, snap.positionStreak, p.questsCompleted);
        Rarity rar = _rarity(score);

        emit PlayerStatsUpdated(
            player,
            snap.principal,
            snap.accruedReward,
            power,
            newMax,
            _openRadius(power),
            rar
        );
    }

    // -----------------------------------------------------------------------
    // Energy actions — called by ChestManager
    // -----------------------------------------------------------------------

    /**
     * @notice Consume 1 energy for a chest open. Refills first if new epoch.
     * @dev Restricted to GATEWAY_ROLE (ChestManager is granted this role).
     * @param player The player opening a chest.
     */
    function consumeEnergy(address player) external onlyRole(GATEWAY_ROLE) {
        _refillIfNewEpoch(player);

        Player storage p = players[player];
        if (p.energyCurrent == 0) revert OutOfEnergy(player, 0);

        p.energyCurrent -= 1;
        emit EnergyConsumed(player, p.energyCurrent);
    }

    /**
     * @notice Refund 1 energy on FAILED_FINAL ICM outcome (PRD §5.3).
     * @dev Only callable by GATEWAY_ROLE. Does not exceed energyMax.
     * @param player The player to refund.
     */
    function refundEnergy(address player) external onlyRole(GATEWAY_ROLE) {
        Player storage p = players[player];
        uint256 assets = p.principal + p.accruedReward;
        uint8 bt = _balanceTier(assets);
        uint8 st = _streakTier(p.positionStreak);
        uint8 power = _powerLevel(bt, st);
        uint8 maxE = _energyMax(power);

        if (p.energyCurrent < maxE) {
            p.energyCurrent += 1;
        }
        emit EnergyRefilled(player, p.energyCurrent, _currentEpoch());
    }

    // -----------------------------------------------------------------------
    // H3 exploration tracking — called by ChestManager after successful open
    // -----------------------------------------------------------------------

    /**
     * @notice Record a new H3 cell as opened by the player.
     * @dev Only callable by GATEWAY_ROLE (ChestManager).
     * @param player  The player.
     * @param h3Cell  The H3 cell identifier (resolution 10).
     */
    function recordH3Open(address player, bytes32 h3Cell) external onlyRole(GATEWAY_ROLE) {
        if (!openedH3Cells[player][h3Cell]) {
            openedH3Cells[player][h3Cell] = true;
            players[player].uniqueH3Count += 1;
            emit H3CellOpened(player, h3Cell, players[player].uniqueH3Count);
        }
    }

    // -----------------------------------------------------------------------
    // Views
    // -----------------------------------------------------------------------

    /**
     * @notice Full player stats derived from stored state.
     * @return energyCurrent     Current energy.
     * @return energyMax         Computed energy max = 3 + powerLevel.
     * @return powerLevel        Computed power level 0-3.
     * @return openRadius        Computed open radius in metres.
     * @return compassLevel      Computed compass level.
     * @return explorationScore  uniqueH3Count + min(streak, 7).
     * @return rar               Current rarity.
     * @return lastSnapshotAt    Timestamp of latest C-Chain snapshot.
     */
    function getStats(address player)
        external
        view
        returns (
            uint8 energyCurrent,
            uint8 energyMax,
            uint8 powerLevel,
            uint32 openRadius,
            uint8 compassLevel,
            uint32 explorationScore,
            Rarity rar,
            uint64 lastSnapshotAt
        )
    {
        Player storage p = players[player];
        uint256 assets = p.principal + p.accruedReward;
        uint8 bt = _balanceTier(assets);
        uint8 st = _streakTier(p.positionStreak);
        uint8 power = _powerLevel(bt, st);

        energyCurrent = p.energyCurrent;
        energyMax = _energyMax(power);
        powerLevel = power;
        openRadius = _openRadius(power);
        compassLevel = _compassLevel(power);
        explorationScore = _explorationScore(p.uniqueH3Count, p.positionStreak, p.questsCompleted);
        rar = _rarity(explorationScore);
        lastSnapshotAt = p.lastSnapshotAt;
    }

    /**
     * @notice Returns total XP accumulated by player.
     */
    function getXp(address player) external view returns (uint32) {
        return players[player].xp;
    }

    /**
     * @notice Returns total quests completed by player.
     */
    function getQuestsCompleted(address player) external view returns (uint32) {
        return players[player].questsCompleted;
    }

    /**
     * @notice Preview effective energyMax for the player (uses live computation).
     */
    function getEnergyMax(address player) external view returns (uint8) {
        Player storage p = players[player];
        uint256 assets = p.principal + p.accruedReward;
        uint8 power = _powerLevel(_balanceTier(assets), _streakTier(p.positionStreak));
        return _energyMax(power);
    }

    /**
     * @notice Current epoch number.
     */
    function currentEpoch() external view returns (uint64) {
        return _currentEpoch();
    }
}
