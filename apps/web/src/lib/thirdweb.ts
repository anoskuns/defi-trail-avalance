import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { darkTheme } from "thirdweb/react";

/**
 * Public client ID for thirdweb SDK v5.
 * Can be provided via NEXT_PUBLIC_THIRDWEB_CLIENT_ID or defaults to a development placeholder.
 */
export const THIRDWEB_CLIENT_ID =
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID?.trim() ||
  "9932fea0fc544662a2ac3dfc09130e54";

export const thirdwebClient = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});

/**
 * Mode 1 (Primary): Email Embedded Wallet (Seedless, OTP via email)
 * As required by PRD FR-001 & §4.1: "Chế độ chính: Email Embedded Wallet (không yêu cầu người dùng lưu seed phrase ban đầu)."
 */
export const emailEmbeddedWallet = inAppWallet({
  auth: {
    options: ["email"],
  },
});

/**
 * Mode 2 (Fallback): Avalanche Core Wallet
 * As required by PRD FR-002 & §4.1: "Chế độ phụ (Fallback): Kết nối Avalanche Core Wallet."
 * Uses official RDNS identifier "app.core.extension"
 */
export const avalancheCoreWallet = createWallet("app.core.extension");

/**
 * All supported wallet providers for DeFi Trail
 */
export const SUPPORTED_WALLETS = [emailEmbeddedWallet, avalancheCoreWallet] as const;

/**
 * Custom dark theme for DeFi Trail using Avalanche Red accents
 */
export const defiTrailTheme = darkTheme({
  colors: {
    accentButtonBg: "#E84142",
    accentButtonText: "#FFFFFF",
    accentText: "#F87171",
    primaryButtonBg: "#E84142",
    primaryButtonText: "#FFFFFF",
    modalBg: "#0B0F19",
    borderColor: "#1E293B",
    connectedButtonBg: "#131B2E",
    connectedButtonBgHover: "#1E293B",
    secondaryButtonBg: "#1E293B",
    secondaryButtonHoverBg: "#334155",
    secondaryButtonText: "#F8FAFC",
    primaryText: "#F8FAFC",
    secondaryText: "#94A3B8",
  },
});

