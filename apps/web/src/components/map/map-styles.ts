import type { StyleSpecification } from "maplibre-gl";

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
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "carto-dark-tiles",
      type: "raster",
      source: "carto-dark",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

/**
 * Carto Voyager street style (vibrant daytime fallback)
 */
export const CARTO_VOYAGER_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "carto-voyager": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "carto-voyager-tiles",
      type: "raster",
      source: "carto-voyager",
      minzoom: 0,
      maxzoom: 20,
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

export const DEFAULT_MAP_STYLE = CARTO_DARK_MATTER_STYLE;

