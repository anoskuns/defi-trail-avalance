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

// ---------------------------------------------------------------------------
// Rate Limiter for Evidence Reconciliation (PRD GE-04)
// Sliding window rate limiter per wallet and IP
// ---------------------------------------------------------------------------

const reconcileWalletTimestamps = new Map<string, number[]>();
const reconcileIpTimestamps = new Map<string, number[]>();

const sponsorClaimWalletTimestamps = new Map<string, number[]>();
const sponsorClaimIpTimestamps = new Map<string, number[]>();
const sponsorRedemptionOperatorTimestamps = new Map<string, number[]>();
const sponsorRedemptionIpTimestamps = new Map<string, number[]>();

export const RECONCILE_WINDOW_MS = 10_000;
export const MAX_RECONCILE_PER_WINDOW = 20;

export interface ReconcileRateLimitResult {
  allowed: boolean;
  code?: string;
  message?: string;
  retryAfterMs?: number;
}

export function checkReconcileRateLimit(
  wallet: string,
  clientIp?: string,
  windowMs: number = RECONCILE_WINDOW_MS,
  maxPerWindow: number = MAX_RECONCILE_PER_WINDOW,
): ReconcileRateLimitResult {
  const now = Date.now();
  const normalizedWallet = wallet.toLowerCase();

  const walletTimes = (reconcileWalletTimestamps.get(normalizedWallet) || []).filter(
    (t) => now - t < windowMs,
  );
  if (walletTimes.length >= maxPerWindow) {
    const oldestInWindow = walletTimes[0]!;
    const retryAfterMs = Math.max(0, windowMs - (now - oldestInWindow));
    return {
      allowed: false,
      code: "RATE_LIMITED",
      message: "Too many evidence reconciliation requests. Please wait before retrying.",
      retryAfterMs,
    };
  }

  if (clientIp) {
    const ipTimes = (reconcileIpTimestamps.get(clientIp) || []).filter(
      (t) => now - t < windowMs,
    );
    if (ipTimes.length >= maxPerWindow * 2) {
      const oldestInWindow = ipTimes[0]!;
      const retryAfterMs = Math.max(0, windowMs - (now - oldestInWindow));
      return {
        allowed: false,
        code: "RATE_LIMITED",
        message: "IP rate limit exceeded for evidence reconciliation.",
        retryAfterMs,
      };
    }
  }

  return { allowed: true };
}

export function recordReconcileRequest(
  wallet: string,
  clientIp?: string,
  windowMs: number = RECONCILE_WINDOW_MS,
): void {
  const now = Date.now();
  const normalizedWallet = wallet.toLowerCase();
  const walletTimes = (reconcileWalletTimestamps.get(normalizedWallet) || []).filter(
    (t) => now - t < windowMs,
  );
  walletTimes.push(now);
  reconcileWalletTimestamps.set(normalizedWallet, walletTimes);

  if (clientIp) {
    const ipTimes = (reconcileIpTimestamps.get(clientIp) || []).filter(
      (t) => now - t < windowMs,
    );
    ipTimes.push(now);
    reconcileIpTimestamps.set(clientIp, ipTimes);
  }
}

export interface SponsorPerkRateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

function checkSlidingWindow(
  store: Map<string, number[]>,
  key: string,
  windowMs: number,
  maxPerWindow: number,
): SponsorPerkRateLimitResult {
  const now = Date.now();
  const timestamps = (store.get(key) ?? []).filter(
    (timestamp) => now - timestamp < windowMs,
  );
  store.set(key, timestamps);
  if (timestamps.length < maxPerWindow) return { allowed: true };
  return {
    allowed: false,
    retryAfterMs: Math.max(0, windowMs - (now - timestamps[0]!)),
  };
}

function recordSlidingWindow(
  store: Map<string, number[]>,
  key: string,
  windowMs: number,
): void {
  const now = Date.now();
  const timestamps = (store.get(key) ?? []).filter(
    (timestamp) => now - timestamp < windowMs,
  );
  timestamps.push(now);
  store.set(key, timestamps);
}

export function checkSponsorClaimRateLimit(
  wallet: string,
  clientIp?: string,
  windowMs = 60_000,
  maxPerWallet = 5,
): SponsorPerkRateLimitResult {
  const walletCheck = checkSlidingWindow(
    sponsorClaimWalletTimestamps,
    wallet.toLowerCase(),
    windowMs,
    maxPerWallet,
  );
  if (!walletCheck.allowed) return walletCheck;
  return clientIp
    ? checkSlidingWindow(
        sponsorClaimIpTimestamps,
        clientIp,
        windowMs,
        maxPerWallet * 4,
      )
    : { allowed: true };
}

export function recordSponsorClaimAttempt(
  wallet: string,
  clientIp?: string,
  windowMs = 60_000,
): void {
  recordSlidingWindow(
    sponsorClaimWalletTimestamps,
    wallet.toLowerCase(),
    windowMs,
  );
  if (clientIp) {
    recordSlidingWindow(sponsorClaimIpTimestamps, clientIp, windowMs);
  }
}

export function checkSponsorRedemptionRateLimit(
  operatorId: string,
  clientIp?: string,
  windowMs = 60_000,
  maxPerOperator = 20,
): SponsorPerkRateLimitResult {
  const operatorCheck = checkSlidingWindow(
    sponsorRedemptionOperatorTimestamps,
    operatorId,
    windowMs,
    maxPerOperator,
  );
  if (!operatorCheck.allowed) return operatorCheck;
  return clientIp
    ? checkSlidingWindow(
        sponsorRedemptionIpTimestamps,
        clientIp,
        windowMs,
        maxPerOperator * 2,
      )
    : { allowed: true };
}

export function recordSponsorRedemptionAttempt(
  operatorId: string,
  clientIp?: string,
  windowMs = 60_000,
): void {
  recordSlidingWindow(
    sponsorRedemptionOperatorTimestamps,
    operatorId,
    windowMs,
  );
  if (clientIp) {
    recordSlidingWindow(sponsorRedemptionIpTimestamps, clientIp, windowMs);
  }
}

/**
 * Resets all rate limit state (useful for tests).
 */
export function resetRateLimits(): void {
  faucetClaims.clear();
  ipFaucetCounts.clear();
  reconcileWalletTimestamps.clear();
  reconcileIpTimestamps.clear();
  sponsorClaimWalletTimestamps.clear();
  sponsorClaimIpTimestamps.clear();
  sponsorRedemptionOperatorTimestamps.clear();
  sponsorRedemptionIpTimestamps.clear();
}
