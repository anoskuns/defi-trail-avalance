import { keccak256, encodePacked } from "thirdweb/utils";
import { computeH3Cell } from "./geo";

export const CAMPUS_ID = "demo-campus-v1";
export const DEFAULT_EPOCH_SECONDS = 86400; // 24 hours (PRD §5.1)
export const H3_RESOLUTION = 10;

export const CAMPUS_CENTER = {
  lat: 10.8012,
  lng: 106.6531,
};

export type ChestTypeName = "YIELD" | "QUEST" | "SPONSOR";

export interface DemoSlotSeed {
  slot: number;
  type: ChestTypeName;
  lat: number;
  lng: number;
  sponsorCampaign: string | null;
}

/**
 * Demo Campus seed coordinates according to PRD §11.2
 */
export const DEMO_CAMPUS_SLOTS: readonly DemoSlotSeed[] = [
  { slot: 0, type: "YIELD", lat: 10.8012, lng: 106.6531, sponsorCampaign: null },
  { slot: 1, type: "QUEST", lat: 10.80152, lng: 106.65342, sponsorCampaign: null },
  { slot: 2, type: "SPONSOR", lat: 10.80092, lng: 106.65362, sponsorCampaign: "demo-coffee-v1" },
  { slot: 3, type: "YIELD", lat: 10.8007, lng: 106.65298, sponsorCampaign: null },
  { slot: 4, type: "QUEST", lat: 10.80178, lng: 106.65282, sponsorCampaign: null },
] as const;

/**
 * Returns the current epoch index based on seconds elapsed since Unix epoch (PRD §5.1).
 */
export function getCurrentEpoch(
  timestampSec: number = Math.floor(Date.now() / 1000),
  epochSeconds: number = DEFAULT_EPOCH_SECONDS
): number {
  return Math.floor(timestampSec / epochSeconds);
}

/**
 * Computes deterministic chestId = keccak256(campusId, epoch, slot) as defined in PRD §5.1.
 */
export function computeChestId(
  campusId: string,
  epoch: number,
  slot: number
): `0x${string}` {
  return keccak256(
    encodePacked(
      ["string", "uint64", "uint8"],
      [campusId, BigInt(epoch), slot]
    )
  );
}

/**
 * Computes the 32-byte hash for a campaign ID string.
 */
export function computeCampaignIdHash(campaignId: string): `0x${string}` {
  return keccak256(encodePacked(["string"], [campaignId]));
}

export interface ComputedSlotConfig {
  slot: number;
  type: ChestTypeName;
  lat: number;
  lng: number;
  h3Cell: string;
  chestId: `0x${string}`;
  sponsorCampaign: string | null;
  campaignIdHash: `0x${string}` | null;
}

export interface MapConfigResponse {
  campusId: string;
  epochSeconds: number;
  currentEpoch: number;
  h3Resolution: number;
  center: { lat: number; lng: number };
  slots: ComputedSlotConfig[];
  chains: {
    gameL1: {
      rpcUrl?: string;
      chainId?: number;
      subnetId?: string;
      chestManagerAddress?: string;
      playerStateAddress?: string;
      teleporterMessengerAddress?: string;
    };
    fujiC: {
      rpcUrl?: string;
      chainId: number;
      sponsorPoolAddress?: string;
      yieldVaultAddress?: string;
      questRouterAddress?: string;
      teleporterMessengerAddress?: string;
    };
  };
  demoLocationEnabled: boolean;
}

let cachedCampusConfig: MapConfigResponse | null = null;
let lastEpochCached: number = -1;

/**
 * Generates the full Demo Campus configuration with dynamically computed H3 cells and chestIds.
 * Results are cached in memory by epoch for sub-millisecond response times.
 */
export function getDemoCampusConfig(
  timestampSec: number = Math.floor(Date.now() / 1000),
  epochSeconds: number = DEFAULT_EPOCH_SECONDS
): MapConfigResponse {
  const currentEpoch = getCurrentEpoch(timestampSec, epochSeconds);

  if (cachedCampusConfig && lastEpochCached === currentEpoch) {
    return cachedCampusConfig;
  }

  const computedSlots: ComputedSlotConfig[] = DEMO_CAMPUS_SLOTS.map((slot) => {
    const h3Cell = computeH3Cell(slot.lat, slot.lng, H3_RESOLUTION);
    const chestId = computeChestId(CAMPUS_ID, currentEpoch, slot.slot);
    const campaignIdHash = slot.sponsorCampaign
      ? computeCampaignIdHash(slot.sponsorCampaign)
      : null;

    return {
      slot: slot.slot,
      type: slot.type,
      lat: slot.lat,
      lng: slot.lng,
      h3Cell,
      chestId,
      sponsorCampaign: slot.sponsorCampaign,
      campaignIdHash,
    };
  });

  const result: MapConfigResponse = {
    campusId: CAMPUS_ID,
    epochSeconds,
    currentEpoch,
    h3Resolution: H3_RESOLUTION,
    center: CAMPUS_CENTER,
    slots: computedSlots,
    chains: {
      gameL1: {
        rpcUrl: process.env.NEXT_PUBLIC_GAME_L1_RPC_URL || "http://127.0.0.1:9650/ext/bc/game-l1/rpc",
        chainId: Number(process.env.NEXT_PUBLIC_GAME_L1_CHAIN_ID) || 99999,
        subnetId: process.env.NEXT_PUBLIC_GAME_L1_SUBNET_ID || "demo-game-l1-subnet",
        chestManagerAddress: process.env.NEXT_PUBLIC_GAME_L1_CHEST_MANAGER_ADDRESS,
        playerStateAddress: process.env.NEXT_PUBLIC_GAME_L1_PLAYER_STATE_ADDRESS,
        teleporterMessengerAddress: process.env.NEXT_PUBLIC_GAME_L1_TELEPORTER_MESSENGER_ADDRESS,
      },
      fujiC: {
        rpcUrl: process.env.NEXT_PUBLIC_FUJI_C_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
        chainId: Number(process.env.NEXT_PUBLIC_FUJI_C_CHAIN_ID) || 43113,
        sponsorPoolAddress: process.env.NEXT_PUBLIC_FUJI_C_SPONSOR_POOL_ADDRESS,
        yieldVaultAddress: process.env.NEXT_PUBLIC_FUJI_C_YIELD_VAULT_ADDRESS,
        questRouterAddress: process.env.NEXT_PUBLIC_FUJI_C_QUEST_ROUTER_ADDRESS,
        teleporterMessengerAddress: process.env.NEXT_PUBLIC_FUJI_C_TELEPORTER_MESSENGER_ADDRESS,
      },
    },
    demoLocationEnabled: true,
  };

  cachedCampusConfig = result;
  lastEpochCached = currentEpoch;
  return result;
}

/**
 * Finds a chest slot either by exact chestId (for current epoch) or by slot index or legacy ID.
 */
export function findSlotByChestId(
  chestId: string,
  timestampSec: number = Math.floor(Date.now() / 1000),
  epochSeconds: number = DEFAULT_EPOCH_SECONDS
): ComputedSlotConfig | undefined {
  const config = getDemoCampusConfig(timestampSec, epochSeconds);
  const normalizedId = chestId.toLowerCase();

  // 1. Direct match on current epoch's computed chestId
  const directMatch = config.slots.find(
    (s) => s.chestId.toLowerCase() === normalizedId
  );
  if (directMatch) return directMatch;

  // 2. Check if chestId matches previous or next epoch (within clock skew)
  const currentEpoch = getCurrentEpoch(timestampSec, epochSeconds);
  for (const epochOffset of [-1, 1]) {
    const epochToCheck = currentEpoch + epochOffset;
    if (epochToCheck < 0) continue;
    for (const slot of DEMO_CAMPUS_SLOTS) {
      const altChestId = computeChestId(CAMPUS_ID, epochToCheck, slot.slot);
      if (altChestId.toLowerCase() === normalizedId) {
        return {
          slot: slot.slot,
          type: slot.type,
          lat: slot.lat,
          lng: slot.lng,
          h3Cell: computeH3Cell(slot.lat, slot.lng, H3_RESOLUTION),
          chestId: altChestId,
          sponsorCampaign: slot.sponsorCampaign,
          campaignIdHash: slot.sponsorCampaign
            ? computeCampaignIdHash(slot.sponsorCampaign)
            : null,
        };
      }
    }
  }

  // 3. Fallback: match by slot index if a numeric string or "slot-X" is passed
  const slotNum = parseInt(chestId.replace(/[^0-9]/g, ""), 10);
  if (!isNaN(slotNum) && slotNum >= 0 && slotNum < config.slots.length) {
    return config.slots[slotNum];
  }

  return undefined;
}

