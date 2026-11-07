import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { getEngagementStore } from "@/lib/engagement-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { seasonId, allowDemo } = body as {
      seasonId?: string;
      allowDemo?: boolean;
    };

    const store = getEngagementStore();
    const result = store.rebuildLeaderboard(seasonId, { allowDemo });

    return successResponse({
      success: true,
      message: "Tái lập bảng xếp hạng (Read Model Rebuild) thành công.",
      result,
    });
  } catch (error) {
    console.error("[API leaderboard rebuild POST] Error:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to rebuild leaderboard", 500);
  }
}

