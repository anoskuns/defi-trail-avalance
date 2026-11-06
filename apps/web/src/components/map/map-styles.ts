import type { StyleSpecification, Map as MapLibreMap } from "maplibre-gl";

const cartoApiKey = process.env.NEXT_PUBLIC_CARTO_API_KEY?.trim();

function cartoRasterTiles(style: string): string[] {
  const query = cartoApiKey ? `?key=${encodeURIComponent(cartoApiKey)}` : "";
  return ["a", "b", "c", "d"].map(
    (subdomain) =>
      `https://${subdomain}.basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}.png${query}`
  );
}

/**
 * Built-in Carto Dark Matter raster style specification.
 * Directly embedded as a StyleSpecification object so MapLibre does NOT need
 * to fetch an external style.json (eliminates CORS, 404, or network blocking issues).
 */
export const CARTO_DARK_MATTER_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "carto-dark": {
      type: "raster",
      tiles: cartoRasterTiles("dark_all"),
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      // CARTO raster tiles are currently served through zoom 18. MapLibre may
      // overzoom that final level without requesting a forbidden z19 tile.
      maxzoom: 18,
    },
  },
  layers: [
    {
      id: "carto-dark-tiles",
      type: "raster",
      source: "carto-dark",
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};

/**
 * Carto Voyager street style (default street basemap)
 * Maximum zoom: 18 (CARTO raster tiles are only served through zoom 18)
 */
export const CARTO_VOYAGER_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "carto-voyager": {
      type: "raster",
      tiles: cartoRasterTiles("voyager"),
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxzoom: 18,
    },
  },
  layers: [
    {
      id: "carto-voyager-tiles",
      type: "raster",
      source: "carto-voyager",
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};

/**
 * OpenStreetMap standard fallback
 */
export const OSM_STANDARD_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "osm-tiles": {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm-layer",
      type: "raster",
      source: "osm-tiles",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const DEFAULT_MAP_STYLE = CARTO_VOYAGER_STYLE;

// Basemap layer and source identifiers
export const ESRI_SATELLITE_SOURCE_ID = "esri-satellite-source";
export const ESRI_SATELLITE_LAYER_ID = "esri-satellite-layer";
export const CARTO_LABELS_SOURCE_ID = "carto-labels-source";
export const CARTO_LABELS_LAYER_ID = "carto-labels-layer";
export const CARTO_VOYAGER_LAYER_ID = "carto-voyager-tiles";
export const CARTO_VOYAGER_SOURCE_ID = "carto-voyager";

export const ESRI_SATELLITE_TILES_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
export const ESRI_ATTRIBUTION =
  "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

/**
 * Returns CARTO Voyager Labels raster URL with API key appended if configured.
 * Formula: https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png?key=${NEXT_PUBLIC_CARTO_API_KEY}
 */
export function getCartoLabelsTileUrl(): string {
  const NEXT_PUBLIC_CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY || "";
  return `https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png?key=${NEXT_PUBLIC_CARTO_API_KEY}`;
}

/**
 * Idempotently registers ESRI Satellite & CARTO Voyager Labels layers.
 * Ordering rules (Requirement 3):
 * - esri-satellite-layer sits directly above carto-voyager base raster layer
 * - carto-labels-layer sits on top of esri-satellite-layer
 * - Both sit beneath player-radius-fill and player-radius-line
 */
export function setupBasemapLayers(map: MapLibreMap) {
  // 1. ESRI Satellite Source
  if (!map.getSource(ESRI_SATELLITE_SOURCE_ID)) {
    map.addSource(ESRI_SATELLITE_SOURCE_ID, {
      type: "raster",
      tiles: [ESRI_SATELLITE_TILES_URL],
      tileSize: 256,
      maxzoom: 19,
      attribution: ESRI_ATTRIBUTION,
    });
  }

  const radiusFillLayer = map.getLayer("player-radius-fill");
  const beforeLayerId = radiusFillLayer ? "player-radius-fill" : undefined;

  // 2. ESRI Satellite Layer (default visibility: 'none')
  if (!map.getLayer(ESRI_SATELLITE_LAYER_ID)) {
    map.addLayer(
      {
        id: ESRI_SATELLITE_LAYER_ID,
        type: "raster",
        source: ESRI_SATELLITE_SOURCE_ID,
        minzoom: 0,
        maxzoom: 19,
        layout: {
          visibility: "none",
        },
      },
      beforeLayerId
    );
  }

  // 3. CARTO Labels Source
  if (!map.getSource(CARTO_LABELS_SOURCE_ID)) {
    map.addSource(CARTO_LABELS_SOURCE_ID, {
      type: "raster",
      tiles: [getCartoLabelsTileUrl()],
      tileSize: 256,
      maxzoom: 18,
      attribution:
        '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    });
  }

  // 4. CARTO Labels Layer (default visibility: 'none')
  if (!map.getLayer(CARTO_LABELS_LAYER_ID)) {
    map.addLayer(
      {
        id: CARTO_LABELS_LAYER_ID,
        type: "raster",
        source: CARTO_LABELS_SOURCE_ID,
        minzoom: 0,
        maxzoom: 18,
        layout: {
          visibility: "none",
        },
      },
      beforeLayerId
    );
  }
}

/**
 * Updates basemap visibility via map.setLayoutProperty without reloading style or remounting map.
 * - streets: CARTO base layer visible; ESRI & CARTO labels none
 * - satellite: CARTO base layer none; ESRI & CARTO labels visible
 */
export function applyMapModeVisibility(
  map: MapLibreMap | null,
  mode: "streets" | "satellite"
) {
  if (!map || !map.isStyleLoaded()) return;

  const isStreets = mode === "streets";

  if (map.getLayer(CARTO_VOYAGER_LAYER_ID)) {
    map.setLayoutProperty(
      CARTO_VOYAGER_LAYER_ID,
      "visibility",
      isStreets ? "visible" : "none"
    );
  }
  if (map.getLayer(ESRI_SATELLITE_LAYER_ID)) {
    map.setLayoutProperty(
      ESRI_SATELLITE_LAYER_ID,
      "visibility",
      isStreets ? "none" : "visible"
    );
  }
  if (map.getLayer(CARTO_LABELS_LAYER_ID)) {
    map.setLayoutProperty(
      CARTO_LABELS_LAYER_ID,
      "visibility",
      isStreets ? "none" : "visible"
    );
  }
}


