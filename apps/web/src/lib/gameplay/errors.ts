import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api-response";

export const GAMEPLAY_API_VERSION = "v1" as const;
export const GAMEPLAY_CACHE_CONTROL =
  "public, s-maxage=60, stale-while-revalidate=300";

export class GameplayConfigError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "GameplayConfigError";
  }
}

export function gameplayResponse<T>(body: T, status: number = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": GAMEPLAY_CACHE_CONTROL,
      "X-Gameplay-API-Version": GAMEPLAY_API_VERSION,
    },
  });
}

/** Never expose raw configuration errors or environment values to clients. */
export function gameplayErrorResponse() {
  const response = errorResponse(
    "GAMEPLAY_CONFIG_UNAVAILABLE",
    "Gameplay configuration is temporarily unavailable",
    500,
    { retryable: true },
  );
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Gameplay-API-Version", GAMEPLAY_API_VERSION);
  return response;
}

