import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";
import { findSlotByChestId, getCurrentEpoch, computeCampaignIdHash } from "@/lib/campus";
import { haversineDistanceMeters } from "@/lib/geo";
import { generateNonce, signSponsorProof, verifySponsorQrPayload } from "@/lib/proof-signer";
import { getSponsorPerkCampaign } from "@/features/sponsor-perks/types";
import { getSponsorPerkService } from "@/lib/sponsor-perk-service";

interface SponsorProofRequestBody {
  wallet: string;
  chestId: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  capturedAt: number;
  mode?: number;
  openRadius?: number;
  qrPayload: string | unknown;
}

const MAX_ACCURACY_METERS = 50; // PRD §5.2
const MAX_CLOCK_SKEW_SECONDS = 30; // PRD §5.2
const BASE_OPEN_RADIUS_METERS = 30; // PRD §5.2

/**
 * POST /api/proofs/sponsor
 *
 * Verifies QR payload, geofence, and timing, then issues an EIP-712 SponsorProof (PRD §4.4, §10.3).
 *
 * PRIVACY GUARANTEE (PRD §5.2, §12.1):
 * Raw coordinates are only processed in memory for distance verification and are never
 * logged or written to persistent storage.
 */
export async function POST(req: NextRequest) {
  try {
    let body: SponsorProofRequestBody;
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
      qrPayload,
    } = body;

    // 1. Validate payload basics
    if (!wallet || typeof wallet !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return errorResponse("INVALID_PAYLOAD", "Invalid or missing wallet address", 400);
    }

    if (!chestId || typeof chestId !== "string") {
      return errorResponse("INVALID_PAYLOAD", "Invalid or missing chestId", 400);
    }

    if (!qrPayload) {
      return errorResponse("INVALID_QR", "Missing sponsor QR payload", 400);
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

    // 3. Timestamp check: within 30s window (PRD §5.2)
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

    if (slot.type !== "SPONSOR") {
      return errorResponse(
        "INVALID_CHEST_TYPE",
        `Chest is not a Sponsor Chest (type is ${slot.type})`,
        400,
        { retryable: false }
      );
    }

    // 5. QR payload verification
    const qrResult = verifySponsorQrPayload(qrPayload, slot.chestId);
    if (!qrResult.valid) {
      return errorResponse("INVALID_QR", qrResult.error || "Invalid sponsor QR code", 400);
    }

    // 6. Geofence / Distance calculation
    let openRadius = BASE_OPEN_RADIUS_METERS;
    if (body.openRadius && typeof body.openRadius === "number") {
      openRadius = Math.min(45, Math.max(30, Math.floor(body.openRadius)));
    }

    const distance = haversineDistanceMeters(latitude, longitude, slot.lat, slot.lng);
    const maxAllowedDistance = openRadius + accuracyMeters;

    if (distance > maxAllowedDistance) {
      return errorResponse(
        "OUTSIDE_RADIUS",
        "Move closer to this sponsor location. Current position is outside the open radius.",
        400,
        { retryable: true }
      );
    }

    // 7. Generate EIP-712 SponsorProof
    const epoch = getCurrentEpoch(serverNowSec);
    const nonce = generateNonce();
    const expiresAt = serverNowSec + 60; // 60s lifetime (<= 90s max TTL, PRD §5.2)
    const canonicalChestId = slot.chestId;
    const campaignIdHash = qrResult.campaignIdHash || computeCampaignIdHash(qrResult.campaignId || "demo-coffee-v1");

    const signature = await signSponsorProof({
      player: wallet.toLowerCase() as `0x${string}`,
      chestId: canonicalChestId,
      campaignId: campaignIdHash,
      epoch,
      nonce,
      expiresAt,
    });
    const campaign = getSponsorPerkCampaign(qrResult.campaignId || "");
    const perkClaimAuthorization = campaign
      ? getSponsorPerkService().issueClaimAuthorization({
          player: wallet.toLowerCase(),
          campaignId: campaign.id,
          ruleId: campaign.ruleId,
          requestId: canonicalChestId,
        })
      : undefined;

    return NextResponse.json({
      proof: {
        player: wallet.toLowerCase(),
        chestId: canonicalChestId,
        campaignId: campaignIdHash,
        epoch,
        nonce,
        expiresAt,
        signature,
      },
      ...(perkClaimAuthorization ? { perkClaimAuthorization } : {}),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse("INTERNAL_ERROR", message, 500);
  }
}

