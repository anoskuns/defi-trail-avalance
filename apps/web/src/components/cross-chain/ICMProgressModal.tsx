"use client";

import React, { useState, useEffect, useId } from "react";
import type { ICMProgressModalProps } from "./types";
import { useICMProgress, type UseICMProgressReturn } from "./useICMProgress";
import {
  getRelayAnnouncement,
  getRelayLearningCard,
  getRelayMomentStages,
  shouldCelebrateICM,
} from "./relay-moment";
import styles from "./ICMProgressModal.module.css";

export function ICMProgressModal(props: ICMProgressModalProps) {
  if (props.progress) {
    return <ICMProgressModalView {...props} progress={props.progress} />;
  }
  return <UncontrolledICMProgressModal {...props} />;
}

function UncontrolledICMProgressModal(props: ICMProgressModalProps) {
  const hookProgress = useICMProgress({
    storageKey: props.storageKey,
    autoRestore: props.autoRestoreOnMount ?? true,
    onCheckStatus: props.onCheckStatus,
    onRetry: props.onRetry,
  });

  return <ICMProgressModalView {...props} progress={hookProgress} />;
}

interface ICMProgressModalViewProps extends ICMProgressModalProps {
  progress: UseICMProgressReturn;
}

function ICMProgressModalView(props: ICMProgressModalViewProps) {
  const { progress, onSuccessDismiss } = props;

  const isOpen = props.isOpen !== undefined ? props.isOpen : progress.isOpen;
  const state = props.state || progress.state;
  const requestId = props.requestId || progress.requestId;
  const txHash = props.txHash || progress.txHash;
  const chestSlot = props.chestSlot !== undefined ? props.chestSlot : progress.chestSlot;
  const chestType = props.chestType || progress.chestType;
  const errorMessage = props.errorMessage || progress.errorMessage;

  const {
    elapsedSeconds,
    timelineSteps,
    isStillRelaying,
    canRetry,
    isCheckingStatus,
    isRetrying,
    checkStatus,
    retry,
    closeModal,
  } = progress;

  const [copiedId, setCopiedId] = useState(false);
  const titleId = useId();
  const relayStages = getRelayMomentStages(state, progress.onChainStatus);
  const learningCard = getRelayLearningCard(chestType);
  const relayAnnouncement = getRelayAnnouncement(
    state,
    progress.onChainStatus,
    elapsedSeconds,
  );
  const isCelebrating = shouldCelebrateICM(state);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    closeModal();
  };

  // Close immediately on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen || state === "idle") {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCopyRequestId = () => {
    if (!requestId) return;
    navigator.clipboard?.writeText(requestId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const truncateHash = (hash?: string) => {
    if (!hash || hash.length < 12) return hash || "—";
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(3, 7, 18, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#0B0F19",
          border: "1px solid #1E293B",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92vh",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  backgroundColor:
                    state === "confirmed"
                      ? "rgba(16, 185, 129, 0.2)"
                      : state === "final_error"
                      ? "rgba(239, 68, 68, 0.2)"
                      : state === "retryable_error"
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(56, 189, 248, 0.2)",
                  color:
                    state === "confirmed"
                      ? "#34D399"
                      : state === "final_error"
                      ? "#F87171"
                      : state === "retryable_error"
                      ? "#FBBF24"
                      : "#38BDF8",
                  border: `1px solid ${
                    state === "confirmed"
                      ? "rgba(16, 185, 129, 0.4)"
                      : state === "final_error"
                      ? "rgba(239, 68, 68, 0.4)"
                      : state === "retryable_error"
                      ? "rgba(245, 158, 11, 0.4)"
                      : "rgba(56, 189, 248, 0.4)"
                  }`,
                }}
              >
                {state === "confirmed" && "Confirmed"}
                {state === "final_error" && "Failed"}
                {state === "retryable_error" && "Retryable"}
                {state === "awaiting_signature" && "Awaiting Signature"}
                {state === "submitted" && "Submitted"}
                {state === "icm_pending" && "Teleporter Active"}
              </span>

              {chestSlot !== undefined && (
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  {chestType || "Chest"} #{chestSlot}
                </span>
              )}
            </div>

            <h2
              id={titleId}
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#F8FAFC",
                margin: 0,
              }}
            >
              Cross-Chain Teleporter Pipeline
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#94A3B8",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "0.875rem",
              lineHeight: 1,
              transition: "all 0.15s ease",
            }}
          >
            ✕
          </button>
        </div>

        <p
          className={styles.visuallyHidden}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {relayAnnouncement}
        </p>

        {/* Relay Moment: state-derived, never time-simulated. */}
        <section className={styles.relayMoment} aria-labelledby={`${titleId}-relay`}>
          <div className={styles.relayMomentHeader}>
            <h3 id={`${titleId}-relay`} className={styles.relayMomentTitle}>
              Live relay path
            </h3>
            {(state === "icm_pending" || state === "submitted") && (
              <span className={styles.elapsed}>
                Elapsed <strong>{formatSeconds(elapsedSeconds)}</strong>
              </span>
            )}
          </div>

          <ol className={styles.relayTrack} aria-label="Cross-chain relay stages">
            {relayStages.map((stage, index) => (
              <li
                key={stage.id}
                className={styles.relayStage}
                data-status={stage.status}
                data-connector={stage.status === "completed" ? "completed" : "pending"}
                aria-current={stage.status === "in_progress" ? "step" : undefined}
              >
                <span className={styles.relayNode} aria-hidden="true">
                  {stage.status === "completed"
                    ? "✓"
                    : stage.status === "failed"
                      ? "×"
                      : index + 1}
                </span>
                <span className={styles.relayLabel}>{stage.label}</span>
                <span className={styles.relayDetail}>{stage.detail}</span>
                <span className={styles.visuallyHidden}> — {stage.status.replace("_", " ")}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Scrollable Body: Timeline and Graceful Alerts */}
        <div
          style={{
            padding: "20px 24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <aside className={styles.learningCard} aria-labelledby={`${titleId}-lesson`}>
            <p className={styles.learningEyebrow}>{learningCard.eyebrow}</p>
            <h3 id={`${titleId}-lesson`} className={styles.learningTitle}>
              {learningCard.title}
            </h3>
            <p className={styles.learningBody}>{learningCard.body}</p>
          </aside>

          {/* Graceful Waiting Banner: 30s threshold (PRD §8.2 Requirement 3) */}
          {isStillRelaying && state !== "confirmed" && (
            <div
              data-testid="still-relaying-banner"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: 700, color: "#FBBF24", fontSize: "0.875rem" }}>
                    Still relaying...
                  </span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#FCD34D", fontFamily: "monospace" }}>
                  {elapsedSeconds}s elapsed
                </span>
              </div>

              <p style={{ margin: 0, fontSize: "0.8125rem", color: "#FDE68A", lineHeight: 1.4 }}>
                Teleporter message is in transit between Game L1 and Fuji C-Chain. Relayer delivery may take a
                moment during network conditions.
              </p>

              {requestId && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>Request ID:</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <code style={{ color: "#38BDF8", fontFamily: "monospace" }}>
                      {truncateHash(requestId)}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyRequestId}
                      style={{
                        background: "none",
                        border: "none",
                        color: copiedId ? "#34D399" : "#94A3B8",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        padding: "2px 4px",
                      }}
                    >
                      {copiedId ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={checkStatus}
                disabled={isCheckingStatus}
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  border: "1px solid rgba(245, 158, 11, 0.5)",
                  color: "#FBBF24",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: isCheckingStatus ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px", // Mobile touch target
                }}
              >
                {isCheckingStatus ? "Checking status..." : "Check status"}
              </button>
            </div>
          )}

          {/* Graceful Waiting Banner: 60s threshold for Retry (PRD §8.2 Requirement 3) */}
          {canRetry && state !== "confirmed" && (
            <div
              data-testid="retry-message-banner"
              style={{
                backgroundColor: "rgba(249, 115, 22, 0.14)",
                border: "1px solid rgba(249, 115, 22, 0.4)",
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, color: "#FB923C", fontSize: "0.875rem" }}>
                  Message Relay Exceeded 60 Seconds
                </span>
              </div>

              <p style={{ margin: 0, fontSize: "0.8125rem", color: "#FED7AA", lineHeight: 1.4 }}>
                Delivery has taken over 60 seconds. You can safely replay the original message using the
                same Request ID. No additional energy or duplicate deposit will occur.
              </p>

              <button
                type="button"
                onClick={retry}
                disabled={isRetrying}
                style={{
                  backgroundColor: "#EA580C",
                  border: "none",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: isRetrying ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px",
                  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)",
                }}
              >
                {isRetrying ? "Retrying delivery..." : "Retry message"}
              </button>
            </div>
          )}

          {/* Error Banner */}
          {state === "final_error" && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "12px",
                padding: "14px 16px",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", color: "#F87171", fontSize: "0.875rem" }}>
                Transaction Rejection
              </h4>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "#FECACA" }}>
                {errorMessage || "Verification rejected by destination gateway. Energy has been refunded."}
              </p>
            </div>
          )}

          {/* Success Banner */}
          {state === "confirmed" && (
            <div
              className={isCelebrating ? styles.celebration : undefined}
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0", color: "#34D399", fontSize: "1.125rem" }}>
                Cross-Chain Position Confirmed!
              </h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#A7F3D0" }}>
                Position snapshot delivered to Game L1. XP added and Yield Vault position updated on C-Chain.
              </p>
            </div>
          )}

          {/* 2-Chain Visual Timeline Steps (Requirement 2) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4
              style={{
                margin: "4px 0 8px 0",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Two-Chain Execution Timeline
            </h4>

            {timelineSteps.map((step) => {
              const isGameL1 = step.chain === "GAME_L1";

              return (
                <div
                  key={step.id}
                  className={styles.timelineStep}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    backgroundColor:
                      step.status === "completed"
                        ? "rgba(16, 185, 129, 0.08)"
                        : step.status === "in_progress"
                        ? "rgba(56, 189, 248, 0.08)"
                        : step.status === "failed"
                        ? "rgba(239, 68, 68, 0.08)"
                        : "rgba(15, 23, 42, 0.4)",
                    border: `1px solid ${
                      step.status === "completed"
                        ? "rgba(16, 185, 129, 0.3)"
                        : step.status === "in_progress"
                        ? "rgba(56, 189, 248, 0.4)"
                        : step.status === "failed"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "#1E293B"
                    }`,
                  }}
                >
                  {/* Step status icon */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      backgroundColor:
                        step.status === "completed"
                          ? "#10B981"
                          : step.status === "in_progress"
                          ? "#0284C7"
                          : step.status === "failed"
                          ? "#EF4444"
                          : "#1E293B",
                      color: step.status === "pending" ? "#64748B" : "#FFFFFF",
                      boxShadow:
                        step.status === "in_progress"
                          ? "0 0 12px rgba(56, 189, 248, 0.6)"
                          : step.status === "completed"
                          ? "0 0 10px rgba(16, 185, 129, 0.4)"
                          : "none",
                    }}
                  >
                    {step.status === "completed" ? "✓" : step.status === "failed" ? "✕" : step.stepNumber}
                  </div>

                  {/* Step content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: step.status === "pending" ? "#94A3B8" : "#F8FAFC",
                        }}
                      >
                        {step.title}
                      </span>

                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: isGameL1 ? "rgba(99, 102, 241, 0.15)" : "rgba(244, 63, 94, 0.15)",
                          color: isGameL1 ? "#A5B4FC" : "#FDA4AF",
                        }}
                      >
                        {isGameL1 ? "Game L1" : "Fuji C-Chain"}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: step.status === "pending" ? "#64748B" : "#94A3B8",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.description}
                    </p>

                    {step.stepNumber === 1 && txHash && (
                      <div style={{ marginTop: "6px", fontSize: "0.6875rem", color: "#64748B" }}>
                        Tx Hash: <code style={{ color: "#38BDF8" }}>{truncateHash(txHash)}</code>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {state === "confirmed" ? (
            <div className={styles.successActions}>
              <a className={styles.passportLink} href="/passport">
                View Passport
              </a>
              <button
                className={styles.nextButton}
                type="button"
                onClick={() => {
                  if (onSuccessDismiss) onSuccessDismiss();
                  handleClose();
                }}
              >
                {onSuccessDismiss ? "Next checkpoint" : "Done"}
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#94A3B8",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Close in Background
              </button>

              {requestId && (
                <button
                  type="button"
                  onClick={checkStatus}
                  disabled={isCheckingStatus}
                  style={{
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#38BDF8",
                    cursor: isCheckingStatus ? "not-allowed" : "pointer",
                    minHeight: "44px",
                  }}
                >
                  {isCheckingStatus ? "Checking..." : "Refresh Status"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

