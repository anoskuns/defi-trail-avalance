import { describe, expect, it } from "vitest";
import {
  appendTeamScoreEvent,
  calculateTeamScore,
  createTeamScoreEvent,
  createTeamScoreEventIdentity,
  type GameplayEvidenceEvent,
} from "../src";

const baseEvidence: GameplayEvidenceEvent = {
  eventId: "event-1",
  eventType: "CHEST_CONFIRMED",
  player: "0x1111111111111111111111111111111111111111",
  seasonId: "season-1",
  trailId: "trail-1",
  checkpointId: "checkpoint-1",
  requestId: "request-1",
  occurredAt: "2026-01-03T00:00:00.000Z",
  mode: "GPS",
};

describe("gameplay team scoring", () => {
  it("derives a stable identity from requestId so retries cannot score twice", () => {
    const firstIdentity = createTeamScoreEventIdentity({
      teamId: "team-a",
      seasonId: "season-1",
      reason: "CHECKPOINT_CONFIRMED",
      evidence: baseEvidence,
    });
    const retryIdentity = createTeamScoreEventIdentity({
      teamId: "team-a",
      seasonId: "season-1",
      reason: "CHECKPOINT_CONFIRMED",
      evidence: { ...baseEvidence, eventId: "event-retry" },
    });
    expect(retryIdentity).toBe(firstIdentity);
  });

  it("deduplicates score events and only sums integer points", () => {
    const first = createTeamScoreEvent({
      teamId: "team-a",
      seasonId: "season-1",
      reason: "CHECKPOINT_CONFIRMED",
      points: 10,
      evidence: baseEvidence,
    });
    const retry = createTeamScoreEvent({
      teamId: "team-a",
      seasonId: "season-1",
      reason: "CHECKPOINT_CONFIRMED",
      points: 10,
      evidence: { ...baseEvidence, eventId: "event-retry" },
    });
    expect(first).not.toBeNull();
    expect(retry).not.toBeNull();

    const once = appendTeamScoreEvent([], first!);
    const deduplicated = appendTeamScoreEvent(once, retry!);
    expect(deduplicated).toHaveLength(1);
    expect(calculateTeamScore(deduplicated)).toBe(10);
    expect(() =>
      createTeamScoreEvent({
        teamId: "team-a",
        seasonId: "season-1",
        reason: "CHECKPOINT_CONFIRMED",
        points: 1.5,
        evidence: baseEvidence,
      }),
    ).toThrow("positive safe integer");
  });

  it("excludes demo evidence by default but allows an explicit policy", () => {
    const demoEvidence = { ...baseEvidence, mode: "DEMO" as const };
    expect(
      createTeamScoreEvent({
        teamId: "team-a",
        seasonId: "season-1",
        reason: "CHECKPOINT_CONFIRMED",
        points: 10,
        evidence: demoEvidence,
      }),
    ).toBeNull();
    expect(
      createTeamScoreEvent({
        teamId: "team-a",
        seasonId: "season-1",
        reason: "CHECKPOINT_CONFIRMED",
        points: 10,
        evidence: demoEvidence,
        demoModePolicy: () => "ALLOW",
      }),
    ).not.toBeNull();
  });

  it("rejects a score reason that does not match the evidence type", () => {
    expect(
      createTeamScoreEvent({
        teamId: "team-a",
        seasonId: "season-1",
        reason: "TRAIL_COMPLETED",
        points: 10,
        evidence: baseEvidence,
      }),
    ).toBeNull();
  });
});
