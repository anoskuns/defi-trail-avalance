"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  NavigationControl,
  setWorkerUrl,
  type GeoJSONSource,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LocationMode, MapSlot, PlayerPosition, SelectedChest } from "./types";
import {
  calculateOpenRadius,
  createGeodesicCircle,
  findNearestChest,
  getChestLandmark,
  getChestReward,
  getCompassDirection,
  haversineDistanceMeters,
} from "./geo-utils";
import {
  CARTO_VOYAGER_STYLE,
  setupBasemapLayers,
  applyMapModeVisibility,
} from "./map-styles";
export { setupBasemapLayers, applyMapModeVisibility };
import { DemoLocationBanner } from "./DemoLocationBanner";
import { VirtualCompass } from "./VirtualCompass";
import { ChestBottomSheet } from "./ChestBottomSheet";

const DEMO_CAMPUS_CENTER: [number, number] = [106.6531, 10.8012]; // [lng, lat]

export interface InteractiveMapProps {
  initialPowerLevel?: number;
  className?: string;
  onChestOpened?: (chest: SelectedChest) => void;
}

export function InteractiveMap({
  initialPowerLevel = 0,
  className = "",
  onChestOpened,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const chestMarkersRef = useRef<MapLibreMarker[]>([]);
  const playerMarkerRef = useRef<MapLibreMarker | null>(null);
  const workerConfiguredRef = useRef(false);

  // Gameplay state
  const [powerLevel, setPowerLevel] = useState<number>(initialPowerLevel);
  const [demoMode, setDemoMode] = useState<LocationMode>("DEMO");
  const [demoSlotIndex, setDemoSlotIndex] = useState<number>(0);
  const [chests, setChests] = useState<MapSlot[]>([]);
  const [isLoadingChests, setIsLoadingChests] = useState<boolean>(true);
  const [selectedChest, setSelectedChest] = useState<SelectedChest | null>(null);
  const [mapMode, setMapMode] = useState<"streets" | "satellite">("streets");
  const mapModeRef = useRef<"streets" | "satellite">("streets");

  useEffect(() => {
    mapModeRef.current = mapMode;
  }, [mapMode]);

  // Player position (starts at Demo Slot 0 by default: PRD §11.2)
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    lat: 10.8012,
    lng: 106.6531,
    accuracyMeters: 5,
    heading: 0,
  });

  const openRadius = calculateOpenRadius(powerLevel);

  // 1. Fetch map config from /api/map-config (Requirement 2)
  useEffect(() => {
    let isCancelled = false;
    async function loadMapConfig() {
      try {
        setIsLoadingChests(true);
        const res = await fetch("/api/map-config");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!isCancelled && data.slots) {
          setChests(data.slots);
        }
      } catch (err) {
        console.warn("Failed to load /api/map-config, falling back to local seed:", err);
      } finally {
        if (!isCancelled) setIsLoadingChests(false);
      }
    }
    loadMapConfig();
    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Handle Demo Location toggle (Requirement 5)
  useEffect(() => {
    if (demoMode === "DEMO") {
      if (demoSlotIndex === 0) {
        setPlayerPosition({
          lat: 10.8012,
          lng: 106.6531,
          accuracyMeters: 5,
        });
      } else {
        setPlayerPosition({
          lat: 10.80152,
          lng: 106.65342,
          accuracyMeters: 5,
        });
      }
    } else {
      // Browser live geolocation
      if (typeof window !== "undefined" && navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setPlayerPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracyMeters: pos.coords.accuracy,
              heading: pos.coords.heading,
            });
          },
          (err) => {
            console.warn("Geolocation watch error:", err.message);
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
        );
        return () => navigator.geolocation.clearWatch(watchId);
      }
    }
  }, [demoMode, demoSlotIndex]);

  // Helper to ensure OpenRadius GeoJSON layer is created and kept in sync (Requirement 3)
  const syncRadiusLayer = useCallback(
    (map: MapLibreMap, lng: number, lat: number, radiusMeters: number) => {
      if (!map) return;
      const circleGeoJson = createGeodesicCircle([lng, lat], radiusMeters);

      const existingSource = map.getSource("player-radius-source") as GeoJSONSource | undefined;
      if (existingSource) {
        existingSource.setData(circleGeoJson);
      } else if (map.isStyleLoaded()) {
        try {
          map.addSource("player-radius-source", {
            type: "geojson",
            data: circleGeoJson,
          });

          if (!map.getLayer("player-radius-fill")) {
            map.addLayer({
              id: "player-radius-fill",
              type: "fill",
              source: "player-radius-source",
              paint: {
                "fill-color": "#38BDF8",
                "fill-opacity": 0.22,
              },
            });
          }

          if (!map.getLayer("player-radius-line")) {
            map.addLayer({
              id: "player-radius-line",
              type: "line",
              source: "player-radius-source",
              paint: {
                "line-color": "#38BDF8",
                "line-width": 2.5,
                "line-dasharray": [3, 2],
                "line-opacity": 0.9,
              },
            });
          }
        } catch (err) {
          console.warn("Failed to add player radius layer:", err);
        }
      }
    },
    []
  );

  // 3. Initialize MapLibre GL map instance with built-in reliable style (Requirement 1)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // MapLibre v6 needs an explicit worker URL when bundled by Next.js.
    // Without this, Turbopack looks for the worker beside an app chunk and the
    // map remains blank with "Worker failed to load" in the browser console.
    if (!workerConfiguredRef.current) {
      setWorkerUrl(
        new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString()
      );
      workerConfiguredRef.current = true;
    }

    // Retain CARTO Voyager street style as default basemap (Requirement 1)
    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: CARTO_VOYAGER_STYLE,
      center: DEMO_CAMPUS_CENTER,
      // A 256px raster source maps camera zoom 17 to CARTO's highest supported
      // tile zoom (18). Higher values would request CARTO's unavailable z19+.
      zoom: 16.5,
      maxZoom: 18,
      minZoom: 13,
      pitch: 25,
    });

    map.addControl(new NavigationControl({ showCompass: true }), "top-right");

    map.on("load", () => {
      map.resize();
      setupBasemapLayers(map);
      applyMapModeVisibility(map, mapModeRef.current);
      syncRadiusLayer(map, playerPosition.lng, playerPosition.lat, openRadius);
    });

    map.on("styledata", () => {
      setupBasemapLayers(map);
      applyMapModeVisibility(map, mapModeRef.current);
      syncRadiusLayer(map, playerPosition.lng, playerPosition.lat, openRadius);
    });

    map.on("error", (e) => {
      console.warn("MapLibre event error:", e.error);
    });

    // Ensure map layout is accurately calculated across browsers and devices
    const timer1 = setTimeout(() => map.resize(), 150);
    const timer2 = setTimeout(() => map.resize(), 600);

    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    mapRef.current = map;

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
      chestMarkersRef.current.forEach((m) => m.remove());
      chestMarkersRef.current = [];
      if (playerMarkerRef.current) {
        playerMarkerRef.current.remove();
        playerMarkerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, []); // Run once on mount

  // 4. Update player marker and openRadius circle when position or radius changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Synchronize GeoJSON radius circle
    syncRadiusLayer(map, playerPosition.lng, playerPosition.lat, openRadius);

    // Update or create player DOM marker with pulsating aura
    if (!playerMarkerRef.current) {
      const el = document.createElement("div");
      el.className = "player-marker-container";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.cursor = "pointer";

      el.innerHTML = `
        <div style="position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: -8px; border-radius: 50%; background-color: rgba(56, 189, 248, 0.45); animation: pulseGlow 1.8s infinite;"></div>
          <div style="position: absolute; inset: 0; border-radius: 50%; background-color: #0284C7; border: 2.5px solid #FFFFFF; box-shadow: 0 0 12px rgba(56, 189, 248, 0.9);"></div>
          <div style="width: 6px; height: 6px; border-radius: 50%; background-color: #FFFFFF; z-index: 2;"></div>
        </div>
      `;

      playerMarkerRef.current = new MapLibreMarker({ element: el })
        .setLngLat([playerPosition.lng, playerPosition.lat])
        .addTo(map);
    } else {
      playerMarkerRef.current.setLngLat([playerPosition.lng, playerPosition.lat]);
    }
  }, [playerPosition, openRadius, syncRadiusLayer]);

  // 5. Render/update 5 Chest Markers on Map (Requirement 2 & 6)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !chests.length) return;

    // Clean up old markers
    chestMarkersRef.current.forEach((m) => m.remove());
    chestMarkersRef.current = [];

    chests.forEach((slot) => {
      const dist = haversineDistanceMeters(
        playerPosition.lat,
        playerPosition.lng,
        slot.lat,
        slot.lng
      );
      const inRange = dist <= openRadius;

      const el = document.createElement("div");
      el.className = `chest-marker-${slot.slot}`;
      el.style.cursor = "pointer";
      el.style.touchAction = "manipulation";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `Open ${slot.type.toLowerCase()} chest ${slot.slot}`);

      // Style based on chest type
      let icon = "🪙";
      let borderColor = "#F59E0B";
      let bgColor = "rgba(245, 158, 11, 0.25)";
      let typeLabel = "Yield";

      if (slot.type === "QUEST") {
        icon = "📜";
        borderColor = "#A855F7";
        bgColor = "rgba(168, 85, 247, 0.25)";
        typeLabel = "Quest";
      } else if (slot.type === "SPONSOR") {
        icon = "☕";
        borderColor = "#10B981";
        bgColor = "rgba(16, 185, 129, 0.25)";
        typeLabel = "Sponsor";
      }

      el.innerHTML = `
        <div class="chest-marker-card" style="position: relative; display: flex; flex-direction: column; align-items: center; transition: transform 0.15s ease;">
          ${
            inRange
              ? `<div style="
                  position: absolute;
                  inset: -8px;
                  border-radius: 14px;
                  background: rgba(16, 185, 129, 0.2);
                  border: 2px dashed #10B981;
                  animation: pulseGlow 2s infinite;
                "></div>`
              : ""
          }
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: ${bgColor};
            border: 2px solid ${inRange ? "#10B981" : borderColor};
            box-shadow: ${
              inRange
                ? "0 0 20px rgba(16, 185, 129, 0.8)"
                : "0 6px 14px rgba(0, 0, 0, 0.6)"
            };
            font-size: 20px;
          ">
            ${icon}
          </div>
          <span style="
            margin-top: 4px;
            font-size: 10px;
            font-weight: 700;
            color: #FFFFFF;
            background: rgba(15, 23, 42, 0.85);
            padding: 1px 6px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.15);
            white-space: nowrap;
            letter-spacing: 0.02em;
          ">
            ${typeLabel} #${slot.slot}
          </span>
        </div>
      `;

      // MapLibre owns the transform on the outer marker element for geographic
      // positioning. Animate the inner card instead, otherwise hover/click can
      // overwrite that transform and make a marker appear to vanish.
      const markerCard = el.firstElementChild as HTMLDivElement | null;

      el.addEventListener("mouseenter", () => {
        if (markerCard) markerCard.style.transform = "scale(1.15)";
      });
      el.addEventListener("mouseleave", () => {
        if (markerCard) markerCard.style.transform = "scale(1)";
      });

      const selectChest = () => {
        const currentDist = haversineDistanceMeters(
          playerPosition.lat,
          playerPosition.lng,
          slot.lat,
          slot.lng
        );
        setSelectedChest({
          ...slot,
          name: getChestLandmark(slot.slot, slot.type),
          distanceMeters: currentDist,
          inRange: currentDist <= openRadius,
          reward: getChestReward(slot),
          energyCost: 1,
        });
      };

      el.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectChest();
      });

      el.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        selectChest();
      });

      const marker = new MapLibreMarker({ element: el, anchor: "bottom" })
        .setLngLat([slot.lng, slot.lat])
        .addTo(map);

      chestMarkersRef.current.push(marker);
    });
  }, [chests, playerPosition, openRadius]);

  // 6. Nearest chest calculation for Virtual Compass (Requirement 4)
  const nearest = findNearestChest(
    playerPosition.lat,
    playerPosition.lng,
    chests
  );

  const nearestChest = nearest?.chest || null;
  const nearestBearing = nearest?.bearing ?? 0;
  const nearestDist = nearest?.distance ?? 0;
  const nearestDirection = getCompassDirection(nearestBearing);
  const isNearestInRange = nearestDist <= openRadius;

  // Fly to target chest when clicking compass
  const handleFocusNearest = useCallback(() => {
    if (!nearestChest || !mapRef.current) return;
    mapRef.current.flyTo({
      center: [nearestChest.lng, nearestChest.lat],
      zoom: 17,
      essential: true,
      speed: 1.2,
    });
  }, [nearestChest]);

  // Recenter map on player
  const handleRecenter = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [playerPosition.lng, playerPosition.lat],
      zoom: 16.5,
      essential: true,
    });
  };

  // Switch basemap layer visibility when mapMode changes without re-mounting or calling setStyle() (Requirement 4)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.isStyleLoaded()) {
      applyMapModeVisibility(map, mapMode);
    } else {
      map.once("load", () => {
        applyMapModeVisibility(map, mapMode);
      });
    }
  }, [mapMode]);

  // Toggle between Streets and Satellite mode without reloading map (Requirement 4 & 5)
  const handleToggleBasemap = useCallback(() => {
    setMapMode((prev) => (prev === "streets" ? "satellite" : "streets"));
  }, []);

  return (
    <div
      className={`relative w-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${className}`}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0B0F19",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #1E293B",
      }}
    >
      {/* 5. Mandatory Demo Location Warning Banner (Requirement 5)
          Positioned as a dedicated header ABOVE map canvas so it NEVER overlaps compass or controls on mobile */}
      {demoMode === "DEMO" && (
        <DemoLocationBanner
          activeSlot={demoSlotIndex}
          onSlotChange={(slot) => setDemoSlotIndex(slot)}
          onDisableDemo={() => setDemoMode("LIVE")}
        />
      )}

      {/* Map Canvas Wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "540px",
          minHeight: "480px",
        }}
      >
        {/* MapLibre Container */}
        <div
          ref={mapContainerRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#0B0F19",
          }}
        />

        {/* 4. Top-Left Floating Virtual Compass HUD (Requirement 4) */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 20,
          }}
        >
          <VirtualCompass
            bearing={nearestBearing}
            distanceMeters={nearestDist}
            targetChest={nearestChest}
            cardinalDirection={nearestDirection}
            inRange={isNearestInRange}
            onFocusTarget={handleFocusNearest}
          />
        </div>

        {/* Floating Controls HUD (Bottom Left - Mobile optimized with >=44px touch targets) */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            right: "12px",
            zIndex: 20,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          {/* Left Button Group */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              pointerEvents: "auto",
            }}
          >
            {/* Recenter Player Button */}
            <button
              type="button"
              onClick={handleRecenter}
              aria-label="Recenter map on player"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid #334155",
                color: "#F8FAFC",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                minHeight: "44px", // PRD §7 touch target
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Recenter</span>
            </button>
          </div>

          {/* Right Control Panel: Demo Switch & Radius Selector */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
              pointerEvents: "auto",
            }}
          >
            {/* Demo Location Switch (Requirement 5) */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#94A3B8" }}>
                Demo Loc:
              </span>
              <button
                type="button"
                onClick={() => setDemoMode(demoMode === "DEMO" ? "LIVE" : "DEMO")}
                style={{
                  backgroundColor: demoMode === "DEMO" ? "#EAB308" : "#334155",
                  color: demoMode === "DEMO" ? "#000000" : "#94A3B8",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: "36px",
                }}
              >
                {demoMode === "DEMO" ? "ON" : "OFF"}
              </button>
            </div>

            <div style={{ width: "1px", height: "20px", backgroundColor: "#334155" }} />

            {/* Radius & Power Level Selector (Requirement 3) */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                Radius: <strong style={{ color: "#38BDF8" }}>{openRadius}m</strong>
              </span>
              <div style={{ display: "flex", gap: "3px" }}>
                {[0, 1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPowerLevel(lvl)}
                    style={{
                      width: "28px",
                      height: "28px",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      borderRadius: "6px",
                      border: powerLevel === lvl ? "1px solid #38BDF8" : "1px solid #334155",
                      backgroundColor: powerLevel === lvl ? "rgba(56, 189, 248, 0.25)" : "transparent",
                      color: powerLevel === lvl ? "#38BDF8" : "#64748B",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={`Power Level ${lvl}: Radius ${30 + 5 * lvl}m`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ width: "1px", height: "20px", backgroundColor: "#334155" }} />

            {/* Basemap Toggle Button (Requirement 5: Streets -> 🛰️ Satellite, Satellite -> 🏙️ Streets) */}
            <button
              type="button"
              onClick={handleToggleBasemap}
              data-testid="basemap-toggle-button"
              aria-label={`Switch to ${mapMode === "streets" ? "Satellite" : "Streets"} view`}
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#F8FAFC",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                minHeight: "36px",
                transition: "all 0.15s ease",
              }}
              title={`Switch to ${mapMode === "streets" ? "Satellite" : "Streets"}`}
            >
              {mapMode === "streets" ? "🛰️ Satellite" : "🏙️ Streets"}
            </button>
          </div>
        </div>
      </div>

      {/* 6. Chest Details Bottom Sheet (Requirement 6) */}
      <ChestBottomSheet
        chest={selectedChest}
        openRadius={openRadius}
        powerLevel={powerLevel}
        onClose={() => setSelectedChest(null)}
        onOpenChest={(chest) => {
          onChestOpened?.(chest);
        }}
      />
    </div>
  );
}
