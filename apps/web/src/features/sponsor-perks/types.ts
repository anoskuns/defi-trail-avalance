export type SponsorPerkClaimStatus = "CLAIMED" | "REDEEMED" | "EXPIRED";

export interface SponsorPerkCampaignDefinition {
  id: string;
  ruleId: string;
  title: string;
  description: string;
  terms: string;
  startsAt: string;
  endsAt: string;
  inventory: number;
  claimTtlSeconds: number;
}

export interface SponsorPerkClaimReceipt {
  claimId: string;
  campaignId: string;
  ruleId: string;
  title: string;
  description: string;
  terms: string;
  status: SponsorPerkClaimStatus;
  issuedAt: string;
  expiresAt: string;
  claimToken: string;
}

export interface SponsorPerkAuditView {
  eventId: string;
  eventType:
    | "ELIGIBILITY_CONFIRMED"
    | "CLAIM_ISSUED"
    | "CLAIM_EXPIRED"
    | "REDEEMED"
    | "REDEMPTION_REPLAYED";
  occurredAt: string;
  claimId?: string;
  transactionId?: string;
  actorType: "PLAYER" | "OPERATOR" | "SYSTEM";
  actorId: string;
}

export interface SponsorPerkRedemptionReceipt {
  claimId: string;
  campaignId: string;
  ruleId: string;
  title: string;
  status: "REDEEMED";
  redeemedAt: string;
  transactionId: string;
  operatorId: string;
  idempotentReplay: boolean;
  auditTrail: SponsorPerkAuditView[];
}

export const DEMO_SPONSOR_PERK_CAMPAIGN: SponsorPerkCampaignDefinition = {
  id: "demo-coffee-v1",
  ruleId: "confirmed-sponsor-checkpoint-v1",
  title: "Complimentary drink size upgrade",
  description:
    "Present the opaque claim token at the participating campus sponsor counter.",
  terms:
    "One redemption before expiry. Promotional perk only; no cash value, token value, yield, or withdrawal right.",
  startsAt: "2026-01-01T00:00:00.000Z",
  endsAt: "2027-01-01T00:00:00.000Z",
  inventory: 50,
  claimTtlSeconds: 15 * 60,
};

export const SPONSOR_PERK_CAMPAIGNS: readonly SponsorPerkCampaignDefinition[] = [
  DEMO_SPONSOR_PERK_CAMPAIGN,
];

export function getSponsorPerkCampaign(
  campaignId: string,
): SponsorPerkCampaignDefinition | null {
  return (
    SPONSOR_PERK_CAMPAIGNS.find((campaign) => campaign.id === campaignId) ??
    null
  );
}
