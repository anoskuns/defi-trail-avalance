import { describe, it, expect } from "vitest";
import {
  fujiChain,
  gameL1Chain,
  FUJI_CHAIN_ID,
  DEFAULT_GAME_L1_CHAIN_ID,
  SUPPORTED_CHAINS,
  isSupportedChain,
  getChainById,
  getAlternativeChain,
  formatShortAddress,
  getExplorerAddressUrl,
  getExplorerTxUrl,
} from "@/lib/chains";
import {
  thirdwebClient,
  emailEmbeddedWallet,
  avalancheCoreWallet,
  SUPPORTED_WALLETS,
  defiTrailTheme,
} from "@/lib/thirdweb";

describe("Wallet & Chain Configuration", () => {
  describe("Chain Definitions (Requirement 2)", () => {
    it("configures Avalanche Fuji C-Chain with Chain ID 43113", () => {
      expect(fujiChain.id).toBe(43113);
      expect(fujiChain.name).toBe("Avalanche Fuji C-Chain");
      expect(fujiChain.nativeCurrency?.symbol).toBe("AVAX");
      expect(fujiChain.nativeCurrency?.decimals).toBe(18);
      expect(fujiChain.blockExplorers?.[0]?.url).toBe("https://testnet.snowtrace.io");
    });

    it("configures Avalanche Game L1 with custom Chain ID and GAS native token", () => {
      expect(gameL1Chain.id).toBe(DEFAULT_GAME_L1_CHAIN_ID);
      expect(gameL1Chain.name).toBe("Avalanche Game L1");
      expect(gameL1Chain.nativeCurrency?.symbol).toBe("GAS");
      expect(gameL1Chain.nativeCurrency?.decimals).toBe(18);
      expect(gameL1Chain.blockExplorers?.[0]?.url).toContain("subnets-test.avax.network");
    });

    it("contains exactly 2 supported chains", () => {
      expect(SUPPORTED_CHAINS).toHaveLength(2);
      expect(SUPPORTED_CHAINS.map((c) => c.id)).toContain(FUJI_CHAIN_ID);
      expect(SUPPORTED_CHAINS.map((c) => c.id)).toContain(DEFAULT_GAME_L1_CHAIN_ID);
    });

    it("correctly checks supported chain IDs", () => {
      expect(isSupportedChain(43113)).toBe(true);
      expect(isSupportedChain(99999)).toBe(true);
      expect(isSupportedChain(1)).toBe(false); // Ethereum mainnet
      expect(isSupportedChain(137)).toBe(false); // Polygon
      expect(isSupportedChain(undefined)).toBe(false);
      expect(isSupportedChain(null)).toBe(false);
    });

    it("retrieves chain by id", () => {
      expect(getChainById(43113)?.id).toBe(43113);
      expect(getChainById(99999)?.id).toBe(99999);
      expect(getChainById(12345)).toBeUndefined();
    });

    it("provides 1-click alternative chain for Quick Switch (Requirement 4)", () => {
      // When on Fuji -> alternative is Game L1
      expect(getAlternativeChain(43113).id).toBe(99999);
      // When on Game L1 -> alternative is Fuji
      expect(getAlternativeChain(99999).id).toBe(43113);
      // When on unknown chain -> defaults to Fuji
      expect(getAlternativeChain(1).id).toBe(43113);
    });
  });

  describe("Address & Explorer Formatters (Requirement 4)", () => {
    const testAddress = "0x71C84013445A255FaEE7d2D3d10ec29E85324DCA";

    it("formats address to standard shortened form 0x12...34", () => {
      const short = formatShortAddress(testAddress, { prefixLength: 4, suffixLength: 4 });
      expect(short).toBe("0x71...4DCA");
    });

    it("formats address to 6-prefix 4-suffix format by default", () => {
      const formatted = formatShortAddress(testAddress);
      expect(formatted).toBe("0x71C8...4DCA");
    });

    it("safely handles null, undefined, and short strings", () => {
      expect(formatShortAddress(null)).toBe("");
      expect(formatShortAddress(undefined)).toBe("");
      expect(formatShortAddress("")).toBe("");
      expect(formatShortAddress("0x1234")).toBe("0x1234");
    });

    it("generates correct explorer URLs for Fuji and Game L1", () => {
      const fujiUrl = getExplorerAddressUrl(43113, testAddress);
      expect(fujiUrl).toBe(`https://testnet.snowtrace.io/address/${testAddress}`);

      const l1Url = getExplorerAddressUrl(99999, testAddress);
      expect(l1Url).toContain(`/address/${testAddress}`);

      const txUrl = getExplorerTxUrl(43113, "0xabcd1234");
      expect(txUrl).toBe("https://testnet.snowtrace.io/tx/0xabcd1234");

      const unknownUrl = getExplorerAddressUrl(999, testAddress);
      expect(unknownUrl).toBe("#");
    });
  });

  describe("Thirdweb SDK v5 & Authentication Modes (Requirement 1 & FR-001/FR-002)", () => {
    it("initializes thirdweb client", () => {
      expect(thirdwebClient).toBeDefined();
      expect(thirdwebClient.clientId).toBeDefined();
    });

    it("supports 2 authentication modes: Primary Email Embedded & Fallback Core", () => {
      expect(SUPPORTED_WALLETS).toHaveLength(2);

      // Mode 1: Email Embedded Wallet (FR-001)
      expect(emailEmbeddedWallet.id).toBe("inApp");

      // Mode 2: Avalanche Core Wallet (FR-002)
      expect(avalancheCoreWallet.id).toBe("app.core.extension");
    });

    it("configures Avalanche Red accent theme", () => {
      expect(defiTrailTheme.type).toBe("dark");
      expect(defiTrailTheme.colors.primaryButtonBg).toBe("#E84142");
      expect(defiTrailTheme.colors.accentButtonBg).toBe("#E84142");
    });
  });
});
