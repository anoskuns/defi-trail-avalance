"use client";

import React from "react";

export interface DemoLocationBannerProps {
  activeSlot: number;
  onSlotChange?: (slot: number) => void;
  onDisableDemo?: () => void;
  className?: string;
}

/**
 * Mandatory compliance banner as required by DeFi-Trail-PRD.md §5.2 and Item 5:
 * "BẮT BUỘC hiển thị banner cảnh báo cố định màu vàng: 'Demo location active (mode = DEMO)'"
 */
export function DemoLocationBanner({
  activeSlot,
  onSlotChange,
  onDisableDemo,
  className = "",
}: DemoLocationBannerProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`w-full flex items-center justify-between flex-wrap gap-2 px-4 py-2 bg-yellow-500/15 border-b border-yellow-500/30 text-yellow-200 text-xs sm:text-sm font-medium z-30 ${className}`}
      style={{
        backgroundColor: "rgba(234, 179, 8, 0.18)",
        borderBottom: "1px solid rgba(234, 179, 8, 0.35)",
        color: "#FEF08A",
        padding: "8px 16px",
        fontSize: "0.8125rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Banner label */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#EAB308",
            boxShadow: "0 0 8px #EAB308",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: "0.6875rem",
            backgroundColor: "rgba(234, 179, 8, 0.25)",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid rgba(234, 179, 8, 0.4)",
          }}
        >
          Dev Override
        </span>
        <span style={{ fontWeight: 600 }}>
          Demo location active (mode = DEMO)
        </span>
      </div>

      {/* Controls: switch slot / turn off */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.75rem", color: "#FDE047" }}>
          Current Seed:
        </span>
        <div style={{ display: "inline-flex", gap: "4px" }}>
          <button
            type="button"
            onClick={() => onSlotChange?.(0)}
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeSlot === 0 ? "1px solid #EAB308" : "1px solid rgba(234, 179, 8, 0.3)",
              backgroundColor: activeSlot === 0 ? "#EAB308" : "transparent",
              color: activeSlot === 0 ? "#000000" : "#FEF08A",
            }}
          >
            Chest #0 (Library)
          </button>
          <button
            type="button"
            onClick={() => onSlotChange?.(1)}
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeSlot === 1 ? "1px solid #EAB308" : "1px solid rgba(234, 179, 8, 0.3)",
              backgroundColor: activeSlot === 1 ? "#EAB308" : "transparent",
              color: activeSlot === 1 ? "#000000" : "#FEF08A",
            }}
          >
            Chest #1 (Engineering)
          </button>
        </div>

        {onDisableDemo && (
          <button
            type="button"
            onClick={onDisableDemo}
            aria-label="Disable demo location"
            style={{
              marginLeft: "4px",
              background: "none",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              borderRadius: "4px",
              color: "#FEF08A",
              padding: "2px 6px",
              fontSize: "0.6875rem",
              cursor: "pointer",
            }}
          >
            Switch to Live GPS
          </button>
        )}
      </div>
    </div>
  );
}

