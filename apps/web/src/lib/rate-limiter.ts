/**
 * In-memory rate limiter for faucet top-ups and abuse protection (PRD §10.3, §12.1).
 * Tracks claims per wallet/chain/epoch and limits per IP.
 */

// Key: `${wallet}:${chainKey}:${epoch}` -> timestampMs
const faucetClaims = new Map<string, number>();

// Key: `${ip}:${chainKey}:${epoch}` -> count
const ipFaucetCounts = new Map<string, number>();

const MAX_IP_FAUCET_CLAIMS_PER_EPOCH = 5;

export interface FaucetCheckResult {
  allowed: boolean;
  code?: string;
  message?: string;
  nextEligibleTime?: number;
}

export function checkFaucetRateLimit(
  wallet: string,
  chainKey: string,
  epoch: number,
  clientIp?: string,
  epochSeconds: number = 86400
): FaucetCheckResult {
  const normalizedWallet = wallet.toLowerCase();
  const normalizedChain = chainKey.toLowerCase();
  const walletKey = `${normalizedWallet}:${normalizedChain}:${epoch}`;

  if (faucetClaims.has(walletKey)) {
    const nextEligibleTime = (epoch + 1) * epochSeconds;
    return {
      allowed: false,
      code: "RATE_LIMITED",
      message: `Wallet ${wallet} has already claimed test gas for chain ${chainKey} in epoch ${epoch}.`,
      nextEligibleTime,
    };
  }

  if (clientIp) {
    const ipKey = `${clientIp}:${normalizedChain}:${epoch}`;
    const count = ipFaucetCounts.get(ipKey) || 0;
    if (count >= MAX_IP_FAUCET_CLAIMS_PER_EPOCH) {
      const nextEligibleTime = (epoch + 1) * epochSeconds;
      return {
        allowed: false,
        code: "RATE_LIMITED",
        message: "IP rate limit exceeded for faucet claims in this epoch.",
        nextEligibleTime,
      };
    }
  }

  return { allowed: true };
}

export function recordFaucetClaim(
  wallet: string,
  chainKey: string,
  epoch: number,
  clientIp?: string
): void {
  const normalizedWallet = wallet.toLowerCase();
  const normalizedChain = chainKey.toLowerCase();
  const walletKey = `${normalizedWallet}:${normalizedChain}:${epoch}`;
  faucetClaims.set(walletKey, Date.now());

  if (clientIp) {
    const ipKey = `${clientIp}:${normalizedChain}:${epoch}`;
    const count = ipFaucetCounts.get(ipKey) || 0;
    ipFaucetCounts.set(ipKey, count + 1);
  }
}

/**
 * Resets all rate limit state (useful for tests).
 */
export function resetRateLimits(): void {
  faucetClaims.clear();
  ipFaucetCounts.clear();
}
