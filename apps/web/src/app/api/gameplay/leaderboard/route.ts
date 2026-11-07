import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { getEngagementStore } from "@/lib/engagement-store";
import type { GameplayEvidenceEvent } from "@defi-trail/shared";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const seasonId = searchParams.get("seasonId") ?? undefined;
    const includeDemo = searchParams.get("includeDemo") === "true";
    const teamId = searchParams.get("teamId") ?? undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : 10;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!, 10)
      : 0;

    const store = getEngagementStore();
    const leaderboard = store.getLeaderboard({
      seasonId,
      includeDemo,
      limit,
      offset,
      teamId,
    });

    return successResponse({
      leaderboard,
      scoringGuide: {
        checkpointConfirmed: 50,
        trailCompleted: 200,
        questCompleted: 150,
        sponsorRedemption: 100,
        fairPlayNotice:
          "Điểm số bảng xếp hạng chỉ nhận từ bằng chứng vị trí và nhiệm vụ đã xác nhận on-chain. Số dư gửi trong YieldVault chỉ sinh lãi DeFi (lending yield), không làm tăng điểm thi đua.",
      },
    });
  } catch (error) {
    console.error("[API leaderboard GET] Error:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch leaderboard", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || !body.event) {
      return errorResponse("BAD_REQUEST", "Missing evidence event payload", 400);
    }

    const event = body.event as GameplayEvidenceEvent;

    // Reject arbitrary or malformed payloads
    if (!event.eventType || !event.player || !event.seasonId) {
      return errorResponse("INVALID_EVENT", "Malformed evidence event", 400);
    }

    const store = getEngagementStore();
    const result = store.recordEvidenceAndApplyScore(event);

    if (!result.applied) {
      const statusCode =
        result.reason === "DUPLICATE_EVENT"
          ? 409
          : result.reason === "DEMO_MODE_EXCLUDED"
            ? 403
            : 400;

      return errorResponse(
        result.reason ?? "EVENT_REJECTED",
        result.reason === "DUPLICATE_EVENT"
          ? "Bằng chứng sự kiện này đã được ghi nhận trước đó (Idempotent: không tính điểm lặp)."
          : "Sự kiện không đủ điều kiện tích lũy điểm.",
        statusCode,
      );
    }

    return successResponse({
      applied: true,
      pointsAwarded: result.pointsAwarded,
      teamId: result.teamId,
      communityTotal: result.communityTotal,
    });
  } catch (error) {
    console.error("[API leaderboard POST] Error:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to process score event", 500);
  }
}

