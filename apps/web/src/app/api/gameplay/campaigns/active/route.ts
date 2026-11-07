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
    const campaigns = repository.getActiveCampaigns(new Date());
    if (campaigns.length === 0) {
      return gameplayResponse({
        apiVersion: GAMEPLAY_API_VERSION,
        state: "EMPTY" as const,
        data: null,
        meta: {
          configVersion: repository.configVersion,
          reason: "NO_ACTIVE_CAMPAIGN" as const,
        },
      });
    }
    return gameplayResponse({
      apiVersion: GAMEPLAY_API_VERSION,
      state: "ACTIVE" as const,
      data: { campaigns },
      meta: { configVersion: repository.configVersion },
    });
  } catch {
    return gameplayErrorResponse();
  }
}
