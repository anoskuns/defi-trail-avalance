// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {PlayerState} from "./PlayerState.sol";

/**
 * @title ChestManager
 * @notice Manages chest opening on the Avalanche Game L1.
 * @dev Verifies EIP-712 LocationProof or SponsorProof from a trusted backend signer,
 *      enforces one-claim-per-wallet-per-epoch, deducts energy, creates a unique
 *      requestId, and delegates ICM dispatch to GameICMGateway.
 *
 * PRD references: §5.1 (Epoch/chest identity), §5.2 (Location/proof), §5.3 (Energy),
 *                 §9.2 (ChestManager responsibilities), §10.1 (Types), §12.1 (Security)
 */
contract ChestManager is AccessControl, ReentrancyGuard, EIP712 {
    using ECDSA for bytes32;

    // -----------------------------------------------------------------------
    // Roles
    // -----------------------------------------------------------------------
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant ADMIN_ROLE   = keccak256("ADMIN_ROLE");

    // -----------------------------------------------------------------------
    // EIP-712 type hashes
    // PRD §10.1 and §5.2 — LocationProof fields
    // -----------------------------------------------------------------------
    bytes32 public constant LOCATION_PROOF_TYPEHASH = keccak256(
        "LocationProof(address player,bytes32 chestId,uint64 epoch,uint32 radiusMeters,"
        "bytes32 nonce,uint64 expiresAt,uint8 mode)"
    );

    bytes32 public constant SPONSOR_PROOF_TYPEHASH = keccak256(
        "SponsorProof(address player,bytes32 chestId,bytes32 campaignId,"
        "uint64 epoch,bytes32 nonce,uint64 expiresAt)"
    );

    // -----------------------------------------------------------------------
    // Constants
    // -----------------------------------------------------------------------
    uint64  public constant PROOF_MAX_TTL = 90; // seconds (PRD §5.2)

    // -----------------------------------------------------------------------
    // Data structures (PRD §10.1)
    // -----------------------------------------------------------------------

    enum ChestType { YIELD, QUEST, SPONSOR }

    enum Rarity { COMMON, RARE, EPIC, LEGENDARY }

    enum RequestStatus {
        NONE,
        CREATED,
        SENT,
        REMOTE_EXECUTED,
        ACK_PENDING,
        CONFIRMED,
        RETRYABLE_FAILED,
        FAILED_FINAL
    }

    struct LocationProof {
        address player;
        bytes32 chestId;
        uint64 epoch;
        uint32 radiusMeters;
        bytes32 nonce;
        uint64 expiresAt;
        uint8 mode;         // 0 = GPS, 1 = DEMO
        bytes signature;
    }

    struct SponsorProof {
        address player;
        bytes32 chestId;
        bytes32 campaignId;
        uint64 epoch;
        bytes32 nonce;
        uint64 expiresAt;
        bytes signature;
    }

    struct ChestRequest {
        address player;
        bytes32 chestId;
        ChestType chestType;
        Rarity rarity;
        RequestStatus status;
        uint64 epoch;
        uint64 createdAt;
    }

    // -----------------------------------------------------------------------
    // State
    // -----------------------------------------------------------------------

    /// @notice Trusted EIP-712 proof signer (backend server key).
    address public proofSigner;

    /// @notice Reference to PlayerState contract.
    PlayerState public playerState;

    /// @notice GameICMGateway address — receives sendDepositRequest calls.
    address public gameICMGateway;

    /// @notice Epoch length in seconds (mirrors PlayerState.epochSeconds).
    uint256 public immutable epochSeconds;

    /// @notice Spent nonces — prevents replay attack on proof (PRD §5.2).
    mapping(bytes32 => bool) public usedNonces;

    /// @notice Claim key → bool: keccak256(chestId, player, epoch) (PRD §5.1).
    mapping(bytes32 => bool) public claimedKeys;

    /// @notice requestId → ChestRequest state machine.
    mapping(bytes32 => ChestRequest) public requests;

    // -----------------------------------------------------------------------
    // Events (PRD §10.2)
    // -----------------------------------------------------------------------

    event ChestOpenRequested(
        bytes32 indexed requestId,
        address indexed player,
        bytes32 indexed chestId,
        ChestType chestType,
        Rarity rarity,
        uint64 epoch,
        uint8 mode
    );

    event RequestStatusUpdated(
        bytes32 indexed requestId,
        RequestStatus oldStatus,
        RequestStatus newStatus
    );

    // -----------------------------------------------------------------------
    // Errors
    // -----------------------------------------------------------------------

    error ZeroAddress();
    error ProofExpired(uint64 expiresAt, uint64 now_);
    error ProofFromFuture(uint64 expiresAt, uint64 now_);
    error ProofTtlExceeded(uint64 expiresAt, uint64 now_);
    error InvalidSignature();
    error NonceAlreadyUsed(bytes32 nonce);
    error WrongEpoch(uint64 proofEpoch, uint64 currentEpoch);
    error AlreadyClaimed(bytes32 claimKey);
    error Unauthorized();
    error InvalidStatusTransition(RequestStatus from, RequestStatus to);
    error RequestNotFound(bytes32 requestId);

    // -----------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------

    /**
     * @param _proofSigner     Trusted backend signer address.
     * @param _playerState     Deployed PlayerState contract.
     * @param _gameICMGateway  Deployed GameICMGateway contract.
     * @param _epochSeconds    Epoch length (must match PlayerState).
     * @param _initialAdmin    Admin address (defaults to msg.sender if zero).
     */
    constructor(
        address _proofSigner,
        address _playerState,
        address _gameICMGateway,
        uint256 _epochSeconds,
        address _initialAdmin
    ) EIP712("DeFiTrail", "1") {
        if (_proofSigner == address(0)) revert ZeroAddress();
        if (_playerState == address(0)) revert ZeroAddress();
        if (_gameICMGateway == address(0)) revert ZeroAddress();

        proofSigner = _proofSigner;
        playerState = PlayerState(_playerState);
        gameICMGateway = _gameICMGateway;
        epochSeconds = _epochSeconds == 0 ? 86_400 : _epochSeconds;

        address admin = _initialAdmin == address(0) ? msg.sender : _initialAdmin;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(GATEWAY_ROLE, _gameICMGateway);
    }

    // -----------------------------------------------------------------------
    // Proof verification helpers
    // -----------------------------------------------------------------------

    /**
     * @dev Builds the EIP-712 digest for LocationProof (PRD §10.1, §12.1).
     */
    function _locationProofDigest(LocationProof calldata proof)
        internal view returns (bytes32)
    {
        return _hashTypedDataV4(keccak256(abi.encode(
            LOCATION_PROOF_TYPEHASH,
            proof.player,
            proof.chestId,
            proof.epoch,
            proof.radiusMeters,
            proof.nonce,
            proof.expiresAt,
            proof.mode
        )));
    }

    /**
     * @dev Builds the EIP-712 digest for SponsorProof.
     */
    function _sponsorProofDigest(SponsorProof calldata proof)
        internal view returns (bytes32)
    {
        return _hashTypedDataV4(keccak256(abi.encode(
            SPONSOR_PROOF_TYPEHASH,
            proof.player,
            proof.chestId,
            proof.campaignId,
            proof.epoch,
            proof.nonce,
            proof.expiresAt
        )));
    }

    /**
     * @dev Validates proof timing: must not be expired and not too far in the past
     *      (max 90s TTL from expiresAt — PRD §5.2).
     */
    function _validateTiming(uint64 expiresAt) internal view {
        uint64 now_ = uint64(block.timestamp);
        if (now_ > expiresAt) revert ProofExpired(expiresAt, now_);
        if (expiresAt > now_ + PROOF_MAX_TTL) revert ProofTtlExceeded(expiresAt, now_);
    }

    // -----------------------------------------------------------------------
    // Current epoch helper
    // -----------------------------------------------------------------------

    function _currentEpoch() internal view returns (uint64) {
        return uint64(block.timestamp / epochSeconds);
    }

    // -----------------------------------------------------------------------
    // openChest — Location proof (Yield / Quest / Sponsor chest types)
    // -----------------------------------------------------------------------

    /**
     * @notice Open a chest using an EIP-712 LocationProof.
     * @dev Flow (PRD §4.2, §5.2, §5.3, §9.2):
     *   1. Validate proof signature (signer == proofSigner).
     *   2. Check expiry (≤ 90s lifetime), epoch match, nonce, claim key.
     *   3. Consume 1 energy from PlayerState.
     *   4. Create a unique requestId and record request.
     *   5. Emit ChestOpenRequested (caller/frontend dispatches to gateway).
     * @param chestType  Type of chest (YIELD, QUEST, SPONSOR).
     * @param h3Cell     H3 cell of the chest for exploration tracking.
     * @param proof      Signed LocationProof from backend.
     */
    function openChest(
        ChestType chestType,
        bytes32 h3Cell,
        LocationProof calldata proof
    )
        external
        nonReentrant
        returns (bytes32 requestId)
    {
        address player = msg.sender;

        // 1. Player must match proof.player
        if (proof.player != player) revert InvalidSignature();

        // 2. Timing
        _validateTiming(proof.expiresAt);

        // 3. Epoch must match current epoch
        uint64 epoch = _currentEpoch();
        if (proof.epoch != epoch) revert WrongEpoch(proof.epoch, epoch);

        // 4. Nonce — must not be used
        if (usedNonces[proof.nonce]) revert NonceAlreadyUsed(proof.nonce);

        // 5. Claim key — one claim per wallet per chest per epoch (PRD §5.1)
        bytes32 claimKey = keccak256(abi.encodePacked(proof.chestId, player, epoch));
        if (claimedKeys[claimKey]) revert AlreadyClaimed(claimKey);

        // 6. Signature verification
        bytes32 digest = _locationProofDigest(proof);
        address recovered = digest.recover(proof.signature);
        if (recovered != proofSigner) revert InvalidSignature();

        // 7. Mark nonce and claim as used (effects before interactions)
        usedNonces[proof.nonce] = true;
        claimedKeys[claimKey] = true;

        // 8. Consume energy (PlayerState refills if new epoch)
        playerState.consumeEnergy(player);

        // 9. Record H3 cell for exploration
        playerState.recordH3Open(player, h3Cell);

        // 10. Create unique requestId (PRD §9.2)
        uint256 nonce_ = uint256(proof.nonce);
        requestId = keccak256(abi.encodePacked(
            block.chainid,
            address(this),
            player,
            nonce_,
            block.timestamp
        ));

        // 11. Determine rarity from current exploration score
        (,,,,, uint32 score,, ) = playerState.getStats(player);
        Rarity rar = _rarityFromScore(score);

        // 12. Store request
        requests[requestId] = ChestRequest({
            player: player,
            chestId: proof.chestId,
            chestType: chestType,
            rarity: rar,
            status: RequestStatus.CREATED,
            epoch: epoch,
            createdAt: uint64(block.timestamp)
        });

        emit ChestOpenRequested(
            requestId,
            player,
            proof.chestId,
            chestType,
            rar,
            epoch,
            proof.mode
        );
    }

    /**
     * @notice Open a Sponsor chest using a SponsorProof (PRD §4.4).
     * @dev Same security checks as openChest but uses SponsorProof.
     * @param h3Cell    H3 cell for exploration tracking.
     * @param proof     Signed SponsorProof from backend.
     */
    function openSponsorChest(
        bytes32 h3Cell,
        SponsorProof calldata proof
    )
        external
        nonReentrant
        returns (bytes32 requestId)
    {
        address player = msg.sender;

        if (proof.player != player) revert InvalidSignature();

        _validateTiming(proof.expiresAt);

        uint64 epoch = _currentEpoch();
        if (proof.epoch != epoch) revert WrongEpoch(proof.epoch, epoch);

        if (usedNonces[proof.nonce]) revert NonceAlreadyUsed(proof.nonce);

        bytes32 claimKey = keccak256(abi.encodePacked(proof.chestId, player, epoch));
        if (claimedKeys[claimKey]) revert AlreadyClaimed(claimKey);

        bytes32 digest = _sponsorProofDigest(proof);
        address recovered = digest.recover(proof.signature);
        if (recovered != proofSigner) revert InvalidSignature();

        usedNonces[proof.nonce] = true;
        claimedKeys[claimKey] = true;

        playerState.consumeEnergy(player);
        playerState.recordH3Open(player, h3Cell);

        uint256 nonce_ = uint256(proof.nonce);
        requestId = keccak256(abi.encodePacked(
            block.chainid,
            address(this),
            player,
            nonce_,
            block.timestamp
        ));

        (,,,,, uint32 score,, ) = playerState.getStats(player);
        Rarity rar = _rarityFromScore(score);

        requests[requestId] = ChestRequest({
            player: player,
            chestId: proof.chestId,
            chestType: ChestType.SPONSOR,
            rarity: rar,
            status: RequestStatus.CREATED,
            epoch: epoch,
            createdAt: uint64(block.timestamp)
        });

        emit ChestOpenRequested(
            requestId,
            player,
            proof.chestId,
            ChestType.SPONSOR,
            rar,
            epoch,
            0 // mode not applicable for sponsor
        );
    }

    // -----------------------------------------------------------------------
    // Gateway callbacks — ICM lifecycle (PRD §9.3)
    // -----------------------------------------------------------------------

    /**
     * @notice Update request status as ICM progresses.
     * @dev Only GATEWAY_ROLE. Prevents out-of-order overwrites of terminal states.
     */
    function updateRequestStatus(bytes32 requestId, RequestStatus newStatus)
        external
        onlyRole(GATEWAY_ROLE)
    {
        ChestRequest storage req = requests[requestId];
        if (req.player == address(0)) revert RequestNotFound(requestId);

        RequestStatus old = req.status;

        // Terminal states cannot be overwritten (PRD §9.3)
        if (old == RequestStatus.CONFIRMED || old == RequestStatus.FAILED_FINAL) {
            revert InvalidStatusTransition(old, newStatus);
        }

        req.status = newStatus;
        emit RequestStatusUpdated(requestId, old, newStatus);

        // On FAILED_FINAL: refund energy (PRD §5.3)
        if (newStatus == RequestStatus.FAILED_FINAL) {
            playerState.refundEnergy(req.player);
        }
    }

    // -----------------------------------------------------------------------
    // Admin
    // -----------------------------------------------------------------------

    /**
     * @notice Update the trusted proof signer.
     */
    function setProofSigner(address newSigner) external onlyRole(ADMIN_ROLE) {
        if (newSigner == address(0)) revert ZeroAddress();
        proofSigner = newSigner;
    }

    /**
     * @notice Update the GameICMGateway address.
     */
    function setGameICMGateway(address newGateway) external onlyRole(ADMIN_ROLE) {
        if (newGateway == address(0)) revert ZeroAddress();
        _revokeRole(GATEWAY_ROLE, gameICMGateway);
        gameICMGateway = newGateway;
        _grantRole(GATEWAY_ROLE, newGateway);
    }

    // -----------------------------------------------------------------------
    // Internal helpers
    // -----------------------------------------------------------------------

    /**
     * @dev Map exploration score to Rarity (PRD §5.5).
     */
    function _rarityFromScore(uint32 score) internal pure returns (Rarity) {
        if (score >= 10) return Rarity.LEGENDARY;
        if (score >= 6)  return Rarity.EPIC;
        if (score >= 3)  return Rarity.RARE;
        return Rarity.COMMON;
    }
}

