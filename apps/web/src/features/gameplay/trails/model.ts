import {
  applyCheckpointEvidence,
  type CheckpointApplicationStatus,
  type GameplayEvidenceEvent,
  type TrailDefinition,
  type TrailProgress,
} from "@defi-trail/shared";
import type { ICMUIState } from "@/components/cross-chain";

export type TrailCheckpointStatus =
  | "locked"
  | "available"
  | "pending"
  | "confirmed";

export interface TrailEvidenceSignal {
  state: ICMUIState;
  requestId?: string;
  chestSlot?: number;
}

export interface TrailCheckpointView {
  position: number;
  checkpointId: string;
  chestId: string;
  title: string;
  description?: string;
  status: TrailCheckpointStatus;
}

export interface TrailProgressView {
  checkpoints: TrailCheckpointView[];
  confirmedCount: number;
  isComplete: boolean;
  nextCheckpoint: TrailCheckpointView | null;
  pendingCheckpoint: TrailCheckpointView | null;
}

const PENDING_ICM_STATES = new Set<ICMUIState>([
  "awaiting_signature",
  "submitted",
  "icm_pending",
  "retryable_error",
]);

export function createTrailProgress(
  trailId: string,
  player: string,
  startedAt: string,
): TrailProgress {
  return {
    trailId,
    player,
    startedAt,
    completedCheckpoints: [],
  };
}

export function findEvidenceCheckpointId(
  trail: TrailDefinition,
  signal: TrailEvidenceSignal,
): string | null {
  const requestMatch = signal.requestId
    ? trail.checkpoints.find(
        (checkpoint) => checkpoint.chestId === signal.requestId,
      )
    : undefined;
  if (requestMatch) {
    return requestMatch.id;
  }
  if (
    signal.chestSlot !== undefined &&
    signal.chestSlot >= 0 &&
    signal.chestSlot < trail.checkpoints.length
  ) {
    return trail.checkpoints[signal.chestSlot]?.id ?? null;
  }
  return null;
}

export function applyConfirmedEvidence(input: {
  trail: TrailDefinition;
  progress: TrailProgress;
  signal: TrailEvidenceSignal;
  confirmedAt: string;
  mode?: "GPS" | "DEMO";
}): {
  status: CheckpointApplicationStatus | "IGNORED";
  progress: TrailProgress;
} {
  const { trail, progress, signal, confirmedAt } = input;
  if (signal.state !== "confirmed" || !signal.requestId) {
    return { status: "IGNORED", progress };
  }
  const checkpointId = findEvidenceCheckpointId(trail, signal);
  if (!checkpointId) {
    return { status: "IGNORED", progress };
  }

  const event: GameplayEvidenceEvent = {
    eventId: `icm-confirmed-${signal.requestId}`,
    eventType: "CHEST_CONFIRMED",
    player: progress.player,
    seasonId: trail.seasonId,
    trailId: trail.id,
    checkpointId,
    requestId: signal.requestId,
    occurredAt: confirmedAt,
    mode: input.mode ?? "DEMO",
  };
  return applyCheckpointEvidence(trail, progress, event);
}

export function deriveTrailProgressView(
  trail: TrailDefinition,
  progress: TrailProgress | null,
  signal: TrailEvidenceSignal,
): TrailProgressView {
  const confirmedIds = new Set(
    progress?.completedCheckpoints.map(
      (completion) => completion.checkpointId,
    ) ?? [],
  );
  const pendingId = PENDING_ICM_STATES.has(signal.state)
    ? findEvidenceCheckpointId(trail, signal)
    : null;
  const confirmedCount = confirmedIds.size;

  const checkpoints = trail.checkpoints.map((checkpoint, index) => {
    let status: TrailCheckpointStatus = "locked";
    if (confirmedIds.has(checkpoint.id)) {
      status = "confirmed";
    } else if (checkpoint.id === pendingId) {
      status = "pending";
    } else if (
      trail.checkpointMode === "ANY_ORDER" ||
      index === confirmedCount
    ) {
      status = "available";
    }
    return {
      position: index,
      checkpointId: checkpoint.id,
      chestId: checkpoint.chestId,
      title: checkpoint.title,
      ...(checkpoint.description
        ? { description: checkpoint.description }
        : {}),
      status,
    };
  });

  return {
    checkpoints,
    confirmedCount,
    isComplete:
      checkpoints.length > 0 && confirmedCount === checkpoints.length,
    nextCheckpoint:
      checkpoints.find((checkpoint) => checkpoint.status === "available") ??
      null,
    pendingCheckpoint:
      checkpoints.find((checkpoint) => checkpoint.status === "pending") ??
      null,
  };
}
