import { haversineDistanceMeters } from "@/lib/geo";
import type { ChestReward, ChestTypeName, MapSlot } from "./types";

export { haversineDistanceMeters };

export interface GeoJsonPolygonFeature {
  type: "Feature";
  properties: {
    radius: number;
    [key: string]: unknown;
  };
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
}

/**
 * Calculates initial bearing (azimuth in degrees: 0° = North, 90° = East, 180° = South, 270° = West)
 * from point 1 to point 2 using great circle navigation.
 */
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaLambda = toRad(lon2 - lon1);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  return (toDeg(theta) + 360) % 360;
}

/**
 * Converts a bearing in degrees into a 8-point cardinal compass direction (N, NE, E, SE, S, SW, W, NW).
 */
export function getCompassDirection(bearing: number): string {
  const normalized = ((bearing % 360) + 360) % 360;
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(normalized / 45) % 8;
  return directions[index] || "N";
}

/**
 * Calculates player's chest opening radius in meters based on powerLevel (PRD §5.2 & §5.4).
 * openRadius = 30 + 5 * powerLevel (powerLevel clamped between 0 and 3 -> 30m to 45m).
 */
export function calculateOpenRadius(powerLevel: number = 0): number {
  const clamped = Math.min(3, Math.max(0, Math.floor(powerLevel)));
  return 30 + 5 * clamped;
}

/**
 * Creates a GeoJSON Polygon representing a geodesic circle on Earth with given radius in meters.
 * MapLibre uses [lng, lat] coordinates for GeoJSON geometry.
 */
export function createGeodesicCircle(
  centerLngLat: [number, number],
  radiusInMeters: number,
  points: number = 64
): GeoJsonPolygonFeature {
  const [lng, lat] = centerLngLat;
  const coordinates: [number, number][] = [];
  const earthRadius = 6371000; // meters

  const phi1 = (lat * Math.PI) / 180;
  const lambda1 = (lng * Math.PI) / 180;
  const angularDist = radiusInMeters / earthRadius;

  for (let i = 0; i <= points; i++) {
    const bearing = (i * 2 * Math.PI) / points;
    const phi2 = Math.asin(
      Math.sin(phi1) * Math.cos(angularDist) +
        Math.cos(phi1) * Math.sin(angularDist) * Math.cos(bearing)
    );
    const lambda2 =
      lambda1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDist) * Math.cos(phi1),
        Math.cos(angularDist) - Math.sin(phi1) * Math.sin(phi2)
      );

    const ptLat = (phi2 * 180) / Math.PI;
    const ptLng = (lambda2 * 180) / Math.PI;
    coordinates.push([ptLng, ptLat]);
  }

  return {
    type: "Feature",
    properties: { radius: radiusInMeters },
    geometry: {
      type: "Polygon",
      coordinates: [coordinates],
    },
  };
}

/**
 * Returns human-readable landmark name for each Demo Campus slot.
 */
export function getChestLandmark(slot: number, type: ChestTypeName): string {
  switch (slot) {
    case 0:
      return "Central Library";
    case 1:
      return "Engineering Hall";
    case 2:
      return "Student Center (Coffee Spot)";
    case 3:
      return "Sports Complex";
    case 4:
      return "Dormitory Plaza";
    default:
      return `${type} Chest #${slot}`;
  }
}

/**
 * Returns deterministic reward details per PRD §4.2, §4.3, §4.4, §5.5.
 */
export function getChestReward(slot: MapSlot): ChestReward {
  switch (slot.type) {
    case "YIELD":
      return {
        amountUsdc: 1.0,
        label: "1.00 Mock USDC",
        simulatedApr: "5.00% APR",
      };
    case "QUEST":
      if (slot.slot === 1) {
        return {
          amountUsdc: 0.5,
          label: "0.50 Mock USDC (Tier 1)",
          simulatedApr: "5.00% APR",
          tier: 1,
        };
      }
      return {
        amountUsdc: 1.0,
        label: "1.00 Mock USDC (Tier 2)",
        simulatedApr: "6.25% APR",
        tier: 2,
      };
    case "SPONSOR":
      return {
        amountUsdc: 2.0,
        label: "2.00 Mock USDC",
        sponsorName: "Coffee Spot Demo Campaign",
        simulatedApr: "Sponsored Grant",
      };
  }
}

/**
 * Finds the nearest chest to the player and calculates bearing & distance.
 */
export function findNearestChest(
  playerLat: number,
  playerLng: number,
  chests: MapSlot[]
): { chest: MapSlot; distance: number; bearing: number } | null {
  if (!chests.length) return null;

  let nearest: MapSlot = chests[0]!;
  let minDistance = Infinity;

  for (const c of chests) {
    const dist = haversineDistanceMeters(playerLat, playerLng, c.lat, c.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = c;
    }
  }

  const bearing = calculateBearing(
    playerLat,
    playerLng,
    nearest.lat,
    nearest.lng
  );

  return {
    chest: nearest,
    distance: minDistance,
    bearing,
  };
}
