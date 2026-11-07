/**
 * GE-07 Analytics Sinks (In-Memory Dev/Test Sink & Console Logger)
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 */

import type { GameplayAnalyticsEvent } from "@defi-trail/shared";
import type { AnalyticsSink } from "./types";

/**
 * In-memory sink for testing, inspection, and local dashboard aggregation
 */
export class MemoryAnalyticsSink implements AnalyticsSink {
  readonly name = "memory";
  private events: GameplayAnalyticsEvent[] = [];
  private errors: unknown[] = [];

  emit(event: GameplayAnalyticsEvent): void {
    this.events.push(event);
  }

  recordError(error: unknown): void {
    this.errors.push(error);
  }

  getEvents(): readonly GameplayAnalyticsEvent[] {
    return [...this.events];
  }

  getEventsByType(
    eventType: GameplayAnalyticsEvent["eventType"],
  ): readonly GameplayAnalyticsEvent[] {
    return this.events.filter((e) => e.eventType === eventType);
  }

  getErrors(): readonly unknown[] {
    return [...this.errors];
  }

  clear(): void {
    this.events = [];
    this.errors = [];
  }
}

/**
 * Development console logger sink (privacy-compliant, zero raw secrets)
 */
export class DevLogAnalyticsSink implements AnalyticsSink {
  readonly name = "dev-log";

  emit(event: GameplayAnalyticsEvent): void {
    if (process.env.NODE_ENV !== "production") {
      // Safe preview
      console.log(
        `[Analytics:${event.eventType}] user=${event.walletPseudonym} at=${event.timestamp}`,
        event.properties,
      );
    }
  }

  recordError(error: unknown): void {
    console.warn("[Analytics:Error]", error);
  }
}

/**
 * Composite sink to broadcast to multiple sinks
 */
export class CompositeAnalyticsSink implements AnalyticsSink {
  readonly name = "composite";

  constructor(private readonly sinks: AnalyticsSink[]) {}

  emit(event: GameplayAnalyticsEvent): void {
    for (const sink of this.sinks) {
      try {
        void sink.emit(event);
      } catch (err) {
        sink.recordError?.(err);
      }
    }
  }

  recordError(error: unknown): void {
    for (const sink of this.sinks) {
      sink.recordError?.(error);
    }
  }
}

// Global shared memory sink instance for application & tests
export const globalMemoryAnalyticsSink = new MemoryAnalyticsSink();
