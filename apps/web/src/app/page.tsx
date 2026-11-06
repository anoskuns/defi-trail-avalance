"use client";

import React from "react";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/wallet/NetworkSwitcher";
import { GasBalance } from "@/components/wallet/GasBalance";
import { formatShortAddress, fujiChain, gameL1Chain } from "@/lib/chains";
import {
  InteractiveMap,
  type MapFocusRequest,
} from "@/components/map/InteractiveMap";
import { ICMProgressModal, useICMProgress, RequestStatus } from "@/components/cross-chain";
import { QuestTutorialModal } from "@/components/quest";
import { SponsorScannerModal } from "@/components/sponsor";
import { PositionView } from "@/components/position";
import { TodayTrailSection } from "@/features/gameplay/trails";

export default function HomePage() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const [mainTab, setMainTab] = React.useState<"map" | "position">("map");
  const [questModalOpen, setQuestModalOpen] = React.useState<boolean>(false);
  const [sponsorModalOpen, setSponsorModalOpen] = React.useState<boolean>(false);
  const [selectedChestForModal, setSelectedChestForModal] = React.useState<any>(null);
  const [mapFocusRequest, setMapFocusRequest] =
    React.useState<MapFocusRequest | null>(null);

  // Active timers ref to prevent memory leaks and dangling intervals
  const simulationTimersRef = React.useRef<NodeJS.Timeout[]>([]);

  const clearSimulationTimers = React.useCallback(() => {
    simulationTimersRef.current.forEach((t) => clearTimeout(t));
    simulationTimersRef.current = [];
  }, []);

  React.useEffect(() => {
    return () => {
      clearSimulationTimers();
    };
  }, [clearSimulationTimers]);

  const onCheckStatus = React.useCallback(async (requestId: string) => {
    console.log("[ICM] Checking on-chain status for:", requestId);
    // In demo environment, manual status checks resolve directly to CONFIRMED
    return RequestStatus.CONFIRMED;
  }, []);

  const onRetry = React.useCallback(async (requestId: string) => {
    console.log("[ICM] Retrying message dispatch for:", requestId);
    clearSimulationTimers();
    if (icmRef.current) {
      icmRef.current.setOnChainStatus(RequestStatus.SENT);
      const t1 = setTimeout(() => {
        icmRef.current?.setOnChainStatus(RequestStatus.REMOTE_EXECUTED);
      }, 1200);
      const t2 = setTimeout(() => {
        icmRef.current?.setOnChainStatus(RequestStatus.ACK_PENDING);
      }, 2200);
      const t3 = setTimeout(() => {
        icmRef.current?.setConfirmed();
      }, 3200);
      simulationTimersRef.current.push(t1, t2, t3);
    }
  }, [clearSimulationTimers]);

  const icm = useICMProgress({
    onCheckStatus,
    onRetry,
  });

  const icmRef = React.useRef(icm);
  React.useEffect(() => {
    icmRef.current = icm;
  }, [icm]);

  const trailEvidence = React.useMemo(
    () => ({
      state: icm.state,
      requestId: icm.requestId || undefined,
      chestSlot: icm.chestSlot,
    }),
    [icm.chestSlot, icm.requestId, icm.state],
  );

  // Complete 5-Step Cross-Chain Simulation Pipeline (PRD §8.2, §9.3)
  const runIcmSimulation = React.useCallback(
    (chestSlot: number, chestType: string, chestId?: string) => {
      clearSimulationTimers();

      const finalRequestId =
        chestId ||
        `0x${(chestSlot + 1).toString().repeat(64)}`;
      const dummyTxHash = "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b";

      // Step 0: Awaiting user signature (instant)
      icmRef.current.startRequest({
        chestSlot,
        chestType,
        player: account?.address,
      });

      // Step 1: Game L1 ChestManager.openChest submitted (800ms)
      const t1 = setTimeout(() => {
        icmRef.current.setSubmitted(dummyTxHash);
      }, 800);

      // Step 2: Teleporter cross-chain message dispatched to messenger queue (2000ms)
      const t2 = setTimeout(() => {
        icmRef.current.setPending(finalRequestId, dummyTxHash);
        icmRef.current.setOnChainStatus(RequestStatus.SENT);
      }, 2000);

      // Step 3: Fuji C-Chain relayer executed & capital allocated in YieldVault (4500ms)
      const t3 = setTimeout(() => {
        icmRef.current.setOnChainStatus(RequestStatus.REMOTE_EXECUTED);
      }, 4500);

      // Step 4: PositionSnapshot ack dispatched back to Game L1 (7000ms)
      const t4 = setTimeout(() => {
        icmRef.current.setOnChainStatus(RequestStatus.ACK_PENDING);
      }, 7000);

      // Step 5: CONFIRMED on Game L1 (9200ms)
      const t5 = setTimeout(() => {
        icmRef.current.setConfirmed();
      }, 9200);

      simulationTimersRef.current.push(t1, t2, t3, t4, t5);
    },
    [account?.address, clearSimulationTimers]
  );

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

      {/* Main Feature Navigation (PRD §8.3 Core screens) */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          borderBottom: "1px solid #1E293B",
          paddingBottom: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => setMainTab("map")}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 700,
            backgroundColor: mainTab === "map" ? "rgba(56, 189, 248, 0.2)" : "transparent",
            color: mainTab === "map" ? "#38BDF8" : "#94A3B8",
            border: mainTab === "map" ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid transparent",
            cursor: "pointer",
          }}
        >
          🗺️ Bản Đồ Khám Phá (Campus Map)
        </button>
        <button
          type="button"
          onClick={() => setMainTab("position")}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 700,
            backgroundColor: mainTab === "position" ? "rgba(52, 211, 153, 0.2)" : "transparent",
            color: mainTab === "position" ? "#34D399" : "#94A3B8",
            border: mainTab === "position" ? "1px solid rgba(52, 211, 153, 0.4)" : "1px solid transparent",
            cursor: "pointer",
          }}
        >
          💎 Vị Thế & Rút Vốn (YieldVault)
        </button>
      </div>

      {mainTab === "map" ? (
        /* Interactive Map Section (PRD §4.1, 5.2, 8.3, 11.2) */
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          aria-label="Interactive Demo Campus Map"
        >
          <TodayTrailSection
            player={account?.address}
            evidence={trailEvidence}
            onFocusChest={(chestId, checkpointPosition) => {
              setMapFocusRequest((current) => ({
                chestId,
                slot: checkpointPosition,
                requestId: (current?.requestId ?? 0) + 1,
              }));
            }}
            onResumeEvidence={() => icm.setIsOpen(true)}
          />

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
            focusChestRequest={mapFocusRequest}
            onChestOpened={(chest) => {
              if (chest.type === "QUEST") {
                setSelectedChestForModal(chest);
                setQuestModalOpen(true);
              } else if (chest.type === "SPONSOR") {
                setSelectedChestForModal(chest);
                setSponsorModalOpen(true);
              } else {
                runIcmSimulation(chest.slot, chest.type, chest.chestId);
              }
            }}
          />
        </section>
      ) : (
        <PositionView
          playerWallet={account?.address}
          initialPrincipal={5.0}
          initialAccruedReward={1.25}
          simulatedAprBps={625}
          streakDays={4}
          onRequestWithdrawal={async (amount) => {
            console.log("Withdrawing from YieldVault:", amount);
          }}
        />
      )}

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

      {/* Cross-Chain ICM Progress Modal (PRD §8.2, §9.3) */}
      <ICMProgressModal
        isOpen={icm.isOpen}
        onClose={icm.closeModal}
        progress={icm}
        onSuccessDismiss={() => {
          icm.closeModal();
        }}
      />

      {/* Quest Tutorial & Budget Deposit Modal (PRD §4.3) */}
      <QuestTutorialModal
        isOpen={questModalOpen}
        onClose={() => setQuestModalOpen(false)}
        questId={selectedChestForModal?.chestId}
        questTier={selectedChestForModal?.slot === 4 ? 2 : 1}
        requiredAmountUsdc={selectedChestForModal?.slot === 4 ? 1.0 : 0.5}
        playerWallet={account?.address}
        onComplete={() => {
          setQuestModalOpen(false);
          runIcmSimulation(
            selectedChestForModal?.slot ?? 1,
            "QUEST",
            selectedChestForModal?.chestId
          );
        }}
      />

      {/* Sponsor QR Camera & Code Scanner Modal (PRD §4.4) */}
      <SponsorScannerModal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
        chestId={selectedChestForModal?.chestId}
        walletAddress={account?.address}
        onProofReceived={() => {
          setSponsorModalOpen(false);
          runIcmSimulation(
            selectedChestForModal?.slot ?? 2,
            "SPONSOR",
            selectedChestForModal?.chestId
          );
        }}
      />
    </div>
  );
}
