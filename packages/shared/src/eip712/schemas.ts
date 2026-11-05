import type { Address, Hash } from "../types/domain";

export const EIP712_DOMAIN_NAME = "DeFiTrail" as const;
export const EIP712_DOMAIN_VERSION = "1" as const;

export interface EIP712Domain {
  name?: string;
  version?: string;
  chainId?: bigint | number;
  verifyingContract?: Address | string;
  salt?: Hash | string;
}

export const LOCATION_PROOF_TYPE_NAME = "LocationProof" as const;
export const SPONSOR_PROOF_TYPE_NAME = "SponsorProof" as const;

export const LOCATION_PROOF_TYPES = {
  LocationProof: [
    { name: "player", type: "address" },
    { name: "chestId", type: "bytes32" },
    { name: "epoch", type: "uint64" },
    { name: "radiusMeters", type: "uint32" },
    { name: "nonce", type: "bytes32" },
    { name: "expiresAt", type: "uint64" },
    { name: "mode", type: "uint8" },
  ],
} as const;

export const SPONSOR_PROOF_TYPES = {
  SponsorProof: [
    { name: "player", type: "address" },
    { name: "chestId", type: "bytes32" },
    { name: "campaignId", type: "bytes32" },
    { name: "epoch", type: "uint64" },
    { name: "nonce", type: "bytes32" },
    { name: "expiresAt", type: "uint64" },
  ],
} as const;

export interface LocationProofMessage {
  player: Address | string;
  chestId: Hash | string;
  epoch: bigint | number;
  radiusMeters: number;
  nonce: Hash | string;
  expiresAt: bigint | number;
  mode: number;
}

export interface SponsorProofMessage {
  player: Address | string;
  chestId: Hash | string;
  campaignId: Hash | string;
  epoch: bigint | number;
  nonce: Hash | string;
  expiresAt: bigint | number;
}

export function buildEip712Domain(domain: EIP712Domain): EIP712Domain {
  return {
    name: domain.name ?? EIP712_DOMAIN_NAME,
    version: domain.version ?? EIP712_DOMAIN_VERSION,
    ...(domain.chainId !== undefined ? { chainId: domain.chainId } : {}),
    ...(domain.verifyingContract !== undefined
      ? { verifyingContract: domain.verifyingContract }
      : {}),
    ...(domain.salt !== undefined ? { salt: domain.salt } : {}),
  };
}

export function createLocationProofTypedData(
  domain: EIP712Domain,
  message: LocationProofMessage,
) {
  return {
    domain: buildEip712Domain(domain),
    types: LOCATION_PROOF_TYPES,
    primaryType: LOCATION_PROOF_TYPE_NAME,
    message,
  };
}

export function createSponsorProofTypedData(
  domain: EIP712Domain,
  message: SponsorProofMessage,
) {
  return {
    domain: buildEip712Domain(domain),
    types: SPONSOR_PROOF_TYPES,
    primaryType: SPONSOR_PROOF_TYPE_NAME,
    message,
  };
}

