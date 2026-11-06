import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";
import { findSlotByChestId, getCurrentEpoch } from "@/lib/campus";
import { haversineDistanceMeters } from "@/lib/geo";
import { generateNonce, signLocationProof } from "@/lib/proof-signer";

interface LocationProofRequestBody {
  wallet: string;
  chestId: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  capturedAt: number;
  mode?: number; // 0 = GPS, 1 = DEMO (PRD §5.2)
  openRadius?: number; // Optional radius override if fetched from PlayerState
}

const MAX_ACCURACY_METERS = 50; // PRD §5.2
const MAX_CLOCK_SKEW_SECONDS = 30; // PRD §5.2
const BASE_OPEN_RADIUS_METERS = 30; // PRD §5.2

/**
 * POST /api/proofs/location
 *
 * Verifies location constraints (accuracy, timestamp, geofence),
 * generates an EIP-712 LocationProof signature, and returns it.
 *
 * PRIVACY GUARANTEE (PRD §5.2, §12.1):
 * Raw coordinates (latitude, longitude, accuracy) are only used in memory
 * for distance calculation and are NEVER stored in a database or logged to server logs.
 */
export async function POST(req: NextRequest) {
  try {
    let body: LocationProofRequestBody;
    try {
      body = await req.json();
    } catch {
      return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON", 400);
    }

    const {
      wallet,
      chestId,
      latitude,
      longitude,
      accuracyMeters,
      capturedAt,
      mode = 0,
    } = body;

    // 1. Basic payload validations
    if (!wallet || typeof wallet !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return errorResponse("INVALID_PAYLOAD", "Invalid or missing wallet address", 400);
    }

    if (!chestId || typeof chestId !== "string") {
      return errorResponse("INVALID_PAYLOAD", "Invalid or missing chestId", 400);
    }

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      isNaN(latitude) ||
      isNaN(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return errorResponse("INVALID_PAYLOAD", "Invalid latitude or longitude values", 400);
    }

    if (typeof accuracyMeters !== "number" || isNaN(accuracyMeters) || accuracyMeters < 0) {
      return errorResponse("INVALID_PAYLOAD", "Invalid accuracyMeters value", 400);
    }

    if (typeof capturedAt !== "number" || isNaN(capturedAt)) {
      return errorResponse("INVALID_PAYLOAD", "Invalid capturedAt timestamp", 400);
    }

    const serverNowSec = Math.floor(Date.now() / 1000);

    // 2. Accuracy check: accuracyMeters <= 50m (PRD §5.2)
    if (accuracyMeters > MAX_ACCURACY_METERS) {
      return errorResponse(
        "LOW_ACCURACY",
        `GPS accuracy is too low (${accuracyMeters.toFixed(1)}m > ${MAX_ACCURACY_METERS}m max)`,
        400,
        { retryable: true }
      );
    }

    // 3. Timestamp skew check: capturedAt within 30s of server clock (PRD §5.2)
    const capturedAtSec = capturedAt > 1e11 ? Math.floor(capturedAt / 1000) : Math.floor(capturedAt);
    const clockDelta = Math.abs(serverNowSec - capturedAtSec);
    if (clockDelta > MAX_CLOCK_SKEW_SECONDS) {
      return errorResponse(
        "STALE_LOCATION",
        `Location timestamp differs by ${clockDelta}s from server clock (max ${MAX_CLOCK_SKEW_SECONDS}s allowed)`,
        400,
        { retryable: true }
      );
    }

    // 4. Chest lookup in Demo Campus
    const slot = findSlotByChestId(chestId, serverNowSec);
    if (!slot) {
      return errorResponse(
        "CHEST_INACTIVE",
        "Chest is not active or does not exist on this campus",
        404,
        { retryable: false }
      );
    }

    // 5. Geofence / Distance calculation
    // Clamped radius: base 30m, powerLevel can increase up to 45m (PRD §5.2)
    let openRadius = BASE_OPEN_RADIUS_METERS;
    if (body.openRadius && typeof body.openRadius === "number") {
      openRadius = Math.min(45, Math.max(30, Math.floor(body.openRadius)));
    }

    const distance = haversineDistanceMeters(latitude, longitude, slot.lat, slot.lng);
    const maxAllowedDistance = openRadius + accuracyMeters;

    if (distance > maxAllowedDistance) {
      return errorResponse(
        "OUTSIDE_RADIUS",
        "Move closer to this chest. Current position is outside the required open radius.",
        400,
        { retryable: true }
      );
    }

    // 6. Generate EIP-712 LocationProof
    const epoch = getCurrentEpoch(serverNowSec);
    const nonce = generateNonce();
    const expiresAt = serverNowSec + 60; // 60s lifetime (<= 90s max TTL, PRD §5.2)
    const proofMode = mode === 1 ? 1 : 0;
    const canonicalChestId = slot.chestId;

    const signature = await signLocationProof({
      player: wallet.toLowerCase() as `0x${string}`,
      chestId: canonicalChestId,
      epoch,
      radiusMeters: openRadius,
      nonce,
      expiresAt,
      mode: proofMode,
    });

    return NextResponse.json({
      proof: {
        player: wallet.toLowerCase(),
        chestId: canonicalChestId,
        epoch,
        radiusMeters: openRadius,
        nonce,
        expiresAt,
        mode: proofMode,
        signature,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse("INTERNAL_ERROR", message, 500);
  }
}

