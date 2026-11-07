import type {
  PerkCampaign,
  SeasonDefinition,
} from "@defi-trail/shared";
import type { TrailConfigSeed } from "@/lib/gameplay/config";

export type OrganizerVersionState = "PUBLISHED" | "ARCHIVED";

export interface OrganizerContent {
  season: SeasonDefinition;
  trails: TrailConfigSeed[];
  campaigns: PerkCampaign[];
}

export interface OrganizerValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface OrganizerDraftSnapshot {
  draftId: string;
  targetVersion: number;
  basePublishedVersion: number | null;
  sourceVersion?: number;
  updatedAt: string;
  content: OrganizerContent;
}

export interface OrganizerPublishedVersionSummary {
  version: number;
  state: OrganizerVersionState;
  publishedAt: string;
  archivedAt?: string;
  contentHash: string;
  seasonId: string;
  seasonName: string;
  sourceVersion?: number;
}

export interface OrganizerAuditEvent {
  eventId: string;
  eventType: "DRAFT_SAVED" | "PUBLISHED" | "ARCHIVED" | "RESTORE_DRAFTED";
  occurredAt: string;
  actorId: string;
  version?: number;
  sourceVersion?: number;
  contentHash?: string;
}

export interface OrganizerSeedCatalog {
  campusId: string;
  checkpoints: Array<{
    slot: number;
    type: "YIELD" | "QUEST" | "SPONSOR";
    label: string;
    sponsorCampaign: string | null;
  }>;
  badges: Array<{ id: string; title: string }>;
  teams: Array<{ id: string; name: string }>;
  campaigns: Array<{
    id: string;
    title: string;
    sponsorName: string;
  }>;
}

export interface OrganizerReadiness {
  status: "READY" | "BLOCKED" | "NO_PUBLISHED_CONTENT";
  publishedVersion: number | null;
  lifecycle: "ACTIVE" | "SCHEDULED" | "ENDED" | "NONE";
  seasonId: string | null;
  validationIssueCount: number;
  seededCheckpointCount: number;
  seededCampaignCount: number;
}

export interface OrganizerWorkspaceData {
  draft: OrganizerDraftSnapshot;
  validation: OrganizerValidationIssue[];
  currentPublishedVersion: number | null;
  versions: OrganizerPublishedVersionSummary[];
  audit: OrganizerAuditEvent[];
  catalog: OrganizerSeedCatalog;
  readiness: OrganizerReadiness;
}
