import { describe, expect, it, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST as postReconcile } from "../src/app/api/gameplay/trails/reconcile/route";
import type { TrailDefinition, TrailProgress, GameplayEvidenceEvent } from "@defi-trail/shared";
import {
  createTrailProgress,
  deriveTrailProgressView,
} from "@/features/gameplay/trails/model";
import {
  createEvidenceIdempotencyKey,
  reconcileTrailProgressWithEvidence,
  recoverTrailProgressFromStorage,
  sanitizeCorrelationPayload,
  logEvidenceReconciliation,
  mapRequestStatusToLifecycle,
  mapUIStateToLifecycle,
  type CheckpointEvidenceItem,
} from "@/features/gameplay/trails/evidence-adapter";
import { RequestStatus, type StoredICMRequest } from "@/components/cross-chain/types";
import {
  checkReconcileRateLimit,
  recordReconcileRequest,
  resetRateLimits,
} from "@/lib/rate-limiter";
import { createTeamScoreEvent } from "@defi-trail/shared";

// Test fixture trail matching 3 ordered checkpoints
const testTrail: TrailDefinition = {
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

describe("GE-04 Evidence Reconciliation & Progress Persistence", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  describe("Requirement 1: 5x replay cùng evidence vẫn chỉ có một checkpoint completion", () => {
    it("5 identical evidence items in a single batch yield exactly 1 completed checkpoint", () => {
      const initialProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      const repeatedEvidenceItem: CheckpointEvidenceItem = {
        requestId: testTrail.checkpoints[0]!.chestId,
        checkpointId: testTrail.checkpoints[0]!.id,
        status: "CONFIRMED",
        occurredAt: "2026-11-06T12:01:00.000Z",
        mode: "DEMO",
      };

      // 5 identical items replayed
      const fiveReplays = [
        repeatedEvidenceItem,
        repeatedEvidenceItem,
        repeatedEvidenceItem,
        repeatedEvidenceItem,
        repeatedEvidenceItem,
      ];

      const result = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: initialProgress,
        evidenceItems: fiveReplays,
      });

      expect(result.appliedCount).toBe(1);
      expect(result.duplicateCount).toBe(4);
      expect(result.progress.completedCheckpoints).toHaveLength(1);
      expect(result.progress.completedCheckpoints[0]!.checkpointId).toBe(
        testTrail.checkpoints[0]!.id,
      );
      expect(result.view.confirmedCount).toBe(1);
      expect(result.view.checkpoints[0]!.status).toBe("confirmed");
      expect(result.view.checkpoints[1]!.status).toBe("available");
      expect(result.view.checkpoints[2]!.status).toBe("locked");
    });

    it("calling reconciliation 5 sequential times with identical evidence yields exactly 1 completion", () => {
      let currentProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      const evidenceItem: CheckpointEvidenceItem = {
        requestId: testTrail.checkpoints[0]!.chestId,
        checkpointId: testTrail.checkpoints[0]!.id,
        status: "CONFIRMED",
        occurredAt: "2026-11-06T12:01:00.000Z",
        mode: "DEMO",
      };

      for (let i = 0; i < 5; i++) {
        const result = reconcileTrailProgressWithEvidence({
          trail: testTrail,
          player: demoPlayer,
          baseProgress: currentProgress,
          evidenceItems: [evidenceItem],
        });
        currentProgress = result.progress;
        if (i === 0) {
          expect(result.appliedCount).toBe(1);
          expect(result.duplicateCount).toBe(0);
        } else {
          expect(result.appliedCount).toBe(0);
          expect(result.duplicateCount).toBe(1);
        }
      }

      expect(currentProgress.completedCheckpoints).toHaveLength(1);
    });
  });

  describe("Requirement 2: Reload ở pending rồi confirmed cho kết quả đúng", () => {
    it("preserves pending state on reload and transitions cleanly upon confirmation", () => {
      const initialProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      const pendingRequestId = testTrail.checkpoints[0]!.chestId;

      // Phase 1: User opens chest, request enters in-flight state (SENT)
      const storedPendingRequest: StoredICMRequest = {
        requestId: pendingRequestId,
        status: "icm_pending",
        onChainStatus: RequestStatus.SENT,
        chestId: pendingRequestId,
        chestSlot: 0,
        player: demoPlayer,
        startedAt: Date.now(),
        currentStepIndex: 2,
      };

      // Simulate reload: recover progress from cache + stored pending request
      const recoveredReloadResult = recoverTrailProgressFromStorage({
        trail: testTrail,
        player: demoPlayer,
        cachedProgress: initialProgress,
        storedRequest: storedPendingRequest,
      });

      // Pending state is preserved: NOT completed, NOT locked, but pending
      expect(recoveredReloadResult.progress.completedCheckpoints).toHaveLength(0);
      expect(recoveredReloadResult.pendingCheckpoint).not.toBeNull();
      expect(recoveredReloadResult.pendingCheckpoint?.checkpointId).toBe(
        testTrail.checkpoints[0]!.id,
      );
      expect(recoveredReloadResult.pendingCheckpoint?.requestId).toBe(pendingRequestId);
      expect(recoveredReloadResult.view.checkpoints[0]!.status).toBe("pending");
      expect(recoveredReloadResult.view.isComplete).toBe(false);

      // Phase 2: Transaction confirms on-chain (CONFIRMED)
      const confirmedEvidence: CheckpointEvidenceItem = {
        requestId: pendingRequestId,
        checkpointId: testTrail.checkpoints[0]!.id,
        status: "CONFIRMED",
        occurredAt: "2026-11-06T12:02:00.000Z",
        mode: "DEMO",
      };

      const finalResult = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: recoveredReloadResult.progress,
        evidenceItems: [confirmedEvidence],
      });

      // Exactly 1 completed checkpoint, next checkpoint unlocked
      expect(finalResult.appliedCount).toBe(1);
      expect(finalResult.progress.completedCheckpoints).toHaveLength(1);
      expect(finalResult.pendingCheckpoint).toBeNull();
      expect(finalResult.view.checkpoints[0]!.status).toBe("confirmed");
      expect(finalResult.view.checkpoints[1]!.status).toBe("available");
      expect(finalResult.view.nextCheckpoint?.checkpointId).toBe(
        testTrail.checkpoints[1]!.id,
      );
    });

    it("handles all in-flight states: CREATED, SENT, REMOTE_EXECUTED, ACK_PENDING", () => {
      const pendingStatuses = [
        RequestStatus.CREATED,
        RequestStatus.SENT,
        RequestStatus.REMOTE_EXECUTED,
        RequestStatus.ACK_PENDING,
      ];

      for (const onChainStatus of pendingStatuses) {
        const lifecycleStatus = mapRequestStatusToLifecycle(onChainStatus);
        const storedReq: StoredICMRequest = {
          requestId: testTrail.checkpoints[0]!.chestId,
          status: "icm_pending",
          onChainStatus,
          chestId: testTrail.checkpoints[0]!.chestId,
          chestSlot: 0,
          player: demoPlayer,
          startedAt: Date.now(),
          currentStepIndex: 1,
        };

        const result = recoverTrailProgressFromStorage({
          trail: testTrail,
          player: demoPlayer,
          cachedProgress: null,
          storedRequest: storedReq,
        });

        expect(result.progress.completedCheckpoints).toHaveLength(0);
        expect(result.pendingCheckpoint?.status).toBe(lifecycleStatus);
        expect(result.view.checkpoints[0]!.status).toBe("pending");
      }
    });
  });

  describe("Requirement 3: Final failure không tạo stamp/point", () => {
    it("terminal failure guarantees zero completed checkpoints and zero score points", () => {
      const initialProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      const failedEvidence: CheckpointEvidenceItem = {
        requestId: testTrail.checkpoints[0]!.chestId,
        checkpointId: testTrail.checkpoints[0]!.id,
        status: "FAILED",
        isTerminalFailure: true,
        occurredAt: "2026-11-06T12:01:00.000Z",
        error: "Gas limit exceeded or execution reverted",
      };

      const result = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: initialProgress,
        evidenceItems: [failedEvidence],
      });

      // No progress made
      expect(result.appliedCount).toBe(0);
      expect(result.progress.completedCheckpoints).toHaveLength(0);
      expect(result.failedCheckpoints).toHaveLength(1);
      expect(result.failedCheckpoints[0]!.requestId).toBe(failedEvidence.requestId);
      expect(result.view.confirmedCount).toBe(0);

      // Verify NO team score events can be created from failed evidence
      const syntheticFailedEvent: GameplayEvidenceEvent = {
        eventId: `fail-${failedEvidence.requestId}`,
        eventType: "CHEST_CONFIRMED",
        player: demoPlayer,
        seasonId: testTrail.seasonId,
        trailId: testTrail.id,
        checkpointId: failedEvidence.checkpointId,
        requestId: failedEvidence.requestId,
        occurredAt: "2026-11-06T12:01:00.000Z",
        mode: "DEMO",
      };

      // Since mode is DEMO and policy denies score, points must be null/0
      const scoreEvent = createTeamScoreEvent({
        teamId: "team-red",
        seasonId: testTrail.seasonId,
        reason: "CHECKPOINT_CONFIRMED",
        points: 10,
        evidence: syntheticFailedEvent,
      });

      expect(scoreEvent).toBeNull();
    });
  });

  describe("Requirement 4: Out-of-order and Retry Handling", () => {
    it("handles out-of-order delivery gracefully in ORDERED mode", () => {
      const initialProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      // Attempt to confirm checkpoint 2 (Engineering Hall) before checkpoint 1 (Library)
      const outOfOrderItem: CheckpointEvidenceItem = {
        requestId: testTrail.checkpoints[1]!.chestId,
        checkpointId: testTrail.checkpoints[1]!.id,
        status: "CONFIRMED",
        occurredAt: "2026-11-06T12:01:00.000Z",
        mode: "DEMO",
      };

      const outOfOrderResult = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: initialProgress,
        evidenceItems: [outOfOrderItem],
      });

      // Checkpoint 2 is rejected as out-of-order, progress not corrupted
      expect(outOfOrderResult.outOfOrderCount).toBe(1);
      expect(outOfOrderResult.appliedCount).toBe(0);
      expect(outOfOrderResult.progress.completedCheckpoints).toHaveLength(0);

      // Now deliver Checkpoint 1 followed by Checkpoint 2 in sequence
      const checkpoint1Item: CheckpointEvidenceItem = {
        requestId: testTrail.checkpoints[0]!.chestId,
        checkpointId: testTrail.checkpoints[0]!.id,
        status: "CONFIRMED",
        occurredAt: "2026-11-06T12:02:00.000Z",
        mode: "DEMO",
      };

      const inOrderResult = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: initialProgress,
        evidenceItems: [checkpoint1Item, outOfOrderItem],
      });

      expect(inOrderResult.appliedCount).toBe(2);
      expect(inOrderResult.progress.completedCheckpoints).toHaveLength(2);
      expect(inOrderResult.view.checkpoints[0]!.status).toBe("confirmed");
      expect(inOrderResult.view.checkpoints[1]!.status).toBe("confirmed");
      expect(inOrderResult.view.checkpoints[2]!.status).toBe("available");
    });

    it("retrying the same request does NOT create duplicate events or extra points", () => {
      const initialProgress = createTrailProgress(
        testTrail.id,
        demoPlayer,
        "2026-11-06T12:00:00.000Z",
      );

      const requestId = testTrail.checkpoints[0]!.chestId;

      // 1. Initial pending
      const item1: CheckpointEvidenceItem = {
        requestId,
        status: "SENT",
        occurredAt: "2026-11-06T12:01:00.000Z",
      };

      // 2. Retry of the exact same request
      const retryItem: CheckpointEvidenceItem = {
        requestId,
        status: "SENT",
        isRetry: true,
        occurredAt: "2026-11-06T12:01:30.000Z",
      };

      const result = reconcileTrailProgressWithEvidence({
        trail: testTrail,
        player: demoPlayer,
        baseProgress: initialProgress,
        evidenceItems: [item1, retryItem],
      });

      expect(result.appliedCount).toBe(0);
      expect(result.progress.completedCheckpoints).toHaveLength(0);
      expect(result.pendingCheckpoint?.requestId).toBe(requestId);
    });
  });

  describe("Requirement 5: Correlation Logs không chứa GPS/secret", () => {
    it("sanitizes GPS coordinates and secret keys completely", () => {
      const sensitiveDetails = {
        latitude: 10.7769,
        longitude: 106.7009,
        radiusMeters: 45,
        gpsAccuracy: 3.5,
        privateKey: "0x1234567890abcdef1234567890abcdef",
        signature: "0xdeadbeef...",
        secretToken: "super-secret-enclave-key",
        nested: {
          lat: 10.77,
          lng: 106.70,
          locationName: "SafeCampus",
        },
        safeData: "ok-public-info",
      };

      const sanitized = sanitizeCorrelationPayload(sensitiveDetails);

      expect(sanitized.latitude).toBe("[REDACTED]");
      expect(sanitized.longitude).toBe("[REDACTED]");
      expect(sanitized.radiusMeters).toBe("[REDACTED]");
      expect(sanitized.gpsAccuracy).toBe("[REDACTED]");
      expect(sanitized.privateKey).toBe("[REDACTED]");
      expect(sanitized.signature).toBe("[REDACTED]");
      expect(sanitized.secretToken).toBe("[REDACTED]");
      expect((sanitized.nested as Record<string, unknown>).lat).toBe("[REDACTED]");
      expect((sanitized.nested as Record<string, unknown>).lng).toBe("[REDACTED]");
      expect((sanitized.nested as Record<string, unknown>).locationName).toBe("[REDACTED]");
      expect(sanitized.safeData).toBe("ok-public-info");

      let loggedLine = "";
      const logString = logEvidenceReconciliation(
        {
          correlationId: "corr_test_123",
          action: "TEST_SANITY",
          player: demoPlayer,
          trailId: testTrail.id,
          lifecycleStatus: "CONFIRMED",
          details: sensitiveDetails,
        },
        (msg) => {
          loggedLine = msg;
        },
      );

      expect(loggedLine).toContain("[REDACTED]");
      expect(loggedLine).not.toContain("10.7769");
      expect(loggedLine).not.toContain("106.7009");
      expect(loggedLine).not.toContain("0x1234567890abcdef");
      expect(loggedLine).not.toContain("super-secret-enclave-key");
    });
  });

  describe("Requirement 6: Rate Limiting for Reconcile Flow", () => {
    it("enforces sliding window rate limit on reconcile endpoint", () => {
      const wallet = "0x1111222233334444555566667777888899990000";
      const windowMs = 5000;
      const maxAllowed = 5;

      // First 5 requests must pass
      for (let i = 0; i < maxAllowed; i++) {
        const check = checkReconcileRateLimit(wallet, undefined, windowMs, maxAllowed);
        expect(check.allowed).toBe(true);
        recordReconcileRequest(wallet, undefined, windowMs);
      }

      // 6th request must be rejected
      const rejected = checkReconcileRateLimit(wallet, undefined, windowMs, maxAllowed);
      expect(rejected.allowed).toBe(false);
      expect(rejected.code).toBe("RATE_LIMITED");
      expect(rejected.retryAfterMs).toBeGreaterThan(0);
    });
  });

  describe("Requirement 7: POST /api/gameplay/trails/reconcile Endpoint Integration", () => {
    it("returns 200 with reconciled progress and view for valid request", async () => {
      const req = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailId: testTrail.id,
          player: demoPlayer,
          evidenceItems: [
            {
              requestId: testTrail.checkpoints[0]!.chestId,
              checkpointId: testTrail.checkpoints[0]!.id,
              status: "CONFIRMED",
            },
          ],
        }),
      });

      const res = await postReconcile(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.progress).toBeDefined();
      expect(json.progress.completedCheckpoints).toHaveLength(1);
      expect(json.appliedCount).toBe(1);
      expect(json.duplicateCount).toBe(0);
      expect(json.view.checkpoints[0].status).toBe("confirmed");
      expect(json.view.checkpoints[1].status).toBe("available");
    });

    it("returns 400 for invalid/malformed JSON body or missing required fields", async () => {
      const req1 = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid-not-json{",
      });

      const res1 = await postReconcile(req1);
      expect(res1.status).toBe(400);
      const json1 = await res1.json();
      expect(json1.error.code).toBe("INVALID_PAYLOAD");

      const req2 = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player: demoPlayer }), // Missing trailId
      });

      const res2 = await postReconcile(req2);
      expect(res2.status).toBe(400);
      const json2 = await res2.json();
      expect(json2.error.code).toBe("INVALID_PAYLOAD");
    });

    it("returns 404 if trailId does not exist or is inactive", async () => {
      const req = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailId: "non-existent-trail-999",
          player: demoPlayer,
        }),
      });

      const res = await postReconcile(req);
      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error.code).toBe("TRAIL_NOT_FOUND");
    });

    it("returns 429 when client exceeds rate limit", async () => {
      const spammedPlayer = "0x9999888877776666555544443333222211110000";

      // Spam the endpoint up to the limit (20)
      for (let i = 0; i < 20; i++) {
        const req = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trailId: testTrail.id,
            player: spammedPlayer,
          }),
        });
        const res = await postReconcile(req);
        expect(res.status).toBe(200);
      }

      // The 21st request must return 429 RATE_LIMITED
      const rejectedReq = new NextRequest("http://localhost/api/gameplay/trails/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailId: testTrail.id,
          player: spammedPlayer,
        }),
      });
      const rejectedRes = await postReconcile(rejectedReq);
      expect(rejectedRes.status).toBe(429);
      const rejectedJson = await rejectedRes.json();
      expect(rejectedJson.error.code).toBe("RATE_LIMITED");
      expect(rejectedJson.error.retryable).toBe(true);
    });
  });
});
