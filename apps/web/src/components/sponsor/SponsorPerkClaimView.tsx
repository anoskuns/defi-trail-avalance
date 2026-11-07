"use client";

import { useEffect, useState } from "react";
import { parseSafeJSON } from "@/lib/json";
import {
  DEMO_SPONSOR_PERK_CAMPAIGN,
  type SponsorPerkClaimReceipt,
} from "@/features/sponsor-perks/types";
import type { ICMUIState } from "@/components/cross-chain";
import styles from "./SponsorPerk.module.css";

export interface SponsorPerkClaimViewProps {
  walletAddress?: string;
  claimAuthorization?: string;
  evidence: {
    state: ICMUIState;
    requestId?: string;
    chestType?: string;
  };
}

export function SponsorPerkClaimView({
  walletAddress,
  claimAuthorization,
  evidence,
}: SponsorPerkClaimViewProps) {
  const [claim, setClaim] = useState<SponsorPerkClaimReceipt | null>(null);
  const [error, setError] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);
  const [copied, setCopied] = useState(false);
  const isSponsor = evidence.chestType?.toUpperCase() === "SPONSOR";
  const canClaim = Boolean(
    isSponsor &&
      evidence.state === "confirmed" &&
      evidence.requestId &&
      walletAddress &&
      claimAuthorization,
  );

  useEffect(() => {
    setClaim(null);
    setError("");
    setCopied(false);
  }, [evidence.requestId]);

  if (!isSponsor && !claim) return null;

  async function requestClaim() {
    if (
      !canClaim ||
      !walletAddress ||
      !evidence.requestId ||
      !claimAuthorization ||
      isClaiming
    ) return;
    setIsClaiming(true);
    setError("");
    try {
      const response = await fetch("/api/sponsor-perks/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: walletAddress,
          campaignId: DEMO_SPONSOR_PERK_CAMPAIGN.id,
          ruleId: DEMO_SPONSOR_PERK_CAMPAIGN.ruleId,
          requestId: evidence.requestId,
          claimAuthorization,
        }),
      });
      const body = parseSafeJSON<{
        claim?: SponsorPerkClaimReceipt;
        error?: { message?: string };
      }>(await response.text());
      if (!response.ok || !body?.claim) {
        throw new Error(
          body?.error?.message ?? "Sponsor perk claim could not be issued.",
        );
      }
      setClaim(body.claim);
    } catch (claimError: unknown) {
      setError(
        claimError instanceof Error
          ? claimError.message
          : "Sponsor perk claim could not be issued.",
      );
    } finally {
      setIsClaiming(false);
    }
  }

  async function copyToken() {
    if (!claim) return;
    await navigator.clipboard?.writeText(claim.claimToken);
    setCopied(true);
  }

  return (
    <section className={styles.card} aria-labelledby="sponsor-perk-claim-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Sponsor perk claim</p>
          <h2 id="sponsor-perk-claim-title" className={styles.title}>
            {DEMO_SPONSOR_PERK_CAMPAIGN.title}
          </h2>
          <p className={styles.description}>
            {DEMO_SPONSOR_PERK_CAMPAIGN.description}
          </p>
        </div>
        <span className={styles.status} data-ready={canClaim}>
          {claim
            ? "Claim issued"
            : canClaim
              ? "Eligible to claim"
              : "Awaiting ICM confirmation"}
        </span>
      </div>

      <div className={styles.boundaryGrid} aria-label="Asset boundary">
        <div className={styles.boundary}>
          <strong>Mock USDC</strong>
          <span>
            Test-only contract accounting on Fuji. It is not money and is not
            redeemable here.
          </span>
        </div>
        <div className={styles.boundary}>
          <strong>Sponsor perk</strong>
          <span>
            A separate promotional entitlement with its own inventory, expiry,
            and redemption audit.
          </span>
        </div>
      </div>

      {!claim ? (
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            type="button"
            disabled={!canClaim || isClaiming}
            onClick={requestClaim}
          >
            {isClaiming ? "Issuing secure claim…" : "Claim sponsor perk"}
          </button>
        </div>
      ) : (
        <div className={styles.success} role="status" aria-live="polite">
          <strong>Claim ready for the sponsor counter</strong>
          <div className={styles.tokenBox}>{claim.claimToken}</div>
          <p className={styles.muted}>
            Expires {new Date(claim.expiresAt).toLocaleString()}. The token is
            opaque and contains no wallet address or QR secret.
          </p>
          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={copyToken}
            >
              {copied ? "Token copied" : "Copy claim token"}
            </button>
          </div>
        </div>
      )}

      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : null}
      <p className={styles.terms}>{DEMO_SPONSOR_PERK_CAMPAIGN.terms}</p>
    </section>
  );
}
