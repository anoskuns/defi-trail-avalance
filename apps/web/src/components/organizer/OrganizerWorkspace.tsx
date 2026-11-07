"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { parseSafeJSON } from "@/lib/json";
import type {
  OrganizerContent,
  OrganizerWorkspaceData,
} from "@/features/organizer";
import styles from "./OrganizerWorkspace.module.css";

type PendingConfirmation = "PUBLISH" | "ARCHIVE" | null;

function toLocalDateTime(iso: string): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function toIsoDateTime(value: string): string {
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : value;
}

function cloneContent(content: OrganizerContent): OrganizerContent {
  return structuredClone(content);
}

export function OrganizerWorkspace() {
  const [accessToken, setAccessToken] = useState("");
  const [workspace, setWorkspace] = useState<OrganizerWorkspaceData | null>(null);
  const [content, setContent] = useState<OrganizerContent | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirmation, setConfirmation] = useState<PendingConfirmation>(null);
  const [confirmationText, setConfirmationText] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) errorSummaryRef.current?.focus();
  }, [error]);

  async function organizerRequest(
    method: "GET" | "POST",
    body?: Record<string, unknown>,
  ) {
    if (!accessToken.trim()) {
      setError("Enter an organizer access token.");
      return null;
    }
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/organizer/content", {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        cache: "no-store",
      });
      const result = parseSafeJSON<{
        workspace?: OrganizerWorkspaceData;
        error?: { message?: string };
      }>(await response.text());
      if (!response.ok || !result?.workspace) {
        throw new Error(result?.error?.message ?? "Organizer request failed.");
      }
      setWorkspace(result.workspace);
      setContent(cloneContent(result.workspace.draft.content));
      setDirty(false);
      return result.workspace;
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Organizer request failed.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  function updateContent(mutator: (next: OrganizerContent) => void) {
    if (!content) return;
    const next = cloneContent(content);
    mutator(next);
    setContent(next);
    setDirty(true);
    setNotice("");
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const loaded = await organizerRequest("GET");
    if (loaded) setNotice("Organizer workspace loaded.");
  }

  async function saveDraft() {
    if (!content) return;
    const saved = await organizerRequest("POST", {
      action: "SAVE_DRAFT",
      content,
    });
    if (saved) setNotice("Draft saved and validated on the server.");
  }

  async function confirmAction() {
    if (!workspace || !confirmation) return;
    const action = confirmation;
    const updated = await organizerRequest("POST", {
      action,
      expectedPublishedVersion:
        workspace.versions[0]?.version ?? workspace.currentPublishedVersion ?? 0,
      confirmation: confirmationText,
    });
    if (updated) {
      setNotice(
        action === "PUBLISH"
          ? `Published immutable version ${updated.currentPublishedVersion}.`
          : "Published content archived. Player APIs now return an empty state.",
      );
      setConfirmation(null);
      setConfirmationText("");
    }
  }

  async function restoreVersion(sourceVersion: number) {
    const restored = await organizerRequest("POST", {
      action: "RESTORE_VERSION",
      sourceVersion,
    });
    if (restored) {
      setNotice(
        `Version ${sourceVersion} copied into draft ${restored.draft.targetVersion}. Publishing will create a new immutable version.`,
      );
    }
  }

  if (!workspace || !content) {
    return (
      <section className={styles.unlockCard} aria-labelledby="organizer-login-title">
        <p className={styles.eyebrow}>Role-protected engagement content</p>
        <h1 id="organizer-login-title">Organizer workspace</h1>
        <p className={styles.lead}>
          Author season, trail, and sponsor campaign content without deploying a
          contract. Access is verified again for every mutation.
        </p>
        {error ? (
          <div className={styles.errorSummary} role="alert" tabIndex={-1} ref={errorSummaryRef}>
            {error}
          </div>
        ) : null}
        <form className={styles.unlockForm} onSubmit={unlock}>
          <label htmlFor="organizer-access-token">Organizer access token</label>
          <input
            id="organizer-access-token"
            type="password"
            autoComplete="current-password"
            value={accessToken}
            onChange={(event) => setAccessToken(event.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying role…" : "Open workspace"}
          </button>
        </form>
        <p className={styles.boundaryNotice}>
          This console contains no contract deployment, vault balance, SponsorPool
          budget, APR, or token transfer controls.
        </p>
      </section>
    );
  }

  const trail = content.trails[0];
  const campaign = content.campaigns[0];
  const hasBlockingIssues = workspace.validation.length > 0;

  return (
    <div className={styles.workspace}>
      <header className={styles.workspaceHeader}>
        <div>
          <p className={styles.eyebrow}>Engagement content · off-chain boundary</p>
          <h1>Organizer workspace</h1>
          <p className={styles.lead}>
            Draft, preview, validate, and publish immutable gameplay configuration.
          </p>
        </div>
        <div className={styles.headerMeta}>
          <span data-status={workspace.readiness.status}>
            {workspace.readiness.status}
          </span>
          <strong>Draft v{workspace.draft.targetVersion}</strong>
          <small>Published v{workspace.currentPublishedVersion ?? "—"}</small>
        </div>
      </header>

      {error ? (
        <div className={styles.errorSummary} role="alert" tabIndex={-1} ref={errorSummaryRef}>
          <h2>Unable to complete the organizer action</h2>
          <p>{error}</p>
        </div>
      ) : null}
      {notice ? <div className={styles.notice} role="status">{notice}</div> : null}

      <div className={styles.toolbar} aria-label="Draft actions">
        <button type="button" onClick={saveDraft} disabled={loading || !dirty}>
          {loading ? "Working…" : dirty ? "Save & validate draft" : "Draft saved"}
        </button>
        <button
          className={styles.publishButton}
          type="button"
          onClick={() => setConfirmation("PUBLISH")}
          disabled={loading || dirty || hasBlockingIssues}
        >
          Publish version {workspace.draft.targetVersion}
        </button>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => setConfirmation("ARCHIVE")}
          disabled={loading || workspace.currentPublishedVersion === null}
        >
          Archive current
        </button>
      </div>

      <div className={styles.editorLayout}>
        <div className={styles.editorColumn}>
          <section className={styles.panel} aria-labelledby="season-editor-title">
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.step}>01 · Season</p>
                <h2 id="season-editor-title">Season identity and schedule</h2>
              </div>
              <span className={styles.versionBadge}>v{workspace.draft.targetVersion}</span>
            </div>
            <div className={styles.formGrid}>
              <label>
                Stable season ID
                <input
                  value={content.season.id}
                  onChange={(event) => updateContent((next) => {
                    next.season.id = event.target.value;
                  })}
                />
              </label>
              <label>
                Season name
                <input
                  value={content.season.name}
                  onChange={(event) => updateContent((next) => {
                    next.season.name = event.target.value;
                  })}
                />
              </label>
              <label>
                Starts at
                <input
                  type="datetime-local"
                  value={toLocalDateTime(content.season.startsAt)}
                  onChange={(event) => updateContent((next) => {
                    next.season.startsAt = toIsoDateTime(event.target.value);
                  })}
                />
              </label>
              <label>
                Ends at
                <input
                  type="datetime-local"
                  value={toLocalDateTime(content.season.endsAt)}
                  onChange={(event) => updateContent((next) => {
                    next.season.endsAt = toIsoDateTime(event.target.value);
                  })}
                />
              </label>
              <label className={styles.fullWidth}>
                Theme key
                <input
                  value={content.season.themeKey}
                  onChange={(event) => updateContent((next) => {
                    next.season.themeKey = event.target.value;
                  })}
                />
              </label>
            </div>
            <fieldset className={styles.choiceGroup}>
              <legend>Seeded teams — select 3–4</legend>
              {workspace.catalog.teams.map((team) => (
                <label key={team.id}>
                  <input
                    type="checkbox"
                    checked={content.season.teamIds.includes(team.id)}
                    onChange={(event) => updateContent((next) => {
                      next.season.teamIds = event.target.checked
                        ? [...next.season.teamIds, team.id]
                        : next.season.teamIds.filter((id) => id !== team.id);
                    })}
                  />
                  <span>{team.name}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className={styles.choiceGroup}>
              <legend>Seeded badges</legend>
              {workspace.catalog.badges.map((badge) => (
                <label key={badge.id}>
                  <input
                    type="checkbox"
                    checked={content.season.badgeIds.includes(badge.id)}
                    onChange={(event) => updateContent((next) => {
                      next.season.badgeIds = event.target.checked
                        ? [...next.season.badgeIds, badge.id]
                        : next.season.badgeIds.filter((id) => id !== badge.id);
                    })}
                  />
                  <span>{badge.title}</span>
                </label>
              ))}
            </fieldset>
          </section>

          {trail ? (
            <section className={styles.panel} aria-labelledby="trail-editor-title">
              <div className={styles.panelHeading}>
                <div>
                  <p className={styles.step}>02 · Trail</p>
                  <h2 id="trail-editor-title">Trail and checkpoint selector</h2>
                </div>
                <span className={styles.seedBadge}>Seeded only</span>
              </div>
              <div className={styles.formGrid}>
                <label>
                  Trail ID
                  <input value={trail.id} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.id = event.target.value;
                  })} />
                </label>
                <label>
                  Trail title
                  <input value={trail.title} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.title = event.target.value;
                  })} />
                </label>
                <label className={styles.fullWidth}>
                  Description
                  <textarea value={trail.description} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.description = event.target.value;
                  })} />
                </label>
                <label>
                  Checkpoint mode
                  <select value={trail.checkpointMode} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.checkpointMode = event.target.value as "ORDERED" | "ANY_ORDER";
                  })}>
                    <option value="ORDERED">Ordered</option>
                    <option value="ANY_ORDER">Any order</option>
                  </select>
                </label>
                <label>
                  Estimated minutes
                  <input type="number" min="1" max="1440" value={trail.estimatedMinutes} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.estimatedMinutes = Number(event.target.value);
                  })} />
                </label>
                <label>
                  Completion badge
                  <select value={trail.completionBadgeId ?? ""} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.completionBadgeId = event.target.value || undefined;
                  })}>
                    <option value="">No completion badge</option>
                    {workspace.catalog.badges.map((badge) => <option key={badge.id} value={badge.id}>{badge.title}</option>)}
                  </select>
                </label>
                <label>
                  Sponsor perk
                  <select value={trail.perkCampaignId ?? ""} onChange={(event) => updateContent((next) => {
                    next.trails[0]!.perkCampaignId = event.target.value || undefined;
                  })}>
                    <option value="">No trail perk</option>
                    {workspace.catalog.campaigns.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                  </select>
                </label>
              </div>
              <fieldset className={styles.checkpointGrid}>
                <legend>Approved campus checkpoints — select 2–5</legend>
                {workspace.catalog.checkpoints.map((checkpoint) => {
                  const selected = trail.checkpointSlots.some((item) => item.slot === checkpoint.slot);
                  return (
                    <label key={checkpoint.slot} data-selected={selected}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) => updateContent((next) => {
                          const currentTrail = next.trails[0]!;
                          currentTrail.checkpointSlots = event.target.checked
                            ? [...currentTrail.checkpointSlots, {
                                id: `campus-slot-${checkpoint.slot + 1}`,
                                slot: checkpoint.slot,
                                title: checkpoint.label,
                              }].sort((left, right) => left.slot - right.slot)
                            : currentTrail.checkpointSlots.filter((item) => item.slot !== checkpoint.slot);
                        })}
                      />
                      <span><strong>{checkpoint.label}</strong><small>{checkpoint.sponsorCampaign ?? "Campus seed"}</small></span>
                    </label>
                  );
                })}
              </fieldset>
            </section>
          ) : null}

          {campaign ? (
            <section className={styles.panel} aria-labelledby="campaign-editor-title">
              <div className={styles.panelHeading}>
                <div>
                  <p className={styles.step}>03 · Campaign</p>
                  <h2 id="campaign-editor-title">Seeded sponsor campaign</h2>
                </div>
                <span className={styles.seedBadge}>{campaign.id}</span>
              </div>
              <div className={styles.formGrid}>
                <label>
                  Sponsor display name
                  <input value={campaign.sponsorName} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.sponsorName = event.target.value;
                  })} />
                </label>
                <label>
                  Campaign title
                  <input value={campaign.title} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.title = event.target.value;
                  })} />
                </label>
                <label className={styles.fullWidth}>
                  Description
                  <textarea value={campaign.description} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.description = event.target.value;
                  })} />
                </label>
                <label>
                  Starts at
                  <input type="datetime-local" value={toLocalDateTime(campaign.startsAt)} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.startsAt = toIsoDateTime(event.target.value);
                  })} />
                </label>
                <label>
                  Ends at
                  <input type="datetime-local" value={toLocalDateTime(campaign.endsAt)} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.endsAt = toIsoDateTime(event.target.value);
                  })} />
                </label>
                <label>
                  Claim expiry (seconds)
                  <input type="number" min="60" max="31536000" value={campaign.claimTtlSeconds} onChange={(event) => updateContent((next) => {
                    next.campaigns[0]!.claimTtlSeconds = Number(event.target.value);
                  })} />
                </label>
              </div>
              <p className={styles.boundaryNotice}>
                Campaign authoring controls copy, schedule, eligibility, and expiry only.
                Inventory and all economic parameters remain outside this UI.
              </p>
            </section>
          ) : null}
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.previewPanel} aria-labelledby="mobile-preview-title">
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.step}>Mobile preview</p>
                <h2 id="mobile-preview-title">Player view</h2>
              </div>
              <span className={styles.previewSize}>375 px</span>
            </div>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneTop}><span>DeFi Trail</span><small>Preview</small></div>
              <div className={styles.previewHero}>
                <small>{content.season.themeKey}</small>
                <h3>{content.season.name || "Untitled season"}</h3>
                <p>{trail?.description || "Add a trail description."}</p>
              </div>
              <div className={styles.previewTrail}>
                <strong>{trail?.title || "Untitled trail"}</strong>
                <span>{trail?.estimatedMinutes ?? 0} min · {trail?.checkpointMode === "ORDERED" ? "In order" : "Any order"}</span>
                <ol>
                  {trail?.checkpointSlots.map((checkpoint) => (
                    <li key={checkpoint.slot}><span>{checkpoint.slot + 1}</span>{checkpoint.title}</li>
                  ))}
                </ol>
              </div>
              {campaign ? (
                <div className={styles.previewPerk}>
                  <small>Sponsor perk · no cash value</small>
                  <strong>{campaign.title}</strong>
                  <span>{campaign.sponsorName}</span>
                </div>
              ) : null}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="validation-title">
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.step}>Publish gate</p>
                <h2 id="validation-title">Validation</h2>
              </div>
              <span className={workspace.validation.length ? styles.issueBadge : styles.readyBadge}>
                {workspace.validation.length ? `${workspace.validation.length} issues` : "Ready"}
              </span>
            </div>
            {dirty ? <p className={styles.muted}>Save the draft to refresh server validation.</p> : null}
            {workspace.validation.length ? (
              <ul className={styles.validationList}>
                {workspace.validation.map((item, index) => (
                  <li key={`${item.code}-${item.path}-${index}`}>
                    <strong>{item.path}</strong><span>{item.message}</span>
                  </li>
                ))}
              </ul>
            ) : <p className={styles.readyMessage}>All schedule, reference, duplicate, badge, and perk checks pass.</p>}
          </section>

          <section className={styles.panel} aria-labelledby="version-history-title">
            <div className={styles.panelHeading}>
              <div><p className={styles.step}>Immutable history</p><h2 id="version-history-title">Versions</h2></div>
            </div>
            <ul className={styles.historyList}>
              {workspace.versions.map((version) => (
                <li key={version.version}>
                  <div><strong>Version {version.version}</strong><span>{version.state} · {new Date(version.publishedAt).toLocaleString()}</span><code>{version.contentHash.slice(0, 12)}…</code></div>
                  <button type="button" onClick={() => restoreVersion(version.version)} disabled={loading}>Use as new draft</button>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel} aria-labelledby="audit-log-title">
            <div className={styles.panelHeading}><div><p className={styles.step}>Audit</p><h2 id="audit-log-title">Publish & archive events</h2></div></div>
            <ul className={styles.auditList}>
              {workspace.audit.filter((event) => event.eventType === "PUBLISHED" || event.eventType === "ARCHIVED").map((event) => (
                <li key={event.eventId}><span>{event.eventType}</span><strong>v{event.version}</strong><time dateTime={event.occurredAt}>{new Date(event.occurredAt).toLocaleString()}</time><small>{event.actorId}</small></li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {confirmation ? (
        <div className={styles.confirmation} role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
          <div className={styles.confirmationCard}>
            <p className={styles.eyebrow}>Explicit confirmation required</p>
            <h2 id="confirmation-title">{confirmation === "PUBLISH" ? `Publish version ${workspace.draft.targetVersion}?` : `Archive version ${workspace.currentPublishedVersion}?`}</h2>
            <p>{confirmation === "PUBLISH" ? "The snapshot becomes immutable. Future corrections require a higher version." : "Player APIs will stop serving this content. The audit snapshot remains available for restoration into a new version."}</p>
            <label>Type {confirmation} to continue<input autoFocus value={confirmationText} onChange={(event) => setConfirmationText(event.target.value)} /></label>
            <div className={styles.confirmationActions}>
              <button type="button" className={styles.secondaryButton} onClick={() => { setConfirmation(null); setConfirmationText(""); }}>Cancel</button>
              <button type="button" className={confirmation === "PUBLISH" ? styles.publishButton : styles.dangerButton} onClick={confirmAction} disabled={confirmationText !== confirmation || loading}>Confirm {confirmation.toLowerCase()}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
