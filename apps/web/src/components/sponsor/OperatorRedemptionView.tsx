"use client";

import { FormEvent, useState } from "react";
import { parseSafeJSON } from "@/lib/json";
import type { SponsorPerkRedemptionReceipt } from "@/features/sponsor-perks/types";
import styles from "./SponsorPerk.module.css";

export function OperatorRedemptionView() {
  const [operatorToken, setOperatorToken] = useState("");
  const [claimToken, setClaimToken] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [redemption, setRedemption] =
    useState<SponsorPerkRedemptionReceipt | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitRedemption(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    setRedemption(null);
    try {
      const response = await fetch("/api/sponsor-perks/redemptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${operatorToken}`,
        },
        body: JSON.stringify({ claimToken, transactionId }),
      });
      const body = parseSafeJSON<{
        redemption?: SponsorPerkRedemptionReceipt;
        error?: { message?: string };
      }>(await response.text());
      if (!response.ok || !body?.redemption) {
        throw new Error(body?.error?.message ?? "Redemption was rejected.");
      }
      setRedemption(body.redemption);
    } catch (redemptionError: unknown) {
      setError(
        redemptionError instanceof Error
          ? redemptionError.message
          : "Redemption was rejected.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.card} aria-labelledby="operator-redemption-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Authenticated operator</p>
          <h1 id="operator-redemption-title" className={styles.title}>
            Sponsor perk redemption
          </h1>
          <p className={styles.description}>
            Validate a player’s opaque token and attach one external counter
            transaction ID. This tool never changes Mock USDC, SponsorPool, or
            YieldVault balances.
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={submitRedemption}>
        <div className={styles.field}>
          <label htmlFor="operator-access-token">Operator access token</label>
          <input
            className={styles.input}
            id="operator-access-token"
            type="password"
            autoComplete="off"
            value={operatorToken}
            onChange={(event) => setOperatorToken(event.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="sponsor-claim-token">Player claim token</label>
          <input
            className={styles.input}
            id="sponsor-claim-token"
            type="text"
            autoComplete="off"
            value={claimToken}
            onChange={(event) => setClaimToken(event.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="redemption-transaction-id">
            Counter transaction ID
          </label>
          <input
            className={styles.input}
            id="redemption-transaction-id"
            type="text"
            value={transactionId}
            onChange={(event) => setTransactionId(event.target.value)}
            placeholder="pos:student-center:000123"
            pattern="[a-zA-Z0-9:_-]{8,128}"
            required
          />
        </div>
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking and redeeming…" : "Redeem once"}
          </button>
        </div>
      </form>

      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : null}

      {redemption ? (
        <div className={styles.success} role="status" aria-live="polite">
          <strong>
            {redemption.idempotentReplay
              ? "Idempotent replay: original redemption retained"
              : "Perk redeemed successfully"}
          </strong>
          <p className={styles.muted}>
            Transaction {redemption.transactionId} · Claim {redemption.claimId}
          </p>
          <ul className={styles.auditList} aria-label="Redemption audit trail">
            {redemption.auditTrail.map((event) => (
              <li className={styles.auditItem} key={event.eventId}>
                <span>{event.eventType.replaceAll("_", " ")}</span>
                <time dateTime={event.occurredAt}>
                  {new Date(event.occurredAt).toLocaleTimeString()}
                </time>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.notice}>
        Promotional fulfillment only. No cash value, token value, yield promise,
        or vault withdrawal is created by redemption.
      </div>
    </section>
  );
}
