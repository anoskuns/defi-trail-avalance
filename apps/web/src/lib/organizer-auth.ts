import crypto from "node:crypto";

export interface OrganizerIdentity {
  actorId: string;
  role: "organizer" | "admin";
}

export interface OrganizerAuthenticationResult {
  identity: OrganizerIdentity | null;
  code?: "UNAUTHORIZED_ORGANIZER" | "FORBIDDEN_ROLE";
  status?: 401 | 403;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function authenticateOrganizer(
  authorizationHeader: string | null,
): OrganizerAuthenticationResult {
  const configuredToken = process.env.ORGANIZER_ACCESS_TOKEN?.trim();
  if (!configuredToken || !authorizationHeader?.startsWith("Bearer ")) {
    return { identity: null, code: "UNAUTHORIZED_ORGANIZER", status: 401 };
  }

  const presentedToken = authorizationHeader.slice("Bearer ".length).trim();
  if (!presentedToken || !safeEqual(presentedToken, configuredToken)) {
    return { identity: null, code: "UNAUTHORIZED_ORGANIZER", status: 401 };
  }

  const configuredRole = process.env.ORGANIZER_ROLE?.trim().toLowerCase();
  if (configuredRole !== "organizer" && configuredRole !== "admin") {
    return { identity: null, code: "FORBIDDEN_ROLE", status: 403 };
  }

  return {
    identity: {
      actorId: process.env.ORGANIZER_ACTOR_ID?.trim() || "organizer-console",
      role: configuredRole,
    },
  };
}
