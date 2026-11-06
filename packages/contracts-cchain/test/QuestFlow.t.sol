// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MockUSDC} from "../src/MockUSDC.sol";
import {SponsorPool} from "../src/SponsorPool.sol";
import {YieldVault} from "../src/YieldVault.sol";
import {QuestRouter} from "../src/QuestRouter.sol";
import {CChainICMGateway} from "../src/CChainICMGateway.sol";
import {ITeleporterMessenger} from "../src/interfaces/ITeleporterMessenger.sol";

contract MockTeleporterMessenger is ITeleporterMessenger {
    bytes32 public lastMessageId = keccak256("MOCK_MESSAGE_ID");
    TeleporterMessageInput public lastInput;
    uint256 public messageCount;

    function sendCrossChainMessage(TeleporterMessageInput calldata messageInput)
        external
        payable
        override
        returns (bytes32)
    {
        lastInput = messageInput;
        messageCount++;
        lastMessageId = keccak256(abi.encodePacked(messageInput.destinationAddress, messageCount));
        return lastMessageId;
    }
}

/**
 * @title QuestTest
 * @notice Tests the complete Quest Chest tutorial lifecycle on C-Chain:
 *  - registerQuest via CChainICMGateway (ICM)
 *  - claimQuestBudget (single claim enforcement)
 *  - depositForQuest (approval, transfer, vault deposit, gateway trigger)
 *  - edge cases: double-claim prevention, budget claimed without deposit never completes,
 *    expired quests, wrong amounts, unauthorized callers, all 4 quest tiers.
 */
contract QuestTest is Test {
    MockUSDC public usdc;
    SponsorPool public sponsorPool;
    YieldVault public yieldVault;
    QuestRouter public questRouter;
    CChainICMGateway public gateway;
    MockTeleporterMessenger public teleporter;

    address public admin = makeAddr("admin");
    address public funder = makeAddr("funder");
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public charlie = makeAddr("charlie");
    address public remoteL1Gateway = makeAddr("remoteL1Gateway");

    bytes32 public localBlockchainID = keccak256("C_CHAIN");
    bytes32 public remoteBlockchainID = keccak256("GAME_L1");
    uint256 public constant REMOTE_GAS_LIMIT = 250_000;

    uint256 public constant INITIAL_FUNDING = 100_000_000; // 100 MockUSDC (6 decimals)

    uint8 private constant QUEST_REGISTRATION_KIND = 3;

    function setUp() public {
        vm.startPrank(admin);

        usdc = new MockUSDC(admin);
        teleporter = new MockTeleporterMessenger();
        sponsorPool = new SponsorPool(address(usdc), admin);
        yieldVault = new YieldVault(address(usdc), address(sponsorPool), admin);

        gateway = new CChainICMGateway(
            address(teleporter),
            address(sponsorPool),
            address(yieldVault),
            localBlockchainID,
            remoteBlockchainID,
            remoteL1Gateway,
            REMOTE_GAS_LIMIT
        );

        questRouter = new QuestRouter(
            address(usdc),
            address(sponsorPool),
            address(yieldVault),
            address(gateway),
            admin
        );

        // Configure roles and connections
        gateway.setQuestRouter(address(questRouter));
        sponsorPool.grantRole(sponsorPool.GATEWAY_ROLE(), address(gateway));
        sponsorPool.grantRole(sponsorPool.QUEST_ROUTER_ROLE(), address(questRouter));
        sponsorPool.grantRole(sponsorPool.VAULT_ROLE(), address(yieldVault));
        yieldVault.grantRole(yieldVault.GATEWAY_ROLE(), address(gateway));
        yieldVault.grantRole(yieldVault.QUEST_ROUTER_ROLE(), address(questRouter));

        // Fund SponsorPool quest budget and principal budget
        usdc.mint(funder, INITIAL_FUNDING * 2);
        vm.stopPrank();

        vm.startPrank(funder);
        usdc.approve(address(sponsorPool), INITIAL_FUNDING * 2);
        sponsorPool.fundQuest(INITIAL_FUNDING);
        sponsorPool.fundPrincipal(INITIAL_FUNDING);
        vm.stopPrank();

        assertEq(sponsorPool.questBudget(), INITIAL_FUNDING);
        assertEq(sponsorPool.principalBudget(), INITIAL_FUNDING);
    }

    // =======================================================================
    // 1. Core Requirement: User cannot claim quest budget twice
    // =======================================================================

    function test_CannotClaimQuestBudgetTwice() public {
        bytes32 questId = keccak256("QUEST_ALICE_TIER_1");
        bytes32 requestId = keccak256("REQ_ALICE_1");
        uint256 requiredAmount = 500_000; // 0.5 USDC for Tier 1
        uint64 expiresAt = uint64(block.timestamp + 1 days);

        // Gateway registers quest
        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, requiredAmount, expiresAt);

        // 1st claim: Alice claims quest budget successfully
        vm.prank(alice);
        questRouter.claimQuestBudget(questId);

        assertEq(usdc.balanceOf(alice), requiredAmount);
        assertEq(sponsorPool.questBudget(), INITIAL_FUNDING - requiredAmount);
        assertTrue(questRouter.isBudgetClaimed(questId));

        // 2nd claim attempt: MUST revert with BudgetAlreadyClaimed
        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.BudgetAlreadyClaimed.selector, questId)
        );
        questRouter.claimQuestBudget(questId);

        // Verify quest budget balance did not decrease a second time
        assertEq(usdc.balanceOf(alice), requiredAmount);
        assertEq(sponsorPool.questBudget(), INITIAL_FUNDING - requiredAmount);
        assertTrue(sponsorPool.verifyInvariants());
    }

    // =======================================================================
    // 2. Core Requirement: User claims budget without deposit -> Never completes
    // =======================================================================

    function test_ClaimedBudgetWithoutDeposit_NeverCompletes() public {
        bytes32 questId = keccak256("QUEST_BOB_TIER_2");
        bytes32 requestId = keccak256("REQ_BOB_2");
        uint256 requiredAmount = 1_000_000; // 1 USDC for Tier 2
        uint64 expiresAt = uint64(block.timestamp + 7 days);

        // Register quest for Bob
        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, bob, 2, requiredAmount, expiresAt);

        // Bob claims tutorial budget
        vm.prank(bob);
        questRouter.claimQuestBudget(questId);
        assertEq(usdc.balanceOf(bob), requiredAmount);

        // Simulate passage of time (days, weeks)
        vm.warp(block.timestamp + 3 days);

        // Quest status: budget is claimed, but completion is strictly FALSE
        assertTrue(questRouter.isBudgetClaimed(questId));
        assertFalse(questRouter.isQuestCompleted(questId));

        // Bob has 0 principal in YieldVault
        YieldVault.PositionView memory pos = yieldVault.getPosition(bob);
        assertEq(pos.principal, 0);

        // Warp further past expiry
        vm.warp(block.timestamp + 10 days);

        // Quest STILL remains uncompleted
        assertFalse(questRouter.isQuestCompleted(questId));
        assertEq(yieldVault.getPosition(bob).principal, 0);

        // Now that it is expired, Bob cannot even deposit anymore
        vm.startPrank(bob);
        usdc.approve(address(questRouter), requiredAmount);
        vm.expectRevert(
            abi.encodeWithSelector(
                QuestRouter.QuestExpired.selector,
                expiresAt,
                uint64(block.timestamp)
            )
        );
        questRouter.depositForQuest(questId, requiredAmount);
        vm.stopPrank();

        // Still never completed!
        assertFalse(questRouter.isQuestCompleted(questId));
    }

    // =======================================================================
    // 3. Happy Path: Register -> Claim -> Approve -> Deposit -> Complete + Snapshot
    // =======================================================================

    function test_Quest_HappyPath_FullLifecycle() public {
        bytes32 questId = keccak256("QUEST_HAPPY_PATH");
        bytes32 requestId = keccak256("REQ_HAPPY_PATH");
        uint256 requiredAmount = 500_000; // Tier 1: 0.5 USDC
        uint64 expiresAt = uint64(block.timestamp + 1 days);

        // 1. Gateway registers quest
        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, requiredAmount, expiresAt);

        // 2. Alice claims tutorial funds
        vm.prank(alice);
        questRouter.claimQuestBudget(questId);
        assertEq(usdc.balanceOf(alice), requiredAmount);

        // 3. Alice approves QuestRouter
        vm.startPrank(alice);
        usdc.approve(address(questRouter), requiredAmount);

        // 4. Alice deposits for quest
        uint256 teleporterCountBefore = teleporter.messageCount();
        questRouter.depositForQuest(questId, requiredAmount);
        vm.stopPrank();

        // 5. Assertions:
        // - Quest marked completed
        assertTrue(questRouter.isQuestCompleted(questId));

        // - Alice balance in YieldVault is credited
        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, requiredAmount);
        assertEq(pos.weightedAprBps, 500); // Tier 1 simulated APR: 5.00%

        // - User USDC transferred to YieldVault
        assertEq(usdc.balanceOf(alice), 0);
        assertEq(usdc.balanceOf(address(yieldVault)), requiredAmount);

        // - Gateway sent snapshot back over Teleporter with questCompleted = true
        assertEq(teleporter.messageCount(), teleporterCountBefore + 1);

        // Verify processed request on Gateway
        (bool processed, CChainICMGateway.PositionSnapshot memory snap) =
            gateway.getProcessedRequest(requestId);
        assertTrue(processed);
        assertEq(snap.player, alice);
        assertEq(snap.principal, requiredAmount);
        assertTrue(snap.questCompleted);

        assertTrue(sponsorPool.verifyInvariants());
    }

    // =======================================================================
    // 4. ICM Registration Flow: receiveTeleporterMessage triggers registerQuest
    // =======================================================================

    function test_CChainICMGateway_ReceivesQuestRegistration() public {
        bytes32 questId = keccak256("QUEST_VIA_ICM");
        bytes32 requestId = keccak256("REQ_VIA_ICM");
        uint256 requiredAmount = 2_000_000; // Tier 3: 2 USDC
        uint64 expiresAt = uint64(block.timestamp + 1 days);

        CChainICMGateway.QuestRegistration memory reg = CChainICMGateway.QuestRegistration({
            requestId: requestId,
            questId: questId,
            player: charlie,
            tier: 3,
            requiredAmount: requiredAmount,
            expiresAt: expiresAt
        });

        bytes memory payload = abi.encode(QUEST_REGISTRATION_KIND, reg);

        // Deliver Teleporter message to CChainICMGateway
        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, payload);

        // Verify quest is now registered in QuestRouter
        QuestRouter.Quest memory q = questRouter.getQuest(questId);
        assertEq(q.player, charlie);
        assertEq(q.tier, 3);
        assertEq(q.requiredAmount, requiredAmount);
        assertEq(q.expiresAt, expiresAt);
        assertFalse(q.budgetClaimed);
        assertFalse(q.completed);
    }

    // =======================================================================
    // 5. Tier APR Verification (All 4 Tiers)
    // =======================================================================

    function test_AllTiers_DepositAndApr() public {
        uint8[4] memory tiers = [1, 2, 3, 4];
        uint256[4] memory amounts = [uint256(500_000), 1_000_000, 2_000_000, 3_000_000];
        uint32[4] memory expectedAprs = [uint32(500), 625, 750, 1000];

        for (uint256 i = 0; i < 4; i++) {
            address user = makeAddr(string(abi.encodePacked("userTier", i)));
            bytes32 qId = keccak256(abi.encodePacked("QUEST_TIER_", i));
            bytes32 rId = keccak256(abi.encodePacked("REQ_TIER_", i));

            vm.prank(address(gateway));
            questRouter.registerQuest(rId, qId, user, tiers[i], amounts[i], uint64(block.timestamp + 1 days));

            vm.prank(user);
            questRouter.claimQuestBudget(qId);

            vm.startPrank(user);
            usdc.approve(address(questRouter), amounts[i]);
            questRouter.depositForQuest(qId, amounts[i]);
            vm.stopPrank();

            YieldVault.PositionView memory pos = yieldVault.getPosition(user);
            assertEq(pos.principal, amounts[i]);
            assertEq(pos.weightedAprBps, expectedAprs[i]);
            assertTrue(questRouter.isQuestCompleted(qId));
        }
    }

    // =======================================================================
    // 6. Security & Error Cases
    // =======================================================================

    function test_DepositForQuest_RevertWhen_NotApproved() public {
        bytes32 questId = keccak256("QUEST_NO_APPROVE");
        bytes32 requestId = keccak256("REQ_NO_APPROVE");

        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        vm.prank(alice);
        questRouter.claimQuestBudget(questId);

        // Alice attempts deposit without approving QuestRouter
        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.InsufficientAllowance.selector, 0, 500_000)
        );
        questRouter.depositForQuest(questId, 500_000);

        assertFalse(questRouter.isQuestCompleted(questId));
    }

    function test_DepositForQuest_RevertWhen_WrongAmount() public {
        bytes32 questId = keccak256("QUEST_WRONG_AMT");
        bytes32 requestId = keccak256("REQ_WRONG_AMT");

        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        vm.prank(alice);
        questRouter.claimQuestBudget(questId);

        vm.startPrank(alice);
        usdc.approve(address(questRouter), 1_000_000);

        // Pass 400_000 instead of 500_000
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.InvalidAmount.selector, 400_000, 500_000)
        );
        questRouter.depositForQuest(questId, 400_000);
        vm.stopPrank();
    }

    function test_DepositForQuest_CannotCompleteTwice() public {
        bytes32 questId = keccak256("QUEST_TWICE");
        bytes32 requestId = keccak256("REQ_TWICE");

        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        vm.prank(alice);
        questRouter.claimQuestBudget(questId);

        vm.startPrank(alice);
        usdc.approve(address(questRouter), 1_000_000);
        questRouter.depositForQuest(questId, 500_000);

        // Second deposit attempt MUST revert
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.QuestAlreadyCompleted.selector, questId)
        );
        questRouter.depositForQuest(questId, 500_000);
        vm.stopPrank();
    }

    function test_UnauthorizedPlayerReverts() public {
        bytes32 questId = keccak256("QUEST_UNAUTH");
        bytes32 requestId = keccak256("REQ_UNAUTH");

        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        // Bob tries to claim Alice's quest
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.UnauthorizedPlayer.selector, bob, alice)
        );
        questRouter.claimQuestBudget(questId);

        // Bob tries to deposit for Alice's quest
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.UnauthorizedPlayer.selector, bob, alice)
        );
        questRouter.depositForQuest(questId, 500_000);
    }

    function test_NonExistentQuestReverts() public {
        bytes32 fakeQuest = keccak256("FAKE_QUEST");

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.QuestNotFound.selector, fakeQuest)
        );
        questRouter.claimQuestBudget(fakeQuest);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.QuestNotFound.selector, fakeQuest)
        );
        questRouter.depositForQuest(fakeQuest, 500_000);
    }

    function test_RegisterQuest_UnauthorizedReverts() public {
        bytes32 questId = keccak256("QUEST_UNAUTH_REG");
        bytes32 requestId = keccak256("REQ_UNAUTH_REG");

        // Alice (not gateway) attempts registerQuest
        vm.prank(alice);
        vm.expectRevert();
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));
    }

    function test_RegisterQuest_InvalidParamsReverts() public {
        bytes32 questId = keccak256("QUEST_INV_PARAMS");
        bytes32 requestId = keccak256("REQ_INV_PARAMS");

        // Zero address player
        vm.prank(address(gateway));
        vm.expectRevert(QuestRouter.ZeroAddress.selector);
        questRouter.registerQuest(requestId, questId, address(0), 1, 500_000, uint64(block.timestamp + 1 days));

        // Zero amount
        vm.prank(address(gateway));
        vm.expectRevert(QuestRouter.ZeroAmount.selector);
        questRouter.registerQuest(requestId, questId, alice, 1, 0, uint64(block.timestamp + 1 days));

        // Expired timestamp
        vm.prank(address(gateway));
        vm.expectRevert();
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp - 1));

        // Invalid tier (tier 0 or 5)
        vm.prank(address(gateway));
        vm.expectRevert(abi.encodeWithSelector(QuestRouter.InvalidTier.selector, 0));
        questRouter.registerQuest(requestId, questId, alice, 0, 500_000, uint64(block.timestamp + 1 days));

        vm.prank(address(gateway));
        vm.expectRevert(abi.encodeWithSelector(QuestRouter.InvalidTier.selector, 5));
        questRouter.registerQuest(requestId, questId, alice, 5, 500_000, uint64(block.timestamp + 1 days));
    }

    function test_RegisterQuest_DuplicateQuestIdReverts() public {
        bytes32 questId = keccak256("QUEST_DUP");
        bytes32 requestId = keccak256("REQ_DUP");

        vm.prank(address(gateway));
        questRouter.registerQuest(requestId, questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        // Registering same questId again MUST revert
        vm.prank(address(gateway));
        vm.expectRevert(
            abi.encodeWithSelector(QuestRouter.QuestAlreadyRegistered.selector, questId)
        );
        questRouter.registerQuest(requestId, questId, bob, 2, 1_000_000, uint64(block.timestamp + 1 days));
    }

    function test_Admin_SetGateway() public {
        address newGateway = makeAddr("newGateway");

        vm.prank(admin);
        questRouter.setGateway(newGateway);
        assertEq(questRouter.gateway(), newGateway);
        assertTrue(questRouter.hasRole(questRouter.GATEWAY_ROLE(), newGateway));

        // Revert on zero address
        vm.prank(admin);
        vm.expectRevert(QuestRouter.ZeroAddress.selector);
        questRouter.setGateway(address(0));

        // Non-admin reverts
        vm.prank(alice);
        vm.expectRevert();
        questRouter.setGateway(makeAddr("hacker"));
    }

    function test_Branch_QuestRouter_Constructor_ZeroAddresses() public {
        vm.expectRevert(QuestRouter.ZeroAddress.selector);
        new QuestRouter(address(0), address(sponsorPool), address(yieldVault), address(gateway), admin);

        vm.expectRevert(QuestRouter.ZeroAddress.selector);
        new QuestRouter(address(usdc), address(0), address(yieldVault), address(gateway), admin);

        vm.expectRevert(QuestRouter.ZeroAddress.selector);
        new QuestRouter(address(usdc), address(sponsorPool), address(0), address(gateway), admin);

        // Constructor with address(0) for initialAdmin defaults to msg.sender
        QuestRouter qr = new QuestRouter(address(usdc), address(sponsorPool), address(yieldVault), address(0), address(0));
        assertTrue(qr.hasRole(qr.DEFAULT_ADMIN_ROLE(), address(this)));
    }

    function test_Branch_QuestRouter_RegisterQuestOverload() public {
        bytes32 questId = keccak256("QUEST_OVERLOAD");
        vm.prank(address(gateway));
        questRouter.registerQuest(questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        QuestRouter.Quest memory q = questRouter.getQuest(questId);
        assertEq(q.requestId, questId);
        assertEq(q.player, alice);
    }

    function test_Branch_QuestRouter_DepositWithoutGateway() public {
        // Deploy QuestRouter without gateway
        QuestRouter qrNoGw = new QuestRouter(
            address(usdc),
            address(sponsorPool),
            address(yieldVault),
            address(0),
            admin
        );

        vm.startPrank(admin);
        qrNoGw.grantRole(qrNoGw.GATEWAY_ROLE(), admin);
        yieldVault.grantRole(yieldVault.QUEST_ROUTER_ROLE(), address(qrNoGw));
        sponsorPool.grantRole(sponsorPool.QUEST_ROUTER_ROLE(), address(qrNoGw));
        vm.stopPrank();

        bytes32 questId = keccak256("QUEST_NO_GW");
        vm.prank(admin);
        qrNoGw.registerQuest(questId, alice, 1, 500_000, uint64(block.timestamp + 1 days));

        vm.prank(alice);
        qrNoGw.claimQuestBudget(questId);

        vm.startPrank(alice);
        usdc.approve(address(qrNoGw), 500_000);
        qrNoGw.depositForQuest(questId, 500_000);
        vm.stopPrank();

        assertTrue(qrNoGw.isQuestCompleted(questId));
    }

    function test_Branch_QuestRouter_ZeroQuestId() public {
        vm.prank(address(gateway));
        vm.expectRevert(abi.encodeWithSelector(QuestRouter.QuestNotFound.selector, bytes32(0)));
        questRouter.registerQuest(bytes32(0), bytes32(0), alice, 1, 500_000, uint64(block.timestamp + 1 days));
    }

    function test_Branch_QuestRouter_SetGateway_RevokeOldRole() public {
        address gw1 = makeAddr("gw1");
        address gw2 = makeAddr("gw2");
        vm.startPrank(admin);
        questRouter.setGateway(gw1);
        assertTrue(questRouter.hasRole(questRouter.GATEWAY_ROLE(), gw1));
        questRouter.setGateway(gw2);
        assertFalse(questRouter.hasRole(questRouter.GATEWAY_ROLE(), gw1));
        assertTrue(questRouter.hasRole(questRouter.GATEWAY_ROLE(), gw2));
        vm.stopPrank();
    }

    // =======================================================================
    // 7. CChainICMGateway Full Branch Coverage
    // =======================================================================

    function test_CChainICMGateway_DepositRequest_YieldAndSponsor() public {
        bytes32 reqYield = keccak256("REQ_YIELD_1");
        bytes32 reqSponsor = keccak256("REQ_SPONSOR_1");

        // 1. Yield Chest deposit (1 USDC, COMMON rarity = 500 bps)
        CChainICMGateway.DepositRequest memory depYield = CChainICMGateway.DepositRequest({
            requestId: reqYield,
            player: alice,
            sourceType: CChainICMGateway.ChestType.YIELD,
            sourceId: keccak256("CHEST_YIELD"),
            amount: 1_000_000,
            rarity: CChainICMGateway.Rarity.COMMON,
            epoch: 1
        });

        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(
            remoteBlockchainID,
            remoteL1Gateway,
            abi.encode(uint8(1), depYield)
        );

        assertEq(yieldVault.getPosition(alice).principal, 1_000_000);
        assertEq(yieldVault.getPosition(alice).weightedAprBps, 500);

        // 2. Duplicate delivery (replay ACK without re-allocating)
        uint256 allocatedBefore = sponsorPool.totalPrincipalAllocated();
        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(
            remoteBlockchainID,
            remoteL1Gateway,
            abi.encode(uint8(1), depYield)
        );
        assertEq(sponsorPool.totalPrincipalAllocated(), allocatedBefore);

        // 3. Sponsor Chest deposit (2 USDC, EPIC rarity = 750 bps)
        // PRD §4.4: SponsorPool deducts exactly 2 Mock USDC from principalBudget and tops up YieldVault
        uint256 budgetBeforeSponsor = sponsorPool.principalBudget();
        CChainICMGateway.DepositRequest memory depSponsor = CChainICMGateway.DepositRequest({
            requestId: reqSponsor,
            player: bob,
            sourceType: CChainICMGateway.ChestType.SPONSOR,
            sourceId: keccak256("CHEST_SPONSOR"),
            amount: 2_000_000,
            rarity: CChainICMGateway.Rarity.EPIC,
            epoch: 1
        });

        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(
            remoteBlockchainID,
            remoteL1Gateway,
            abi.encode(uint8(1), depSponsor)
        );

        // Verify SponsorPool deducted 2 Mock USDC and YieldVault position is topped up by 2 Mock USDC
        assertEq(sponsorPool.principalBudget(), budgetBeforeSponsor - 2_000_000);
        assertEq(sponsorPool.totalPrincipalAllocated(), allocatedBefore + 2_000_000);
        assertEq(yieldVault.getPosition(bob).principal, 2_000_000);
        assertEq(yieldVault.getPosition(bob).weightedAprBps, 750);

        // 4. Test RARE (625 bps) and LEGENDARY (1000 bps)
        bytes32 reqRare = keccak256("REQ_RARE");
        bytes32 reqLeg = keccak256("REQ_LEG");
        address rareUser = makeAddr("rareUser");
        address legUser = makeAddr("legUser");

        CChainICMGateway.DepositRequest memory depRare = CChainICMGateway.DepositRequest({
            requestId: reqRare,
            player: rareUser,
            sourceType: CChainICMGateway.ChestType.YIELD,
            sourceId: keccak256("CHEST_RARE"),
            amount: 1_000_000,
            rarity: CChainICMGateway.Rarity.RARE,
            epoch: 1
        });
        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), depRare));
        assertEq(yieldVault.getPosition(rareUser).weightedAprBps, 625);

        CChainICMGateway.DepositRequest memory depLeg = CChainICMGateway.DepositRequest({
            requestId: reqLeg,
            player: legUser,
            sourceType: CChainICMGateway.ChestType.YIELD,
            sourceId: keccak256("CHEST_LEG"),
            amount: 1_000_000,
            rarity: CChainICMGateway.Rarity.LEGENDARY,
            epoch: 1
        });
        vm.prank(address(teleporter));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), depLeg));
        assertEq(yieldVault.getPosition(legUser).weightedAprBps, 1000);

        // Verify getProcessedRequest view
        (bool processed, CChainICMGateway.PositionSnapshot memory snap) = gateway.getProcessedRequest(reqYield);
        assertTrue(processed);
        assertEq(snap.player, alice);
        assertEq(snap.principal, 1_000_000);
    }

    function test_CChainICMGateway_SecurityReverts() public {
        bytes32 reqId = keccak256("REQ_SEC_1");
        CChainICMGateway.DepositRequest memory dep = CChainICMGateway.DepositRequest({
            requestId: reqId,
            player: alice,
            sourceType: CChainICMGateway.ChestType.YIELD,
            sourceId: keccak256("CHEST_1"),
            amount: 1_000_000,
            rarity: CChainICMGateway.Rarity.COMMON,
            epoch: 1
        });
        bytes memory validMsg = abi.encode(uint8(1), dep);

        // 1. Caller is not TeleporterMessenger
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.UnauthorizedTeleporter.selector, alice));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, validMsg);

        // 2. Origin blockchain ID mismatch
        vm.prank(address(teleporter));
        vm.expectRevert(
            abi.encodeWithSelector(CChainICMGateway.InvalidRemoteSender.selector, bytes32("WRONG_CHAIN"), remoteL1Gateway)
        );
        gateway.receiveTeleporterMessage(bytes32("WRONG_CHAIN"), remoteL1Gateway, validMsg);

        // 3. Origin sender mismatch
        vm.prank(address(teleporter));
        vm.expectRevert(
            abi.encodeWithSelector(CChainICMGateway.InvalidRemoteSender.selector, remoteBlockchainID, alice)
        );
        gateway.receiveTeleporterMessage(remoteBlockchainID, alice, validMsg);

        // 4. Invalid message kind
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidMessageKind.selector, 99));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(99), dep));

        // 5. Zero requestId or zero player in DepositRequest
        dep.requestId = bytes32(0);
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidDepositRequest.selector, bytes32(0)));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), dep));

        dep.requestId = reqId;
        dep.player = address(0);
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidDepositRequest.selector, reqId));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), dep));

        // 6. Wrong amount for sourceType
        dep.player = alice;
        dep.amount = 999_999;
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidDepositRequest.selector, reqId));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), dep));

        // 7. Unsupported chestType in DepositRequest
        dep.amount = 1_000_000;
        dep.sourceType = CChainICMGateway.ChestType.QUEST;
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.UnsupportedChestType.selector, CChainICMGateway.ChestType.QUEST));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(1), dep));

        // 8. Zero requestId or zero player in QuestRegistration
        CChainICMGateway.QuestRegistration memory badReg = CChainICMGateway.QuestRegistration({
            requestId: bytes32(0),
            questId: reqId,
            player: alice,
            tier: 1,
            requiredAmount: 500_000,
            expiresAt: uint64(block.timestamp + 1 days)
        });
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidDepositRequest.selector, bytes32(0)));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(3), badReg));

        badReg.requestId = reqId;
        badReg.player = address(0);
        vm.prank(address(teleporter));
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.InvalidDepositRequest.selector, reqId));
        gateway.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(3), badReg));

        // 9. Unauthorized sendQuestCompletion
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.UnauthorizedCaller.selector, alice));
        gateway.sendQuestCompletion(reqId, alice);

        // 10. setQuestRouter error branches
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(CChainICMGateway.UnauthorizedAdmin.selector, alice));
        gateway.setQuestRouter(alice);

        vm.prank(admin);
        vm.expectRevert(CChainICMGateway.ZeroAddress.selector);
        gateway.setQuestRouter(address(0));

        // 11. Constructor zero address branches
        vm.expectRevert(CChainICMGateway.ZeroAddress.selector);
        new CChainICMGateway(address(0), address(sponsorPool), address(yieldVault), localBlockchainID, remoteBlockchainID, remoteL1Gateway, 250_000);

        vm.expectRevert(CChainICMGateway.ZeroAddress.selector);
        new CChainICMGateway(address(teleporter), address(0), address(yieldVault), localBlockchainID, remoteBlockchainID, remoteL1Gateway, 250_000);

        vm.expectRevert(CChainICMGateway.ZeroAddress.selector);
        new CChainICMGateway(address(teleporter), address(sponsorPool), address(0), localBlockchainID, remoteBlockchainID, remoteL1Gateway, 250_000);

        vm.expectRevert(CChainICMGateway.ZeroAddress.selector);
        new CChainICMGateway(address(teleporter), address(sponsorPool), address(yieldVault), localBlockchainID, remoteBlockchainID, address(0), 250_000);

        // 12. Quest registration when questRouter is address(0)
        CChainICMGateway gwNoRouter = new CChainICMGateway(
            address(teleporter),
            address(sponsorPool),
            address(yieldVault),
            localBlockchainID,
            remoteBlockchainID,
            remoteL1Gateway,
            250_000
        );
        CChainICMGateway.QuestRegistration memory okReg = CChainICMGateway.QuestRegistration({
            requestId: reqId,
            questId: reqId,
            player: alice,
            tier: 1,
            requiredAmount: 500_000,
            expiresAt: uint64(block.timestamp + 1 days)
        });
        vm.prank(address(teleporter));
        gwNoRouter.receiveTeleporterMessage(remoteBlockchainID, remoteL1Gateway, abi.encode(uint8(3), okReg));
    }

    // =======================================================================
    // 8. Fuzz Tests: Invariants & Robustness
    // =======================================================================

    function testFuzz_Quest_WrongDepositAmountAlwaysReverts(uint8 tier, uint256 wrongAmount) public {
        tier = uint8(bound(tier, 1, 4));
        uint256 expected = tier == 1 ? 500_000 : tier == 2 ? 1_000_000 : tier == 3 ? 2_000_000 : 3_000_000;
        vm.assume(wrongAmount != expected);
        wrongAmount = bound(wrongAmount, 1, 10_000_000);

        bytes32 qId = keccak256(abi.encodePacked("FUZZ_Q", tier, wrongAmount));
        bytes32 rId = keccak256(abi.encodePacked("FUZZ_R", tier, wrongAmount));
        address fuzzer = makeAddr("fuzzer");

        vm.prank(address(gateway));
        questRouter.registerQuest(rId, qId, fuzzer, tier, expected, uint64(block.timestamp + 1 days));

        vm.prank(fuzzer);
        questRouter.claimQuestBudget(qId);

        vm.prank(admin);
        usdc.mint(fuzzer, wrongAmount + expected);

        vm.startPrank(fuzzer);
        usdc.approve(address(questRouter), wrongAmount + expected);
        vm.expectRevert(abi.encodeWithSelector(QuestRouter.InvalidAmount.selector, wrongAmount, expected));
        questRouter.depositForQuest(qId, wrongAmount);
        vm.stopPrank();

        assertFalse(questRouter.isQuestCompleted(qId));
    }

    function testFuzz_Quest_ExpiryBoundary(uint32 deltaSeconds) public {
        deltaSeconds = uint32(bound(deltaSeconds, 1, 365 days));
        bytes32 qId = keccak256(abi.encodePacked("EXP_Q", deltaSeconds));
        bytes32 rId = keccak256(abi.encodePacked("EXP_R", deltaSeconds));
        uint64 expiry = uint64(block.timestamp + 100);

        vm.prank(address(gateway));
        questRouter.registerQuest(rId, qId, charlie, 1, 500_000, expiry);

        if (block.timestamp + deltaSeconds <= expiry) {
            vm.warp(block.timestamp + deltaSeconds);
            vm.prank(charlie);
            questRouter.claimQuestBudget(qId);
            assertTrue(questRouter.isBudgetClaimed(qId));
        } else {
            vm.warp(block.timestamp + deltaSeconds);
            vm.prank(charlie);
            vm.expectRevert(
                abi.encodeWithSelector(QuestRouter.QuestExpired.selector, expiry, uint64(block.timestamp))
            );
            questRouter.claimQuestBudget(qId);
            assertFalse(questRouter.isBudgetClaimed(qId));
        }
    }

    // =======================================================================
    // 9. Gas Benchmark
    // =======================================================================

    function test_GasBenchmark_QuestActions() public {
        bytes32 qId = keccak256("BENCH_QUEST");
        bytes32 rId = keccak256("BENCH_REQ");
        address user = makeAddr("benchUser");

        vm.prank(address(gateway));
        questRouter.registerQuest(rId, qId, user, 1, 500_000, uint64(block.timestamp + 1 days));

        // Benchmark claimQuestBudget
        uint256 gasBeforeClaim = gasleft();
        vm.prank(user);
        questRouter.claimQuestBudget(qId);
        uint256 gasUsedClaim = gasBeforeClaim - gasleft();
        assertTrue(gasUsedClaim < 160_000, "claimQuestBudget should be < 160k gas");

        // Benchmark depositForQuest
        vm.startPrank(user);
        usdc.approve(address(questRouter), 500_000);
        uint256 gasBeforeDeposit = gasleft();
        questRouter.depositForQuest(qId, 500_000);
        uint256 gasUsedDeposit = gasBeforeDeposit - gasleft();
        vm.stopPrank();
        assertTrue(gasUsedDeposit < 800_000, "depositForQuest should be < 800k gas");
    }
}
