"use client";

import type { CSSProperties } from "react";
import type { TrailDefinition, TrailProgress } from "@defi-trail/shared";
import {
  deriveTrailProgressView,
  type TrailEvidenceSignal,
  type TrailCheckpointStatus,
} from "./model";

export type TodayTrailCardState =
  | { kind: "loading" }
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | { kind: "ended"; title: string }
  | {
      kind: "ready";
      trail: TrailDefinition;
      progress: TrailProgress | null;
      evidence: TrailEvidenceSignal;
    };

export interface TodayTrailCardProps {
  state: TodayTrailCardState;
  onStart?: () => void;
  onFocusChest?: (chestId: string, checkpointPosition: number) => void;
  onResumeEvidence?: () => void;
  onRetry?: () => void;
}

const cardStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "20px",
  background:
    "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(19, 27, 46, 0.98))",
  boxShadow: "0 12px 36px rgba(0, 0, 0, 0.24)",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  minHeight: "48px",
  border: "1px solid rgba(56, 189, 248, 0.55)",
  borderRadius: "12px",
  padding: "12px 16px",
  backgroundColor: "#0EA5E9",
  color: "#082F49",
  fontSize: "0.9375rem",
  fontWeight: 800,
  cursor: "pointer",
};

const statusStyle: Record<TrailCheckpointStatus, CSSProperties> = {
  locked: { color: "#94A3B8", backgroundColor: "rgba(100, 116, 139, 0.14)" },
  available: { color: "#7DD3FC", backgroundColor: "rgba(14, 165, 233, 0.14)" },
  pending: { color: "#FDE68A", backgroundColor: "rgba(245, 158, 11, 0.14)" },
  confirmed: { color: "#6EE7B7", backgroundColor: "rgba(16, 185, 129, 0.14)" },
};

const statusLabel: Record<TrailCheckpointStatus, string> = {
  locked: "Locked",
  available: "Available",
  pending: "Confirming",
  confirmed: "Confirmed",
};

function StateMessage({
  eyebrow,
  title,
  message,
  actionLabel,
  onAction,
}: {
  eyebrow: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <section style={cardStyle} aria-live="polite" aria-busy={eyebrow === "Loading"}>
      <p style={{ color: "#38BDF8", fontSize: "0.75rem", fontWeight: 800, margin: 0 }}>
        {eyebrow}
      </p>
      <h2 style={{ color: "#F8FAFC", fontSize: "1.25rem", margin: "8px 0" }}>
        {title}
      </h2>
      <p style={{ color: "#CBD5E1", lineHeight: 1.6, margin: 0 }}>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" onClick={onAction} style={{ ...buttonStyle, marginTop: "16px" }}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export function TodayTrailCard({
  state,
  onStart,
  onFocusChest,
  onResumeEvidence,
  onRetry,
}: TodayTrailCardProps) {
  if (state.kind === "loading") {
    return (
      <StateMessage
        eyebrow="Loading"
        title="Finding today’s trail"
        message="Checking the active season and campus checkpoints."
      />
    );
  }
  if (state.kind === "empty") {
    return (
      <StateMessage
        eyebrow="No active trail"
        title="Nothing scheduled today"
        message="The map is still available. Check back when the next trail opens."
      />
    );
  }
  if (state.kind === "ended") {
    return (
      <StateMessage
        eyebrow="Trail ended"
        title={state.title}
        message="This trail’s active window has closed. Confirmed evidence remains available in your progress history."
      />
    );
  }
  if (state.kind === "error") {
    return (
      <StateMessage
        eyebrow="Unable to load"
        title="Today’s Trail is temporarily unavailable"
        message={state.message}
        actionLabel="Try again"
        onAction={onRetry}
      />
    );
  }

  const { trail, progress, evidence } = state;
  const view = deriveTrailProgressView(trail, progress, evidence);
  const progressPercent = Math.round(
    (view.confirmedCount / trail.checkpoints.length) * 100,
  );
  const cta = !progress
    ? { label: "Start trail", action: onStart }
    : view.isComplete
      ? { label: "Trail complete", action: undefined }
      : view.pendingCheckpoint
        ? { label: "Resume confirmation", action: onResumeEvidence }
        : view.nextCheckpoint
          ? {
              label: `Focus next: ${view.nextCheckpoint.title}`,
              action: () =>
                onFocusChest?.(
                  view.nextCheckpoint!.chestId,
                  view.nextCheckpoint!.position,
                ),
            }
          : { label: "Resume trail", action: onStart };

  return (
    <section id="today-trail" style={cardStyle} aria-labelledby="today-trail-title">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: "#38BDF8", fontSize: "0.75rem", fontWeight: 800, margin: 0 }}>
            TODAY’S TRAIL
          </p>
          <h2 id="today-trail-title" tabIndex={-1} style={{ color: "#F8FAFC", fontSize: "1.35rem", margin: "6px 0" }}>
            {trail.title}
          </h2>
          <p style={{ color: "#CBD5E1", lineHeight: 1.55, margin: 0, maxWidth: "620px" }}>
            {trail.description}
          </p>
        </div>
        <div style={{ alignSelf: "flex-start", border: "1px solid #334155", borderRadius: "999px", padding: "7px 11px", color: "#CBD5E1", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
          About {trail.estimatedMinutes} min
        </div>
      </div>

      <div style={{ marginTop: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#CBD5E1", fontSize: "0.8125rem" }}>
          <span>{progress ? "Trail in progress" : "Ready to start"}</span>
          <span>{view.confirmedCount} of {trail.checkpoints.length} confirmed</span>
        </div>
        <div role="progressbar" aria-label="Trail checkpoint progress" aria-valuemin={0} aria-valuemax={trail.checkpoints.length} aria-valuenow={view.confirmedCount} style={{ height: "8px", marginTop: "8px", borderRadius: "999px", overflow: "hidden", backgroundColor: "#1E293B" }}>
          <div style={{ width: `${progressPercent}%`, height: "100%", backgroundColor: view.isComplete ? "#10B981" : "#38BDF8", transition: "width 180ms ease-out" }} />
        </div>
      </div>

      <ol aria-label="Trail checkpoints" style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: "10px" }}>
        {view.checkpoints.map((checkpoint, index) => (
          <li key={checkpoint.checkpointId} style={{ display: "grid", gridTemplateColumns: "36px minmax(0, 1fr) auto", alignItems: "center", gap: "12px", minHeight: "64px", padding: "10px 12px", border: "1px solid #334155", borderRadius: "12px", backgroundColor: "rgba(15, 23, 42, 0.72)" }}>
            <span aria-hidden="true" style={{ width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", color: "#E2E8F0", backgroundColor: "#1E293B", fontWeight: 800 }}>
              {index + 1}
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", color: "#F8FAFC", fontWeight: 700 }}>{checkpoint.title}</span>
              {checkpoint.description ? (
                <span style={{ display: "block", color: "#94A3B8", fontSize: "0.75rem", marginTop: "2px" }}>{checkpoint.description}</span>
              ) : null}
            </span>
            <span style={{ ...statusStyle[checkpoint.status], borderRadius: "999px", padding: "5px 8px", fontSize: "0.6875rem", fontWeight: 800, whiteSpace: "nowrap" }}>
              {statusLabel[checkpoint.status]}
            </span>
          </li>
        ))}
      </ol>

      {view.isComplete ? (
        <div role="status" style={{ marginTop: "16px", border: "1px solid rgba(16, 185, 129, 0.45)", borderRadius: "12px", padding: "14px", color: "#A7F3D0", backgroundColor: "rgba(16, 185, 129, 0.12)" }}>
          <strong style={{ display: "block" }}>Trail confirmed</strong>
          <span style={{ display: "block", marginTop: "3px", fontSize: "0.8125rem" }}>
            All checkpoint evidence reached the terminal CONFIRMED state.
          </span>
        </div>
      ) : null}

      <button
        type="button"
        onClick={cta.action}
        disabled={!cta.action}
        style={{
          ...buttonStyle,
          marginTop: "18px",
          ...(cta.action
            ? {}
            : { cursor: "default", opacity: 0.72, backgroundColor: "#334155", color: "#E2E8F0", borderColor: "#475569" }),
        }}
      >
        {cta.label}
      </button>
      <p style={{ color: "#94A3B8", fontSize: "0.75rem", lineHeight: 1.5, margin: "10px 0 0" }}>
        A checkpoint counts only after ICM reports CONFIRMED. Pending requests never complete the trail.
      </p>
    </section>
  );
}
