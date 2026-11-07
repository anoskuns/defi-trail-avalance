import { beforeEach, describe, expect, it } from "vitest";
import {
  detectForbiddenFields,
  FORBIDDEN_ANALYTICS_KEY_REGEX,
  pseudonymizeWallet,
} from "@defi-trail/shared";
import {
  GameplayTracker,
  getGameplayTracker,
  globalMemoryAnalyticsSink,
  MemoryAnalyticsSink,
  type AnalyticsSink,
} from "@/features/analytics";
import { GET as getAdminAnalytics } from "@/app/api/admin/analytics/route";

describe("GE-07 Gameplay Funnel Analytics & Privacy (Playbook §14)", () => {
  const dummyWallet1 = "0x1111111111111111111111111111111111111111";
  const dummyWallet2 = "0x2222222222222222222222222222222222222222";
  const dummyWallet3 = "0x3333333333333333333333333333333333333333";
  const dummySeason = "demo-season-2026";
  const dummyTrail = "today-campus-trail";

  beforeEach(() => {
    globalMemoryAnalyticsSink.clear();
    getGameplayTracker().resetCompletedTrails();
  });

  // =========================================================================
  // Done When 1: Funnel tính được start -> first checkpoint -> trail complete
  // =========================================================================
  describe("Done When 1: Funnel Calculation (start -> first checkpoint -> trail complete)", () => {
    it("accurately computes conversion rates and dropoffs across funnel stages", async () => {
      const sink = new MemoryAnalyticsSink();
      const tracker = new GameplayTracker({ sink });

      // User 1: Views season -> Starts trail -> First CP -> Trail Complete
      tracker.trackSeasonViewed({ seasonId: dummySeason }, dummyWallet1);
      tracker.trackTrailStarted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackCheckpointConfirmed(
        {
          seasonId: dummySeason,
          trailId: dummyTrail,
          checkpointId: "cp-1",
          position: 0,
          requestId: "0xreq1",
          mode: "DEMO",
        },
        dummyWallet1,
      );
      tracker.trackTrailCompleted(
        { seasonId: dummySeason, trailId: dummyTrail, completedCheckpoints: 3, mode: "DEMO" },
        dummyWallet1,
      );

      // User 2: Views season -> Starts trail -> First CP -> Drops off before completion
      tracker.trackSeasonViewed({ seasonId: dummySeason }, dummyWallet2);
      tracker.trackTrailStarted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
        dummyWallet2,
      );
      tracker.trackCheckpointConfirmed(
        {
          seasonId: dummySeason,
          trailId: dummyTrail,
          checkpointId: "cp-1",
          position: 0,
          requestId: "0xreq2",
          mode: "DEMO",
        },
        dummyWallet2,
      );

      // User 3: Views season -> Starts trail -> Drops off before first CP
      tracker.trackSeasonViewed({ seasonId: dummySeason }, dummyWallet3);
      tracker.trackTrailStarted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
        dummyWallet3,
      );

      // Total 3 started, 2 first checkpoint confirmed, 1 completed
      const events = sink.getEvents();
      expect(events).toHaveLength(9);

      // Query admin analytics endpoint
      // Seed global sink with these events for the route check
      for (const ev of events) {
        globalMemoryAnalyticsSink.emit(ev);
      }

      const res = await getAdminAnalytics();
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.funnel.stages.seasonViewed).toBe(3);
      expect(data.funnel.stages.trailStarted).toBe(3);
      expect(data.funnel.stages.firstCheckpointConfirmed).toBe(2);
      expect(data.funnel.stages.trailCompleted).toBe(1);

      // Conversion rates:
      // Start -> First CP: 2 / 3 = 66.7%
      expect(data.funnel.conversionRates.startToFirstCheckpointPct).toBe(66.7);
      // First CP -> Complete: 1 / 2 = 50.0%
      expect(data.funnel.conversionRates.firstCheckpointToCompletePct).toBe(50.0);
      // Start -> Complete: 1 / 3 = 33.3%
      expect(data.funnel.conversionRates.startToCompletePct).toBe(33.3);

      // Dropoffs:
      expect(data.funnel.dropoffs.startToFirstCheckpoint).toBe(1);
      expect(data.funnel.dropoffs.firstCheckpointToComplete).toBe(1);

      // North Star metric:
      expect(data.northStar.weeklyVerifiedFinishers).toBe(1);
      expect(data.northStar.totalCompletions).toBe(1);
    });

    it("does not count duplicate trail completion twice in economic success metrics", () => {
      const sink = new MemoryAnalyticsSink();
      const tracker = new GameplayTracker({ sink });

      tracker.trackTrailStarted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
        dummyWallet1,
      );

      // First legitimate completion
      const firstSuccess = tracker.trackTrailCompleted(
        { seasonId: dummySeason, trailId: dummyTrail, completedCheckpoints: 3, mode: "DEMO" },
        dummyWallet1,
      );
      expect(firstSuccess).toBe(true);

      // Duplicate completion (replay / second call)
      const secondSuccess = tracker.trackTrailCompleted(
        { seasonId: dummySeason, trailId: dummyTrail, completedCheckpoints: 3, mode: "DEMO" },
        dummyWallet1,
      );
      expect(secondSuccess).toBe(true);

      const completedEvents = sink.getEventsByType("trail_completed");
      expect(completedEvents).toHaveLength(2);
      expect((completedEvents[0]!.properties as any).isDuplicate).toBeUndefined();
      expect((completedEvents[1]!.properties as any).isDuplicate).toBe(true);
    });
  });

  // =========================================================================
  // Done When 2: Forbidden Field Tests Pass (Privacy Scanner)
  // =========================================================================
  describe("Done When 2: Forbidden Field Negative Tests & Payload Scanner", () => {
    it("detects and rejects any attempt to inject forbidden GPS, QR secret, or private keys", () => {
      const sink = new MemoryAnalyticsSink();
      const tracker = new GameplayTracker({ sink });

      const forbiddenInjections = [
        { latitude: 10.7769 },
        { longitude: 106.7009 },
        { lat: 10.77, lng: 106.7 },
        { accuracy: 12.5 },
        { gps_coordinates: [10.77, 106.7] },
        { userEmail: "player@avax.network" },
        { email: "player@avax.network" },
        { qrPayload: "sponsorkey_12345" },
        { secret: "super_secret_seed" },
        { privateKey: "0xabcdef1234567890" },
        { signature: "0x3f...12" },
        { password: "userpass123" },
        { otp: "123456" },
        { seed: "twelve secret words" },
        { mnemonic: "twelve secret words" },
      ];

      for (const injection of forbiddenInjections) {
        expect(detectForbiddenFields(injection).length).toBeGreaterThan(0);

        // Attempting to track with these properties must fail validation and NOT be emitted to sink
        const success = tracker.track(
          "checkpoint_viewed",
          {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            mode: "DEMO",
            ...injection,
          } as any,
          dummyWallet1,
        );

        expect(success).toBe(false);
      }

      // No forbidden events entered the sink
      expect(sink.getEvents()).toHaveLength(0);
      expect(sink.getErrors().length).toBe(forbiddenInjections.length);
    });

    it("verifies 100% of emitted events in sink are free from any forbidden keys", () => {
      const sink = new MemoryAnalyticsSink();
      const tracker = new GameplayTracker({ sink });

      // Emit various canonical events
      tracker.trackSeasonViewed({ seasonId: dummySeason }, dummyWallet1);
      tracker.trackTrailStarted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackCheckpointViewed(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointId: "cp-1", position: 0, mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackCheckpointSubmitted(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointId: "cp-1", position: 0, requestId: "0xreq1", mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackCheckpointConfirmed(
        { seasonId: dummySeason, trailId: dummyTrail, checkpointId: "cp-1", position: 0, requestId: "0xreq1", mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackTrailCompleted(
        { seasonId: dummySeason, trailId: dummyTrail, completedCheckpoints: 3, mode: "DEMO" },
        dummyWallet1,
      );
      tracker.trackPassportViewed({ stampsCount: 3 }, dummyWallet1);
      tracker.trackBadgeEarned({ badgeId: "b-1" }, dummyWallet1);
      tracker.trackTeamJoined({ seasonId: dummySeason, teamId: "t-1" }, dummyWallet1);
      tracker.trackPerkIssued({ seasonId: dummySeason, campaignId: "c-1", perkId: "p-1" }, dummyWallet1);
      tracker.trackPerkRedeemed({ seasonId: dummySeason, campaignId: "c-1", perkId: "p-1" }, dummyWallet1);

      const allEvents = sink.getEvents();
      expect(allEvents.length).toBe(11);

      // Deep scan each emitted event
      for (const ev of allEvents) {
        const violations = detectForbiddenFields(ev);
        expect(violations).toHaveLength(0);

        // Ensure wallet address is pseudonymized and not in raw hex format
        expect(ev.walletPseudonym).toMatch(/^w_anon_[a-f0-9]{16}$/);
        expect(ev.walletPseudonym).not.toBe(dummyWallet1);

        // requestId is ONLY present on reconciliation events
        if (ev.eventType !== "checkpoint_submitted" && ev.eventType !== "checkpoint_confirmed") {
          expect((ev.properties as any).requestId).toBeUndefined();
        }
      }
    });

    it("ensures admin dashboard response contains ZERO raw GPS, secrets, or raw addresses", async () => {
      const res = await getAdminAnalytics();
      expect(res.status).toBe(200);
      const json = await res.json();
      const stringified = JSON.stringify(json);

      expect(detectForbiddenFields(json)).toHaveLength(0);
      expect(stringified).not.toContain(dummyWallet1);
      expect(json.privacyAudit.zeroLocationData).toBe(true);
      expect(json.privacyAudit.zeroPrivateMaterial).toBe(true);
      expect(json.privacyAudit.pseudonymizedWalletsOnly).toBe(true);
    });
  });

  // =========================================================================
  // Done When 3: Analytics Failure Không Chặn Gameplay
  // =========================================================================
  describe("Done When 3: Non-Blocking Execution (Analytics Failure Never Halts Gameplay)", () => {
    it("gracefully catches and suppresses errors when sink throws or rejects", () => {
      // Simulate broken sink that throws upon emit
      const explodingSink: AnalyticsSink = {
        name: "exploding-sink",
        emit: () => {
          throw new Error("Disk full or network unreachable");
        },
        recordError: () => {},
      };

      const tracker = new GameplayTracker({ sink: explodingSink });

      // Calling tracking methods must NOT throw or crash
      expect(() => {
        const res = tracker.trackSeasonViewed({ seasonId: dummySeason }, dummyWallet1);
        expect(res).toBe(false); // Returns false safely
      }).not.toThrow();

      expect(() => {
        const res = tracker.trackTrailStarted(
          { seasonId: dummySeason, trailId: dummyTrail, checkpointCount: 3, mode: "DEMO" },
          dummyWallet1,
        );
        expect(res).toBe(false);
      }).not.toThrow();

      expect(() => {
        const res = tracker.trackCheckpointConfirmed(
          { seasonId: dummySeason, trailId: dummyTrail, checkpointId: "cp-1", position: 0, requestId: "0x1", mode: "DEMO" },
          dummyWallet1,
        );
        expect(res).toBe(false);
      }).not.toThrow();
    });

    it("suppresses malformed parameter errors without throwing into caller stack", () => {
      const tracker = new GameplayTracker({ sink: new MemoryAnalyticsSink() });

      expect(() => {
        // Pass completely invalid payload
        const res = tracker.track("trail_started", null as any, dummyWallet1);
        expect(res).toBe(false);
      }).not.toThrow();
    });
  });
});
