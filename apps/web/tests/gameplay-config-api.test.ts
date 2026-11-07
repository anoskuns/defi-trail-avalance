import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as getMapConfig } from "../src/app/api/map-config/route";
import { GET as getActiveSeason } from "../src/app/api/gameplay/seasons/active/route";
import { GET as getTodayTrail } from "../src/app/api/gameplay/trails/today/route";
import { GET as getActiveCampaigns } from "../src/app/api/gameplay/campaigns/active/route";
import { getDemoCampusConfig } from "../src/lib/campus";
import {
  DEMO_GAMEPLAY_CONFIG,
  type GameplayConfigSource,
} from "../src/lib/gameplay/config";
import {
  GameplayConfigError,
  GAMEPLAY_CACHE_CONTROL,
} from "../src/lib/gameplay/errors";
import {
  VersionedGameplayConfigRepository,
  type GameplayConfigRepository,
} from "../src/lib/gameplay/repository";
import * as repositoryModule from "../src/lib/gameplay/repository";

const activeInstant = new Date("2026-11-06T12:00:00.000Z");

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("GE-02 gameplay config API", () => {
  it("returns a versioned active season and Today’s Trail", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(activeInstant);

    const seasonResponse = await getActiveSeason();
    expect(seasonResponse.status).toBe(200);
    expect(seasonResponse.headers.get("cache-control")).toBe(
      GAMEPLAY_CACHE_CONTROL,
    );
    expect(seasonResponse.headers.get("x-gameplay-api-version")).toBe("v1");
    const seasonBody = await seasonResponse.json();
    expect(seasonBody).toMatchObject({
      apiVersion: "v1",
      state: "ACTIVE",
      data: {
        season: {
          id: "demo-season-2026",
          version: 1,
          status: "ACTIVE",
        },
      },
      meta: { configVersion: 1 },
    });

    const trailResponse = await getTodayTrail();
    expect(trailResponse.status).toBe(200);
    const trailBody = await trailResponse.json();
    expect(trailBody.state).toBe("ACTIVE");
    expect(trailBody.data.trail.checkpoints).toHaveLength(3);

    const campus = getDemoCampusConfig(
      Math.floor(activeInstant.getTime() / 1_000),
    );
    expect(
      trailBody.data.trail.checkpoints.map(
        (checkpoint: { chestId: string }) => checkpoint.chestId,
      ),
    ).toEqual(campus.slots.slice(0, 3).map((slot) => slot.chestId));

    const serialized = JSON.stringify(trailBody);
    expect(serialized).not.toContain('"lat"');
    expect(serialized).not.toContain('"lng"');
    expect(serialized).not.toContain("PROOF_SIGNER_PRIVATE_KEY");

    const campaignBody = await (await getActiveCampaigns()).json();
    expect(campaignBody).toMatchObject({
      state: "ACTIVE",
      data: { campaigns: [{ id: "demo-coffee-v1", version: 1 }] },
      meta: { configVersion: 1 },
    });
  });

  it("returns explicit empty states when no season or trail is active", async () => {
    const emptyRepository: GameplayConfigRepository = {
      configVersion: 9,
      getActiveSeason: () => null,
      getTodayTrail: () => null,
      getActiveCampaigns: () => [],
    };
    vi.spyOn(
      repositoryModule,
      "getGameplayConfigRepository",
    ).mockReturnValue(emptyRepository);

    const seasonBody = await (await getActiveSeason()).json();
    expect(seasonBody).toEqual({
      apiVersion: "v1",
      state: "EMPTY",
      data: null,
      meta: { configVersion: 9, reason: "NO_ACTIVE_SEASON" },
    });

    const trailBody = await (await getTodayTrail()).json();
    expect(trailBody).toEqual({
      apiVersion: "v1",
      state: "EMPTY",
      data: null,
      meta: { configVersion: 9, reason: "NO_ACTIVE_TRAIL" },
    });

    const campaignBody = await (await getActiveCampaigns()).json();
    expect(campaignBody).toEqual({
      apiVersion: "v1",
      state: "EMPTY",
      data: null,
      meta: { configVersion: 9, reason: "NO_ACTIVE_CAMPAIGN" },
    });
  });

  it("uses a safe, consistent error envelope without leaking secrets", async () => {
    const failingRepository: GameplayConfigRepository = {
      configVersion: 1,
      getActiveSeason: () => {
        throw new Error("PROOF_SIGNER_PRIVATE_KEY=do-not-leak");
      },
      getTodayTrail: () => {
        throw new Error("DATABASE_URL=do-not-leak");
      },
      getActiveCampaigns: () => {
        throw new Error("ORGANIZER_ACCESS_TOKEN=do-not-leak");
      },
    };
    vi.spyOn(
      repositoryModule,
      "getGameplayConfigRepository",
    ).mockReturnValue(failingRepository);

    for (const response of [
      await getActiveSeason(),
      await getTodayTrail(),
      await getActiveCampaigns(),
    ]) {
      expect(response.status).toBe(500);
      expect(response.headers.get("cache-control")).toBe("no-store");
      const body = await response.json();
      expect(body).toEqual({
        error: {
          code: "GAMEPLAY_CONFIG_UNAVAILABLE",
          message: "Gameplay configuration is temporarily unavailable",
          retryable: true,
        },
      });
      expect(JSON.stringify(body)).not.toContain("do-not-leak");
    }
  });

  it("fails fast for invalid or ambiguous versioned config", () => {
    const invalidConfig: GameplayConfigSource = {
      ...DEMO_GAMEPLAY_CONFIG,
      trails: [
        {
          ...DEMO_GAMEPLAY_CONFIG.trails[0],
          checkpointSlots: [DEMO_GAMEPLAY_CONFIG.trails[0].checkpointSlots[0]],
        },
      ],
    };

    expect(
      () => new VersionedGameplayConfigRepository(invalidConfig),
    ).toThrow(GameplayConfigError);
  });

  it("evaluates active windows in UTC with an exclusive end boundary", () => {
    const repository = new VersionedGameplayConfigRepository(
      DEMO_GAMEPLAY_CONFIG,
    );
    expect(
      repository.getActiveSeason(new Date("2026-01-01T00:00:00.000Z")),
    ).not.toBeNull();
    expect(
      repository.getActiveSeason(new Date("2027-01-01T00:00:00.000Z")),
    ).toBeNull();
  });

  it("keeps the existing map-config response contract working", async () => {
    const response = await getMapConfig();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.campusId).toBe("demo-campus-v1");
    expect(body.slots).toHaveLength(5);
    expect(body.center).toEqual({ lat: 10.8012, lng: 106.6531 });
  });
});
