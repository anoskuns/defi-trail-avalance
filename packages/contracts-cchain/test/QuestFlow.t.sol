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
 * @title QuestFlowTest
 * @notice Tests the complete Quest Chest tutorial lifecycle on C-Chain:
 *  - registerQuest via CChainICMGateway (ICM)
 *  - claimQuestBudget (single claim enforcement)
 *  - depositForQuest (approval, transfer, vault deposit, gateway trigger)
 *  - edge cases: double-claim prevention, budget claimed without deposit never completes,
 *    expired quests, wrong amounts, unauthorized callers, all 4 quest tiers.
 */
contract QuestFlowTest is Test {
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

        // Fund SponsorPool quest budget
        usdc.mint(funder, INITIAL_FUNDING);
        vm.stopPrank();

        vm.startPrank(funder);
        usdc.approve(address(sponsorPool), INITIAL_FUNDING);
        sponsorPool.fundQuest(INITIAL_FUNDING);
        vm.stopPrank();

        assertEq(sponsorPool.questBudget(), INITIAL_FUNDING);
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
}
