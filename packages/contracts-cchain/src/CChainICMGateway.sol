// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SponsorPool} from "./SponsorPool.sol";
import {YieldVault} from "./YieldVault.sol";
import {ITeleporterMessenger, ITeleporterReceiver} from "./interfaces/ITeleporterMessenger.sol";

interface IQuestRouter {
    function registerQuest(
        bytes32 requestId,
        bytes32 questId,
        address player,
        uint8 tier,
        uint256 requiredAmount,
        uint64 expiresAt
    ) external;
}

/**
 * @title CChainICMGateway
 * @notice Fuji C-Chain Teleporter endpoint for sponsored deposits and quest registrations.
 * @dev The processed map is written before dispatching the ACK. A duplicated
 *      Teleporter delivery therefore replays the stored snapshot only and can
 *      never allocate a second principal amount.
 */
contract CChainICMGateway is ITeleporterReceiver {
    uint8 private constant DEPOSIT_REQUEST = 1;
    uint8 private constant POSITION_SNAPSHOT = 2;
    uint8 private constant QUEST_REGISTRATION = 3;

    uint256 public constant YIELD_CHEST_AMOUNT = 1_000_000;
    uint256 public constant SPONSOR_CHEST_AMOUNT = 2_000_000;

    enum ChestType {
        YIELD,
        QUEST,
        SPONSOR
    }
    enum Rarity {
        COMMON,
        RARE,
        EPIC,
        LEGENDARY
    }

    struct DepositRequest {
        bytes32 requestId;
        address player;
        ChestType sourceType;
        bytes32 sourceId;
        uint256 amount;
        Rarity rarity;
        uint64 epoch;
    }

    struct QuestRegistration {
        bytes32 requestId;
        bytes32 questId;
        address player;
        uint8 tier;
        uint256 requiredAmount;
        uint64 expiresAt;
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

    struct ProcessedRequest {
        bool processed;
        PositionSnapshot snapshot;
    }

    ITeleporterMessenger public immutable teleporterMessenger;
    SponsorPool public immutable sponsorPool;
    YieldVault public immutable yieldVault;
    bytes32 public immutable localBlockchainID;
    bytes32 public immutable remoteBlockchainID;
    address public immutable remoteGateway;
    uint256 public immutable remoteGasLimit;
    address public immutable admin;

    address public questRouter;

    mapping(bytes32 => ProcessedRequest) private processedRequests;

    event RequestProcessed(bytes32 indexed requestId, address indexed player, uint256 amount);
    event SnapshotSent(bytes32 indexed requestId, bytes32 indexed messageId, bool replayed);
    event QuestRouterConfigured(address indexed questRouter);

    error ZeroAddress();
    error UnauthorizedTeleporter(address caller);
    error InvalidRemoteSender(bytes32 blockchainID, address sender);
    error InvalidMessageKind(uint8 kind);
    error InvalidDepositRequest(bytes32 requestId);
    error UnsupportedChestType(ChestType chestType);
    error UnauthorizedAdmin(address caller);
    error UnauthorizedCaller(address caller);

    constructor(
        address teleporterMessenger_,
        address sponsorPool_,
        address yieldVault_,
        bytes32 localBlockchainID_,
        bytes32 remoteBlockchainID_,
        address remoteGateway_,
        uint256 remoteGasLimit_
    ) {
        if (
            teleporterMessenger_ == address(0) || sponsorPool_ == address(0) || yieldVault_ == address(0)
                || remoteGateway_ == address(0)
        ) revert ZeroAddress();

        teleporterMessenger = ITeleporterMessenger(teleporterMessenger_);
        sponsorPool = SponsorPool(sponsorPool_);
        yieldVault = YieldVault(yieldVault_);
        localBlockchainID = localBlockchainID_;
        remoteBlockchainID = remoteBlockchainID_;
        remoteGateway = remoteGateway_;
        remoteGasLimit = remoteGasLimit_;
        admin = msg.sender;
    }

    /**
     * @notice Configures the QuestRouter contract address.
     */
    function setQuestRouter(address questRouter_) external {
        if (msg.sender != admin) revert UnauthorizedAdmin(msg.sender);
        if (questRouter_ == address(0)) revert ZeroAddress();
        questRouter = questRouter_;
        emit QuestRouterConfigured(questRouter_);
    }

    /**
     * @notice Authenticated Teleporter callback carrying an L1 deposit request or quest registration.
     */
    function receiveTeleporterMessage(bytes32 originBlockchainID, address originSenderAddress, bytes calldata message)
        external
        override
    {
        if (msg.sender != address(teleporterMessenger)) revert UnauthorizedTeleporter(msg.sender);
        if (originBlockchainID != remoteBlockchainID || originSenderAddress != remoteGateway) {
            revert InvalidRemoteSender(originBlockchainID, originSenderAddress);
        }

        uint8 kind = abi.decode(message, (uint8));

        if (kind == DEPOSIT_REQUEST) {
            (, DepositRequest memory request) = abi.decode(message, (uint8, DepositRequest));
            if (request.requestId == bytes32(0) || request.player == address(0)) {
                revert InvalidDepositRequest(request.requestId);
            }

            ProcessedRequest storage processed = processedRequests[request.requestId];
            if (processed.processed) {
                _sendSnapshot(processed.snapshot, true);
                return;
            }

            uint256 expectedAmount = _amountFor(request.sourceType);
            if (request.amount != expectedAmount) revert InvalidDepositRequest(request.requestId);

            sponsorPool.allocatePrincipal(address(yieldVault), request.amount);
            yieldVault.depositSponsored(request.player, request.amount, _aprFor(request.rarity));

            YieldVault.PositionSnapshot memory vaultSnapshot =
                yieldVault.getPositionSnapshot(request.requestId, request.player, false);
            PositionSnapshot memory snapshot = PositionSnapshot({
                requestId: vaultSnapshot.requestId,
                player: vaultSnapshot.player,
                principal: vaultSnapshot.principal,
                accruedReward: vaultSnapshot.accruedReward,
                weightedAprBps: vaultSnapshot.weightedAprBps,
                positionStreak: vaultSnapshot.positionStreak,
                updatedAt: vaultSnapshot.updatedAt,
                questCompleted: vaultSnapshot.questCompleted
            });

            processed.processed = true;
            processed.snapshot = snapshot;
            emit RequestProcessed(request.requestId, request.player, request.amount);
            _sendSnapshot(snapshot, false);
        } else if (kind == QUEST_REGISTRATION) {
            (, QuestRegistration memory reg) = abi.decode(message, (uint8, QuestRegistration));
            if (reg.requestId == bytes32(0) || reg.player == address(0)) {
                revert InvalidDepositRequest(reg.requestId);
            }

            if (questRouter != address(0)) {
                IQuestRouter(questRouter).registerQuest(
                    reg.requestId,
                    reg.questId,
                    reg.player,
                    reg.tier,
                    reg.requiredAmount,
                    reg.expiresAt
                );
            }
        } else {
            revert InvalidMessageKind(kind);
        }
    }

    /**
     * @notice Dispatches completion PositionSnapshot back to Game L1 when a quest completes.
     * @dev Only callable by the configured QuestRouter.
     */
    function sendQuestCompletion(bytes32 requestId, address player)
        external
        returns (bytes32 messageId)
    {
        if (msg.sender != questRouter) revert UnauthorizedCaller(msg.sender);

        YieldVault.PositionSnapshot memory vaultSnapshot =
            yieldVault.getPositionSnapshot(requestId, player, true);
        PositionSnapshot memory snapshot = PositionSnapshot({
            requestId: requestId,
            player: player,
            principal: vaultSnapshot.principal,
            accruedReward: vaultSnapshot.accruedReward,
            weightedAprBps: vaultSnapshot.weightedAprBps,
            positionStreak: vaultSnapshot.positionStreak,
            updatedAt: vaultSnapshot.updatedAt,
            questCompleted: true
        });

        ProcessedRequest storage processed = processedRequests[requestId];
        processed.processed = true;
        processed.snapshot = snapshot;

        return _sendSnapshot(snapshot, false);
    }

    /**
     * @notice Reconciliation view used by frontend/admin tooling.
     */
    function getProcessedRequest(bytes32 requestId)
        external
        view
        returns (bool processed, PositionSnapshot memory snapshot)
    {
        ProcessedRequest storage request = processedRequests[requestId];
        return (request.processed, request.snapshot);
    }

    function _sendSnapshot(PositionSnapshot memory snapshot, bool replayed) private returns (bytes32 messageId) {
        address[] memory allowedRelayers = new address[](0);
        messageId = teleporterMessenger.sendCrossChainMessage(
            ITeleporterMessenger.TeleporterMessageInput({
                destinationBlockchainID: remoteBlockchainID,
                destinationAddress: remoteGateway,
                feeInfo: ITeleporterMessenger.TeleporterFeeInfo({feeTokenAddress: address(0), amount: 0}),
                requiredGasLimit: remoteGasLimit,
                allowedRelayerAddresses: allowedRelayers,
                message: abi.encode(POSITION_SNAPSHOT, snapshot)
            })
        );
        emit SnapshotSent(snapshot.requestId, messageId, replayed);
    }

    function _amountFor(ChestType chestType) private pure returns (uint256) {
        if (chestType == ChestType.YIELD) return YIELD_CHEST_AMOUNT;
        if (chestType == ChestType.SPONSOR) return SPONSOR_CHEST_AMOUNT;
        revert UnsupportedChestType(chestType);
    }

    function _aprFor(Rarity rarity) private pure returns (uint32) {
        if (rarity == Rarity.COMMON) return 500;
        if (rarity == Rarity.RARE) return 625;
        if (rarity == Rarity.EPIC) return 750;
        return 1000;
    }
}
