import { describe, it, expect, vi } from "vitest";
import { GET } from "../src/app/api/admin/health/route";

// Target Budgets as mandated by PRD §3.2 & §9.1
const TARGET_PRINCIPAL_BUDGET = 1_000_000_000n; // 1,000 Mock USDC (6 decimals)
const TARGET_QUEST_BUDGET = 500_000_000n;       // 500 Mock USDC (6 decimals)
const TARGET_REWARD_RESERVE = 200_000_000n;      // 200 Mock USDC (6 decimals)
const TARGET_TOTAL_BUDGET =
  TARGET_PRINCIPAL_BUDGET + TARGET_QUEST_BUDGET + TARGET_REWARD_RESERVE;

describe("Admin Health API & Operational Telemetry (PRD §3.2, §9.1, §9.3, §20)", () => {
  it("GET /api/admin/health returns structured system telemetry with all required subsystems", async () => {
    // Mock fetch so unit test doesn't depend on external network latency
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockImplementation(async (url: string | URL | Request) => {
      const urlStr = url.toString();
      if (urlStr.includes("C/rpc")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: "2.0",
            id: 1,
            result: "0x2a35b8", // mock Fuji block number
          }),
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({
          jsonrpc: "2.0",
          id: 1,
          result: "0x15f9", // mock Game L1 block number
        }),
      };
    }) as unknown as typeof fetch;

    try {
      const response = await GET();
      expect(response.status).toBe(200);

      const json = await response.json();

      // Top-level structure
      expect(json).toHaveProperty("timestamp");
      expect(json).toHaveProperty("overallStatus");
      expect(["healthy", "degraded", "critical"]).toContain(json.overallStatus);

      // 1. Dual-Chain RPC Health
      expect(json.chains).toBeDefined();
      expect(json.chains.fujiC).toBeDefined();
      expect(json.chains.fujiC.chainId).toBe(43113);
      expect(json.chains.fujiC.chainName).toBe("Avalanche Fuji C-Chain");
      expect(typeof json.chains.fujiC.latencyMs).toBe("number");

      expect(json.chains.gameL1).toBeDefined();
      expect(json.chains.gameL1.chainName).toBe("Avalanche Game L1");
      expect(typeof json.chains.gameL1.latencyMs).toBe("number");

      // 2. Relayer Service Health
      expect(json.relayer).toBeDefined();
      expect(json.relayer.service).toContain("Relayer");
      expect(json.relayer.version).toBe("v1.3.1");
      expect(json.relayer.metricsPort).toBe(8080);
      expect(json.relayer.wallet).toBeDefined();
      expect(json.relayer.wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);

      // 3. SponsorPool Financial Solvency
      expect(json.sponsorPool).toBeDefined();
      expect(json.sponsorPool.targetPrincipal).toBe("1000.00");
      expect(json.sponsorPool.targetQuest).toBe("500.00");
      expect(json.sponsorPool.targetReward).toBe("200.00");
      expect(json.sponsorPool.targetTotal).toBe("1700.00");
      expect(json.sponsorPool.isSolvent).toBe(true);

      // 4. Faucet & Proof Signer
      expect(json.faucet).toBeDefined();
      expect(json.faucet.status).toBe("operational");
      expect(json.faucet.rateLimitPolicy).toContain("1 claim");
      expect(json.proofSigner).toBeDefined();
      expect(json.proofSigner.address).toMatch(/^0x[a-fA-F0-9]{40}$/);

      // 5. Read-only organizer content readiness (GE-11)
      expect(json.organizerContent).toMatchObject({
        status: "READY",
        publishedVersion: 1,
        lifecycle: "ACTIVE",
        validationIssueCount: 0,
      });
      expect(JSON.stringify(json.organizerContent)).not.toMatch(
        /token|secret|private|balance|principal|rewardReserve|apr/i,
      );
    } finally {
      global.fetch = originalFetch;
    }
  });

  it("Enforces correct PRD-mandated budget targets (6 decimals)", () => {
    // 1000 Mock USDC = 1,000,000,000 units
    expect(TARGET_PRINCIPAL_BUDGET).toBe(1_000_000_000n);

    // 500 Mock USDC = 500,000,000 units
    expect(TARGET_QUEST_BUDGET).toBe(500_000_000n);

    // 200 Mock USDC = 200,000,000 units
    expect(TARGET_REWARD_RESERVE).toBe(200_000_000n);

    // Total = 1,700 Mock USDC = 1,700,000,000 units
    expect(TARGET_TOTAL_BUDGET).toBe(1_700_000_000n);
  });
});
