"use client";

import React from "react";
import { useActiveAccount, useActiveWalletChain, useWalletBalance } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb";
import { DEFAULT_CHAIN, getChainById } from "@/lib/chains";

export interface GasBalanceProps {
  className?: string;
}

/**
 * Component to display the native gas token balance of the active wallet
 * on the currently connected chain (or default chain).
 */
export function GasBalance({ className = "" }: GasBalanceProps) {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain() || DEFAULT_CHAIN;

  const { data: balanceData, isLoading, isError, refetch } = useWalletBalance({
    client: thirdwebClient,
    chain: activeChain,
    address: account?.address,
  });

  if (!account) {
    return null;
  }

  const chainConfig = getChainById(activeChain.id);
  const symbol = balanceData?.symbol || chainConfig?.nativeCurrency?.symbol || "GAS";

  let formattedAmount = "0.0000";
  if (balanceData?.displayValue) {
    const num = parseFloat(balanceData.displayValue);
    formattedAmount = isNaN(num) ? "0.0000" : num.toFixed(4);
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200 ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "8px",
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        border: "1px solid rgba(51, 65, 85, 0.6)",
        fontSize: "0.75rem",
        color: "#E2E8F0",
        fontWeight: 500,
        minHeight: "36px",
      }}
      title={`Native Gas Balance on ${activeChain.name || "active chain"}. Click to refresh.`}
    >
      <span
        style={{
          color: "#94A3B8",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Gas:
      </span>
      {isLoading ? (
        <span style={{ color: "#64748B" }}>loading...</span>
      ) : isError ? (
        <span style={{ color: "#EF4444" }}>0.0000 {symbol}</span>
      ) : (
        <span
          style={{
            color: "#38BDF8",
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          {formattedAmount} {symbol}
        </span>
      )}
      <button
        type="button"
        onClick={() => refetch()}
        aria-label="Refresh gas balance"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          color: "#94A3B8",
          display: "flex",
          alignItems: "center",
          marginLeft: "2px",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
      </button>
    </div>
  );
}

