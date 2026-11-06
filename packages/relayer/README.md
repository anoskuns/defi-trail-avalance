# @defi-trail/relayer

Avalanche Teleporter (ICM) Relayer service and operational initialization scripts for **DeFi Trail** (PRD §3.2, §9.1, §9.3, §20).

## Overview

The relayer delivers bidirectional cross-chain messages between:
- **Avalanche Game L1**: Originates chest unlock requests (`DepositRequest` / `QuestRegistration`).
- **Avalanche Fuji C-Chain**: Processes allocations in `SponsorPool` and `YieldVault`, returning `PositionSnapshot` or status acknowledgments.

## Features

1. **Official Avalanche AWM Relayer Docker Service (`docker-compose.yml`)**:
   - Uses `avaplatform/awm-relayer:v1.3.1`.
   - Listens to both Fuji C-Chain and Game L1 subnets via JSON-RPC / WebSocket.
   - Monitors Teleporter Messenger contracts (`0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf`).
   - Exposes health & Prometheus metrics on port `8080` (`/health`, `/metrics`).
   - Configured with `restart: unless-stopped` for high availability.

2. **Idempotent Testnet Seeding Script (`scripts/seed.ts`)**:
   - Queries `SponsorPool` for current `principalBudget`, `questBudget`, and `rewardReserve`.
   - Idempotently funds shortfall to target:
     - **Principal Budget**: 1,000 Mock USDC (1,000,000,000 units)
     - **Quest Budget**: 500 Mock USDC (500,000,000 units)
     - **Reward Reserve**: 200 Mock USDC (200,000,000 units)
   - Verifies balances of **Proof Signer** and **Relayer** wallets; tops up native gas (AVAX on Fuji, GAS on Game L1) to threshold.

## Usage

### 1. Launch Relayer Container

```bash
# Copy and configure environment variables
cp .env.example .env

# Start the relayer in the background
docker compose up -d

# View live logs
docker compose logs -f awm-relayer
```

### 2. Run Idempotent Seed Script

```bash
# From workspace root
pnpm --filter @defi-trail/relayer run seed

# Or directly in packages/relayer
node --experimental-strip-types scripts/seed.ts
```

### 3. Check Relayer Health

```bash
curl http://localhost:8080/health
```

