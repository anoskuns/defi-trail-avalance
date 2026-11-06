/**
 * DeFi Trail - Idempotent Testnet Initialization & Seeding Script
 *
 * Implements PRD §3.2, §9.1, §9.3, and §20:
 * 1. Idempotently funds SponsorPool with initial Mock USDC budgets:
 *    - 1,000 Mock USDC Principal budget (funds Yield & Sponsor chests)
 *    - 500 Mock USDC Quest budget (funds Quest chest tutorials)
 *    - 200 Mock USDC Reward reserve (backs simulated APR yield payouts)
 * 2. Checks and distributes native test gas (AVAX on Fuji C-Chain, GAS on Game L1)
 *    to the Proof Signer and Relayer wallets if below the minimum threshold.
 */

import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
  formatUnits,
  type Address,
  type Hex,
  defineChain,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";
import * as fs from "node:fs";
import * as path from "node:path";

// Attempt to load .env file from root or local directory if not already set
function loadEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Load root and relayer .env
loadEnvFile(path.resolve(process.cwd(), "../../.env"));
loadEnvFile(path.resolve(process.cwd(), ".env"));

// Configuration & Defaults
const FUJI_C_RPC_URL =
  process.env.FUJI_C_RPC_URL ||
  process.env.NEXT_PUBLIC_FUJI_C_RPC_URL ||
  "https://api.avax-test.network/ext/bc/C/rpc";

const GAME_L1_RPC_URL =
  process.env.GAME_L1_RPC_URL ||
  process.env.NEXT_PUBLIC_GAME_L1_RPC_URL ||
  "http://127.0.0.1:9650/ext/bc/game-l1/rpc";

const GAME_L1_CHAIN_ID =
  Number(process.env.GAME_L1_CHAIN_ID || process.env.NEXT_PUBLIC_GAME_L1_CHAIN_ID) || 99999;

// SponsorPool & MockUSDC Addresses
const SPONSOR_POOL_ADDRESS = (
  process.env.FUJI_C_SPONSOR_POOL_ADDRESS ||
  process.env.NEXT_PUBLIC_FUJI_C_SPONSOR_POOL_ADDRESS ||
  ""
).trim() as Address;

const MOCK_USDC_ADDRESS = (
  process.env.FUJI_C_MOCK_USDC_ADDRESS ||
  process.env.NEXT_PUBLIC_FUJI_C_MOCK_USDC_ADDRESS ||
  ""
).trim() as Address;

// Operator Wallets
const RELAYER_ADDRESS = (
  process.env.RELAYER_ADDRESS ||
  ""
).trim() as Address;

const PROOF_SIGNER_ADDRESS = (
  process.env.PROOF_SIGNER_ADDRESS ||
  ""
).trim() as Address;

// Funder / Deployer Private Key for seeding budgets and gas
const FUNDER_PRIVATE_KEY = (
  process.env.FUNDER_PRIVATE_KEY ||
  process.env.DEPLOYER_PRIVATE_KEY ||
  process.env.FAUCET_PRIVATE_KEY ||
  // Default Foundry test account #0 (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
).trim() as Hex;

// Target Budgets (6 decimals for Mock USDC)
export const TARGET_PRINCIPAL_BUDGET = 1_000n * 10n ** 6n; // 1,000 USDC
export const TARGET_QUEST_BUDGET = 500n * 10n ** 6n;       // 500 USDC
export const TARGET_REWARD_RESERVE = 200n * 10n ** 6n;      // 200 USDC
export const TARGET_TOTAL_BUDGET =
  TARGET_PRINCIPAL_BUDGET + TARGET_QUEST_BUDGET + TARGET_REWARD_RESERVE; // 1,700 USDC

// Gas targets for test operations
export const MIN_GAS_THRESHOLD = parseEther("0.2"); // Top up if < 0.2
export const TARGET_GAS_AMOUNT = parseEther("0.5");  // Top up to 0.5

// Contract ABIs
export const MOCK_USDC_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export const SPONSOR_POOL_ABI = [
  {
    name: "principalBudget",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "questBudget",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "rewardReserve",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "usdc",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    name: "fundAll",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "principalAmount", type: "uint256" },
      { name: "questAmount", type: "uint256" },
      { name: "rewardAmount", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

export const gameL1Chain = defineChain({
  id: GAME_L1_CHAIN_ID,
  name: "Avalanche Game L1",
  nativeCurrency: {
    decimals: 18,
    name: "Game Gas",
    symbol: "GAS",
  },
  rpcUrls: {
    default: { http: [GAME_L1_RPC_URL] },
  },
  testnet: true,
});

async function main() {
  console.log("==========================================================");
  console.log(" 🌲 DeFi Trail - Operational Seed & Initialization Script");
  console.log("==========================================================");

  const funderAccount = privateKeyToAccount(FUNDER_PRIVATE_KEY);
  console.log(`[Config] Funder Wallet Address: ${funderAccount.address}`);
  console.log(`[Config] Fuji C-Chain RPC:     ${FUJI_C_RPC_URL}`);
  console.log(`[Config] Game L1 RPC:           ${GAME_L1_RPC_URL}`);
  console.log(`[Config] SponsorPool Address:   ${SPONSOR_POOL_ADDRESS || "(Not set)"}`);
  console.log(`[Config] MockUSDC Address:      ${MOCK_USDC_ADDRESS || "(Not set)"}`);
  console.log(`[Config] Relayer Wallet:        ${RELAYER_ADDRESS || "(Not set)"}`);
  console.log(`[Config] Proof Signer Wallet:   ${PROOF_SIGNER_ADDRESS || "(Not set)"}\n`);

  const fujiPublicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(FUJI_C_RPC_URL, { timeout: 10_000 }),
  });

  const fujiWalletClient = createWalletClient({
    account: funderAccount,
    chain: avalancheFuji,
    transport: http(FUJI_C_RPC_URL),
  });

  const gameL1PublicClient = createPublicClient({
    chain: gameL1Chain,
    transport: http(GAME_L1_RPC_URL, { timeout: 10_000 }),
  });

  const gameL1WalletClient = createWalletClient({
    account: funderAccount,
    chain: gameL1Chain,
    transport: http(GAME_L1_RPC_URL),
  });

  // -------------------------------------------------------------
  // PART 1: Seed SponsorPool Budgets (Idempotent)
  // -------------------------------------------------------------
  console.log("----------------------------------------------------------");
  console.log("📦 STEP 1: SponsorPool Mock USDC Budget Seeding (PRD §3.2, §9.1)");
  console.log("----------------------------------------------------------");

  if (!SPONSOR_POOL_ADDRESS || !SPONSOR_POOL_ADDRESS.startsWith("0x") || SPONSOR_POOL_ADDRESS.length !== 42) {
    console.log("⚠️  SPONSOR_POOL_ADDRESS is not configured in env. Skipping pool funding check.");
    console.log("   Set FUJI_C_SPONSOR_POOL_ADDRESS or NEXT_PUBLIC_FUJI_C_SPONSOR_POOL_ADDRESS to enable.");
  } else {
    try {
      console.log(`Checking SponsorPool at ${SPONSOR_POOL_ADDRESS}...`);
      const [currentPrincipal, currentQuest, currentReward] = await Promise.all([
        fujiPublicClient.readContract({
          address: SPONSOR_POOL_ADDRESS,
          abi: SPONSOR_POOL_ABI,
          functionName: "principalBudget",
        }),
        fujiPublicClient.readContract({
          address: SPONSOR_POOL_ADDRESS,
          abi: SPONSOR_POOL_ABI,
          functionName: "questBudget",
        }),
        fujiPublicClient.readContract({
          address: SPONSOR_POOL_ADDRESS,
          abi: SPONSOR_POOL_ABI,
          functionName: "rewardReserve",
        }),
      ]);

      console.log(`Current Principal Budget: ${formatUnits(currentPrincipal, 6)} Mock USDC (Target: 1,000)`);
      console.log(`Current Quest Budget:     ${formatUnits(currentQuest, 6)} Mock USDC (Target: 500)`);
      console.log(`Current Reward Reserve:   ${formatUnits(currentReward, 6)} Mock USDC (Target: 200)`);

      const needPrincipal = TARGET_PRINCIPAL_BUDGET > currentPrincipal ? TARGET_PRINCIPAL_BUDGET - currentPrincipal : 0n;
      const needQuest = TARGET_QUEST_BUDGET > currentQuest ? TARGET_QUEST_BUDGET - currentQuest : 0n;
      const needReward = TARGET_REWARD_RESERVE > currentReward ? TARGET_REWARD_RESERVE - currentReward : 0n;
      const totalShortfall = needPrincipal + needQuest + needReward;

      if (totalShortfall === 0n) {
        console.log("✅ SponsorPool budgets are already fully funded! Idempotent skip - no tx needed.\n");
      } else {
        console.log(`\nShortfall detected:`);
        console.log(` - Principal deficit: +${formatUnits(needPrincipal, 6)} Mock USDC`);
        console.log(` - Quest deficit:     +${formatUnits(needQuest, 6)} Mock USDC`);
        console.log(` - Reward deficit:    +${formatUnits(needReward, 6)} Mock USDC`);
        console.log(` - Total to fund:     +${formatUnits(totalShortfall, 6)} Mock USDC`);

        if (!MOCK_USDC_ADDRESS || !MOCK_USDC_ADDRESS.startsWith("0x")) {
          throw new Error("FUJI_C_MOCK_USDC_ADDRESS is required to fund SponsorPool.");
        }

        // Check funder balance
        const funderBalance = await fujiPublicClient.readContract({
          address: MOCK_USDC_ADDRESS,
          abi: MOCK_USDC_ABI,
          functionName: "balanceOf",
          args: [funderAccount.address],
        });
        console.log(`Funder Mock USDC balance: ${formatUnits(funderBalance, 6)} Mock USDC`);

        if (funderBalance < totalShortfall) {
          const mintAmount = totalShortfall - funderBalance;
          console.log(`Minting ${formatUnits(mintAmount, 6)} Mock USDC to funder...`);
          const mintTxHash = await fujiWalletClient.writeContract({
            address: MOCK_USDC_ADDRESS,
            abi: MOCK_USDC_ABI,
            functionName: "mint",
            args: [funderAccount.address, mintAmount],
          });
          console.log(`Mint Tx: ${mintTxHash}. Waiting for confirmation...`);
          await fujiPublicClient.waitForTransactionReceipt({ hash: mintTxHash });
          console.log("Mint confirmed.");
        }

        // Check allowance
        const currentAllowance = await fujiPublicClient.readContract({
          address: MOCK_USDC_ADDRESS,
          abi: MOCK_USDC_ABI,
          functionName: "allowance",
          args: [funderAccount.address, SPONSOR_POOL_ADDRESS],
        });

        if (currentAllowance < totalShortfall) {
          console.log(`Approving SponsorPool for ${formatUnits(totalShortfall, 6)} Mock USDC...`);
          const approveTxHash = await fujiWalletClient.writeContract({
            address: MOCK_USDC_ADDRESS,
            abi: MOCK_USDC_ABI,
            functionName: "approve",
            args: [SPONSOR_POOL_ADDRESS, totalShortfall],
          });
          console.log(`Approve Tx: ${approveTxHash}. Waiting for confirmation...`);
          await fujiPublicClient.waitForTransactionReceipt({ hash: approveTxHash });
          console.log("Approval confirmed.");
        }

        console.log(`Calling SponsorPool.fundAll()...`);
        const fundTxHash = await fujiWalletClient.writeContract({
          address: SPONSOR_POOL_ADDRESS,
          abi: SPONSOR_POOL_ABI,
          functionName: "fundAll",
          args: [needPrincipal, needQuest, needReward],
        });
        console.log(`FundAll Tx: ${fundTxHash}. Waiting for confirmation...`);
        const receipt = await fujiPublicClient.waitForTransactionReceipt({ hash: fundTxHash });
        console.log(`✅ Successfully funded SponsorPool (Block #${receipt.blockNumber})!\n`);
      }
    } catch (err: unknown) {
      console.warn("⚠️  Failed to query or fund SponsorPool:", (err as Error).message || err);
      console.warn("   (Verify that Fuji C-Chain RPC is reachable and contract addresses are deployed.)\n");
    }
  }

  // -------------------------------------------------------------
  // PART 2: Gas Distribution for Relayer & Proof Signer (Idempotent)
  // -------------------------------------------------------------
  console.log("----------------------------------------------------------");
  console.log("⛽ STEP 2: Gas Distribution for Relayer & Proof Signer (PRD §3.2, §20)");
  console.log("----------------------------------------------------------");

  const walletsToFund: { name: string; address?: Address }[] = [
    { name: "Relayer Wallet", address: RELAYER_ADDRESS || undefined },
    { name: "Proof Signer Wallet", address: PROOF_SIGNER_ADDRESS || undefined },
  ];

  // Helper to ensure target gas on a specific chain
  async function ensureGasOnChain(
    chainName: string,
    publicClient: {
      getBalance: (args: { address: Address }) => Promise<bigint>;
      waitForTransactionReceipt: (args: { hash: Hex }) => Promise<unknown>;
    },
    walletClient: {
      sendTransaction: (args: { to: Address; value: bigint }) => Promise<Hex>;
    },
    symbol: string
  ) {
    console.log(`Checking native gas on [${chainName}]...`);
    try {
      const funderGas = await publicClient.getBalance({ address: funderAccount.address });
      console.log(` Funder ${chainName} balance: ${formatEther(funderGas)} ${symbol}`);

      for (const target of walletsToFund) {
        if (!target.address || !target.address.startsWith("0x") || target.address.length !== 42) {
          console.log(` ⚠️  ${target.name} address is not configured. Skipping.`);
          continue;
        }

        const currentBalance = await publicClient.getBalance({ address: target.address });
        console.log(` • ${target.name} (${target.address}): ${formatEther(currentBalance)} ${symbol}`);

        if (currentBalance >= MIN_GAS_THRESHOLD) {
          console.log(`   ✅ Has sufficient gas (>= ${formatEther(MIN_GAS_THRESHOLD)} ${symbol}). Idempotent skip.`);
        } else {
          const needed = TARGET_GAS_AMOUNT - currentBalance;
          console.log(`   ⚡ Low gas! Top-up required: +${formatEther(needed)} ${symbol}`);

          if (funderGas < needed) {
            console.warn(`   ⚠️  Funder has insufficient ${symbol} balance to fund this wallet.`);
            continue;
          }

          const txHash = await walletClient.sendTransaction({
            to: target.address,
            value: needed,
          });
          console.log(`   Tx submitted: ${txHash}. Waiting confirmation...`);
          await publicClient.waitForTransactionReceipt({ hash: txHash });
          console.log(`   ✅ Successfully funded ${target.name} with +${formatEther(needed)} ${symbol}!`);
        }
      }
    } catch (err: unknown) {
      console.warn(` ⚠️  Could not connect to ${chainName} RPC: ${(err as Error).message || err}`);
    }
  }

  // 1. Fuji C-Chain Gas check
  await ensureGasOnChain("Fuji C-Chain", fujiPublicClient, fujiWalletClient, "AVAX");
  console.log("");

  // 2. Game L1 Gas check
  await ensureGasOnChain("Game L1", gameL1PublicClient, gameL1WalletClient, "GAS");

  console.log("\n==========================================================");
  console.log(" 🎉 DeFi Trail Seeding Completed Successfully");
  console.log("==========================================================");
}

// Execute main only if run directly from the command line
if (
  process.argv[1] &&
  (process.argv[1].endsWith("seed.ts") || process.argv[1].endsWith("seed.js"))
) {
  main().catch((err) => {
    console.error("❌ Fatal Error during seed execution:", err);
    process.exit(1);
  });
}
