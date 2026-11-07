/**
 * GE-07 Pilot Funnel Aggregator
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 */

import {
  calculatePilotFunnel,
  type PilotFunnelMetrics,
} from "@defi-trail/shared";
import { globalMemoryAnalyticsSink } from "./sink";
import type { MemoryAnalyticsSink } from "./sink";

/**
 * Returns aggregated pilot funnel metrics from the specified or default sink
 */
export function getPilotFunnelMetrics(
  sink: MemoryAnalyticsSink = globalMemoryAnalyticsSink,
): PilotFunnelMetrics {
  return calculatePilotFunnel(sink.getEvents());
}

