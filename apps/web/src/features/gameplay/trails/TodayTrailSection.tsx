"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  trailDefinitionSchema,
  type TrailDefinition,
  type TrailProgress,
} from "@defi-trail/shared";
import {
  createTrailProgress,
  type TrailEvidenceSignal,
} from "./model";
import {
  loadLastTrailSession,
  loadTrailProgressCache,
  saveLastTrailSession,
  saveTrailProgressCache,
} from "./storage";
import {
  recoverTrailProgressFromStorage,
  reconcileTrailProgressWithEvidence,
  mapUIStateToLifecycle,
} from "./evidence-adapter";
import { getPendingRequest } from "@/components/cross-chain/icm-storage";
import {
  createConfirmedTrailEvidence,
  recordPassportEvidence,
} from "@/features/gameplay/passport";
import { getGameplayTracker } from "@/features/analytics";
import {
  TodayTrailCard,
  type TodayTrailCardState,
} from "./TodayTrailCard";

interface TodayTrailApiResponse {
  state: "ACTIVE" | "EMPTY";
  data: { trail: unknown } | null;
}

export interface TodayTrailSectionProps {
  player?: string;
  evidence: TrailEvidenceSignal;
  onFocusChest: (chestId: string, checkpointPosition: number) => void;
  onResumeEvidence: () => void;
}

export function TodayTrailSection({
  player,
  evidence,
  onFocusChest,
  onResumeEvidence,
}: TodayTrailSectionProps) {
  const playerId = useMemo(
    () =>
      player?.toLowerCase() ??
      "0x000000000000000000000000000000000000dead",
    [player],
  );
  const [trail, setTrail] = useState<TrailDefinition | null>(null);
  const [progress, setProgress] = useState<TrailProgress | null>(null);
  const [viewState, setViewState] = useState<
    Exclude<TodayTrailCardState, { kind: "ready" }>
  >({ kind: "loading" });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    setViewState({ kind: "loading" });

    async function loadTrail() {
      try {
        const response = await fetch("/api/gameplay/trails/today", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error("The trail service returned an error.");
        }
        const body = (await response.json()) as TodayTrailApiResponse;
        if (!mounted) return;

        if (body.state === "EMPTY" || !body.data) {
          const lastSession = loadLastTrailSession(playerId);
          setTrail(null);
          setProgress(null);
          setViewState(
            lastSession && Date.parse(lastSession.endsAt) <= Date.now()
              ? { kind: "ended", title: lastSession.title }
              : { kind: "empty" },
          );
          return;
        }

        const parsedTrail = trailDefinitionSchema.safeParse(body.data.trail);
        if (!parsedTrail.success) {
          throw new Error("The trail configuration is invalid.");
        }
        if (Date.parse(parsedTrail.data.endsAt) <= Date.now()) {
          setTrail(null);
          setProgress(null);
          setViewState({ kind: "ended", title: parsedTrail.data.title });
          return;
        }

        const cachedProgress = loadTrailProgressCache(
          parsedTrail.data,
          playerId,
        );
        const storedRequest = getPendingRequest();
        const recovered = recoverTrailProgressFromStorage({
          trail: parsedTrail.data,
          player: playerId,
          cachedProgress,
          storedRequest,
        });

        saveLastTrailSession({
          trailId: parsedTrail.data.id,
          title: parsedTrail.data.title,
          endsAt: parsedTrail.data.endsAt,
          player: playerId,
          cachedAt: new Date().toISOString(),
        });
        setTrail(parsedTrail.data);
        setProgress(recovered.progress);
        setViewState({ kind: "empty" });

        getGameplayTracker().trackSeasonViewed(
          { seasonId: parsedTrail.data.seasonId, source: "today_trail_section" },
          playerId,
        );
      } catch (error) {
        if (!mounted || controller.signal.aborted) return;
        setTrail(null);
        setProgress(null);
        setViewState({
          kind: "error",
          message:
            error instanceof Error
              ? error.message
              : "Please check your connection and try again.",
        });
      }
    }

    void loadTrail();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [playerId, reloadToken]);

  useEffect(() => {
    if (!trail || !evidence.requestId || evidence.state !== "submitted") return;
    const slot = evidence.chestSlot ?? 0;
    const checkpoint = trail.checkpoints[slot];
    if (checkpoint) {
      getGameplayTracker().trackCheckpointSubmitted(
        {
          seasonId: trail.seasonId,
          trailId: trail.id,
          checkpointId: checkpoint.id,
          position: slot,
          requestId: evidence.requestId,
          mode: "DEMO",
        },
        playerId,
      );
    }
  }, [evidence.chestSlot, evidence.requestId, evidence.state, playerId, trail]);

  useEffect(() => {
    if (!trail || !progress || evidence.state !== "confirmed" || !evidence.requestId) return;
    const status = mapUIStateToLifecycle(evidence.state);
    const result = reconcileTrailProgressWithEvidence({
      trail,
      player: playerId,
      baseProgress: progress,
      evidenceItems: [
        {
          requestId: evidence.requestId,
          chestSlot: evidence.chestSlot,
          status,
          mode: "DEMO",
        },
      ],
    });
    if (result.appliedCount > 0) {
      const newlyConfirmed = result.progress.completedCheckpoints.slice(
        progress.completedCheckpoints.length,
      );
      for (const completion of newlyConfirmed) {
        const checkpointIndex = trail.checkpoints.findIndex(
          (c) => c.id === completion.checkpointId,
        );
        getGameplayTracker().trackCheckpointConfirmed(
          {
            seasonId: trail.seasonId,
            trailId: trail.id,
            checkpointId: completion.checkpointId,
            position: Math.max(0, checkpointIndex),
            requestId: completion.requestId ?? evidence.requestId!,
            mode: "DEMO",
          },
          playerId,
        );

        // GE-09: Post confirmed checkpoint evidence to leaderboard reducer
        fetch("/api/gameplay/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: {
              eventId: `evt_${completion.checkpointId}_${completion.requestId ?? Date.now()}`,
              eventType: "CHEST_CONFIRMED",
              player: playerId,
              seasonId: trail.seasonId,
              trailId: trail.id,
              checkpointId: completion.checkpointId,
              requestId: completion.requestId ?? evidence.requestId,
              occurredAt: completion.completedAt,
              mode: "DEMO",
            },
          }),
        }).catch((err) =>
          console.warn("[Leaderboard] score event submission skipped:", err),
        );
      }

      if (result.isComplete && !progress.completedAt) {
        getGameplayTracker().trackTrailCompleted(
          {
            seasonId: trail.seasonId,
            trailId: trail.id,
            completedCheckpoints: result.progress.completedCheckpoints.length,
            mode: "DEMO",
          },
          playerId,
        );

        // GE-09: Post trail completion evidence to leaderboard reducer
        fetch("/api/gameplay/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: {
              eventId: `evt_trail_${trail.id}_${evidence.requestId ?? Date.now()}`,
              eventType: "TRAIL_COMPLETED",
              player: playerId,
              seasonId: trail.seasonId,
              trailId: trail.id,
              requestId: evidence.requestId,
              occurredAt: new Date().toISOString(),
              mode: "DEMO",
            },
          }),
        }).catch((err) =>
          console.warn("[Leaderboard] trail complete event submission skipped:", err),
        );
      }

      const passportEvidence = createConfirmedTrailEvidence({
        trail,
        previousProgress: progress,
        nextProgress: result.progress,
        ...(evidence.chestType ? { chestType: evidence.chestType } : {}),
      });
      recordPassportEvidence({
        records: passportEvidence,
        player: playerId,
        seasonId: trail.seasonId,
      });
      saveTrailProgressCache(result.progress);
      setProgress(result.progress);
    }
  }, [evidence, playerId, progress, trail]);

  const handleStart = useCallback(() => {
    if (!trail) return;
    getGameplayTracker().trackTrailStarted(
      {
        seasonId: trail.seasonId,
        trailId: trail.id,
        checkpointCount: trail.checkpoints.length,
        mode: "DEMO",
      },
      playerId,
    );
    const nextProgress = createTrailProgress(
      trail.id,
      playerId,
      new Date().toISOString(),
    );
    saveTrailProgressCache(nextProgress);
    setProgress(nextProgress);
  }, [playerId, trail]);

  const handleFocusChest = useCallback(
    (chestId: string, checkpointPosition: number) => {
      if (trail) {
        getGameplayTracker().trackCheckpointViewed(
          {
            seasonId: trail.seasonId,
            trailId: trail.id,
            checkpointId: chestId,
            position: checkpointPosition,
            mode: "DEMO",
          },
          playerId,
        );
      }
      onFocusChest(chestId, checkpointPosition);
    },
    [onFocusChest, playerId, trail],
  );

  const cardState: TodayTrailCardState = trail
    ? { kind: "ready", trail, progress, evidence }
    : viewState;

  return (
    <TodayTrailCard
      state={cardState}
      onStart={handleStart}
      onFocusChest={handleFocusChest}
      onResumeEvidence={onResumeEvidence}
      onRetry={() => setReloadToken((value) => value + 1)}
    />
  );
}
