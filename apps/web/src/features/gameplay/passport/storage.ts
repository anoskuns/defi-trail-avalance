import {
  earnedBadgeSchema,
  gameplayEvidenceEventSchema,
  passportStampSchema,
} from "@defi-trail/shared";
import {
  createEmptyPassportState,
  evaluatePassport,
  type PassportEvidenceRecord,
  type PassportEvaluation,
  type PassportState,
} from "./engine";

const PASSPORT_STORAGE_VERSION = 1;
export const PASSPORT_UPDATED_EVENT = "defi-trail:passport-updated";

function storageKey(player: string): string {
  return `defi-trail:passport:v${PASSPORT_STORAGE_VERSION}:${player.toLowerCase()}`;
}

export function loadPassportState(player: string): PassportState {
  const empty = createEmptyPassportState(player);
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(storageKey(player));
    if (!raw) return empty;
    const candidate = JSON.parse(raw) as Partial<PassportState>;
    if (
      candidate.version !== PASSPORT_STORAGE_VERSION ||
      candidate.player?.toLowerCase() !== player.toLowerCase() ||
      !Array.isArray(candidate.evidence) ||
      !Array.isArray(candidate.badges) ||
      !Array.isArray(candidate.stamps)
    ) {
      return empty;
    }
    const evidence = candidate.evidence.flatMap((record) => {
      if (!record || typeof record !== "object" || !("event" in record)) return [];
      const parsed = gameplayEvidenceEventSchema.safeParse(record.event);
      if (!parsed.success) return [];
      const typed = record as PassportEvidenceRecord;
      return [
        {
          event: parsed.data,
          ...(typeof typed.chestType === "string"
            ? { chestType: typed.chestType }
            : {}),
          ...(typeof typed.h3Cell === "string" ? { h3Cell: typed.h3Cell } : {}),
        },
      ];
    });
    const badges = candidate.badges.flatMap((badge) => {
      const parsed = earnedBadgeSchema.safeParse(badge);
      return parsed.success ? [parsed.data] : [];
    });
    const stamps = candidate.stamps.flatMap((stamp) => {
      const parsed = passportStampSchema.safeParse(stamp);
      return parsed.success ? [parsed.data] : [];
    });
    return {
      version: PASSPORT_STORAGE_VERSION,
      player: player.toLowerCase(),
      evidence,
      badges,
      stamps,
      updatedAt:
        typeof candidate.updatedAt === "string"
          ? candidate.updatedAt
          : empty.updatedAt,
    };
  } catch {
    return empty;
  }
}

export function savePassportState(state: PassportState): void {
  if (typeof window === "undefined") return;
  try {
    // This is a rebuildable UX cache. Confirmed evidence remains the source of truth,
    // and a storage failure must never block trail reconciliation.
    window.localStorage.setItem(storageKey(state.player), JSON.stringify(state));
    window.dispatchEvent(
      new CustomEvent(PASSPORT_UPDATED_EVENT, {
        detail: { player: state.player },
      }),
    );
  } catch {
    // Private browsing and quota limits may disable localStorage.
  }
}

export function recordPassportEvidence(input: {
  records: readonly PassportEvidenceRecord[];
  player: string;
  seasonId?: string;
}): PassportEvaluation {
  const evaluation = evaluatePassport({
    state: loadPassportState(input.player),
    evidence: input.records,
    ...(input.seasonId ? { seasonId: input.seasonId } : {}),
  });
  savePassportState(evaluation.state);
  return evaluation;
}

