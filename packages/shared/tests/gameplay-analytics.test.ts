import { describe, expect, it } from "vitest";
import {
  calculatePilotFunnel,
  detectForbiddenFields,
  pseudonymizeWallet,
  validateAnalyticsEvent,
  type CheckpointConfirmedProps,
  type GameplayAnalyticsEvent,
  type TrailCompletedProps,
} from "../src/gameplay/analytics";

describe("GE-07 Gameplay Analytics & Pilot Funnel Domain", () => {
  const dummyWallet = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const dummySeason = "demo-season-2026";
  const dummyTrail = "today-campus-trail";

  describe("Requirement 1: Schema Allowlist Fields", () => {
    it("validates all 11 canonical events with conformant allowlist properties", () => {
      const user = pseudonymizeWallet(dummyWallet);

      const validEvents: GameplayAnalyticsEvent[] = [
        {
          eventId: "e1",
          eventType: "season_viewed",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: user,
          properties: { seasonId: dummySeason, themeKey: "autumn" },
        },
        {
          eventId: "e2",
          eventType: "trail_started",
          timestamp: "2026-11-06T12:01:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointCount: 3,
            mode: "DEMO",
          },
        },
        {
          eventId: "e3",
          eventType: "checkpoint_viewed",
          timestamp: "2026-11-06T12:02:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            mode: "DEMO",
          },
        },
        {
          eventId: "e4",
          eventType: "checkpoint_submitted",
          timestamp: "2026-11-06T12:03:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            requestId: "0xreq123",
            mode: "DEMO",
          },
        },
        {
          eventId: "e5",
          eventType: "checkpoint_confirmed",
          timestamp: "2026-11-06T12:04:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            requestId: "0xreq123",
            elapsedMs: 3200,
            mode: "DEMO",
          },
        },
        {
          eventId: "e6",
          eventType: "trail_completed",
          timestamp: "2026-11-06T12:10:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            completedCheckpoints: 3,
            totalDurationSeconds: 600,
            mode: "DEMO",
          },
        },
        {
          eventId: "e7",
          eventType: "passport_viewed",
          timestamp: "2026-11-06T12:11:00.000Z",
          walletPseudonym: user,
          properties: { stampsCount: 3, badgesCount: 1 },
        },
        {
          eventId: "e8",
          eventType: "badge_earned",
          timestamp: "2026-11-06T12:12:00.000Z",
          walletPseudonym: user,
          properties: { badgeId: "campus-explorer-1" },
        },
        {
          eventId: "e9",
          eventType: "team_joined",
          timestamp: "2026-11-06T12:13:00.000Z",
          walletPseudonym: user,
          properties: { seasonId: dummySeason, teamId: "team-avalanche" },
        },
        {
          eventId: "e10",
          eventType: "perk_issued",
          timestamp: "2026-11-06T12:14:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            campaignId: "coffee-camp-1",
            perkId: "free-latte",
          },
        },
        {
          eventId: "e11",
          eventType: "perk_redeemed",
          timestamp: "2026-11-06T12:15:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            campaignId: "coffee-camp-1",
            perkId: "free-latte",
          },
        },
      ];

      for (const ev of validEvents) {
        const validation = validateAnalyticsEvent(ev);
        expect(validation.valid).toBe(true);
      }
    });

    it("rejects unknown properties not defined in strict allowlist schemas", () => {
      const user = pseudonymizeWallet(dummyWallet);

      const rogueEvent = {
        eventId: "e-rogue",
        eventType: "trail_started" as const,
        timestamp: "2026-11-06T12:00:00.000Z",
        walletPseudonym: user,
        properties: {
          seasonId: dummySeason,
          trailId: dummyTrail,
          checkpointCount: 3,
          mode: "DEMO" as const,
          unauthorizedTrackingField: "injected-payload",
        },
      };

      const validation = validateAnalyticsEvent(rogueEvent as any);
      expect(validation.valid).toBe(false);
      expect(validation.errors?.[0]).toContain("Unrecognized key");
    });
  });

  describe("Requirement 2: Privacy Scanner & Negative Tests for Forbidden Fields", () => {
    it("detects and flags all forbidden keys (raw lat/lng, accuracy, email, QR secret, private keys)", () => {
      const forbiddenSamples = [
        { lat: 10.7769 },
        { lng: 106.7009 },
        { latitude: 10.7769 },
        { longitude: 106.7009 },
        { accuracy: 5.0 },
        { gpsLocation: "HCMC" },
        { radiusMeters: 50 },
        { userEmail: "pilot@avalanche.org" },
        { email: "test@domain.com" },
        { qrPayload: "sponsor-secret-payload" },
        { qrCode: "data" },
        { secret: "signer-secret" },
        { privateKey: "0x12345..." },
        { signature: "0xsig..." },
        { password: "pass" },
        { otpCode: "123456" },
        { seedPhrase: "word1 word2 ..." },
        { mnemonic: "twelve words ..." },
      ];

      for (const sample of forbiddenSamples) {
        const violations = detectForbiddenFields(sample);
        expect(violations.length).toBeGreaterThan(0);
      }
    });

    it("validateAnalyticsEvent strictly rejects any event containing forbidden fields", () => {
      const user = pseudonymizeWallet(dummyWallet);

      const eventWithGps: GameplayAnalyticsEvent = {
        eventId: "e-leak",
        eventType: "checkpoint_viewed",
        timestamp: "2026-11-06T12:00:00.000Z",
        walletPseudonym: user,
        properties: {
          seasonId: dummySeason,
          trailId: dummyTrail,
          checkpointId: "cp-1",
          position: 0,
          mode: "DEMO",
          // Forbidden injection
          latitude: 10.77,
        } as any,
      };

      const validation = validateAnalyticsEvent(eventWithGps);
      expect(validation.valid).toBe(false);
      expect(validation.errors?.some((e) => e.includes("Forbidden"))).toBe(
        true,
      );
    });
  });

  describe("Requirement 3: Wallet Pseudonymization", () => {
    it("converts wallet addresses into deterministic pseudonym without leaking raw address", () => {
      const pseudo1 = pseudonymizeWallet(dummyWallet);
      const pseudo2 = pseudonymizeWallet(dummyWallet.toUpperCase());

      expect(pseudo1).toBe(pseudo2);
      expect(pseudo1).toMatch(/^w_anon_[a-f0-9]{16}$/);
      expect(pseudo1).not.toContain(dummyWallet.slice(2, 10));

      const emptyPseudo = pseudonymizeWallet(null);
      expect(emptyPseudo).toBe("w_guest_anon");
    });
  });

  describe("Requirement 4: Funnel Calculation Engine", () => {
    it("calculates start -> first checkpoint -> trail complete conversion rates and dropoffs", () => {
      const userA = pseudonymizeWallet("0x1111111111111111111111111111111111111111");
      const userB = pseudonymizeWallet("0x2222222222222222222222222222222222222222");
      const userC = pseudonymizeWallet("0x3333333333333333333333333333333333333333");
      const userD = pseudonymizeWallet("0x4444444444444444444444444444444444444444");

      const events: GameplayAnalyticsEvent[] = [
        // 4 users view season
        {
          eventId: "1",
          eventType: "season_viewed",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: userA,
          properties: { seasonId: dummySeason },
        },
        {
          eventId: "2",
          eventType: "season_viewed",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: userB,
          properties: { seasonId: dummySeason },
        },
        {
          eventId: "3",
          eventType: "season_viewed",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: userC,
          properties: { seasonId: dummySeason },
        },
        {
          eventId: "4",
          eventType: "season_viewed",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: userD,
          properties: { seasonId: dummySeason },
        },

        // 3 users start trail (A, B, C)
        {
          eventId: "5",
          eventType: "trail_started",
          timestamp: "2026-11-06T12:01:00.000Z",
          walletPseudonym: userA,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointCount: 3,
            mode: "DEMO",
          },
        },
        {
          eventId: "6",
          eventType: "trail_started",
          timestamp: "2026-11-06T12:01:00.000Z",
          walletPseudonym: userB,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointCount: 3,
            mode: "DEMO",
          },
        },
        {
          eventId: "7",
          eventType: "trail_started",
          timestamp: "2026-11-06T12:01:00.000Z",
          walletPseudonym: userC,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointCount: 3,
            mode: "DEMO",
          },
        },

        // 2 users confirm first checkpoint (A, B)
        {
          eventId: "8",
          eventType: "checkpoint_confirmed",
          timestamp: "2026-11-06T12:03:00.000Z",
          walletPseudonym: userA,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            requestId: "req-A-1",
            mode: "DEMO",
          },
        },
        {
          eventId: "9",
          eventType: "checkpoint_confirmed",
          timestamp: "2026-11-06T12:03:00.000Z",
          walletPseudonym: userB,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointId: "cp-1",
            position: 0,
            requestId: "req-B-1",
            mode: "DEMO",
          },
        },

        // 1 user completes trail (A)
        {
          eventId: "10",
          eventType: "trail_completed",
          timestamp: "2026-11-06T12:08:00.000Z",
          walletPseudonym: userA,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            completedCheckpoints: 3,
            mode: "DEMO",
          },
        },
      ];

      const funnel = calculatePilotFunnel(events);

      expect(funnel.uniqueUsers.seasonViewed).toBe(4);
      expect(funnel.uniqueUsers.trailStarted).toBe(3);
      expect(funnel.uniqueUsers.firstCheckpointConfirmed).toBe(2);
      expect(funnel.uniqueUsers.trailCompleted).toBe(1);

      // Conversion rates:
      // Season -> Start: 3 / 4 = 75.0%
      expect(funnel.conversionRates.seasonToStartPct).toBe(75.0);
      // Start -> First CP: 2 / 3 = 66.7%
      expect(funnel.conversionRates.startToFirstCheckpointPct).toBe(66.7);
      // First CP -> Complete: 1 / 2 = 50.0%
      expect(funnel.conversionRates.firstCheckpointToCompletePct).toBe(50.0);
      // Start -> Complete: 1 / 3 = 33.3%
      expect(funnel.conversionRates.startToCompletePct).toBe(33.3);

      // Dropoffs:
      expect(funnel.dropoffs.viewToStart).toBe(1); // 4 - 3
      expect(funnel.dropoffs.startToFirstCheckpoint).toBe(1); // 3 - 2
      expect(funnel.dropoffs.firstCheckpointToComplete).toBe(1); // 2 - 1

      // North Star:
      expect(funnel.northStar.weeklyVerifiedFinishers).toBe(1);
    });

    it("does not count duplicate trail completions twice in economic success metrics", () => {
      const user = pseudonymizeWallet(dummyWallet);

      const events: GameplayAnalyticsEvent[] = [
        {
          eventId: "e-start",
          eventType: "trail_started",
          timestamp: "2026-11-06T12:00:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            checkpointCount: 3,
            mode: "DEMO",
          },
        },
        {
          eventId: "e-complete-1",
          eventType: "trail_completed",
          timestamp: "2026-11-06T12:05:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            completedCheckpoints: 3,
            mode: "DEMO",
          },
        },
        // Duplicate replay
        {
          eventId: "e-complete-2",
          eventType: "trail_completed",
          timestamp: "2026-11-06T12:06:00.000Z",
          walletPseudonym: user,
          properties: {
            seasonId: dummySeason,
            trailId: dummyTrail,
            completedCheckpoints: 3,
            mode: "DEMO",
            isDuplicate: true,
          },
        },
      ];

      const funnel = calculatePilotFunnel(events);
      expect(funnel.counts.trailCompleted).toBe(1);
      expect(funnel.uniqueUsers.trailCompleted).toBe(1);
      expect(funnel.northStar.weeklyVerifiedFinishers).toBe(1);
    });
  });
});
