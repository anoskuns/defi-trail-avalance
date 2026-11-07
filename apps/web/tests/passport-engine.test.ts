import { describe, expect, it, vi } from "vitest";
import type { TrailDefinition } from "@defi-trail/shared";
import {
  createEmptyPassportState,
  evaluatePassport,
  getBadgeProgress,
  PASSPORT_BADGES,
  createConfirmedTrailEvidence,
} from "../src/features/gameplay/passport";
import {
  reconcileTrailProgressWithEvidence,
} from "../src/features/gameplay/trails/evidence-adapter";
import { createTrailProgress } from "../src/features/gameplay/trails/model";

const player = "0x1111111111111111111111111111111111111111";
const trail: TrailDefinition = {
  id: "today-campus-trail",
  version: 1,
  seasonId: "demo-season-2026",
  title: "Today’s Campus Trail",
  description: "Three confirmed checkpoints.",
  checkpointMode: "ORDERED",
  checkpoints: [0, 1, 2].map((position) => ({
    id: `checkpoint-${position + 1}`,
    chestId: `chest-${position + 1}`,
    title: `Checkpoint ${position + 1}`,
  })),
  startsAt: "2026-01-01T00:00:00.000Z",
  endsAt: "2027-01-01T00:00:00.000Z",
  estimatedMinutes: 30,
  completionBadgeId: "TRAIL_COMPLETE",
  enabled: true,
};

describe("Passport deterministic badge engine", () => {
  it("declares the five initial badges with theme keys instead of asset URLs", () => {
    expect(PASSPORT_BADGES.map((badge) => badge.key)).toEqual([
      "FIRST_CHEST",
      "THREE_CHEST_TYPES",
      "TRAIL_COMPLETE",
      "FIVE_UNIQUE_H3",
      "QUEST_LEARNER",
    ]);
    for (const badge of PASSPORT_BADGES) {
      expect(badge.artworkKey).not.toMatch(/^https?:/);
    }
  });

  it("creates exactly one trail stamp and badge from confirmed progress, even on replay", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    let progress = createTrailProgress(
      trail.id,
      player,
      "2026-06-01T08:00:00.000Z",
    );
    let passport = createEmptyPassportState(player);
    const chestTypes = ["YIELD", "QUEST", "SPONSOR"];

    for (let index = 0; index < trail.checkpoints.length; index += 1) {
      const previousProgress = progress;
      const result = reconcileTrailProgressWithEvidence({
        trail,
        player,
        baseProgress: progress,
        evidenceItems: [
          {
            requestId: `request-${index + 1}`,
            checkpointId: trail.checkpoints[index].id,
            status: "CONFIRMED",
            occurredAt: `2026-06-01T08:0${index}:00.000Z`,
          },
        ],
      });
      progress = result.progress;
      const records = createConfirmedTrailEvidence({
        trail,
        previousProgress,
        nextProgress: progress,
        chestType: chestTypes[index],
      });
      passport = evaluatePassport({
        state: passport,
        evidence: records,
        seasonId: trail.seasonId,
      }).state;
    }

    const replay = evaluatePassport({
      state: passport,
      evidence: passport.evidence,
      seasonId: trail.seasonId,
    });

    expect(
      replay.state.badges.filter((badge) => badge.badgeId === "TRAIL_COMPLETE"),
    ).toHaveLength(1);
    expect(
      replay.state.stamps.filter((stamp) =>
        stamp.stampId.startsWith("badge-trail_complete"),
      ),
    ).toHaveLength(1);
    expect(getBadgeProgress(replay, "TRAIL_COMPLETE").status).toBe("EARNED");
    expect(replay.newBadges).toHaveLength(0);
    expect(replay.newStamps).toHaveLength(0);
  });
});

