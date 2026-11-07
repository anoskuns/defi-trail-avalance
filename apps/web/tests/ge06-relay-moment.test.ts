import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { RequestStatus } from "@/components/cross-chain/types";
import {
  getElapsedSeconds,
  getRelayAnnouncement,
  getRelayLearningCard,
  getRelayMomentStages,
  getRelayWaitState,
  getTimelineStepStatus,
  shouldCelebrateICM,
} from "@/components/cross-chain/relay-moment";

const modalSource = readFileSync(
  new URL("../src/components/cross-chain/ICMProgressModal.tsx", import.meta.url),
  "utf8",
);
const hookSource = readFileSync(
  new URL("../src/components/cross-chain/useICMProgress.ts", import.meta.url),
  "utf8",
);
const modalStyles = readFileSync(
  new URL(
    "../src/components/cross-chain/ICMProgressModal.module.css",
    import.meta.url,
  ),
  "utf8",
);

describe("GE-06 Relay Moment", () => {
  it("maps the four-stage animation from canonical state instead of elapsed time", () => {
    expect(
      getRelayMomentStages("icm_pending", RequestStatus.SENT).map(
        (stage) => stage.status,
      ),
    ).toEqual(["completed", "in_progress", "pending", "pending"]);

    expect(
      getRelayMomentStages(
        "icm_pending",
        RequestStatus.REMOTE_EXECUTED,
      ).map((stage) => stage.status),
    ).toEqual(["completed", "completed", "completed", "in_progress"]);

    expect(
      getRelayMomentStages("icm_pending", RequestStatus.ACK_PENDING).map(
        (stage) => stage.status,
      ),
    ).toEqual(["completed", "completed", "completed", "in_progress"]);

    expect(
      getRelayMomentStages("confirmed", RequestStatus.CONFIRMED).every(
        (stage) => stage.status === "completed",
      ),
    ).toBe(true);
  });

  it("keeps the detailed timeline truthful when a pending request simply gets older", () => {
    expect(
      getTimelineStepStatus("icm_pending", RequestStatus.SENT, 3),
    ).toBe("in_progress");
    expect(
      getTimelineStepStatus("icm_pending", RequestStatus.SENT, 4),
    ).toBe("pending");
    expect(hookSource).not.toContain("Time-based progression");
  });

  it("restores elapsed time from persisted startedAt without restarting on reload", () => {
    const persistedStartedAt = 1_000_000;
    const reloadedAt = persistedStartedAt + 67_400;

    expect(getElapsedSeconds(persistedStartedAt, reloadedAt)).toBe(67);
    expect(hookSource).toContain(
      "setElapsedSeconds(getElapsedSeconds(stored.startedAt))",
    );
    expect(hookSource).toContain("startedAt: retryStartedAt");
  });

  it("keeps the 30-second relay and 60-second reconcile/retry thresholds", () => {
    expect(getRelayWaitState("icm_pending", 29)).toEqual({
      isStillRelaying: false,
      canRetry: false,
    });
    expect(getRelayWaitState("icm_pending", 30)).toEqual({
      isStillRelaying: true,
      canRetry: false,
    });
    expect(getRelayWaitState("icm_pending", 60)).toEqual({
      isStillRelaying: true,
      canRetry: true,
    });
    expect(getRelayAnnouncement("icm_pending", RequestStatus.SENT, 60)).toContain(
      "same Request ID",
    );
  });

  it("provides short learning copy for every supported chest type", () => {
    for (const chestType of ["YIELD", "QUEST", "SPONSOR"]) {
      const card = getRelayLearningCard(chestType);
      expect(card.eyebrow.length).toBeGreaterThan(0);
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.body.length).toBeGreaterThan(0);
    }
  });

  it("only enables the confirmed celebration from the existing terminal state", () => {
    expect(shouldCelebrateICM("confirmed")).toBe(true);
    expect(shouldCelebrateICM("icm_pending")).toBe(false);
    expect(shouldCelebrateICM("retryable_error")).toBe(false);
    expect(shouldCelebrateICM("final_error")).toBe(false);
  });

  it("announces state changes and respects reduced motion without an infinite spinner", () => {
    expect(modalSource).toContain('role="status"');
    expect(modalSource).toContain('aria-live="polite"');
    expect(modalSource).toContain('aria-atomic="true"');
    expect(modalSource).toContain('aria-current={stage.status === "in_progress"');
    expect(modalSource).toContain("View Passport");
    expect(modalSource).toContain("Next checkpoint");
    expect(modalStyles).toContain("prefers-reduced-motion: reduce");
    expect(modalStyles).not.toMatch(/animation[^;]*infinite/i);
  });
});
