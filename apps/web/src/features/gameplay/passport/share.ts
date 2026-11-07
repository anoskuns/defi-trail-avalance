export interface PassportShareSnapshot {
  title: string;
  summary: string;
  nextGoal: string | null;
  wallet: string | null;
  privacyNote: string;
}

export function maskWalletForShare(walletAddress?: string): string | null {
  if (!walletAddress) return null;
  return walletAddress.length > 10
    ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
    : null;
}

export function createPassportShareSnapshot(input: {
  badgeCount: number;
  nextGoal?: string | null;
  walletAddress?: string;
  showMaskedWallet?: boolean;
}): PassportShareSnapshot {
  return {
    title: "My DeFi Trail Passport",
    summary: `${input.badgeCount} of 5 badges unlocked`,
    nextGoal: input.nextGoal ?? null,
    wallet: input.showMaskedWallet
      ? maskWalletForShare(input.walletAddress)
      : null,
    privacyNote: "Wallet details and balances are hidden by default.",
  };
}

