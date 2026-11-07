/**
 * GE-07 Gameplay Analytics Schema & Funnel Engine
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §10, §11; Playbook §14
 *
 * Privacy Guarantees:
 * - Strict allowlist per event.
 * - Zero raw GPS (lat/lng, accuracy, altitude, radius).
 * - Zero secrets, QR payloads, private keys, signatures, OTPs, or emails.
 * - requestId allowed ONLY when needed for reconciliation (checkpoint_submitted, checkpoint_confirmed).
 * - Wallets pseudonymized into deterministic, privacy-preserving identifiers.
 * - Duplicate completions do not count twice towards economic completion metrics.
 */

import { z } from "zod";

export const GAMEPLAY_ANALYTICS_EVENT_TYPES = [
  "season_viewed",
  "trail_started",
  "checkpoint_viewed",
  "checkpoint_submitted",
  "checkpoint_confirmed",
  "trail_completed",
  "passport_viewed",
  "badge_earned",
  "team_joined",
  "perk_issued",
  "perk_redeemed",
] as const;

export type GameplayAnalyticsEventType =
  (typeof GAMEPLAY_ANALYTICS_EVENT_TYPES)[number];

/**
 * Forbidden keys pattern that must NEVER appear in analytics payloads
 */
export const FORBIDDEN_ANALYTICS_KEY_REGEX =
  /(lat|lng|latitude|longitude|accuracy|gps|radius|coordinates|altitude|email|qr|secret|privatekey|signature|password|passcode|otp|seed|mnemonic)/i;

/**
 * Recursively scans any object for forbidden privacy-violating keys
 */
export function detectForbiddenFields(payload: unknown, path = ""): string[] {
  const violations: string[] = [];
  if (!payload || typeof payload !== "object") {
    return violations;
  }

  if (Array.isArray(payload)) {
    payload.forEach((item, index) => {
      violations.push(...detectForbiddenFields(item, `${path}[${index}]`));
    });
    return violations;
  }

  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (FORBIDDEN_ANALYTICS_KEY_REGEX.test(key)) {
      violations.push(currentPath);
    }
    if (value && typeof value === "object") {
      violations.push(...detectForbiddenFields(value, currentPath));
    }
  }

  return violations;
}

/**
 * Deterministic 64-bit integer hash generator for browser & node environments
 */
export function createDeterministicHash(input: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const part1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const part2 = (h2 >>> 0).toString(16).padStart(8, "0");
  return `${part1}${part2}`;
}

/**
 * Derives a pseudonymized identifier from a wallet address
 */
export function pseudonymizeWallet(
  wallet?: string | null,
  salt = "defi-trail-pseudonym-salt-v1",
): string {
  if (!wallet) return "w_guest_anon";
  const normalized = wallet.trim().toLowerCase();
  const hash = createDeterministicHash(`${salt}:${normalized}`);
  return `w_anon_${hash}`;
}

// ---------------------------------------------------------------------------
// 11 Canonical Event Schemas (Allowlist fields ONLY)
// ---------------------------------------------------------------------------

export const seasonViewedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    themeKey: z.string().optional(),
    status: z.string().optional(),
    source: z.string().optional(),
  })
  .strict();

export const trailStartedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    trailId: z.string().min(1),
    checkpointCount: z.number().int().nonnegative(),
    mode: z.enum(["GPS", "DEMO"]),
  })
  .strict();

export const checkpointViewedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    trailId: z.string().min(1),
    checkpointId: z.string().min(1),
    position: z.number().int().nonnegative(),
    mode: z.enum(["GPS", "DEMO"]),
  })
  .strict();

export const checkpointSubmittedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    trailId: z.string().min(1),
    checkpointId: z.string().min(1),
    position: z.number().int().nonnegative(),
    requestId: z.string().min(1), // Explicitly permitted for reconciliation
    mode: z.enum(["GPS", "DEMO"]),
  })
  .strict();

export const checkpointConfirmedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    trailId: z.string().min(1),
    checkpointId: z.string().min(1),
    position: z.number().int().nonnegative(),
    requestId: z.string().min(1), // Explicitly permitted for reconciliation
    elapsedMs: z.number().nonnegative().optional(),
    mode: z.enum(["GPS", "DEMO"]),
  })
  .strict();

export const trailCompletedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    trailId: z.string().min(1),
    completedCheckpoints: z.number().int().positive(),
    totalDurationSeconds: z.number().nonnegative().optional(),
    mode: z.enum(["GPS", "DEMO"]),
    isDuplicate: z.boolean().optional(),
  })
  .strict();

export const passportViewedPropsSchema = z
  .object({
    stampsCount: z.number().int().nonnegative().optional(),
    badgesCount: z.number().int().nonnegative().optional(),
    source: z.string().optional(),
  })
  .strict();

export const badgeEarnedPropsSchema = z
  .object({
    badgeId: z.string().min(1),
    category: z.string().optional(),
    ruleVersion: z.number().int().positive().optional(),
  })
  .strict();

export const teamJoinedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    teamId: z.string().min(1),
  })
  .strict();

export const perkIssuedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    campaignId: z.string().min(1),
    perkId: z.string().min(1),
  })
  .strict();

export const perkRedeemedPropsSchema = z
  .object({
    seasonId: z.string().min(1),
    campaignId: z.string().min(1),
    perkId: z.string().min(1),
  })
  .strict();

export type SeasonViewedProps = z.infer<typeof seasonViewedPropsSchema>;
export type TrailStartedProps = z.infer<typeof trailStartedPropsSchema>;
export type CheckpointViewedProps = z.infer<typeof checkpointViewedPropsSchema>;
export type CheckpointSubmittedProps = z.infer<
  typeof checkpointSubmittedPropsSchema
>;
export type CheckpointConfirmedProps = z.infer<
  typeof checkpointConfirmedPropsSchema
>;
export type TrailCompletedProps = z.infer<typeof trailCompletedPropsSchema>;
export type PassportViewedProps = z.infer<typeof passportViewedPropsSchema>;
export type BadgeEarnedProps = z.infer<typeof badgeEarnedPropsSchema>;
export type TeamJoinedProps = z.infer<typeof teamJoinedPropsSchema>;
export type PerkIssuedProps = z.infer<typeof perkIssuedPropsSchema>;
export type PerkRedeemedProps = z.infer<typeof perkRedeemedPropsSchema>;

/**
 * Polymorphic Event Definition
 */
export type GameplayAnalyticsProps =
  | SeasonViewedProps
  | TrailStartedProps
  | CheckpointViewedProps
  | CheckpointSubmittedProps
  | CheckpointConfirmedProps
  | TrailCompletedProps
  | PassportViewedProps
  | BadgeEarnedProps
  | TeamJoinedProps
  | PerkIssuedProps
  | PerkRedeemedProps;

export interface GameplayAnalyticsEvent<
  T extends GameplayAnalyticsProps = GameplayAnalyticsProps,
> {
  eventId: string;
  eventType: GameplayAnalyticsEventType;
  timestamp: string;
  walletPseudonym: string;
  properties: T;
}

/**
 * Validates an event against the allowlist schema and rejects forbidden fields
 */
export function validateAnalyticsEvent(
  event: GameplayAnalyticsEvent,
): { valid: boolean; errors?: string[] } {
  const violations = detectForbiddenFields(event);
  if (violations.length > 0) {
    return {
      valid: false,
      errors: violations.map((v) => `Forbidden privacy-violating field: ${v}`),
    };
  }

  let schema: z.ZodTypeAny;
  switch (event.eventType) {
    case "season_viewed":
      schema = seasonViewedPropsSchema;
      break;
    case "trail_started":
      schema = trailStartedPropsSchema;
      break;
    case "checkpoint_viewed":
      schema = checkpointViewedPropsSchema;
      break;
    case "checkpoint_submitted":
      schema = checkpointSubmittedPropsSchema;
      break;
    case "checkpoint_confirmed":
      schema = checkpointConfirmedPropsSchema;
      break;
    case "trail_completed":
      schema = trailCompletedPropsSchema;
      break;
    case "passport_viewed":
      schema = passportViewedPropsSchema;
      break;
    case "badge_earned":
      schema = badgeEarnedPropsSchema;
      break;
    case "team_joined":
      schema = teamJoinedPropsSchema;
      break;
    case "perk_issued":
      schema = perkIssuedPropsSchema;
      break;
    case "perk_redeemed":
      schema = perkRedeemedPropsSchema;
      break;
    default:
      return { valid: false, errors: [`Unknown event type: ${event.eventType}`] };
  }

  const parsed = schema.safeParse(event.properties);
  if (!parsed.success) {
    return {
      valid: false,
      errors: parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      ),
    };
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// Funnel Calculation Engine (PRD §10.2, §10.3)
// ---------------------------------------------------------------------------

export interface PilotFunnelStageCounts {
  seasonViewed: number;
  trailStarted: number;
  firstCheckpointConfirmed: number;
  trailCompleted: number;
  passportViewed: number;
  teamJoined: number;
  perkIssued: number;
  perkRedeemed: number;
}

export interface PilotFunnelConversionRates {
  seasonToStartPct: number;
  startToFirstCheckpointPct: number;
  firstCheckpointToCompletePct: number;
  startToCompletePct: number;
  perkRedemptionPct: number;
}

export interface PilotFunnelDropoffs {
  viewToStart: number;
  startToFirstCheckpoint: number;
  firstCheckpointToComplete: number;
}

export interface PilotFunnelMetrics {
  counts: PilotFunnelStageCounts;
  uniqueUsers: PilotFunnelStageCounts;
  conversionRates: PilotFunnelConversionRates;
  dropoffs: PilotFunnelDropoffs;
  northStar: {
    weeklyVerifiedFinishers: number;
    totalCompletions: number;
  };
}

/**
 * Calculates pilot funnel metrics (start -> first checkpoint -> trail complete)
 */
export function calculatePilotFunnel(
  events: readonly GameplayAnalyticsEvent[],
): PilotFunnelMetrics {
  const counts: PilotFunnelStageCounts = {
    seasonViewed: 0,
    trailStarted: 0,
    firstCheckpointConfirmed: 0,
    trailCompleted: 0,
    passportViewed: 0,
    teamJoined: 0,
    perkIssued: 0,
    perkRedeemed: 0,
  };

  const users = {
    seasonViewed: new Set<string>(),
    trailStarted: new Set<string>(),
    firstCheckpointConfirmed: new Set<string>(),
    trailCompleted: new Set<string>(),
    passportViewed: new Set<string>(),
    teamJoined: new Set<string>(),
    perkIssued: new Set<string>(),
    perkRedeemed: new Set<string>(),
  };

  // Track unique first checkpoint confirmation per user
  const firstCheckpointConfirmedUsers = new Set<string>();

  for (const event of events) {
    const user = event.walletPseudonym;
    switch (event.eventType) {
      case "season_viewed":
        counts.seasonViewed++;
        users.seasonViewed.add(user);
        break;
      case "trail_started":
        counts.trailStarted++;
        users.trailStarted.add(user);
        break;
      case "checkpoint_confirmed": {
        const props = event.properties as CheckpointConfirmedProps;
        // Count as first checkpoint if position === 0 or user's first observed confirmation
        if (props.position === 0 || !firstCheckpointConfirmedUsers.has(user)) {
          counts.firstCheckpointConfirmed++;
          users.firstCheckpointConfirmed.add(user);
          firstCheckpointConfirmedUsers.add(user);
        }
        break;
      }
      case "trail_completed": {
        const props = event.properties as TrailCompletedProps;
        // Skip duplicate trail completions from economic metrics
        if (!props.isDuplicate) {
          counts.trailCompleted++;
          users.trailCompleted.add(user);
        }
        break;
      }
      case "passport_viewed":
        counts.passportViewed++;
        users.passportViewed.add(user);
        break;
      case "team_joined":
        counts.teamJoined++;
        users.teamJoined.add(user);
        break;
      case "perk_issued":
        counts.perkIssued++;
        users.perkIssued.add(user);
        break;
      case "perk_redeemed":
        counts.perkRedeemed++;
        users.perkRedeemed.add(user);
        break;
    }
  }

  const startedUnique = users.trailStarted.size;
  const firstCheckpointUnique = users.firstCheckpointConfirmed.size;
  const completedUnique = users.trailCompleted.size;
  const seasonUnique = users.seasonViewed.size;
  const perkIssuedUnique = users.perkIssued.size;
  const perkRedeemedUnique = users.perkRedeemed.size;

  const toPct = (numerator: number, denominator: number): number => {
    if (denominator <= 0) return 0;
    return Math.round((numerator / denominator) * 1000) / 10;
  };

  const conversionRates: PilotFunnelConversionRates = {
    seasonToStartPct: toPct(startedUnique, seasonUnique),
    startToFirstCheckpointPct: toPct(firstCheckpointUnique, startedUnique),
    firstCheckpointToCompletePct: toPct(completedUnique, firstCheckpointUnique),
    startToCompletePct: toPct(completedUnique, startedUnique),
    perkRedemptionPct: toPct(perkRedeemedUnique, perkIssuedUnique),
  };

  const dropoffs: PilotFunnelDropoffs = {
    viewToStart: Math.max(0, seasonUnique - startedUnique),
    startToFirstCheckpoint: Math.max(0, startedUnique - firstCheckpointUnique),
    firstCheckpointToComplete: Math.max(
      0,
      firstCheckpointUnique - completedUnique,
    ),
  };

  const uniqueCounts: PilotFunnelStageCounts = {
    seasonViewed: users.seasonViewed.size,
    trailStarted: users.trailStarted.size,
    firstCheckpointConfirmed: users.firstCheckpointConfirmed.size,
    trailCompleted: users.trailCompleted.size,
    passportViewed: users.passportViewed.size,
    teamJoined: users.teamJoined.size,
    perkIssued: users.perkIssued.size,
    perkRedeemed: users.perkRedeemed.size,
  };

  return {
    counts,
    uniqueUsers: uniqueCounts,
    conversionRates,
    dropoffs,
    northStar: {
      weeklyVerifiedFinishers: users.trailCompleted.size,
      totalCompletions: counts.trailCompleted,
    },
  };
}

