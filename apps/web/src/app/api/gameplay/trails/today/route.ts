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
    const result = repository.getTodayTrail(new Date());
    if (!result) {
      return gameplayResponse({
        apiVersion: GAMEPLAY_API_VERSION,
        state: "EMPTY" as const,
        data: null,
        meta: {
          configVersion: repository.configVersion,
          reason: "NO_ACTIVE_TRAIL" as const,
        },
      });
    }

    return gameplayResponse({
      apiVersion: GAMEPLAY_API_VERSION,
      state: "ACTIVE" as const,
      data: {
        seasonId: result.season.id,
        trail: result.trail,
      },
      meta: { configVersion: repository.configVersion },
    });
  } catch {
    return gameplayErrorResponse();
  }
}

