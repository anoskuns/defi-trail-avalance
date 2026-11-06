import { defaultDemoModePolicy } from "./rules";
import type {
  DemoModePolicy,
  GameplayEvidenceEvent,
  TeamScoreEvent,
  TeamScoreReason,
} from "./types";

const EVIDENCE_TYPE_BY_REASON = {
  CHECKPOINT_CONFIRMED: "CHEST_CONFIRMED",
  TRAIL_COMPLETED: "TRAIL_COMPLETED",
  QUEST_COMPLETED: "QUEST_COMPLETED",
  SPONSOR_REDEMPTION: "PERK_REDEEMED",
} as const satisfies Record<TeamScoreReason, GameplayEvidenceEvent["eventType"]>;

function encodeIdentityPart(value: string): string {
  return encodeURIComponent(value);
}

export function createTeamScoreEventIdentity(input: {
  teamId: string;
  seasonId: string;
  reason: TeamScoreReason;
  evidence: GameplayEvidenceEvent;
}): string {
  const sourceIdentity = input.evidence.requestId ?? input.evidence.eventId;
  return [input.seasonId, input.teamId, input.reason, sourceIdentity]
    .map(encodeIdentityPart)
    .join(":");
}

export function createTeamScoreEvent(input: {
  teamId: string;
  seasonId: string;
  reason: TeamScoreReason;
  points: number;
  evidence: GameplayEvidenceEvent;
  demoModePolicy?: DemoModePolicy;
}): TeamScoreEvent | null {
  if (!Number.isSafeInteger(input.points) || input.points <= 0) {
    throw new RangeError("Team score points must be a positive safe integer");
  }
  const policy = input.demoModePolicy ?? defaultDemoModePolicy;
  if (
    policy(input.evidence) !== "ALLOW" ||
    input.evidence.seasonId !== input.seasonId ||
    input.evidence.eventType !== EVIDENCE_TYPE_BY_REASON[input.reason]
  ) {
    return null;
  }
  if (
    !Number.isSafeInteger(input.points) ||
    input.points <= 0
  ) {
    throw new RangeError("Team points must be a positive safe integer");
  }

  return {
    scoreEventId: createTeamScoreEventIdentity(input),
    sourceEventId: input.evidence.eventId,
    ...(input.evidence.requestId
      ? { sourceRequestId: input.evidence.requestId }
      : {}),
    teamId: input.teamId,
    seasonId: input.seasonId,
    player: input.evidence.player,
    reason: input.reason,
    points: input.points,
    occurredAt: input.evidence.occurredAt,
  };
}

export function appendTeamScoreEvent(
  existing: readonly TeamScoreEvent[],
  candidate: TeamScoreEvent,
): TeamScoreEvent[] {
  if (existing.some((event) => event.scoreEventId === candidate.scoreEventId)) {
    return [...existing];
  }
  return [...existing, candidate];
}

export function reduceTeamScoreEvents(
  events: readonly TeamScoreEvent[],
): TeamScoreEvent[] {
  const unique = new Map<string, TeamScoreEvent>();
  for (const event of events) {
    if (!unique.has(event.scoreEventId)) {
      unique.set(event.scoreEventId, event);
    }
  }
  return [...unique.values()];
}

export function calculateTeamScore(
  events: readonly TeamScoreEvent[],
): number {
  const total = reduceTeamScoreEvents(events).reduce(
    (total, event) => total + event.points,
    0,
  );
  if (!Number.isSafeInteger(total)) {
    throw new RangeError("Team score exceeds the safe integer range");
  }
  return total;
}

