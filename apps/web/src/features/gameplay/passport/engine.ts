import {
  createEarnedBadge,
  getBadgeEligibilityEvidence,
  type BadgeEligibilityContext,
  type EarnedBadge,
  type GameplayEvidenceEvent,
  type PassportStamp,
} from "@defi-trail/shared";
import {
  PASSPORT_BADGES,
  type PassportBadgeDefinition,
  type PassportBadgeKey,
} from "./definitions";

export interface PassportEvidenceRecord {
  event: GameplayEvidenceEvent;
  chestType?: string;
  h3Cell?: string;
}

export interface PassportState {
  version: 1;
  player: string;
  evidence: PassportEvidenceRecord[];
  badges: EarnedBadge[];
  stamps: PassportStamp[];
  updatedAt: string;
}

export interface PassportBadgeProgress {
  definition: PassportBadgeDefinition;
  status: "LOCKED" | "IN_PROGRESS" | "EARNED";
  current: number;
  target: number;
  earnedBadge?: EarnedBadge;
}

export interface PassportEvaluation {
  state: PassportState;
  collection: PassportBadgeProgress[];
  nextGoal: PassportBadgeProgress | null;
  newBadges: EarnedBadge[];
  newStamps: PassportStamp[];
}

export function createEmptyPassportState(
  player: string,
  at = "1970-01-01T00:00:00.000Z",
): PassportState {
  return {
    version: 1,
    player: player.toLowerCase(),
    evidence: [],
    badges: [],
    stamps: [],
    updatedAt: at,
  };
}

function evidenceIdentity(
  definition: PassportBadgeDefinition,
  records: ReadonlyMap<string, PassportEvidenceRecord>,
) {
  return (event: GameplayEvidenceEvent): string | null => {
    const record = records.get(event.eventId);
    if (definition.identity === "CHEST_TYPE") {
      return record?.chestType?.trim().toUpperCase() ?? null;
    }
    if (definition.identity === "H3_CELL") {
      return record?.h3Cell?.trim().toLowerCase() ?? null;
    }
    return event.requestId ?? event.eventId;
  };
}

function mergeEvidence(
  existing: readonly PassportEvidenceRecord[],
  incoming: readonly PassportEvidenceRecord[],
): PassportEvidenceRecord[] {
  const records = new Map<string, PassportEvidenceRecord>();
  for (const record of [...existing, ...incoming]) {
    const identity = `${record.event.eventType}:${record.event.requestId ?? record.event.eventId}`;
    if (!records.has(identity)) {
      records.set(identity, record);
    }
  }
  return [...records.values()].sort(
    (left, right) =>
      Date.parse(left.event.occurredAt) - Date.parse(right.event.occurredAt) ||
      left.event.eventId.localeCompare(right.event.eventId),
  );
}

function awardIdentity(badge: EarnedBadge): string {
  return `${badge.badgeId}:${badge.ruleVersion}:${badge.seasonId ?? "lifetime"}`;
}

function stableGameplayId(value: string): string {
  return value.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 128);
}

export function evaluatePassport(input: {
  state: PassportState;
  evidence?: readonly PassportEvidenceRecord[];
  seasonId?: string;
  evaluatedAt?: string;
}): PassportEvaluation {
  const evidence = mergeEvidence(input.state.evidence, input.evidence ?? []);
  const events = evidence.map((record) => record.event);
  const recordsByEvent = new Map(
    evidence.map((record) => [record.event.eventId, record]),
  );
  const context: BadgeEligibilityContext = {
    player: input.state.player,
    ...(input.seasonId ? { seasonId: input.seasonId } : {}),
  };
  const badges = [...input.state.badges];
  const stamps = [...input.state.stamps];
  const newBadges: EarnedBadge[] = [];
  const newStamps: PassportStamp[] = [];
  const collection: PassportBadgeProgress[] = [];

  for (const definition of PASSPORT_BADGES) {
    const identityOf = evidenceIdentity(definition, recordsByEvent);
    const qualifying = getBadgeEligibilityEvidence(
      definition.rule,
      events,
      context,
      identityOf,
    );
    const existingBadge = badges.find(
      (badge) =>
        badge.badgeId === definition.rule.badgeId &&
        badge.ruleVersion === definition.rule.ruleVersion &&
        (definition.rule.window === "LIFETIME" ||
          badge.seasonId === input.seasonId),
    );
    let earnedBadge = existingBadge;

    if (!earnedBadge && qualifying.length >= definition.rule.threshold) {
      const thresholdEvent = qualifying[definition.rule.threshold - 1];
      earnedBadge = createEarnedBadge(
        definition.rule,
        events,
        context,
        thresholdEvent.occurredAt,
        identityOf,
      ) ?? undefined;
      if (earnedBadge) {
        badges.push(earnedBadge);
        newBadges.push(earnedBadge);
        const seasonSuffix = earnedBadge.seasonId
          ? `-${earnedBadge.seasonId}`
          : "";
        const stamp: PassportStamp = {
          stampId: stableGameplayId(
            `badge-${definition.key.toLowerCase()}-v${definition.rule.ruleVersion}${seasonSuffix}`,
          ),
          player: input.state.player,
          category: definition.category,
          earnedAt: earnedBadge.earnedAt,
          evidenceRef: earnedBadge.evidenceRefs.at(-1)!,
          artworkKey: definition.artworkKey,
          ...(earnedBadge.seasonId ? { seasonId: earnedBadge.seasonId } : {}),
        };
        if (!stamps.some((item) => item.stampId === stamp.stampId)) {
          stamps.push(stamp);
          newStamps.push(stamp);
        }
      }
    }

    const current = Math.min(qualifying.length, definition.rule.threshold);
    collection.push({
      definition,
      status: earnedBadge
        ? "EARNED"
        : current > 0
          ? "IN_PROGRESS"
          : "LOCKED",
      current,
      target: definition.rule.threshold,
      ...(earnedBadge ? { earnedBadge } : {}),
    });
  }

  const nextGoal =
    collection
      .filter((item) => item.status !== "EARNED")
      .sort(
        (left, right) =>
          right.current / right.target - left.current / left.target ||
          left.target - left.current - (right.target - right.current),
      )[0] ?? null;
  const updatedAt =
    input.evaluatedAt ??
    evidence.at(-1)?.event.occurredAt ??
    input.state.updatedAt;

  return {
    state: {
      ...input.state,
      evidence,
      badges: badges.sort((a, b) => awardIdentity(a).localeCompare(awardIdentity(b))),
      stamps: stamps.sort((a, b) => a.stampId.localeCompare(b.stampId)),
      updatedAt,
    },
    collection,
    nextGoal,
    newBadges,
    newStamps,
  };
}

export function getBadgeProgress(
  evaluation: PassportEvaluation,
  key: PassportBadgeKey,
): PassportBadgeProgress {
  return evaluation.collection.find((item) => item.definition.key === key)!;
}

