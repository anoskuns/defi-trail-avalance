import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import {
  SponsorPerkService,
  getSponsorPerkService,
} from "@/lib/sponsor-perk-service";
import type { SponsorPerkCampaignDefinition } from "@/features/sponsor-perks/types";
import { POST as postClaim } from "@/app/api/sponsor-perks/claims/route";
import { POST as postRedemption } from "@/app/api/sponsor-perks/redemptions/route";
import { POST as postReconcile } from "@/app/api/gameplay/trails/reconcile/route";
import { getGameplayConfigRepository } from "@/lib/gameplay/repository";
import { reconcileTrailProgressWithEvidence } from "@/features/gameplay/trails/evidence-adapter";
import {
  checkSponsorClaimRateLimit,
  recordSponsorClaimAttempt,
  resetRateLimits,
} from "@/lib/rate-limiter";

const PLAYER = "0x1111111111111111111111111111111111111111";
const OTHER_PLAYER = "0x2222222222222222222222222222222222222222";
const CAMPAIGN_ID = "test-coffee-campaign";
const RULE_ID = "confirmed-sponsor-checkpoint-v1";
const REQUEST_ID = "0xrequest-sponsor-confirmed";
const NOW = Date.parse("2026-11-07T03:00:00.000Z");

const campaign: SponsorPerkCampaignDefinition = {
  id: CAMPAIGN_ID,
  ruleId: RULE_ID,
  title: "Complimentary size upgrade",
  description: "Promotional counter perk.",
  terms: "No cash value.",
  startsAt: "2026-11-01T00:00:00.000Z",
  endsAt: "2026-12-01T00:00:00.000Z",
  inventory: 2,
  claimTtlSeconds: 900,
};

function createService(now: () => number = () => NOW) {
  return new SponsorPerkService({ campaigns: [campaign], now });
}

function confirmEligibility(
  service: SponsorPerkService,
  player = PLAYER,
  requestId = REQUEST_ID,
) {
  service.recordConfirmedEligibility({
    player,
    campaignId: CAMPAIGN_ID,
    ruleId: RULE_ID,
    requestId,
    chestId: "0x3333333333333333333333333333333333333333333333333333333333333333",
  });
}

function issueAuthorization(
  service: SponsorPerkService,
  player = PLAYER,
  requestId = REQUEST_ID,
) {
  return service.issueClaimAuthorization({
    player,
    campaignId: CAMPAIGN_ID,
    ruleId: RULE_ID,
    requestId,
  });
}

async function issueClaim(service: SponsorPerkService) {
  confirmEligibility(service);
  const claimAuthorization = issueAuthorization(service);
  return service.claim({
    player: PLAYER,
    campaignId: CAMPAIGN_ID,
    ruleId: RULE_ID,
    requestId: REQUEST_ID,
    claimAuthorization,
  });
}

function apiRequest(
  path: string,
  body: Record<string, unknown>,
  authorization?: string,
) {
  return new NextRequest(`http://localhost:3000${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: JSON.stringify(body),
  });
}

describe("GE-10 Sponsor Perk claim and redemption", () => {
  beforeEach(() => {
    SponsorPerkService.resetInstance();
    resetRateLimits();
    process.env.SPONSOR_OPERATOR_TOKEN = "test-operator-secret";
    process.env.SPONSOR_OPERATOR_ID = "test-counter";
  });

  it("issues an opaque high-entropy token only for confirmed matching eligibility", async () => {
    const service = createService();
    const claim = await issueClaim(service);

    expect(claim.claimToken).toMatch(/^spk_[A-Za-z0-9_-]{43}$/);
    expect(claim.claimToken).not.toContain(PLAYER.toLowerCase());
    expect(claim.claimToken).not.toContain(CAMPAIGN_ID);
    expect(claim.claimToken).not.toContain("qr");
    expect(service.getAuditTrail(claim.claimId)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ eventType: "CLAIM_ISSUED" }),
      ]),
    );
    expect(JSON.stringify(service.getAuditTrail(claim.claimId))).not.toContain(
      claim.claimToken,
    );
  });

  it("rejects wrong wallet, campaign, rule, and duplicate claims", async () => {
    const service = createService();
    confirmEligibility(service);
    const claimAuthorization = issueAuthorization(service);

    await expect(
      service.claim({
        player: OTHER_PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: RULE_ID,
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    ).rejects.toMatchObject({ code: "NOT_ELIGIBLE" });

    await expect(
      service.claim({
        player: PLAYER,
        campaignId: "wrong-campaign",
        ruleId: RULE_ID,
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    ).rejects.toMatchObject({ code: "CAMPAIGN_NOT_FOUND" });

    await expect(
      service.claim({
        player: PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: "wrong-rule",
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    ).rejects.toMatchObject({ code: "CAMPAIGN_RULE_MISMATCH" });

    await expect(
      service.claim({
        player: PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: RULE_ID,
        requestId: REQUEST_ID,
        claimAuthorization: "spka_invalid_authorization_abcdefghijklmnopqrstuvwxyz",
      }),
    ).rejects.toMatchObject({ code: "UNAUTHORIZED_CLAIM" });

    await service.claim({
      player: PLAYER,
      campaignId: CAMPAIGN_ID,
      ruleId: RULE_ID,
      requestId: REQUEST_ID,
      claimAuthorization,
    });
    await expect(
      service.claim({
        player: PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: RULE_ID,
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    ).rejects.toMatchObject({ code: "ALREADY_CLAIMED" });
  });

  it("rejects inactive campaigns and exhausted inventory", async () => {
    const inactive = new SponsorPerkService({
      campaigns: [campaign],
      now: () => Date.parse("2027-01-01T00:00:00.000Z"),
    });
    confirmEligibility(inactive);
    const inactiveAuthorization = issueAuthorization(inactive);
    await expect(
      inactive.claim({
        player: PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: RULE_ID,
        requestId: REQUEST_ID,
        claimAuthorization: inactiveAuthorization,
      }),
    ).rejects.toMatchObject({ code: "CAMPAIGN_INACTIVE" });

    const oneItemCampaign = { ...campaign, inventory: 1 };
    const inventoryService = new SponsorPerkService({
      campaigns: [oneItemCampaign],
      now: () => NOW,
    });
    confirmEligibility(inventoryService);
    confirmEligibility(inventoryService, OTHER_PLAYER, "0xrequest-other");
    const firstAuthorization = issueAuthorization(inventoryService);
    const secondAuthorization = issueAuthorization(
      inventoryService,
      OTHER_PLAYER,
      "0xrequest-other",
    );
    await inventoryService.claim({
      player: PLAYER,
      campaignId: CAMPAIGN_ID,
      ruleId: RULE_ID,
      requestId: REQUEST_ID,
      claimAuthorization: firstAuthorization,
    });
    await expect(
      inventoryService.claim({
        player: OTHER_PLAYER,
        campaignId: CAMPAIGN_ID,
        ruleId: RULE_ID,
        requestId: "0xrequest-other",
        claimAuthorization: secondAuthorization,
      }),
    ).rejects.toMatchObject({ code: "INVENTORY_EXHAUSTED" });
  });

  it("rejects expired claims", async () => {
    let now = NOW;
    const shortCampaign = { ...campaign, claimTtlSeconds: 1 };
    const service = new SponsorPerkService({
      campaigns: [shortCampaign],
      now: () => now,
    });
    const claim = await issueClaim(service);
    now += 2_000;

    await expect(
      service.redeem({
        claimToken: claim.claimToken,
        transactionId: "pos:expired:0001",
        operatorId: "counter-1",
      }),
    ).rejects.toMatchObject({ code: "CLAIM_EXPIRED", status: 410 });
  });

  it("allows only one of two concurrent redemption transactions", async () => {
    const service = createService();
    const claim = await issueClaim(service);

    const results = await Promise.allSettled([
      service.redeem({
        claimToken: claim.claimToken,
        transactionId: "pos:counter:0001",
        operatorId: "counter-1",
      }),
      service.redeem({
        claimToken: claim.claimToken,
        transactionId: "pos:counter:0002",
        operatorId: "counter-1",
      }),
    ]);

    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((result) => result.status === "rejected")).toHaveLength(1);
    const rejected = results.find((result) => result.status === "rejected");
    expect((rejected as PromiseRejectedResult).reason).toMatchObject({
      code: "ALREADY_REDEEMED",
    });
  });

  it("treats the same redemption transaction ID as an idempotent replay", async () => {
    const service = createService();
    const claim = await issueClaim(service);
    const first = await service.redeem({
      claimToken: claim.claimToken,
      transactionId: "pos:counter:stable-1",
      operatorId: "counter-1",
    });
    const replay = await service.redeem({
      claimToken: claim.claimToken,
      transactionId: "pos:counter:stable-1",
      operatorId: "counter-1",
    });

    expect(first.idempotentReplay).toBe(false);
    expect(replay.idempotentReplay).toBe(true);
    expect(replay.claimId).toBe(first.claimId);
  });

  it("requires operator authentication at the redemption API", async () => {
    const response = await postRedemption(
      apiRequest("/api/sponsor-perks/redemptions", {
        claimToken: "spk_invalid_but_long_enough_abcdefghijklmnopqrstuvwxyz",
        transactionId: "pos:unauth:0001",
      }),
    );
    expect(response.status).toBe(401);
    expect((await response.json()).error.code).toBe("UNAUTHORIZED_OPERATOR");
  });

  it("enforces claim rate limiting", () => {
    recordSponsorClaimAttempt(PLAYER, "127.0.0.1", 60_000);
    recordSponsorClaimAttempt(PLAYER, "127.0.0.1", 60_000);
    expect(
      checkSponsorClaimRateLimit(PLAYER, "127.0.0.1", 60_000, 2),
    ).toMatchObject({ allowed: false });
  });

  it("creates eligibility only at the confirmed sponsor reconciliation boundary", async () => {
    const claimAuthorization = getSponsorPerkService().issueClaimAuthorization({
      player: PLAYER,
      campaignId: "demo-coffee-v1",
      ruleId: "confirmed-sponsor-checkpoint-v1",
      requestId: REQUEST_ID,
    });
    const active = getGameplayConfigRepository().getTodayTrail(
      new Date("2026-11-07T03:00:00.000Z"),
    );
    expect(active).not.toBeNull();
    const trail = active!.trail;
    const firstTwo = reconcileTrailProgressWithEvidence({
      trail,
      player: PLAYER,
      evidenceItems: [
        {
          requestId: "0xconfirmed-first",
          chestSlot: 0,
          status: "CONFIRMED",
          mode: "DEMO",
        },
        {
          requestId: "0xconfirmed-second",
          chestSlot: 1,
          status: "CONFIRMED",
          mode: "DEMO",
        },
      ],
    }).progress;

    const pendingResponse = await postReconcile(
      apiRequest("/api/gameplay/trails/reconcile", {
        trailId: trail.id,
        player: PLAYER,
        cachedProgress: firstTwo,
        evidenceItems: [
          {
            requestId: REQUEST_ID,
            chestSlot: 2,
            status: "ACK_PENDING",
            mode: "DEMO",
          },
        ],
      }),
    );
    expect(pendingResponse.status).toBe(200);

    const prematureClaim = await postClaim(
      apiRequest("/api/sponsor-perks/claims", {
        wallet: PLAYER,
        campaignId: "demo-coffee-v1",
        ruleId: "confirmed-sponsor-checkpoint-v1",
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    );
    expect(prematureClaim.status).toBe(403);

    const confirmedResponse = await postReconcile(
      apiRequest("/api/gameplay/trails/reconcile", {
        trailId: trail.id,
        player: PLAYER,
        cachedProgress: firstTwo,
        evidenceItems: [
          {
            requestId: REQUEST_ID,
            chestSlot: 2,
            status: "CONFIRMED",
            mode: "DEMO",
          },
        ],
      }),
    );
    expect(confirmedResponse.status).toBe(200);

    const eligibleClaim = await postClaim(
      apiRequest("/api/sponsor-perks/claims", {
        wallet: PLAYER,
        campaignId: "demo-coffee-v1",
        ruleId: "confirmed-sponsor-checkpoint-v1",
        requestId: REQUEST_ID,
        claimAuthorization,
      }),
    );
    expect(eligibleClaim.status).toBe(201);
  });

  it("enforces API duplicate claims and concurrent redemption", async () => {
    const service = getSponsorPerkService();
    service.recordConfirmedEligibility({
      player: PLAYER,
      campaignId: "demo-coffee-v1",
      ruleId: "confirmed-sponsor-checkpoint-v1",
      requestId: REQUEST_ID,
      chestId: "0x3333333333333333333333333333333333333333333333333333333333333333",
    });
    const claimAuthorization = service.issueClaimAuthorization({
      player: PLAYER,
      campaignId: "demo-coffee-v1",
      ruleId: "confirmed-sponsor-checkpoint-v1",
      requestId: REQUEST_ID,
    });

    const claimBody = {
      wallet: PLAYER,
      campaignId: "demo-coffee-v1",
      ruleId: "confirmed-sponsor-checkpoint-v1",
      requestId: REQUEST_ID,
      claimAuthorization,
    };
    const firstClaimResponse = await postClaim(
      apiRequest("/api/sponsor-perks/claims", claimBody),
    );
    expect(firstClaimResponse.status).toBe(201);
    const claimToken = (await firstClaimResponse.json()).claim.claimToken as string;

    const duplicateResponse = await postClaim(
      apiRequest("/api/sponsor-perks/claims", claimBody),
    );
    expect(duplicateResponse.status).toBe(409);

    const authorization = "Bearer test-operator-secret";
    const responses = await Promise.all([
      postRedemption(
        apiRequest(
          "/api/sponsor-perks/redemptions",
          { claimToken, transactionId: "pos:api:000001" },
          authorization,
        ),
      ),
      postRedemption(
        apiRequest(
          "/api/sponsor-perks/redemptions",
          { claimToken, transactionId: "pos:api:000002" },
          authorization,
        ),
      ),
    ]);
    expect(responses.map((response) => response.status).sort()).toEqual([200, 409]);
  });

  it("keeps perk endpoints isolated from vault and balance mutation APIs", () => {
    const claimsRoute = readFileSync(
      new URL("../src/app/api/sponsor-perks/claims/route.ts", import.meta.url),
      "utf8",
    );
    const redemptionsRoute = readFileSync(
      new URL(
        "../src/app/api/sponsor-perks/redemptions/route.ts",
        import.meta.url,
      ),
      "utf8",
    );
    const apiSource = `${claimsRoute}\n${redemptionsRoute}`;
    expect(apiSource).not.toMatch(/SponsorPool|YieldVault|allocatePrincipal|depositSponsored|balanceOf/);
  });

  it("uses explicit non-cash copy without profit or return promises", () => {
    const claimView = readFileSync(
      new URL(
        "../src/components/sponsor/SponsorPerkClaimView.tsx",
        import.meta.url,
      ),
      "utf8",
    );
    const operatorView = readFileSync(
      new URL(
        "../src/components/sponsor/OperatorRedemptionView.tsx",
        import.meta.url,
      ),
      "utf8",
    );
    const scanner = readFileSync(
      new URL(
        "../src/components/sponsor/SponsorScannerModal.tsx",
        import.meta.url,
      ),
      "utf8",
    );
    const copy = `${claimView}\n${operatorView}\n${scanner}`.toLowerCase();
    expect(copy).toContain("no cash value");
    expect(copy).not.toMatch(/guaranteed return|profit promise|cash payout/);
    expect(scanner).not.toContain("top-up vào vị thế");
  });
});
