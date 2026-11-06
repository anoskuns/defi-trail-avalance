"use client";

import React, { useState, useEffect } from "react";

export interface QuestTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId?: string;
  questTier?: number;
  requiredAmountUsdc?: number;
  playerWallet?: string;
  onClaimBudget?: (questId: string) => Promise<string | void> | string | void;
  onApproveAndDeposit?: (questId: string, amount: number) => Promise<string | void> | string | void;
  onComplete?: () => void;
}

type TutorialTab = "overview" | "mock_usdc" | "approval" | "vault";

export function QuestTutorialModal({
  isOpen,
  onClose,
  questId = "0x2222222222222222222222222222222222222222222222222222222222222222",
  questTier = 1,
  requiredAmountUsdc = 1.0,
  playerWallet,
  onClaimBudget,
  onApproveAndDeposit,
  onComplete,
}: QuestTutorialModalProps) {
  const [activeTab, setActiveTab] = useState<TutorialTab>("overview");
  const [hasClaimedBudget, setHasClaimedBudget] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);
  const [hasDeposited, setHasDeposited] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1. Claim Budget Handler
  const handleClaimBudget = async () => {
    try {
      setIsProcessing(true);
      setStatusMessage("Claiming quest budget from SponsorPool on Fuji C-Chain...");
      if (onClaimBudget) {
        const hash = await onClaimBudget(questId);
        if (typeof hash === "string") setTxHash(hash);
      } else {
        // Simulated contract latency
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setTxHash("0x7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e");
      }
      setHasClaimedBudget(true);
      setStatusMessage(`Successfully claimed ${requiredAmountUsdc.toFixed(2)} Mock USDC into wallet!`);
    } catch (err: any) {
      setStatusMessage(`Claim failed: ${err?.message || "Unknown error"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Approve & Deposit Handler
  const handleApproveAndDeposit = async () => {
    try {
      setIsProcessing(true);
      setStatusMessage("1/2 Approving Mock USDC transfer for QuestRouter...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasApproved(true);

      setStatusMessage("2/2 Depositing into YieldVault on Fuji C-Chain...");
      if (onApproveAndDeposit) {
        const hash = await onApproveAndDeposit(questId, requiredAmountUsdc);
        if (typeof hash === "string") setTxHash(hash);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setTxHash("0x3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c");
      }

      setHasDeposited(true);
      setStatusMessage("Deposit confirmed on Fuji C-Chain! Quest completed.");
      if (onComplete) {
        onComplete();
      }
    } catch (err: any) {
      setStatusMessage(`Deposit failed: ${err?.message || "Unknown error"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          backgroundColor: "#0B0F19",
          border: "1px solid #1E293B",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(168, 85, 247, 0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92vh",
        }}
      >
        {/* Header */}
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
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  color: "#C084FC",
                  border: "1px solid rgba(168, 85, 247, 0.4)",
                  textTransform: "uppercase",
                }}
              >
                📜 Quest Tutorial • Tier {questTier}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Budget: {requiredAmountUsdc.toFixed(2)} Mock USDC
              </span>
            </div>

            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#F8FAFC", margin: 0 }}>
              Học DeFi Thực Chiến & Cấp Vốn Quest
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quest tutorial"
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#94A3B8",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "0.875rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            padding: "0 16px",
            overflowX: "auto",
          }}
        >
          {[
            { id: "overview", label: "🎯 Nhiệm Vụ" },
            { id: "mock_usdc", label: "🪙 Mock USDC Là Gì?" },
            { id: "approval", label: "🔐 Tại Sao Cần Approve?" },
            { id: "vault", label: "📈 Vault Sinh Lãi" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TutorialTab)}
              style={{
                padding: "12px 14px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: activeTab === tab.id ? "#C084FC" : "#94A3B8",
                borderBottom: activeTab === tab.id ? "2px solid #A855F7" : "2px solid transparent",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Educational Content Area */}
        <div
          style={{
            padding: "20px 24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#E2E8F0", lineHeight: 1.5 }}>
                Chào mừng bạn đến với Quest Chest! Bạn được nhà tài trợ cấp <strong>{requiredAmountUsdc.toFixed(2)} Mock USDC</strong> để tự mình trải nghiệm quy trình DeFi chuẩn: Rút tiền về ví $\to$ Cấp quyền (Approve) $\to$ Nạp vào Vault sinh lợi suất.
              </p>
              <div
                style={{
                  backgroundColor: "rgba(168, 85, 247, 0.1)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontWeight: 600, color: "#C084FC", fontSize: "0.8125rem", marginBottom: "4px" }}>
                  Mục tiêu nhiệm vụ:
                </div>
                <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "0.8125rem", color: "#E2E8F0", lineHeight: 1.6 }}>
                  <li>Nhấn <strong>Claim budget</strong> để nhận Mock USDC tài trợ về ví của bạn.</li>
                  <li>Ký giao dịch <strong>Approve & Deposit</strong> để nạp vốn vào YieldVault.</li>
                  <li>Hoàn thành Quest: Tự động gửi PositionSnapshot về Game L1 để cộng XP và mở khóa khám phá!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === "mock_usdc" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "1rem", color: "#F8FAFC" }}>🪙 Mock USDC là gì?</h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                Mock USDC là token ERC-20 tiêu chuẩn (6 chữ số thập phân) được triển khai trên mạng thử nghiệm <strong>Avalanche Fuji C-Chain</strong>.
              </p>
              <div style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid #334155" }}>
                <span style={{ fontSize: "0.75rem", color: "#F59E0B", fontWeight: 700 }}>
                  ⚠️ LƯU Ý BẮT BUỘC (PRD §4.1):
                </span>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.8125rem", color: "#94A3B8" }}>
                  Fuji testnet demo — no real funds. Đây hoàn toàn là tiền ảo phục vụ mục đích học tập trải nghiệm Web3/DeFi, không có giá trị quy đổi tài chính thực.
                </p>
              </div>
            </div>
          )}

          {activeTab === "approval" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "1rem", color: "#F8FAFC" }}>🔐 Tại sao phải ký lệnh Approve?</h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                Trong chuẩn bảo mật ERC-20 của Ethereum/Avalanche, không bất kỳ Smart Contract nào (kể cả <code>QuestRouter</code>) có thể tự ý lấy token từ ví của bạn nếu bạn chưa ký giao dịch cấp quyền (<code>approve</code>).
              </p>
              <div style={{ backgroundColor: "rgba(56, 189, 248, 0.1)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                <div style={{ fontWeight: 600, color: "#38BDF8", fontSize: "0.8125rem", marginBottom: "4px" }}>
                  💡 Nguyên lý bảo mật:
                </div>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "#E0F2FE", lineHeight: 1.4 }}>
                  Khi bạn ký <em>Approve</em> đúng {requiredAmountUsdc.toFixed(2)} Mock USDC, bạn đang ủy quyền chính xác số tiền đó cho <code>QuestRouter</code> thực hiện thao tác nạp vào <code>YieldVault</code>, tuyệt đối không ai rút vượt quá hạn mức bạn duyệt.
                </p>
              </div>
            </div>
          )}

          {activeTab === "vault" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "1rem", color: "#F8FAFC" }}>📈 Vault sinh lãi mô phỏng như thế nào?</h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                <code>YieldVault</code> tính toán lợi suất mô phỏng (Simulated APR) tích lũy theo thời gian dựa trên độ hiếm của bạn:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", padding: "10px", borderRadius: "8px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Common</span>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#38BDF8" }}>5.00% APR</div>
                </div>
                <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", padding: "10px", borderRadius: "8px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Rare</span>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#818CF8" }}>6.25% APR</div>
                </div>
                <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", padding: "10px", borderRadius: "8px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Epic</span>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#C084FC" }}>7.50% APR</div>
                </div>
                <div style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", padding: "10px", borderRadius: "8px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Legendary</span>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#FBBF24" }}>10.00% APR</div>
                </div>
              </div>
            </div>
          )}

          {/* Status / Transaction Feedback Banner */}
          {statusMessage && (
            <div
              style={{
                backgroundColor: hasDeposited ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 41, 59, 0.8)",
                border: `1px solid ${hasDeposited ? "rgba(16, 185, 129, 0.4)" : "#334155"}`,
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.8125rem",
                color: hasDeposited ? "#34D399" : "#F8FAFC",
              }}
            >
              {statusMessage}
              {txHash && (
                <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#94A3B8" }}>
                  Tx Hash: <code style={{ color: "#38BDF8" }}>{txHash.slice(0, 10)}...{txHash.slice(-8)}</code>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Mạng: <strong style={{ color: "#FDA4AF" }}>Avalanche Fuji C-Chain</strong>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {!hasClaimedBudget ? (
              <button
                type="button"
                onClick={handleClaimBudget}
                disabled={isProcessing}
                style={{
                  backgroundColor: "#A855F7",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 18px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  minHeight: "44px",
                  boxShadow: "0 4px 14px rgba(168, 85, 247, 0.4)",
                }}
              >
                {isProcessing ? "Đang Claim Budget..." : `1. Claim Budget (${requiredAmountUsdc.toFixed(2)} USDC)`}
              </button>
            ) : !hasDeposited ? (
              <button
                type="button"
                onClick={handleApproveAndDeposit}
                disabled={isProcessing}
                style={{
                  backgroundColor: "#0284C7",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 18px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  minHeight: "44px",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
                }}
              >
                {isProcessing ? "Đang ký & Nạp Vault..." : "2. Ký Approve & Deposit"}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#10B981",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Hoàn Tất Quest ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

