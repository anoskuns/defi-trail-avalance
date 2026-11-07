/**
 * GET /api/admin/analytics
 * GE-07 Read-Only Aggregated Analytics & Pilot Funnel Dashboard Endpoint
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 *
 * Privacy Guarantee:
 * Strictly read-only aggregated numbers.
 * ZERO raw GPS, ZERO emails, ZERO secrets, and ZERO raw wallet addresses.
 */

import { NextResponse } from "next/server";
import { successResponse } from "@/lib/api-response";
import { getPilotFunnelMetrics } from "@/features/analytics/funnel";
import { globalMemoryAnalyticsSink } from "@/features/analytics/sink";

export const dynamic = "force-dynamic";

export async function GET() {
  const metrics = getPilotFunnelMetrics(globalMemoryAnalyticsSink);
  const totalEvents = globalMemoryAnalyticsSink.getEvents().length;

  return successResponse({
    timestamp: new Date().toISOString(),
    totalEventsTracked: totalEvents,
    funnel: {
      stages: {
        seasonViewed: metrics.uniqueUsers.seasonViewed,
        trailStarted: metrics.uniqueUsers.trailStarted,
        firstCheckpointConfirmed: metrics.uniqueUsers.firstCheckpointConfirmed,
        trailCompleted: metrics.uniqueUsers.trailCompleted,
        passportViewed: metrics.uniqueUsers.passportViewed,
        teamJoined: metrics.uniqueUsers.teamJoined,
        perkIssued: metrics.uniqueUsers.perkIssued,
        perkRedeemed: metrics.uniqueUsers.perkRedeemed,
      },
      rawCounts: metrics.counts,
      conversionRates: metrics.conversionRates,
      dropoffs: metrics.dropoffs,
    },
    northStar: {
      weeklyVerifiedFinishers: metrics.northStar.weeklyVerifiedFinishers,
      totalCompletions: metrics.northStar.totalCompletions,
    },
    privacyAudit: {
      zeroLocationData: true,
      zeroPrivateMaterial: true,
      pseudonymizedWalletsOnly: true,
      readOnly: true,
    },
  });
}
