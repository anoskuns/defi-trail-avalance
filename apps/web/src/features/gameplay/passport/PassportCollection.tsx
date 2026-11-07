import Link from "next/link";
import type { CSSProperties } from "react";
import type { PassportEvaluation } from "./engine";
import { createPassportShareSnapshot } from "./share";
import styles from "./PassportCollection.module.css";

export interface PassportCollectionProps {
  evaluation: PassportEvaluation;
  walletAddress?: string;
  isDemoPlayer?: boolean;
}

function statusLabel(status: "LOCKED" | "IN_PROGRESS" | "EARNED"): string {
  if (status === "EARNED") return "Unlocked";
  if (status === "IN_PROGRESS") return "In progress";
  return "Locked";
}

export function PassportCollection({
  evaluation,
  walletAddress,
  isDemoPlayer = false,
}: PassportCollectionProps) {
  const unlocked = evaluation.collection.filter(
    (item) => item.status === "EARNED",
  ).length;
  const share = createPassportShareSnapshot({
    badgeCount: unlocked,
    nextGoal: evaluation.nextGoal?.definition.title,
    walletAddress,
  });

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <Link className={styles.backLink} href="/">
          ← Back to trail
        </Link>

        <section className={styles.hero} aria-labelledby="passport-title">
          <div>
            <p className={styles.eyebrow}>Gameplay collection</p>
            <h1 className={styles.title} id="passport-title">
              Trail Passport
            </h1>
            <p className={styles.intro}>
              A private-by-default record of confirmed exploration and learning.
              These badges are gameplay milestones, not transferable assets.
            </p>
          </div>
          <div className={styles.summary} aria-label="Passport summary">
            <div className={styles.metric}>
              <strong>{unlocked}</strong>
              <span>Unlocked</span>
            </div>
            <div className={styles.metric}>
              <strong>{evaluation.collection.length - unlocked}</strong>
              <span>Still exploring</span>
            </div>
          </div>
        </section>

        <div role="status" aria-atomic="true">
          {evaluation.nextGoal ? (
            <section className={styles.goal} aria-labelledby="next-goal-title">
              <p className={styles.goalLabel}>Next goal</p>
              <h2 className={styles.goalTitle} id="next-goal-title">
                {evaluation.nextGoal.definition.title} · {evaluation.nextGoal.current}/
                {evaluation.nextGoal.target}
              </h2>
              <p className={styles.goalHint}>
                {evaluation.nextGoal.definition.unlockHint}
              </p>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label={`${evaluation.nextGoal.definition.title} progress`}
                aria-valuemin={0}
                aria-valuemax={evaluation.nextGoal.target}
                aria-valuenow={evaluation.nextGoal.current}
              >
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(evaluation.nextGoal.current / evaluation.nextGoal.target) * 100}%`,
                  }}
                />
              </div>
            </section>
          ) : (
            <section className={styles.goal}>
              <p className={styles.goalLabel}>Collection complete</p>
              <h2 className={styles.goalTitle}>Every current badge is unlocked.</h2>
            </section>
          )}
        </div>

        <section aria-labelledby="badge-collection-title">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="badge-collection-title">
                Badge collection
              </h2>
              <p className={styles.sectionIntro}>
                {isDemoPlayer
                  ? "Demo profile shown until a wallet is connected."
                  : "Only confirmed evidence advances these goals."}
              </p>
            </div>
          </div>
          <ul className={styles.grid}>
            {evaluation.collection.map((item) => {
              const progress = (item.current / item.target) * 100;
              const themeStyle = {
                "--badge-accent": item.definition.theme.accent,
                "--badge-surface": item.definition.theme.surface,
              } as CSSProperties;
              return (
                <li
                  className={`${styles.card} ${
                    item.status === "EARNED"
                      ? styles.cardEarned
                      : styles.cardLocked
                  }`}
                  data-artwork-key={item.definition.artworkKey}
                  key={item.definition.key}
                  style={themeStyle}
                >
                  <div className={styles.badgeTop}>
                    <div className={styles.artwork} aria-hidden="true">
                      {item.definition.key
                        .split("_")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <span className={styles.status}>
                        {statusLabel(item.status)}
                      </span>
                      <h3 className={styles.cardTitle}>{item.definition.title}</h3>
                    </div>
                  </div>
                  <p className={styles.description}>{item.definition.description}</p>
                  <p className={styles.unlockHint}>{item.definition.unlockHint}</p>
                  <div className={styles.cardProgress}>
                    <span>
                      {item.current} of {item.target}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className={styles.progressTrack} aria-hidden="true">
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className={styles.share} aria-labelledby="share-card-title">
          <h2 className={styles.shareTitle} id="share-card-title">
            Share preview
          </h2>
          <p className={styles.shareSummary}>{share.summary}</p>
          <p className={styles.privacyNote}>{share.privacyNote}</p>
        </aside>
      </main>
    </div>
  );
}

