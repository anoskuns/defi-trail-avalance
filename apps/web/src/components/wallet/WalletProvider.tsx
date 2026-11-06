"use client";

import React, { type ReactNode, useEffect } from "react";
import { ThirdwebProvider, AutoConnect } from "thirdweb/react";
import { thirdwebClient, SUPPORTED_WALLETS } from "@/lib/thirdweb";

export interface WalletProviderProps {
  children: ReactNode;
}

/**
 * Root Wallet Provider for DeFi Trail.
 * Wraps the app in ThirdwebProvider and enables AutoConnect to guarantee
 * wallet session and address persistence across page reloads (FR-001, FR-002, Requirement 3).
 */
export function WalletProvider({ children }: WalletProviderProps) {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Gracefully intercept unhandled promise rejections from injected wallet extensions
      // (e.g. Avalanche Core Wallet onboarding.js or MetaMask contentscript.js)
      if (
        event.reason === undefined ||
        event.reason === null ||
        event.reason === "undefined" ||
        event.reason?.message?.includes?.("User rejected") ||
        event.reason?.message?.includes?.("user rejected")
      ) {
        event.preventDefault();
        console.debug("[WalletProvider] Handled wallet extension rejection:", event.reason);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return (
    <ThirdwebProvider>
      <AutoConnect
        client={thirdwebClient}
        wallets={[...SUPPORTED_WALLETS]}
        timeout={15000}
      />
      {children}
    </ThirdwebProvider>
  );
}

