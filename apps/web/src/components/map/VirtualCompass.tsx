"use client";

import React from "react";
import type { MapSlot } from "./types";
import { getChestLandmark } from "./geo-utils";

export interface VirtualCompassProps {
  bearing: number;
  distanceMeters: number;
  targetChest: MapSlot | null;
  cardinalDirection: string;
  inRange: boolean;
  onFocusTarget?: () => void;
  className?: string;
}

/**
 * Virtual Compass HUD component (Requirement 4 & PRD §8.1).
 * Always points its needle towards the nearest chest with distance and bearing.
 */
export function VirtualCompass({
  bearing,
  distanceMeters,
  targetChest,
  cardinalDirection,
  inRange,
  onFocusTarget,
  className = "",
}: VirtualCompassProps) {
  if (!targetChest) return null;

  const landmark = getChestLandmark(targetChest.slot, targetChest.type);
  const roundedDist = Math.round(distanceMeters);

  return (
    <div
      role="region"
      aria-label="Virtual Compass pointing to nearest chest"
      className={`select-none ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "rgba(15, 23, 42, 0.88)",
        backdropFilter: "blur(8px)",
        border: inRange ? "1px solid #10B981" : "1px solid #334155",
        borderRadius: "14px",
        padding: "8px 14px",
        boxShadow: inRange
          ? "0 4px 20px rgba(16, 185, 129, 0.25)"
          : "0 4px 16px rgba(0, 0, 0, 0.4)",
        cursor: onFocusTarget ? "pointer" : "default",
        transition: "all 0.2s ease",
      }}
      onClick={onFocusTarget}
      title="Click to center map on nearest chest"
    >
      {/* Compass Dial with Needle */}
      <div
        style={{
          position: "relative",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "#0B0F19",
          border: "2px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* North marker */}
        <span
          style={{
            position: "absolute",
            top: "2px",
            fontSize: "8px",
            fontWeight: 800,
            color: "#EF4444",
            lineHeight: 1,
          }}
        >
          N
        </span>

        {/* Rotating Compass Needle */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${bearing}deg)`,
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Arrow pointing UP */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: inRange ? "16px solid #10B981" : "16px solid #E84142",
              transform: "translateY(-6px)",
            }}
          />
          {/* Tail */}
          <div
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              borderLeft: "3px solid transparent",
              borderRight: "3px solid transparent",
              borderTop: "8px solid #64748B",
              transform: "translateY(8px)",
            }}
          />
        </div>

        {/* Pivot center dot */}
        <div
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#F8FAFC",
            zIndex: 2,
          }}
        />
      </div>

      {/* Target Info */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: inRange ? "#34D399" : "#94A3B8",
            }}
          >
            {inRange ? "● In Range" : "Nearest Chest"}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "monospace",
              color: "#64748B",
            }}
          >
            {Math.round(bearing)}° {cardinalDirection}
          </span>
        </div>

        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>{landmark}</span>
          <span
            style={{
              color: inRange ? "#10B981" : "#38BDF8",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            {roundedDist}m
          </span>
        </div>
      </div>
    </div>
  );
}

