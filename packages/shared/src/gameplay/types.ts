export type IsoDateTime = string;
export type GameplayMode = "GPS" | "DEMO";
export type SeasonStatus = "DRAFT" | "SCHEDULED" | "ACTIVE" | "ENDED";
export type CheckpointMode = "ORDERED" | "ANY_ORDER";
export type PassportStampCategory =
  | "LOCATION"
  | "TRAIL"
  | "SEASON"
  | "LEARNING"
  | "SPONSOR";
export type BadgeWindow = "LIFETIME" | "SEASON" | "EPOCH";
export type PerkClaimStatus = "ISSUED" | "REDEEMED" | "EXPIRED" | "REVOKED";

export type GameplayEvidenceEventType =
  | "CHEST_CONFIRMED"
  | "QUEST_COMPLETED"
  | "TRAIL_COMPLETED"
  | "PERK_REDEEMED";

export interface ActiveWindow {
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
}

export interface SeasonDefinition extends ActiveWindow {
  id: string;
  version: number;
  name: string;
  themeKey: string;
  teamIds: string[];
  trailIds: string[];
  badgeIds: string[];
  perkCampaignIds: string[];
  status: SeasonStatus;
}

export interface TrailCheckpoint {
  id: string;
  chestId: string;
  title: string;
  description?: string;
}

export interface TrailDefinition extends ActiveWindow {
  id: string;
  version: number;
  seasonId: string;
  title: string;
  description: string;
  checkpointMode: CheckpointMode;
  checkpoints: TrailCheckpoint[];
  estimatedMinutes: number;
  completionBadgeId?: string;
  perkCampaignId?: string;
  enabled: boolean;
}

export interface TrailCheckpointCompletion {
  checkpointId: string;
  evidenceEventId: string;
  requestId?: string;
  completedAt: IsoDateTime;
  mode: GameplayMode;
}

export interface TrailProgress {
  trailId: string;
  player: string;
  startedAt: IsoDateTime;
  completedCheckpoints: TrailCheckpointCompletion[];
  completedAt?: IsoDateTime;
}

export interface PassportStamp {
  stampId: string;
  player: string;
  category: PassportStampCategory;
  earnedAt: IsoDateTime;
  evidenceRef: string;
  artworkKey: string;
  seasonId?: string;
}

export interface BadgeRule {
  badgeId: string;
  ruleVersion: number;
  eventType: GameplayEvidenceEventType;
  threshold: number;
  window: BadgeWindow;
}

export interface EarnedBadge {
  badgeId: string;
  ruleVersion: number;
  player: string;
  earnedAt: IsoDateTime;
  evidenceRefs: string[];
  seasonId?: string;
  epochId?: string;
}

export interface TeamDefinition {
  id: string;
  seasonId: string;
  name: string;
  description: string;
  colorKey: string;
  enabled: boolean;
}

export type TeamScoreReason =
  | "CHECKPOINT_CONFIRMED"
  | "TRAIL_COMPLETED"
  | "QUEST_COMPLETED"
  | "SPONSOR_REDEMPTION";

export interface TeamScoreEvent {
  scoreEventId: string;
  sourceEventId: string;
  sourceRequestId?: string;
  teamId: string;
  seasonId: string;
  player: string;
  reason: TeamScoreReason;
  points: number;
  occurredAt: IsoDateTime;
}

export interface PerkCampaign extends ActiveWindow {
  id: string;
  version: number;
  seasonId: string;
  sponsorName: string;
  title: string;
  description: string;
  eligibleEventTypes: GameplayEvidenceEventType[];
  claimTtlSeconds: number;
  maxClaimsPerPlayer: 1;
  enabled: boolean;
}

export interface PerkClaim {
  claimId: string;
  campaignId: string;
  player: string;
  evidenceRef: string;
  issuedAt: IsoDateTime;
  expiresAt: IsoDateTime;
  status: PerkClaimStatus;
}

export interface GameplayEvidenceEvent {
  eventId: string;
  eventType: GameplayEvidenceEventType;
  player: string;
  seasonId: string;
  trailId?: string;
  checkpointId?: string;
  campaignId?: string;
  requestId?: string;
  epochId?: string;
  chainId?: number;
  txHash?: string;
  occurredAt: IsoDateTime;
  mode: GameplayMode;
}

export type DemoModePolicyDecision = "ALLOW" | "ALLOW_NO_SCORE" | "DENY";
export type DemoModePolicy = (
  event: GameplayEvidenceEvent,
) => DemoModePolicyDecision;

