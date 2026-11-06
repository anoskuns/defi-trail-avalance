"use client";

import React, { useState } from "react";
import { useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import {
  fujiChain,
  gameL1Chain,
  getAlternativeChain,
  getChainById,
  isSupportedChain,
  SUPPORTED_CHAINS,
} from "@/lib/chains";

export interface NetworkSwitcherProps {
  className?: string;
  showDropdown?: boolean;
}

/**
 * Network indicator and Quick Switcher component (Requirement 4).
 * Displays current connected network and provides a 1-click Quick Switch button
 * to toggle between Avalanche Game L1 and Avalanche Fuji C-Chain.
 */
export function NetworkSwitcher({ className = "" }: NetworkSwitcherProps) {
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [isSwitching, setIsSwitching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentChainId = activeChain?.id;
  const isSupported = isSupportedChain(currentChainId);
  const targetChain = getAlternativeChain(currentChainId);

  const handleQuickSwitch = async (chainToSwitch = targetChain) => {
    try {
      setIsSwitching(true);
      setErrorMessage(null);
      await switchChain(chainToSwitch);
      setIsOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to switch chain";
      setErrorMessage(msg);
      console.warn("Chain switch error:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  const getBadgeStyle = () => {
    if (!currentChainId) {
      return {
        bg: "rgba(100, 116, 139, 0.2)",
        border: "rgba(100, 116, 139, 0.4)",
        text: "#94A3B8",
        dot: "#94A3B8",
        label: "Disconnected",
      };
    }
    if (currentChainId === gameL1Chain.id) {
      return {
        bg: "rgba(16, 185, 129, 0.15)",
        border: "rgba(16, 185, 129, 0.4)",
        text: "#6EE7B7",
        dot: "#10B981",
        label: "Game L1",
      };
    }
    if (currentChainId === fujiChain.id) {
      return {
        bg: "rgba(232, 65, 66, 0.15)",
        border: "rgba(232, 65, 66, 0.4)",
        text: "#FCA5A5",
        dot: "#E84142",
        label: "Fuji C-Chain",
      };
    }
    return {
      bg: "rgba(239, 68, 68, 0.2)",
      border: "rgba(239, 68, 68, 0.5)",
      text: "#FCA5A5",
      dot: "#EF4444",
      label: "Wrong Network",
    };
  };

  const badge = getBadgeStyle();

  return (
    <div
      className={`relative inline-flex items-center gap-2 ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        position: "relative",
      }}
    >
      {/* Current Network Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          borderRadius: "8px",
          backgroundColor: badge.bg,
          border: `1px solid ${badge.border}`,
          color: badge.text,
          fontSize: "0.75rem",
          fontWeight: 600,
          minHeight: "36px",
        }}
        title={`Connected to ${activeChain?.name || "Unknown network"} (Chain ID: ${currentChainId || "N/A"})`}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: badge.dot,
            boxShadow: `0 0 6px ${badge.dot}`,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span>{badge.label}</span>
      </div>

      {/* Quick Switch Button (1-Click toggle between Game L1 & Fuji C-Chain) */}
      <button
        type="button"
        onClick={() => handleQuickSwitch()}
        disabled={isSwitching}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "8px",
          backgroundColor: "rgba(232, 65, 66, 0.12)",
          border: "1px solid rgba(232, 65, 66, 0.4)",
          color: "#F87171",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: isSwitching ? "not-allowed" : "pointer",
          opacity: isSwitching ? 0.7 : 1,
          transition: "all 0.15s ease",
          minHeight: "36px",
          minWidth: "44px", // PRD §7 touch target
        }}
        aria-label={`Quick switch to ${targetChain.name}`}
        title={`Click to switch to ${targetChain.name} (${targetChain.id})`}
      >
        {isSwitching ? (
          <>
            <svg
              style={{
                animation: "spin 1s linear infinite",
                width: "12px",
                height: "12px",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
            <span>Switching...</span>
          </>
        ) : (
          <>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="hidden sm:inline">
              ⇄ Switch to {targetChain.id === gameL1Chain.id ? "Game L1" : "Fuji C"}
            </span>
            <span className="sm:hidden">
              ⇄ {targetChain.id === gameL1Chain.id ? "L1" : "C"}
            </span>
          </>
        )}
      </button>

      {/* Network Select Dropdown Trigger */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open network selector dropdown"
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            border: "1px solid rgba(51, 65, 85, 0.6)",
            color: "#94A3B8",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "36px",
            minWidth: "36px",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 6px)",
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "6px",
              minWidth: "220px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
              zIndex: 100,
            }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                color: "#64748B",
                textTransform: "uppercase",
                padding: "4px 8px 6px 8px",
                fontWeight: 600,
              }}
            >
              Select Network
            </div>
            {SUPPORTED_CHAINS.map((chain) => {
              const isSelected = chain.id === currentChainId;
              return (
                <button
                  key={chain.id}
                  type="button"
                  onClick={() => handleQuickSwitch(chain)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: isSelected ? "rgba(232, 65, 66, 0.15)" : "transparent",
                    color: isSelected ? "#F87171" : "#E2E8F0",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontWeight: isSelected ? 600 : 400 }}>
                    {chain.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "monospace",
                      color: "#64748B",
                    }}
                  >
                    #{chain.id}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {errorMessage && (
        <span
          role="alert"
          style={{
            position: "absolute",
            bottom: "-24px",
            right: 0,
            fontSize: "0.6875rem",
            color: "#EF4444",
            whiteSpace: "nowrap",
          }}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

