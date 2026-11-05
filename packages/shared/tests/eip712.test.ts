import { describe, expect, it } from "vitest";
import {
  EIP712_DOMAIN_NAME,
  EIP712_DOMAIN_VERSION,
  LOCATION_PROOF_TYPES,
  SPONSOR_PROOF_TYPES,
  buildEip712Domain,
  createLocationProofTypedData,
  createSponsorProofTypedData,
} from "../src/eip712/schemas";
import { ChestType, Rarity, RequestStatus } from "../src/types/domain";

describe("domain enums and eip712 schemas", () => {
  it("matches Solidity enum values", () => {
    expect(ChestType.YIELD).toBe(0);
    expect(ChestType.QUEST).toBe(1);
    expect(ChestType.SPONSOR).toBe(2);

    expect(Rarity.COMMON).toBe(0);
    expect(Rarity.RARE).toBe(1);
    expect(Rarity.EPIC).toBe(2);
    expect(Rarity.LEGENDARY).toBe(3);

    expect(RequestStatus.NONE).toBe(0);
    expect(RequestStatus.CREATED).toBe(1);
    expect(RequestStatus.SENT).toBe(2);
    expect(RequestStatus.REMOTE_EXECUTED).toBe(3);
    expect(RequestStatus.ACK_PENDING).toBe(4);
    expect(RequestStatus.CONFIRMED).toBe(5);
    expect(RequestStatus.RETRYABLE_FAILED).toBe(6);
    expect(RequestStatus.FAILED_FINAL).toBe(7);
  });

  it("builds canonical EIP-712 domain", () => {
    const domain = buildEip712Domain({
      chainId: 43113,
      verifyingContract: "0x1111111111111111111111111111111111111111",
    });

    expect(domain.name).toBe(EIP712_DOMAIN_NAME);
    expect(domain.version).toBe(EIP712_DOMAIN_VERSION);
    expect(domain.chainId).toBe(43113);
    expect(domain.verifyingContract).toBe(
      "0x1111111111111111111111111111111111111111",
    );
  });

  it("creates valid LocationProof typed data structure", () => {
    const typedData = createLocationProofTypedData(
      {
        chainId: 43113,
        verifyingContract: "0x1111111111111111111111111111111111111111",
      },
      {
        player: "0x2222222222222222222222222222222222222222",
        chestId: "0x1234000000000000000000000000000000000000000000000000000000000000",
        epoch: 1n,
        radiusMeters: 35,
        nonce: "0x5678000000000000000000000000000000000000000000000000000000000000",
        expiresAt: 1700000000n,
        mode: 0,
      },
    );

    expect(typedData.primaryType).toBe("LocationProof");
    expect(typedData.types).toEqual(LOCATION_PROOF_TYPES);
    expect(typedData.message.mode).toBe(0);
    expect(typedData.message.radiusMeters).toBe(35);
  });

  it("creates valid SponsorProof typed data structure", () => {
    const typedData = createSponsorProofTypedData(
      {
        chainId: 43113,
        verifyingContract: "0x1111111111111111111111111111111111111111",
      },
      {
        player: "0x2222222222222222222222222222222222222222",
        chestId: "0x1234000000000000000000000000000000000000000000000000000000000000",
        campaignId: "0x9999000000000000000000000000000000000000000000000000000000000000",
        epoch: 1n,
        nonce: "0x5678000000000000000000000000000000000000000000000000000000000000",
        expiresAt: 1700000000n,
      },
    );

    expect(typedData.primaryType).toBe("SponsorProof");
    expect(typedData.types).toEqual(SPONSOR_PROOF_TYPES);
    expect(typedData.message.campaignId).toBe(
      "0x9999000000000000000000000000000000000000000000000000000000000000",
    );
  });
});

