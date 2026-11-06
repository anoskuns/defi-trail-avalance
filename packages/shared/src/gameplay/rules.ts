import type {
  ActiveWindow,
  BadgeRule,
  DemoModePolicy,
  EarnedBadge,
  GameplayEvidenceEvent,
  PerkCampaign,
  PerkClaim,
  TrailDefinition,
  TrailProgress,
} from "./types";

export const defaultDemoModePolicy: DemoModePolicy = (event) =>
  event.mode === "DEMO" ? "ALLOW_NO_SCORE" : "ALLOW";

function timestamp(value: string | number | Date): number {
  const result =
    value instanceof Date
      ? value.getTime()
      : typeof value === "number"
        ? value
        : Date.parse(value);
  if (!Number.isFinite(result)) {
    throw new RangeError("Expected a valid date/time value");
  }
  return result;
}

/** Active windows are start-inclusive and end-exclusive. */
export function validateActiveWindow(
  window: ActiveWindow,
  at: string | number | Date,
): boolean {
  const instant = timestamp(at);
  return instant >= timestamp(window.startsAt) && instant < timestamp(window.endsAt);
}

export type CheckpointApplicationStatus =
  | "APPLIED"
  | "COMPLETED"
  | "DUPLICATE"
  | "OUT_OF_ORDER"
  | "NOT_APPLICABLE"
  | "TRAIL_INACTIVE"
  | "DEMO_REJECTED";

export interface CheckpointApplicationResult {
  status: CheckpointApplicationStatus;
  progress: TrailProgress;
}

export function applyCheckpointEvidence(
  trail: TrailDefinition,
  progress: TrailProgress,
  event: GameplayEvidenceEvent,
  demoModePolicy: DemoModePolicy = defaultDemoModePolicy,
): CheckpointApplicationResult {
  if (!trail.enabled || !validateActiveWindow(trail, event.occurredAt)) {
    return { status: "TRAIL_INACTIVE", progress };
  }
  if (demoModePolicy(event) === "DENY") {
    return { status: "DEMO_REJECTED", progress };
  }
  if (
    event.eventType !== "CHEST_CONFIRMED" ||
    event.trailId !== trail.id ||
    progress.trailId !== trail.id ||
    event.player.toLowerCase() !== progress.player.toLowerCase() ||
    !event.checkpointId
  ) {
    return { status: "NOT_APPLICABLE", progress };
  }

  const checkpointIndex = trail.checkpoints.findIndex(
    (checkpoint) => checkpoint.id === event.checkpointId,
  );
  if (checkpointIndex < 0) {
    return { status: "NOT_APPLICABLE", progress };
  }

  const duplicate = progress.completedCheckpoints.some(
    (completion) =>
      completion.checkpointId === event.checkpointId ||
      completion.evidenceEventId === event.eventId ||
      Boolean(
        event.requestId && completion.requestId === event.requestId,
      ),
  );
  if (duplicate) {
    return { status: "DUPLICATE", progress };
  }

  if (
    trail.checkpointMode === "ORDERED" &&
    checkpointIndex !== progress.completedCheckpoints.length
  ) {
    return { status: "OUT_OF_ORDER", progress };
  }

  const completedCheckpoints = [
    ...progress.completedCheckpoints,
    {
      checkpointId: event.checkpointId,
      evidenceEventId: event.eventId,
      ...(event.requestId ? { requestId: event.requestId } : {}),
      completedAt: event.occurredAt,
      mode: event.mode,
    },
  ];
  const isComplete = completedCheckpoints.length === trail.checkpoints.length;
  const nextProgress: TrailProgress = {
    ...progress,
    completedCheckpoints,
    ...(isComplete ? { completedAt: event.occurredAt } : {}),
  };
  return {
    status: isComplete ? "COMPLETED" : "APPLIED",
    progress: nextProgress,
  };
}

export interface BadgeEligibilityContext {
  player: string;
  seasonId?: string;
  epochId?: string;
  demoModePolicy?: DemoModePolicy;
}

export function getBadgeEligibilityEvidence(
  rule: BadgeRule,
  events: readonly GameplayEvidenceEvent[],
  context: BadgeEligibilityContext,
): GameplayEvidenceEvent[] {
  if (rule.window === "SEASON" && !context.seasonId) {
    return [];
  }
  if (rule.window === "EPOCH" && !context.epochId) {
    return [];
  }

  const policy = context.demoModePolicy ?? defaultDemoModePolicy;
  const uniqueEvents = new Map<string, GameplayEvidenceEvent>();
  for (const event of events) {
    const identity = event.requestId ?? event.eventId;
    if (
      event.eventType !== rule.eventType ||
      event.player.toLowerCase() !== context.player.toLowerCase() ||
      policy(event) === "DENY" ||
      (rule.window === "SEASON" && event.seasonId !== context.seasonId) ||
      (rule.window === "EPOCH" && event.epochId !== context.epochId)
    ) {
      continue;
    }
    if (!uniqueEvents.has(identity)) {
      uniqueEvents.set(identity, event);
    }
  }

  return [...uniqueEvents.values()].sort(
    (left, right) =>
      timestamp(left.occurredAt) - timestamp(right.occurredAt) ||
      left.eventId.localeCompare(right.eventId),
  );
}

export function isBadgeEligible(
  rule: BadgeRule,
  events: readonly GameplayEvidenceEvent[],
  context: BadgeEligibilityContext,
): boolean {
  return getBadgeEligibilityEvidence(rule, events, context).length >= rule.threshold;
}

export function createEarnedBadge(
  rule: BadgeRule,
  events: readonly GameplayEvidenceEvent[],
  context: BadgeEligibilityContext,
  earnedAt: string,
): EarnedBadge | null {
  const evidence = getBadgeEligibilityEvidence(rule, events, context);
  if (evidence.length < rule.threshold) {
    return null;
  }
  return {
    badgeId: rule.badgeId,
    ruleVersion: rule.ruleVersion,
    player: context.player,
    earnedAt,
    evidenceRefs: evidence.slice(0, rule.threshold).map((event) => event.eventId),
    ...(rule.window !== "LIFETIME" && context.seasonId
      ? { seasonId: context.seasonId }
      : {}),
    ...(rule.window === "EPOCH" && context.epochId
      ? { epochId: context.epochId }
      : {}),
  };
}

export type PerkEligibilityReason =
  | "ELIGIBLE"
  | "CAMPAIGN_INACTIVE"
  | "EVENT_NOT_ELIGIBLE"
  | "ALREADY_CLAIMED"
  | "DEMO_REJECTED";

export function evaluatePerkEligibility(input: {
  campaign: PerkCampaign;
  event: GameplayEvidenceEvent;
  existingClaims: readonly PerkClaim[];
  at: string | number | Date;
  demoModePolicy?: DemoModePolicy;
}): { eligible: boolean; reason: PerkEligibilityReason } {
  const { campaign, event, existingClaims, at } = input;
  if (!campaign.enabled || !validateActiveWindow(campaign, at)) {
    return { eligible: false, reason: "CAMPAIGN_INACTIVE" };
  }
  const policy = input.demoModePolicy ?? defaultDemoModePolicy;
  if (policy(event) === "DENY") {
    return { eligible: false, reason: "DEMO_REJECTED" };
  }
  if (
    event.seasonId !== campaign.seasonId ||
    !campaign.eligibleEventTypes.includes(event.eventType)
  ) {
    return { eligible: false, reason: "EVENT_NOT_ELIGIBLE" };
  }
  const alreadyClaimed = existingClaims.some(
    (claim) =>
      claim.campaignId === campaign.id &&
      claim.player.toLowerCase() === event.player.toLowerCase(),
  );
  if (alreadyClaimed) {
    return { eligible: false, reason: "ALREADY_CLAIMED" };
  }
  return { eligible: true, reason: "ELIGIBLE" };
}

export function createPerkClaim(input: {
  claimId: string;
  campaign: PerkCampaign;
  event: GameplayEvidenceEvent;
  issuedAt: string;
}): PerkClaim {
  const expiresAt = new Date(
    timestamp(input.issuedAt) + input.campaign.claimTtlSeconds * 1_000,
  ).toISOString();
  return {
    claimId: input.claimId,
    campaignId: input.campaign.id,
    player: input.event.player,
    evidenceRef: input.event.eventId,
    issuedAt: input.issuedAt,
    expiresAt,
    status: "ISSUED",
  };
}

export function isPerkClaimExpired(
  claim: PerkClaim,
  at: string | number | Date,
): boolean {
  return claim.status === "EXPIRED" || timestamp(at) >= timestamp(claim.expiresAt);
}

