// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {PlayerState} from "../src/PlayerState.sol";
import {ChestManager} from "../src/ChestManager.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title GameLogicTest
 * @notice Foundry tests for PlayerState + ChestManager game logic.
 *
 * Tests:
 *   1. test_ReplayAttack: same nonce used twice → NonceAlreadyUsed revert.
 *   2. test_ExpiredProof: proof.expiresAt in the past → ProofExpired revert.
 *   3. test_ProofTtlExceeded: proof.expiresAt too far in future → ProofTtlExceeded revert.
 *   4. test_OutOfEnergy: player has 0 energy → OutOfEnergy revert.
 *   5. test_DuplicateClaimSameEpoch: same chest/wallet/epoch claimed twice → AlreadyClaimed revert.
 *   6. test_WrongEpoch: proof.epoch != currentEpoch → WrongEpoch revert.
 *   7. test_InvalidSignature: wrong signer → InvalidSignature revert.
 *   8. test_PlayerMismatch: proof.player != msg.sender → InvalidSignature revert.
 *   9. test_ValidOpen: happy path — energy consumed, H3 tracked, requestId emitted.
 *  10. test_EnergyRefillNewEpoch: energy refills on first action of new epoch.
 *  11. test_ApplySnapshot_ClampsEnergy: energy is clamped when snapshot lowers energyMax.
 *  12. test_ApplySnapshot_UpdatesStats: stats are re-derived correctly from snapshot.
 *  13. test_RefundEnergy_OnFailedFinal: gateway's refund call restores energy.
 *  14. test_UpdateRequestStatus_TerminalCannotBeOverwritten: CONFIRMED cannot transition.
 *  15. test_SponsorProof_HappyPath: openSponsorChest with valid SponsorProof.
 *  16. test_SponsorProof_ReplayAttack: same nonce on SponsorProof → revert.
 */
contract GameLogicTest is Test {
    // -----------------------------------------------------------------------
    // Setup constants
    // -----------------------------------------------------------------------
    uint256 internal constant EPOCH_SECS = 3600; // 1-hour epoch for fast testing

    uint256 internal signerPrivKey = 0xA11CE;
    address internal proofSigner;
    address internal admin;
    address internal alice;
    address internal bob;
    address internal gateway; // simulated GameICMGateway

    PlayerState internal playerState;
    ChestManager internal chestManager;

    // EIP-712 domain separator constants (must match ChestManager constructor)
    bytes32 internal constant LOCATION_PROOF_TYPEHASH = keccak256(
        "LocationProof(address player,bytes32 chestId,uint64 epoch,uint32 radiusMeters,"
        "bytes32 nonce,uint64 expiresAt,uint8 mode)"
    );
    bytes32 internal constant SPONSOR_PROOF_TYPEHASH = keccak256(
        "SponsorProof(address player,bytes32 chestId,bytes32 campaignId,"
        "uint64 epoch,bytes32 nonce,uint64 expiresAt)"
    );

    // -----------------------------------------------------------------------
    // setUp
    // -----------------------------------------------------------------------
    function setUp() public {
        proofSigner = vm.addr(signerPrivKey);
        admin = makeAddr("admin");
        alice = makeAddr("alice");
        bob   = makeAddr("bob");
        gateway = makeAddr("gateway");

        vm.startPrank(admin);

        // Deploy PlayerState (1-hour epochs, admin = admin)
        playerState = new PlayerState(EPOCH_SECS, admin);

        // Deploy ChestManager (proofSigner, playerState, gateway, epoch, admin)
        chestManager = new ChestManager(
            proofSigner,
            address(playerState),
            gateway,
            EPOCH_SECS,
            admin
        );

        // Grant ChestManager GATEWAY_ROLE on PlayerState so it can call consumeEnergy etc.
        playerState.grantRole(playerState.GATEWAY_ROLE(), address(chestManager));

        // Also grant admin GATEWAY_ROLE on PlayerState so test helpers can call applyPositionSnapshot
        playerState.grantRole(playerState.GATEWAY_ROLE(), admin);

        vm.stopPrank();

        // Start at a known timestamp well inside first epoch
        vm.warp(EPOCH_SECS + 100);
    }

    // -----------------------------------------------------------------------
    // EIP-712 helpers
    // -----------------------------------------------------------------------

    function _domainSeparator() internal view returns (bytes32) {
        return keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256("DeFiTrail"),
            keccak256("1"),
            block.chainid,
            address(chestManager)
        ));
    }

    function _locationDigest(
        address player,
        bytes32 chestId,
        uint64 epoch,
        uint32 radius,
        bytes32 nonce,
        uint64 expiresAt,
        uint8 mode
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(abi.encode(
            LOCATION_PROOF_TYPEHASH,
            player,
            chestId,
            epoch,
            radius,
            nonce,
            expiresAt,
            mode
        ));
        return MessageHashUtils.toTypedDataHash(_domainSeparator(), structHash);
    }

    function _sponsorDigest(
        address player,
        bytes32 chestId,
        bytes32 campaignId,
        uint64 epoch,
        bytes32 nonce,
        uint64 expiresAt
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(abi.encode(
            SPONSOR_PROOF_TYPEHASH,
            player,
            chestId,
            campaignId,
            epoch,
            nonce,
            expiresAt
        ));
        return MessageHashUtils.toTypedDataHash(_domainSeparator(), structHash);
    }

    function _makeLocationProofWithEpoch(
        address player,
        bytes32 chestId,
        bytes32 nonce,
        uint64 epoch,
        uint64 expiresAt,
        uint256 signerKey
    ) internal view returns (ChestManager.LocationProof memory proof) {
        proof.player = player;
        proof.chestId = chestId;
        proof.epoch = epoch;
        proof.radiusMeters = 30;
        proof.nonce = nonce;
        proof.expiresAt = expiresAt;
        proof.mode = 0;

        bytes32 digest = _locationDigest(
            player, chestId, epoch, 30, nonce, expiresAt, 0
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerKey, digest);
        proof.signature = abi.encodePacked(r, s, v);
    }

    function _makeLocationProof(
        address player,
        bytes32 chestId,
        bytes32 nonce,
        uint64 expiresAt,
        uint256 signerKey
    ) internal view returns (ChestManager.LocationProof memory proof) {
        uint64 epoch = uint64(block.timestamp / EPOCH_SECS);
        return _makeLocationProofWithEpoch(player, chestId, nonce, epoch, expiresAt, signerKey);
    }

    function _makeSponsorProofWithEpoch(
        address player,
        bytes32 chestId,
        bytes32 campaignId,
        uint64 epoch,
        bytes32 nonce,
        uint64 expiresAt,
        uint256 signerKey
    ) internal view returns (ChestManager.SponsorProof memory proof) {
        proof.player = player;
        proof.chestId = chestId;
        proof.campaignId = campaignId;
        proof.epoch = epoch;
        proof.nonce = nonce;
        proof.expiresAt = expiresAt;

        bytes32 digest = _sponsorDigest(
            player, chestId, campaignId, epoch, nonce, expiresAt
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerKey, digest);
        proof.signature = abi.encodePacked(r, s, v);
    }

    function _makeSponsorProof(
        address player,
        bytes32 chestId,
        bytes32 campaignId,
        bytes32 nonce,
        uint64 expiresAt,
        uint256 signerKey
    ) internal view returns (ChestManager.SponsorProof memory proof) {
        uint64 epoch = uint64(block.timestamp / EPOCH_SECS);
        return _makeSponsorProofWithEpoch(player, chestId, campaignId, epoch, nonce, expiresAt, signerKey);
    }

    // -----------------------------------------------------------------------
    // 1. Replay attack — same nonce used twice
    // -----------------------------------------------------------------------
    function test_ReplayAttack() public {
        bytes32 chestId = keccak256("chest-0");
        bytes32 nonce   = keccak256("nonce-replay");
        bytes32 h3Cell  = keccak256("h3-0");
        uint64 exp      = uint64(block.timestamp + 60);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        // First open succeeds
        vm.prank(alice);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        // Build a second proof with the SAME nonce (different chestId to avoid AlreadyClaimed first)
        bytes32 chestId2 = keccak256("chest-99");
        ChestManager.LocationProof memory proof2 =
            _makeLocationProof(alice, chestId2, nonce, exp, signerPrivKey);

        // Second open with same nonce must revert
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.NonceAlreadyUsed.selector, nonce));
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof2);
    }

    // -----------------------------------------------------------------------
    // 2. Expired proof
    // -----------------------------------------------------------------------
    function test_ExpiredProof() public {
        bytes32 chestId = keccak256("chest-expired");
        bytes32 nonce   = keccak256("nonce-expired");
        bytes32 h3Cell  = keccak256("h3-expired");

        // expiresAt in the past
        uint64 exp = uint64(block.timestamp - 1);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(ChestManager.ProofExpired.selector, exp, uint64(block.timestamp))
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 3. TTL exceeded (expiresAt too far in future — > 90s from now)
    // -----------------------------------------------------------------------
    function test_ProofTtlExceeded() public {
        bytes32 chestId = keccak256("chest-ttl");
        bytes32 nonce   = keccak256("nonce-ttl");
        bytes32 h3Cell  = keccak256("h3-ttl");

        // expiresAt = now + 91 seconds (> PROOF_MAX_TTL = 90)
        uint64 exp = uint64(block.timestamp + 91);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(ChestManager.ProofTtlExceeded.selector, exp, uint64(block.timestamp))
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 4. Out-of-energy
    // -----------------------------------------------------------------------
    function test_OutOfEnergy() public {
        bytes32 h3Cell = keccak256("h3-energy");

        // alice starts with 0 energy (no snapshot; energyMax = 3+0 = 3 at epoch start)
        // Drain all energy by opening 3 chests in this epoch
        for (uint256 i = 0; i < 3; i++) {
            bytes32 chestId = keccak256(abi.encodePacked("chest-drain", i));
            bytes32 nonce   = keccak256(abi.encodePacked("nonce-drain", i));
            uint64 exp      = uint64(block.timestamp + 60);
            ChestManager.LocationProof memory drainProof =
                _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
            vm.prank(alice);
            chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, drainProof);
        }

        // 4th attempt must revert with OutOfEnergy
        bytes32 chestId4 = keccak256("chest-drain-4");
        bytes32 nonce4   = keccak256("nonce-drain-4");
        uint64 exp4      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof4 =
            _makeLocationProof(alice, chestId4, nonce4, exp4, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(PlayerState.OutOfEnergy.selector, alice, uint8(0))
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof4);
    }

    // -----------------------------------------------------------------------
    // 5. Duplicate claim — same chest/wallet/epoch
    // -----------------------------------------------------------------------
    function test_DuplicateClaimSameEpoch() public {
        bytes32 chestId = keccak256("chest-dup");
        bytes32 h3Cell  = keccak256("h3-dup");

        bytes32 nonce1 = keccak256("nonce-dup-1");
        uint64 exp     = uint64(block.timestamp + 60);

        ChestManager.LocationProof memory proof1 =
            _makeLocationProof(alice, chestId, nonce1, exp, signerPrivKey);
        vm.prank(alice);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof1);

        // Second claim same chest same epoch — different nonce but same (chestId, alice, epoch)
        bytes32 nonce2 = keccak256("nonce-dup-2");
        ChestManager.LocationProof memory proof2 =
            _makeLocationProof(alice, chestId, nonce2, exp, signerPrivKey);

        uint64 epoch = uint64(block.timestamp / EPOCH_SECS);
        bytes32 claimKey = keccak256(abi.encodePacked(chestId, alice, epoch));

        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.AlreadyClaimed.selector, claimKey));
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof2);
    }

    // -----------------------------------------------------------------------
    // 6. Wrong epoch in proof
    // -----------------------------------------------------------------------
    function test_WrongEpoch() public {
        bytes32 chestId = keccak256("chest-epoch");
        bytes32 nonce   = keccak256("nonce-epoch");
        bytes32 h3Cell  = keccak256("h3-epoch");
        uint64 exp      = uint64(block.timestamp + 60);

        uint64 currentEpoch = uint64(block.timestamp / EPOCH_SECS);

        // Manually craft proof with epoch - 1
        ChestManager.LocationProof memory proof;
        proof.player = alice;
        proof.chestId = chestId;
        proof.epoch = currentEpoch - 1; // wrong epoch
        proof.radiusMeters = 30;
        proof.nonce = nonce;
        proof.expiresAt = exp;
        proof.mode = 0;

        bytes32 digest = _locationDigest(alice, chestId, currentEpoch - 1, 30, nonce, exp, 0);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivKey, digest);
        proof.signature = abi.encodePacked(r, s, v);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(ChestManager.WrongEpoch.selector, currentEpoch - 1, currentEpoch)
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 7. Invalid signature (wrong signer key)
    // -----------------------------------------------------------------------
    function test_InvalidSignature() public {
        bytes32 chestId = keccak256("chest-sig");
        bytes32 nonce   = keccak256("nonce-sig");
        bytes32 h3Cell  = keccak256("h3-sig");
        uint64 exp      = uint64(block.timestamp + 60);

        uint256 wrongKey = 0xBADBAD;
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, wrongKey);

        vm.prank(alice);
        vm.expectRevert(ChestManager.InvalidSignature.selector);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 8. Player mismatch (proof.player != msg.sender)
    // -----------------------------------------------------------------------
    function test_PlayerMismatch() public {
        bytes32 chestId = keccak256("chest-mismatch");
        bytes32 nonce   = keccak256("nonce-mismatch");
        bytes32 h3Cell  = keccak256("h3-mismatch");
        uint64 exp      = uint64(block.timestamp + 60);

        // proof is signed for alice but bob calls
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(bob);
        vm.expectRevert(ChestManager.InvalidSignature.selector);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 9. Valid open — happy path
    // -----------------------------------------------------------------------
    function test_ValidOpen_HappyPath() public {
        bytes32 chestId = keccak256("chest-valid");
        bytes32 nonce   = keccak256("nonce-valid");
        bytes32 h3Cell  = keccak256("h3-valid");
        uint64 exp      = uint64(block.timestamp + 60);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        bytes32 requestId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        // requestId must be non-zero
        assertNotEq(requestId, bytes32(0));

        // Request is recorded
        (address player,,,, ChestManager.RequestStatus status,,) = chestManager.requests(requestId);
        assertEq(player, alice);
        assertEq(uint8(status), uint8(ChestManager.RequestStatus.CREATED));

        // Energy consumed: alice starts epoch with energyMax=3, consumed 1 → 2 remaining
        (uint8 energyCurrent,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyCurrent, 2);

        // H3 tracked
        uint32 h3Count = playerState.getUniqueH3Count(alice);
        assertEq(h3Count, 1);

        // Nonce and claim key are locked
        assertTrue(chestManager.usedNonces(nonce));
        bytes32 claimKey = keccak256(abi.encodePacked(chestId, alice, uint64(block.timestamp / EPOCH_SECS)));
        assertTrue(chestManager.claimedKeys(claimKey));
    }

    // -----------------------------------------------------------------------
    // 10. Energy refill on new epoch
    // -----------------------------------------------------------------------
    function test_EnergyRefillNewEpoch() public {
        uint256 currentTs = EPOCH_SECS + 100;
        vm.warp(currentTs);

        // Drain all 3 energy in epoch 1
        for (uint256 i = 0; i < 3; i++) {
            bytes32 chestId = keccak256(abi.encodePacked("refill-chest", i));
            bytes32 nonce   = keccak256(abi.encodePacked("refill-nonce", i));
            bytes32 h3Cell  = keccak256(abi.encodePacked("refill-h3", i));
            uint64 exp      = uint64(currentTs + 60);
            ChestManager.LocationProof memory refillProof =
                _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
            vm.prank(alice);
            chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, refillProof);
        }

        (uint8 energyBefore,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyBefore, 0);

        // Advance to next epoch (epoch 2)
        currentTs += EPOCH_SECS;
        vm.warp(currentTs);
        uint64 nextEpoch = uint64(currentTs / EPOCH_SECS);

        // Build proof with fresh expiresAt (must be after current block.timestamp and within 90s)
        bytes32 chestNew = keccak256("chest-new-epoch");
        bytes32 nonceNew = keccak256("nonce-new-epoch");
        bytes32 h3New    = keccak256("h3-new-epoch");
        uint64 expNew    = uint64(currentTs + 60); // 60s from now — within 90s TTL

        ChestManager.LocationProof memory proof =
            _makeLocationProofWithEpoch(alice, chestNew, nonceNew, nextEpoch, expNew, signerPrivKey);
        vm.prank(alice);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3New, proof);

        (uint8 energyAfter,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyAfter, 2); // refilled to 3, consumed 1 → 2
    }

    // -----------------------------------------------------------------------
    // 11. applyPositionSnapshot clamps energy
    // -----------------------------------------------------------------------
    function test_ApplySnapshot_ClampsEnergy() public {
        // Open one chest to consume 1 energy (alice starts at 3)
        bytes32 chestId = keccak256("clamp-chest");
        bytes32 nonce   = keccak256("clamp-nonce");
        bytes32 h3Cell  = keccak256("clamp-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
        vm.prank(alice);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        // energyCurrent = 2 at this point
        (uint8 energyBefore,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyBefore, 2);

        // Build snapshot helper (gateway = admin)
        PlayerState.PositionSnapshot memory snap;
        snap.player = alice;
        snap.weightedAprBps = 500;
        snap.questCompleted = false;

        // ---- Phase 1: Apply snapshot with high stats (10 USDC, streak 7) ----
        // powerLevel = floor((3+3)/2) = 3, energyMax = 6
        snap.requestId = keccak256("req-high");
        snap.principal = 10_000_000;
        snap.positionStreak = 7;
        snap.updatedAt = uint64(block.timestamp);
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        // energyCurrent = 2, max = 6 → no clamp
        (uint8 e1,,,,,,, ) = playerState.getStats(alice);
        assertEq(e1, 2);

        // ---- Phase 2: Advance epoch so energy refills to 6 ----
        vm.warp(block.timestamp + EPOCH_SECS);

        // Trigger refill via consumeEnergy from gateway (admin has GATEWAY_ROLE)
        vm.prank(admin);
        playerState.consumeEnergy(alice);  // refills to 6, then consumes 1 → 5

        (uint8 e2,,,,,,, ) = playerState.getStats(alice);
        assertEq(e2, 5);

        // ---- Phase 3: Apply snapshot with 0 assets → energyMax = 3 → clamp 5 → 3 ----
        snap.requestId = keccak256("req-clamp");
        snap.principal = 0;
        snap.positionStreak = 0;
        snap.updatedAt = uint64(block.timestamp + 1);
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        (uint8 eClamped,,,,,,, ) = playerState.getStats(alice);
        assertEq(eClamped, 3); // clamped from 5 → 3
    }

    // -----------------------------------------------------------------------
    // 12. applyPositionSnapshot — stats derived correctly
    // -----------------------------------------------------------------------
    function test_ApplySnapshot_UpdatesStats() public {
        // Apply snapshot: 5 USDC, streak = 3
        // balanceTier = 2 (5 ≥ 5), streakTier = 2 (3-6)
        // powerLevel = floor((2+2)/2) = 2
        // energyMax = 5, openRadius = 40, compassLevel = 3
        // explorationScore = 0 + min(3,7) = 3 → RARE
        PlayerState.PositionSnapshot memory snap;
        snap.requestId = keccak256("req-stats");
        snap.player = alice;
        snap.principal = 5_000_000;
        snap.accruedReward = 0;
        snap.positionStreak = 3;
        snap.weightedAprBps = 625;
        snap.updatedAt = uint64(block.timestamp);
        snap.questCompleted = false;

        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        (
            ,
            uint8 energyMax,
            uint8 powerLevel,
            uint32 openRadius,
            uint8 compassLevel,
            ,
            PlayerState.Rarity rar,

        ) = playerState.getStats(alice);

        assertEq(powerLevel, 2);
        assertEq(energyMax, 5);
        assertEq(openRadius, 40);
        assertEq(compassLevel, 3);
        assertEq(uint8(rar), uint8(PlayerState.Rarity.RARE));
    }

    // -----------------------------------------------------------------------
    // 13. refundEnergy on FAILED_FINAL
    // -----------------------------------------------------------------------
    function test_RefundEnergy_OnFailedFinal() public {
        // Open one chest (consumes 1 energy)
        bytes32 chestId = keccak256("refund-chest");
        bytes32 nonce   = keccak256("refund-nonce");
        bytes32 h3Cell  = keccak256("refund-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
        vm.prank(alice);
        bytes32 requestId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        (uint8 energyAfterOpen,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyAfterOpen, 2); // 3 - 1 = 2

        // Gateway updates status to FAILED_FINAL → triggers refundEnergy
        vm.prank(gateway);
        chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.FAILED_FINAL);

        (uint8 energyAfterRefund,,,,,,, ) = playerState.getStats(alice);
        assertEq(energyAfterRefund, 3); // 2 + 1 = 3
    }

    // -----------------------------------------------------------------------
    // 14. Terminal state cannot be overwritten
    // -----------------------------------------------------------------------
    function test_UpdateRequestStatus_TerminalCannotBeOverwritten() public {
        bytes32 chestId = keccak256("terminal-chest");
        bytes32 nonce   = keccak256("terminal-nonce");
        bytes32 h3Cell  = keccak256("terminal-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
        vm.prank(alice);
        bytes32 requestId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        // Move to CONFIRMED
        vm.prank(gateway);
        chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.SENT);
        vm.prank(gateway);
        chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.CONFIRMED);

        // Attempt to overwrite CONFIRMED → revert
        vm.prank(gateway);
        vm.expectRevert(
            abi.encodeWithSelector(
                ChestManager.InvalidStatusTransition.selector,
                ChestManager.RequestStatus.CONFIRMED,
                ChestManager.RequestStatus.RETRYABLE_FAILED
            )
        );
        chestManager.updateRequestStatus(requestId, ChestManager.RequestStatus.RETRYABLE_FAILED);
    }

    function test_UpdateRequestStatus_FailedFinalCannotBeOverwritten() public {
        bytes32 chestId = keccak256("ff-chest");
        bytes32 nonce   = keccak256("ff-nonce");
        bytes32 h3Cell  = keccak256("ff-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
        vm.prank(alice);
        bytes32 reqId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.FAILED_FINAL);

        vm.prank(gateway);
        vm.expectRevert(
            abi.encodeWithSelector(
                ChestManager.InvalidStatusTransition.selector,
                ChestManager.RequestStatus.FAILED_FINAL,
                ChestManager.RequestStatus.CONFIRMED
            )
        );
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.CONFIRMED);
    }

    // -----------------------------------------------------------------------
    // 15. Sponsor proof — happy path
    // -----------------------------------------------------------------------
    function test_SponsorProof_HappyPath() public {
        bytes32 chestId    = keccak256("sponsor-chest");
        bytes32 campaignId = keccak256("demo-coffee-v1");
        bytes32 nonce      = keccak256("sponsor-nonce");
        bytes32 h3Cell     = keccak256("sponsor-h3");
        uint64 exp         = uint64(block.timestamp + 60);

        ChestManager.SponsorProof memory proof =
            _makeSponsorProof(alice, chestId, campaignId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        bytes32 requestId = chestManager.openSponsorChest(h3Cell, proof);

        assertNotEq(requestId, bytes32(0));

        (address player,, ChestManager.ChestType chestType,, ChestManager.RequestStatus status,,) =
            chestManager.requests(requestId);
        assertEq(player, alice);
        assertEq(uint8(chestType), uint8(ChestManager.ChestType.SPONSOR));
        assertEq(uint8(status), uint8(ChestManager.RequestStatus.CREATED));
    }

    // -----------------------------------------------------------------------
    // 16. Sponsor proof — replay attack
    // -----------------------------------------------------------------------
    function test_SponsorProof_ReplayAttack() public {
        bytes32 chestId    = keccak256("sponsor-replay");
        bytes32 campaignId = keccak256("demo-coffee-v1");
        bytes32 nonce      = keccak256("sponsor-replay-nonce");
        bytes32 h3Cell     = keccak256("sponsor-replay-h3");
        uint64 exp         = uint64(block.timestamp + 60);

        ChestManager.SponsorProof memory proof =
            _makeSponsorProof(alice, chestId, campaignId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        chestManager.openSponsorChest(h3Cell, proof);

        // Try same nonce again with different chestId
        bytes32 chestId2 = keccak256("sponsor-replay-2");
        ChestManager.SponsorProof memory proof2 =
            _makeSponsorProof(alice, chestId2, campaignId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.NonceAlreadyUsed.selector, nonce));
        chestManager.openSponsorChest(h3Cell, proof2);
    }

    // -----------------------------------------------------------------------
    // 17. ChestManager constructor edge cases
    // -----------------------------------------------------------------------
    function test_ChestManager_Constructor_EdgeCases() public {
        vm.expectRevert(ChestManager.ZeroAddress.selector);
        new ChestManager(address(0), address(playerState), gateway, EPOCH_SECS, admin);

        vm.expectRevert(ChestManager.ZeroAddress.selector);
        new ChestManager(proofSigner, address(0), gateway, EPOCH_SECS, admin);

        vm.expectRevert(ChestManager.ZeroAddress.selector);
        new ChestManager(proofSigner, address(playerState), address(0), EPOCH_SECS, admin);

        // epoch = 0 defaults to 86400; admin = 0 defaults to msg.sender
        ChestManager cm = new ChestManager(proofSigner, address(playerState), gateway, 0, address(0));
        assertEq(cm.epochSeconds(), 86_400);
        assertTrue(cm.hasRole(cm.DEFAULT_ADMIN_ROLE(), address(this)));
    }

    // -----------------------------------------------------------------------
    // 18. PlayerState constructor defaults
    // -----------------------------------------------------------------------
    function test_PlayerState_Constructor_Defaults() public {
        PlayerState ps = new PlayerState(0, address(0));
        assertEq(ps.epochSeconds(), 86_400);
        assertTrue(ps.hasRole(ps.DEFAULT_ADMIN_ROLE(), address(this)));
    }

    // -----------------------------------------------------------------------
    // 19. ChestManager admin: setProofSigner
    // -----------------------------------------------------------------------
    function test_ChestManager_Admin_SetProofSigner() public {
        vm.prank(admin);
        vm.expectRevert(ChestManager.ZeroAddress.selector);
        chestManager.setProofSigner(address(0));

        vm.prank(bob);
        vm.expectRevert();
        chestManager.setProofSigner(bob);

        vm.prank(admin);
        chestManager.setProofSigner(bob);
        assertEq(chestManager.proofSigner(), bob);
    }

    // -----------------------------------------------------------------------
    // 20. ChestManager admin: setGameICMGateway
    // -----------------------------------------------------------------------
    function test_ChestManager_Admin_SetGameICMGateway() public {
        vm.prank(admin);
        vm.expectRevert(ChestManager.ZeroAddress.selector);
        chestManager.setGameICMGateway(address(0));

        vm.prank(bob);
        vm.expectRevert();
        chestManager.setGameICMGateway(bob);

        address newGateway = makeAddr("newGateway");
        vm.prank(admin);
        chestManager.setGameICMGateway(newGateway);
        assertEq(chestManager.gameICMGateway(), newGateway);
        assertTrue(chestManager.hasRole(chestManager.GATEWAY_ROLE(), newGateway));
        assertFalse(chestManager.hasRole(chestManager.GATEWAY_ROLE(), gateway));
    }

    // -----------------------------------------------------------------------
    // 21. Sponsor proof error cases (expired, ttl, wrong epoch, player mismatch, invalid sig, dup)
    // -----------------------------------------------------------------------
    function test_SponsorProof_ErrorCases() public {
        bytes32 chestId    = keccak256("sponsor-err");
        bytes32 campaignId = keccak256("campaign-err");
        bytes32 h3Cell     = keccak256("sponsor-err-h3");
        uint64 now_        = uint64(block.timestamp);

        // 1. Player mismatch
        ChestManager.SponsorProof memory p1 = _makeSponsorProof(
            alice, chestId, campaignId, keccak256("sp-non-1"), uint64(now_ + 60), signerPrivKey
        );
        vm.prank(bob);
        vm.expectRevert(ChestManager.InvalidSignature.selector);
        chestManager.openSponsorChest(h3Cell, p1);

        // 2. Expired
        ChestManager.SponsorProof memory p2 = _makeSponsorProof(
            alice, chestId, campaignId, keccak256("sp-non-2"), uint64(now_ - 1), signerPrivKey
        );
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.ProofExpired.selector, uint64(now_ - 1), now_));
        chestManager.openSponsorChest(h3Cell, p2);

        // 3. TTL exceeded (> 90s)
        ChestManager.SponsorProof memory p3 = _makeSponsorProof(
            alice, chestId, campaignId, keccak256("sp-non-3"), uint64(now_ + 91), signerPrivKey
        );
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.ProofTtlExceeded.selector, uint64(now_ + 91), now_));
        chestManager.openSponsorChest(h3Cell, p3);

        // 4. Wrong epoch
        ChestManager.SponsorProof memory p4 = _makeSponsorProofWithEpoch(
            alice, chestId, campaignId, 999, keccak256("sp-non-4"), uint64(now_ + 60), signerPrivKey
        );
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.WrongEpoch.selector, uint64(999), uint64(now_ / EPOCH_SECS)));
        chestManager.openSponsorChest(h3Cell, p4);

        // 5. Invalid signature (signed with bob's key)
        uint256 wrongKey = 0xBAD;
        ChestManager.SponsorProof memory p5 = _makeSponsorProof(
            alice, chestId, campaignId, keccak256("sp-non-5"), uint64(now_ + 60), wrongKey
        );
        vm.prank(alice);
        vm.expectRevert(ChestManager.InvalidSignature.selector);
        chestManager.openSponsorChest(h3Cell, p5);

        // 6. Duplicate claim in same epoch
        bytes32 claimChest = keccak256("sp-dup-chest");
        ChestManager.SponsorProof memory p6a = _makeSponsorProof(
            alice, claimChest, campaignId, keccak256("sp-non-6a"), uint64(now_ + 60), signerPrivKey
        );
        vm.prank(alice);
        chestManager.openSponsorChest(h3Cell, p6a);

        ChestManager.SponsorProof memory p6b = _makeSponsorProof(
            alice, claimChest, campaignId, keccak256("sp-non-6b"), uint64(now_ + 60), signerPrivKey
        );
        bytes32 claimKey = keccak256(abi.encodePacked(claimChest, alice, uint64(now_ / EPOCH_SECS)));
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.AlreadyClaimed.selector, claimKey));
        chestManager.openSponsorChest(h3Cell, p6b);
    }

    // -----------------------------------------------------------------------
    // 22. UpdateRequestStatus: RequestNotFound & non-gateway & transitions
    // -----------------------------------------------------------------------
    function test_UpdateRequestStatus_LifecycleAndAccess() public {
        bytes32 bogusId = keccak256("bogus");
        vm.prank(gateway);
        vm.expectRevert(abi.encodeWithSelector(ChestManager.RequestNotFound.selector, bogusId));
        chestManager.updateRequestStatus(bogusId, ChestManager.RequestStatus.SENT);

        // Create a real request
        bytes32 chestId = keccak256("lc-chest");
        bytes32 nonce   = keccak256("lc-nonce");
        bytes32 h3Cell  = keccak256("lc-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);
        vm.prank(alice);
        bytes32 reqId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);

        // Non-gateway caller reverts
        vm.prank(bob);
        vm.expectRevert();
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.SENT);

        // Progress status: CREATED -> SENT -> REMOTE_EXECUTED -> ACK_PENDING -> CONFIRMED
        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.SENT);
        (,,,, ChestManager.RequestStatus s1,,) = chestManager.requests(reqId);
        assertEq(uint8(s1), uint8(ChestManager.RequestStatus.SENT));

        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.REMOTE_EXECUTED);
        (,,,, ChestManager.RequestStatus s2,,) = chestManager.requests(reqId);
        assertEq(uint8(s2), uint8(ChestManager.RequestStatus.REMOTE_EXECUTED));

        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.ACK_PENDING);
        (,,,, ChestManager.RequestStatus s3,,) = chestManager.requests(reqId);
        assertEq(uint8(s3), uint8(ChestManager.RequestStatus.ACK_PENDING));

        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId, ChestManager.RequestStatus.CONFIRMED);
        (,,,, ChestManager.RequestStatus s4,,) = chestManager.requests(reqId);
        assertEq(uint8(s4), uint8(ChestManager.RequestStatus.CONFIRMED));

        // RETRYABLE_FAILED on another request
        bytes32 chestId2 = keccak256("lc-chest-2");
        bytes32 nonce2   = keccak256("lc-nonce-2");
        ChestManager.LocationProof memory proof2 =
            _makeLocationProof(alice, chestId2, nonce2, exp, signerPrivKey);
        vm.prank(alice);
        bytes32 reqId2 = chestManager.openChest(ChestManager.ChestType.QUEST, h3Cell, proof2);

        vm.prank(gateway);
        chestManager.updateRequestStatus(reqId2, ChestManager.RequestStatus.RETRYABLE_FAILED);
        (,,,, ChestManager.RequestStatus sRetry,,) = chestManager.requests(reqId2);
        assertEq(uint8(sRetry), uint8(ChestManager.RequestStatus.RETRYABLE_FAILED));
    }

    // -----------------------------------------------------------------------
    // 23. PlayerState: ZeroAddress player & non-gateway access
    // -----------------------------------------------------------------------
    function test_PlayerState_ApplySnapshot_ZeroAddressAndUnauthorized() public {
        PlayerState.PositionSnapshot memory snap;
        snap.player = address(0);

        vm.prank(admin);
        vm.expectRevert(PlayerState.ZeroAddress.selector);
        playerState.applyPositionSnapshot(snap);

        snap.player = alice;
        vm.prank(bob);
        vm.expectRevert();
        playerState.applyPositionSnapshot(snap);
    }

    // -----------------------------------------------------------------------
    // 24. PlayerState: All Balance & Streak Tiers & Rarity Transitions
    // -----------------------------------------------------------------------
    function test_PlayerState_AllTiersAndRarities() public {
        // Tier 0 balance (<1 USDC) & Streak 0 -> power = 0, rarity = COMMON
        PlayerState.PositionSnapshot memory snap;
        snap.player = bob;
        snap.principal = 999_999;
        snap.positionStreak = 0;
        snap.updatedAt = uint64(block.timestamp);
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,, uint8 power0,,,, PlayerState.Rarity rar0,) = playerState.getStats(bob);
        assertEq(power0, 0);
        assertEq(uint8(rar0), uint8(PlayerState.Rarity.COMMON));

        // Tier 1 balance (1-5 USDC) & Streak 1 -> power = 1
        snap.principal = 1_000_000;
        snap.positionStreak = 1;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,, uint8 power1,,,,,) = playerState.getStats(bob);
        assertEq(power1, 1);

        // Streak 2 (still tier 1)
        snap.positionStreak = 2;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,, uint8 power1b,,,,,) = playerState.getStats(bob);
        assertEq(power1b, 1);

        // Tier 2 balance (5-10 USDC) & Streak 4 -> power = 2, score = 4 -> RARE
        snap.principal = 5_000_000;
        snap.positionStreak = 4;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,, uint8 power2,,,, PlayerState.Rarity rar2,) = playerState.getStats(bob);
        assertEq(power2, 2);
        assertEq(uint8(rar2), uint8(PlayerState.Rarity.RARE));

        // Streak 6 (score 6) -> EPIC
        snap.positionStreak = 6;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,,,,,, PlayerState.Rarity rarEpic,) = playerState.getStats(bob);
        assertEq(uint8(rarEpic), uint8(PlayerState.Rarity.EPIC));

        // Tier 3 balance (>=10 USDC) & Streak >= 7 (tier 3) -> power = 3, score = 7 (EPIC)
        snap.principal = 10_000_000;
        snap.positionStreak = 10;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        (,, uint8 power3,,,, PlayerState.Rarity rar3,) = playerState.getStats(bob);
        assertEq(power3, 3);
        assertEq(uint8(rar3), uint8(PlayerState.Rarity.EPIC));

        // Give bob 3 unique H3 opens via admin -> explorationScore = 3 + 7 = 10 -> LEGENDARY
        vm.startPrank(admin);
        playerState.recordH3Open(bob, keccak256("h3-bob-1"));
        playerState.recordH3Open(bob, keccak256("h3-bob-2"));
        playerState.recordH3Open(bob, keccak256("h3-bob-3"));
        vm.stopPrank();

        (,,,,, uint32 scoreLeg, PlayerState.Rarity rarLeg,) = playerState.getStats(bob);
        assertEq(scoreLeg, 10);
        assertEq(uint8(rarLeg), uint8(PlayerState.Rarity.LEGENDARY));
    }

    function test_ChestManager_RarityFromScore_RareEpicLegendary() public {
        address charlie = makeAddr("charlie");
        PlayerState.PositionSnapshot memory snap;
        snap.player = charlie;
        snap.updatedAt = uint64(block.timestamp);

        // 1. RARE chest (score = 4)
        snap.principal = 5_000_000;
        snap.positionStreak = 4;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        uint64 exp = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proofRare =
            _makeLocationProof(charlie, keccak256("c-rare"), keccak256("n-rare"), exp, signerPrivKey);
        vm.prank(charlie);
        bytes32 reqRare = chestManager.openChest(ChestManager.ChestType.YIELD, keccak256("h3-cr"), proofRare);
        (,,, ChestManager.Rarity rRare,,,) = chestManager.requests(reqRare);
        assertEq(uint8(rRare), uint8(ChestManager.Rarity.RARE));

        // 2. EPIC chest (score = 6)
        snap.positionStreak = 6;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        ChestManager.LocationProof memory proofEpic =
            _makeLocationProof(charlie, keccak256("c-epic"), keccak256("n-epic"), exp, signerPrivKey);
        vm.prank(charlie);
        bytes32 reqEpic = chestManager.openChest(ChestManager.ChestType.YIELD, keccak256("h3-ce"), proofEpic);
        (,,, ChestManager.Rarity rEpic,,,) = chestManager.requests(reqEpic);
        assertEq(uint8(rEpic), uint8(ChestManager.Rarity.EPIC));

        // 3. LEGENDARY chest (unique = 3 + streak 7 = 10)
        snap.principal = 10_000_000;
        snap.positionStreak = 7;
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        vm.startPrank(admin);
        playerState.recordH3Open(charlie, keccak256("h3-c-1"));
        playerState.recordH3Open(charlie, keccak256("h3-c-2"));
        playerState.recordH3Open(charlie, keccak256("h3-c-3"));
        vm.stopPrank();

        ChestManager.LocationProof memory proofLeg =
            _makeLocationProof(charlie, keccak256("c-leg"), keccak256("n-leg"), exp, signerPrivKey);
        vm.prank(charlie);
        bytes32 reqLeg = chestManager.openChest(ChestManager.ChestType.YIELD, keccak256("h3-cl"), proofLeg);
        (,,, ChestManager.Rarity rLeg,,,) = chestManager.requests(reqLeg);
        assertEq(uint8(rLeg), uint8(ChestManager.Rarity.LEGENDARY));
    }

    // -----------------------------------------------------------------------
    // 25. PlayerState: refundEnergy when already at max does not exceed
    // -----------------------------------------------------------------------
    function test_PlayerState_RefundEnergy_DoesNotExceedMax() public {
        // Alice starts with 3 energy (max = 3)
        // First action in epoch refills to 3
        vm.prank(admin);
        playerState.refundEnergy(alice);

        (uint8 eCurrent, uint8 eMax,,,,,,) = playerState.getStats(alice);
        assertEq(eCurrent, 1);
        assertLe(eCurrent, eMax);

        // Refund multiple times up to max
        vm.startPrank(admin);
        playerState.refundEnergy(alice);
        playerState.refundEnergy(alice);
        playerState.refundEnergy(alice); // should cap at max = 3
        vm.stopPrank();

        (uint8 eCurrent2,,,,,,,) = playerState.getStats(alice);
        assertEq(eCurrent2, 3);
    }

    // -----------------------------------------------------------------------
    // 26. PlayerState: recordH3Open duplicate cell does not increment
    // -----------------------------------------------------------------------
    function test_PlayerState_RecordH3Open_Duplicates() public {
        bytes32 cellA = keccak256("cell-A");
        bytes32 cellB = keccak256("cell-B");

        vm.startPrank(admin);
        playerState.recordH3Open(alice, cellA);
        assertEq(playerState.getUniqueH3Count(alice), 1);

        // Duplicate cellA
        playerState.recordH3Open(alice, cellA);
        assertEq(playerState.getUniqueH3Count(alice), 1);

        // New cellB
        playerState.recordH3Open(alice, cellB);
        assertEq(playerState.getUniqueH3Count(alice), 2);
        vm.stopPrank();
    }

    // -----------------------------------------------------------------------
    // 27. PlayerState: Unauthorized role reverts
    // -----------------------------------------------------------------------
    function test_PlayerState_UnauthorizedRoleReverts() public {
        vm.prank(bob);
        vm.expectRevert();
        playerState.consumeEnergy(alice);

        vm.prank(bob);
        vm.expectRevert();
        playerState.refundEnergy(alice);

        vm.prank(bob);
        vm.expectRevert();
        playerState.recordH3Open(alice, keccak256("cell"));
    }

    // -----------------------------------------------------------------------
    // 28. PlayerState: getEnergyMax and currentEpoch views
    // -----------------------------------------------------------------------
    function test_PlayerState_Views() public view {
        uint8 eMax = playerState.getEnergyMax(alice);
        assertEq(eMax, 3);

        uint64 ep = playerState.currentEpoch();
        assertEq(ep, uint64(block.timestamp / EPOCH_SECS));
    }

    // -----------------------------------------------------------------------
    // 29. Fuzz: Time warp epoch refill never overflows or jumps energy
    // -----------------------------------------------------------------------
    function testFuzz_TimeWarp_EpochRefillNeverSkipsOrOverflows(uint32 deltaSeconds) public {
        // Alice starts in epoch 1 with 3 energy
        // Consume 1 energy in epoch 1
        vm.prank(admin);
        playerState.consumeEnergy(alice); // energyCurrent = 2, lastEnergyEpoch = 1

        uint64 startEpoch = playerState.currentEpoch(); // 1
        uint256 startTs = block.timestamp;

        // Warp forward by arbitrary deltaSeconds (up to ~10 years)
        vm.warp(startTs + deltaSeconds);
        uint64 newEpoch = playerState.currentEpoch();

        // Gateway consumes energy
        vm.prank(admin);
        playerState.consumeEnergy(alice);

        (uint8 energyCurrent, uint8 energyMax, uint8 powerLevel,,,,,) = playerState.getStats(alice);

        if (newEpoch == startEpoch) {
            // Still in same epoch: consumed 1 more, no refill -> energy was 2, now 1
            assertEq(energyCurrent, 1);
        } else {
            // New epoch: refilled to energyMax (3), then consumed 1 -> energy is 2
            assertEq(energyCurrent, energyMax - 1);
            assertEq(energyCurrent, 2);
        }

        // Invariants
        assertLe(energyCurrent, energyMax);
        assertEq(powerLevel, 0);
        assertEq(energyMax, 3);
    }

    // -----------------------------------------------------------------------
    // 30. Fuzz: Snapshot stats & clamping invariants for arbitrary values
    // -----------------------------------------------------------------------
    function testFuzz_Snapshot_StatsAlwaysWithinBounds(
        uint256 principal,
        uint256 accruedReward,
        uint32 streak
    ) public {
        // Prevent overflow on arithmetic sum (principal + accruedReward)
        if (principal > type(uint256).max - accruedReward) return;

        PlayerState.PositionSnapshot memory snap;
        snap.player = bob;
        snap.principal = principal;
        snap.accruedReward = accruedReward;
        snap.positionStreak = streak;
        snap.weightedAprBps = 1000;
        snap.updatedAt = uint64(block.timestamp);
        snap.questCompleted = false;

        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        (
            uint8 energyCurrent,
            uint8 energyMax,
            uint8 powerLevel,
            uint32 openRadius,
            uint8 compassLevel,
            uint32 explorationScore,
            PlayerState.Rarity rar,
            uint64 lastSnapshotAt
        ) = playerState.getStats(bob);

        // Core progression invariants (PRD §5.4, §5.5)
        assertTrue(powerLevel <= 3, "powerLevel must be <= 3");
        assertTrue(energyMax >= 3 && energyMax <= 6, "energyMax in [3, 6]");
        assertEq(energyMax, 3 + powerLevel, "energyMax == 3 + powerLevel");
        assertEq(openRadius, 30 + uint32(5) * powerLevel, "openRadius formula");
        assertTrue(openRadius >= 30 && openRadius <= 45, "openRadius in [30, 45]");
        assertEq(compassLevel, 1 + powerLevel, "compassLevel formula");
        assertTrue(compassLevel >= 1 && compassLevel <= 4, "compassLevel in [1, 4]");

        // Energy clamping invariant (PRD §4.5)
        assertTrue(energyCurrent <= energyMax, "energyCurrent must never exceed energyMax");

        // Exploration score: uniqueH3 (0) + min(streak, 7)
        uint32 expectedScore = streak > 7 ? 7 : streak;
        assertEq(explorationScore, expectedScore, "explorationScore capped at 7");

        // Rarity mapping invariant
        if (explorationScore >= 10) {
            assertEq(uint8(rar), uint8(PlayerState.Rarity.LEGENDARY));
        } else if (explorationScore >= 6) {
            assertEq(uint8(rar), uint8(PlayerState.Rarity.EPIC));
        } else if (explorationScore >= 3) {
            assertEq(uint8(rar), uint8(PlayerState.Rarity.RARE));
        } else {
            assertEq(uint8(rar), uint8(PlayerState.Rarity.COMMON));
        }

        assertEq(lastSnapshotAt, uint64(block.timestamp));
    }

    // -----------------------------------------------------------------------
    // 31. Fuzz: Proof TTL timing boundaries (valid in [now, now+90s])
    // -----------------------------------------------------------------------
    function testFuzz_ProofTiming_TtlBoundaries(uint8 offsetSeconds) public {
        vm.assume(offsetSeconds <= 90);

        bytes32 chestId = keccak256(abi.encodePacked("fuzz-ttl-chest", offsetSeconds));
        bytes32 nonce   = keccak256(abi.encodePacked("fuzz-ttl-nonce", offsetSeconds));
        bytes32 h3Cell  = keccak256(abi.encodePacked("fuzz-ttl-h3", offsetSeconds));
        uint64 exp      = uint64(block.timestamp + offsetSeconds);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        bytes32 reqId = chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
        assertTrue(reqId != bytes32(0));
    }

    // -----------------------------------------------------------------------
    // 32. Fuzz: Proof TTL exceeded (> 90s) always reverts
    // -----------------------------------------------------------------------
    function testFuzz_ProofTiming_ExceededAlwaysReverts(uint16 excessSeconds) public {
        vm.assume(excessSeconds >= 91 && excessSeconds <= 10000);

        bytes32 chestId = keccak256(abi.encodePacked("fuzz-exceed-chest", excessSeconds));
        bytes32 nonce   = keccak256(abi.encodePacked("fuzz-exceed-nonce", excessSeconds));
        bytes32 h3Cell  = keccak256(abi.encodePacked("fuzz-exceed-h3", excessSeconds));
        uint64 exp      = uint64(block.timestamp + excessSeconds);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(ChestManager.ProofTtlExceeded.selector, exp, uint64(block.timestamp))
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 33. Fuzz: Expired proof in the past (< now) always reverts
    // -----------------------------------------------------------------------
    function testFuzz_ProofTiming_PastAlwaysReverts(uint16 pastSeconds) public {
        vm.assume(pastSeconds >= 1 && pastSeconds <= uint64(block.timestamp));

        bytes32 chestId = keccak256(abi.encodePacked("fuzz-past-chest", pastSeconds));
        bytes32 nonce   = keccak256(abi.encodePacked("fuzz-past-nonce", pastSeconds));
        bytes32 h3Cell  = keccak256(abi.encodePacked("fuzz-past-h3", pastSeconds));
        uint64 exp      = uint64(block.timestamp - pastSeconds);

        ChestManager.LocationProof memory proof =
            _makeLocationProof(alice, chestId, nonce, exp, signerPrivKey);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(ChestManager.ProofExpired.selector, exp, uint64(block.timestamp))
        );
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
    }

    // -----------------------------------------------------------------------
    // 34. Gas Benchmark: Per-transaction costs (single action gas profile)
    // -----------------------------------------------------------------------
    function test_GasBenchmark_SingleActionProfiles() public {
        // 1. Gas for single applyPositionSnapshot (fresh player, 4 slots)
        PlayerState.PositionSnapshot memory snap;
        snap.player = makeAddr("gasPlayer");
        snap.principal = 10_000_000;
        snap.positionStreak = 7;
        snap.weightedAprBps = 1200;
        snap.updatedAt = uint64(block.timestamp);

        uint256 gasBeforeSnap = gasleft();
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        uint256 gasUsedSnap = gasBeforeSnap - gasleft();
        assertTrue(gasUsedSnap < 180_000, "applyPositionSnapshot should be < 180k gas");

        // 2. Gas for energy refill on new epoch (O(1), zero loops)
        address gasPlayer = snap.player;
        uint256 gasBeforeRefill = gasleft();
        vm.prank(admin);
        playerState.consumeEnergy(gasPlayer); // refills to 6, consumes to 5
        uint256 gasUsedRefill = gasBeforeRefill - gasleft();
        assertTrue(gasUsedRefill < 130_000, "Refill consumeEnergy should be < 130k gas");

        // 3. Gas for normal consumeEnergy without refill (same epoch)
        uint256 gasBeforeNormal = gasleft();
        vm.prank(admin);
        playerState.consumeEnergy(gasPlayer); // 5 -> 4
        uint256 gasUsedNormal = gasBeforeNormal - gasleft();
        assertTrue(gasUsedNormal < 70_000, "Normal consumeEnergy should be < 70k gas");

        // 4. Gas for single openChest (EIP-712 recovery + storage)
        bytes32 chestId = keccak256("bench-chest");
        bytes32 nonce   = keccak256("bench-nonce");
        bytes32 h3Cell  = keccak256("bench-h3");
        uint64 exp      = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof =
            _makeLocationProof(gasPlayer, chestId, nonce, exp, signerPrivKey);

        uint256 gasBeforeOpen = gasleft();
        vm.prank(gasPlayer);
        chestManager.openChest(ChestManager.ChestType.YIELD, h3Cell, proof);
        uint256 gasUsedOpen = gasBeforeOpen - gasleft();
        assertTrue(gasUsedOpen < 350_000, "openChest should be < 350k gas");
    }

    // -----------------------------------------------------------------------
    // 35. PlayerState: Quest completion awards XP and updates exploration
    // -----------------------------------------------------------------------
    function test_PlayerState_QuestCompletion_AwardsXpAndExploration() public {
        address player = makeAddr("questPlayer");
        bytes32 reqId = keccak256("QUEST_REQ_1");

        assertEq(playerState.getXp(player), 0);
        assertEq(playerState.getQuestsCompleted(player), 0);

        PlayerState.PositionSnapshot memory snap = PlayerState.PositionSnapshot({
            requestId: reqId,
            player: player,
            principal: 500_000,
            accruedReward: 0,
            weightedAprBps: 500,
            positionStreak: 0,
            updatedAt: uint64(block.timestamp),
            questCompleted: true
        });

        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        // XP awarded (+100) and quests completed (+1)
        assertEq(playerState.getXp(player), 100);
        assertEq(playerState.getQuestsCompleted(player), 1);

        (,,,,, uint32 explorationScore,,) = playerState.getStats(player);
        assertEq(explorationScore, 1); // 0 uniqueH3 + 0 streak + 1 quest
    }

    // -----------------------------------------------------------------------
    // 36. PlayerState: Duplicate snapshot delivery does not repeat XP
    // -----------------------------------------------------------------------
    function test_PlayerState_QuestCompletion_DuplicateAckDoesNotRepeatXp() public {
        address player = makeAddr("questPlayer2");
        bytes32 reqId = keccak256("QUEST_REQ_2");

        PlayerState.PositionSnapshot memory snap = PlayerState.PositionSnapshot({
            requestId: reqId,
            player: player,
            principal: 1_000_000,
            accruedReward: 0,
            weightedAprBps: 625,
            positionStreak: 0,
            updatedAt: uint64(block.timestamp),
            questCompleted: true
        });

        // 1st delivery
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);
        assertEq(playerState.getXp(player), 100);
        assertEq(playerState.getQuestsCompleted(player), 1);

        // 2nd delivery (duplicate ICM ack replay)
        vm.prank(admin);
        playerState.applyPositionSnapshot(snap);

        // XP and exploration bonus must strictly remain 100 and 1 (no repeat!)
        assertEq(playerState.getXp(player), 100);
        assertEq(playerState.getQuestsCompleted(player), 1);
        assertTrue(playerState.completedQuestRequests(reqId));
    }
}
