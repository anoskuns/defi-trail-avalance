import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";
import { authenticateSponsorOperator } from "@/lib/sponsor-operator-auth";
import {
  getSponsorPerkService,
  SponsorPerkError,
} from "@/lib/sponsor-perk-service";
import {
  checkSponsorRedemptionRateLimit,
  recordSponsorRedemptionAttempt,
} from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

interface RedemptionRequestBody {
  claimToken?: unknown;
  transactionId?: unknown;
}

function clientIp(req: NextRequest): string | undefined {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

export async function POST(req: NextRequest) {
  const operator = authenticateSponsorOperator(req.headers.get("authorization"));
  const ip = clientIp(req);
  const rateLimitIdentity = operator?.operatorId ?? "unauthenticated";
  const rateLimit = checkSponsorRedemptionRateLimit(rateLimitIdentity, ip);
  if (!rateLimit.allowed) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many redemption attempts. Please wait before retrying.",
      429,
      { retryable: true },
    );
  }
  recordSponsorRedemptionAttempt(rateLimitIdentity, ip);

  if (!operator) {
    return errorResponse(
      "UNAUTHORIZED_OPERATOR",
      "A valid sponsor operator bearer token is required.",
      401,
    );
  }

  let body: RedemptionRequestBody;
  try {
    body = (await req.json()) as RedemptionRequestBody;
  } catch {
    return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON.", 400);
  }

  if (
    typeof body.claimToken !== "string" ||
    typeof body.transactionId !== "string"
  ) {
    return errorResponse(
      "INVALID_PAYLOAD",
      "claimToken and transactionId are required strings.",
      400,
    );
  }

  try {
    const redemption = await getSponsorPerkService().redeem({
      claimToken: body.claimToken,
      transactionId: body.transactionId,
      operatorId: operator.operatorId,
    });
    return NextResponse.json(
      { redemption },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: unknown) {
    if (error instanceof SponsorPerkError) {
      return errorResponse(error.code, error.message, error.status, {
        retryable: error.retryable,
      });
    }
    return errorResponse(
      "INTERNAL_ERROR",
      "Unable to redeem the sponsor perk.",
      500,
      { retryable: true },
    );
  }
}
