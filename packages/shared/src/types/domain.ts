export type Address = `0x${string}`;
export type Hash = `0x${string}`;
export type Hex = `0x${string}`;

/**
 * 10.1 Solidity-style types
 * Canonical intent from DeFi-Trail-PRD.md
 */

export enum ChestType {
  YIELD = 0,
  QUEST = 1,
  SPONSOR = 2,
}

export enum Rarity {
  COMMON = 0,
  RARE = 1,
  EPIC = 2,
  LEGENDARY = 3,
}

export enum RequestStatus {
  NONE = 0,
  CREATED = 1,
  SENT = 2,
  REMOTE_EXECUTED = 3,
  ACK_PENDING = 4,
  CONFIRMED = 5,
  RETRYABLE_FAILED = 6,
  FAILED_FINAL = 7,
}

export interface LocationProof {
  player: Address | string;
  chestId: Hash | string;
  epoch: bigint | number;
  radiusMeters: number;
  nonce: Hash | string;
  expiresAt: bigint | number;
  mode: number; // 0 = GPS, 1 = DEMO
  signature: Hex | string;
}

export interface SponsorProof {
  player: Address | string;
  chestId: Hash | string;
  campaignId: Hash | string;
  epoch: bigint | number;
  nonce: Hash | string;
  expiresAt: bigint | number;
  signature: Hex | string;
}

export interface DepositRequest {
  requestId: Hash | string;
  player: Address | string;
  sourceType: ChestType;
  sourceId: Hash | string;
  amount: bigint;
  rarity: Rarity;
  epoch: bigint | number;
}

export interface QuestRegistration {
  requestId: Hash | string;
  questId: Hash | string;
  player: Address | string;
  tier: number;
  requiredAmount: bigint;
  expiresAt: bigint | number;
}

export interface PositionSnapshot {
  requestId: Hash | string;
  player: Address | string;
  principal: bigint;
  accruedReward: bigint;
  weightedAprBps: number;
  positionStreak: number;
  updatedAt: bigint | number;
  questCompleted: boolean;
}

export interface RarityAndApr {
  rarity: Rarity;
  aprBps: number;
  questTier: number;
  questDeposit: bigint;
}

