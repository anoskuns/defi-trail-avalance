// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {ChestManager} from "../packages/contracts-l1/src/ChestManager.sol";
import {GameICMGateway} from "../packages/contracts-l1/src/GameICMGateway.sol";
import {PlayerState} from "../packages/contracts-l1/src/PlayerState.sol";
import {
    ITeleporterMessenger,
    ITeleporterReceiver
} from "../packages/contracts-l1/src/interfaces/ITeleporterMessenger.sol";
import {CChainICMGateway} from "contracts-cchain/src/CChainICMGateway.sol";
import {MockUSDC} from "contracts-cchain/src/MockUSDC.sol";
import {SponsorPool} from "contracts-cchain/src/SponsorPool.sol";
import {YieldVault} from "contracts-cchain/src/YieldVault.sol";

/**
 *  @dev Deterministic in-memory Teleporter used only by this integration test.
 */
contract MockTeleporterMessenger is ITeleporterMessenger {
    struct Envelope {
        bytes32 originBlockchainID;
        address originSender;
        address destination;
        bytes message;
    }

    mapping(address => bytes32) public sourceBlockchainIDs;
    Envelope[] internal envelopes;

    function setSourceBlockchainID(address sender, bytes32 blockchainID) external {
        sourceBlockchainIDs[sender] = blockchainID;
    }

    function sendCrossChainMessage(TeleporterMessageInput calldata input)
        external
        payable
        override
        returns (bytes32 messageID)
    {
        envelopes.push(
            Envelope({
                originBlockchainID: sourceBlockchainIDs[msg.sender],
                originSender: msg.sender,
                destination: input.destinationAddress,
                message: input.message
            })
        );
        return keccak256(abi.encode(envelopes.length, msg.sender, input.destinationAddress, input.message));
    }

    function deliver(uint256 index) external {
        Envelope storage envelope = envelopes[index];
        ITeleporterReceiver(envelope.destination)
            .receiveTeleporterMessage(envelope.originBlockchainID, envelope.originSender, envelope.message);
    }

    function messageCount() external view returns (uint256) {
        return envelopes.length;
    }
}

contract ICMGatewayRoundTripTest is Test {
    uint256 private constant EPOCH_SECS = 3_600;
    uint256 private constant SIGNER_PRIVATE_KEY = 0xA11CE;
    uint256 private constant PRINCIPAL_FUNDING = 10_000_000;
    bytes32 private constant GAME_L1_ID = keccak256("game-l1");
    bytes32 private constant FUJI_C_CHAIN_ID = keccak256("fuji-c-chain");
    bytes32 private constant LOCATION_PROOF_TYPEHASH = keccak256(
        "LocationProof(address player,bytes32 chestId,uint64 epoch,uint32 radiusMeters,"
        "bytes32 nonce,uint64 expiresAt,uint8 mode)"
    );

    address private admin;
    address private player;
    address private proofSigner;
    PlayerState private playerState;
    ChestManager private chestManager;
    GameICMGateway private gameGateway;
    CChainICMGateway private cchainGateway;
    MockTeleporterMessenger private teleporter;
    MockUSDC private usdc;
    SponsorPool private sponsorPool;
    YieldVault private yieldVault;

    function setUp() public {
        admin = makeAddr("admin");
        player = makeAddr("player");
        proofSigner = vm.addr(SIGNER_PRIVATE_KEY);
        vm.warp(EPOCH_SECS + 100);

        vm.startPrank(admin);
        teleporter = new MockTeleporterMessenger();
        playerState = new PlayerState(EPOCH_SECS, admin);

        // ChestManager is switched to the deployed gateway below; the temporary
        // address breaks its deployment-time mutual reference with GameGateway.
        chestManager = new ChestManager(proofSigner, address(playerState), admin, EPOCH_SECS, admin);
        gameGateway = new GameICMGateway(
            address(teleporter),
            address(chestManager),
            address(playerState),
            GAME_L1_ID,
            FUJI_C_CHAIN_ID,
            address(0),
            250_000
        );
        chestManager.setGameICMGateway(address(gameGateway));
        playerState.grantRole(playerState.GATEWAY_ROLE(), address(chestManager));
        playerState.grantRole(playerState.GATEWAY_ROLE(), address(gameGateway));

        usdc = new MockUSDC(admin);
        sponsorPool = new SponsorPool(address(usdc), admin);
        yieldVault = new YieldVault(address(usdc), address(sponsorPool), admin);
        cchainGateway = new CChainICMGateway(
            address(teleporter),
            address(sponsorPool),
            address(yieldVault),
            FUJI_C_CHAIN_ID,
            GAME_L1_ID,
            address(gameGateway),
            250_000
        );
        gameGateway.setRemoteGateway(address(cchainGateway));

        sponsorPool.grantRole(sponsorPool.GATEWAY_ROLE(), address(cchainGateway));
        yieldVault.grantRole(yieldVault.GATEWAY_ROLE(), address(cchainGateway));
        usdc.mint(admin, PRINCIPAL_FUNDING);
        usdc.approve(address(sponsorPool), PRINCIPAL_FUNDING);
        sponsorPool.fundPrincipal(PRINCIPAL_FUNDING);
        vm.stopPrank();

        teleporter.setSourceBlockchainID(address(gameGateway), GAME_L1_ID);
        teleporter.setSourceBlockchainID(address(cchainGateway), FUJI_C_CHAIN_ID);
    }

    function test_RoundTrip_UpdatesLifecycleAndDeduplicatesEconomicEffect() public {
        bytes32 requestId = _openYieldChest();
        _assertStatus(requestId, ChestManager.RequestStatus.CREATED);

        vm.prank(player);
        gameGateway.sendDepositRequest(requestId);
        _assertStatus(requestId, ChestManager.RequestStatus.SENT);

        // First L1 -> C-Chain delivery allocates one sponsored deposit.
        teleporter.deliver(0);
        assertEq(sponsorPool.totalPrincipalAllocated(), gameGateway.YIELD_CHEST_AMOUNT());
        assertEq(_vaultPrincipal(), gameGateway.YIELD_CHEST_AMOUNT());

        // A duplicated delivery sends the stored ACK again but never reallocates.
        teleporter.deliver(0);
        assertEq(sponsorPool.totalPrincipalAllocated(), gameGateway.YIELD_CHEST_AMOUNT());
        assertEq(_vaultPrincipal(), gameGateway.YIELD_CHEST_AMOUNT());

        // Deliver the original C-Chain ACK. GameGateway applies the snapshot and
        // emits the internal SENT -> REMOTE_EXECUTED -> CONFIRMED progression.
        teleporter.deliver(1);
        _assertStatus(requestId, ChestManager.RequestStatus.CONFIRMED);
        (,,,,, uint256 principal,,,,) = playerState.players(player);
        assertEq(principal, gameGateway.YIELD_CHEST_AMOUNT());

        // Delivering the replayed ACK leaves the terminal L1 state unchanged.
        teleporter.deliver(2);
        _assertStatus(requestId, ChestManager.RequestStatus.CONFIRMED);
    }

    function _openYieldChest() private returns (bytes32 requestId) {
        bytes32 chestId = keccak256("round-trip-chest");
        bytes32 nonce = keccak256("round-trip-nonce");
        uint64 epoch = uint64(block.timestamp / EPOCH_SECS);
        uint64 expiresAt = uint64(block.timestamp + 60);
        ChestManager.LocationProof memory proof = ChestManager.LocationProof({
            player: player,
            chestId: chestId,
            epoch: epoch,
            radiusMeters: 30,
            nonce: nonce,
            expiresAt: expiresAt,
            mode: 0,
            signature: ""
        });
        bytes32 structHash = keccak256(
            abi.encode(LOCATION_PROOF_TYPEHASH, player, chestId, epoch, uint32(30), nonce, expiresAt, uint8(0))
        );
        bytes32 digest = MessageHashUtils.toTypedDataHash(_domainSeparator(), structHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(SIGNER_PRIVATE_KEY, digest);
        proof.signature = abi.encodePacked(r, s, v);

        vm.prank(player);
        return chestManager.openChest(ChestManager.ChestType.YIELD, keccak256("h3-cell"), proof);
    }

    function _domainSeparator() private view returns (bytes32) {
        return keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256("DeFiTrail"),
                keccak256("1"),
                block.chainid,
                address(chestManager)
            )
        );
    }

    function _assertStatus(bytes32 requestId, ChestManager.RequestStatus expected) private view {
        (,,,, ChestManager.RequestStatus actual,,) = chestManager.requests(requestId);
        assertEq(uint8(actual), uint8(expected));
    }

    function _vaultPrincipal() private view returns (uint256 principal) {
        (principal,,,,) = yieldVault.positions(player);
    }
}
