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
    // 1. INVARIANT TESTS (STATIC & FUZZ TESTING)
    // =============================================================

    function test_InitialInvariantsAndFunding() public view {
        (uint256 p, uint256 q, uint256 r) = sponsorPool.getBudgets();
        assertEq(p, INITIAL_PRINCIPAL);
        assertEq(q, INITIAL_QUEST);
        assertEq(r, INITIAL_RESERVE);

        assertEq(
            usdc.balanceOf(address(sponsorPool)),
            INITIAL_PRINCIPAL + INITIAL_QUEST + INITIAL_RESERVE
        );
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
            (INITIAL_PRINCIPAL - 1_000_000) +
                (INITIAL_QUEST - 500_000) +
                (INITIAL_RESERVE - 100_000)
        );
    }

    function testFuzz_Invariant_CannotAllocateMoreThanPrincipalBudget(uint256 excess) public {
        excess = bound(excess, 1, 1_000_000_000_000);
        uint256 attemptAmount = INITIAL_PRINCIPAL + excess;

        vm.startPrank(gateway);
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientPrincipalBudget.selector,
                attemptAmount,
                INITIAL_PRINCIPAL
            )
        );
        sponsorPool.allocatePrincipal(address(yieldVault), attemptAmount);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function testFuzz_Invariant_CannotAllocateMoreThanQuestBudget(uint256 excess) public {
        excess = bound(excess, 1, 1_000_000_000_000);
        uint256 attemptAmount = INITIAL_QUEST + excess;

        vm.startPrank(questRouter);
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientQuestBudget.selector,
                attemptAmount,
                INITIAL_QUEST
            )
        );
        sponsorPool.allocateQuest(bob, attemptAmount);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function testFuzz_Invariant_CannotPayoutMoreThanRewardReserve(uint256 excess) public {
        excess = bound(excess, 1, 1_000_000_000_000);
        uint256 attemptAmount = INITIAL_RESERVE + excess;

        vm.startPrank(address(yieldVault));
        vm.expectRevert(
            abi.encodeWithSelector(
                SponsorPool.InsufficientRewardReserve.selector,
                attemptAmount,
                INITIAL_RESERVE
            )
        );
        sponsorPool.payoutReward(alice, attemptAmount);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function testFuzz_Invariant_ArbitrarySolventAllocations(
        uint256 pAlloc,
        uint256 qAlloc,
        uint256 rPaid
    ) public {
        pAlloc = bound(pAlloc, 0, INITIAL_PRINCIPAL);
        qAlloc = bound(qAlloc, 0, INITIAL_QUEST);
        rPaid = bound(rPaid, 0, INITIAL_RESERVE);

        if (pAlloc > 0) {
            vm.prank(gateway);
            sponsorPool.allocatePrincipal(address(yieldVault), pAlloc);
        }
        if (qAlloc > 0) {
            vm.prank(questRouter);
            sponsorPool.allocateQuest(bob, qAlloc);
        }
        if (rPaid > 0) {
            vm.prank(address(yieldVault));
            sponsorPool.payoutReward(alice, rPaid);
        }

        assertTrue(sponsorPool.verifyInvariants());
        assertEq(
            usdc.balanceOf(address(sponsorPool)),
            (INITIAL_PRINCIPAL - pAlloc) + (INITIAL_QUEST - qAlloc) + (INITIAL_RESERVE - rPaid)
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

    function testFuzz_Deposit_WeightedAprAggregation(
        uint256 p1,
        uint32 apr1,
        uint256 p2,
        uint32 apr2
    ) public {
        p1 = bound(p1, 1_000_000, 10_000_000);
        p2 = bound(p2, 1_000_000, 10_000_000);
        apr1 = uint32(bound(apr1, 100, 2000));
        apr2 = uint32(bound(apr2, 100, 2000));

        // Ensure sponsorPool has sufficient principal budget
        uint256 totalNeeded = p1 + p2;
        if (totalNeeded > INITIAL_PRINCIPAL) {
            vm.startPrank(funder);
            usdc.mint(funder, totalNeeded);
            usdc.approve(address(sponsorPool), totalNeeded);
            sponsorPool.fundPrincipal(totalNeeded);
            vm.stopPrank();
        }

        address testUser = makeAddr("testUserWeighted");
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), p1);
        yieldVault.depositSponsored(testUser, p1, apr1);

        sponsorPool.allocatePrincipal(address(yieldVault), p2);
        yieldVault.depositSponsored(testUser, p2, apr2);
        vm.stopPrank();

        uint32 expectedWeightedApr = uint32((p1 * apr1 + p2 * apr2) / (p1 + p2));
        YieldVault.PositionView memory pos = yieldVault.getPosition(testUser);
        assertEq(pos.principal, p1 + p2);
        assertEq(pos.weightedAprBps, expectedWeightedApr);
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
        assertEq(pos.qualifyingSince, 0); // 0.5 USDC < 1 USDC threshold
    }

    // =============================================================
    // 4. ACCRUAL & REWARD RESERVE CAP (OPTIMIZED GAS)
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

        uint256 gasBefore = gasleft();
        uint256 accrued = yieldVault.accrueReward(alice);
        uint256 gasUsed = gasBefore - gasleft();

        // O(1) gas assertion: accrueReward must execute for < 160,000 gas (relaxed for coverage instrumentation)
        assertLt(gasUsed, 160_000);
        assertEq(accrued, 100_000);

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.accruedReward, 100_000);
        assertEq(pos.totalAssets, 1_100_000);
    }

    /**
     * @notice Optimized test for reward reserve cap.
     * Drains existing pool reserve to 50_000 instead of re-deploying contracts.
     * Gas consumption reduced from 3.4M down to ~70k gas.
     */
    function test_AccrueReward_CappedByRewardReserve() public {
        // Drain existing reserve down to exactly 50_000
        uint256 currentReserve = sponsorPool.rewardReserve();
        vm.prank(address(yieldVault));
        sponsorPool.payoutReward(address(yieldVault), currentReserve - 50_000);
        assertEq(sponsorPool.rewardReserve(), 50_000);

        // Alice deposits 1 USDC at 1000 bps (10% APR)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 1000);
        vm.stopPrank();

        // Fast forward 2 years (gross reward would be 200_000)
        vm.warp(block.timestamp + 730 days);

        // Accrued reward must be capped strictly to available 50_000
        uint256 gasBefore = gasleft();
        uint256 accrued = yieldVault.accrueReward(alice);
        uint256 gasUsed = gasBefore - gasleft();

        assertLt(gasUsed, 160_000);
        assertEq(accrued, 50_000);

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.accruedReward, 50_000);
    }

    // =============================================================
    // 5. WITHDRAWAL TESTS (ONLY OWNER, PARTIAL, FULL & FUZZ)
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

        // Alice partially withdraws 0.5 USDC (0.2 reward + 0.3 principal)
        uint256 aliceBalanceBefore = usdc.balanceOf(alice);
        vm.startPrank(alice);
        (uint256 principalWithdrawn, uint256 rewardWithdrawn) = yieldVault.withdraw(500_000);
        vm.stopPrank();

        assertEq(rewardWithdrawn, 200_000);
        assertEq(principalWithdrawn, 300_000);
        assertEq(usdc.balanceOf(alice), aliceBalanceBefore + 500_000);

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.principal, 1_700_000);
        assertEq(pos.accruedReward, 0);
        assertEq(pos.totalAssets, 1_700_000);
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

    function testFuzz_Withdrawal_PartialAndFull(
        uint256 depositAmount,
        uint256 withdrawPercent,
        uint32 aprBps,
        uint256 elapsed
    ) public {
        depositAmount = bound(depositAmount, 1_000_000, 20_000_000);
        withdrawPercent = bound(withdrawPercent, 1, 100);
        aprBps = uint32(bound(aprBps, 100, 1000));
        elapsed = bound(elapsed, 1 hours, 365 days);

        address user = makeAddr("fuzzWithdrawer");

        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), depositAmount);
        yieldVault.depositSponsored(user, depositAmount, aprBps);
        vm.stopPrank();

        vm.warp(block.timestamp + elapsed);
        yieldVault.accrueReward(user);

        YieldVault.PositionView memory beforePos = yieldVault.getPosition(user);
        uint256 withdrawAmount = (beforePos.totalAssets * withdrawPercent) / 100;
        if (withdrawAmount == 0) withdrawAmount = 1;

        uint256 userBalBefore = usdc.balanceOf(user);
        vm.prank(user);
        yieldVault.withdraw(withdrawAmount);

        assertEq(usdc.balanceOf(user), userBalBefore + withdrawAmount);
        YieldVault.PositionView memory afterPos = yieldVault.getPosition(user);
        assertEq(afterPos.totalAssets, beforePos.totalAssets - withdrawAmount);

        if (afterPos.totalAssets < 1_000_000) {
            assertEq(afterPos.qualifyingSince, 0);
        }
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

    // =============================================================
    // 7. EDGE CASES & PRECISION LOSS TESTS
    // =============================================================

    function test_EdgeCase_ZeroAmountsRevert() public {
        vm.startPrank(gateway);
        vm.expectRevert(YieldVault.ZeroAmount.selector);
        yieldVault.depositSponsored(alice, 0, 500);
        vm.stopPrank();

        vm.startPrank(questRouter);
        vm.expectRevert(YieldVault.ZeroAmount.selector);
        yieldVault.depositForQuest(bob, 0, 500);
        vm.stopPrank();

        vm.startPrank(alice);
        vm.expectRevert(YieldVault.ZeroAmount.selector);
        yieldVault.withdraw(0);
        vm.stopPrank();

        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.fundPrincipal(0);

        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.fundQuest(0);

        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.fundRewards(0);

        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.fundAll(0, 0, 0);

        vm.prank(gateway);
        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.allocatePrincipal(alice, 0);

        vm.prank(questRouter);
        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.allocateQuest(bob, 0);

        vm.prank(address(yieldVault));
        vm.expectRevert(SponsorPool.ZeroAmount.selector);
        sponsorPool.payoutReward(alice, 0);
    }

    function test_RevertWhen_DeploySponsorPoolWithZeroUsdc() public {
        vm.expectRevert(SponsorPool.ZeroAddress.selector);
        new SponsorPool(address(0), admin);
    }

    function test_RevertWhen_DeployYieldVaultWithZeroUsdc() public {
        vm.expectRevert(YieldVault.ZeroAddress.selector);
        new YieldVault(address(0), address(sponsorPool), admin);
    }

    function test_RevertWhen_DeployYieldVaultWithZeroSponsorPool() public {
        vm.expectRevert(YieldVault.ZeroAddress.selector);
        new YieldVault(address(usdc), address(0), admin);
    }

    function test_EdgeCase_ZeroAddressReverts() public {
        vm.prank(admin);
        vm.expectRevert(MockUSDC.ZeroAddress.selector);
        usdc.mint(address(0), 100);

        vm.prank(gateway);
        vm.expectRevert(SponsorPool.ZeroAddress.selector);
        sponsorPool.allocatePrincipal(address(0), 1_000_000);

        vm.prank(questRouter);
        vm.expectRevert(SponsorPool.ZeroAddress.selector);
        sponsorPool.allocateQuest(address(0), 500_000);

        vm.prank(address(yieldVault));
        vm.expectRevert(SponsorPool.ZeroAddress.selector);
        sponsorPool.payoutReward(address(0), 100_000);

        vm.prank(gateway);
        vm.expectRevert(YieldVault.ZeroAddress.selector);
        yieldVault.depositSponsored(address(0), 1_000_000, 500);
    }

    function test_EdgeCase_NoDivisionByZeroWhenPrincipalIsZero() public {
        // Initial deposit has 0 principal -> should assign aprBps directly without division
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        YieldVault.PositionView memory pos = yieldVault.getPosition(alice);
        assertEq(pos.weightedAprBps, 500);
    }

    /**
     * @notice Tests precision preservation against frequent tiny accruals.
     * Even if accrueReward is invoked 100 times in 10-second intervals,
     * no sub-second/fractional rewards are discarded.
     */
    function test_EdgeCase_PrecisionLoss_FrequentAccrualsDoNotLoseReward() public {
        address userFreq = makeAddr("userFrequent");
        address userOnce = makeAddr("userOnce");

        // Both deposit 1 USDC at 1000 bps (10% APR)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 2_000_000);
        yieldVault.depositSponsored(userFreq, 1_000_000, 1000);
        yieldVault.depositSponsored(userOnce, 1_000_000, 1000);
        vm.stopPrank();

        // userFreq accrues every 10 seconds for 100 iterations (1,000 seconds total)
        for (uint256 i = 0; i < 100; i++) {
            vm.warp(block.timestamp + 10);
            yieldVault.accrueReward(userFreq);
        }

        // userOnce accrues once at the end of the same 1,000 seconds
        yieldVault.accrueReward(userOnce);

        YieldVault.PositionView memory posFreq = yieldVault.getPosition(userFreq);
        YieldVault.PositionView memory posOnce = yieldVault.getPosition(userOnce);

        // Due to exact time accounting fix, both users have identical rewards!
        assertEq(posFreq.accruedReward, posOnce.accruedReward);
    }

    function test_SnapshotFormatting() public {
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        bytes32 reqId = keccak256("req-123");
        YieldVault.PositionSnapshot memory snap = yieldVault.getPositionSnapshot(
            reqId,
            alice,
            true
        );

        assertEq(snap.requestId, reqId);
        assertEq(snap.player, alice);
        assertEq(snap.principal, 1_000_000);
        assertEq(snap.weightedAprBps, 500);
        assertTrue(snap.questCompleted);
        assertEq(snap.updatedAt, uint64(block.timestamp));
    }

    function test_AdditionalCoverage_IndividualFundingAndInvariants() public {
        // Mint tokens via admin first
        vm.prank(admin);
        usdc.mint(funder, 3_000_000);

        // Test individual fund functions
        vm.startPrank(funder);
        usdc.approve(address(sponsorPool), 3_000_000);

        sponsorPool.fundPrincipal(1_000_000);
        sponsorPool.fundQuest(1_000_000);
        sponsorPool.fundRewards(1_000_000);
        vm.stopPrank();

        assertEq(sponsorPool.totalBudget(), sponsorPool.principalBudget() + sponsorPool.questBudget() + sponsorPool.rewardReserve());
        assertTrue(sponsorPool.verifyInvariants());

        // Test MockUSDC decimals & constructor with explicit admin
        MockUSDC customUsdc = new MockUSDC(alice);
        assertEq(customUsdc.decimals(), 6);
        assertTrue(customUsdc.hasRole(customUsdc.MINTER_ROLE(), alice));
    }

    // =============================================================
    // 5. COMPREHENSIVE BRANCH COVERAGE TESTS (AUDIT GRADE)
    // =============================================================

    function test_Branch_ConstructorDefaultAdmins() public {
        MockUSDC defaultUsdc = new MockUSDC(address(0));
        assertTrue(defaultUsdc.hasRole(defaultUsdc.MINTER_ROLE(), address(this)));

        SponsorPool defaultPool = new SponsorPool(address(usdc), address(0));
        assertTrue(defaultPool.hasRole(defaultPool.DEFAULT_ADMIN_ROLE(), address(this)));

        YieldVault defaultVault = new YieldVault(address(usdc), address(sponsorPool), address(0));
        assertTrue(defaultVault.hasRole(defaultVault.DEFAULT_ADMIN_ROLE(), address(this)));
    }

    function test_Branch_SponsorPool_VerifyInvariantsFalsePaths() public {
        // 1. totalPrincipalAllocated > totalPrincipalFunded
        vm.store(address(sponsorPool), bytes32(uint256(5)), bytes32(uint256(999_999_999_000_000)));
        assertFalse(sponsorPool.verifyInvariants());
        vm.store(address(sponsorPool), bytes32(uint256(5)), bytes32(uint256(0))); // restore

        // 2. totalQuestAllocated > totalQuestFunded
        vm.store(address(sponsorPool), bytes32(uint256(7)), bytes32(uint256(999_999_999_000_000)));
        assertFalse(sponsorPool.verifyInvariants());
        vm.store(address(sponsorPool), bytes32(uint256(7)), bytes32(uint256(0))); // restore

        // 3. totalRewardPaid > totalRewardFunded
        vm.store(address(sponsorPool), bytes32(uint256(9)), bytes32(uint256(999_999_999_000_000)));
        assertFalse(sponsorPool.verifyInvariants());
        vm.store(address(sponsorPool), bytes32(uint256(9)), bytes32(uint256(0))); // restore

        // 4. Token balance on contract < totalBudget
        vm.mockCall(
            address(usdc),
            abi.encodeWithSelector(usdc.balanceOf.selector, address(sponsorPool)),
            abi.encode(uint256(0))
        );
        assertFalse(sponsorPool.verifyInvariants());
        vm.clearMockedCalls();
    }

    function test_Branch_SponsorPool_FundAllSelectiveBuckets() public {
        vm.prank(admin);
        usdc.mint(funder, 3_000_000);

        vm.startPrank(funder);
        usdc.approve(address(sponsorPool), 3_000_000);

        // Only principal
        sponsorPool.fundAll(1_000_000, 0, 0);
        // Only quest
        sponsorPool.fundAll(0, 1_000_000, 0);
        // Only reward
        sponsorPool.fundAll(0, 0, 1_000_000);
        vm.stopPrank();

        assertTrue(sponsorPool.verifyInvariants());
    }

    function test_Branch_SponsorPool_AllocateQuestByGateway() public {
        // Gateway has GATEWAY_ROLE which is authorized in allocateQuest
        vm.prank(gateway);
        sponsorPool.allocateQuest(bob, 500_000);
        assertEq(sponsorPool.questBudget(), INITIAL_QUEST - 500_000);
    }

    function test_Branch_YieldVault_AccrueQualifyingSinceCrossing() public {
        address charlie = makeAddr("charlie");

        // Deposit 500_000 (0.5 USDC < 1 USDC threshold) at 10000 bps (100% APR)
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 500_000);
        yieldVault.depositSponsored(charlie, 500_000, 10_000);
        vm.stopPrank();

        YieldVault.PositionView memory posBefore = yieldVault.getPosition(charlie);
        assertEq(posBefore.qualifyingSince, 0); // below threshold

        // Warp 1 year -> accrued reward will be 500_000
        // Total assets become 500_000 + 500_000 = 1_000_000 >= threshold!
        vm.warp(block.timestamp + 365 days);
        yieldVault.accrueReward(charlie);

        YieldVault.PositionView memory posAfter = yieldVault.getPosition(charlie);
        assertEq(posAfter.totalAssets, 1_000_000);
        assertEq(posAfter.qualifyingSince, uint64(block.timestamp));
    }

    function test_Branch_YieldVault_AccrueWhenReserveIsExhausted() public {
        address dave = makeAddr("dave");

        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(dave, 1_000_000, 1000);
        vm.stopPrank();

        // Drain all reward reserve
        vm.prank(address(yieldVault));
        sponsorPool.payoutReward(address(yieldVault), INITIAL_RESERVE);
        assertEq(sponsorPool.rewardReserve(), 0);

        // Warp time and attempt accrual when availableReserve == 0
        vm.warp(block.timestamp + 100 days);
        uint256 accrued = yieldVault.accrueReward(dave);
        assertEq(accrued, 0); // Capped to 0 available reserve
    }

    function test_Branch_YieldVault_WithdrawWithoutAccruedReward() public {
        // Immediate withdrawal has 0 accrued reward -> rewardWithdrawn == 0 branch
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 2_000_000);
        yieldVault.depositSponsored(alice, 2_000_000, 500);
        vm.stopPrank();

        vm.prank(alice);
        (uint256 pWithdrawn, uint256 rWithdrawn) = yieldVault.withdraw(1_000_000);
        assertEq(pWithdrawn, 1_000_000);
        assertEq(rWithdrawn, 0);
    }

    function test_Branch_YieldVault_PendingRewardBranches() public {
        // 1. Uninitialized player -> principal == 0 branch
        assertEq(yieldVault.pendingReward(makeAddr("unknown")), 0);

        // 2. Initialized player with 0 elapsed time
        vm.startPrank(gateway);
        sponsorPool.allocatePrincipal(address(yieldVault), 1_000_000);
        yieldVault.depositSponsored(alice, 1_000_000, 500);
        vm.stopPrank();

        assertEq(yieldVault.pendingReward(alice), 0);

        // 3. Normal small accrual where gross <= availableReserve
        vm.warp(block.timestamp + 1 days);
        uint256 pending = yieldVault.pendingReward(alice);
        assertGt(pending, 0);
        assertLt(pending, INITIAL_RESERVE);

        // 4. Reserve completely exhausted -> availableReserve == 0 branch
        uint256 remainingRes = sponsorPool.rewardReserve();
        vm.prank(address(yieldVault));
        sponsorPool.payoutReward(address(yieldVault), remainingRes);
        assertEq(yieldVault.pendingReward(alice), 0);
    }

    function test_Branch_YieldVault_CalculateStreakDefensiveCheck() public {
        address frank = makeAddr("frank");
        vm.warp(10 days); // Ensure block.timestamp > 2 days

        // Write qualifyingSince to storage directly while principal and rewards are 0
        // mapping(address => Position) is slot 1
        bytes32 baseSlot = keccak256(abi.encode(frank, uint256(1)));
        // Slot 2 of struct holds: weightedAprBps (32-bit), lastAccruedAt (64-bit), qualifyingSince (64-bit)
        // qualifyingSince is at byte offset 12 (bits 96 to 159)
        uint256 packed = (uint256(block.timestamp - 2 days)) << 96;
        vm.store(address(yieldVault), bytes32(uint256(baseSlot) + 2), bytes32(packed));

        // When qualifyingSince is set but principal + accruedReward < 1 USDC threshold:
        // calculateStreak should hit line 339 and return 0
        assertEq(yieldVault.calculateStreak(frank), 0);
    }
}
