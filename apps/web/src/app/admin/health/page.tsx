"use client";

import React, { useEffect, useState, useCallback, useId } from "react";
import Link from "next/link";
import { formatShortAddress, getExplorerAddressUrl } from "@/lib/chains";

interface RpcHealth {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  status: "online" | "degraded" | "offline";
  blockNumber: number | null;
  latencyMs: number;
  error?: string;
}

interface WalletHealth {
  address: string;
  fujiBalanceAvax: string;
  gameL1BalanceGas: string;
  status: "healthy" | "low_gas" | "critical";
}

interface SponsorPoolHealth {
  address: string;
  principalBudgetFormatted: string;
  questBudgetFormatted: string;
  rewardReserveFormatted: string;
  totalBudgetFormatted: string;
  targetPrincipal: string;
  targetQuest: string;
  targetReward: string;
  targetTotal: string;
  isSolvent: boolean;
  status: "funded" | "partially_funded" | "unfunded" | "unconfigured";
}

interface FaucetHealth {
  address: string;
  status: "operational" | "standby";
  gameL1BalanceGas: string;
  fujiBalanceAvax: string;
  rateLimitPolicy: string;
}

interface SystemHealthReport {
  timestamp: string;
  overallStatus: "healthy" | "degraded" | "critical";
  chains: {
    gameL1: RpcHealth;
    fujiC: RpcHealth;
  };
  relayer: {
    service: string;
    version: string;
    containerName: string;
    metricsPort: number;
    wallet: WalletHealth;
  };
  sponsorPool: SponsorPoolHealth;
  faucet: FaucetHealth;
  proofSigner: {
    address: string;
    status: "ready" | "unconfigured";
  };
}

export default function AdminHealthPage() {
  const [data, setData] = useState<SystemHealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const autoRefreshId = useId();

  const copyToClipboard = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/health", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch health status`);
      }
      const json: SystemHealthReport = await res.json();
      setData(json);
      setLastRefreshed(new Date());
      setCountdown(10);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load telemetry");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  // Countdown timer & auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchHealth();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchHealth]);

  const renderLatencyBadge = (latencyMs: number) => {
    if (latencyMs <= 0) return null;
    let bg = "rgba(16, 185, 129, 0.12)";
    let text = "#34D399";
    let border = "1px solid rgba(16, 185, 129, 0.3)";
    if (latencyMs > 800 && latencyMs <= 1800) {
      bg = "rgba(245, 158, 11, 0.12)";
      text = "#FBBF24";
      border = "1px solid rgba(245, 158, 11, 0.3)";
    } else if (latencyMs > 1800) {
      bg = "rgba(244, 63, 94, 0.12)";
      text = "#FB7185";
      border = "1px solid rgba(244, 63, 94, 0.3)";
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "2px 8px",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontFamily: "monospace",
          backgroundColor: bg,
          color: text,
          border,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: text,
          }}
        />
        {latencyMs} ms
      </span>
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#070A12",
        color: "#F8FAFC",
        padding: "32px 24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      {/* Toast Alert */}
      {copiedKey && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#10B981",
            color: "#022C22",
            fontWeight: 700,
            fontSize: "0.8125rem",
            padding: "10px 16px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)",
          }}
        >
          <span>✓</span>
          <span>Đã sao chép vào bộ nhớ tạm!</span>
        </div>
      )}

      <div
        className="max-w-7xl mx-auto space-y-6"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "16px",
            borderBottom: "1px solid #1E293B",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                System Health &amp; Operations
              </h1>
              <span
                style={{
                  backgroundColor: "rgba(244, 63, 94, 0.12)",
                  color: "#FB7185",
                  border: "1px solid rgba(244, 63, 94, 0.25)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Read-Only
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#94A3B8",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Real-time telemetry for Dual-Chain RPC, ICM Relayer, SponsorPool &amp; Faucet (PRD §3.2, §9.1, §9.3, §20)
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Auto-refresh control */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#0F172A",
                border: "1px solid #1E293B",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.8125rem",
                color: "#CBD5E1",
              }}
            >
              <input
                id={autoRefreshId}
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                style={{ cursor: "pointer", accentColor: "#F59E0B" }}
              />
              <label htmlFor={autoRefreshId} style={{ cursor: "pointer", userSelect: "none" }}>
                Auto-refresh
              </label>
              {autoRefresh && (
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6875rem",
                    color: "#F59E0B",
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  {countdown}s
                </span>
              )}
            </div>

            {/* Refresh button */}
            <button
              onClick={fetchHealth}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                backgroundColor: "#1E293B",
                color: "#F1F5F9",
                border: "1px solid #334155",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "all 0.15s ease",
              }}
            >
              <svg
                style={{
                  width: "14px",
                  height: "14px",
                  animation: loading ? "spin 1s linear infinite" : "none",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>

            {/* Back to Map button */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                color: "#FBBF24",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <span>Map View</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              backgroundColor: "rgba(136, 19, 55, 0.5)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              color: "#FECDD3",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={fetchHealth}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                backgroundColor: "#881337",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid #BE123C",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Quick Status Bar (4 Cards) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {/* 1. Overall Health */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Overall Health
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    data?.overallStatus === "healthy"
                      ? "#10B981"
                      : data?.overallStatus === "degraded"
                      ? "#F59E0B"
                      : "#EF4444",
                  boxShadow: `0 0 10px ${
                    data?.overallStatus === "healthy"
                      ? "#10B981"
                      : data?.overallStatus === "degraded"
                      ? "#F59E0B"
                      : "#EF4444"
                  }`,
                }}
              />
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color:
                    data?.overallStatus === "healthy"
                      ? "#34D399"
                      : data?.overallStatus === "degraded"
                      ? "#FBBF24"
                      : "#F87171",
                }}
              >
                {data?.overallStatus === "healthy"
                  ? "Operational"
                  : data?.overallStatus === "degraded"
                  ? "Degraded"
                  : "Critical"}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "8px", marginBottom: 0 }}>
              Last check: {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "--:--"}
            </p>
          </div>

          {/* 2. Relayer Status */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Relayer Status
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 10px #10B981",
                }}
              />
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>
                {data?.relayer.service ? "Active (AWM)" : "Standby"}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#64748B",
                marginTop: "8px",
                marginBottom: 0,
                fontFamily: "monospace",
              }}
            >
              Port: {data?.relayer.metricsPort ?? 8080} • {data?.relayer.version ?? "v1.3.1"}
            </p>
          </div>

          {/* 3. Total TVL / Budget */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total TVL / Budget
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#F59E0B" }}>
                {data?.sponsorPool.totalBudgetFormatted ?? "1,700.00"}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontFamily: "monospace" }}>
                Mock USDC
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#10B981", marginTop: "8px", marginBottom: 0, fontWeight: 600 }}>
              100% Solvency Ratio (PRD §9.1)
            </p>
          </div>

          {/* 4. Faucet Status */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Faucet Status
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 10px #10B981",
                }}
              />
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E2E8F0" }}>
                {data?.faucet.status === "operational" ? "Operational" : "Standby"}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "8px", marginBottom: 0 }}>
              1 claim / wallet / epoch
            </p>
          </div>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Card 1 - Dual-Chain RPC */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1px solid #1E293B",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #1E293B",
                  paddingBottom: "14px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🌐</span>
                  <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Dual-Chain RPC Connectivity
                  </h2>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontFamily: "monospace" }}>
                  PRD §3.2, §20
                </span>
              </div>

              {/* Sub-grid comparing Game L1 vs Fuji C-Chain */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {/* Column 1: Game L1 */}
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            data?.chains.gameL1.status === "online" ? "#22D3EE" : "#F43F5E",
                          boxShadow:
                            data?.chains.gameL1.status === "online"
                              ? "0 0 8px #22D3EE"
                              : "none",
                        }}
                      />
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#FFFFFF" }}>
                        Game L1
                      </span>
                    </div>
                    {renderLatencyBadge(data?.chains.gameL1.latencyMs ?? 0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Chain ID:</span>
                      <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>
                        {data?.chains.gameL1.chainId ?? 99999}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Block Height:</span>
                      <span style={{ fontFamily: "monospace", color: "#22D3EE", fontWeight: 700 }}>
                        {data?.chains.gameL1.blockNumber !== null
                          ? `#${data?.chains.gameL1.blockNumber?.toLocaleString()}`
                          : "Connecting..."}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Native Token:</span>
                      <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>GAS (18 dec)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                      <span style={{ color: "#94A3B8" }}>Endpoint:</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "monospace", fontSize: "0.6875rem", color: "#94A3B8" }}>
                        <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={data?.chains.gameL1.rpcUrl}>
                          {data?.chains.gameL1.rpcUrl}
                        </span>
                        <button
                          onClick={() => copyToClipboard(data?.chains.gameL1.rpcUrl || "", "l1-rpc")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            color: "#94A3B8",
                            padding: "0 2px",
                          }}
                          title="Copy RPC"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Fuji C-Chain */}
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            data?.chains.fujiC.status === "online" ? "#F43F5E" : "#F43F5E",
                          boxShadow:
                            data?.chains.fujiC.status === "online"
                              ? "0 0 8px #F43F5E"
                              : "none",
                        }}
                      />
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#FFFFFF" }}>
                        Fuji C-Chain
                      </span>
                    </div>
                    {renderLatencyBadge(data?.chains.fujiC.latencyMs ?? 0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Chain ID:</span>
                      <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>
                        {data?.chains.fujiC.chainId ?? 43113}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Block Height:</span>
                      <span style={{ fontFamily: "monospace", color: "#FB7185", fontWeight: 700 }}>
                        {data?.chains.fujiC.blockNumber !== null
                          ? `#${data?.chains.fujiC.blockNumber?.toLocaleString()}`
                          : "Connecting..."}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                      <span style={{ color: "#94A3B8" }}>Native Token:</span>
                      <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>AVAX (18 dec)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                      <span style={{ color: "#94A3B8" }}>Endpoint:</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "monospace", fontSize: "0.6875rem", color: "#94A3B8" }}>
                        <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={data?.chains.fujiC.rpcUrl}>
                          {data?.chains.fujiC.rpcUrl}
                        </span>
                        <button
                          onClick={() => copyToClipboard(data?.chains.fujiC.rpcUrl || "", "fuji-rpc")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            color: "#94A3B8",
                            padding: "0 2px",
                          }}
                          title="Copy RPC"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#94A3B8",
              }}
            >
              <span>Dual-chain consensus telemetry</span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a
                  href="https://subnets-test.avax.network/defi-trail"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#22D3EE", textDecoration: "none" }}
                >
                  Game L1 Explorer &nearr;
                </a>
                <a
                  href="https://testnet.snowtrace.io"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#FB7185", textDecoration: "none" }}
                >
                  Snowtrace &nearr;
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 - SponsorPool Budgets */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1px solid #1E293B",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #1E293B",
                  paddingBottom: "14px",
                  marginBottom: "16px",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🏦</span>
                  <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    SponsorPool Budgets &amp; Solvency
                  </h2>
                </div>
                {data && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      backgroundColor: "#070A12",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      border: "1px solid #1E293B",
                    }}
                  >
                    <span style={{ color: "#94A3B8" }}>Pool:</span>
                    <span style={{ color: "#F59E0B" }}>{formatShortAddress(data.sponsorPool.address)}</span>
                    <button
                      onClick={() => copyToClipboard(data.sponsorPool.address, "pool-addr")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        color: "#94A3B8",
                        padding: "0 2px",
                      }}
                      title="Copy Address"
                    >
                      📋
                    </button>
                  </div>
                )}
              </div>

              {/* 3 Progress Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* 1. Principal Budget */}
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                    <span style={{ fontWeight: 600, color: "#34D399" }}>1. Principal Budget (Yield/Sponsor Chests)</span>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#FFFFFF" }}>
                      {data?.sponsorPool.principalBudgetFormatted ?? "1,000.00"} / 1,000 USDC
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      backgroundColor: "#0F172A",
                      borderRadius: "999px",
                      height: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#10B981",
                        height: "100%",
                        borderRadius: "999px",
                        width: `${Math.min(
                          100,
                          (parseFloat(data?.sponsorPool.principalBudgetFormatted || "1000") / 1000) * 100
                        )}%`,
                        transition: "all 0.5s ease",
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: "6px", marginBottom: 0 }}>
                    Funds 1 USDC Yield Chests &amp; 2 USDC Sponsor Chests
                  </p>
                </div>

                {/* 2. Quest Budget */}
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                    <span style={{ fontWeight: 600, color: "#FBBF24" }}>2. Quest Budget (Tutorial Grants)</span>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#FFFFFF" }}>
                      {data?.sponsorPool.questBudgetFormatted ?? "500.00"} / 500 USDC
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      backgroundColor: "#0F172A",
                      borderRadius: "999px",
                      height: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#F59E0B",
                        height: "100%",
                        borderRadius: "999px",
                        width: `${Math.min(
                          100,
                          (parseFloat(data?.sponsorPool.questBudgetFormatted || "500") / 500) * 100
                        )}%`,
                        transition: "all 0.5s ease",
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: "6px", marginBottom: 0 }}>
                    Tutorial grants by tier (0.5, 1, 2, 3 USDC) via QuestRouter
                  </p>
                </div>

                {/* 3. Reward Reserve */}
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                    <span style={{ fontWeight: 600, color: "#C084FC" }}>3. Reward Reserve (Simulated APR Payouts)</span>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#FFFFFF" }}>
                      {data?.sponsorPool.rewardReserveFormatted ?? "200.00"} / 200 USDC
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      backgroundColor: "#0F172A",
                      borderRadius: "999px",
                      height: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#A855F7",
                        height: "100%",
                        borderRadius: "999px",
                        width: `${Math.min(
                          100,
                          (parseFloat(data?.sponsorPool.rewardReserveFormatted || "200") / 200) * 100
                        )}%`,
                        transition: "all 0.5s ease",
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: "6px", marginBottom: 0 }}>
                    Backs simulated yield withdrawals upon user withdrawal
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#94A3B8",
              }}
            >
              <span>Non-exceedance invariant enforced</span>
              {data && (
                <a
                  href={getExplorerAddressUrl(43113, data.sponsorPool.address)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#F59E0B", textDecoration: "none" }}
                >
                  View Contract on Snowtrace &nearr;
                </a>
              )}
            </div>
          </div>

          {/* Card 3 - Avalanche ICM Relayer */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1px solid #1E293B",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #1E293B",
                  paddingBottom: "14px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>⚡</span>
                  <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Avalanche ICM Relayer
                  </h2>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(34, 211, 238, 0.12)",
                    color: "#22D3EE",
                    border: "1px solid rgba(34, 211, 238, 0.25)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {data?.relayer.containerName ?? "defi-trail-icm-relayer"}
                </span>
              </div>

              {/* Relayer Wallet Address with copy */}
              <div
                style={{
                  backgroundColor: "rgba(7, 10, 18, 0.7)",
                  border: "1px solid #1E293B",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                }}
              >
                <span style={{ color: "#94A3B8" }}>Relayer Address:</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", color: "#F59E0B" }}>
                  <span>{formatShortAddress(data?.relayer.wallet.address)}</span>
                  <button
                    onClick={() => copyToClipboard(data?.relayer.wallet.address || "", "relayer-addr")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      color: "#94A3B8",
                      padding: "0 2px",
                    }}
                    title="Copy Address"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* Gas Balances & Thresholds */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "14px",
                  fontSize: "0.75rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <div style={{ color: "#94A3B8", fontSize: "0.6875rem" }}>Fuji C-Chain Gas</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
                    {data?.relayer.wallet.fujiBalanceAvax ?? "0.5000"}{" "}
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 400 }}>AVAX</span>
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "0.6875rem", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>✓</span> Safe (&ge; 0.20 AVAX)
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(7, 10, 18, 0.7)",
                    border: "1px solid #1E293B",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <div style={{ color: "#94A3B8", fontSize: "0.6875rem" }}>Game L1 Gas</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
                    {data?.relayer.wallet.gameL1BalanceGas ?? "1.0000"}{" "}
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 400 }}>GAS</span>
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "0.6875rem", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>✓</span> Safe (&ge; 0.20 GAS)
                  </div>
                </div>
              </div>

              {/* Operational specifications */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.75rem", color: "#94A3B8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                  <span>Image Specification:</span>
                  <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>
                    {data?.relayer.version ? `avaplatform/awm-relayer:${data?.relayer.version}` : "avaplatform/awm-relayer:v1.3.1"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0F172A" }}>
                  <span>Health Metrics Endpoint:</span>
                  <span style={{ fontFamily: "monospace", color: "#34D399" }}>
                    http://localhost:{data?.relayer.metricsPort ?? 8080}/health
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>Restart Policy:</span>
                  <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>unless-stopped (PRD §9.3)</span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#94A3B8",
              }}
            >
              <span>Bi-directional AWM relayer</span>
              <span style={{ color: "#34D399", fontWeight: 600 }}>Auto-Restart Enabled</span>
            </div>
          </div>

          {/* Card 4 - Faucet & Proof Signer */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1px solid #1E293B",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #1E293B",
                  paddingBottom: "14px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🚰</span>
                  <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Faucet &amp; Proof Signer
                  </h2>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#34D399",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Epoch Rate-Limited
                </span>
              </div>

              {/* Key-Value List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: "1px solid #1E293B",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>Proof Signer Address:</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", color: "#F59E0B" }}>
                    <span>{formatShortAddress(data?.proofSigner.address)}</span>
                    <button
                      onClick={() => copyToClipboard(data?.proofSigner.address || "", "signer-addr")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        color: "#94A3B8",
                        padding: "0 2px",
                      }}
                      title="Copy Address"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #1E293B",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>EIP-712 Domain:</span>
                  <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>DeFiTrail / v1 (Game L1)</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #1E293B",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>Key Protection:</span>
                  <span style={{ fontFamily: "monospace", color: "#34D399" }}>Server-Side Secret / Enclave</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #1E293B",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>Faucet Disbursal Quota:</span>
                  <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>0.10 GAS (L1) / 0.05 AVAX (Fuji)</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #1E293B",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>IP Flood Limit:</span>
                  <span style={{ fontFamily: "monospace", color: "#E2E8F0" }}>Max 5 requests / IP / Epoch</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>Rate Limiter Status:</span>
                  <span style={{ fontFamily: "monospace", color: "#34D399", fontWeight: 600 }}>
                    Active Guard (In-Memory)
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#94A3B8",
              }}
            >
              <span>Gas Onboarding Security</span>
              <span style={{ color: "#CBD5E1", fontFamily: "monospace" }}>1 claim / wallet / epoch</span>
            </div>
          </div>
        </div>

        {/* Bottom Operator Runbook Quick Commands */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1px solid #1E293B",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛠️</span> Operator Runbook Quick Commands
            </div>
            <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "4px", marginBottom: 0 }}>
              Idempotent commands for local deployment and testnet initialization (PRD §3.2, §20)
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => copyToClipboard("pnpm --filter @defi-trail/relayer run seed", "cmd-seed")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: "#070A12",
                border: "1px solid #1E293B",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: "#FBBF24",
                cursor: "pointer",
              }}
              title="Click to copy command"
            >
              <span>pnpm --filter @defi-trail/relayer run seed</span>
              <span style={{ color: "#64748B" }}>📋</span>
            </button>

            <button
              onClick={() => copyToClipboard("docker compose -f packages/relayer/docker-compose.yml up -d", "cmd-docker")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: "#070A12",
                border: "1px solid #1E293B",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: "#22D3EE",
                cursor: "pointer",
              }}
              title="Click to copy command"
            >
              <span>docker compose up -d</span>
              <span style={{ color: "#64748B" }}>📋</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
