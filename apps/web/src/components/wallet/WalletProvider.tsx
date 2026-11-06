"use client";

import React, { type ReactNode, useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThirdwebProvider>
      <AutoConnect
        client={thirdwebClient}
        wallets={[...SUPPORTED_WALLETS]}
        timeout={15000}
      />
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </ThirdwebProvider>
  );
}

