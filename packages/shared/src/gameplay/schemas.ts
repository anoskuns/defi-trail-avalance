import { z } from "zod";
import type {
  BadgeRule,
  EarnedBadge,
  GameplayEvidenceEvent,
  PassportStamp,
  PerkCampaign,
  PerkClaim,
  SeasonDefinition,
  TeamDefinition,
  TeamScoreEvent,
  TrailCheckpoint,
  TrailDefinition,
  TrailProgress,
} from "./types";

const IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const WALLET_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const TX_HASH_PATTERN = /^0x[a-fA-F0-9]{64}$/;

export const gameplayIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(IDENTIFIER_PATTERN, "Must be a stable identifier without whitespace");
export const walletAddressSchema = z
  .string()
  .regex(WALLET_PATTERN, "Must be a 20-byte hex wallet address");
export const isoDateTimeSchema = z
  .string()
  .datetime({ offset: true, message: "Must be an ISO-8601 timestamp" });
export const gameplayModeSchema = z.enum(["GPS", "DEMO"]);
export const gameplayEvidenceEventTypeSchema = z.enum([
  "CHEST_CONFIRMED",
  "QUEST_COMPLETED",
  "TRAIL_COMPLETED",
  "PERK_REDEEMED",
]);

function addDuplicateIssues(
  values: readonly string[],
  field: string,
  context: z.RefinementCtx,
): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      context.addIssue({
        code: "custom",
        message: `${field} must not contain duplicates`,
        path: [field],
      });
      return;
    }
    seen.add(value);
  }
}

function addWindowIssue(
  value: { startsAt: string; endsAt: string },
  context: z.RefinementCtx,
): void {
  if (Date.parse(value.startsAt) >= Date.parse(value.endsAt)) {
    context.addIssue({
      code: "custom",
      message: "endsAt must be after startsAt",
      path: ["endsAt"],
    });
  }
}

export const trailCheckpointSchema: z.ZodType<TrailCheckpoint> = z.strictObject({
  id: gameplayIdSchema,
  chestId: gameplayIdSchema,
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(1_000).optional(),
});

export const trailDefinitionSchema: z.ZodType<TrailDefinition> = z
  .strictObject({
    id: gameplayIdSchema,
    version: z.number().int().positive(),
    seasonId: gameplayIdSchema,
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().min(1).max(2_000),
    checkpointMode: z.enum(["ORDERED", "ANY_ORDER"]),
    checkpoints: z.array(trailCheckpointSchema).min(2).max(5),
    startsAt: isoDateTimeSchema,
    endsAt: isoDateTimeSchema,
    estimatedMinutes: z.number().int().positive().max(1_440),
    completionBadgeId: gameplayIdSchema.optional(),
    perkCampaignId: gameplayIdSchema.optional(),
    enabled: z.boolean(),
  })
  .superRefine((value, context) => {
    addWindowIssue(value, context);
    addDuplicateIssues(
      value.checkpoints.map((checkpoint) => checkpoint.id),
      "checkpoints",
      context,
    );
    const chestIds = value.checkpoints.map((checkpoint) => checkpoint.chestId);
    if (new Set(chestIds).size !== chestIds.length) {
      context.addIssue({
        code: "custom",
        message: "A trail cannot reference the same chest twice",
        path: ["checkpoints"],
      });
    }
  });

export const seasonDefinitionSchema: z.ZodType<SeasonDefinition> = z
  .strictObject({
    id: gameplayIdSchema,
    version: z.number().int().positive(),
    name: z.string().trim().min(1).max(160),
    startsAt: isoDateTimeSchema,
    endsAt: isoDateTimeSchema,
    themeKey: gameplayIdSchema,
    teamIds: z.array(gameplayIdSchema).min(3).max(4),
    trailIds: z.array(gameplayIdSchema).min(1),
    badgeIds: z.array(gameplayIdSchema),
    perkCampaignIds: z.array(gameplayIdSchema),
    status: z.enum(["DRAFT", "SCHEDULED", "ACTIVE", "ENDED"]),
  })
  .superRefine((value, context) => {
    addWindowIssue(value, context);
    addDuplicateIssues(value.teamIds, "teamIds", context);
    addDuplicateIssues(value.trailIds, "trailIds", context);
    addDuplicateIssues(value.badgeIds, "badgeIds", context);
    addDuplicateIssues(value.perkCampaignIds, "perkCampaignIds", context);
  });

const trailCheckpointCompletionSchema = z.strictObject({
  checkpointId: gameplayIdSchema,
  evidenceEventId: gameplayIdSchema,
  requestId: gameplayIdSchema.optional(),
  completedAt: isoDateTimeSchema,
  mode: gameplayModeSchema,
});

export const trailProgressSchema: z.ZodType<TrailProgress> = z
  .strictObject({
    trailId: gameplayIdSchema,
    player: walletAddressSchema,
    startedAt: isoDateTimeSchema,
    completedCheckpoints: z.array(trailCheckpointCompletionSchema),
    completedAt: isoDateTimeSchema.optional(),
  })
  .superRefine((value, context) => {
    addDuplicateIssues(
      value.completedCheckpoints.map((item) => item.checkpointId),
      "completedCheckpoints",
      context,
    );
    const eventIds = value.completedCheckpoints.map(
      (item) => item.evidenceEventId,
    );
    if (new Set(eventIds).size !== eventIds.length) {
      context.addIssue({
        code: "custom",
        message: "Evidence events must be unique",
        path: ["completedCheckpoints"],
      });
    }
    const requestIds = value.completedCheckpoints.flatMap((item) =>
      item.requestId ? [item.requestId] : [],
    );
    if (new Set(requestIds).size !== requestIds.length) {
      context.addIssue({
        code: "custom",
        message: "Request identities must be unique",
        path: ["completedCheckpoints"],
      });
    }
  });

export const passportStampSchema: z.ZodType<PassportStamp> = z.strictObject({
  stampId: gameplayIdSchema,
  player: walletAddressSchema,
  category: z.enum(["LOCATION", "TRAIL", "SEASON", "LEARNING", "SPONSOR"]),
  earnedAt: isoDateTimeSchema,
  evidenceRef: z.string().trim().min(1).max(256),
  artworkKey: gameplayIdSchema,
  seasonId: gameplayIdSchema.optional(),
});

export const badgeRuleSchema: z.ZodType<BadgeRule> = z.strictObject({
  badgeId: gameplayIdSchema,
  ruleVersion: z.number().int().positive(),
  eventType: gameplayEvidenceEventTypeSchema,
  threshold: z.number().int().positive().max(10_000),
  window: z.enum(["LIFETIME", "SEASON", "EPOCH"]),
});

export const earnedBadgeSchema: z.ZodType<EarnedBadge> = z
  .strictObject({
    badgeId: gameplayIdSchema,
    ruleVersion: z.number().int().positive(),
    player: walletAddressSchema,
    earnedAt: isoDateTimeSchema,
    evidenceRefs: z.array(z.string().trim().min(1).max(256)).min(1),
    seasonId: gameplayIdSchema.optional(),
    epochId: gameplayIdSchema.optional(),
  })
  .superRefine((value, context) => {
    addDuplicateIssues(value.evidenceRefs, "evidenceRefs", context);
  });

export const teamDefinitionSchema: z.ZodType<TeamDefinition> = z.strictObject({
  id: gameplayIdSchema,
  seasonId: gameplayIdSchema,
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(1_000),
  colorKey: gameplayIdSchema,
  enabled: z.boolean(),
});

export const teamScoreEventSchema: z.ZodType<TeamScoreEvent> = z.strictObject({
  scoreEventId: z.string().trim().min(1).max(512),
  sourceEventId: gameplayIdSchema,
  sourceRequestId: gameplayIdSchema.optional(),
  teamId: gameplayIdSchema,
  seasonId: gameplayIdSchema,
  player: walletAddressSchema,
  reason: z.enum([
    "CHECKPOINT_CONFIRMED",
    "TRAIL_COMPLETED",
    "QUEST_COMPLETED",
    "SPONSOR_REDEMPTION",
  ]),
  points: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  occurredAt: isoDateTimeSchema,
});

export const perkCampaignSchema: z.ZodType<PerkCampaign> = z
  .strictObject({
    id: gameplayIdSchema,
    version: z.number().int().positive(),
    seasonId: gameplayIdSchema,
    sponsorName: z.string().trim().min(1).max(160),
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().min(1).max(2_000),
    eligibleEventTypes: z.array(gameplayEvidenceEventTypeSchema).min(1),
    startsAt: isoDateTimeSchema,
    endsAt: isoDateTimeSchema,
    claimTtlSeconds: z.number().int().positive().max(31_536_000),
    maxClaimsPerPlayer: z.literal(1),
    enabled: z.boolean(),
  })
  .superRefine((value, context) => {
    addWindowIssue(value, context);
    addDuplicateIssues(
      value.eligibleEventTypes,
      "eligibleEventTypes",
      context,
    );
  });

export const perkClaimSchema: z.ZodType<PerkClaim> = z
  .strictObject({
    claimId: gameplayIdSchema,
    campaignId: gameplayIdSchema,
    player: walletAddressSchema,
    evidenceRef: z.string().trim().min(1).max(256),
    issuedAt: isoDateTimeSchema,
    expiresAt: isoDateTimeSchema,
    status: z.enum(["ISSUED", "REDEEMED", "EXPIRED", "REVOKED"]),
  })
  .superRefine((value, context) => {
    if (Date.parse(value.issuedAt) >= Date.parse(value.expiresAt)) {
      context.addIssue({
        code: "custom",
        message: "expiresAt must be after issuedAt",
        path: ["expiresAt"],
      });
    }
  });

export const gameplayEvidenceEventSchema: z.ZodType<GameplayEvidenceEvent> = z
  .strictObject({
    eventId: gameplayIdSchema,
    eventType: gameplayEvidenceEventTypeSchema,
    player: walletAddressSchema,
    seasonId: gameplayIdSchema,
    trailId: gameplayIdSchema.optional(),
    checkpointId: gameplayIdSchema.optional(),
    campaignId: gameplayIdSchema.optional(),
    requestId: gameplayIdSchema.optional(),
    epochId: gameplayIdSchema.optional(),
    chainId: z.number().int().positive().optional(),
    txHash: z.string().regex(TX_HASH_PATTERN).optional(),
    occurredAt: isoDateTimeSchema,
    mode: gameplayModeSchema,
  })
  .superRefine((value, context) => {
    if (value.checkpointId && !value.trailId) {
      context.addIssue({
        code: "custom",
        message: "checkpointId requires trailId",
        path: ["trailId"],
      });
    }
    if (
      value.eventType === "CHEST_CONFIRMED" &&
      value.trailId &&
      !value.checkpointId
    ) {
      context.addIssue({
        code: "custom",
        message: "A trail chest event requires checkpointId",
        path: ["checkpointId"],
      });
    }
    if (value.eventType === "TRAIL_COMPLETED" && !value.trailId) {
      context.addIssue({
        code: "custom",
        message: "TRAIL_COMPLETED requires trailId",
        path: ["trailId"],
      });
    }
    if (value.eventType === "PERK_REDEEMED" && !value.campaignId) {
      context.addIssue({
        code: "custom",
        message: "PERK_REDEEMED requires campaignId",
        path: ["campaignId"],
      });
    }
    if ((value.chainId === undefined) !== (value.txHash === undefined)) {
      context.addIssue({
        code: "custom",
        message: "chainId and txHash must be provided together",
        path: value.chainId === undefined ? ["chainId"] : ["txHash"],
      });
    }
  });

