"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { TestnetBanner } from "./TestnetBanner";
import { GasBalance } from "./GasBalance";
import { NetworkSwitcher } from "./NetworkSwitcher";
import { AddressBadge } from "./AddressBadge";
import { ConnectWalletButton } from "./ConnectWalletButton";

export interface WalletHeaderProps {
  className?: string;
  showTestnetBanner?: boolean;
}

/**
 * Main application header implementing:
 * 1. Persistent mandatory testnet disclaimer: "Fuji testnet demo — no real funds" (Item 5 & PRD §4.1)
 * 2. Shortened address (0x12...34) (Item 4)
 * 3. Current active network indicator (Item 4)
 * 4. Native gas balance on the active chain (Item 4)
 * 5. Quick network switch button (Item 4)
 * 6. Email Embedded Wallet & Core Wallet options (Item 1, FR-001, FR-002)
 */
export function WalletHeader({
  className = "",
  showTestnetBanner = true,
}: WalletHeaderProps) {
  const account = useActiveAccount();

  return (
    <header
      className={`w-full flex flex-col border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 ${className}`}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(11, 15, 25, 0.95)",
        borderBottom: "1px solid #1E293B",
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* 1. Mandatory Testnet Banner (Requirement 5) */}
      {showTestnetBanner && <TestnetBanner />}

      {/* 2. Main Navigation Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          gap: "12px",
          flexWrap: "wrap",
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#E84142",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "1.1rem",
              boxShadow: "0 0 12px rgba(232, 65, 66, 0.5)",
              flexShrink: 0,
            }}
          >
            ▲
          </div>
          <div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#F8FAFC",
                lineHeight: 1.2,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>DeFi Trail</span>
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "#94A3B8",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  border: "1px solid #334155",
                  letterSpacing: "0.05em",
                }}
              >
                AVALANCHE
              </span>
            </div>
            <div style={{ fontSize: "0.6875rem", color: "#64748B" }}>
              Explore • Earn • Learn
            </div>
          </div>
        </div>

        {/* Right Section: Network, Gas, Address & Connect controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {account ? (
            <>
              {/* Native Gas Balance (Requirement 4) */}
              <GasBalance />

              {/* Current Network & 1-Click Quick Switch (Requirement 4) */}
              <NetworkSwitcher />

              {/* Shortened Address (0x12...34) & Account menu (Requirement 4) */}
              <AddressBadge />
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: "#64748B",
                  display: "none",
                }}
                className="hidden md:block"
              >
                Email or Core Wallet
              </div>
              <ConnectWalletButton label="Connect Wallet" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

