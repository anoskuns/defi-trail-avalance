import {
  perkCampaignSchema,
  seasonDefinitionSchema,
  trailDefinitionSchema,
  validateActiveWindow,
  type PerkCampaign,
  type SeasonDefinition,
  type TrailDefinition,
} from "@defi-trail/shared";
import {
  getDemoCampusConfig,
  type MapConfigResponse,
} from "@/lib/campus";
import {
  type GameplayConfigSource,
  type TrailConfigSeed,
} from "./config";
import { GameplayConfigError } from "./errors";
import { getOrganizerContentService } from "@/lib/organizer-content-service";

type CampusConfig = Pick<MapConfigResponse, "campusId" | "slots">;
type CampusConfigLoader = (timestampSec: number) => CampusConfig;

export interface TodayTrailResult {
  season: SeasonDefinition;
  trail: TrailDefinition;
}

export interface GameplayConfigRepository {
  readonly configVersion: number;
  getActiveSeason(at: Date): SeasonDefinition | null;
  getTodayTrail(at: Date): TodayTrailResult | null;
  getActiveCampaigns(at: Date): PerkCampaign[];
}

function assertValidDate(at: Date): void {
  if (!Number.isFinite(at.getTime())) {
    throw new GameplayConfigError("A valid UTC instant is required");
  }
}

function assertUniqueIds(
  values: readonly { id: string }[],
  label: string,
): void {
  const ids = values.map((value) => value.id);
  if (new Set(ids).size !== ids.length) {
    throw new GameplayConfigError(`${label} IDs must be unique`);
  }
}

function resolveTrail(
  seed: TrailConfigSeed,
  campusConfig: CampusConfig,
): TrailDefinition {
  if (seed.campusId !== campusConfig.campusId) {
    throw new GameplayConfigError(
      `Trail ${seed.id} references an unknown campus`,
    );
  }

  const slotsByNumber = new Map(
    campusConfig.slots.map((slot) => [slot.slot, slot] as const),
  );
  const checkpoints = seed.checkpointSlots.map((checkpoint) => {
    const slot = slotsByNumber.get(checkpoint.slot);
    if (!slot) {
      throw new GameplayConfigError(
        `Trail ${seed.id} references missing campus slot ${checkpoint.slot}`,
      );
    }
    return {
      id: checkpoint.id,
      chestId: slot.chestId,
      title: checkpoint.title,
      ...(checkpoint.description
        ? { description: checkpoint.description }
        : {}),
    };
  });

  const { campusId, checkpointSlots, ...definition } = seed;
  void campusId;
  void checkpointSlots;
  return trailDefinitionSchema.parse({ ...definition, checkpoints });
}

export class VersionedGameplayConfigRepository
  implements GameplayConfigRepository
{
  readonly configVersion: number;
  private readonly seasons: SeasonDefinition[];
  private readonly trails: TrailConfigSeed[];
  private readonly campaigns: PerkCampaign[];

  constructor(
    source: GameplayConfigSource,
    private readonly loadCampusConfig: CampusConfigLoader = getDemoCampusConfig,
  ) {
    if (!Number.isSafeInteger(source.configVersion) || source.configVersion <= 0) {
      throw new GameplayConfigError(
        "Gameplay configVersion must be a positive safe integer",
      );
    }

    try {
      this.configVersion = source.configVersion;
      this.seasons = source.seasons.map((season) =>
        seasonDefinitionSchema.parse(season),
      );
      this.trails = source.trails.map((trail) => ({
        ...trail,
        checkpointSlots: trail.checkpointSlots.map((checkpoint) => ({
          ...checkpoint,
        })),
      }));
      this.campaigns = source.campaigns.map((campaign) =>
        perkCampaignSchema.parse(campaign),
      );

      assertUniqueIds(this.seasons, "Season");
      assertUniqueIds(this.trails, "Trail");
      assertUniqueIds(this.campaigns, "Campaign");

      const validationCampus = this.loadCampusConfig(0);
      const resolvedTrails = this.trails.map((trail) =>
        resolveTrail(trail, validationCampus),
      );
      const seasonIds = new Set(this.seasons.map((season) => season.id));
      const trailsById = new Map(
        resolvedTrails.map((trail) => [trail.id, trail] as const),
      );
      const campaignsById = new Map(
        this.campaigns.map((campaign) => [campaign.id, campaign] as const),
      );

      for (const trail of resolvedTrails) {
        if (!seasonIds.has(trail.seasonId)) {
          throw new GameplayConfigError(
            `Trail ${trail.id} references missing season ${trail.seasonId}`,
          );
        }
      }

      for (const season of this.seasons) {
        for (const trailId of season.trailIds) {
          const trail = trailsById.get(trailId);
          if (!trail || trail.seasonId !== season.id) {
            throw new GameplayConfigError(
              `Season ${season.id} references invalid trail ${trailId}`,
            );
          }
        }
        for (const campaignId of season.perkCampaignIds) {
          const campaign = campaignsById.get(campaignId);
          if (!campaign || campaign.seasonId !== season.id) {
            throw new GameplayConfigError(
              `Season ${season.id} references invalid campaign ${campaignId}`,
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof GameplayConfigError) {
        throw error;
      }
      throw new GameplayConfigError("Gameplay configuration is invalid", {
        cause: error,
      });
    }
  }

  getActiveSeason(at: Date): SeasonDefinition | null {
    assertValidDate(at);
    const isoInstant = at.toISOString();
    const activeSeasons = this.seasons.filter(
      (season) =>
        season.status === "ACTIVE" &&
        validateActiveWindow(season, isoInstant),
    );
    if (activeSeasons.length > 1) {
      throw new GameplayConfigError(
        "Multiple active seasons make the configuration ambiguous",
      );
    }
    return activeSeasons[0] ?? null;
  }

  getTodayTrail(at: Date): TodayTrailResult | null {
    const season = this.getActiveSeason(at);
    if (!season) {
      return null;
    }

    const isoInstant = at.toISOString();
    const activeSeeds = this.trails.filter(
      (trail) =>
        trail.seasonId === season.id &&
        season.trailIds.includes(trail.id) &&
        trail.enabled &&
        validateActiveWindow(trail, isoInstant),
    );
    if (activeSeeds.length > 1) {
      throw new GameplayConfigError(
        "Multiple active Today’s Trails make the configuration ambiguous",
      );
    }
    const seed = activeSeeds[0];
    if (!seed) {
      return null;
    }

    const timestampSec = Math.floor(at.getTime() / 1_000);
    return {
      season,
      trail: resolveTrail(seed, this.loadCampusConfig(timestampSec)),
    };
  }

  getActiveCampaigns(at: Date): PerkCampaign[] {
    const season = this.getActiveSeason(at);
    if (!season) return [];
    const isoInstant = at.toISOString();
    return this.campaigns
      .filter(
        (campaign) =>
          campaign.seasonId === season.id &&
          season.perkCampaignIds.includes(campaign.id) &&
          campaign.enabled &&
          validateActiveWindow(campaign, isoInstant),
      )
      .map((campaign) => ({ ...campaign }));
  }
}

export function getGameplayConfigRepository(): GameplayConfigRepository {
  return new VersionedGameplayConfigRepository(
    getOrganizerContentService().getPlayerConfigSource(),
  );
}

