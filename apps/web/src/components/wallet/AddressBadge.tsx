"use client";

import React, { useState } from "react";
import { useActiveAccount, useActiveWallet, useActiveWalletChain, useDisconnect } from "thirdweb/react";
import { formatShortAddress, getExplorerAddressUrl } from "@/lib/chains";

export interface AddressBadgeProps {
  className?: string;
}

/**
 * Shortened address display component (Requirement 4: 0x12...34).
 * Includes copy-to-clipboard, explorer link, and disconnect action.
 */
export function AddressBadge({ className = "" }: AddressBadgeProps) {
  const account = useActiveAccount();
  const activeWallet = useActiveWallet();
  const activeChain = useActiveWalletChain();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!account?.address) {
    return null;
  }

  const shortAddress = formatShortAddress(account.address, {
    prefixLength: 4, // 0x12...34 format
    suffixLength: 4,
  });

  const fullShortAddress = formatShortAddress(account.address, {
    prefixLength: 6,
    suffixLength: 4,
  });

  const explorerUrl = getExplorerAddressUrl(activeChain?.id, account.address);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleDisconnect = () => {
    if (activeWallet) {
      disconnect(activeWallet);
    }
    setMenuOpen(false);
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      style={{ position: "relative", display: "inline-flex" }}
    >
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={`Wallet address ${account.address}. Click for options.`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 12px",
          borderRadius: "8px",
          backgroundColor: "rgba(30, 41, 59, 0.8)",
          border: "1px solid rgba(51, 65, 85, 0.7)",
          color: "#F8FAFC",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          minHeight: "36px",
          minWidth: "44px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#10B981",
          }}
          aria-hidden="true"
        />
        <span style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
          {fullShortAddress}
        </span>
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

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "8px",
            minWidth: "220px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            zIndex: 100,
          }}
        >
          <div
            style={{
              padding: "6px 8px",
              borderBottom: "1px solid #1E293B",
              marginBottom: "6px",
            }}
          >
            <div style={{ fontSize: "0.6875rem", color: "#64748B" }}>Account</div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#E2E8F0",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {account.address}
            </div>
          </div>

          {/* Copy Address */}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "transparent",
              color: copied ? "#34D399" : "#E2E8F0",
              fontSize: "0.75rem",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>{copied ? "Copied to clipboard!" : "Copy Address"}</span>
          </button>

          {/* Explorer Link */}
          {explorerUrl !== "#" && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 10px",
                borderRadius: "6px",
                color: "#E2E8F0",
                fontSize: "0.75rem",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>View in Explorer</span>
            </a>
          )}

          {/* Disconnect */}
          <button
            type="button"
            onClick={handleDisconnect}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              fontSize: "0.75rem",
              cursor: "pointer",
              marginTop: "4px",
              fontWeight: 600,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Disconnect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
}

