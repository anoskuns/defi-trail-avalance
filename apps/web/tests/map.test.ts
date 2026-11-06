import { describe, it, expect, vi } from "vitest";
import {
  calculateBearing,
  getCompassDirection,
  calculateOpenRadius,
  createGeodesicCircle,
  getChestLandmark,
  getChestReward,
  findNearestChest,
  haversineDistanceMeters,
} from "@/components/map/geo-utils";
import type { MapSlot, SelectedChest } from "@/components/map/types";
import {
  CARTO_VOYAGER_STYLE,
  DEFAULT_MAP_STYLE,
  ESRI_SATELLITE_SOURCE_ID,
  ESRI_SATELLITE_LAYER_ID,
  CARTO_LABELS_SOURCE_ID,
  CARTO_LABELS_LAYER_ID,
  CARTO_VOYAGER_LAYER_ID,
  CARTO_VOYAGER_SOURCE_ID,
  getCartoLabelsTileUrl,
  ESRI_SATELLITE_TILES_URL,
  setupBasemapLayers,
  applyMapModeVisibility,
} from "@/components/map/map-styles";

const mockSlots: MapSlot[] = [
  {
    slot: 0,
    type: "YIELD",
    lat: 10.8012,
    lng: 106.6531,
    h3Cell: "8a65b5641957fff",
    chestId: "0x1111111111111111111111111111111111111111111111111111111111111111",
    sponsorCampaign: null,
  },
  {
    slot: 1,
    type: "QUEST",
    lat: 10.80152,
    lng: 106.65342,
    h3Cell: "8a65b564190ffff",
    chestId: "0x2222222222222222222222222222222222222222222222222222222222222222",
    sponsorCampaign: null,
  },
  {
    slot: 2,
    type: "SPONSOR",
    lat: 10.80092,
    lng: 106.65362,
    h3Cell: "8a65b564190ffff",
    chestId: "0x3333333333333333333333333333333333333333333333333333333333333333",
    sponsorCampaign: "demo-coffee-v1",
  },
  {
    slot: 3,
    type: "YIELD",
    lat: 10.8007,
    lng: 106.65298,
    h3Cell: "8a65b5641977fff",
    chestId: "0x4444444444444444444444444444444444444444444444444444444444444444",
    sponsorCampaign: null,
  },
  {
    slot: 4,
    type: "QUEST",
    lat: 10.80178,
    lng: 106.65282,
    h3Cell: "8a65b5641957fff",
    chestId: "0x5555555555555555555555555555555555555555555555555555555555555555",
    sponsorCampaign: null,
  },
];

describe("Interactive Map & Gameplay Utilities", () => {
  describe("Open Radius Calculation (Requirement 3 & PRD §5.2, §5.4)", () => {
    it("returns base radius 30m when powerLevel is 0", () => {
      expect(calculateOpenRadius(0)).toBe(30);
    });

    it("scales radius with powerLevel (30m to 45m)", () => {
      expect(calculateOpenRadius(1)).toBe(35);
      expect(calculateOpenRadius(2)).toBe(40);
      expect(calculateOpenRadius(3)).toBe(45);
    });

    it("clamps negative powerLevel to 30m", () => {
      expect(calculateOpenRadius(-1)).toBe(30);
      expect(calculateOpenRadius(-10)).toBe(30);
    });

    it("clamps powerLevel > 3 to maximum 45m", () => {
      expect(calculateOpenRadius(4)).toBe(45);
      expect(calculateOpenRadius(99)).toBe(45);
    });
  });

  describe("Geodesic Circle Generation (Requirement 3)", () => {
    it("generates a valid closed GeoJSON Polygon", () => {
      const circle = createGeodesicCircle([106.6531, 10.8012], 30, 64);
      expect(circle.type).toBe("Feature");
      expect(circle.geometry.type).toBe("Polygon");
      expect(circle.geometry.coordinates).toHaveLength(1);

      const ring = circle.geometry.coordinates[0]!;
      expect(ring.length).toBe(65); // 64 points + closing point

      // Verify closed polygon: first point equals last point
      expect(ring[0]![0]).toBeCloseTo(ring[ring.length - 1]![0]!, 6);
      expect(ring[0]![1]).toBeCloseTo(ring[ring.length - 1]![1]!, 6);
    });
  });

  describe("Virtual Compass & Bearing Navigation (Requirement 4)", () => {
    it("computes accurate bearings for cardinal directions", () => {
      // Due North
      const bearingNorth = calculateBearing(10.0, 106.0, 11.0, 106.0);
      expect(bearingNorth).toBeCloseTo(0, 0);

      // Due East
      const bearingEast = calculateBearing(10.0, 106.0, 10.0, 107.0);
      expect(bearingEast).toBeCloseTo(90, 0);

      // Due South
      const bearingSouth = calculateBearing(11.0, 106.0, 10.0, 106.0);
      expect(bearingSouth).toBeCloseTo(180, 0);

      // Due West
      const bearingWest = calculateBearing(10.0, 107.0, 10.0, 106.0);
      expect(bearingWest).toBeCloseTo(270, 0);
    });

    it("computes NE bearing from Slot 0 to Slot 1 (~44.5°)", () => {
      const bearing = calculateBearing(10.8012, 106.6531, 10.80152, 106.65342);
      expect(bearing).toBeGreaterThan(40);
      expect(bearing).toBeLessThan(50);
      expect(getCompassDirection(bearing)).toBe("NE");
    });

    it("converts degree bearings to 8-point cardinal directions", () => {
      expect(getCompassDirection(0)).toBe("N");
      expect(getCompassDirection(360)).toBe("N");
      expect(getCompassDirection(45)).toBe("NE");
      expect(getCompassDirection(90)).toBe("E");
      expect(getCompassDirection(135)).toBe("SE");
      expect(getCompassDirection(180)).toBe("S");
      expect(getCompassDirection(225)).toBe("SW");
      expect(getCompassDirection(270)).toBe("W");
      expect(getCompassDirection(315)).toBe("NW");
    });

    it("finds the nearest chest and calculates distance/bearing", () => {
      // At Slot 0 (Library)
      const nearestAtSlot0 = findNearestChest(10.8012, 106.6531, mockSlots);
      expect(nearestAtSlot0).not.toBeNull();
      expect(nearestAtSlot0!.chest.slot).toBe(0);
      expect(nearestAtSlot0!.distance).toBeCloseTo(0, 1);

      // At Slot 1 (Engineering)
      const nearestAtSlot1 = findNearestChest(10.80152, 106.65342, mockSlots);
      expect(nearestAtSlot1).not.toBeNull();
      expect(nearestAtSlot1!.chest.slot).toBe(1);
      expect(nearestAtSlot1!.distance).toBeCloseTo(0, 1);
    });
  });

  describe("Chest Landmarks and Deterministic Rewards (Requirement 6)", () => {
    it("resolves correct landmarks for all 5 slots", () => {
      expect(getChestLandmark(0, "YIELD")).toBe("Central Library");
      expect(getChestLandmark(1, "QUEST")).toBe("Engineering Hall");
      expect(getChestLandmark(2, "SPONSOR")).toBe("Student Center (Coffee Spot)");
      expect(getChestLandmark(3, "YIELD")).toBe("Sports Complex");
      expect(getChestLandmark(4, "QUEST")).toBe("Dormitory Plaza");
    });

    it("yield chest provides deterministic 1.00 Mock USDC", () => {
      const reward = getChestReward(mockSlots[0]!);
      expect(reward.amountUsdc).toBe(1.0);
      expect(reward.label).toBe("1.00 Mock USDC");
      expect(reward.simulatedApr).toBe("5.00% APR");
    });

    it("quest chest provides tier rewards (Tier 1: 0.50 USDC, Tier 2: 1.00 USDC)", () => {
      const rewardTier1 = getChestReward(mockSlots[1]!);
      expect(rewardTier1.amountUsdc).toBe(0.5);
      expect(rewardTier1.tier).toBe(1);

      const rewardTier2 = getChestReward(mockSlots[4]!);
      expect(rewardTier2.amountUsdc).toBe(1.0);
      expect(rewardTier2.tier).toBe(2);
    });

    it("sponsor chest provides fixed 2.00 Mock USDC and campaign info", () => {
      const reward = getChestReward(mockSlots[2]!);
      expect(reward.amountUsdc).toBe(2.0);
      expect(reward.sponsorName).toContain("Coffee Spot");
    });
  });

  describe("Basemap Switch & Raster Layer Management (Requirement 1 - 6)", () => {
    it("confirms CARTO Voyager is default basemap with maxzoom <= 18 (no requests exceeding zoom 18)", () => {
      expect(DEFAULT_MAP_STYLE).toBe(CARTO_VOYAGER_STYLE);
      const voyagerSource = CARTO_VOYAGER_STYLE.sources[CARTO_VOYAGER_SOURCE_ID] as { maxzoom?: number };
      expect(voyagerSource).toBeDefined();
      expect(voyagerSource.maxzoom).toBe(18);

      const voyagerLayer = CARTO_VOYAGER_STYLE.layers.find((l) => l.id === CARTO_VOYAGER_LAYER_ID) as { maxzoom?: number };
      expect(voyagerLayer).toBeDefined();
      expect(voyagerLayer.maxzoom).toBe(18);
    });

    it("formats CARTO Labels tile URL according to PRD specification", () => {
      const url = getCartoLabelsTileUrl();
      expect(url).toContain("https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png");
      expect(url).toContain("?key=");
    });

    it("idempotently registers ESRI Satellite & CARTO Labels layers with correct ordering", () => {
      // Create mock MapLibre instance with layer stack tracking
      const sources = new Map<string, any>();
      const layers: Array<{ id: string; [key: string]: any }> = [
        { id: CARTO_VOYAGER_LAYER_ID, type: "raster", source: CARTO_VOYAGER_SOURCE_ID },
      ];

      const mockMap: any = {
        getSource: vi.fn((id: string) => sources.get(id)),
        addSource: vi.fn((id: string, def: any) => sources.set(id, def)),
        getLayer: vi.fn((id: string) => layers.find((l) => l.id === id)),
        addLayer: vi.fn((layer: any, beforeId?: string) => {
          if (beforeId) {
            const index = layers.findIndex((l) => l.id === beforeId);
            if (index !== -1) {
              layers.splice(index, 0, layer);
              return;
            }
          }
          layers.push(layer);
        }),
        setLayoutProperty: vi.fn((layerId: string, _prop: string, val: string) => {
          const l = layers.find((layer) => layer.id === layerId);
          if (l) {
            l.layout = l.layout || {};
            l.layout.visibility = val;
          }
        }),
        isStyleLoaded: vi.fn(() => true),
        setStyle: vi.fn(),
      };

      // Add existing player-radius-fill layer to test insertion before it
      layers.push({ id: "player-radius-fill", type: "fill", source: "player-radius-source" });
      layers.push({ id: "player-radius-line", type: "line", source: "player-radius-source" });

      // Call setupBasemapLayers twice to verify idempotency
      setupBasemapLayers(mockMap);
      setupBasemapLayers(mockMap);

      // Verify sources were added once
      expect(mockMap.addSource).toHaveBeenCalledTimes(2);
      expect(sources.has(ESRI_SATELLITE_SOURCE_ID)).toBe(true);
      expect(sources.has(CARTO_LABELS_SOURCE_ID)).toBe(true);
      expect(sources.get(ESRI_SATELLITE_SOURCE_ID).maxzoom).toBe(19);
      expect(sources.get(CARTO_LABELS_SOURCE_ID).maxzoom).toBe(18);

      // Verify layers were added once
      expect(mockMap.addLayer).toHaveBeenCalledTimes(2);

      // Verify exact layer ordering:
      // carto-voyager-tiles < esri-satellite-layer < carto-labels-layer < player-radius-fill < player-radius-line
      const layerIds = layers.map((l) => l.id);
      const voyagerIdx = layerIds.indexOf(CARTO_VOYAGER_LAYER_ID);
      const esriIdx = layerIds.indexOf(ESRI_SATELLITE_LAYER_ID);
      const labelsIdx = layerIds.indexOf(CARTO_LABELS_LAYER_ID);
      const fillIdx = layerIds.indexOf("player-radius-fill");
      const lineIdx = layerIds.indexOf("player-radius-line");

      expect(voyagerIdx).toBeLessThan(esriIdx);
      expect(esriIdx).toBeLessThan(labelsIdx);
      expect(labelsIdx).toBeLessThan(fillIdx);
      expect(fillIdx).toBeLessThan(lineIdx);
    });

    it("toggles basemap at least 3 times using setLayoutProperty without calling setStyle or reloading map", () => {
      const layers: Record<string, { visibility: string }> = {
        [CARTO_VOYAGER_LAYER_ID]: { visibility: "visible" },
        [ESRI_SATELLITE_LAYER_ID]: { visibility: "none" },
        [CARTO_LABELS_LAYER_ID]: { visibility: "none" },
      };

      const mockMap: any = {
        getLayer: vi.fn((id: string) => (layers[id] ? { id } : undefined)),
        setLayoutProperty: vi.fn((id: string, prop: string, val: string) => {
          if (prop === "visibility" && layers[id]) {
            layers[id]!.visibility = val;
          }
        }),
        isStyleLoaded: vi.fn(() => true),
        setStyle: vi.fn(),
      };

      // Initial state: Streets
      applyMapModeVisibility(mockMap, "streets");
      expect(layers[CARTO_VOYAGER_LAYER_ID]!.visibility).toBe("visible");
      expect(layers[ESRI_SATELLITE_LAYER_ID]!.visibility).toBe("none");
      expect(layers[CARTO_LABELS_LAYER_ID]!.visibility).toBe("none");
      mockMap.setLayoutProperty.mockClear();

      // Toggle 1: Streets -> Satellite
      applyMapModeVisibility(mockMap, "satellite");
      expect(layers[CARTO_VOYAGER_LAYER_ID]!.visibility).toBe("none");
      expect(layers[ESRI_SATELLITE_LAYER_ID]!.visibility).toBe("visible");
      expect(layers[CARTO_LABELS_LAYER_ID]!.visibility).toBe("visible");

      // Toggle 2: Satellite -> Streets
      applyMapModeVisibility(mockMap, "streets");
      expect(layers[CARTO_VOYAGER_LAYER_ID]!.visibility).toBe("visible");
      expect(layers[ESRI_SATELLITE_LAYER_ID]!.visibility).toBe("none");
      expect(layers[CARTO_LABELS_LAYER_ID]!.visibility).toBe("none");

      // Toggle 3: Streets -> Satellite
      applyMapModeVisibility(mockMap, "satellite");
      expect(layers[CARTO_VOYAGER_LAYER_ID]!.visibility).toBe("none");
      expect(layers[ESRI_SATELLITE_LAYER_ID]!.visibility).toBe("visible");
      expect(layers[CARTO_LABELS_LAYER_ID]!.visibility).toBe("visible");

      // Verify map.setStyle was NEVER called throughout all 3 toggles
      expect(mockMap.setStyle).not.toHaveBeenCalled();
      expect(mockMap.setLayoutProperty).toHaveBeenCalledTimes(9); // 3 properties * 3 toggles
    });

    it("preserves chest interaction and bottom sheet data after basemap toggle", () => {
      // Simulate state when user clicks on chest slot 0 after toggling basemap
      const playerPos = { lat: 10.8012, lng: 106.6531 };
      const selectedSlot = mockSlots[0]!;
      const dist = haversineDistanceMeters(
        playerPos.lat,
        playerPos.lng,
        selectedSlot.lat,
        selectedSlot.lng
      );

      const selectedChest: SelectedChest = {
        ...selectedSlot,
        name: getChestLandmark(selectedSlot.slot, selectedSlot.type),
        distanceMeters: dist,
        inRange: dist <= 30,
        reward: getChestReward(selectedSlot),
        energyCost: 1,
      };

      expect(selectedChest.slot).toBe(0);
      expect(selectedChest.name).toBe("Central Library");
      expect(selectedChest.distanceMeters).toBeCloseTo(0, 1);
      expect(selectedChest.inRange).toBe(true);
      expect(selectedChest.energyCost).toBe(1);
      expect(selectedChest.reward.amountUsdc).toBe(1.0);
    });
  });
});

