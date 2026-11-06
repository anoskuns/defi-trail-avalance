import crypto from "node:crypto";
import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import {
  EIP712_DOMAIN_NAME,
  EIP712_DOMAIN_VERSION,
  LOCATION_PROOF_TYPES,
  SPONSOR_PROOF_TYPES,
  type LocationProofMessage,
  type SponsorProofMessage,
  type EIP712Domain,
} from "@defi-trail/shared";
import {
  getProofSignerPrivateKey,
  getGameL1ChainId,
  getChestManagerAddress,
} from "./server-env";
import { computeCampaignIdHash } from "./campus";
import { parseSafeJSON } from "./json";

const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "defi-trail-backend",
});

/**
 * Creates an account instance for the backend proof signer.
 */
export function getProofSignerAccount() {
  const privateKey = getProofSignerPrivateKey();
  return privateKeyToAccount({
    client: thirdwebClient,
    privateKey,
  });
}

/**
 * Returns the canonical EIP-712 domain for the Game L1 ChestManager contract.
 */
export function getCanonicalDomain(override?: EIP712Domain) {
  return {
    name: override?.name ?? EIP712_DOMAIN_NAME,
    version: override?.version ?? EIP712_DOMAIN_VERSION,
    chainId: override?.chainId !== undefined ? Number(override.chainId) : getGameL1ChainId(),
    verifyingContract:
      override?.verifyingContract !== undefined
        ? (override.verifyingContract as `0x${string}`)
        : getChestManagerAddress(),
  };
}

/**
 * Generates a cryptographically random 32-byte hex nonce.
 */
export function generateNonce(): `0x${string}` {
  return `0x${crypto.randomBytes(32).toString("hex")}`;
}

/**
 * Signs an EIP-712 LocationProof message using the proof signer private key.
 */
export async function signLocationProof(
  message: {
    player: `0x${string}`;
    chestId: `0x${string}`;
    epoch: number | bigint;
    radiusMeters: number;
    nonce: `0x${string}`;
    expiresAt: number | bigint;
    mode: number;
  },
  domainOverride?: EIP712Domain
): Promise<`0x${string}`> {
  const account = getProofSignerAccount();
  const domain = getCanonicalDomain(domainOverride);

  const formattedMessage = {
    player: message.player,
    chestId: message.chestId,
    epoch: BigInt(message.epoch),
    radiusMeters: Number(message.radiusMeters),
    nonce: message.nonce,
    expiresAt: BigInt(message.expiresAt),
    mode: Number(message.mode),
  };

  const signature = await account.signTypedData({
    domain,
    types: LOCATION_PROOF_TYPES,
    primaryType: "LocationProof",
    message: formattedMessage,
  });

  return signature as `0x${string}`;
}

/**
 * Signs an EIP-712 SponsorProof message using the proof signer private key.
 */
export async function signSponsorProof(
  message: {
    player: `0x${string}`;
    chestId: `0x${string}`;
    campaignId: `0x${string}`;
    epoch: number | bigint;
    nonce: `0x${string}`;
    expiresAt: number | bigint;
  },
  domainOverride?: EIP712Domain
): Promise<`0x${string}`> {
  const account = getProofSignerAccount();
  const domain = getCanonicalDomain(domainOverride);

  const formattedMessage = {
    player: message.player,
    chestId: message.chestId,
    campaignId: message.campaignId,
    epoch: BigInt(message.epoch),
    nonce: message.nonce,
    expiresAt: BigInt(message.expiresAt),
  };

  const signature = await account.signTypedData({
    domain,
    types: SPONSOR_PROOF_TYPES,
    primaryType: "SponsorProof",
    message: formattedMessage,
  });

  return signature as `0x${string}`;
}

/**
 * Creates a signed QR payload for sponsor campaign distribution.
 */
export function createSignedSponsorQrPayload(payload: {
  campaignId: string;
  chestId: string;
  expiresAt: number;
}): string {
  const secret = getProofSignerPrivateKey();
  const dataToSign = `${payload.campaignId}:${payload.chestId.toLowerCase()}:${payload.expiresAt}`;
  const hmac = crypto.createHmac("sha256", secret).update(dataToSign).digest("hex");

  return JSON.stringify({
    campaignId: payload.campaignId,
    chestId: payload.chestId,
    expiresAt: payload.expiresAt,
    sig: hmac,
  });
}

export interface SponsorQrVerificationResult {
  valid: boolean;
  campaignId?: string;
  campaignIdHash?: `0x${string}`;
  chestId?: string;
  expiresAt?: number;
  error?: string;
}

/**
 * Verifies a sponsor QR payload: checks expiry, campaign, chestId, and authenticity.
 */
export function verifySponsorQrPayload(
  rawQrPayload: string | unknown,
  expectedChestId?: string
): SponsorQrVerificationResult {
  if (!rawQrPayload) {
    return { valid: false, error: "Missing QR payload" };
  }

  type QrPayload = {
    campaignId?: string;
    chestId?: string;
    expiresAt?: number;
    sig?: string;
  };

  let parsed: QrPayload | null = null;

  if (typeof rawQrPayload === "string") {
    parsed = parseSafeJSON<QrPayload>(rawQrPayload);
    if (!parsed) {
      return { valid: false, error: "Failed to parse QR payload JSON" };
    }
  } else if (typeof rawQrPayload === "object" && rawQrPayload !== null) {
    parsed = rawQrPayload as unknown as QrPayload;
  } else {
    return { valid: false, error: "Invalid QR payload format" };
  }

  if (!parsed) {
    return { valid: false, error: "Invalid QR payload data" };
  }

  const { campaignId, chestId, expiresAt, sig } = parsed;

  if (!campaignId || typeof campaignId !== "string") {
    return { valid: false, error: "Missing or invalid campaignId in QR" };
  }

  const nowSec = Math.floor(Date.now() / 1000);

  // Check expiry if provided
  if (expiresAt !== undefined) {
    if (typeof expiresAt !== "number" || expiresAt < nowSec) {
      return { valid: false, error: "QR code has expired" };
    }
  }

  // Check chestId matching if provided
  if (chestId && expectedChestId) {
    if (chestId.toLowerCase() !== expectedChestId.toLowerCase()) {
      return { valid: false, error: "QR chestId does not match requested chest" };
    }
  }

  // If HMAC signature is present, verify it
  if (sig && expiresAt !== undefined && chestId) {
    const secret = getProofSignerPrivateKey();
    const dataToSign = `${campaignId}:${chestId.toLowerCase()}:${expiresAt}`;
    const expectedHmac = crypto.createHmac("sha256", secret).update(dataToSign).digest("hex");
    if (sig !== expectedHmac) {
      return { valid: false, error: "Invalid QR signature" };
    }
  }

  const campaignIdHash = computeCampaignIdHash(campaignId);

  return {
    valid: true,
    campaignId,
    campaignIdHash,
    chestId,
    expiresAt,
  };
}

