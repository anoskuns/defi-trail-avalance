import { getGameplayConfigRepository } from "@/lib/gameplay/repository";
import {
  GAMEPLAY_API_VERSION,
  gameplayErrorResponse,
  gameplayResponse,
} from "@/lib/gameplay/errors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const repository = getGameplayConfigRepository();
    const season = repository.getActiveSeason(new Date());
    if (!season) {
      return gameplayResponse({
        apiVersion: GAMEPLAY_API_VERSION,
        state: "EMPTY" as const,
        data: null,
        meta: {
          configVersion: repository.configVersion,
          reason: "NO_ACTIVE_SEASON" as const,
        },
      });
    }

    return gameplayResponse({
      apiVersion: GAMEPLAY_API_VERSION,
      state: "ACTIVE" as const,
      data: { season },
      meta: { configVersion: repository.configVersion },
    });
  } catch {
    return gameplayErrorResponse();
  }
}

