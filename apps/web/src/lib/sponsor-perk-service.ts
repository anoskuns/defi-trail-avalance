import crypto from "node:crypto";
import {
  SPONSOR_PERK_CAMPAIGNS,
  type SponsorPerkAuditView,
  type SponsorPerkCampaignDefinition,
  type SponsorPerkClaimReceipt,
  type SponsorPerkClaimStatus,
  type SponsorPerkRedemptionReceipt,
} from "@/features/sponsor-perks/types";

const WALLET_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const TRANSACTION_ID_PATTERN = /^[a-zA-Z0-9:_-]{8,128}$/;

interface ConfirmedEligibility {
  player: string;
  campaignId: string;
  ruleId: string;
  requestId: string;
  chestId: string;
  confirmedAt: string;
}

interface StoredClaim {
  claimId: string;
  player: string;
  campaignId: string;
  ruleId: string;
  requestId: string;
  tokenHash: string;
  status: SponsorPerkClaimStatus;
  issuedAt: string;
  expiresAt: string;
  redeemedAt?: string;
  redemptionTransactionId?: string;
  operatorId?: string;
}

export class SponsorPerkError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly retryable = false,
  ) {
    super(message);
    this.name = "SponsorPerkError";
  }
}

function normalizeWallet(wallet: string): string {
  return wallet.trim().toLowerCase();
}

function hashOpaqueToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashesMatch(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function eligibilityKey(input: {
  player: string;
  campaignId: string;
  ruleId: string;
  requestId: string;
}): string {
  return [
    normalizeWallet(input.player),
    input.campaignId,
    input.ruleId,
    input.requestId.toLowerCase(),
  ].join(":");
}

function uniqueClaimKey(input: {
  player: string;
  campaignId: string;
  ruleId: string;
}): string {
  return [normalizeWallet(input.player), input.campaignId, input.ruleId].join(":");
}

export interface SponsorPerkServiceOptions {
  campaigns?: readonly SponsorPerkCampaignDefinition[];
  now?: () => number;
  tokenGenerator?: () => string;
}

export class SponsorPerkService {
  private static instance: SponsorPerkService | null = null;

  private readonly campaigns = new Map<string, SponsorPerkCampaignDefinition>();
  private readonly eligibility = new Map<string, ConfirmedEligibility>();
  private readonly claimAuthorizationHashes = new Map<string, string>();
  private readonly claims = new Map<string, StoredClaim>();
  private readonly claimIdsByUniqueKey = new Map<string, string>();
  private readonly claimIdsByTokenHash = new Map<string, string>();
  private readonly claimIdsByTransactionId = new Map<string, string>();
  private readonly auditEvents: SponsorPerkAuditView[] = [];
  private readonly locks = new Map<string, Promise<void>>();
  private readonly now: () => number;
  private readonly tokenGenerator: () => string;

  constructor(options: SponsorPerkServiceOptions = {}) {
    for (const campaign of options.campaigns ?? SPONSOR_PERK_CAMPAIGNS) {
      this.campaigns.set(campaign.id, { ...campaign });
    }
    this.now = options.now ?? Date.now;
    this.tokenGenerator =
      options.tokenGenerator ??
      (() => `spk_${crypto.randomBytes(32).toString("base64url")}`);
  }

  static getInstance(): SponsorPerkService {
    if (!SponsorPerkService.instance) {
      SponsorPerkService.instance = new SponsorPerkService();
    }
    return SponsorPerkService.instance;
  }

  static resetInstance(): void {
    SponsorPerkService.instance = null;
  }

  recordConfirmedEligibility(input: {
    player: string;
    campaignId: string;
    ruleId: string;
    requestId: string;
    chestId: string;
    confirmedAt?: string;
  }): ConfirmedEligibility {
    const campaign = this.campaigns.get(input.campaignId);
    if (!campaign || campaign.ruleId !== input.ruleId) {
      throw new SponsorPerkError(
        "CAMPAIGN_RULE_MISMATCH",
        "Sponsor campaign and eligibility rule do not match.",
        400,
      );
    }
    if (!WALLET_PATTERN.test(input.player)) {
      throw new SponsorPerkError("INVALID_WALLET", "Wallet address is invalid.", 400);
    }

    const record: ConfirmedEligibility = {
      player: normalizeWallet(input.player),
      campaignId: input.campaignId,
      ruleId: input.ruleId,
      requestId: input.requestId.toLowerCase(),
      chestId: input.chestId.toLowerCase(),
      confirmedAt: input.confirmedAt ?? new Date(this.now()).toISOString(),
    };
    const key = eligibilityKey(record);
    if (!this.eligibility.has(key)) {
      this.eligibility.set(key, record);
      this.appendAudit({
        eventType: "ELIGIBILITY_CONFIRMED",
        actorType: "SYSTEM",
        actorId: "icm-reconciliation",
      });
    }
    return this.eligibility.get(key)!;
  }

  issueClaimAuthorization(input: {
    player: string;
    campaignId: string;
    ruleId: string;
    requestId: string;
  }): string {
    const campaign = this.campaigns.get(input.campaignId);
    if (!campaign || campaign.ruleId !== input.ruleId) {
      throw new SponsorPerkError(
        "CAMPAIGN_RULE_MISMATCH",
        "Sponsor campaign and eligibility rule do not match.",
        400,
      );
    }
    if (!WALLET_PATTERN.test(input.player)) {
      throw new SponsorPerkError("INVALID_WALLET", "Wallet address is invalid.", 400);
    }
    const authorization = `spka_${crypto.randomBytes(32).toString("base64url")}`;
    this.claimAuthorizationHashes.set(
      eligibilityKey(input),
      hashOpaqueToken(authorization),
    );
    return authorization;
  }

  async claim(input: {
    player: string;
    campaignId: string;
    ruleId: string;
    requestId: string;
    claimAuthorization: string;
  }): Promise<SponsorPerkClaimReceipt> {
    const normalizedPlayer = normalizeWallet(input.player);
    const lockKey = `claim:${uniqueClaimKey({ ...input, player: normalizedPlayer })}`;
    return this.withLock(lockKey, () => {
      if (!WALLET_PATTERN.test(input.player)) {
        throw new SponsorPerkError("INVALID_WALLET", "Wallet address is invalid.", 400);
      }

      const campaign = this.campaigns.get(input.campaignId);
      if (!campaign) {
        throw new SponsorPerkError("CAMPAIGN_NOT_FOUND", "Sponsor campaign was not found.", 404);
      }
      if (campaign.ruleId !== input.ruleId) {
        throw new SponsorPerkError(
          "CAMPAIGN_RULE_MISMATCH",
          "Wallet, campaign, and eligibility rule do not match.",
          403,
        );
      }

      const now = this.now();
      const campaignStart = Date.parse(campaign.startsAt);
      const campaignEnd = Date.parse(campaign.endsAt);
      if (now < campaignStart || now >= campaignEnd) {
        throw new SponsorPerkError(
          "CAMPAIGN_INACTIVE",
          "This sponsor campaign is not active.",
          409,
        );
      }

      const confirmed = this.eligibility.get(
        eligibilityKey({ ...input, player: normalizedPlayer }),
      );
      if (!confirmed) {
        throw new SponsorPerkError(
          "NOT_ELIGIBLE",
          "A confirmed sponsor checkpoint for this wallet, campaign, and request is required.",
          403,
        );
      }

      const authorizationHash = this.claimAuthorizationHashes.get(
        eligibilityKey({ ...input, player: normalizedPlayer }),
      );
      if (
        !authorizationHash ||
        !input.claimAuthorization ||
        !hashesMatch(hashOpaqueToken(input.claimAuthorization), authorizationHash)
      ) {
        throw new SponsorPerkError(
          "UNAUTHORIZED_CLAIM",
          "The sponsor proof authorization does not match this wallet and request.",
          401,
        );
      }

      const claimKey = uniqueClaimKey({ ...input, player: normalizedPlayer });
      if (this.claimIdsByUniqueKey.has(claimKey)) {
        throw new SponsorPerkError(
          "ALREADY_CLAIMED",
          "This wallet already claimed the campaign perk.",
          409,
        );
      }

      const reservedInventory = Array.from(this.claims.values()).filter(
        (claim) => claim.campaignId === campaign.id,
      ).length;
      if (reservedInventory >= campaign.inventory) {
        throw new SponsorPerkError(
          "INVENTORY_EXHAUSTED",
          "This sponsor campaign has no perk inventory remaining.",
          409,
        );
      }

      const claimToken = this.tokenGenerator();
      if (claimToken.length < 32) {
        throw new SponsorPerkError(
          "TOKEN_GENERATION_FAILED",
          "Unable to issue a secure claim token.",
          500,
          true,
        );
      }
      const tokenHash = hashOpaqueToken(claimToken);
      if (this.claimIdsByTokenHash.has(tokenHash)) {
        throw new SponsorPerkError(
          "TOKEN_GENERATION_FAILED",
          "Unable to issue a unique claim token.",
          500,
          true,
        );
      }

      const claimId = `clm_${crypto.randomUUID()}`;
      const issuedAt = new Date(now).toISOString();
      const expiresAt = new Date(
        Math.min(now + campaign.claimTtlSeconds * 1_000, campaignEnd),
      ).toISOString();
      const claim: StoredClaim = {
        claimId,
        player: normalizedPlayer,
        campaignId: campaign.id,
        ruleId: campaign.ruleId,
        requestId: input.requestId.toLowerCase(),
        tokenHash,
        status: "CLAIMED",
        issuedAt,
        expiresAt,
      };

      this.claims.set(claimId, claim);
      this.claimIdsByUniqueKey.set(claimKey, claimId);
      this.claimIdsByTokenHash.set(tokenHash, claimId);
      this.appendAudit({
        eventType: "ELIGIBILITY_CONFIRMED",
        claimId,
        actorType: "SYSTEM",
        actorId: "icm-reconciliation",
      });
      this.appendAudit({
        eventType: "CLAIM_ISSUED",
        claimId,
        actorType: "PLAYER",
        actorId: this.walletAuditId(normalizedPlayer),
      });

      return {
        claimId,
        campaignId: campaign.id,
        ruleId: campaign.ruleId,
        title: campaign.title,
        description: campaign.description,
        terms: campaign.terms,
        status: "CLAIMED",
        issuedAt,
        expiresAt,
        claimToken,
      };
    });
  }

  async redeem(input: {
    claimToken: string;
    transactionId: string;
    operatorId: string;
  }): Promise<SponsorPerkRedemptionReceipt> {
    if (!input.claimToken || input.claimToken.length < 32) {
      throw new SponsorPerkError("INVALID_CLAIM_TOKEN", "Claim token is invalid.", 400);
    }
    if (!TRANSACTION_ID_PATTERN.test(input.transactionId)) {
      throw new SponsorPerkError(
        "INVALID_TRANSACTION_ID",
        "Redemption transaction ID must be 8-128 safe characters.",
        400,
      );
    }
    if (!input.operatorId) {
      throw new SponsorPerkError("UNAUTHORIZED_OPERATOR", "Operator is not authenticated.", 401);
    }

    const tokenHash = hashOpaqueToken(input.claimToken);
    return this.withLock(`redeem:${tokenHash}`, () => {
      const claimId = this.claimIdsByTokenHash.get(tokenHash);
      const claim = claimId ? this.claims.get(claimId) : undefined;
      if (!claim) {
        throw new SponsorPerkError(
          "INVALID_CLAIM_TOKEN",
          "Claim token was not found.",
          404,
        );
      }

      if (claim.status === "REDEEMED") {
        if (claim.redemptionTransactionId === input.transactionId) {
          this.appendAudit({
            eventType: "REDEMPTION_REPLAYED",
            claimId: claim.claimId,
            transactionId: input.transactionId,
            actorType: "OPERATOR",
            actorId: input.operatorId,
          });
          return this.toRedemptionReceipt(claim, true);
        }
        throw new SponsorPerkError(
          "ALREADY_REDEEMED",
          "This perk was already redeemed by another transaction.",
          409,
        );
      }

      const now = this.now();
      if (claim.status === "EXPIRED" || now >= Date.parse(claim.expiresAt)) {
        if (claim.status !== "EXPIRED") {
          claim.status = "EXPIRED";
          this.appendAudit({
            eventType: "CLAIM_EXPIRED",
            claimId: claim.claimId,
            actorType: "SYSTEM",
            actorId: "expiry-check",
          });
        }
        throw new SponsorPerkError(
          "CLAIM_EXPIRED",
          "This sponsor perk claim has expired.",
          410,
        );
      }

      const transactionClaimId = this.claimIdsByTransactionId.get(input.transactionId);
      if (transactionClaimId && transactionClaimId !== claim.claimId) {
        throw new SponsorPerkError(
          "TRANSACTION_CONFLICT",
          "This transaction ID is already attached to another redemption.",
          409,
        );
      }

      claim.status = "REDEEMED";
      claim.redeemedAt = new Date(now).toISOString();
      claim.redemptionTransactionId = input.transactionId;
      claim.operatorId = input.operatorId;
      this.claimIdsByTransactionId.set(input.transactionId, claim.claimId);
      this.appendAudit({
        eventType: "REDEEMED",
        claimId: claim.claimId,
        transactionId: input.transactionId,
        actorType: "OPERATOR",
        actorId: input.operatorId,
      });
      return this.toRedemptionReceipt(claim, false);
    });
  }

  getAuditTrail(claimId: string): SponsorPerkAuditView[] {
    return this.auditEvents
      .filter((event) => event.claimId === claimId)
      .map((event) => ({ ...event }));
  }

  private toRedemptionReceipt(
    claim: StoredClaim,
    idempotentReplay: boolean,
  ): SponsorPerkRedemptionReceipt {
    const campaign = this.campaigns.get(claim.campaignId)!;
    return {
      claimId: claim.claimId,
      campaignId: claim.campaignId,
      ruleId: claim.ruleId,
      title: campaign.title,
      status: "REDEEMED",
      redeemedAt: claim.redeemedAt!,
      transactionId: claim.redemptionTransactionId!,
      operatorId: claim.operatorId!,
      idempotentReplay,
      auditTrail: this.getAuditTrail(claim.claimId),
    };
  }

  private appendAudit(
    event: Omit<SponsorPerkAuditView, "eventId" | "occurredAt">,
  ): SponsorPerkAuditView {
    const stored: SponsorPerkAuditView = {
      ...event,
      eventId: `aud_${crypto.randomUUID()}`,
      occurredAt: new Date(this.now()).toISOString(),
    };
    this.auditEvents.push(stored);
    return stored;
  }

  private walletAuditId(wallet: string): string {
    return `wallet_${crypto.createHash("sha256").update(wallet).digest("hex").slice(0, 16)}`;
  }

  private async withLock<T>(key: string, action: () => T | Promise<T>): Promise<T> {
    const previous = this.locks.get(key) ?? Promise.resolve();
    let release!: () => void;
    const current = new Promise<void>((resolve) => {
      release = resolve;
    });
    const queued = previous.then(() => current);
    this.locks.set(key, queued);
    await previous;
    try {
      return await action();
    } finally {
      release();
      if (this.locks.get(key) === queued) {
        this.locks.delete(key);
      }
    }
  }
}

export function getSponsorPerkService(): SponsorPerkService {
  return SponsorPerkService.getInstance();
}
