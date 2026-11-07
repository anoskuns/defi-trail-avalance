import type {
  GameplayEvidenceEvent,
  TrailDefinition,
  TrailProgress,
} from "@defi-trail/shared";
import type { PassportEvidenceRecord } from "./engine";

function stableGameplayId(value: string): string {
  return value.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 128);
}

export function createConfirmedTrailEvidence(input: {
  trail: TrailDefinition;
  previousProgress: TrailProgress;
  nextProgress: TrailProgress;
  chestType?: string;
  h3Cell?: string;
}): PassportEvidenceRecord[] {
  const previousIds = new Set(
    input.previousProgress.completedCheckpoints.map(
      (completion) => completion.evidenceEventId,
    ),
  );
  const newCompletions = input.nextProgress.completedCheckpoints.filter(
    (completion) => !previousIds.has(completion.evidenceEventId),
  );
  const records: PassportEvidenceRecord[] = newCompletions.map((completion) => ({
    event: {
      eventId: completion.evidenceEventId,
      eventType: "CHEST_CONFIRMED",
      player: input.nextProgress.player,
      seasonId: input.trail.seasonId,
      trailId: input.trail.id,
      checkpointId: completion.checkpointId,
      ...(completion.requestId ? { requestId: completion.requestId } : {}),
      occurredAt: completion.completedAt,
      mode: completion.mode,
    },
    ...(input.chestType ? { chestType: input.chestType } : {}),
    ...(input.h3Cell ? { h3Cell: input.h3Cell } : {}),
  }));

  if (
    !input.previousProgress.completedAt &&
    input.nextProgress.completedAt &&
    newCompletions.length > 0
  ) {
    const finalCompletion = newCompletions.at(-1)!;
    const trailEvent: GameplayEvidenceEvent = {
      eventId: stableGameplayId(
        `trail-complete-${input.trail.id}-${finalCompletion.evidenceEventId}`,
      ),
      eventType: "TRAIL_COMPLETED",
      player: input.nextProgress.player,
      seasonId: input.trail.seasonId,
      trailId: input.trail.id,
      requestId: stableGameplayId(`trail-complete-${input.trail.id}`),
      occurredAt: input.nextProgress.completedAt,
      mode: finalCompletion.mode,
    };
    records.push({ event: trailEvent });
  }

  return records;
}

