import { describe, expect, it } from "vitest";
import {
  gameplayEvidenceEventSchema,
  seasonDefinitionSchema,
  trailDefinitionSchema,
  type SeasonDefinition,
  type TrailDefinition,
} from "../src";

const validTrail: TrailDefinition = {
  id: "trail-1",
  version: 1,
  seasonId: "season-1",
  title: "First Steps",
  description: "Complete the pilot trail.",
  checkpointMode: "ORDERED",
  checkpoints: [
    { id: "checkpoint-1", chestId: "chest-1", title: "Start" },
    { id: "checkpoint-2", chestId: "chest-2", title: "Finish" },
  ],
  startsAt: "2026-01-01T00:00:00.000Z",
  endsAt: "2026-02-01T00:00:00.000Z",
  estimatedMinutes: 30,
  enabled: true,
};

describe("gameplay canonical schemas", () => {
  it("is available through the package public export", () => {
    expect(trailDefinitionSchema.parse(validTrail)).toEqual(validTrail);
  });

  it("rejects invalid or ambiguous trail configuration", () => {
    expect(
      trailDefinitionSchema.safeParse({
        ...validTrail,
        checkpoints: [validTrail.checkpoints[0]],
      }).success,
    ).toBe(false);

    expect(
      trailDefinitionSchema.safeParse({
        ...validTrail,
        checkpoints: [
          validTrail.checkpoints[0],
          { ...validTrail.checkpoints[0] },
        ],
      }).success,
    ).toBe(false);

    expect(
      trailDefinitionSchema.safeParse({
        ...validTrail,
        startsAt: validTrail.endsAt,
      }).success,
    ).toBe(false);
  });

  it("requires a versioned season with unique pilot teams", () => {
    const season: SeasonDefinition = {
      id: "season-1",
      version: 1,
      name: "Pilot Season",
      startsAt: "2026-01-01T00:00:00.000Z",
      endsAt: "2026-02-01T00:00:00.000Z",
      themeKey: "pilot",
      teamIds: ["team-a", "team-b", "team-c"],
      trailIds: ["trail-1"],
      badgeIds: ["badge-1"],
      perkCampaignIds: [],
      status: "SCHEDULED",
    };

    expect(seasonDefinitionSchema.parse(season)).toEqual(season);
    expect(
      seasonDefinitionSchema.safeParse({
        ...season,
        teamIds: ["team-a", "team-a", "team-c"],
      }).success,
    ).toBe(false);
  });

  it("rejects ambiguous evidence and privacy-sensitive extra fields", () => {
    const baseEvidence = {
      eventId: "event-1",
      eventType: "CHEST_CONFIRMED" as const,
      player: "0x1111111111111111111111111111111111111111",
      seasonId: "season-1",
      occurredAt: "2026-01-02T00:00:00.000Z",
      mode: "GPS" as const,
    };

    expect(
      gameplayEvidenceEventSchema.safeParse({
        ...baseEvidence,
        checkpointId: "checkpoint-1",
      }).success,
    ).toBe(false);
    expect(
      gameplayEvidenceEventSchema.safeParse({
        ...baseEvidence,
        txHash: `0x${"1".repeat(64)}`,
      }).success,
    ).toBe(false);
    expect(
      gameplayEvidenceEventSchema.safeParse({
        ...baseEvidence,
        latitude: 10.75,
        longitude: 106.67,
      }).success,
    ).toBe(false);
  });
});

