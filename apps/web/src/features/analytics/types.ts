/**
 * GE-07 Analytics Types & Sink Interfaces
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 */

import type {
  GameplayAnalyticsEvent,
  GameplayAnalyticsEventType,
  GameplayAnalyticsProps,
} from "@defi-trail/shared";

export interface AnalyticsSink {
  name: string;
  emit(event: GameplayAnalyticsEvent): Promise<void> | void;
  recordError?(error: unknown): void;
}

export interface TrackerOptions {
  sink?: AnalyticsSink;
  salt?: string;
  debug?: boolean;
}
