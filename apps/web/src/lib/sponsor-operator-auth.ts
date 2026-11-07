import crypto from "node:crypto";

export interface AuthenticatedSponsorOperator {
  operatorId: string;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function authenticateSponsorOperator(
  authorizationHeader: string | null,
): AuthenticatedSponsorOperator | null {
  const configuredToken = process.env.SPONSOR_OPERATOR_TOKEN?.trim();
  if (!configuredToken || !authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }
  const presentedToken = authorizationHeader.slice("Bearer ".length).trim();
  if (!presentedToken || !safeEqual(presentedToken, configuredToken)) {
    return null;
  }
  return {
    operatorId: process.env.SPONSOR_OPERATOR_ID?.trim() || "sponsor-counter",
  };
}
