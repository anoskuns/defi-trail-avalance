import { defineChain, type Chain } from "thirdweb";

export const FUJI_CHAIN_ID = 43113;
export const DEFAULT_GAME_L1_CHAIN_ID = 99999;

export const DEFAULT_FUJI_RPC =
  process.env.NEXT_PUBLIC_FUJI_RPC_URL?.trim() ||
  "https://api.avax-test.network/ext/bc/C/rpc";

export const DEFAULT_GAME_L1_RPC =
  process.env.NEXT_PUBLIC_GAME_L1_RPC_URL?.trim() ||
  "https://subnets.avax.network/defi-trail/testnet/rpc";

export const DEFAULT_GAME_L1_NAME =
  process.env.NEXT_PUBLIC_GAME_L1_CHAIN_NAME?.trim() || "Avalanche Game L1";

/**
 * Avalanche Fuji C-Chain definition (Chain ID 43113)
 */
export const fujiChain = defineChain({
  id: FUJI_CHAIN_ID,
  name: "Avalanche Fuji C-Chain",
  rpc: DEFAULT_FUJI_RPC,
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "SnowTrace Testnet",
      url: "https://testnet.snowtrace.io",
    },
  ],
  testnet: true,
});

/**
 * Avalanche Game L1 definition (Custom Chain ID, RPC from env)
 */
export const gameL1ChainId =
  Number(process.env.NEXT_PUBLIC_GAME_L1_CHAIN_ID) || DEFAULT_GAME_L1_CHAIN_ID;

export const gameL1Chain = defineChain({
  id: gameL1ChainId,
  name: DEFAULT_GAME_L1_NAME,
  rpc: DEFAULT_GAME_L1_RPC,
  nativeCurrency: {
    name: "Game Gas",
    symbol: "GAS",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Game L1 Explorer",
      url:
        process.env.NEXT_PUBLIC_GAME_L1_EXPLORER_URL?.trim() ||
        "https://subnets-test.avax.network/defi-trail",
    },
  ],
  testnet: true,
});

/**
 * All supported chains in DeFi Trail
 */
export const SUPPORTED_CHAINS: readonly [Chain, Chain] = [
  gameL1Chain,
  fujiChain,
] as const;

/**
 * Default chain when opening the app (Game L1 for gameplay actions)
 */
export const DEFAULT_CHAIN = gameL1Chain;

/**
 * Check whether a chain ID is supported
 */
export function isSupportedChain(chainId: number | undefined | null): boolean {
  if (chainId === undefined || chainId === null) return false;
  return chainId === fujiChain.id || chainId === gameL1Chain.id;
}

/**
 * Get chain configuration by chain ID
 */
export function getChainById(chainId: number | undefined | null): Chain | undefined {
  if (chainId === fujiChain.id) return fujiChain;
  if (chainId === gameL1Chain.id) return gameL1Chain;
  return undefined;
}

/**
 * Get the other supported chain (for 1-click Quick Switch)
 */
export function getAlternativeChain(currentChainId: number | undefined | null): Chain {
  if (currentChainId === fujiChain.id) {
    return gameL1Chain;
  }
  return fujiChain;
}

/**
 * Format an address to shortened format (e.g. 0x12...34)
 */
export function formatShortAddress(
  address: string | undefined | null,
  options?: { prefixLength?: number; suffixLength?: number }
): string {
  if (!address) return "";
  const trimmed = address.trim();
  const prefixLength = options?.prefixLength ?? 6;
  const suffixLength = options?.suffixLength ?? 4;

  if (trimmed.length <= prefixLength + suffixLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, prefixLength)}...${trimmed.slice(-suffixLength)}`;
}

/**
 * Generate explorer URL for an address
 */
export function getExplorerAddressUrl(
  chainId: number | undefined | null,
  address: string
): string {
  const chain = getChainById(chainId);
  const baseUrl = chain?.blockExplorers?.[0]?.url;
  if (!baseUrl) return "#";
  return `${baseUrl.replace(/\/$/, "")}/address/${address}`;
}

/**
 * Generate explorer URL for a transaction hash
 */
export function getExplorerTxUrl(
  chainId: number | undefined | null,
  txHash: string
): string {
  const chain = getChainById(chainId);
  const baseUrl = chain?.blockExplorers?.[0]?.url;
  if (!baseUrl) return "#";
  return `${baseUrl.replace(/\/$/, "")}/tx/${txHash}`;
}

