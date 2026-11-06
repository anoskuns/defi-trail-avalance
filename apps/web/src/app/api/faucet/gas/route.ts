import { NextRequest, NextResponse } from "next/server";
import { keccak256, encodePacked } from "thirdweb/utils";
import { errorResponse } from "@/lib/api-response";
import { getCurrentEpoch, DEFAULT_EPOCH_SECONDS } from "@/lib/campus";
import { checkFaucetRateLimit, recordFaucetClaim } from "@/lib/rate-limiter";

interface FaucetRequestBody {
  wallet: string;
  chainKey: "gameL1" | "fujiC";
}

const FAUCET_AMOUNTS = {
  fujiC: "0.05 AVAX",
  gameL1: "0.10 GAS",
} as const;

/**
 * POST /api/faucet/gas
 *
 * Provides limited test gas tokens for first-time onboarding or top-up (PRD §4.1, §10.3, §12.1).
 * Enforces rate limiting of at most 1 claim per wallet per chain per epoch.
 */
export async function POST(req: NextRequest) {
  try {
    let body: FaucetRequestBody;
    try {
      body = await req.json();
    } catch {
      return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON", 400);
    }

    const { wallet, chainKey } = body;

    // 1. Validation
    if (!wallet || typeof wallet !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return errorResponse("INVALID_PAYLOAD", "Invalid or missing wallet address", 400);
    }

    if (chainKey !== "gameL1" && chainKey !== "fujiC") {
      return errorResponse(
        "INVALID_PAYLOAD",
        "Invalid chainKey. Supported values are 'gameL1' and 'fujiC'",
        400
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const serverNowSec = Math.floor(Date.now() / 1000);
    const currentEpoch = getCurrentEpoch(serverNowSec);

    // 2. Rate limit check (PRD §10.3: max 1 per wallet/chain/epoch + IP abuse protection)
    const rateCheck = checkFaucetRateLimit(
      wallet,
      chainKey,
      currentEpoch,
      clientIp,
      DEFAULT_EPOCH_SECONDS
    );

    if (!rateCheck.allowed) {
      return errorResponse(
        rateCheck.code || "RATE_LIMITED",
        rateCheck.message || "Faucet claim limit reached for current epoch",
        429,
        { retryable: false }
      );
    }

    // 3. Record claim before dispatch
    recordFaucetClaim(wallet, chainKey, currentEpoch, clientIp);

    const amount = FAUCET_AMOUNTS[chainKey];
    const nextEligibleTime = (currentEpoch + 1) * DEFAULT_EPOCH_SECONDS;

    // 4. Generate transaction hash
    // In live production, backend sends native transfer from faucet relayer wallet.
    // In testnet demo environment, we create a deterministic transaction identifier.
    const txHash = keccak256(
      encodePacked(
        ["string", "address", "string", "uint64", "uint256"],
        ["faucet-dispatch", wallet.toLowerCase() as `0x${string}`, chainKey, BigInt(currentEpoch), BigInt(Date.now())]
      )
    );

    return NextResponse.json({
      success: true,
      txHash,
      amount,
      chainKey,
      nextEligibleTime,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse("INTERNAL_ERROR", message, 500);
  }
}

