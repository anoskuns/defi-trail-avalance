import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import solc from "solc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findImports(importPath) {
  if (importPath.startsWith("@openzeppelin/")) {
    const fullPath = path.resolve(__dirname, "..", "node_modules", importPath);
    if (fs.existsSync(fullPath)) {
      return { contents: fs.readFileSync(fullPath, "utf8") };
    }
  }
  if (importPath.startsWith("./") || importPath.startsWith("../")) {
    const fullPath = path.resolve(__dirname, "..", "src", importPath);
    if (fs.existsSync(fullPath)) {
      return { contents: fs.readFileSync(fullPath, "utf8") };
    }
  }
  return { error: `File not found: ${importPath}` };
}

test("Solidity Contracts Compilation & Invariants Verification", async (t) => {
  await t.test("Compiles MockUSDC, SponsorPool, and YieldVault with solc", () => {
    const srcDir = path.resolve(__dirname, "..", "src");
    const files = ["MockUSDC.sol", "SponsorPool.sol", "YieldVault.sol", "Main.sol"];

    const sources = {};
    for (const file of files) {
      const filePath = path.join(srcDir, file);
      assert.ok(fs.existsSync(filePath), `Source file ${file} must exist`);
      sources[file] = { content: fs.readFileSync(filePath, "utf8") };
    }

    const input = {
      language: "Solidity",
      sources,
      settings: {
        viaIR: true,
        optimizer: {
          enabled: true,
          runs: 200,
        },
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode"],
          },
        },
      },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    const errors = (output.errors || []).filter((e) => e.severity === "error");
    assert.equal(errors.length, 0, `Compilation errors: ${errors.map((e) => e.formattedMessage).join("\n")}`);

    const cchainContracts = output.contracts;
    assert.ok(cchainContracts["MockUSDC.sol"]["MockUSDC"].evm.bytecode.object.length > 0);
    assert.ok(cchainContracts["SponsorPool.sol"]["SponsorPool"].evm.bytecode.object.length > 0);
    assert.ok(cchainContracts["YieldVault.sol"]["YieldVault"].evm.bytecode.object.length > 0);
  });

  await t.test("Validates contract ABI structures against PRD specifications", () => {
    const srcDir = path.resolve(__dirname, "..", "src");
    const sources = {
      "MockUSDC.sol": { content: fs.readFileSync(path.join(srcDir, "MockUSDC.sol"), "utf8") },
      "SponsorPool.sol": { content: fs.readFileSync(path.join(srcDir, "SponsorPool.sol"), "utf8") },
      "YieldVault.sol": { content: fs.readFileSync(path.join(srcDir, "YieldVault.sol"), "utf8") },
    };

    const input = {
      language: "Solidity",
      sources,
      settings: {
        outputSelection: {
          "*": { "*": ["abi"] },
        },
      },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    const mockUsdcAbi = output.contracts["MockUSDC.sol"]["MockUSDC"].abi;
    const sponsorPoolAbi = output.contracts["SponsorPool.sol"]["SponsorPool"].abi;
    const yieldVaultAbi = output.contracts["YieldVault.sol"]["YieldVault"].abi;

    // Verify MockUSDC functions
    const usdcMethods = mockUsdcAbi.map((item) => item.name).filter(Boolean);
    assert.ok(usdcMethods.includes("decimals"), "MockUSDC must expose decimals()");
    assert.ok(usdcMethods.includes("mint"), "MockUSDC must expose mint()");

    // Verify SponsorPool functions
    const poolMethods = sponsorPoolAbi.map((item) => item.name).filter(Boolean);
    assert.ok(poolMethods.includes("fundPrincipal"), "SponsorPool must expose fundPrincipal");
    assert.ok(poolMethods.includes("fundQuest"), "SponsorPool must expose fundQuest");
    assert.ok(poolMethods.includes("fundRewards"), "SponsorPool must expose fundRewards");
    assert.ok(poolMethods.includes("allocatePrincipal"), "SponsorPool must expose allocatePrincipal");
    assert.ok(poolMethods.includes("allocateQuest"), "SponsorPool must expose allocateQuest");
    assert.ok(poolMethods.includes("payoutReward"), "SponsorPool must expose payoutReward");
    assert.ok(poolMethods.includes("verifyInvariants"), "SponsorPool must expose verifyInvariants");

    // Verify YieldVault functions
    const vaultMethods = yieldVaultAbi.map((item) => item.name).filter(Boolean);
    assert.ok(vaultMethods.includes("depositSponsored"), "YieldVault must expose depositSponsored");
    assert.ok(vaultMethods.includes("depositForQuest"), "YieldVault must expose depositForQuest");
    assert.ok(vaultMethods.includes("accrueReward"), "YieldVault must expose accrueReward");
    assert.ok(vaultMethods.includes("withdraw"), "YieldVault must expose withdraw");
    assert.ok(vaultMethods.includes("getPosition"), "YieldVault must expose getPosition");
    assert.ok(vaultMethods.includes("getPositionSnapshot"), "YieldVault must expose getPositionSnapshot");
    assert.ok(vaultMethods.includes("calculateStreak"), "YieldVault must expose calculateStreak");
  });

  await t.test("Foundry test file exists with invariant tests", () => {
    const testFilePath = path.resolve(__dirname, "Accounting.t.sol");
    assert.ok(fs.existsSync(testFilePath), "Accounting.t.sol must exist");

    const content = fs.readFileSync(testFilePath, "utf8");
    assert.ok(content.includes("test_InitialInvariantsAndFunding"), "Contains initial invariant tests");
    assert.ok(content.includes("test_Invariant_CannotAllocateMoreThanPrincipalBudget"), "Contains principal budget invariant test");
    assert.ok(content.includes("test_Invariant_CannotAllocateMoreThanQuestBudget"), "Contains quest budget invariant test");
    assert.ok(content.includes("test_Invariant_CannotPayoutMoreThanRewardReserve"), "Contains reward reserve invariant test");
    assert.ok(content.includes("test_Withdrawal_OnlyOwnerCanWithdraw"), "Contains owner-only withdrawal test");
    assert.ok(content.includes("test_Withdrawal_PartialWithdrawal"), "Contains partial withdrawal test");
    assert.ok(content.includes("test_Withdrawal_FullWithdrawalResetsQualifyingSinceAndApr"), "Contains full withdrawal test");
    assert.ok(content.includes("test_SponsorChestDeposit_WeightedAprAggregation"), "Contains weighted APR test");
    assert.ok(content.includes("test_StreakCalculationAndResetBelowThreshold"), "Contains streak calculation and reset test");
  });
});

