"use client";

import React from "react";
import type { SelectedChest } from "./types";
import { getChestLandmark } from "./geo-utils";

export interface ChestBottomSheetProps {
  chest: SelectedChest | null;
  openRadius: number;
  powerLevel: number;
  onClose: () => void;
  onOpenChest?: (chest: SelectedChest) => void;
  isOpening?: boolean;
}

/**
 * Bottom Sheet drawer displaying chest details (Requirement 6 & PRD §8.3):
 * - Chest Type (Yield, Quest, Sponsor)
 * - Current distance & range status
 * - Expected deterministic reward
 * - Energy cost (1 Energy per PRD §5.3)
 */
export function ChestBottomSheet({
  chest,
  openRadius,
  powerLevel,
  onClose,
  onOpenChest,
  isOpening = false,
}: ChestBottomSheetProps) {
  if (!chest) return null;

  const landmark = getChestLandmark(chest.slot, chest.type);
  const roundedDistance = Math.round(chest.distanceMeters);
  const remainingMeters = Math.max(0, roundedDistance - openRadius);

  const getTypeStyle = () => {
    switch (chest.type) {
      case "YIELD":
        return {
          title: "Yield Chest",
          icon: "🪙",
          color: "#F59E0B",
          bg: "rgba(245, 158, 11, 0.15)",
          border: "rgba(245, 158, 11, 0.3)",
          desc: "Sponsored continuous yield deposit funded by C-Chain SponsorPool.",
        };
      case "QUEST":
        return {
          title: "Quest Chest",
          icon: "📜",
          color: "#A855F7",
          bg: "rgba(168, 85, 247, 0.15)",
          border: "rgba(168, 85, 247, 0.3)",
          desc: "Tutorial quest deposit. Learn DeFi staking with sponsored budget.",
        };
      case "SPONSOR":
        return {
          title: "Sponsor Chest",
          icon: "☕",
          color: "#10B981",
          bg: "rgba(16, 185, 129, 0.15)",
          border: "rgba(16, 185, 129, 0.3)",
          desc: "Merchant campaign chest. Requires QR proof verification at location.",
        };
    }
  };

  const typeMeta = getTypeStyle();

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          zIndex: 45,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${typeMeta.title} Details`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0F172A",
          borderTop: "1px solid #334155",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px 20px 28px 20px",
          zIndex: 50,
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.6)",
          boxSizing: "border-box",
          animation: "slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Pull Handle */}
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#475569",
            margin: "0 auto 16px auto",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: typeMeta.bg,
                border: `1px solid ${typeMeta.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              {typeMeta.icon}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#F8FAFC",
                    margin: 0,
                  }}
                >
                  {typeMeta.title}
                </h2>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(51, 65, 85, 0.6)",
                    color: "#94A3B8",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  Slot #{chest.slot}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "#94A3B8",
                  margin: "2px 0 0 0",
                }}
              >
                {landmark}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chest sheet"
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#94A3B8",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "36px",
              minHeight: "36px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Distance & Range Status Badge (Requirement 6) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: "10px",
            backgroundColor: chest.inRange
              ? "rgba(16, 185, 129, 0.12)"
              : "rgba(234, 179, 8, 0.12)",
            border: chest.inRange
              ? "1px solid rgba(16, 185, 129, 0.3)"
              : "1px solid rgba(234, 179, 8, 0.3)",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: chest.inRange ? "#10B981" : "#EAB308",
              }}
            />
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: chest.inRange ? "#34D399" : "#FDE047",
              }}
            >
              {chest.inRange ? "IN RANGE (Ready to Open)" : "OUT OF RANGE"}
            </span>
          </div>

          <div
            style={{
              fontSize: "0.8125rem",
              fontFamily: "monospace",
              fontWeight: 700,
              color: chest.inRange ? "#10B981" : "#FDE047",
            }}
          >
            {roundedDistance}m
            {!chest.inRange && (
              <span style={{ fontSize: "0.6875rem", color: "#94A3B8", fontWeight: 400, marginLeft: "4px" }}>
                (need {remainingMeters}m closer)
              </span>
            )}
          </div>
        </div>

        {/* Details Grid: Reward, Energy, Radius */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          {/* Expected Reward Card (Requirement 6) */}
          <div
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid #1E293B",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "0.6875rem", color: "#64748B", textTransform: "uppercase", fontWeight: 600 }}>
              Expected Reward
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#38BDF8", marginTop: "2px" }}>
              ${chest.reward.amountUsdc.toFixed(2)}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: "2px" }}>
              {chest.reward.simulatedApr || "Mock USDC"}
            </div>
          </div>

          {/* Energy Cost Card (Requirement 6: 1 Energy) */}
          <div
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid #1E293B",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "0.6875rem", color: "#64748B", textTransform: "uppercase", fontWeight: 600 }}>
              Energy Cost
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#FBBF24", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>⚡ 1 Energy</span>
            </div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: "2px" }}>
              PRD §5.3 standard cost
            </div>
          </div>
        </div>

        {/* Radius context note */}
        <div
          style={{
            fontSize: "0.6875rem",
            color: "#64748B",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Your Open Radius: <strong style={{ color: "#E2E8F0" }}>{openRadius}m</strong> (Power Level {powerLevel})</span>
          <span>H3 Cell: <code style={{ color: "#94A3B8" }}>{chest.h3Cell.slice(0, 8)}...</code></span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={!chest.inRange || isOpening}
          onClick={() => onOpenChest?.(chest)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: chest.inRange ? "#E84142" : "#334155",
            color: chest.inRange ? "#FFFFFF" : "#64748B",
            fontSize: "0.9375rem",
            fontWeight: 700,
            cursor: chest.inRange && !isOpening ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.15s ease",
            minHeight: "44px", // PRD §7 touch target
          }}
        >
          {isOpening ? (
            <span>Opening Chest...</span>
          ) : chest.inRange ? (
            <>
              <span>Open {typeMeta.title}</span>
              <span>(⚡ 1 Energy)</span>
            </>
          ) : (
            <span>Move Closer to Unlock ({remainingMeters}m remaining)</span>
          )}
        </button>
      </aside>
    </>
  );
}

