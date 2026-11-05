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
} from "../constants/progression";
import { Rarity, type RarityAndApr } from "../types/domain";

/**
 * Calculates the balance tier based on assets in Mock USDC (6 decimals):
 * - Tier 0: assets < 1.000000 USDC (< 1_000_000n)
 * - Tier 1: 1.000000 ≤ assets < 5.000000 USDC (1_000_000n .. 4_999_999n)
 * - Tier 2: 5.000000 ≤ assets < 10.000000 USDC (5_000_000n .. 9_999_999n)
 * - Tier 3: assets ≥ 10.000000 USDC (≥ 10_000_000n)
 */
export function calculateBalanceTier(assets: bigint): number {
  if (assets < BALANCE_TIER_THRESHOLDS.TIER_1) {
    return 0;
  }
  if (assets < BALANCE_TIER_THRESHOLDS.TIER_2) {
    return 1;
  }
  if (assets < BALANCE_TIER_THRESHOLDS.TIER_3) {
    return 2;
  }
  return 3;
}

/**
 * Calculates the streak tier based on continuous 24h intervals:
 * - Tier 0: streak = 0
 * - Tier 1: streak 1–2
 * - Tier 2: streak 3–6
 * - Tier 3: streak ≥ 7
 */
export function calculateStreakTier(streakDays: number): number {
  const normalizedStreak = Math.floor(streakDays);
  if (normalizedStreak < STREAK_TIER_THRESHOLDS.TIER_1) {
    return 0;
  }
  if (normalizedStreak < STREAK_TIER_THRESHOLDS.TIER_2) {
    return 1;
  }
  if (normalizedStreak < STREAK_TIER_THRESHOLDS.TIER_3) {
    return 2;
  }
  return 3;
}

/**
 * Calculates power level: min(3, floor((balanceTier + streakTier) / 2))
 */
export function calculatePowerLevel(
  balanceTier: number,
  streakTier: number,
): number {
  const safeBalance = Math.max(0, Math.floor(balanceTier));
  const safeStreak = Math.max(0, Math.floor(streakTier));
  const combined = Math.floor((safeBalance + safeStreak) / 2);
  return Math.min(MAX_POWER_LEVEL, combined);
}

/**
 * Calculates energy max: 3 + powerLevel
 */
export function calculateEnergyMax(powerLevel: number): number {
  const safePower = Math.max(0, Math.floor(powerLevel));
  return BASE_ENERGY_MAX + safePower;
}

/**
 * Calculates open radius in meters: 30 + 5 * powerLevel
 */
export function calculateOpenRadius(powerLevel: number): number {
  const safePower = Math.max(0, Math.floor(powerLevel));
  return BASE_OPEN_RADIUS_METERS + OPEN_RADIUS_STEP_METERS * safePower;
}

/**
 * Calculates compass level: 1 + powerLevel
 */
export function calculateCompassLevel(powerLevel: number): number {
  const safePower = Math.max(0, Math.floor(powerLevel));
  return BASE_COMPASS_LEVEL + safePower;
}

/**
 * Calculates exploration score: uniqueH3Count + min(streak, 7)
 */
export function calculateExplorationScore(
  uniqueH3Count: number,
  streak: number,
): number {
  const safeH3Count = Math.max(0, Math.floor(uniqueH3Count));
  const safeStreak = Math.max(0, Math.floor(streak));
  return safeH3Count + Math.min(safeStreak, MAX_EXPLORATION_STREAK_BONUS);
}

/**
 * Returns rarity, simulated APR (in bps), quest tier, and required quest deposit (in 6-decimal units).
 * - Common: score 0–2 -> 5.00% APR (500 bps), Tier 1, 0.5 Mock USDC
 * - Rare: score 3–5 -> 6.25% APR (625 bps), Tier 2, 1.0 Mock USDC
 * - Epic: score 6–9 -> 7.50% APR (750 bps), Tier 3, 2.0 Mock USDC
 * - Legendary: score ≥ 10 -> 10.00% APR (1000 bps), Tier 4, 3.0 Mock USDC
 */
export function getRarityAndApr(explorationScore: number): RarityAndApr {
  const score = Math.max(0, Math.floor(explorationScore));
  if (score <= RARITY_CONFIG[Rarity.COMMON].maxScore) {
    const config = RARITY_CONFIG[Rarity.COMMON];
    return {
      rarity: config.rarity,
      aprBps: config.aprBps,
      questTier: config.questTier,
      questDeposit: config.questDeposit,
    };
  }
  if (score <= RARITY_CONFIG[Rarity.RARE].maxScore) {
    const config = RARITY_CONFIG[Rarity.RARE];
    return {
      rarity: config.rarity,
      aprBps: config.aprBps,
      questTier: config.questTier,
      questDeposit: config.questDeposit,
    };
  }
  if (score <= RARITY_CONFIG[Rarity.EPIC].maxScore) {
    const config = RARITY_CONFIG[Rarity.EPIC];
    return {
      rarity: config.rarity,
      aprBps: config.aprBps,
      questTier: config.questTier,
      questDeposit: config.questDeposit,
    };
  }
  const config = RARITY_CONFIG[Rarity.LEGENDARY];
  return {
    rarity: config.rarity,
    aprBps: config.aprBps,
    questTier: config.questTier,
    questDeposit: config.questDeposit,
  };
}

