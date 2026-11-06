import { describe, expect, it } from "vitest";
import {
  applyCheckpointEvidence,
  createEarnedBadge,
  createPerkClaim,
  evaluatePerkEligibility,
  isBadgeEligible,
  isPerkClaimExpired,
  validateActiveWindow,
  type BadgeRule,
  type GameplayEvidenceEvent,
  type PerkCampaign,
  type TrailDefinition,
  type TrailProgress,
} from "../src";

const player = "0x1111111111111111111111111111111111111111";

function makeTrail(checkpointMode: "ORDERED" | "ANY_ORDER"): TrailDefinition {
  return {
    id: "trail-1",
    version: 1,
    seasonId: "season-1",
    title: "First Steps",
    description: "Three confirmed checkpoints.",
    checkpointMode,
    checkpoints: [
      { id: "checkpoint-1", chestId: "chest-1", title: "One" },
      { id: "checkpoint-2", chestId: "chest-2", title: "Two" },
      { id: "checkpoint-3", chestId: "chest-3", title: "Three" },
    ],
    startsAt: "2026-01-01T00:00:00.000Z",
    endsAt: "2026-02-01T00:00:00.000Z",
    estimatedMinutes: 30,
    enabled: true,
  };
}

function makeProgress(): TrailProgress {
  return {
    trailId: "trail-1",
    player,
    startedAt: "2026-01-02T00:00:00.000Z",
    completedCheckpoints: [],
  };
}

function makeEvidence(
  checkpointId: string,
  eventId: string,
  requestId: string,
  mode: "GPS" | "DEMO" = "GPS",
): GameplayEvidenceEvent {
  return {
    eventId,
    eventType: "CHEST_CONFIRMED",
    player,
    seasonId: "season-1",
    trailId: "trail-1",
    checkpointId,
    requestId,
    occurredAt: "2026-01-03T00:00:00.000Z",
    mode,
  };
}

describe("gameplay pure rules", () => {
  it("uses start-inclusive and end-exclusive active windows", () => {
    const window = {
      startsAt: "2026-01-01T00:00:00.000Z",
      endsAt: "2026-02-01T00:00:00.000Z",
    };
    expect(validateActiveWindow(window, window.startsAt)).toBe(true);
    expect(validateActiveWindow(window, "2026-01-31T23:59:59.999Z")).toBe(true);
    expect(validateActiveWindow(window, window.endsAt)).toBe(false);
  });

  it("enforces ordered completion and ignores duplicate evidence", () => {
    const trail = makeTrail("ORDERED");
    const empty = makeProgress();

    expect(
      applyCheckpointEvidence(
        trail,
        empty,
        makeEvidence("checkpoint-2", "event-2", "request-2"),
      ).status,
    ).toBe("OUT_OF_ORDER");

    const first = applyCheckpointEvidence(
      trail,
      empty,
      makeEvidence("checkpoint-1", "event-1", "request-1"),
    );
    expect(first.status).toBe("APPLIED");
    expect(empty.completedCheckpoints).toHaveLength(0);

    expect(
      applyCheckpointEvidence(
        trail,
        first.progress,
        makeEvidence("checkpoint-1", "event-1", "request-1"),
      ).status,
    ).toBe("DUPLICATE");
    expect(
      applyCheckpointEvidence(
        trail,
        first.progress,
        makeEvidence("checkpoint-2", "event-retry", "request-1"),
      ).status,
    ).toBe("DUPLICATE");

    const second = applyCheckpointEvidence(
      trail,
      first.progress,
      makeEvidence("checkpoint-2", "event-2", "request-2"),
    );
    const third = applyCheckpointEvidence(
      trail,
      second.progress,
      makeEvidence("checkpoint-3", "event-3", "request-3"),
    );
    expect(third.status).toBe("COMPLETED");
    expect(third.progress.completedCheckpoints).toHaveLength(3);
    expect(third.progress.completedAt).toBe("2026-01-03T00:00:00.000Z");
  });

  it("allows any-order trails and exposes a demo-mode policy hook", () => {
    const trail = makeTrail("ANY_ORDER");
    const evidence = makeEvidence(
      "checkpoint-3",
      "event-demo",
      "request-demo",
      "DEMO",
    );

    expect(applyCheckpointEvidence(trail, makeProgress(), evidence).status).toBe(
      "APPLIED",
    );
    expect(
      applyCheckpointEvidence(trail, makeProgress(), evidence, () => "DENY")
        .status,
    ).toBe("DEMO_REJECTED");
  });

  it("evaluates badge thresholds deterministically by unique request identity", () => {
    const rule: BadgeRule = {
      badgeId: "badge-first-two",
      ruleVersion: 1,
      eventType: "CHEST_CONFIRMED",
      threshold: 2,
      window: "SEASON",
    };
    const duplicateRetry = [
      makeEvidence("checkpoint-1", "event-1", "request-1"),
      makeEvidence("checkpoint-1", "event-retry", "request-1"),
    ];
    const context = { player, seasonId: "season-1" };
    expect(isBadgeEligible(rule, duplicateRetry, context)).toBe(false);

    const events = [
      ...duplicateRetry,
      makeEvidence("checkpoint-2", "event-2", "request-2"),
    ];
    expect(isBadgeEligible(rule, events, context)).toBe(true);
    expect(
      createEarnedBadge(
        rule,
        events,
        context,
        "2026-01-04T00:00:00.000Z",
      )?.evidenceRefs,
    ).toEqual(["event-1", "event-2"]);
  });

  it("enforces one perk claim per player/campaign and expiry", () => {
    const campaign: PerkCampaign = {
      id: "campaign-1",
      version: 1,
      seasonId: "season-1",
      sponsorName: "Pilot Sponsor",
      title: "Free Topping",
      description: "One off-chain perk.",
      eligibleEventTypes: ["TRAIL_COMPLETED"],
      startsAt: "2026-01-01T00:00:00.000Z",
      endsAt: "2026-02-01T00:00:00.000Z",
      claimTtlSeconds: 3_600,
      maxClaimsPerPlayer: 1,
      enabled: true,
    };
    const evidence: GameplayEvidenceEvent = {
      eventId: "event-trail",
      eventType: "TRAIL_COMPLETED",
      player,
      seasonId: "season-1",
      trailId: "trail-1",
      occurredAt: "2026-01-03T00:00:00.000Z",
      mode: "GPS",
    };

    expect(
      evaluatePerkEligibility({
        campaign,
        event: evidence,
        existingClaims: [],
        at: "2026-01-03T00:00:00.000Z",
      }).reason,
    ).toBe("ELIGIBLE");

    const claim = createPerkClaim({
      claimId: "claim-1",
      campaign,
      event: evidence,
      issuedAt: "2026-01-03T00:00:00.000Z",
    });
    expect(isPerkClaimExpired(claim, "2026-01-03T00:59:59.999Z")).toBe(
      false,
    );
    expect(isPerkClaimExpired(claim, claim.expiresAt)).toBe(true);
    expect(
      evaluatePerkEligibility({
        campaign,
        event: evidence,
        existingClaims: [claim],
        at: "2026-01-03T00:30:00.000Z",
      }).reason,
    ).toBe("ALREADY_CLAIMED");
  });
});

