import { Rarity } from "../types/domain";

export const MOCK_USDC_DECIMALS = 6;
export const MOCK_USDC_UNIT = 1_000_000n;

export const BALANCE_TIER_THRESHOLDS = {
  TIER_1: 1_000_000n, // 1.000000 USDC
  TIER_2: 5_000_000n, // 5.000000 USDC
  TIER_3: 10_000_000n, // 10.000000 USDC
} as const;

export const STREAK_TIER_THRESHOLDS = {
  TIER_1: 1,
  TIER_2: 3,
  TIER_3: 7,
} as const;

export const MAX_POWER_LEVEL = 3;
export const BASE_ENERGY_MAX = 3;
export const BASE_OPEN_RADIUS_METERS = 30;
export const OPEN_RADIUS_STEP_METERS = 5;
export const BASE_COMPASS_LEVEL = 1;
export const MAX_EXPLORATION_STREAK_BONUS = 7;

export const RARITY_CONFIG = {
  [Rarity.COMMON]: {
    rarity: Rarity.COMMON,
    maxScore: 2,
    aprBps: 500, // 5.00%
    questTier: 1,
    questDeposit: 500_000n, // 0.5 Mock USDC
  },
  [Rarity.RARE]: {
    rarity: Rarity.RARE,
    maxScore: 5,
    aprBps: 625, // 6.25%
    questTier: 2,
    questDeposit: 1_000_000n, // 1 Mock USDC
  },
  [Rarity.EPIC]: {
    rarity: Rarity.EPIC,
    maxScore: 9,
    aprBps: 750, // 7.50%
    questTier: 3,
    questDeposit: 2_000_000n, // 2 Mock USDC
  },
  [Rarity.LEGENDARY]: {
    rarity: Rarity.LEGENDARY,
    maxScore: Infinity,
    aprBps: 1000, // 10.00%
    questTier: 4,
    questDeposit: 3_000_000n, // 3 Mock USDC
  },
} as const;

