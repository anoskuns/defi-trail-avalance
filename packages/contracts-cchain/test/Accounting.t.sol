// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MockUSDC} from "../src/MockUSDC.sol";
import {SponsorPool} from "../src/SponsorPool.sol";
import {YieldVault} from "../src/YieldVault.sol";

contract AccountingTest is Test {
    MockUSDC public usdc;
    SponsorPool public sponsorPool;
    YieldVault public yieldVault;

    address public admin = makeAddr("admin");
    address public gateway = makeAddr("gateway");
    address public questRouter = makeAddr("questRouter");
    address public funder = makeAddr("funder");
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public eve = makeAddr("eve");

    uint256 public constant INITIAL_PRINCIPAL = 100_000_000; // 100 USDC (6 decimals)
    uint256 public constant INITIAL_QUEST = 50_000_000; // 50 USDC (6 decimals)
    uint256 public constant INITIAL_RESERVE = 25_000_000; // 25 USDC (6 decimals)

    function setUp() public {
        vm.startPrank(admin);

        // 1. Deploy MockUSDC
        usdc = new MockUSDC(admin);

        // 2. Deploy SponsorPool & YieldVault
        sponsorPool = new SponsorPool(address(usdc), admin);
        yieldVault = new YieldVault(address(usdc), address(sponsorPool), admin);

        // 3. Configure roles on SponsorPool
        sponsorPool.grantRole(sponsorPool.GATEWAY_ROLE(), gateway);
        sponsorPool.grantRole(sponsorPool.QUEST_ROUTER_ROLE(), questRouter);
        sponsorPool.grantRole(sponsorPool.VAULT_ROLE(), address(yieldVault));

        // 4. Configure roles on YieldVault
        yieldVault.grantRole(yieldVault.GATEWAY_ROLE(), gateway);
        yieldVault.grantRole(yieldVault.QUEST_ROUTER_ROLE(), questRouter);

        // 5. Mint tokens to funder and fund the 3 accounting buckets
        uint256 totalFunding = INITIAL_PRINCIPAL + INITIAL_QUEST + INITIAL_RESERVE;
        usdc.mint(funder, totalFunding);
        vm.stopPrank();

        vm.startPrank(funder);
        usdc.approve(address(sponsorPool), totalFunding);
        sponsorPool.fundAll(INITIAL_PRINCIPAL, INITIAL_QUEST, INITIAL_RESERVE);
        vm.stopPrank();
    }

    // =============================================================
    // 1. INVARIANT TESTS
    // =============================================================

    function test_InitialInvariantsAndFunding() public view {
        (uint256 p, uint256 q, uint256 r) = sponsorPool.getBudgets();
        assertEq(p, INITIAL_PRINCIPAL);
        assertEq(q, INITIAL_QUEST);
        assertEq(r, INITIAL_RESERVE);

        assertEq(usdc.balanceOf(address(sponsorPool)), INITIAL_PRINCIPAL + INITIAL_QUEST + INITIAL_RESERVE);
        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Invariant_CannotAllocateMoreThanPrincipalBudget() public {
        vm.startPrank(gateway);
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientPrincipalBudget.selector,
                INITIAL_PRINCIPAL + 1,
                INITIAL_PRINCIPAL
            )
        );
        sponsorPool.allocatePrincipal(address(yieldVault), INITIAL_PRINCIPAL + 1);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Invariant_CannotAllocateMoreThanQuestBudget() public {
        vm.startPrank(questRouter);
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientQuestBudget.selector,
                INITIAL_QUEST + 1,
                INITIAL_QUEST
            )
        );
        sponsorPool.allocateQuest(bob, INITIAL_QUEST + 1);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Invariant_CannotPayoutMoreThanRewardReserve() public {
        vm.startPrank(address(yieldVault));
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientRewardReserve.selector,
                INITIAL_RESERVE + 1,
                INITIAL_RESERVE
            )
        );
        sponsorPool.payoutReward(alice, INITIAL_RESERVE + 1);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Invariant_SolvencyMaintainedAfterMultipleAllocations() public {
        // Allocate principal for Yield Chest (1 USDC)
        vm.prank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);

        // Allocate quest budget (0.5 USDC)
        vm.prank(questRouter);
        sponsorPool.allocateQuest(bob, 500_000);

        // Payout reward (0.1 USDC)
        vm.prank(address(yieldVault));
        sponsorPool.payoutReward(alice, 100_000);

        assertTrue(sponsorPool.verifyInvariants());
        assertEq(
            usdc.balanceOf(address(sponsorPool)),
            (INITIAL_PRINCIPAL - 1_000_000) + (INITIAL_QUEST - 500_000) + (INITIAL_RESERVE - 100_000)
        );
    }

    // =============================================================
    // 2. ACCESS CONTROL & ROLE ENFORCEMENT
    // =============================================================

    function test_UnauthorizedCallersCannotAllocate() public {
        vm.startPrank(eve);

        // Eve cannot allocate principal
        vm.expectRevert();
        sponsorPool.allocatePrincipal(eve, 1_000_000);

        // Eve cannot allocate quest
        vm.expectRevert();
        sponsorPool.allocateQuest(eve, 500_000);

        // Eve cannot payout reward
        vm.expectRevert();
        sponsorPool.payoutReward(eve, 100_000);

        // Eve cannot deposit sponsored into YieldVault
        vm.expectRevert();
        yieldVault.depositSponsored(eve, 1_000_000, 500);

        // Eve cannot deposit for quest into YieldVault
        vm.expectRevert();
        yieldVault.depositForQuest(eve, 500_000, 500);

        vm.stopPrank();
    }

    // =============================================================
    // 3. ALLOCATION & DEPOSIT LOGIC
    // =============================================================

    function test_YieldChestDeposit_SingleAllocation() public {
        uint256 depositAmount = 1_000_000; // 1 MockUSDC
        uint32 aprBps = 500; // 5.00% APR

        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), depositAmount);
        yieldVault.depositSponsored(alice, depositAmount, aprBps);
        vm.stopPrank();

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, depositAmount);
        assertEq(pos.accruedReward, 0);
        assertEq(pos.weightedAprBps, aprBps);
        assertEq(pos.qualifyingSince, uint64(block.timestamp));

        assertEq(sponsorPool.principalBudget(), INITIAL_PRINCIPAL - depositAmount);
        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_SponsorChestDeposit_WeightedAprAggregation() public {
        // Step 1: Alice opens Yield Chest (1 USDC @ 500 bps = 5%)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);

        // Step 2: Alice opens Sponsor Chest (2 USDC @ 750 bps = 7.5%)
        sponsorPool.allocatePrincipal(address(yieldVault), 2_000_000);
        yieldVault.depositSponsored(alice, 2_000_000, 750);
        vm.stopPrank();

        // Weighted APR formula: (1 * 500 + 2 * 750) / 3 = 2000 / 3 = 666 bps
        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, 3_000_000);
        assertEq(pos.weightedAprBps, 666);
        assertEq(sponsorPool.principalBudget(), INITIAL_PRINCIPAL - 3_000_000);
        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_QuestBudgetTierAllocationAndDeposit() public {
        uint256 questAmount = 500_000; // Tier 1: 0.5 MockUSDC
        uint32 questAprBps = 500;

        // 1. Bob claims quest budget via QuestRouter
        vm.prank(questRouter);
        sponsorPool.allocateQuest(bob, questAmount);
        assertEq(usdc.balanceOf(bob), questAmount);
        assertEq(sponsorPool.questBudget(), INITIAL_QUEST - questAmount);

        // 2. Bob approves YieldVault and deposits for quest
        vm.startPrank(bob);
        usdc.approve(address(yieldVault), questAmount);
        vm.stopPrank();

        vm.prank(questRouter);
        yieldVault.depositForQuest(bob, questAmount, questAprBps);

        YieldVault.PositionView memory pos = yieldVault.getPosition(bob);
        assertEq(pos.principal, questAmount);
        assertEq(pos.weightedAprBps, questAprBps);
        // Note: 0.5 USDC < 1 USDC qualifying threshold, so qualifyingSince should remain 0
        assertEq(pos.qualifyingSince, 0);
    }

    // =============================================================
    // 4. ACCRUAL & REWARD RESERVE CAP
    // =============================================================

    function test_AccrueReward_ElapsedYear() public {
        // Alice deposits 1 USDC at 1000 bps (10.00% APR)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 1000);
        vm.stopPrank();

        // Fast forward 1 year (365 days)
        vm.warp(block.timestamp + 365 days);

        // Expected annual reward: 1_000_000 * 1000 / 10000 = 100_000 (0.1 USDC)
        uint256 pending = yieldVault.pendingReward(alice);
        assertEq(pending, 100_000);

        uint256 accrued = yieldVault.accrueReward(alice);
        assertEq(accrued, 100_000);

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.accruedReward, 100_000);
        assertEq(pos.totalAssets, 1_100_000);
    }

    function test_AccrueReward_CappedByRewardReserve() public {
        // Deploy a pool with only 50_000 in reward reserve
        vm.startPrank(admin);
        SponsorPool smallPool = new SponsorPool(address(usdc), admin);
        YieldVault testVault = new YieldVault(address(usdc), address(smallPool), admin);
        smallPool.grantRole(smallPool.GATEWAY_ROLE(), gateway);
        smallPool.grantRole(smallPool.VAULT_ROLE(), address(testVault));
        testVault.grantRole(testVault.GATEWAY_ROLE(), gateway);

        usdc.mint(admin, 10_000_000);
        usdc.approve(address(smallPool), 10_000_000);
        smallPool.fundPrincipal(5_000_000);
        smallPool.fundRewards(50_000); // Only 0.05 USDC in reward reserve
        vm.stopPrank();

        // Alice deposits 1 USDC at 1000 bps (10% APR)
        vm.startPrank(gateway);
        smallPool.allocatePrincipal(address(testVault), 1_000_000);
        testVault.depositSponsored(alice, 1_000_000, 1000);
        vm.stopPrank();

        // Fast forward 2 years (gross reward would be 200_000)
        vm.warp(block.timestamp + 730 days);

        // Accrued reward must be capped to available 50_000
        uint256 accrued = testVault.accrueReward(alice);
        assertEq(accrued, 50_000);

        YieldVault.PositionView memory pos = testVault.getPosition(alice);
        assertEq(pos.accruedReward, 50_000);
    }

    // =============================================================
    // 5. WITHDRAWAL TESTS (ONLY OWNER, PARTIAL & FULL)
    // =============================================================

    function test_Withdrawal_OnlyOwnerCanWithdraw() public {
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        // Eve tries to withdraw from Alice's position
        vm.startPrank(eve);
        vm.expectRevert(
            abi.encodeWithSelector(YieldVault.InsufficientPositionBalance.selector, 1_000_000, 0)
        );
        yieldVault.withdraw(1_000_000);
        vm.stopPrank();
    }

    function test_Withdrawal_PartialWithdrawal() public {
        // Alice deposits 2 USDC at 1000 bps (10% APR)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 2_000_000);
        yieldVault.depositSponsored(alice, 2_000_000, 1000);
        vm.stopPrank();

        // Warp 1 year -> 0.2 USDC reward accrued (total assets = 2.2 USDC)
        vm.warp(block.timestamp + 365 days);
        yieldVault.accrueReward(alice);

        // Alice partially withdraws 0.5 USDC (withdraws 0.2 reward + 0.3 principal)
        uint256 aliceBalanceBefore = usdc.balanceOf(alice);
        vm.startPrank(alice);
        (uint256 principalWithdrawn, uint256 rewardWithdrawn) = yieldVault.withdraw(500_000);
        vm.stopPrank();

        assertEq(rewardWithdrawn, 200_000);
        assertEq(principalWithdrawn, 300_000);
        assertEq(usdc.balanceOf(alice), aliceBalanceBefore + 500_000);

        // Remaining: 1.7 USDC principal, 0 reward
        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, 1_700_000);
        assertEq(pos.accruedReward, 0);
        assertEq(pos.totalAssets, 1_700_000);
        // Qualifying threshold (>= 1 USDC) still met, so qualifyingSince is preserved
        assertTrue(pos.qualifyingSince > 0);

        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Withdrawal_FullWithdrawalResetsQualifyingSinceAndApr() public {
        // Alice deposits 1 USDC at 500 bps
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        // Warp 1 year -> 0.05 USDC reward
        vm.warp(block.timestamp + 365 days);
        yieldVault.accrueReward(alice);

        // Full withdrawal of 1.05 USDC
        vm.startPrank(alice);
        (uint256 principalWithdrawn, uint256 rewardWithdrawn) = yieldVault.withdraw(1_050_000);
        vm.stopPrank();

        assertEq(principalWithdrawn, 1_000_000);
        assertEq(rewardWithdrawn, 50_000);
        assertEq(usdc.balanceOf(alice), 1_050_000);

        // Position completely cleared
        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, 0);
        assertEq(pos.accruedReward, 0);
        assertEq(pos.weightedAprBps, 0);
        assertEq(pos.qualifyingSince, 0);
        assertEq(pos.positionStreak, 0);

        assertTrue(sponsorPool.verifyInvariants());
    }

    // =============================================================
    // 6. STREAK CALCULATION & RESET
    // =============================================================

    function test_StreakCalculationAndResetBelowThreshold() public {
        // Alice deposits 1 USDC (qualifying threshold met)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        // Warp 48 hours (2 full 24h intervals)
        vm.warp(block.timestamp + 2 days);
        assertEq(yieldVault.calculateStreak(alice), 2);

        // Warp to 7 days
        vm.warp(block.timestamp + 5 days);
        assertEq(yieldVault.calculateStreak(alice), 7);

        // Alice withdraws 500_000 -> remaining balance 500_000 (< 1 USDC threshold)
        vm.prank(alice);
        yieldVault.withdraw(500_000);

        // PRD 5.4: qualifyingSince cleared and streak resets to 0
        assertEq(yieldVault.calculateStreak(alice), 0);
    }
}

