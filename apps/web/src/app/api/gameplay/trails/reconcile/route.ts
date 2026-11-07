/**
 * POST /api/gameplay/trails/reconcile
 * GE-04 Authoritative Trail Progress Evidence Reconciliation Endpoint
 * Reference: DEFI_TRAIL_GAME_EVOLUTION_PRD.md §5, §14; Playbook §11
 */

import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { checkReconcileRateLimit, recordReconcileRequest } from "@/lib/rate-limiter";
import { getGameplayConfigRepository } from "@/lib/gameplay/repository";
import {
  reconcileTrailProgressWithEvidence,
  type CheckpointEvidenceItem,
  mapRequestStatusToLifecycle,
  mapUIStateToLifecycle,
  resolveEvidenceCheckpointId,
} from "@/features/gameplay/trails/evidence-adapter";
import type { TrailProgress } from "@defi-trail/shared";
import type { StoredICMRequest } from "@/components/cross-chain/types";
import { findSlotByChestId } from "@/lib/campus";
import { getSponsorPerkCampaign } from "@/features/sponsor-perks/types";
import { getSponsorPerkService } from "@/lib/sponsor-perk-service";

export const dynamic = "force-dynamic";

interface ReconcileRequestBody {
  trailId?: unknown;
  player?: unknown;
  pendingRequests?: unknown;
  cachedProgress?: unknown;
  evidenceItems?: unknown;
}

function isCheckpointEvidenceItem(value: unknown): value is CheckpointEvidenceItem {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CheckpointEvidenceItem>;
  return (
    typeof candidate.requestId === "string" &&
    ["CREATED", "SENT", "REMOTE_EXECUTED", "ACK_PENDING", "CONFIRMED", "FAILED"].includes(
      candidate.status ?? "",
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    let body: ReconcileRequestBody;
    try {
      body = (await req.json()) as ReconcileRequestBody;
    } catch {
      return errorResponse("INVALID_PAYLOAD", "Request body must be valid JSON", 400);
    }

    const { trailId, player, pendingRequests, cachedProgress, evidenceItems } = body || {};

    if (!trailId || typeof trailId !== "string" || !player || typeof player !== "string") {
      return errorResponse(
        "INVALID_PAYLOAD",
        "Both 'trailId' and 'player' are required strings.",
        400,
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    // 1. Rate Limiter Enforcement (PRD Playbook §11: reconcile endpoint rate-limited)
    const rateCheck = checkReconcileRateLimit(player, clientIp);
    if (!rateCheck.allowed) {
      return errorResponse(
        rateCheck.code || "RATE_LIMITED",
        rateCheck.message || "Too many evidence reconciliation requests.",
        429,
        { retryable: true },
      );
    }
    recordReconcileRequest(player, clientIp);

    // 2. Active Trail Resolution from Authoritative Repository
    const repo = getGameplayConfigRepository();
    const todayResult = repo.getTodayTrail(new Date());
    if (!todayResult || todayResult.trail.id !== trailId) {
      return errorResponse(
        "TRAIL_NOT_FOUND",
        `Trail with id '${trailId}' is not currently active.`,
        404,
      );
    }

    const trail = todayResult.trail;

    // 3. Assemble evidence items from explicit items and pending stored requests
    const items: CheckpointEvidenceItem[] = Array.isArray(evidenceItems)
      ? evidenceItems.filter(isCheckpointEvidenceItem)
      : [];

    if (Array.isArray(pendingRequests)) {
      for (const reqItem of pendingRequests as StoredICMRequest[]) {
        if (!reqItem || !reqItem.requestId) continue;
        const status =
          reqItem.onChainStatus !== undefined
            ? mapRequestStatusToLifecycle(reqItem.onChainStatus)
            : mapUIStateToLifecycle(reqItem.status);

        items.push({
          requestId: reqItem.requestId,
          chestId: reqItem.chestId,
          chestSlot: reqItem.chestSlot,
          status,
          occurredAt: reqItem.startedAt
            ? new Date(reqItem.startedAt).toISOString()
            : new Date().toISOString(),
          mode: "DEMO",
          txHash: reqItem.txHash,
          error: reqItem.error,
        });
      }
    }

    // 4. Reconcile evidence using deterministic adapter
    const result = reconcileTrailProgressWithEvidence({
      trail,
      player,
      baseProgress: cachedProgress as TrailProgress | null,
      evidenceItems: items,
    });

    // GE-10: only the authoritative CONFIRMED reconciliation boundary may
    // create sponsor-perk eligibility. This ledger is isolated from vaults,
    // balances, SponsorPool allocation, and Mock USDC accounting.
    for (const item of items) {
      if (item.status !== "CONFIRMED") continue;
      const checkpointId = resolveEvidenceCheckpointId(trail, item);
      if (!checkpointId) continue;
      const completion = result.progress.completedCheckpoints.find(
        (entry) =>
          entry.checkpointId === checkpointId &&
          entry.requestId?.toLowerCase() === item.requestId.toLowerCase(),
      );
      if (!completion) continue;

      const checkpoint = trail.checkpoints.find(
        (entry) => entry.id === checkpointId,
      );
      const slot = checkpoint
        ? findSlotByChestId(checkpoint.chestId)
        : undefined;
      if (slot?.type !== "SPONSOR" || !slot.sponsorCampaign) continue;
      const campaign = getSponsorPerkCampaign(slot.sponsorCampaign);
      if (!campaign) continue;

      getSponsorPerkService().recordConfirmedEligibility({
        player,
        campaignId: campaign.id,
        ruleId: campaign.ruleId,
        requestId: item.requestId,
        chestId: slot.chestId,
        confirmedAt: completion.completedAt,
      });
    }

    return successResponse({
      progress: result.progress,
      view: result.view,
      pendingCheckpoint: result.pendingCheckpoint,
      appliedCount: result.appliedCount,
      duplicateCount: result.duplicateCount,
      outOfOrderCount: result.outOfOrderCount,
      isComplete: result.isComplete,
      failedCheckpoints: result.failedCheckpoints,
    });
  } catch (err: unknown) {
    return errorResponse(
      "INTERNAL_ERROR",
      err instanceof Error ? err.message : "Failed to reconcile trail progress",
      500,
      { retryable: true },
    );
  }
}

