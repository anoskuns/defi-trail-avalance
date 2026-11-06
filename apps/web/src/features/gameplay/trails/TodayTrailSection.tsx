"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  trailDefinitionSchema,
  type TrailDefinition,
  type TrailProgress,
} from "@defi-trail/shared";
import {
  applyConfirmedEvidence,
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
        saveLastTrailSession({
          trailId: parsedTrail.data.id,
          title: parsedTrail.data.title,
          endsAt: parsedTrail.data.endsAt,
          player: playerId,
          cachedAt: new Date().toISOString(),
        });
        setTrail(parsedTrail.data);
        setProgress(cachedProgress);
        setViewState({ kind: "empty" });
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
    if (!trail || !progress || evidence.state !== "confirmed") return;
    const result = applyConfirmedEvidence({
      trail,
      progress,
      signal: evidence,
      confirmedAt: new Date().toISOString(),
      mode: "DEMO",
    });
    if (result.status !== "APPLIED" && result.status !== "COMPLETED") {
      return;
    }
    saveTrailProgressCache(result.progress);
    setProgress(result.progress);
  }, [evidence, progress, trail]);

  const handleStart = useCallback(() => {
    if (!trail) return;
    const nextProgress = createTrailProgress(
      trail.id,
      playerId,
      new Date().toISOString(),
    );
    saveTrailProgressCache(nextProgress);
    setProgress(nextProgress);
  }, [playerId, trail]);

  const cardState: TodayTrailCardState = trail
    ? { kind: "ready", trail, progress, evidence }
    : viewState;

  return (
    <TodayTrailCard
      state={cardState}
      onStart={handleStart}
      onFocusChest={onFocusChest}
      onResumeEvidence={onResumeEvidence}
      onRetry={() => setReloadToken((value) => value + 1)}
    />
  );
}
