import {
  trailProgressSchema,
  type TrailDefinition,
  type TrailProgress,
} from "@defi-trail/shared";
import { parseSafeJSON } from "@/lib/json";

const PROGRESS_KEY_PREFIX = "defi_trail_progress_cache_v1";
const LAST_SESSION_KEY_PREFIX = "defi_trail_last_session_v1";

export interface LastTrailSession {
  trailId: string;
  title: string;
  endsAt: string;
  player: string;
  cachedAt: string;
}

function getBrowserStorage(): Storage | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }
  return null;
}

function progressKey(trailId: string, player: string): string {
  return `${PROGRESS_KEY_PREFIX}:${trailId}:${player.toLowerCase()}`;
}

function latestKey(player: string): string {
  return `${LAST_SESSION_KEY_PREFIX}:${player.toLowerCase()}`;
}

function isTrustedConfirmedCache(
  trail: TrailDefinition,
  progress: TrailProgress,
): boolean {
  if (
    progress.trailId !== trail.id ||
    new Set(
      progress.completedCheckpoints.map(
        (completion) => completion.checkpointId,
      ),
    ).size !== progress.completedCheckpoints.length
  ) {
    return false;
  }
  const checkpointIds = new Set(
    trail.checkpoints.map((checkpoint) => checkpoint.id),
  );
  if (
    progress.completedCheckpoints.some(
      (completion) =>
        !checkpointIds.has(completion.checkpointId) ||
        !completion.requestId ||
        !completion.evidenceEventId.startsWith("icm-confirmed-"),
    )
  ) {
    return false;
  }
  if (trail.checkpointMode === "ORDERED") {
    return progress.completedCheckpoints.every(
      (completion, index) =>
        completion.checkpointId === trail.checkpoints[index]?.id,
    );
  }
  return true;
}

/**
 * This is a UI cache of evidence already observed as ICM CONFIRMED. It is not an
 * authority for rewards, scoring, or contract state.
 */
export function saveTrailProgressCache(
  progress: TrailProgress,
  storage: Storage | null = getBrowserStorage(),
): void {
  if (!storage) return;
  const parsed = trailProgressSchema.safeParse(progress);
  if (!parsed.success) return;
  try {
    storage.setItem(
      progressKey(progress.trailId, progress.player),
      JSON.stringify(parsed.data),
    );
  } catch {
    // Storage can be disabled or full; the live ICM state remains authoritative.
  }
}

export function loadTrailProgressCache(
  trail: TrailDefinition,
  player: string,
  storage: Storage | null = getBrowserStorage(),
): TrailProgress | null {
  if (!storage) return null;
  try {
    const parsed = trailProgressSchema.safeParse(
      parseSafeJSON<unknown>(storage.getItem(progressKey(trail.id, player))),
    );
    if (
      !parsed.success ||
      parsed.data.player.toLowerCase() !== player.toLowerCase() ||
      !isTrustedConfirmedCache(trail, parsed.data)
    ) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function saveLastTrailSession(
  session: LastTrailSession,
  storage: Storage | null = getBrowserStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(latestKey(session.player), JSON.stringify(session));
  } catch {
    // Optional UI state only.
  }
}

export function loadLastTrailSession(
  player: string,
  storage: Storage | null = getBrowserStorage(),
): LastTrailSession | null {
  if (!storage) return null;
  try {
    const value = parseSafeJSON<LastTrailSession>(
      storage.getItem(latestKey(player)),
    );
    if (
      !value ||
      value.player.toLowerCase() !== player.toLowerCase() ||
      !value.trailId ||
      !value.title ||
      !Number.isFinite(Date.parse(value.endsAt))
    ) {
      return null;
    }
    return value;
  } catch {
    return null;
  }
}
