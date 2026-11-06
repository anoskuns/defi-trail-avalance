import * as h3 from "h3-js";

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula (PRD §5.2).
 * Returns the distance in meters.
 */
export function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's mean radius in meters
  const toRad = Math.PI / 180;

  const phi1 = lat1 * toRad;
  const phi2 = lat2 * toRad;
  const deltaPhi = (lat2 - lat1) * toRad;
  const deltaLambda = (lon2 - lon1) * toRad;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Computes the H3 hexagonal cell index from latitude and longitude coordinates
 * at a given resolution (defaults to 10 as specified in PRD §5.1, §10.3, §11.2).
 */
export function computeH3Cell(lat: number, lng: number, resolution: number = 10): string {
  return h3.latLngToCell(lat, lng, resolution);
}

