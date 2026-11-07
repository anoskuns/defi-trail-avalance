import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";
import {
  getSponsorPerkService,
  SponsorPerkError,
} from "@/lib/sponsor-perk-service";
import {
  checkSponsorClaimRateLimit,
  recordSponsorClaimAttempt,
} from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

interface ClaimRequestBody {
  wallet?: unknown;
  campaignId?: unknown;
  ruleId?: unknown;
  requestId?: unknown;
  claimAuthorization?: unknown;
}

function clientIp(req: NextRequest): string | undefined {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

export async function POST(req: NextRequest) {
  let body: ClaimRequestBody;
  try {
    body = (await req.json()) as ClaimRequestBody;
  } catch {
    return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON.", 400);
  }

  const { wallet, campaignId, ruleId, requestId, claimAuthorization } = body;
  if (
    typeof wallet !== "string" ||
    typeof campaignId !== "string" ||
    typeof ruleId !== "string" ||
    typeof requestId !== "string" ||
    typeof claimAuthorization !== "string"
  ) {
    return errorResponse(
      "INVALID_PAYLOAD",
      "wallet, campaignId, ruleId, requestId, and claimAuthorization are required strings.",
      400,
    );
  }

  const ip = clientIp(req);
  const rateLimit = checkSponsorClaimRateLimit(wallet, ip);
  if (!rateLimit.allowed) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many sponsor perk claim attempts. Please wait before retrying.",
      429,
      { retryable: true },
    );
  }
  recordSponsorClaimAttempt(wallet, ip);

  try {
    const claim = await getSponsorPerkService().claim({
      player: wallet,
      campaignId,
      ruleId,
      requestId,
      claimAuthorization,
    });
    return NextResponse.json(
      { claim },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error: unknown) {
    if (error instanceof SponsorPerkError) {
      return errorResponse(error.code, error.message, error.status, {
        retryable: error.retryable,
      });
    }
    return errorResponse(
      "INTERNAL_ERROR",
      "Unable to issue the sponsor perk claim.",
      500,
      { retryable: true },
    );
  }
}
