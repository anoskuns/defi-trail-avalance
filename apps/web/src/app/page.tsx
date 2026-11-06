"use client";

import React from "react";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/wallet/NetworkSwitcher";
import { GasBalance } from "@/components/wallet/GasBalance";
import { formatShortAddress, fujiChain, gameL1Chain } from "@/lib/chains";
import { InteractiveMap } from "@/components/map/InteractiveMap";

export default function HomePage() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Welcome / Onboarding Card */}
      <div
        style={{
          backgroundColor: "#131B2E",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span
            style={{
              backgroundColor: "rgba(232, 65, 66, 0.15)",
              color: "#F87171",
              border: "1px solid rgba(232, 65, 66, 0.3)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Phase 1 • Wallet Onboarding
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#F8FAFC",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          {account ? "Wallet Ready for DeFi Trail" : "Welcome to DeFi Trail"}
        </h1>

        <p
          style={{
            fontSize: "0.9375rem",
            color: "#94A3B8",
            lineHeight: 1.5,
            marginBottom: "20px",
            maxWidth: "680px",
          }}
        >
          {account
            ? "Your wallet is connected and authenticated. You can switch between Avalanche Game L1 and Avalanche Fuji C-Chain seamlessly."
            : "Explore real-world GPS coordinates to unlock sponsored DeFi yields. Connect instantly via Email Embedded Wallet (no seed phrase required) or use your Avalanche Core Wallet."}
        </p>

        {/* Authentication State Card */}
        {account ? (
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748B", textTransform: "uppercase" }}>Connected Account</span>
                <div style={{ fontSize: "0.9375rem", fontFamily: "monospace", color: "#38BDF8", fontWeight: 600 }}>
                  {account.address}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <GasBalance />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingTop: "8px", borderTop: "1px solid #1E293B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Network:</span>
                <NetworkSwitcher />
              </div>

              <div style={{ fontSize: "0.75rem", color: "#10B981", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                Session persistent across reload (FR-001)
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1E293B",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <ConnectWalletButton label="Get Started with Email / Core" />
              <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
                Two authentication modes supported (FR-001 / FR-002)
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "4px" }}>
                  ✉️ Email Embedded Wallet (Primary)
                </div>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Instant OTP verification. No seed phrase required. Private key managed securely by wallet enclave.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "4px" }}>
                  🔺 Avalanche Core Wallet (Fallback)
                </div>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Direct connection with Core extension or mobile app. Full manual key control.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Map Section (PRD §4.1, 5.2, 8.3, 11.2) */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        aria-label="Interactive Demo Campus Map"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#F8FAFC",
                letterSpacing: "-0.01em",
              }}
            >
              Demo Campus Map (PRD §11.2)
            </h2>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#94A3B8",
                marginTop: "2px",
              }}
            >
              5 active chests • Virtual Compass HUD • Open radius 30m–45m • Dev Demo Location toggle
            </p>
          </div>
        </div>

        <InteractiveMap
          initialPowerLevel={0}
          onChestOpened={(chest) => {
            console.log("Chest selected to open:", chest.chestId);
          }}
        />
      </section>

      {/* Network Specifications Card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Game L1 Card */}
        <div
          style={{
            backgroundColor: "#131B2E",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#6EE7B7" }}>
              ⚡ {gameL1Chain.name}
            </span>
            <span style={{ fontSize: "0.6875rem", fontFamily: "monospace", color: "#64748B" }}>
              ID: {gameL1Chain.id}
            </span>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "#94A3B8", marginBottom: "12px" }}>
            Dedicated high-throughput Subnet handling LocationProofs, energy mechanics, and gameplay transactions.
          </p>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Native Currency: <strong style={{ color: "#E2E8F0" }}>GAS</strong> (18 decimals)
          </div>
        </div>

        {/* Fuji C-Chain Card */}
        <div
          style={{
            backgroundColor: "#131B2E",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#FCA5A5" }}>
              🔺 {fujiChain.name}
            </span>
            <span style={{ fontSize: "0.6875rem", fontFamily: "monospace", color: "#64748B" }}>
              ID: {fujiChain.id}
            </span>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "#94A3B8", marginBottom: "12px" }}>
            Avalanche testnet host for SponsorPool, MockUSDC, YieldVault, and QuestRouter settlements.
          </p>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Native Currency: <strong style={{ color: "#E2E8F0" }}>AVAX</strong> (18 decimals)
          </div>
        </div>
      </div>
    </div>
  );
}
