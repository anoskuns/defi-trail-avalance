export type ChestTypeName = "YIELD" | "QUEST" | "SPONSOR";

export interface MapSlot {
  slot: number;
  type: ChestTypeName;
  lat: number;
  lng: number;
  h3Cell: string;
  chestId: `0x${string}`;
  sponsorCampaign: string | null;
  campaignIdHash?: `0x${string}` | null;
}

export interface PlayerPosition {
  lat: number;
  lng: number;
  accuracyMeters: number;
  heading?: number | null;
}

export type LocationMode = "DEMO" | "LIVE";

export interface ChestReward {
  amountUsdc: number;
  label: string;
  simulatedApr?: string;
  sponsorName?: string;
  tier?: number;
}

export interface SelectedChest extends MapSlot {
  name: string;
  distanceMeters: number;
  inRange: boolean;
  reward: ChestReward;
  energyCost: number;
}

export interface CompassData {
  targetChest: MapSlot | null;
  bearing: number;
  distanceMeters: number;
  cardinalDirection: string;
}

