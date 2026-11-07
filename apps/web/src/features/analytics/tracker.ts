/**
 * GE-07 Gameplay Funnel Analytics Tracker
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 *
 * Guarantees:
 * - Non-blocking execution: analytics failure NEVER throws or halts gameplay.
 * - Strict allowlist enforcement: unknown or forbidden fields are detected and blocked.
 * - Wallet pseudonymization: raw addresses are converted to irreversible pseudonyms.
 * - Completion idempotency: duplicate trail completion does NOT emit economic success twice.
 */

import {
  pseudonymizeWallet,
  validateAnalyticsEvent,
  type BadgeEarnedProps,
  type CheckpointConfirmedProps,
  type CheckpointSubmittedProps,
  type CheckpointViewedProps,
  type GameplayAnalyticsEvent,
  type GameplayAnalyticsEventType,
  type GameplayAnalyticsProps,
  type PassportViewedProps,
  type PerkIssuedProps,
  type PerkRedeemedProps,
  type SeasonViewedProps,
  type TeamJoinedProps,
  type TrailCompletedProps,
  type TrailStartedProps,
} from "@defi-trail/shared";
import type { AnalyticsSink, TrackerOptions } from "./types";
import { globalMemoryAnalyticsSink } from "./sink";

export class GameplayTracker {
  private readonly sink: AnalyticsSink;
  private readonly salt: string;
  private readonly debug: boolean;
  private readonly completedTrailKeys = new Set<string>();

  constructor(options: TrackerOptions = {}) {
    this.sink = options.sink ?? globalMemoryAnalyticsSink;
    this.salt = options.salt ?? "defi-trail-pseudonym-salt-v1";
    this.debug = options.debug ?? false;
  }

  /**
   * Internal safe dispatch method.
   * Catches all errors to ensure analytics failures NEVER crash or block gameplay.
   */
  track<T extends GameplayAnalyticsProps>(
    eventType: GameplayAnalyticsEventType,
    properties: T,
    wallet?: string | null,
  ): boolean {
    try {
      const user = pseudonymizeWallet(wallet, this.salt);
      const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      const event: GameplayAnalyticsEvent<T> = {
        eventId,
        eventType,
        timestamp: new Date().toISOString(),
        walletPseudonym: user,
        properties: { ...properties },
      };

      // Handle duplicate trail completions to prevent multiple economic success records
      if (eventType === "trail_completed") {
        const props = event.properties as TrailCompletedProps;
        const key = `${user}:${props.trailId}`;
        if (this.completedTrailKeys.has(key)) {
          // Flag as duplicate
          props.isDuplicate = true;
          if (this.debug) {
            console.warn(
              `[GameplayTracker] Duplicate trail completion for ${key} flagged as duplicate`,
            );
          }
        } else {
          this.completedTrailKeys.add(key);
        }
      }

      const validation = validateAnalyticsEvent(event);
      if (!validation.valid) {
        const err = new Error(
          `Analytics validation failed for ${eventType}: ${validation.errors?.join(", ")}`,
        );
        this.sink.recordError?.(err);
        if (this.debug) {
          console.warn("[GameplayTracker]", err.message);
        }
        return false;
      }

      void this.sink.emit(event);
      return true;
    } catch (err) {
      // Non-blocking catch-all
      this.sink.recordError?.(err);
      if (this.debug) {
        console.warn("[GameplayTracker:Error]", err);
      }
      return false;
    }
  }

  // -------------------------------------------------------------------------
  // 11 Canonical Event Helpers
  // -------------------------------------------------------------------------

  trackSeasonViewed(properties: SeasonViewedProps, wallet?: string | null): boolean {
    return this.track("season_viewed", properties, wallet);
  }

  trackTrailStarted(properties: TrailStartedProps, wallet?: string | null): boolean {
    return this.track("trail_started", properties, wallet);
  }

  trackCheckpointViewed(
    properties: CheckpointViewedProps,
    wallet?: string | null,
  ): boolean {
    return this.track("checkpoint_viewed", properties, wallet);
  }

  trackCheckpointSubmitted(
    properties: CheckpointSubmittedProps,
    wallet?: string | null,
  ): boolean {
    return this.track("checkpoint_submitted", properties, wallet);
  }

  trackCheckpointConfirmed(
    properties: CheckpointConfirmedProps,
    wallet?: string | null,
  ): boolean {
    return this.track("checkpoint_confirmed", properties, wallet);
  }

  trackTrailCompleted(
    properties: TrailCompletedProps,
    wallet?: string | null,
  ): boolean {
    return this.track("trail_completed", properties, wallet);
  }

  trackPassportViewed(
    properties: PassportViewedProps,
    wallet?: string | null,
  ): boolean {
    return this.track("passport_viewed", properties, wallet);
  }

  trackBadgeEarned(properties: BadgeEarnedProps, wallet?: string | null): boolean {
    return this.track("badge_earned", properties, wallet);
  }

  trackTeamJoined(properties: TeamJoinedProps, wallet?: string | null): boolean {
    return this.track("team_joined", properties, wallet);
  }

  trackPerkIssued(properties: PerkIssuedProps, wallet?: string | null): boolean {
    return this.track("perk_issued", properties, wallet);
  }

  trackPerkRedeemed(properties: PerkRedeemedProps, wallet?: string | null): boolean {
    return this.track("perk_redeemed", properties, wallet);
  }

  resetCompletedTrails(): void {
    this.completedTrailKeys.clear();
  }
}

// Global default tracker
export const globalGameplayTracker = new GameplayTracker({
  sink: globalMemoryAnalyticsSink,
});

export function getGameplayTracker(): GameplayTracker {
  return globalGameplayTracker;
}
