/**
 * GE-04 Evidence Reconciliation & Progress Persistence Adapter
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §5, §14; Playbook §11
 *
 * Guarantees:
 * - Client cache is strictly for UX acceleration; chain/server evidence is authoritative.
 * - Idempotency key prioritized as `${requestId}:${checkpointId}`.
 * - Duplicate events and retried requests NEVER create multiple completions or points.
 * - In-flight states (CREATED, SENT, REMOTE_EXECUTED, ACK_PENDING) are preserved on reload.
 * - Final failure (FAILED) NEVER awards stamps or points.
 * - Correlation logs NEVER leak GPS coordinates or secrets/private keys.
 */

import {
  applyCheckpointEvidence,
  type CheckpointApplicationStatus,
  type DemoModePolicy,
  type GameplayEvidenceEvent,
  type TrailDefinition,
  type TrailProgress,
} from "@defi-trail/shared";
import {
  createTrailProgress,
  deriveTrailProgressView,
  findEvidenceCheckpointId,
  type TrailEvidenceSignal,
  type TrailProgressView,
} from "./model";
import { RequestStatus, type ICMUIState, type StoredICMRequest } from "@/components/cross-chain/types";

/**
 * 6 Canonical Evidence Lifecycle Statuses
 */
export type EvidenceLifecycleStatus =
  | "CREATED"
  | "SENT"
  | "REMOTE_EXECUTED"
  | "ACK_PENDING"
  | "CONFIRMED"
  | "FAILED";

export const PENDING_LIFECYCLE_STATUSES = new Set<EvidenceLifecycleStatus>([
  "CREATED",
  "SENT",
  "REMOTE_EXECUTED",
  "ACK_PENDING",
]);

/**
 * Maps numeric RequestStatus enum (from smart contract) to EvidenceLifecycleStatus
 */
export function mapRequestStatusToLifecycle(
  status: RequestStatus | number,
): EvidenceLifecycleStatus {
  switch (status) {
    case RequestStatus.NONE:
    case RequestStatus.CREATED:
      return "CREATED";
    case RequestStatus.SENT:
      return "SENT";
    case RequestStatus.REMOTE_EXECUTED:
      return "REMOTE_EXECUTED";
    case RequestStatus.ACK_PENDING:
      return "ACK_PENDING";
    case RequestStatus.CONFIRMED:
      return "CONFIRMED";
    case RequestStatus.RETRYABLE_FAILED:
    case RequestStatus.FAILED_FINAL:
      return "FAILED";
    default:
      return "SENT";
  }
}

/**
 * Maps UI state to EvidenceLifecycleStatus
 */
export function mapUIStateToLifecycle(state: ICMUIState): EvidenceLifecycleStatus {
  switch (state) {
    case "idle":
    case "awaiting_signature":
      return "CREATED";
    case "submitted":
      return "SENT";
    case "icm_pending":
      return "REMOTE_EXECUTED";
    case "confirmed":
      return "CONFIRMED";
    case "retryable_error":
    case "final_error":
      return "FAILED";
    default:
      return "SENT";
  }
}

/**
 * Maps EvidenceLifecycleStatus back to UI state for modal & card integration
 */
export function mapLifecycleToUIState(status: EvidenceLifecycleStatus): ICMUIState {
  switch (status) {
    case "CREATED":
      return "awaiting_signature";
    case "SENT":
      return "submitted";
    case "REMOTE_EXECUTED":
    case "ACK_PENDING":
      return "icm_pending";
    case "CONFIRMED":
      return "confirmed";
    case "FAILED":
      return "final_error";
    default:
      return "icm_pending";
  }
}

/**
 * Priority idempotency key: `${requestId}:${checkpointId}`
 */
export function createEvidenceIdempotencyKey(
  requestId: string,
  checkpointId: string,
): string {
  return `${requestId.toLowerCase()}:${checkpointId}`;
}

/**
 * Single checkpoint evidence item submitted for reconciliation
 */
export interface CheckpointEvidenceItem {
  requestId: string;
  checkpointId?: string;
  chestId?: string;
  chestSlot?: number;
  status: EvidenceLifecycleStatus;
  isRetry?: boolean;
  isTerminalFailure?: boolean;
  occurredAt?: string;
  mode?: "GPS" | "DEMO";
  txHash?: string;
  error?: string;
}

/**
 * Sanitizes log records to guarantee NO GPS or secret leaks
 */
const SENSITIVE_KEY_PATTERN =
  /(gps|lat|lng|latitude|longitude|radius|coordinates|location|secret|privatekey|signature|password|seed|mnemonic|key|proof)/i;

export function sanitizeCorrelationPayload(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      result[key] = "[REDACTED]";
    } else if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result[key] = sanitizeCorrelationPayload(
        value as Record<string, unknown>,
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function maskPlayerAddress(address?: string): string {
  if (!address) return "unknown";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export interface CorrelationLogPayload {
  correlationId: string;
  action: string;
  requestId?: string;
  checkpointId?: string;
  trailId?: string;
  player: string;
  lifecycleStatus: EvidenceLifecycleStatus;
  resultStatus?: string;
  details?: Record<string, unknown>;
}

export function logEvidenceReconciliation(
  payload: CorrelationLogPayload,
  sink: (msg: string) => void = console.log,
): string {
  const cleanDetails = payload.details
    ? sanitizeCorrelationPayload(payload.details)
    : {};

  const logLine = `[EvidenceReconciliation] correlationId=${payload.correlationId} action=${payload.action} player=${maskPlayerAddress(payload.player)} trailId=${payload.trailId ?? "n/a"} checkpointId=${payload.checkpointId ?? "n/a"} status=${payload.lifecycleStatus} result=${payload.resultStatus ?? "ok"} meta=${JSON.stringify(cleanDetails)}`;

  sink(logLine);
  return logLine;
}

/**
 * Resolves checkpointId from evidence item against trail checkpoints
 */
export function resolveEvidenceCheckpointId(
  trail: TrailDefinition,
  item: {
    checkpointId?: string;
    chestId?: string;
    chestSlot?: number;
    requestId?: string;
  },
): string | null {
  if (item.checkpointId) {
    const exists = trail.checkpoints.some((c) => c.id === item.checkpointId);
    if (exists) return item.checkpointId;
  }

  const signal: TrailEvidenceSignal = {
    state: "confirmed",
    requestId: item.chestId ?? item.requestId,
    chestSlot: item.chestSlot,
  };
  return findEvidenceCheckpointId(trail, signal);
}

export interface ReconcileOptions {
  trail: TrailDefinition;
  player: string;
  baseProgress?: TrailProgress | null;
  evidenceItems: readonly CheckpointEvidenceItem[];
  demoModePolicy?: DemoModePolicy;
}

export interface ReconcileResult {
  progress: TrailProgress;
  view: TrailProgressView;
  appliedCount: number;
  duplicateCount: number;
  outOfOrderCount: number;
  pendingCheckpoint: {
    checkpointId: string;
    requestId: string;
    status: EvidenceLifecycleStatus;
  } | null;
  failedCheckpoints: Array<{
    checkpointId?: string;
    requestId: string;
    error?: string;
  }>;
  isComplete: boolean;
  processedKeys: string[];
}

/**
 * Core Reconciliation Engine
 * Guarantees idempotency, graceful reload restoration, and terminal failure rejection.
 */
export function reconcileTrailProgressWithEvidence(
  options: ReconcileOptions,
): ReconcileResult {
  const { trail, player, baseProgress, evidenceItems, demoModePolicy } = options;

  let currentProgress: TrailProgress =
    baseProgress &&
    baseProgress.trailId === trail.id &&
    baseProgress.player.toLowerCase() === player.toLowerCase()
      ? {
          ...baseProgress,
          completedCheckpoints: [...baseProgress.completedCheckpoints],
        }
      : createTrailProgress(trail.id, player, new Date().toISOString());

  // Track completed idempotency keys
  const completedKeys = new Set<string>();
  const completedCheckpointIds = new Set<string>();
  const completedRequestIds = new Set<string>();

  for (const completion of currentProgress.completedCheckpoints) {
    if (completion.requestId) {
      completedKeys.add(
        createEvidenceIdempotencyKey(completion.requestId, completion.checkpointId),
      );
      completedRequestIds.add(completion.requestId.toLowerCase());
    }
    completedCheckpointIds.add(completion.checkpointId);
  }

  let appliedCount = 0;
  let duplicateCount = 0;
  let outOfOrderCount = 0;
  let pendingCheckpoint: {
    checkpointId: string;
    requestId: string;
    status: EvidenceLifecycleStatus;
  } | null = null;
  const failedCheckpoints: Array<{
    checkpointId?: string;
    requestId: string;
    error?: string;
  }> = [];

  for (const item of evidenceItems) {
    const checkpointId = resolveEvidenceCheckpointId(trail, item);
    const correlationId = `corr_${item.requestId.slice(0, 10)}`;

    // Skip items that cannot be mapped to any checkpoint on this trail
    if (!checkpointId) {
      logEvidenceReconciliation({
        correlationId,
        action: "SKIP_UNKNOWN_CHECKPOINT",
        requestId: item.requestId,
        trailId: trail.id,
        player,
        lifecycleStatus: item.status,
        resultStatus: "NO_CHECKPOINT_MATCH",
      });
      continue;
    }

    const idempotencyKey = createEvidenceIdempotencyKey(item.requestId, checkpointId);

    // 1. Terminal Failure: Guarantee ZERO stamps, ZERO score points, ZERO completions
    if (item.status === "FAILED") {
      logEvidenceReconciliation({
        correlationId,
        action: "RECORD_FAILURE",
        requestId: item.requestId,
        checkpointId,
        trailId: trail.id,
        player,
        lifecycleStatus: "FAILED",
        resultStatus: "TERMINAL_FAILURE_NO_PROGRESS",
      });

      failedCheckpoints.push({
        checkpointId,
        requestId: item.requestId,
        error: item.error ?? "Cross-chain request failed terminally",
      });
      continue;
    }

    // 2. Already completed: Duplicate check (Idempotent replay)
    if (
      completedKeys.has(idempotencyKey) ||
      completedCheckpointIds.has(checkpointId) ||
      completedRequestIds.has(item.requestId.toLowerCase())
    ) {
      duplicateCount++;
      logEvidenceReconciliation({
        correlationId,
        action: "IDEMPOTENT_DUPLICATE_IGNORED",
        requestId: item.requestId,
        checkpointId,
        trailId: trail.id,
        player,
        lifecycleStatus: item.status,
        resultStatus: "DUPLICATE_IGNORED",
      });
      continue;
    }

    // 3. Retry of same request: Retrying does NOT create new events or points
    if (item.isRetry && item.status !== "CONFIRMED") {
      // Retry in pending state keeps existing pending tracking
      pendingCheckpoint = {
        checkpointId,
        requestId: item.requestId,
        status: item.status,
      };
      logEvidenceReconciliation({
        correlationId,
        action: "RETRY_KEPT_PENDING",
        requestId: item.requestId,
        checkpointId,
        trailId: trail.id,
        player,
        lifecycleStatus: item.status,
        resultStatus: "NO_NEW_EVENT",
      });
      continue;
    }

    // 4. In-flight Pending States (CREATED, SENT, REMOTE_EXECUTED, ACK_PENDING)
    if (PENDING_LIFECYCLE_STATUSES.has(item.status)) {
      pendingCheckpoint = {
        checkpointId,
        requestId: item.requestId,
        status: item.status,
      };

      logEvidenceReconciliation({
        correlationId,
        action: "RESTORE_PENDING_STATE",
        requestId: item.requestId,
        checkpointId,
        trailId: trail.id,
        player,
        lifecycleStatus: item.status,
        resultStatus: "TRACKING_PENDING",
      });
      continue;
    }

    // 5. Confirmed On-Chain Evidence
    if (item.status === "CONFIRMED") {
      const event: GameplayEvidenceEvent = {
        eventId: `icm-confirmed-${item.requestId}`,
        eventType: "CHEST_CONFIRMED",
        player: currentProgress.player,
        seasonId: trail.seasonId,
        trailId: trail.id,
        checkpointId,
        requestId: item.requestId,
        occurredAt: item.occurredAt ?? new Date().toISOString(),
        mode: item.mode ?? "DEMO",
        ...(item.txHash ? { txHash: item.txHash } : {}),
      };

      const result = applyCheckpointEvidence(
        trail,
        currentProgress,
        event,
        demoModePolicy,
      );

      if (result.status === "APPLIED" || result.status === "COMPLETED") {
        currentProgress = result.progress;
        completedKeys.add(idempotencyKey);
        completedCheckpointIds.add(checkpointId);
        completedRequestIds.add(item.requestId.toLowerCase());
        appliedCount++;

        // Clear pending checkpoint if it matched this confirmed request
        if (pendingCheckpoint?.requestId.toLowerCase() === item.requestId.toLowerCase()) {
          pendingCheckpoint = null;
        }

        logEvidenceReconciliation({
          correlationId,
          action: "APPLY_CONFIRMED_EVIDENCE",
          requestId: item.requestId,
          checkpointId,
          trailId: trail.id,
          player,
          lifecycleStatus: "CONFIRMED",
          resultStatus: result.status,
        });
      } else if (result.status === "DUPLICATE") {
        duplicateCount++;
      } else if (result.status === "OUT_OF_ORDER") {
        outOfOrderCount++;
        logEvidenceReconciliation({
          correlationId,
          action: "OUT_OF_ORDER_EVIDENCE",
          requestId: item.requestId,
          checkpointId,
          trailId: trail.id,
          player,
          lifecycleStatus: "CONFIRMED",
          resultStatus: "OUT_OF_ORDER",
        });
      }
    }
  }

  // Derive UI view: if pending checkpoint exists, map to signal so card renders "Confirming"
  const signal: TrailEvidenceSignal = pendingCheckpoint
    ? {
        state: mapLifecycleToUIState(pendingCheckpoint.status),
        requestId: pendingCheckpoint.requestId,
      }
    : { state: "idle" };

  const view = deriveTrailProgressView(trail, currentProgress, signal);

  return {
    progress: currentProgress,
    view,
    appliedCount,
    duplicateCount,
    outOfOrderCount,
    pendingCheckpoint,
    failedCheckpoints,
    isComplete: view.isComplete,
    processedKeys: Array.from(completedKeys),
  };
}

/**
 * Abstraction to read request evidence from chain or read-model without changing contracts
 */
export interface RequestEvidenceInfo {
  requestId: string;
  player: string;
  chestId: string;
  chestSlot?: number;
  status: EvidenceLifecycleStatus;
  rawStatus: RequestStatus;
  epoch: number;
  occurredAt?: string;
  isTerminalFailure: boolean;
}

export interface EvidenceStatusReader {
  readRequestEvidence(requestId: string): Promise<RequestEvidenceInfo | null>;
}

/**
 * Memory-backed evidence reader for testing & local state stores
 */
export class MemoryEvidenceReader implements EvidenceStatusReader {
  private readonly records = new Map<string, RequestEvidenceInfo>();

  setRecord(record: RequestEvidenceInfo): void {
    this.records.set(record.requestId.toLowerCase(), record);
  }

  async readRequestEvidence(
    requestId: string,
  ): Promise<RequestEvidenceInfo | null> {
    return this.records.get(requestId.toLowerCase()) ?? null;
  }
}

/**
 * Hydrates and reconciles progress across page reloads using stored pending requests
 */
export function recoverTrailProgressFromStorage(input: {
  trail: TrailDefinition;
  player: string;
  cachedProgress: TrailProgress | null;
  storedRequest: StoredICMRequest | null;
  demoModePolicy?: DemoModePolicy;
}): ReconcileResult {
  const { trail, player, cachedProgress, storedRequest, demoModePolicy } = input;

  const evidenceItems: CheckpointEvidenceItem[] = [];

  if (storedRequest && storedRequest.requestId) {
    const status = storedRequest.onChainStatus !== undefined
      ? mapRequestStatusToLifecycle(storedRequest.onChainStatus)
      : mapUIStateToLifecycle(storedRequest.status);

    evidenceItems.push({
      requestId: storedRequest.requestId,
      chestId: storedRequest.chestId,
      chestSlot: storedRequest.chestSlot,
      status,
      occurredAt: storedRequest.startedAt
        ? new Date(storedRequest.startedAt).toISOString()
        : new Date().toISOString(),
      mode: "DEMO",
      txHash: storedRequest.txHash,
      error: storedRequest.error,
    });
  }

  return reconcileTrailProgressWithEvidence({
    trail,
    player,
    baseProgress: cachedProgress,
    evidenceItems,
    demoModePolicy,
  });
}

