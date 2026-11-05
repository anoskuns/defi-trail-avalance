import { describe, expect, it } from "vitest";
import {
  BALANCE_TIER_THRESHOLDS,
  BASE_COMPASS_LEVEL,
  BASE_ENERGY_MAX,
  BASE_OPEN_RADIUS_METERS,
  MAX_EXPLORATION_STREAK_BONUS,
  MAX_POWER_LEVEL,
  OPEN_RADIUS_STEP_METERS,
  RARITY_CONFIG,
  STREAK_TIER_THRESHOLDS,
} from "../src/constants/progression";
import {
  calculateBalanceTier,
  calculateCompassLevel,
  calculateEnergyMax,
  calculateExplorationScore,
  calculateOpenRadius,
  calculatePowerLevel,
  calculateStreakTier,
  getRarityAndApr,
} from "../src/math/progression";
import { Rarity } from "../src/types/domain";

describe("progression math boundary tests", () => {
  describe("calculateBalanceTier", () => {
    it("returns tier 0 for assets strictly below 1 Mock USDC (< 1_000_000n)", () => {
      expect(calculateBalanceTier(0n)).toBe(0);
      expect(calculateBalanceTier(1n)).toBe(0);
      expect(calculateBalanceTier(500_000n)).toBe(0);
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_1 - 1n)).toBe(0);
      expect(calculateBalanceTier(999_999n)).toBe(0);
    });

    it("returns tier 1 for 1.000000 <= assets < 5.000000 Mock USDC", () => {
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_1)).toBe(1);
      expect(calculateBalanceTier(1_000_000n)).toBe(1);
      expect(calculateBalanceTier(1_000_001n)).toBe(1);
      expect(calculateBalanceTier(2_500_000n)).toBe(1);
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_2 - 1n)).toBe(1);
      expect(calculateBalanceTier(4_999_999n)).toBe(1);
    });

    it("returns tier 2 for 5.000000 <= assets < 10.000000 Mock USDC", () => {
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_2)).toBe(2);
      expect(calculateBalanceTier(5_000_000n)).toBe(2);
      expect(calculateBalanceTier(5_000_001n)).toBe(2);
      expect(calculateBalanceTier(7_500_000n)).toBe(2);
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_3 - 1n)).toBe(2);
      expect(calculateBalanceTier(9_999_999n)).toBe(2);
    });

    it("returns tier 3 for assets >= 10.000000 Mock USDC", () => {
      expect(calculateBalanceTier(BALANCE_TIER_THRESHOLDS.TIER_3)).toBe(3);
      expect(calculateBalanceTier(10_000_000n)).toBe(3);
      expect(calculateBalanceTier(10_000_001n)).toBe(3);
      expect(calculateBalanceTier(100_000_000n)).toBe(3);
      expect(calculateBalanceTier(1_000_000_000_000n)).toBe(3);
    });
  });

  describe("calculateStreakTier", () => {
    it("returns tier 0 for streak <= 0", () => {
      expect(calculateStreakTier(-5)).toBe(0);
      expect(calculateStreakTier(0)).toBe(0);
      expect(calculateStreakTier(0.9)).toBe(0);
    });

    it("returns tier 1 for streak 1-2", () => {
      expect(calculateStreakTier(STREAK_TIER_THRESHOLDS.TIER_1)).toBe(1);
      expect(calculateStreakTier(1)).toBe(1);
      expect(calculateStreakTier(1.5)).toBe(1);
      expect(calculateStreakTier(2)).toBe(1);
      expect(calculateStreakTier(2.9)).toBe(1);
    });

    it("returns tier 2 for streak 3-6", () => {
      expect(calculateStreakTier(STREAK_TIER_THRESHOLDS.TIER_2)).toBe(2);
      expect(calculateStreakTier(3)).toBe(2);
      expect(calculateStreakTier(4)).toBe(2);
      expect(calculateStreakTier(5)).toBe(2);
      expect(calculateStreakTier(6)).toBe(2);
      expect(calculateStreakTier(6.9)).toBe(2);
    });

    it("returns tier 3 for streak >= 7", () => {
      expect(calculateStreakTier(STREAK_TIER_THRESHOLDS.TIER_3)).toBe(3);
      expect(calculateStreakTier(7)).toBe(3);
      expect(calculateStreakTier(8)).toBe(3);
      expect(calculateStreakTier(30)).toBe(3);
      expect(calculateStreakTier(365)).toBe(3);
    });
  });

  describe("calculatePowerLevel", () => {
    it("evaluates correctly for all standard tier combinations", () => {
      // floor((0 + 0) / 2) = 0
      expect(calculatePowerLevel(0, 0)).toBe(0);
      // floor((0 + 1) / 2) = 0
      expect(calculatePowerLevel(0, 1)).toBe(0);
      expect(calculatePowerLevel(1, 0)).toBe(0);
      // floor((1 + 1) / 2) = 1
      expect(calculatePowerLevel(1, 1)).toBe(1);
      // floor((0 + 2) / 2) = 1
      expect(calculatePowerLevel(0, 2)).toBe(1);
      expect(calculatePowerLevel(2, 0)).toBe(1);
      // floor((1 + 2) / 2) = 1
      expect(calculatePowerLevel(1, 2)).toBe(1);
      expect(calculatePowerLevel(2, 1)).toBe(1);
      // floor((2 + 2) / 2) = 2
      expect(calculatePowerLevel(2, 2)).toBe(2);
      // floor((2 + 3) / 2) = 2
      expect(calculatePowerLevel(2, 3)).toBe(2);
      expect(calculatePowerLevel(3, 2)).toBe(2);
      // floor((3 + 3) / 2) = 3
      expect(calculatePowerLevel(3, 3)).toBe(3);
    });

    it("clamps output to maximum power level 3", () => {
      expect(calculatePowerLevel(3, 4)).toBe(MAX_POWER_LEVEL);
      expect(calculatePowerLevel(4, 4)).toBe(MAX_POWER_LEVEL);
      expect(calculatePowerLevel(10, 10)).toBe(MAX_POWER_LEVEL);
    });

    it("handles negative inputs gracefully by clamping to 0", () => {
      expect(calculatePowerLevel(-1, 0)).toBe(0);
      expect(calculatePowerLevel(0, -1)).toBe(0);
      expect(calculatePowerLevel(-2, -2)).toBe(0);
    });
  });

  describe("calculateEnergyMax", () => {
    it("computes 3 + powerLevel for all boundary levels", () => {
      expect(calculateEnergyMax(0)).toBe(BASE_ENERGY_MAX);
      expect(calculateEnergyMax(1)).toBe(BASE_ENERGY_MAX + 1);
      expect(calculateEnergyMax(2)).toBe(BASE_ENERGY_MAX + 2);
      expect(calculateEnergyMax(3)).toBe(BASE_ENERGY_MAX + 3);
      expect(calculateEnergyMax(-1)).toBe(BASE_ENERGY_MAX);
    });
  });

  describe("calculateOpenRadius", () => {
    it("computes 30 + 5 * powerLevel for all boundary levels", () => {
      expect(calculateOpenRadius(0)).toBe(BASE_OPEN_RADIUS_METERS);
      expect(calculateOpenRadius(1)).toBe(
        BASE_OPEN_RADIUS_METERS + OPEN_RADIUS_STEP_METERS * 1,
      );
      expect(calculateOpenRadius(2)).toBe(
        BASE_OPEN_RADIUS_METERS + OPEN_RADIUS_STEP_METERS * 2,
      );
      expect(calculateOpenRadius(3)).toBe(
        BASE_OPEN_RADIUS_METERS + OPEN_RADIUS_STEP_METERS * 3,
      );
      expect(calculateOpenRadius(-1)).toBe(BASE_OPEN_RADIUS_METERS);
    });
  });

  describe("calculateCompassLevel", () => {
    it("computes 1 + powerLevel for all boundary levels", () => {
      expect(calculateCompassLevel(0)).toBe(BASE_COMPASS_LEVEL);
      expect(calculateCompassLevel(1)).toBe(BASE_COMPASS_LEVEL + 1);
      expect(calculateCompassLevel(2)).toBe(BASE_COMPASS_LEVEL + 2);
      expect(calculateCompassLevel(3)).toBe(BASE_COMPASS_LEVEL + 3);
      expect(calculateCompassLevel(-1)).toBe(BASE_COMPASS_LEVEL);
    });
  });

  describe("calculateExplorationScore", () => {
    it("adds uniqueH3Count and min(streak, 7)", () => {
      expect(calculateExplorationScore(0, 0)).toBe(0);
      expect(calculateExplorationScore(1, 0)).toBe(1);
      expect(calculateExplorationScore(0, 1)).toBe(1);
      expect(calculateExplorationScore(0, 6)).toBe(6);
      expect(calculateExplorationScore(0, 7)).toBe(
        MAX_EXPLORATION_STREAK_BONUS,
      );
      // streak capped at 7
      expect(calculateExplorationScore(0, 8)).toBe(
        MAX_EXPLORATION_STREAK_BONUS,
      );
      expect(calculateExplorationScore(0, 30)).toBe(
        MAX_EXPLORATION_STREAK_BONUS,
      );
      // combinations
      expect(calculateExplorationScore(5, 3)).toBe(8);
      expect(calculateExplorationScore(10, 7)).toBe(17);
      expect(calculateExplorationScore(10, 15)).toBe(17);
    });

    it("handles negative inputs gracefully", () => {
      expect(calculateExplorationScore(-1, 0)).toBe(0);
      expect(calculateExplorationScore(0, -2)).toBe(0);
      expect(calculateExplorationScore(-5, -5)).toBe(0);
    });
  });

  describe("getRarityAndApr", () => {
    it("returns COMMON tier 1 for scores <= 2", () => {
      const commonConfig = RARITY_CONFIG[Rarity.COMMON];

      const scoreMinus1 = getRarityAndApr(-1);
      expect(scoreMinus1).toEqual({
        rarity: Rarity.COMMON,
        aprBps: commonConfig.aprBps,
        questTier: commonConfig.questTier,
        questDeposit: commonConfig.questDeposit,
      });

      const score0 = getRarityAndApr(0);
      expect(score0).toEqual({
        rarity: Rarity.COMMON,
        aprBps: 500,
        questTier: 1,
        questDeposit: 500_000n,
      });

      const score1 = getRarityAndApr(1);
      expect(score1.rarity).toBe(Rarity.COMMON);
      expect(score1.aprBps).toBe(500);

      const score2 = getRarityAndApr(2);
      expect(score2).toEqual({
        rarity: Rarity.COMMON,
        aprBps: 500,
        questTier: 1,
        questDeposit: 500_000n,
      });
    });

    it("returns RARE tier 2 for scores 3-5", () => {
      const score3 = getRarityAndApr(3);
      expect(score3).toEqual({
        rarity: Rarity.RARE,
        aprBps: 625,
        questTier: 2,
        questDeposit: 1_000_000n,
      });

      const score4 = getRarityAndApr(4);
      expect(score4.rarity).toBe(Rarity.RARE);
      expect(score4.aprBps).toBe(625);

      const score5 = getRarityAndApr(5);
      expect(score5).toEqual({
        rarity: Rarity.RARE,
        aprBps: 625,
        questTier: 2,
        questDeposit: 1_000_000n,
      });
    });

    it("returns EPIC tier 3 for scores 6-9", () => {
      const score6 = getRarityAndApr(6);
      expect(score6).toEqual({
        rarity: Rarity.EPIC,
        aprBps: 750,
        questTier: 3,
        questDeposit: 2_000_000n,
      });

      const score7 = getRarityAndApr(7);
      expect(score7.rarity).toBe(Rarity.EPIC);
      expect(score7.aprBps).toBe(750);

      const score8 = getRarityAndApr(8);
      expect(score8.rarity).toBe(Rarity.EPIC);
      expect(score8.aprBps).toBe(750);

      const score9 = getRarityAndApr(9);
      expect(score9).toEqual({
        rarity: Rarity.EPIC,
        aprBps: 750,
        questTier: 3,
        questDeposit: 2_000_000n,
      });
    });

    it("returns LEGENDARY tier 4 for scores >= 10", () => {
      const score10 = getRarityAndApr(10);
      expect(score10).toEqual({
        rarity: Rarity.LEGENDARY,
        aprBps: 1000,
        questTier: 4,
        questDeposit: 3_000_000n,
      });

      const score11 = getRarityAndApr(11);
      expect(score11.rarity).toBe(Rarity.LEGENDARY);
      expect(score11.aprBps).toBe(1000);
      expect(score11.questTier).toBe(4);
      expect(score11.questDeposit).toBe(3_000_000n);

      const score100 = getRarityAndApr(100);
      expect(score100).toEqual({
        rarity: Rarity.LEGENDARY,
        aprBps: 1000,
        questTier: 4,
        questDeposit: 3_000_000n,
      });
    });
  });
});

