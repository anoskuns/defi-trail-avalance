import crypto from "node:crypto";
import {
  perkCampaignSchema,
  seasonDefinitionSchema,
  trailDefinitionSchema,
  type PerkCampaign,
  type SeasonDefinition,
} from "@defi-trail/shared";
import { DEMO_CAMPUS_SLOTS, CAMPUS_ID, getDemoCampusConfig } from "@/lib/campus";
import { PASSPORT_BADGES } from "@/features/gameplay/passport/definitions";
import {
  SPONSOR_PERK_CAMPAIGNS,
} from "@/features/sponsor-perks/types";
import {
  DEMO_GAMEPLAY_CONFIG,
  type GameplayConfigSource,
  type TrailCheckpointSlotConfig,
  type TrailConfigSeed,
} from "@/lib/gameplay/config";
import type {
  OrganizerAuditEvent,
  OrganizerContent,
  OrganizerDraftSnapshot,
  OrganizerPublishedVersionSummary,
  OrganizerReadiness,
  OrganizerSeedCatalog,
  OrganizerValidationIssue,
  OrganizerWorkspaceData,
} from "@/features/organizer";

interface StoredPublishedVersion {
  version: number;
  publishedAt: string;
  archivedAt?: string;
  contentHash: string;
  sourceVersion?: number;
  content: OrganizerContent;
}

export class OrganizerContentError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "OrganizerContentError";
  }
}

const TEAM_SEEDS = [
  { id: "team-red", name: "Team Red" },
  { id: "team-blue", name: "Team Blue" },
  { id: "team-green", name: "Team Green" },
  { id: "team-gold", name: "Team Gold" },
] as const;

const FORBIDDEN_CONTENT_KEY =
  /(balance|principal|questbudget|rewardreserve|apr|inventory|contractaddress|privatekey|secret|rpcurl|tokenamount)/i;

function clone<T>(value: T): T {
  return structuredClone(value);
}

function contentHash(content: OrganizerContent): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(content))
    .digest("hex");
}

function issue(
  code: string,
  path: string,
  message: string,
): OrganizerValidationIssue {
  return { code, path, message };
}

function addSchemaIssues(
  target: OrganizerValidationIssue[],
  prefix: string,
  errors: readonly { path: PropertyKey[]; message: string }[],
): void {
  for (const error of errors) {
    target.push(
      issue(
        "SCHEMA_INVALID",
        [prefix, ...error.path.map(String)].filter(Boolean).join("."),
        error.message,
      ),
    );
  }
}

function assertNoForbiddenEconomicKeys(value: unknown, path = "content"): void {
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    const nestedPath = `${path}.${key}`;
    if (FORBIDDEN_CONTENT_KEY.test(key)) {
      throw new OrganizerContentError(
        "ECONOMIC_FIELD_FORBIDDEN",
        `Organizer content cannot edit economic field '${nestedPath}'.`,
        400,
      );
    }
    assertNoForbiddenEconomicKeys(nested, nestedPath);
  }
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new OrganizerContentError(
      "INVALID_CONTENT",
      `${label} must be an object.`,
      400,
    );
  }
  return value as Record<string, unknown>;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function stringArray(value: unknown): string[] {
  return asArray(value).map((entry) => String(entry));
}

function sanitizeCheckpoint(value: unknown): TrailCheckpointSlotConfig {
  const record = asRecord(value, "checkpoint");
  return {
    id: String(record.id ?? ""),
    slot: Number(record.slot),
    title: String(record.title ?? ""),
    ...(record.description
      ? { description: String(record.description) }
      : {}),
  };
}

function sanitizeTrail(value: unknown): TrailConfigSeed {
  const record = asRecord(value, "trail");
  return {
    id: String(record.id ?? ""),
    version: Number(record.version),
    seasonId: String(record.seasonId ?? ""),
    campusId: String(record.campusId ?? ""),
    title: String(record.title ?? ""),
    description: String(record.description ?? ""),
    checkpointMode:
      record.checkpointMode === "ANY_ORDER" ? "ANY_ORDER" : "ORDERED",
    checkpointSlots: asArray(record.checkpointSlots).map(sanitizeCheckpoint),
    startsAt: String(record.startsAt ?? ""),
    endsAt: String(record.endsAt ?? ""),
    estimatedMinutes: Number(record.estimatedMinutes),
    ...(record.completionBadgeId
      ? { completionBadgeId: String(record.completionBadgeId) }
      : {}),
    ...(record.perkCampaignId
      ? { perkCampaignId: String(record.perkCampaignId) }
      : {}),
    enabled: Boolean(record.enabled),
  };
}

function sanitizeCampaign(value: unknown): PerkCampaign {
  const record = asRecord(value, "campaign");
  return {
    id: String(record.id ?? ""),
    version: Number(record.version),
    seasonId: String(record.seasonId ?? ""),
    sponsorName: String(record.sponsorName ?? ""),
    title: String(record.title ?? ""),
    description: String(record.description ?? ""),
    eligibleEventTypes: asArray(record.eligibleEventTypes).map((event) =>
      String(event),
    ) as PerkCampaign["eligibleEventTypes"],
    startsAt: String(record.startsAt ?? ""),
    endsAt: String(record.endsAt ?? ""),
    claimTtlSeconds: Number(record.claimTtlSeconds),
    maxClaimsPerPlayer: 1,
    enabled: Boolean(record.enabled),
  };
}

function sanitizeSeason(value: unknown): SeasonDefinition {
  const record = asRecord(value, "season");
  return {
    id: String(record.id ?? ""),
    version: Number(record.version),
    name: String(record.name ?? ""),
    startsAt: String(record.startsAt ?? ""),
    endsAt: String(record.endsAt ?? ""),
    themeKey: String(record.themeKey ?? ""),
    teamIds: stringArray(record.teamIds),
    trailIds: stringArray(record.trailIds),
    badgeIds: stringArray(record.badgeIds),
    perkCampaignIds: stringArray(record.perkCampaignIds),
    status: "DRAFT",
  };
}

function sanitizeContent(value: unknown): OrganizerContent {
  assertNoForbiddenEconomicKeys(value);
  const record = asRecord(value, "content");
  return {
    season: sanitizeSeason(record.season),
    trails: asArray(record.trails).map(sanitizeTrail),
    campaigns: asArray(record.campaigns).map(sanitizeCampaign),
  };
}

function seedCampaigns(season: SeasonDefinition): PerkCampaign[] {
  return SPONSOR_PERK_CAMPAIGNS.map((campaign) => ({
    id: campaign.id,
    version: season.version,
    seasonId: season.id,
    sponsorName: "Campus Sponsor",
    title: campaign.title,
    description: campaign.description,
    eligibleEventTypes: ["CHEST_CONFIRMED"],
    startsAt: season.startsAt,
    endsAt: season.endsAt,
    claimTtlSeconds: campaign.claimTtlSeconds,
    maxClaimsPerPlayer: 1,
    enabled: true,
  }));
}

function seedContent(): OrganizerContent {
  const season = clone(DEMO_GAMEPLAY_CONFIG.seasons[0]);
  return {
    season,
    trails: clone([...DEMO_GAMEPLAY_CONFIG.trails]),
    campaigns: seedCampaigns(season),
  };
}

export function getOrganizerSeedCatalog(): OrganizerSeedCatalog {
  return {
    campusId: CAMPUS_ID,
    checkpoints: DEMO_CAMPUS_SLOTS.map((slot) => ({
      slot: slot.slot,
      type: slot.type,
      label: `Slot ${slot.slot + 1} · ${slot.type}`,
      sponsorCampaign: slot.sponsorCampaign,
    })),
    badges: PASSPORT_BADGES.map((badge) => ({
      id: badge.rule.badgeId,
      title: badge.title,
    })),
    teams: TEAM_SEEDS.map((team) => ({ ...team })),
    campaigns: SPONSOR_PERK_CAMPAIGNS.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      sponsorName: "Campus Sponsor",
    })),
  };
}

export function validateOrganizerContent(
  content: OrganizerContent,
): OrganizerValidationIssue[] {
  const issues: OrganizerValidationIssue[] = [];
  const catalog = getOrganizerSeedCatalog();
  const campus = getDemoCampusConfig(0);
  const badgeIds = new Set(catalog.badges.map((badge) => badge.id));
  const teamIds = new Set(catalog.teams.map((team) => team.id));
  const seededCampaignIds = new Set(
    catalog.campaigns.map((campaign) => campaign.id),
  );

  const seasonResult = seasonDefinitionSchema.safeParse(content.season);
  if (!seasonResult.success) {
    addSchemaIssues(issues, "season", seasonResult.error.issues);
  }

  for (const teamId of content.season.teamIds) {
    if (!teamIds.has(teamId)) {
      issues.push(issue("UNSEEDED_TEAM", "season.teamIds", `Unknown team '${teamId}'.`));
    }
  }
  for (const badgeId of content.season.badgeIds) {
    if (!badgeIds.has(badgeId)) {
      issues.push(issue("MISSING_BADGE", "season.badgeIds", `Badge '${badgeId}' is not seeded.`));
    }
  }

  const trailIds = new Set(content.trails.map((trail) => trail.id));
  const campaignIds = new Set(content.campaigns.map((campaign) => campaign.id));
  for (const trailId of content.season.trailIds) {
    if (!trailIds.has(trailId)) {
      issues.push(issue("MISSING_TRAIL", "season.trailIds", `Trail '${trailId}' is missing.`));
    }
  }
  for (const campaignId of content.season.perkCampaignIds) {
    if (!campaignIds.has(campaignId)) {
      issues.push(issue("MISSING_PERK", "season.perkCampaignIds", `Perk '${campaignId}' is missing.`));
    }
  }

  const slots = new Map(campus.slots.map((slot) => [slot.slot, slot] as const));
  content.trails.forEach((trail, trailIndex) => {
    if (trail.seasonId !== content.season.id) {
      issues.push(issue("SEASON_MISMATCH", `trails.${trailIndex}.seasonId`, "Trail must belong to this season."));
    }
    if (trail.campusId !== catalog.campusId) {
      issues.push(issue("UNSEEDED_CAMPUS", `trails.${trailIndex}.campusId`, "Trail must use the approved campus seed."));
    }
    const seenSlots = new Set<number>();
    const checkpoints = trail.checkpointSlots.flatMap((checkpoint, checkpointIndex) => {
      const slot = slots.get(checkpoint.slot);
      if (!slot) {
        issues.push(issue("UNSEEDED_CHECKPOINT", `trails.${trailIndex}.checkpointSlots.${checkpointIndex}.slot`, `Slot ${checkpoint.slot} is not seeded.`));
        return [];
      }
      if (seenSlots.has(checkpoint.slot)) {
        issues.push(issue("DUPLICATE_CHECKPOINT", `trails.${trailIndex}.checkpointSlots`, `Slot ${checkpoint.slot} is selected more than once.`));
      }
      seenSlots.add(checkpoint.slot);
      return [{
        id: checkpoint.id,
        chestId: slot.chestId,
        title: checkpoint.title,
        ...(checkpoint.description ? { description: checkpoint.description } : {}),
      }];
    });
    const { campusId, checkpointSlots, ...definition } = trail;
    void campusId;
    void checkpointSlots;
    const trailResult = trailDefinitionSchema.safeParse({ ...definition, checkpoints });
    if (!trailResult.success) {
      addSchemaIssues(issues, `trails.${trailIndex}`, trailResult.error.issues);
    }
    if (
      Date.parse(trail.startsAt) < Date.parse(content.season.startsAt) ||
      Date.parse(trail.endsAt) > Date.parse(content.season.endsAt)
    ) {
      issues.push(issue("TRAIL_OUTSIDE_SEASON", `trails.${trailIndex}`, "Trail window must stay inside the season window."));
    }
    if (trail.completionBadgeId && !badgeIds.has(trail.completionBadgeId)) {
      issues.push(issue("MISSING_BADGE", `trails.${trailIndex}.completionBadgeId`, `Badge '${trail.completionBadgeId}' is not seeded.`));
    }
    if (trail.perkCampaignId && !campaignIds.has(trail.perkCampaignId)) {
      issues.push(issue("MISSING_PERK", `trails.${trailIndex}.perkCampaignId`, `Perk '${trail.perkCampaignId}' is missing.`));
    }
    if (trail.perkCampaignId) {
      const hasMatchingSponsorCheckpoint = trail.checkpointSlots.some(
        (checkpoint) => slots.get(checkpoint.slot)?.sponsorCampaign === trail.perkCampaignId,
      );
      if (!hasMatchingSponsorCheckpoint) {
        issues.push(issue("PERK_CHECKPOINT_MISMATCH", `trails.${trailIndex}.perkCampaignId`, "Perk requires its seeded sponsor checkpoint."));
      }
    }
  });

  const enabledTrails = content.trails.filter((trail) => trail.enabled);
  for (let leftIndex = 0; leftIndex < enabledTrails.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < enabledTrails.length; rightIndex += 1) {
      const left = enabledTrails[leftIndex]!;
      const right = enabledTrails[rightIndex]!;
      const overlaps =
        Math.max(Date.parse(left.startsAt), Date.parse(right.startsAt)) <
        Math.min(Date.parse(left.endsAt), Date.parse(right.endsAt));
      if (overlaps) {
        issues.push(
          issue(
            "AMBIGUOUS_ACTIVE_TRAILS",
            "trails",
            `Enabled trails '${left.id}' and '${right.id}' have overlapping windows.`,
          ),
        );
      }
    }
  }

  content.campaigns.forEach((campaign, campaignIndex) => {
    const result = perkCampaignSchema.safeParse(campaign);
    if (!result.success) {
      addSchemaIssues(issues, `campaigns.${campaignIndex}`, result.error.issues);
    }
    if (!seededCampaignIds.has(campaign.id)) {
      issues.push(issue("UNSEEDED_CAMPAIGN", `campaigns.${campaignIndex}.id`, `Campaign '${campaign.id}' is not an approved seed.`));
    }
    if (campaign.seasonId !== content.season.id) {
      issues.push(issue("SEASON_MISMATCH", `campaigns.${campaignIndex}.seasonId`, "Campaign must belong to this season."));
    }
    if (
      Date.parse(campaign.startsAt) < Date.parse(content.season.startsAt) ||
      Date.parse(campaign.endsAt) > Date.parse(content.season.endsAt)
    ) {
      issues.push(issue("CAMPAIGN_OUTSIDE_SEASON", `campaigns.${campaignIndex}`, "Campaign window must stay inside the season window."));
    }
  });

  if (new Set(content.trails.map((trail) => trail.id)).size !== content.trails.length) {
    issues.push(issue("DUPLICATE_TRAIL", "trails", "Trail IDs must be unique."));
  }
  if (new Set(content.campaigns.map((campaign) => campaign.id)).size !== content.campaigns.length) {
    issues.push(issue("DUPLICATE_CAMPAIGN", "campaigns", "Campaign IDs must be unique."));
  }

  return issues;
}

export class OrganizerContentService {
  private static instance: OrganizerContentService | null = null;
  private readonly versions = new Map<number, StoredPublishedVersion>();
  private readonly auditEvents: OrganizerAuditEvent[] = [];
  private readonly now: () => number;
  private draft: OrganizerDraftSnapshot;
  private activePublishedVersion: number | null = 1;

  constructor(options: { initialContent?: OrganizerContent; now?: () => number } = {}) {
    this.now = options.now ?? Date.now;
    const initial = clone(options.initialContent ?? seedContent());
    const publishedAt = new Date(this.now()).toISOString();
    const hash = contentHash(initial);
    this.versions.set(1, {
      version: 1,
      publishedAt,
      contentHash: hash,
      content: clone(initial),
    });
    this.auditEvents.push({
      eventId: `aud_${crypto.randomUUID()}`,
      eventType: "PUBLISHED",
      occurredAt: publishedAt,
      actorId: "system-seed",
      version: 1,
      contentHash: hash,
    });
    this.draft = this.createDraftSnapshot(initial, 2, 1);
  }

  static getInstance(): OrganizerContentService {
    if (!OrganizerContentService.instance) {
      OrganizerContentService.instance = new OrganizerContentService();
    }
    return OrganizerContentService.instance;
  }

  static resetInstance(options?: { initialContent?: OrganizerContent; now?: () => number }): OrganizerContentService {
    OrganizerContentService.instance = new OrganizerContentService(options);
    return OrganizerContentService.instance;
  }

  getWorkspace(at = new Date(this.now())): OrganizerWorkspaceData {
    return {
      draft: clone(this.draft),
      validation: validateOrganizerContent(this.draft.content),
      currentPublishedVersion: this.activePublishedVersion,
      versions: this.getVersionSummaries(),
      audit: clone(this.auditEvents).reverse(),
      catalog: getOrganizerSeedCatalog(),
      readiness: this.getReadiness(at),
    };
  }

  saveDraft(rawContent: unknown, actorId: string): OrganizerDraftSnapshot {
    const content = sanitizeContent(rawContent);
    const targetVersion = this.latestVersion() + 1;
    this.normalizeVersions(content, targetVersion, "DRAFT");
    this.draft = this.createDraftSnapshot(
      content,
      targetVersion,
      this.latestVersion(),
      this.draft.sourceVersion,
    );
    this.appendAudit({
      eventType: "DRAFT_SAVED",
      actorId,
      version: targetVersion,
      contentHash: contentHash(content),
    });
    return clone(this.draft);
  }

  publish(input: {
    actorId: string;
    expectedPublishedVersion: number;
    confirmation: string;
  }): StoredPublishedVersion {
    if (input.confirmation !== "PUBLISH") {
      throw new OrganizerContentError("PUBLISH_CONFIRMATION_REQUIRED", "Type PUBLISH to confirm publication.", 400);
    }
    if (input.expectedPublishedVersion !== this.latestVersion()) {
      throw new OrganizerContentError("VERSION_CONFLICT", "Published content changed. Reload before publishing.", 409);
    }
    const issues = validateOrganizerContent(this.draft.content);
    if (issues.length > 0) {
      throw new OrganizerContentError("INVALID_DRAFT", "Invalid organizer content cannot be published.", 422);
    }

    const version = this.latestVersion() + 1;
    const content = clone(this.draft.content);
    this.normalizeVersions(content, version, "ACTIVE");
    const stored: StoredPublishedVersion = {
      version,
      publishedAt: new Date(this.now()).toISOString(),
      contentHash: contentHash(content),
      ...(this.draft.sourceVersion ? { sourceVersion: this.draft.sourceVersion } : {}),
      content,
    };
    this.versions.set(version, clone(stored));
    this.activePublishedVersion = version;
    this.appendAudit({
      eventType: "PUBLISHED",
      actorId: input.actorId,
      version,
      ...(stored.sourceVersion ? { sourceVersion: stored.sourceVersion } : {}),
      contentHash: stored.contentHash,
    });
    this.draft = this.createDraftSnapshot(content, version + 1, version);
    return clone(stored);
  }

  archive(input: {
    actorId: string;
    expectedPublishedVersion: number;
    confirmation: string;
  }): void {
    if (input.confirmation !== "ARCHIVE") {
      throw new OrganizerContentError("ARCHIVE_CONFIRMATION_REQUIRED", "Type ARCHIVE to confirm archival.", 400);
    }
    if (
      this.activePublishedVersion === null ||
      input.expectedPublishedVersion !== this.activePublishedVersion
    ) {
      throw new OrganizerContentError("VERSION_CONFLICT", "Only the current published version can be archived.", 409);
    }
    const stored = this.versions.get(this.activePublishedVersion)!;
    stored.archivedAt = new Date(this.now()).toISOString();
    this.appendAudit({
      eventType: "ARCHIVED",
      actorId: input.actorId,
      version: stored.version,
      contentHash: stored.contentHash,
    });
    this.activePublishedVersion = null;
  }

  restoreVersion(version: number, actorId: string): OrganizerDraftSnapshot {
    const source = this.versions.get(version);
    if (!source) {
      throw new OrganizerContentError("VERSION_NOT_FOUND", "Published version was not found.", 404);
    }
    const targetVersion = this.latestVersion() + 1;
    const content = clone(source.content);
    this.normalizeVersions(content, targetVersion, "DRAFT");
    this.draft = this.createDraftSnapshot(
      content,
      targetVersion,
      this.latestVersion(),
      version,
    );
    this.appendAudit({
      eventType: "RESTORE_DRAFTED",
      actorId,
      version: targetVersion,
      sourceVersion: version,
      contentHash: contentHash(content),
    });
    return clone(this.draft);
  }

  getPlayerConfigSource(): GameplayConfigSource {
    const active = this.activePublishedVersion === null
      ? null
      : this.versions.get(this.activePublishedVersion) ?? null;
    if (!active) {
      return {
        configVersion: Math.max(1, this.latestVersion()),
        seasons: [],
        trails: [],
        campaigns: [],
      };
    }
    return {
      configVersion: active.version,
      seasons: [clone(active.content.season)],
      trails: clone(active.content.trails),
      campaigns: clone(active.content.campaigns),
    };
  }

  getReadiness(at = new Date(this.now())): OrganizerReadiness {
    const catalog = getOrganizerSeedCatalog();
    const active = this.activePublishedVersion === null
      ? null
      : this.versions.get(this.activePublishedVersion) ?? null;
    if (!active) {
      return {
        status: "NO_PUBLISHED_CONTENT",
        publishedVersion: null,
        lifecycle: "NONE",
        seasonId: null,
        validationIssueCount: 0,
        seededCheckpointCount: catalog.checkpoints.length,
        seededCampaignCount: catalog.campaigns.length,
      };
    }
    const validationIssueCount = validateOrganizerContent(active.content).length;
    const now = at.getTime();
    const start = Date.parse(active.content.season.startsAt);
    const end = Date.parse(active.content.season.endsAt);
    const lifecycle = now < start ? "SCHEDULED" : now >= end ? "ENDED" : "ACTIVE";
    return {
      status: validationIssueCount === 0 ? "READY" : "BLOCKED",
      publishedVersion: active.version,
      lifecycle,
      seasonId: active.content.season.id,
      validationIssueCount,
      seededCheckpointCount: catalog.checkpoints.length,
      seededCampaignCount: catalog.campaigns.length,
    };
  }

  private latestVersion(): number {
    return Math.max(...this.versions.keys());
  }

  private createDraftSnapshot(
    content: OrganizerContent,
    targetVersion: number,
    basePublishedVersion: number | null,
    sourceVersion?: number,
  ): OrganizerDraftSnapshot {
    const draftContent = clone(content);
    this.normalizeVersions(draftContent, targetVersion, "DRAFT");
    return {
      draftId: `draft-v${targetVersion}`,
      targetVersion,
      basePublishedVersion,
      ...(sourceVersion ? { sourceVersion } : {}),
      updatedAt: new Date(this.now()).toISOString(),
      content: draftContent,
    };
  }

  private normalizeVersions(
    content: OrganizerContent,
    version: number,
    seasonStatus: SeasonDefinition["status"],
  ): void {
    content.season.version = version;
    content.season.status = seasonStatus;
    content.trails.forEach((trail) => {
      trail.version = version;
      trail.seasonId = content.season.id;
    });
    content.campaigns.forEach((campaign) => {
      campaign.version = version;
      campaign.seasonId = content.season.id;
    });
    content.season.trailIds = content.trails.map((trail) => trail.id);
    content.season.perkCampaignIds = content.campaigns.map((campaign) => campaign.id);
  }

  private getVersionSummaries(): OrganizerPublishedVersionSummary[] {
    return Array.from(this.versions.values())
      .sort((left, right) => right.version - left.version)
      .map((version) => ({
        version: version.version,
        state: version.archivedAt ? "ARCHIVED" : "PUBLISHED",
        publishedAt: version.publishedAt,
        ...(version.archivedAt ? { archivedAt: version.archivedAt } : {}),
        contentHash: version.contentHash,
        seasonId: version.content.season.id,
        seasonName: version.content.season.name,
        ...(version.sourceVersion ? { sourceVersion: version.sourceVersion } : {}),
      }));
  }

  private appendAudit(
    event: Omit<OrganizerAuditEvent, "eventId" | "occurredAt">,
  ): void {
    this.auditEvents.push({
      ...event,
      eventId: `aud_${crypto.randomUUID()}`,
      occurredAt: new Date(this.now()).toISOString(),
    });
  }
}

export function getOrganizerContentService(): OrganizerContentService {
  return OrganizerContentService.getInstance();
}
