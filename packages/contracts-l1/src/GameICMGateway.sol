// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ChestManager} from "./ChestManager.sol";
import {PlayerState} from "./PlayerState.sol";
import {ITeleporterMessenger, ITeleporterReceiver} from "./interfaces/ITeleporterMessenger.sol";

/**
 * @title GameICMGateway
 * @notice Game L1 boundary for sponsored chest deposits over Teleporter ICM.
 * @dev A request is created and consumes energy in ChestManager before this
 *      contract sends it. Retrying reuses the exact encoded payload, so it
 *      cannot create a second request or charge player energy again.
 */
contract GameICMGateway is ITeleporterReceiver {
    uint8 private constant DEPOSIT_REQUEST = 1;
    uint8 private constant POSITION_SNAPSHOT = 2;

    uint256 public constant YIELD_CHEST_AMOUNT = 1_000_000;
    uint256 public constant SPONSOR_CHEST_AMOUNT = 2_000_000;

    struct DepositRequest {
        bytes32 requestId;
        address player;
        ChestManager.ChestType sourceType;
        bytes32 sourceId;
        uint256 amount;
        ChestManager.Rarity rarity;
        uint64 epoch;
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

    struct OutboundRequest {
        address player;
        bytes payload;
        bytes32 lastMessageId;
        bool exists;
    }

    ITeleporterMessenger public immutable teleporterMessenger;
    ChestManager public immutable chestManager;
    PlayerState public immutable playerState;
    bytes32 public immutable localBlockchainID;
    bytes32 public immutable remoteBlockchainID;
    address public remoteGateway;
    uint256 public immutable remoteGasLimit;
    address public immutable admin;

    mapping(bytes32 => OutboundRequest) private outboundRequests;

    event CrossChainRequestSent(bytes32 indexed requestId, bytes32 indexed messageId, bool isRetry);
    event RequestSettled(bytes32 indexed requestId, address indexed player, bytes32 indexed messageId);
    event RemoteGatewayConfigured(address indexed remoteGateway);

    error ZeroAddress();
    error UnauthorizedTeleporter(address caller);
    error InvalidRemoteSender(bytes32 blockchainID, address sender);
    error RequestNotFound(bytes32 requestId);
    error UnauthorizedPlayer(address caller, address player);
    error InvalidRequestStatus(ChestManager.RequestStatus status);
    error UnsupportedChestType(ChestManager.ChestType chestType);
    error InvalidMessageKind(uint8 kind);
    error InvalidSnapshot(bytes32 requestId, address player);
    error UnauthorizedAdmin(address caller);

    constructor(
        address teleporterMessenger_,
        address chestManager_,
        address playerState_,
        bytes32 localBlockchainID_,
        bytes32 remoteBlockchainID_,
        address remoteGateway_,
        uint256 remoteGasLimit_
    ) {
        if (teleporterMessenger_ == address(0) || chestManager_ == address(0) || playerState_ == address(0)) revert ZeroAddress();

        teleporterMessenger = ITeleporterMessenger(teleporterMessenger_);
        chestManager = ChestManager(chestManager_);
        playerState = PlayerState(playerState_);
        localBlockchainID = localBlockchainID_;
        remoteBlockchainID = remoteBlockchainID_;
        remoteGateway = remoteGateway_;
        remoteGasLimit = remoteGasLimit_;
        admin = msg.sender;
    }

    /**
     * @notice Sets the C-Chain receiver after its deployment.
     * @dev This avoids a constructor-address cycle between the two gateways.
     */
    function setRemoteGateway(address remoteGateway_) external {
        if (msg.sender != admin) revert UnauthorizedAdmin(msg.sender);
        if (remoteGateway_ == address(0)) revert ZeroAddress();
        remoteGateway = remoteGateway_;
        emit RemoteGatewayConfigured(remoteGateway_);
    }

    /**
     * @notice Sends the canonical DepositRequest for a previously created chest request.
     */
    function sendDepositRequest(bytes32 requestId) external returns (bytes32 messageId) {
        (
            address player,
            bytes32 chestId,
            ChestManager.ChestType chestType,
            ChestManager.Rarity rarity,
            ChestManager.RequestStatus status,
            uint64 epoch,
        ) = chestManager.requests(requestId);

        if (player == address(0)) revert RequestNotFound(requestId);
        if (msg.sender != player && msg.sender != address(chestManager)) revert UnauthorizedPlayer(msg.sender, player);
        if (status != ChestManager.RequestStatus.CREATED) revert InvalidRequestStatus(status);
        if (chestType == ChestManager.ChestType.QUEST) revert UnsupportedChestType(chestType);

        uint256 amount = chestType == ChestManager.ChestType.YIELD ? YIELD_CHEST_AMOUNT : SPONSOR_CHEST_AMOUNT;
        DepositRequest memory request = DepositRequest({
            requestId: requestId,
            player: player,
            sourceType: chestType,
            sourceId: chestId,
            amount: amount,
            rarity: rarity,
            epoch: epoch
        });

        bytes memory payload = abi.encode(DEPOSIT_REQUEST, request);
        outboundRequests[requestId] =
            OutboundRequest({player: player, payload: payload, lastMessageId: bytes32(0), exists: true});

        messageId = _send(requestId, payload, false);
        chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.SENT);
    }

    /**
     * @notice Replays the original Teleporter payload without creating another
     * request or touching PlayerState energy.
     */
    function retryRequest(bytes32 requestId) external returns (bytes32 messageId) {
        OutboundRequest storage request = outboundRequests[requestId];
        if (!request.exists) revert RequestNotFound(requestId);
        if (msg.sender != request.player) revert UnauthorizedPlayer(msg.sender, request.player);

        (,,,, ChestManager.RequestStatus status,,) = chestManager.requests(requestId);
        if (status != ChestManager.RequestStatus.SENT && status != ChestManager.RequestStatus.RETRYABLE_FAILED) {
            revert InvalidRequestStatus(status);
        }

        messageId = _send(requestId, request.payload, true);
        if (status == ChestManager.RequestStatus.RETRYABLE_FAILED) {
            chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.SENT);
        }
    }

    /**
     * @notice Authenticated Teleporter callback carrying a C-Chain snapshot.
     */
    function receiveTeleporterMessage(bytes32 originBlockchainID, address originSenderAddress, bytes calldata message)
        external
        override
    {
        if (msg.sender != address(teleporterMessenger)) revert UnauthorizedTeleporter(msg.sender);
        if (originBlockchainID != remoteBlockchainID || originSenderAddress != remoteGateway) {
            revert InvalidRemoteSender(originBlockchainID, originSenderAddress);
        }

        (uint8 kind, PositionSnapshot memory snapshot) = abi.decode(message, (uint8, PositionSnapshot));
        if (kind != POSITION_SNAPSHOT) revert InvalidMessageKind(kind);

        OutboundRequest storage request = outboundRequests[snapshot.requestId];
        if (!request.exists) revert RequestNotFound(snapshot.requestId);
        if (snapshot.player != request.player || snapshot.player == address(0)) {
            revert InvalidSnapshot(snapshot.requestId, snapshot.player);
        }

        (,,,, ChestManager.RequestStatus status,,) = chestManager.requests(snapshot.requestId);
        if (status == ChestManager.RequestStatus.CONFIRMED) return;
        if (status != ChestManager.RequestStatus.SENT && status != ChestManager.RequestStatus.REMOTE_EXECUTED) {
            revert InvalidRequestStatus(status);
        }

        if (status == ChestManager.RequestStatus.SENT) {
            chestManager.updateRequestStatus(snapshot.requestId, ChestManager.RequestStatus.REMOTE_EXECUTED);
        }

        playerState.applyPositionSnapshot(
            PlayerState.PositionSnapshot({
                requestId: snapshot.requestId,
                player: snapshot.player,
                principal: snapshot.principal,
                accruedReward: snapshot.accruedReward,
                weightedAprBps: snapshot.weightedAprBps,
                positionStreak: snapshot.positionStreak,
                updatedAt: snapshot.updatedAt,
                questCompleted: snapshot.questCompleted
            })
        );
        chestManager.updateRequestStatus(snapshot.requestId, ChestManager.RequestStatus.CONFIRMED);

        emit RequestSettled(snapshot.requestId, snapshot.player, bytes32(0));
    }

    function getOutboundRequest(bytes32 requestId)
        external
        view
        returns (address player, bytes32 lastMessageId, bool exists)
    {
        OutboundRequest storage request = outboundRequests[requestId];
        return (request.player, request.lastMessageId, request.exists);
    }

    function _send(bytes32 requestId, bytes memory payload, bool isRetry) private returns (bytes32 messageId) {
        if (remoteGateway == address(0)) revert ZeroAddress();
        address[] memory allowedRelayers = new address[](0);
        messageId = teleporterMessenger.sendCrossChainMessage(
            ITeleporterMessenger.TeleporterMessageInput({
                destinationBlockchainID: remoteBlockchainID,
                destinationAddress: remoteGateway,
                feeInfo: ITeleporterMessenger.TeleporterFeeInfo({feeTokenAddress: address(0), amount: 0}),
                requiredGasLimit: remoteGasLimit,
                allowedRelayerAddresses: allowedRelayers,
                message: payload
            })
        );
        outboundRequests[requestId].lastMessageId = messageId;
        emit CrossChainRequestSent(requestId, messageId, isRetry);
    }
}
