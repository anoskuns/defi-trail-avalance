import type { ReactNode } from "react";
import "./globals.css";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { WalletHeader } from "@/components/wallet/WalletHeader";

export const metadata = {
  title: "DeFi Trail — Avalanche Learn & Earn",
  description: "Explore the real world, unlock Yield & Quest chests on Avalanche Game L1 and Fuji C-Chain.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <WalletHeader />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
