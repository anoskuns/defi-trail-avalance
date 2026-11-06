"use client";

import React, { useState, useMemo } from "react";
import {
  calculateBalanceTier,
  calculateStreakTier,
  calculatePowerLevel,
  calculateEnergyMax,
  calculateOpenRadius,
} from "@defi-trail/shared";

export interface PositionViewProps {
  playerWallet?: string;
  initialPrincipal?: number;
  initialAccruedReward?: number;
  simulatedAprBps?: number;
  streakDays?: number;
  onWithdrawConfirmed?: (withdrawnAmount: number, remainingAssets: number) => void;
  onRequestWithdrawal?: (amount: number) => Promise<string | void> | string | void;
}

export function PositionView({
  playerWallet,
  initialPrincipal = 5.0,
  initialAccruedReward = 1.25,
  simulatedAprBps = 625, // 6.25% APR
  streakDays = 4,
  onWithdrawConfirmed,
  onRequestWithdrawal,
}: PositionViewProps) {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [accruedReward, setAccruedReward] = useState<number>(initialAccruedReward);
  const totalAssets = principal + accruedReward;

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [withdrawStage, setWithdrawStage] = useState<
    "idle" | "awaiting_cchain" | "icm_snapshot" | "confirmed" | "error"
  >("idle");
  const [txHash, setTxHash] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 1. Current Stats Calculations (PRD §5.4)
  const currentStats = useMemo(() => {
    const rawAssetsBigInt = BigInt(Math.max(0, Math.floor(totalAssets * 1_000_000)));
    const balanceTier = calculateBalanceTier(rawAssetsBigInt);
    const streakTier = calculateStreakTier(streakDays);
    const powerLevel = calculatePowerLevel(balanceTier, streakTier);
    const energyMax = calculateEnergyMax(powerLevel);
    const openRadius = calculateOpenRadius(powerLevel);

    return {
      balanceTier,
      streakTier,
      powerLevel,
      energyMax,
      openRadius,
    };
  }, [totalAssets, streakDays]);

  // 2. Live Preview Calculations After Simulated Withdrawal (PRD §4.5, FR-015)
  const previewStats = useMemo(() => {
    const remainingAssets = Math.max(0, totalAssets - withdrawAmount);
    // PRD §5.4: If assets drop below 1.0 Mock USDC, qualifyingSince is cleared and streak resets to 0
    const newStreakDays = remainingAssets < 1.0 ? 0 : streakDays;
    const remainingRawBigInt = BigInt(Math.max(0, Math.floor(remainingAssets * 1_000_000)));
    const newBalanceTier = calculateBalanceTier(remainingRawBigInt);
    const newStreakTier = calculateStreakTier(newStreakDays);
    const newPowerLevel = calculatePowerLevel(newBalanceTier, newStreakTier);
    const newEnergyMax = calculateEnergyMax(newPowerLevel);
    const newOpenRadius = calculateOpenRadius(newPowerLevel);

    return {
      remainingAssets,
      newStreakDays,
      newBalanceTier,
      newStreakTier,
      newPowerLevel,
      newEnergyMax,
      newOpenRadius,
      powerDiff: newPowerLevel - currentStats.powerLevel,
      energyDiff: newEnergyMax - currentStats.energyMax,
      radiusDiff: newOpenRadius - currentStats.openRadius,
      streakReset: remainingAssets < 1.0 && streakDays > 0,
    };
  }, [totalAssets, withdrawAmount, streakDays, currentStats]);

  // 3. Handle Withdrawal Submission
  const handleConfirmWithdrawal = async () => {
    if (withdrawAmount <= 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setWithdrawStage("awaiting_cchain");

      // 1. Send C-Chain withdrawal transaction
      if (onRequestWithdrawal) {
        const hash = await onRequestWithdrawal(withdrawAmount);
        if (typeof hash === "string") setTxHash(hash);
      } else {
        // Simulated contract latency on C-Chain
        await new Promise((resolve) => setTimeout(resolve, 1400));
        setTxHash("0x9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d");
      }

      // 2. Teleporter PositionSnapshot dispatched back to Game L1
      setWithdrawStage("icm_snapshot");
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // 3. Confirmed & stats updated
      const remaining = previewStats.remainingAssets;
      const newPrincipal = Math.max(0, principal - Math.min(principal, withdrawAmount));
      const newReward = Math.max(0, remaining - newPrincipal);
      setPrincipal(newPrincipal);
      setAccruedReward(newReward);
      setWithdrawAmount(0);
      setWithdrawStage("confirmed");

      if (onWithdrawConfirmed) {
        onWithdrawConfirmed(withdrawAmount, remaining);
      }
    } catch (err: any) {
      setWithdrawStage("error");
      setErrorMessage(err?.message || "Failed to process withdrawal on Fuji C-Chain");
    } finally {
      setIsSubmitting(false);
    }
  };

  const aprPercent = (simulatedAprBps / 100).toFixed(2);

  return (
    <div
      style={{
        backgroundColor: "#0B0F19",
        border: "1px solid #1E293B",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "#38BDF8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              Fuji C-Chain • YieldVault Position
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#F8FAFC" }}>
            Vị Thế Tài Sản & Rút Vốn
          </h2>
        </div>

        {playerWallet && (
          <div style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "monospace" }}>
            Ví: {playerWallet.slice(0, 6)}...{playerWallet.slice(-4)}
          </div>
        )}
      </div>

      {/* 4 Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
        }}
      >
        {/* Total Assets */}
        <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #1E293B", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 600 }}>
            Tổng Tài Sản (Assets)
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#38BDF8", marginTop: "4px" }}>
            {totalAssets.toFixed(2)} <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Mock USDC</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
            Gốc: {principal.toFixed(2)} | Lãi: {accruedReward.toFixed(2)}
          </div>
        </div>

        {/* Simulated APR */}
        <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #1E293B", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 600 }}>
            Lãi Suất Mô Phỏng
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#34D399", marginTop: "4px" }}>
            {aprPercent}% <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>APR</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
            Bảo chứng từ SponsorPool
          </div>
        </div>

        {/* Streak */}
        <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #1E293B", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 600 }}>
            Chuỗi Ngày (Streak)
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FBBF24", marginTop: "4px" }}>
            🔥 {streakDays} <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Ngày</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
            Cấp Streak {currentStats.streakTier}
          </div>
        </div>

        {/* Power Level & Gameplay Stats */}
        <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #1E293B", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 600 }}>
            Cấp Sức Mạnh (Power)
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#C084FC", marginTop: "4px" }}>
            Cấp {currentStats.powerLevel}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
            Bán kính: <strong>{currentStats.openRadius}m</strong> • Năng lượng: <strong>{currentStats.energyMax}</strong>
          </div>
        </div>
      </div>

      {/* Withdrawal & Live Preview Section */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700, color: "#F8FAFC" }}>
            Rút Vốn Từ YieldVault
          </h3>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            Khả dụng: <strong>{totalAssets.toFixed(2)} Mock USDC</strong>
          </span>
        </div>

        {/* Slider & Quick Percentage Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>Số tiền muốn rút:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="number"
                min="0"
                max={totalAssets}
                step="0.1"
                value={withdrawAmount}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setWithdrawAmount(Math.min(totalAssets, Math.max(0, val)));
                }}
                style={{
                  width: "110px",
                  padding: "6px 10px",
                  backgroundColor: "#030712",
                  border: "1px solid #334155",
                  borderRadius: "6px",
                  color: "#38BDF8",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textAlign: "right",
                }}
              />
              <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>Mock USDC</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max={totalAssets}
            step="0.05"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value) || 0)}
            style={{
              width: "100%",
              accentColor: "#38BDF8",
              cursor: "pointer",
            }}
          />

          {/* Quick buttons */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            {[
              { label: "25%", factor: 0.25 },
              { label: "50%", factor: 0.5 },
              { label: "75%", factor: 0.75 },
              { label: "100% (Tất cả)", factor: 1.0 },
            ].map((pct) => (
              <button
                key={pct.label}
                type="button"
                onClick={() => setWithdrawAmount(Number((totalAssets * pct.factor).toFixed(2)))}
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid #334155",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  cursor: "pointer",
                }}
              >
                {pct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Box (FR-015) */}
        {withdrawAmount > 0 && (
          <div
            data-testid="withdrawal-live-preview"
            style={{
              backgroundColor: "rgba(3, 7, 18, 0.7)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1rem" }}>🔍</span>
              <strong style={{ fontSize: "0.875rem", color: "#FBBF24" }}>
                Chế Độ Xem Trước Tác Động (Live Preview - PRD §4.5)
              </strong>
            </div>

            <p style={{ margin: 0, fontSize: "0.8125rem", color: "#CBD5E1", lineHeight: 1.4 }}>
              Khi rút <strong>{withdrawAmount.toFixed(2)} Mock USDC</strong>, các chỉ số khám phá và năng lượng của bạn trên Game L1 sẽ được cập nhật lại theo snapshot:
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
              }}
            >
              {/* Remaining Assets */}
              <div style={{ backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B" }}>Tài sản còn lại</span>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#F8FAFC", marginTop: "2px" }}>
                  {previewStats.remainingAssets.toFixed(2)} USDC
                </div>
              </div>

              {/* Power Level Diff */}
              <div style={{ backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B" }}>Cấp Sức Mạnh</span>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: previewStats.powerDiff < 0 ? "#F87171" : "#F8FAFC", marginTop: "2px" }}>
                  Cấp {currentStats.powerLevel} → Cấp {previewStats.newPowerLevel}
                  {previewStats.powerDiff < 0 && ` (${previewStats.powerDiff})`}
                </div>
              </div>

              {/* Open Radius Diff */}
              <div style={{ backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B" }}>Bán kính mở rương</span>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: previewStats.radiusDiff < 0 ? "#F87171" : "#F8FAFC", marginTop: "2px" }}>
                  {currentStats.openRadius}m → {previewStats.newOpenRadius}m
                  {previewStats.radiusDiff < 0 && ` (${previewStats.radiusDiff}m)`}
                </div>
              </div>

              {/* Energy Max Diff */}
              <div style={{ backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B" }}>Năng lượng tối đa</span>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: previewStats.energyDiff < 0 ? "#F87171" : "#F8FAFC", marginTop: "2px" }}>
                  {currentStats.energyMax} → {previewStats.newEnergyMax}
                  {previewStats.energyDiff < 0 && ` (${previewStats.energyDiff})`}
                </div>
              </div>
            </div>

            {/* Streak Reset Warning if remaining < 1.0 USDC */}
            {previewStats.streakReset && (
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "0.75rem",
                  color: "#F87171",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚠️</span>
                <span>
                  <strong>CẢNH BÁO QUAN TRỌNG:</strong> Tài sản còn lại sẽ giảm dưới <strong>1.0 Mock USDC</strong>. Theo mục §5.4 của PRD, chuỗi ngày liên tục (Streak {streakDays} ngày) sẽ bị <strong>reset về 0</strong>!
                </span>
              </div>
            )}
          </div>
        )}

        {/* Withdrawal Status & Tx Feedback */}
        {withdrawStage === "awaiting_cchain" && (
          <div style={{ backgroundColor: "rgba(56, 189, 248, 0.1)", padding: "12px", borderRadius: "8px", color: "#38BDF8", fontSize: "0.8125rem" }}>
            ⏳ 1/2 Đang gửi giao dịch rút tiền lên Fuji C-Chain...
          </div>
        )}

        {withdrawStage === "icm_snapshot" && (
          <div style={{ backgroundColor: "rgba(168, 85, 247, 0.1)", padding: "12px", borderRadius: "8px", color: "#C084FC", fontSize: "0.8125rem" }}>
            🔄 2/2 Giao dịch C-Chain đã xác nhận. Teleporter đang đồng bộ PositionSnapshot về Game L1...
          </div>
        )}

        {withdrawStage === "confirmed" && (
          <div style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "14px", borderRadius: "8px", color: "#34D399", fontSize: "0.8125rem" }}>
            ✓ Rút tiền thành công! Mock USDC đã chuyển về ví trên Fuji C-Chain và các chỉ số Game L1 đã được cập nhật.
            {txHash && (
              <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#94A3B8" }}>
                Tx Hash: <code style={{ color: "#38BDF8" }}>{txHash.slice(0, 10)}...{txHash.slice(-8)}</code>
              </div>
            )}
          </div>
        )}

        {withdrawStage === "error" && (
          <div style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", padding: "12px", borderRadius: "8px", color: "#F87171", fontSize: "0.8125rem" }}>
            ✕ {errorMessage}
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleConfirmWithdrawal}
          disabled={withdrawAmount <= 0 || isSubmitting}
          style={{
            backgroundColor: withdrawAmount > 0 && !isSubmitting ? "#EF4444" : "#334155",
            color: withdrawAmount > 0 && !isSubmitting ? "#FFFFFF" : "#64748B",
            border: "none",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "0.9375rem",
            fontWeight: 700,
            cursor: withdrawAmount > 0 && !isSubmitting ? "pointer" : "not-allowed",
            minHeight: "44px",
            boxShadow: withdrawAmount > 0 && !isSubmitting ? "0 4px 14px rgba(239, 68, 68, 0.35)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          {isSubmitting
            ? "Đang Xử Lý Rút Vốn..."
            : withdrawAmount > 0
            ? `Ký Rút ${withdrawAmount.toFixed(2)} Mock USDC Khỏi Vault`
            : "Chọn Số Tiền Muốn Rút"}
        </button>
      </div>
    </div>
  );
}

