import type { ICMUIState, StepStatus } from "./types";
import { RequestStatus } from "./types";

export interface RelayMomentStage {
  id: "game-l1" | "relayer" | "c-chain" | "snapshot";
  label: string;
  detail: string;
  status: StepStatus;
}

export interface RelayLearningCard {
  eyebrow: string;
  title: string;
  body: string;
}

const RELAY_STAGE_COPY: ReadonlyArray<
  Omit<RelayMomentStage, "status">
> = [
  {
    id: "game-l1",
    label: "Game L1",
    detail: "Request recorded",
  },
  {
    id: "relayer",
    label: "Relayer",
    detail: "Message delivered",
  },
  {
    id: "c-chain",
    label: "C-Chain",
    detail: "Action executed",
  },
  {
    id: "snapshot",
    label: "Snapshot",
    detail: "Result returned",
  },
];

const LEARNING_CARDS: Record<string, RelayLearningCard> = {
  YIELD: {
    eyebrow: "Yield chest lesson",
    title: "Capital moves only after execution",
    body: "The relayer carries the request. The YieldVault position becomes final only after the C-Chain result returns to Game L1.",
  },
  QUEST: {
    eyebrow: "Quest chest lesson",
    title: "Proof travels; progress waits",
    body: "Your quest proof is carried cross-chain, but the checkpoint stays pending until Game L1 receives the confirmed snapshot.",
  },
  SPONSOR: {
    eyebrow: "Sponsor chest lesson",
    title: "One request, one sponsored action",
    body: "Relay or retry reuses the same Request ID, so reconciliation does not create another sponsored deposit.",
  },
};

function statusesForRelayMoment(
  state: ICMUIState,
  onChainStatus: RequestStatus,
): StepStatus[] {
  if (state === "confirmed") {
    return ["completed", "completed", "completed", "completed"];
  }

  if (state === "final_error") {
    return ["failed", "pending", "pending", "pending"];
  }

  if (state === "retryable_error") {
    return ["completed", "failed", "pending", "pending"];
  }

  if (state === "submitted") {
    return ["in_progress", "pending", "pending", "pending"];
  }

  if (state !== "icm_pending") {
    return ["pending", "pending", "pending", "pending"];
  }

  switch (onChainStatus) {
    case RequestStatus.CREATED:
      return ["completed", "pending", "pending", "pending"];
    case RequestStatus.SENT:
      return ["completed", "in_progress", "pending", "pending"];
    case RequestStatus.REMOTE_EXECUTED:
      return ["completed", "completed", "completed", "in_progress"];
    case RequestStatus.ACK_PENDING:
      return ["completed", "completed", "completed", "in_progress"];
    case RequestStatus.RETRYABLE_FAILED:
      return ["completed", "failed", "pending", "pending"];
    case RequestStatus.FAILED_FINAL:
      return ["failed", "pending", "pending", "pending"];
    default:
      return ["in_progress", "pending", "pending", "pending"];
  }
}

export function getRelayMomentStages(
  state: ICMUIState,
  onChainStatus: RequestStatus,
): RelayMomentStage[] {
  const statuses = statusesForRelayMoment(state, onChainStatus);
  return RELAY_STAGE_COPY.map((stage, index) => ({
    ...stage,
    status: statuses[index] ?? "pending",
  }));
}

export function getTimelineStepStatus(
  state: ICMUIState,
  onChainStatus: RequestStatus,
  stepIndex: number,
): StepStatus {
  if (state === "final_error") {
    return stepIndex === 1 ? "failed" : "pending";
  }
  if (state === "retryable_error") {
    if (stepIndex <= 2) return "completed";
    if (stepIndex === 3) return "failed";
    return "pending";
  }
  if (state === "confirmed") return "completed";
  if (state === "idle" || state === "awaiting_signature") return "pending";
  if (state === "submitted") {
    return stepIndex === 1 ? "in_progress" : "pending";
  }

  if (state === "icm_pending") {
    if (onChainStatus >= RequestStatus.ACK_PENDING) {
      return stepIndex <= 4 ? "completed" : "in_progress";
    }
    if (onChainStatus === RequestStatus.REMOTE_EXECUTED) {
      if (stepIndex <= 3) return "completed";
      return stepIndex === 4 ? "in_progress" : "pending";
    }
    if (onChainStatus === RequestStatus.SENT) {
      if (stepIndex <= 2) return "completed";
      return stepIndex === 3 ? "in_progress" : "pending";
    }
    if (onChainStatus === RequestStatus.CREATED) {
      if (stepIndex === 1) return "completed";
      return stepIndex === 2 ? "in_progress" : "pending";
    }
    return stepIndex === 1 ? "in_progress" : "pending";
  }

  return "pending";
}

export function getRelayLearningCard(chestType?: string): RelayLearningCard {
  const normalized = chestType?.trim().toUpperCase() ?? "";
  return (
    LEARNING_CARDS[normalized] ?? {
      eyebrow: "Relay lesson",
      title: "The snapshot is the receipt",
      body: "A submitted request is not a completed action. Game L1 only finalizes progress after the cross-chain snapshot returns.",
    }
  );
}

export function getElapsedSeconds(startedAt: number, now: number = Date.now()) {
  return Math.max(0, Math.floor((now - startedAt) / 1000));
}

export function getRelayWaitState(state: ICMUIState, elapsedSeconds: number) {
  const isPending = state === "icm_pending" || state === "submitted";
  return {
    isStillRelaying: isPending && elapsedSeconds >= 30,
    canRetry: isPending && elapsedSeconds >= 60,
  };
}

export function getRelayAnnouncement(
  state: ICMUIState,
  onChainStatus: RequestStatus,
  elapsedSeconds: number,
): string {
  if (state === "confirmed") {
    return "Cross-chain request confirmed. The position snapshot reached Game L1.";
  }
  if (state === "final_error") {
    return "Cross-chain request failed with a final error.";
  }
  if (state === "retryable_error") {
    return "Relay delivery failed and can be retried with the same Request ID.";
  }
  if (state === "awaiting_signature") {
    return "Waiting for your wallet signature on Game L1.";
  }
  if (state === "submitted") {
    return "Game L1 transaction submitted. Waiting for a cross-chain Request ID.";
  }
  if (state !== "icm_pending") return "";

  let message: string;
  switch (onChainStatus) {
    case RequestStatus.SENT:
      message = "Game L1 sent the request. Relayer delivery is in progress.";
      break;
    case RequestStatus.REMOTE_EXECUTED:
      message = "C-Chain execution completed. The position snapshot is returning to Game L1.";
      break;
    case RequestStatus.ACK_PENDING:
      message = "The position snapshot returned. Waiting for terminal Game L1 confirmation.";
      break;
    default:
      message = "Game L1 recorded the request. Waiting for relay delivery.";
  }

  if (elapsedSeconds >= 60) {
    return `${message} Reconciliation and retry are now available with the same Request ID.`;
  }
  if (elapsedSeconds >= 30) {
    return `${message} The request is still relaying; a status check is available.`;
  }
  return message;
}

export function shouldCelebrateICM(state: ICMUIState) {
  return state === "confirmed";
}
