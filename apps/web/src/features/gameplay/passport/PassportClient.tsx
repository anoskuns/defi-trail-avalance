"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { createEmptyPassportState, evaluatePassport } from "./engine";
import { loadPassportState, PASSPORT_UPDATED_EVENT } from "./storage";
import { PassportCollection } from "./PassportCollection";
import { getGameplayTracker } from "@/features/analytics";

const DEMO_PLAYER = "0x000000000000000000000000000000000000dead";
const ACTIVE_SEASON_ID = "demo-season-2026";

export function PassportClient() {
  const account = useActiveAccount();
  const player = account?.address.toLowerCase() ?? DEMO_PLAYER;
  const [state, setState] = useState(() => createEmptyPassportState(player));

  useEffect(() => {
    const refresh = () => setState(loadPassportState(player));
    refresh();
    getGameplayTracker().trackPassportViewed({ source: "passport_tab" }, player);
    window.addEventListener(PASSPORT_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PASSPORT_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [player]);

  const evaluation = useMemo(
    () => evaluatePassport({ state, seasonId: ACTIVE_SEASON_ID }),
    [state],
  );

  return (
    <PassportCollection
      evaluation={evaluation}
      walletAddress={account?.address}
      isDemoPlayer={!account}
    />
  );
}

