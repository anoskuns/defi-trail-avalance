import { NextResponse } from "next/server";
import { getDemoCampusConfig } from "@/lib/campus";
import { errorResponse } from "@/lib/api-response";

/**
 * GET /api/map-config
 * Returns non-secret deployment/campus config, computed H3 cells at resolution 10,
 * network configuration, and demo location status (PRD §10.3, §11.2).
 */
export async function GET() {
  try {
    const config = getDemoCampusConfig();
    return NextResponse.json(config, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load map configuration";
    return errorResponse("INTERNAL_ERROR", message, 500);
  }
}

