import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { TrailDefinition, TrailProgress } from "@defi-trail/shared";
import {
  applyConfirmedEvidence,
  createTrailProgress,
  deriveTrailProgressView,
} from "@/features/gameplay/trails/model";
import {
  loadTrailProgressCache,
  saveTrailProgressCache,
} from "@/features/gameplay/trails/storage";

const cardSource = readFileSync(
  new URL(
    "../src/features/gameplay/trails/TodayTrailCard.tsx",
    import.meta.url,
  ),
  "utf8",
);

const trail: TrailDefinition = {
  id: "today-campus-trail",
  version: 1,
  seasonId: "demo-season-2026",
  title: "Today’s Campus Trail",
  description: "Confirm three campus checkpoints in order.",
  checkpointMode: "ORDERED",
  checkpoints: [
    {
      id: "campus-library",
      chestId: "0x1111111111111111111111111111111111111111111111111111111111111111",
      title: "Central Library",
    },
    {
      id: "campus-engineering",
      chestId: "0x2222222222222222222222222222222222222222222222222222222222222222",
      title: "Engineering Hall",
    },
    {
      id: "campus-sponsor",
      chestId: "0x3333333333333333333333333333333333333333333333333333333333333333",
      title: "Student Center",
    },
  ],
  startsAt: "2026-01-01T00:00:00.000Z",
  endsAt: "2027-01-01T00:00:00.000Z",
  estimatedMinutes: 30,
  enabled: true,
};

const demoPlayer = "0x000000000000000000000000000000000000dead";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear(): void {
    this.values.clear();
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

function confirmCheckpoint(
  progress: TrailProgress,
  checkpointIndex: number,
): TrailProgress {
  const checkpoint = trail.checkpoints[checkpointIndex]!;
  const result = applyConfirmedEvidence({
    trail,
    progress,
    signal: {
      state: "confirmed",
      requestId: checkpoint.chestId,
      chestSlot: checkpointIndex,
    },
    confirmedAt: `2026-11-06T12:0${checkpointIndex}:00.000Z`,
  });
  expect(["APPLIED", "COMPLETED"]).toContain(result.status);
  return result.progress;
}

describe("GE-03 Today’s Trail UI", () => {
  it("renders a mobile-first three-checkpoint card with a clear start CTA", () => {
    const view = deriveTrailProgressView(trail, null, { state: "idle" });
    expect(view.checkpoints).toHaveLength(3);
    expect(view.checkpoints.map((checkpoint) => checkpoint.title)).toEqual([
      "Central Library",
      "Engineering Hall",
      "Student Center",
    ]);
    expect(cardSource).toContain('minHeight: "48px"');
    expect(cardSource).toContain('aria-label="Trail checkpoints"');
    expect(cardSource).toContain('label: "Start trail"');
  });

  it("keeps ordered checkpoints locked and treats pending evidence as incomplete", () => {
    const progress = createTrailProgress(
      trail.id,
      demoPlayer,
      "2026-11-06T12:00:00.000Z",
    );
    const signal = {
      state: "icm_pending" as const,
      requestId: trail.checkpoints[0]!.chestId,
      chestSlot: 0,
    };
    const view = deriveTrailProgressView(trail, progress, signal);

    expect(view.checkpoints.map((checkpoint) => checkpoint.status)).toEqual([
      "pending",
      "locked",
      "locked",
    ]);
    expect(view.isComplete).toBe(false);

    expect(cardSource).toContain('pending: "Confirming"');
    expect(cardSource).toContain('label: "Resume confirmation"');
  });

  it("uses shared rules to unlock the next checkpoint only after confirmation", () => {
    const started = createTrailProgress(
      trail.id,
      demoPlayer,
      "2026-11-06T12:00:00.000Z",
    );
    const afterFirst = confirmCheckpoint(started, 0);
    const view = deriveTrailProgressView(trail, afterFirst, { state: "idle" });

    expect(view.checkpoints.map((checkpoint) => checkpoint.status)).toEqual([
      "confirmed",
      "available",
      "locked",
    ]);
    expect(view.nextCheckpoint?.title).toBe("Engineering Hall");
  });

  it("celebrates only after all three evidence events are confirmed", () => {
    let progress = createTrailProgress(
      trail.id,
      demoPlayer,
      "2026-11-06T12:00:00.000Z",
    );
    progress = confirmCheckpoint(progress, 0);
    progress = confirmCheckpoint(progress, 1);
    progress = confirmCheckpoint(progress, 2);

    const view = deriveTrailProgressView(
      trail,
      progress,
      { state: "confirmed", requestId: trail.checkpoints[2]!.chestId },
    );
    expect(progress.completedAt).toBeDefined();
    expect(view.isComplete).toBe(true);
    expect(view.confirmedCount).toBe(3);
    expect(cardSource).toContain("Trail confirmed");
  });

  it("restores confirmed progress from the non-authoritative UI cache", () => {
    const storage = new MemoryStorage();
    const started = createTrailProgress(
      trail.id,
      demoPlayer,
      "2026-11-06T12:00:00.000Z",
    );
    const confirmed = confirmCheckpoint(started, 0);
    saveTrailProgressCache(confirmed, storage);

    expect(loadTrailProgressCache(trail, demoPlayer, storage)).toEqual(
      confirmed,
    );
  });

  it("renders loading, empty, error, and ended states", () => {
    for (const text of [
      "Finding today’s trail",
      "Nothing scheduled today",
      "Today’s Trail is temporarily unavailable",
      "Trail ended",
    ]) {
      expect(cardSource).toContain(text);
    }
  });
});
