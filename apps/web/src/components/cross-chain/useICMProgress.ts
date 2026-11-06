"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type {
  ICMUIState,
  ICMTimelineStep,
  StoredICMRequest,
  StepStatus,
} from "./types";
import { RequestStatus } from "./types";
import {
  DEFAULT_ICM_STORAGE_KEY,
  getPendingRequest,
  savePendingRequest,
  updatePendingRequest,
  clearPendingRequest,
  mapOnChainStatusToUIState,
} from "./icm-storage";

export interface UseICMProgressOptions {
  storageKey?: string;
  autoRestore?: boolean;
  onCheckStatus?: (requestId: string) => Promise<RequestStatus | void> | RequestStatus | void;
  onRetry?: (requestId: string) => Promise<void> | void;
}

export function useICMProgress(options: UseICMProgressOptions = {}) {
  const {
    storageKey = DEFAULT_ICM_STORAGE_KEY,
    autoRestore = true,
    onCheckStatus,
    onRetry,
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ICMUIState>("idle");
  const [requestId, setRequestId] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [chestSlot, setChestSlot] = useState<number | undefined>(undefined);
  const [chestType, setChestType] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [onChainStatus, setOnChainStatus] = useState<RequestStatus>(RequestStatus.NONE);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Elapsed timer during active pending states (Requirement 3: Graceful Waiting)
  useEffect(() => {
    const isPending = state === "icm_pending" || state === "submitted";

    if (isPending) {
      if (!startedAt) {
        setStartedAt(Date.now());
      }

      timerRef.current = setInterval(() => {
        if (startedAt) {
          const secs = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
          setElapsedSeconds(secs);
        } else {
          setElapsedSeconds((prev) => prev + 1);
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state, startedAt]);

  // 2. Hydrate pending request from localStorage on mount (Requirement 4)
  useEffect(() => {
    if (!autoRestore) return;

    const stored = getPendingRequest(storageKey);
    if (stored && stored.requestId) {
      setRequestId(stored.requestId);
      setTxHash(stored.txHash || "");
      setChestSlot(stored.chestSlot);
      setChestType(stored.chestType);
      setStartedAt(stored.startedAt);

      const calculatedElapsed = Math.max(
        0,
        Math.floor((Date.now() - stored.startedAt) / 1000)
      );
      setElapsedSeconds(calculatedElapsed);

      if (stored.status === "confirmed") {
        setState("confirmed");
        setIsOpen(true);
      } else if (stored.status === "final_error") {
        setState("final_error");
        setErrorMessage(stored.error || "Transaction rejected");
        setIsOpen(true);
      } else {
        // Pending state: restore modal and trigger reconciliation
        setState(stored.status || "icm_pending");
        setIsOpen(true);

        // Immediate background reconciliation with chain
        if (onCheckStatus) {
          Promise.resolve(onCheckStatus(stored.requestId)).then((resStatus) => {
            if (resStatus !== undefined && typeof resStatus === "number") {
              setOnChainStatus(resStatus);
              const mapped = mapOnChainStatusToUIState(resStatus);
              setState(mapped);
              updatePendingRequest({ status: mapped, onChainStatus: resStatus }, storageKey);
              if (mapped === "confirmed") {
                clearPendingRequest(storageKey);
              }
            }
          }).catch((err) => {
            console.warn("[useICMProgress] Auto-restore status check failed:", err);
          });
        }
      }
    }
  }, [autoRestore, storageKey, onCheckStatus]);

  // 3. Construct 2-Chain Visual Timeline Steps (Requirement 2)
  const timelineSteps = useMemo<ICMTimelineStep[]>(() => {
    // Step state helper
    const getStepStatus = (stepIndex: number): StepStatus => {
      if (state === "final_error") {
        return stepIndex === 1 ? "failed" : "pending";
      }
      if (state === "retryable_error") {
        if (stepIndex <= 2) return "completed";
        if (stepIndex === 3) return "failed";
        return "pending";
      }
      if (state === "confirmed") {
        return "completed";
      }

      // In flight states
      if (state === "idle" || state === "awaiting_signature") {
        return "pending";
      }
      if (state === "submitted") {
        return stepIndex === 1 ? "in_progress" : "pending";
      }
      if (state === "icm_pending") {
        // Evaluate based on on-chain status or elapsed time progression
        if (onChainStatus >= RequestStatus.ACK_PENDING) {
          if (stepIndex <= 4) return "completed";
          return "in_progress";
        }
        if (onChainStatus === RequestStatus.REMOTE_EXECUTED) {
          if (stepIndex <= 3) return "completed";
          return stepIndex === 4 ? "in_progress" : "pending";
        }
        if (onChainStatus === RequestStatus.SENT) {
          if (stepIndex <= 2) return "completed";
          return stepIndex === 3 ? "in_progress" : "pending";
        }

        // Time-based progression when onChainStatus is pending
        if (elapsedSeconds < 8) {
          return stepIndex === 1 ? "completed" : stepIndex === 2 ? "in_progress" : "pending";
        }
        if (elapsedSeconds < 20) {
          return stepIndex <= 2 ? "completed" : stepIndex === 3 ? "in_progress" : "pending";
        }
        return stepIndex <= 3 ? "completed" : stepIndex === 4 ? "in_progress" : "pending";
      }

      return "pending";
    };

    return [
      {
        id: "step-1-l1-create",
        stepNumber: 1,
        chain: "GAME_L1",
        chainLabel: "Avalanche Game L1",
        title: "Giao dịch mở rương & Tạo Request ID",
        description: "Giao dịch ChestManager.openChest được xác nhận trên Game L1 và cấp phát requestId duy nhất.",
        status: getStepStatus(1),
        txHash: txHash || undefined,
      },
      {
        id: "step-2-l1-teleporter",
        stepNumber: 2,
        chain: "GAME_L1",
        chainLabel: "Avalanche Game L1",
        title: "Gửi Teleporter Cross-Chain Message",
        description: "GameICMGateway phát tin nhắn DepositRequest sang hàng đợi Teleporter Messenger.",
        status: getStepStatus(2),
      },
      {
        id: "step-3-fuji-execute",
        stepNumber: 3,
        chain: "FUJI_C",
        chainLabel: "Avalanche Fuji C-Chain",
        title: "Relayer chuyển phát & Cấp vốn YieldVault",
        description: "Relayer chuyển message sang Fuji C-Chain. SponsorPool trích xuất vốn và ghi nhận vị thế.",
        status: getStepStatus(3),
      },
      {
        id: "step-4-fuji-snapshot",
        stepNumber: 4,
        chain: "FUJI_C",
        chainLabel: "Avalanche Fuji C-Chain",
        title: "Gửi PositionSnapshot phản hồi về L1",
        description: "CChainICMGateway đóng gói PositionSnapshot và phát Teleporter ack ngược về Game L1.",
        status: getStepStatus(4),
      },
      {
        id: "step-5-l1-confirm",
        stepNumber: 5,
        chain: "GAME_L1",
        chainLabel: "Avalanche Game L1",
        title: "Xác nhận hoàn tất (CONFIRMED)",
        description: "GameICMGateway nhận snapshot, cập nhật PlayerState (XP, exploration) và mở khóa phần thưởng.",
        status: getStepStatus(5),
      },
    ];
  }, [state, onChainStatus, elapsedSeconds, txHash]);

  // Graceful waiting thresholds (Requirement 3)
  const isStillRelaying = (state === "icm_pending" || state === "submitted") && elapsedSeconds >= 30;
  const canRetry = (state === "icm_pending" || state === "submitted") && elapsedSeconds >= 60;

  // 4. Action Handlers
  const startRequest = useCallback(
    (params: { chestSlot?: number; chestType?: string; player?: string }) => {
      setIsOpen(true);
      setState("awaiting_signature");
      setRequestId("");
      setTxHash("");
      setErrorMessage("");
      setChestSlot(params.chestSlot);
      setChestType(params.chestType);
      setStartedAt(null);
      setElapsedSeconds(0);
      setOnChainStatus(RequestStatus.NONE);
    },
    []
  );

  const setSubmitted = useCallback(
    (hash: string) => {
      setState("submitted");
      setTxHash(hash);
      const now = Date.now();
      setStartedAt(now);
      setElapsedSeconds(0);
    },
    []
  );

  const setPending = useCallback(
    (reqId: string, hash?: string) => {
      setState("icm_pending");
      setRequestId(reqId);
      if (hash) setTxHash(hash);
      const now = startedAt || Date.now();
      setStartedAt(now);

      savePendingRequest(
        {
          requestId: reqId,
          status: "icm_pending",
          onChainStatus: RequestStatus.SENT,
          txHash: hash || txHash,
          chestSlot,
          chestType,
          startedAt: now,
          currentStepIndex: 2,
        },
        storageKey
      );
    },
    [startedAt, txHash, chestSlot, chestType, storageKey]
  );

  const setConfirmed = useCallback(() => {
    setState("confirmed");
    setOnChainStatus(RequestStatus.CONFIRMED);
    clearPendingRequest(storageKey);
  }, [storageKey]);

  const setRetryableError = useCallback(
    (error: string) => {
      setState("retryable_error");
      setOnChainStatus(RequestStatus.RETRYABLE_FAILED);
      setErrorMessage(error);
      updatePendingRequest(
        { status: "retryable_error", error, onChainStatus: RequestStatus.RETRYABLE_FAILED },
        storageKey
      );
    },
    [storageKey]
  );

  const setFinalError = useCallback(
    (error: string) => {
      setState("final_error");
      setOnChainStatus(RequestStatus.FAILED_FINAL);
      setErrorMessage(error);
      clearPendingRequest(storageKey);
    },
    [storageKey]
  );

  const checkStatus = useCallback(async () => {
    if (!requestId || isCheckingStatus) return;
    try {
      setIsCheckingStatus(true);
      if (onCheckStatus) {
        const result = await onCheckStatus(requestId);
        if (result !== undefined && typeof result === "number") {
          setOnChainStatus(result);
          const mapped = mapOnChainStatusToUIState(result);
          setState(mapped);
          if (mapped === "confirmed") {
            clearPendingRequest(storageKey);
          } else {
            updatePendingRequest({ status: mapped, onChainStatus: result }, storageKey);
          }
        }
      }
    } catch (err) {
      console.warn("[useICMProgress] Check status failed:", err);
    } finally {
      setIsCheckingStatus(false);
    }
  }, [requestId, isCheckingStatus, onCheckStatus, storageKey]);

  const retry = useCallback(async () => {
    if (!requestId || isRetrying) return;
    try {
      setIsRetrying(true);
      setState("icm_pending");
      // Reset elapsed timer for new retry cycle with SAME requestId (PRD §9.3)
      setStartedAt(Date.now());
      setElapsedSeconds(0);
      updatePendingRequest({ status: "icm_pending", startedAt: Date.now() }, storageKey);

      if (onRetry) {
        await onRetry(requestId);
      }
    } catch (err: any) {
      setRetryableError(err?.message || "Retry failed to dispatch message");
    } finally {
      setIsRetrying(false);
    }
  }, [requestId, isRetrying, onRetry, setRetryableError, storageKey]);

  const closeModal = useCallback(() => {
    if (state === "confirmed" || state === "final_error") {
      clearPendingRequest(storageKey);
    }
    setIsOpen(false);
  }, [state, storageKey]);

  return {
    isOpen,
    setIsOpen,
    state,
    setState,
    requestId,
    setRequestId,
    txHash,
    setTxHash,
    chestSlot,
    chestType,
    errorMessage,
    elapsedSeconds,
    timelineSteps,
    isStillRelaying,
    canRetry,
    isCheckingStatus,
    isRetrying,
    onChainStatus,
    // Methods
    startRequest,
    setSubmitted,
    setPending,
    setConfirmed,
    setRetryableError,
    setFinalError,
    checkStatus,
    retry,
    closeModal,
  };
}

