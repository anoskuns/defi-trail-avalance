"use client";

import React from "react";

export interface TestnetBannerProps {
  className?: string;
}

/**
 * Mandatory compliance banner as required by DeFi-Trail-PRD.md §4.1 and Item 5:
 * "Luôn hiển thị nhãn bắt buộc: 'Fuji testnet demo — no real funds'."
 */
export function TestnetBanner({ className = "" }: TestnetBannerProps) {
  return (
    <aside
      aria-label="Testnet disclosure"
      role="note"
      className={`w-full bg-amber-500/10 border-b border-amber-500/20 text-amber-200 px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 select-none z-50 ${className}`}
      style={{
        backgroundColor: "rgba(245, 158, 11, 0.12)",
        borderBottom: "1px solid rgba(245, 158, 11, 0.25)",
        color: "#FDE68A",
        padding: "8px 16px",
        fontSize: "0.8125rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          boxShadow: "0 0 6px #F59E0B",
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      <span className="font-semibold uppercase tracking-wider text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
        Demo Mode
      </span>
      <span>Fuji testnet demo — no real funds</span>
    </aside>
  );
}

