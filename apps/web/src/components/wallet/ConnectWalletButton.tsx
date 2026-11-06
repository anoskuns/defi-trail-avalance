"use client";

import React from "react";
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient, SUPPORTED_WALLETS, defiTrailTheme } from "@/lib/thirdweb";
import { gameL1Chain, SUPPORTED_CHAINS } from "@/lib/chains";

export interface ConnectWalletButtonProps {
  className?: string;
  label?: string;
}

/**
 * Connect Wallet Button component configured for:
 * - Primary: Email Embedded Wallet (FR-001)
 * - Fallback: Avalanche Core Wallet (FR-002)
 * - Supported Chains: Avalanche Game L1 & Avalanche Fuji C-Chain
 */
export function ConnectWalletButton({
  className = "",
  label = "Connect Wallet",
}: ConnectWalletButtonProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <ConnectButton
        client={thirdwebClient}
        wallets={[...SUPPORTED_WALLETS]}
        chain={gameL1Chain}
        chains={[...SUPPORTED_CHAINS]}
        theme={defiTrailTheme}
        connectButton={{
          label,
          style: {
            backgroundColor: "#E84142",
            color: "#FFFFFF",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "8px 16px",
            minHeight: "40px",
            minWidth: "44px",
            border: "none",
            cursor: "pointer",
          },
        }}
        connectModal={{
          title: "Sign in to DeFi Trail",
          size: "compact",
          showThirdwebBranding: false,
          titleIcon: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=026",
          welcomeScreen: {
            title: "Welcome to DeFi Trail",
            subtitle:
              "Choose Email for instant seedless gameplay, or connect your Avalanche Core wallet.",
          },
        }}
        detailsButton={{
          style: {
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(51, 65, 85, 0.7)",
            color: "#F8FAFC",
            fontSize: "0.75rem",
            borderRadius: "8px",
            padding: "6px 12px",
            minHeight: "36px",
          },
        }}
      />
    </div>
  );
}

