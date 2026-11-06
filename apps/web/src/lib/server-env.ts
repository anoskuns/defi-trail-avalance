/**
 * Server-only environment configuration.
 * Never import this file into client components or client bundles.
 */

// Fallback deterministic private key for local development and testing
// Matches signerPrivKey = 0xA11CE in packages/contracts-l1/test/GameLogic.t.sol
const DEFAULT_DEV_SIGNER_KEY =
  "0x00000000000000000000000000000000000000000000000000000000000a11ce" as const;

export function getProofSignerPrivateKey(): `0x${string}` {
  const envKey = process.env.PROOF_SIGNER_PRIVATE_KEY?.trim();
  if (envKey && envKey.startsWith("0x") && envKey.length === 66) {
    return envKey as `0x${string}`;
  }
  return DEFAULT_DEV_SIGNER_KEY;
}

export function getGameL1ChainId(): number {
  return Number(process.env.NEXT_PUBLIC_GAME_L1_CHAIN_ID) || 99999;
}

export function getFujiCChainId(): number {
  return Number(process.env.NEXT_PUBLIC_FUJI_C_CHAIN_ID) || 43113;
}

export function getChestManagerAddress(): `0x${string}` {
  const addr = process.env.NEXT_PUBLIC_GAME_L1_CHEST_MANAGER_ADDRESS?.trim();
  if (addr && addr.startsWith("0x") && addr.length === 42) {
    return addr as `0x${string}`;
  }
  // Default fallback address for test fixtures / local simulation
  return "0x1111111111111111111111111111111111111111";
}

