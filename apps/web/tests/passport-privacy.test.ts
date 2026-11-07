import { describe, expect, it } from "vitest";
import { createPassportShareSnapshot } from "../src/features/gameplay/passport";

describe("Passport share privacy snapshot", () => {
  it("hides the full wallet and any balance by default", () => {
    const wallet = "0x1234567890abcdef1234567890abcdef12345678";
    const snapshot = createPassportShareSnapshot({
      badgeCount: 2,
      nextGoal: "Trail Complete",
      walletAddress: wallet,
    });

    expect(JSON.stringify(snapshot)).not.toContain(wallet);
    expect(snapshot).not.toHaveProperty("balance");
    expect(snapshot).toMatchInlineSnapshot(`
      {
        "nextGoal": "Trail Complete",
        "privacyNote": "Wallet details and balances are hidden by default.",
        "summary": "2 of 5 badges unlocked",
        "title": "My DeFi Trail Passport",
        "wallet": null,
      }
    `);
  });

  it("only exposes a masked wallet when explicitly requested", () => {
    expect(
      createPassportShareSnapshot({
        badgeCount: 1,
        walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
        showMaskedWallet: true,
      }).wallet,
    ).toBe("0x1234…5678");
  });
});

