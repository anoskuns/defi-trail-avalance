import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { getEngagementStore } from "@/lib/engagement-store";
import { COMMUNITY_GOAL_S1 } from "@defi-trail/shared";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const seasonId = searchParams.get("seasonId") ?? undefined;
    const player = searchParams.get("player");

    const store = getEngagementStore();
    const season = store.getSeason(seasonId);
    if (!season) {
      return errorResponse("NOT_FOUND", "Season not found", 404);
    }

    const teams = store.getTeams(season.id);
    const membership = player ? store.getMembership(season.id, player) : null;
    const competitiveBoard = store.getLeaderboard({ seasonId: season.id, includeDemo: false });

    return successResponse({
      season,
      teams,
      membership,
      communityGoal: competitiveBoard.communityGoal,
      milestones: COMMUNITY_GOAL_S1.milestones,
    });
  } catch (error) {
    console.error("[API teams GET] Error:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch season teams", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("BAD_REQUEST", "Invalid JSON payload", 400);
    }

    const { seasonId, player, targetTeamId, inviteCode } = body as {
      seasonId?: string;
      player?: string;
      targetTeamId?: string;
      inviteCode?: string;
    };

    if (!player || typeof player !== "string" || !player.startsWith("0x")) {
      return errorResponse(
        "INVALID_PLAYER",
        "A valid EVM wallet address is required to join a team",
        400,
      );
    }

    if (!targetTeamId && !inviteCode) {
      return errorResponse(
        "MISSING_TARGET",
        "Either targetTeamId or inviteCode must be provided",
        400,
      );
    }

    const store = getEngagementStore();
    const result = store.joinOrSwitchTeam({
      seasonId,
      player,
      targetTeamId,
      inviteCode,
    });

    if (!result.success) {
      const statusCode =
        result.violationCode === "ALREADY_IN_TEAM"
          ? 409
          : result.violationCode === "SWITCH_LIMIT_EXCEEDED"
            ? 403
            : 400;

      return errorResponse(
        result.violationCode ?? "JOIN_REJECTED",
        result.reason ?? "Cannot join or switch team",
        statusCode,
      );
    }

    return successResponse({
      success: true,
      isSwitch: result.isSwitch,
      membership: result.membership,
      message: result.isSwitch
        ? "Đổi đội thành công! Điểm đã đóng góp trước đó được bảo toàn cho đội cũ."
        : "Gia nhập đội thành công! Chúc bạn và đồng đội đạt thành tích cao.",
    });
  } catch (error) {
    console.error("[API teams POST] Error:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to join team", 500);
  }
}

