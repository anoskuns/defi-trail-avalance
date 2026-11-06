import type { SeasonDefinition, TrailDefinition } from "@defi-trail/shared";

export const GAMEPLAY_CONFIG_VERSION = 1 as const;

export interface TrailCheckpointSlotConfig {
  id: string;
  slot: number;
  title: string;
  description?: string;
}

export interface TrailConfigSeed
  extends Omit<TrailDefinition, "checkpoints"> {
  campusId: string;
  checkpointSlots: readonly TrailCheckpointSlotConfig[];
}

export interface GameplayConfigSource {
  configVersion: number;
  seasons: readonly SeasonDefinition[];
  trails: readonly TrailConfigSeed[];
}

/**
 * Versioned, code-owned pilot configuration. Checkpoints refer to approved campus
 * slots; the repository resolves their epoch-specific chest IDs at read time.
 */
export const DEMO_GAMEPLAY_CONFIG = {
  configVersion: GAMEPLAY_CONFIG_VERSION,
  seasons: [
    {
      id: "demo-season-2026",
      version: 1,
      name: "DeFi Trail Campus Pilot",
      startsAt: "2026-01-01T00:00:00.000Z",
      endsAt: "2027-01-01T00:00:00.000Z",
      themeKey: "campus-pilot",
      teamIds: ["team-red", "team-blue", "team-green"],
      trailIds: ["today-campus-trail"],
      badgeIds: [],
      perkCampaignIds: [],
      status: "ACTIVE",
    },
  ],
  trails: [
    {
      id: "today-campus-trail",
      version: 1,
      seasonId: "demo-season-2026",
      campusId: "demo-campus-v1",
      title: "Today’s Campus Trail",
      description:
        "Complete three existing campus checkpoints without creating new economic actions.",
      checkpointMode: "ORDERED",
      checkpointSlots: [
        {
          id: "campus-library",
          slot: 0,
          title: "Central Library",
        },
        {
          id: "campus-engineering",
          slot: 1,
          title: "Engineering Hall",
        },
        {
          id: "campus-sponsor",
          slot: 2,
          title: "Student Center",
        },
      ],
      startsAt: "2026-01-01T00:00:00.000Z",
      endsAt: "2027-01-01T00:00:00.000Z",
      estimatedMinutes: 30,
      enabled: true,
    },
  ],
} satisfies GameplayConfigSource;

