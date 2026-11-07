# ADR-001: Engagement Storage Architecture & Repository Boundary

- **Status:** Accepted
- **Date:** 2026-11-07
- **Deciders:** Core Engineering Team (Avalanche Build Web3 / Yield Go)
- **Consulted:** Smart Contract Engineers, Frontend Engineers, Security & Privacy Auditors
- **Related Issues / Tasks:** GE-04 (Evidence Reconciliation), GE-07 (Gameplay Funnel Analytics), GE-08 (Storage ADR), GE-09 (Team Join & Leaderboard Reducer), GE-10 (Sponsor Perk Claim & Redemption)

---

## 1. Context & Problem Statement

Yield Go is evolving beyond basic on-chain chest discovery into a collaborative, location-based trail adventure featuring:
- Team mechanics and seasonal leaderboards (**GE-09**).
- Real-world sponsor perk voucher redemption (**GE-10**).
- Organizer-curated campaign trails (**GE-11**).
- Full 7-day public campus pilots (**GE-12**).

While financial assets (USDC deposits, yield, chest claims) live immutably on Avalanche Game L1 and Fuji C-Chain, high-frequency gameplay features require responsive queries, aggregation (leaderboards), and state coordination that would be prohibitively expensive, slow, and privacy-invasive to store directly on-chain.

Before implementing any database code for teams or perks, we must establish:
1. The **economic source-of-truth boundary** (separating consensus assets from engagement state).
2. The **storage engine selection** across pilot and production environments.
3. The **idempotency, authentication, backup/rebuild, and privacy guarantees** governing all engagement data.

---

## 2. System & Economic Source-of-Truth Boundary

A strict architectural boundary is established between **On-Chain Economic Consensus** and **Off-Chain Engagement Storage**:

```
+-----------------------------------------------------------------------------------+
|                        ON-CHAIN ECONOMIC CONSENSUS                                |
|  Authoritative Source-of-Truth for Assets, Entitlements, and Cross-Chain Routing   |
+-----------------------------------------------------------------------------------+
|  Avalanche Game L1:                                                               |
|  - ChestManager.sol       -> Chest mints, tier rolls, opening authorizations       |
|  - PlayerState.sol        -> Energy balances, player level caps, daily stamina    |
|  - GameICMGateway.sol     -> Cross-chain Teleporter message dispatch & nonces     |
|                                                                                   |
|  Avalanche Fuji C-Chain:                                                          |
|  - QuestRouter.sol        -> Quest deposits, budget allocations, APR calculations |
|  - SponsorPool.sol        -> Principal, quest budgets, reward reserve solvency    |
|  - YieldVault.sol         -> Aave V3 lending yield generation                     |
|  - CChainICMGateway.sol   -> Teleporter settlement & mock USDC routing            |
+-----------------------------------------------------------------------------------+
                                         |
                                         | Verified Events & Cryptographic Evidence
                                         | (Teleporter requestId, signed proofs)
                                         v
+-----------------------------------------------------------------------------------+
|                        OFF-CHAIN ENGAGEMENT STORAGE                               |
|       Disposable, Rebuildable Read Models & Ephemeral Social State                |
+-----------------------------------------------------------------------------------+
|  Authoritative Off-Chain State:                                                   |
|  - Team Affiliations      -> seasonId, teamId, playerAddress, joinedAt            |
|  - Perk Vouchers          -> campaignId, voucherCodeHash, merchant redemption     |
|                                                                                   |
|  Derived Read Models (Event-Indexed Projections):                                 |
|  - Trail & Checkpoint Progress -> request_id + checkpoint_id settlement cache     |
|  - Seasonal Leaderboards       -> Aggregated points reduced from verified events  |
|  - Gameplay Funnel Analytics   -> Anonymized, non-PII funnel milestones (GE-07)   |
|  - Player Passport             -> Badge and stamp cache                           |
+-----------------------------------------------------------------------------------+
```

### Invariant Rules
1. **Zero Economic Authority in Database:** The engagement storage layer has **zero authority** over token balances, chest entitlements, or cross-chain settlement.
2. **Blast Radius Isolation:** If the engagement database is completely dropped, wiped, or corrupted, **no player loses funds, chests, or verified achievements**. All progress is deterministically recomputed from on-chain event logs and signed checkpoint proofs.
3. **No Financial Pay-to-Win:** Leaderboard scores and team points are derived solely from verified trail checkpoint completions and organizer campaign rules. Direct contract deposits into `SponsorPool` or `YieldVault` do not inflate gameplay leaderboard scores.

---

## 3. Storage Alternatives Comparison

We evaluated three storage architectures for the Yield Go engagement layer:

| Dimension | Option A: Managed PostgreSQL (e.g. Neon / Supabase / Cloud SQL) | Option B: SQLite Single-Host Pilot (WAL mode / better-sqlite3) | Option C: Event-Indexed / Rebuildable Read Model (Event Sourcing) |
| :--- | :--- | :--- | :--- |
| **Operational Complexity** | High: Requires cloud provisioning, VPC/networking, connection pooler (PgBouncer), secret management. | Minimal: Zero external dependencies; single local file on persistent volume; zero config. | Medium: Requires event listener daemon/indexing pipeline and event store. |
| **Local / Test Velocity** | Slower: Requires dockerized Postgres or cloud connection; mocking required in CI. | Instant: Tests run in-memory or against temp SQLite DBs in <10ms; perfect for CI/vitest. | Medium: Requires replaying fixtures or synthetic event streams. |
| **Concurrency & Writes** | Outstanding: Multi-writer MVCC, row-level locking, horizontal read replicas. | Moderate: Single-writer (WAL mode enables concurrent non-blocking reads; writes queued). | High: Appending events is lock-free; read projections scale independently. |
| **Data Integrity & Schema** | Strict ACID, rich types (JSONB, UUID, CITEXT), foreign keys, partial indexes. | Strict ACID, foreign keys, generated columns, atomic transactions. | Event log is append-only source-of-truth; projections enforce relational views. |
| **Disaster Recovery** | Point-in-time recovery (PITR), automated snapshots, multi-AZ standby. | File-level atomic backup (`.backup`), S3 volume snapshot sync. | **Infinite DR:** Drop the database and replay on-chain events from block 0. |
| **Cost Profile** | $25 - $150+/month per environment for managed instances. | $0 additional infrastructure cost for single-host pilot. | Compute cost of indexer node only. |
| **Suitability for Pilot** | Overkill for 7-day campus pilot; adds external point of failure. | **Ideal for single-host pilot** (fast, self-contained, predictable). | **Essential architectural pattern** to prevent state divergence from chain. |
| **Suitability for Production** | **Ideal for global production scale** with tens of thousands of concurrent users. | Limited for multi-region horizontal autoscaling without distributed consensus (LiteFS). | Complements production Postgres as the projection engine. |

---

## 4. Architectural Decision

### The Decision: A Two-Stage, Rebuildable Read Model Architecture

We adopt a **Rebuildable Read Model architecture** using an **Abstract Repository Interface (`IEngagementRepository`)**:

1. **Stage 1 (Pilot & Hackathon Deployment):**
   - Storage Engine: **SQLite with Write-Ahead Logging (WAL mode)** running on the same host/container as the Next.js server.
   - Access Layer: Typed SQL queries via lightweight ORM/query builder (e.g. Drizzle ORM) adhering strictly to standard ANSI SQL.
   - Purpose: Eliminates cloud networking latency, eliminates external database costs, guarantees fast unit/integration testing (<50ms suite), and provides atomic ACID reliability for the pilot.

2. **Stage 2 (Public Multi-Node Production Launch):**
   - Storage Engine: **Managed PostgreSQL** (Neon or AWS Aurora PostgreSQL).
   - Transition: Because the repository layer interacts exclusively through `IEngagementRepository` with standard relational schemas, swapping the backend from SQLite to Postgres requires changing only the database driver connection string with **zero application logic changes**.

3. **Core Pattern: Event-Indexed Read Model:**
   - Every leaderboard score, team rank, and checkpoint confirmation is treated as a **projection** of verified events (`requestId`, signed proof hashes, on-chain `RequestSettled`).
   - A deterministic replay CLI command (`pnpm run db:rebuild`) is provided from day one to reconstruct the entire engagement state from blockchain logs.

---

## 5. Answers to ADR Requirements

### 5.1 Data Classification: Authoritative vs. Derived

| Data Category | Classification | Authoritative Storage Location | Justification & Recovery Method |
| :--- | :--- | :--- | :--- |
| **Token Balances & Yield** | Economic Authoritative | Avalanche Fuji C-Chain (`SponsorPool`, `YieldVault`) | Irreversible EVM state. Read via RPC. |
| **Chest Entitlements & Openings** | Economic Authoritative | Avalanche Game L1 (`ChestManager`) | Cryptographically enforced by contract nonces and cooldowns. |
| **Player Daily Energy & Level** | Economic Authoritative | Avalanche Game L1 (`PlayerState`) | Authoritative game engine state. |
| **Teleporter Messages & Nonces** | Transport Authoritative | Avalanche Warp Messaging (ICM Gateways) | Teleporter message receipts and delivery status. |
| **Season Team Membership** | Engagement Authoritative | Engagement DB (`team_memberships`) | User choice with EIP-712 signature; frozen per season. |
| **Sponsor Perk Voucher Hashes** | Engagement Authoritative | Engagement DB (`sponsor_perk_claims`) | Merchant promo codes/barcodes; off-chain redemption audit. |
| **Checkpoint & Trail Progress** | Derived Read Model | Engagement DB + Client Evidence Adapter | Derived from `requestId` + signed proof. Rebuildable from ICM logs. |
| **Team & Individual Leaderboards** | Derived Read Model | Engagement DB (`team_scores`, `leaderboard_cache`) | Deterministic reducer replaying verified checkpoint events. |
| **Gameplay Funnel Telemetry** | Derived Analytics | Engagement DB (`analytics_events`) | Ephemeral, privacy-compliant event stream for funnel metrics (GE-07). |

### 5.2 Mandatory Idempotency & Unique Constraints

To prevent race conditions, replay attacks, duplicate points, and double-claim exploits, the database MUST enforce the following physical unique constraints:

1. **Trail Checkpoint Idempotency:**
   ```sql
   CONSTRAINT uq_checkpoint_progress UNIQUE (request_id, checkpoint_id)
   ```
   *Behavior:* Replaying the same `requestId` for the same `checkpointId` (whether by client retry, out-of-order delivery, or duplicate relayer execution) produces a no-op update and returns the existing confirmed state.

2. **Team Membership Constraint:**
   ```sql
   CONSTRAINT uq_season_player UNIQUE (season_id, player_address)
   ```
   *Behavior:* A wallet address can join at most one team per season. Changing teams is subject to strict season lock rules and cannot be performed by multiple concurrent requests.

3. **Leaderboard Reducer Idempotency:**
   ```sql
   CONSTRAINT uq_score_event UNIQUE (event_id)
   -- where event_id = sha256(season_id || ":" || request_id || ":" || checkpoint_id || ":" || player_address)
   ```
   *Behavior:* The scoring reducer will reject any attempt to increment team or player points for an event that has already been credited.

4. **Sponsor Perk Single Claim:**
   ```sql
   CONSTRAINT uq_perk_claim UNIQUE (campaign_id, player_address)
   CONSTRAINT uq_voucher_code UNIQUE (voucher_code_hash)
   ```
   *Behavior:* Exactly one perk voucher per campaign per eligible wallet. Each voucher code hash is unique and can only be redeemed once.

5. **Analytics Funnel Deduplication:**
   ```sql
   CONSTRAINT uq_funnel_dedup UNIQUE (session_id, event_name, timestamp_window)
   ```
   *Behavior:* Prevents duplicate emission of funnel advancement events caused by intermittent mobile connectivity.

### 5.3 Wallet Authentication & Authorization

All mutations to engagement state MUST be authenticated cryptographically using Ethereum wallet signatures:

1. **State Mutation Authentication (EIP-712 & SIWE):**
   - **Team Joining / Switching:** Requires an EIP-712 signature over `JoinTeam(address player, uint256 seasonId, uint256 teamId, uint256 nonce, uint256 deadline)`.
   - **Perk Voucher Claim:** Requires an EIP-712 signature over `ClaimPerk(address player, string campaignId, bytes32 proofHash, uint256 nonce)`.
   - **Signature Verification:** Verified on the server using `viem` / `ethers.verifyTypedData` matching `msg.sender` to the signer address, current chain ID, and application verifying contract domain.

2. **Session Management:**
   - Stateless or short-lived HTTP-only signed JWT session tokens containing `address` and `chainId` (TTL = 2 hours).
   - Zero private keys stored on server; proof signer private key (`DEFAULT_DEV_SIGNER_KEY` / KMS) is strictly restricted to signing server-attested GPS/checkpoint eligibility proofs, never used for player impersonation.

3. **Read Queries:**
   - Public read operations (viewing leaderboards, public trail information, health checks) require no wallet authentication but are strictly rate-limited per IP (`RateLimiter` sliding window, 60 req/min).

### 5.4 Backup, Restore, and Disaster Recovery (Rebuild Plan)

1. **Deterministic Rebuild Capability (The Ultimate Safety Net):**
   - Because economic state is on-chain and checkpoint completions are tied to verifiable `requestId` evidence, the engagement store can be rebuilt from scratch:
     ```bash
     pnpm run db:rebuild --from-block=12345000 --season=1
     ```
   - The rebuild tool queries the Avalanche RPC for `GameICMGateway.CrossChainRequestSent` and `CChainICMGateway.RequestSettled` events, verifies evidence payloads, and deterministically re-runs the scoring reducer to restore identical leaderboard standings.

2. **Physical Storage Backups:**
   - **Pilot (SQLite):**
     - Automated hourly atomic backups using `sqlite3 .backup` executed while the database is active (enabled by WAL mode without table locking).
     - Daily snapshots compressed and uploaded to encrypted, append-only cloud object storage (S3 / GCS).
   - **Production (PostgreSQL):**
     - Continuous WAL archiving with Point-In-Time Recovery (PITR) allowing restoration to any second within the past 14 days.
     - Daily automated snapshot images retained for 30 days.

3. **Recovery Objectives:**
   - **RTO (Recovery Time Objective):** < 15 minutes via database snapshot restore; < 60 minutes via full on-chain event replay.
   - **RPO (Recovery Point Objective):**
     - Economic Assets: **0 seconds** (on-chain consensus is immediately final).
     - Engagement State: < 1 hour (backed up hourly, fully recoverable from chain).

### 5.5 Data Retention and Deletion (Privacy Policy)

1. **Strict Zero-Location Storage Policy (GE-07 Compliance):**
   - **NEVER Persisted:** Raw GPS coordinates (`latitude`, `longitude`), accuracy radius, raw QR secrets, private keys, or seed phrases.
   - **Verification in Memory:** GPS proximity and QR payloads are validated in-memory by the proof-signer service and immediately discarded. Only cryptographic proof hashes (`bytes32`) and boolean eligibility flags are stored.

2. **Pseudonymization & Public Views:**
   - Leaderboards and public APIs expose truncated addresses (`0x12...cde`) or user-configured pseudonyms.
   - Internal analytics store hashed wallet addresses: `player_hash = hmac_sha256(wallet_address, season_salt)`.

3. **Retention Lifecycle:**
   - **Active Season State:** Retained in fast storage for the duration of the active season (7 to 30 days).
   - **Season Archival:** Upon season completion, final leaderboard standings, team winners, and perk issuance totals are exported to immutable JSON snapshot artifacts (stored on IPFS / permanent storage).
   - **Telemetry Pruning:** Granular analytics events and debug traces have an automatic TTL of 30 days, purged by a scheduled maintenance cron job.
   - **Draft Request Cleanup:** Unconfirmed draft requests in `CREATED` state older than 24 hours are pruned.

### 5.6 Deployment & Infrastructure Ownership

| Environment | Host Architecture | Storage Engine | Operational Ownership |
| :--- | :--- | :--- | :--- |
| **Local Development** | Developer Workstation | In-Memory / SQLite (`file:local.db`) | Individual Developer |
| **CI / Automated Tests** | GitHub Actions Runner | In-Memory SQLite | CI Pipeline Automation |
| **Campus Pilot (GE-12)** | Single-Host VM / Dedicated Docker Container | SQLite WAL mounted on persistent volume (`/data/yieldgo.db`) | Lead Gameplay Engineer / DevOps |
| **Production Scale** | Cloud Cluster (ECS / Kubernetes / Vercel Edge + Node) | Managed PostgreSQL (Neon / AWS RDS Aurora) | Cloud Infrastructure Team |

### 5.7 Offline & Relayer Outage Behavior

1. **Relayer Outage (Avalanche Warp Messaging / ICM Delays):**
   - When the ICM Relayer is paused, degraded, or delayed:
     - Checkpoint submissions register locally as `SENT` or `REMOTE_EXECUTED`.
     - The frontend informs the user with a non-blocking toast: *"Telemetry pending cross-chain confirmation. Safe to continue."*
     - When the relayer resumes, messages are settled on Fuji C-Chain. The server reconciles the settled `requestId` and transitions progress to `CONFIRMED`.
     - No duplicate requests are created; no duplicate stamps or points are awarded.

2. **Database Outage:**
   - If the engagement database becomes unreachable:
     - The Next.js frontend **falls back immediately to direct RPC contract reads** (`PlayerState`, `ChestManager`, `SponsorPool`).
     - Core on-chain gameplay (opening chests, claiming yields) remains **100% functional**.
     - Secondary features (team leaderboard display, perk redemption) display a graceful fallback: *"Leaderboard temporarily unavailable. Your on-chain chest claims are safe."*

3. **Client Offline / Intermittent Campus Network:**
   - The frontend maintains an Outbox in `localStorage` / `IndexedDB`.
   - Actions retry idempotently using the existing `requestId` once connectivity is restored.

---

## 6. Repository Interface Specification (Zero DB Code)

In accordance with the principle **"Không code database trước ADR"**, no implementation files are created in this step. The following contract defines the interface boundary that future implementations (**GE-09, GE-10**) MUST implement:

```typescript
// Proposed specification for packages/shared or apps/web repository boundary

export interface CheckpointEvidenceRecord {
  requestId: string;
  checkpointId: string;
  playerAddress: string;
  trailId: string;
  status: 'CREATED' | 'SENT' | 'REMOTE_EXECUTED' | 'ACK_PENDING' | 'CONFIRMED' | 'FAILED';
  confirmedAt?: number;
  evidenceHash: string;
}

export interface TeamMembershipRecord {
  seasonId: number;
  playerAddress: string;
  teamId: number;
  joinedAt: number;
  inviteCode?: string;
}

export interface ScoreEventRecord {
  eventId: string; // sha256(seasonId:requestId:checkpointId:playerAddress)
  seasonId: number;
  teamId: number;
  playerAddress: string;
  requestId: string;
  checkpointId: string;
  points: number;
  createdAt: number;
}

export interface SponsorPerkClaimRecord {
  claimId: string;
  campaignId: string;
  playerAddress: string;
  voucherCodeHash: string;
  status: 'CLAIMED' | 'REDEEMED' | 'EXPIRED';
  claimedAt: number;
  redeemedAt?: number;
  expiresAt: number;
}

export interface IEngagementRepository {
  // Checkpoint & Trail Progress
  getCheckpointProgress(requestId: string, checkpointId: string): Promise<CheckpointEvidenceRecord | null>;
  upsertCheckpointProgress(record: CheckpointEvidenceRecord): Promise<void>;
  
  // Team Management (GE-09)
  getTeamMembership(seasonId: number, playerAddress: string): Promise<TeamMembershipRecord | null>;
  joinTeam(membership: TeamMembershipRecord, signature: string): Promise<boolean>;
  
  // Leaderboard & Scoring Reducer (GE-09)
  applyScoreEvent(event: ScoreEventRecord): Promise<{ applied: boolean; totalTeamScore: number }>;
  getTeamLeaderboard(seasonId: number, limit: number, offset: number): Promise<Array<{ teamId: number; score: number; memberCount: number }>>;
  
  // Sponsor Perks (GE-10)
  getPerkClaim(campaignId: string, playerAddress: string): Promise<SponsorPerkClaimRecord | null>;
  claimPerk(claim: SponsorPerkClaimRecord, signature: string): Promise<boolean>;
  redeemPerk(campaignId: string, voucherCodeHash: string, merchantSignature: string): Promise<boolean>;
  
  // Maintenance & Parity Rebuild
  rebuildReadModelFromEvents(events: Array<ScoreEventRecord>): Promise<{ eventsProcessed: number; parityHash: string }>;
}
```

---

## 7. Migration & Rollback Plan with Test Strategy

### 7.1 Rollout & Migration Sequence
1. **Milestone GE-08 (Current):**
   - ADR Accepted.
   - Economic and repository boundaries established.
   - Archify repository architecture refreshed.
   - Zero database code committed.
2. **Milestone GE-09 (Teams & Leaderboard):**
   - Implement `IEngagementRepository` with SQLite single-host driver.
   - Implement database schema migrations (`0001_initial_engagement.sql`).
   - Run integration tests for idempotency and concurrency.
3. **Milestone GE-10 (Sponsor Perks):**
   - Add perk claim & voucher verification tables (`0002_sponsor_perks.sql`).
   - Implement merchant redemption signature validation.
4. **Production Transition (Post-Pilot):**
   - Provision Managed PostgreSQL instance.
   - Apply SQL migration scripts.
   - Replay on-chain season events via `pnpm run db:rebuild` to hydrate Postgres.
   - Switch connection string environment variable (`DATABASE_URL`).

### 7.2 Rollback Plan
1. **Schema Rollback:** Each migration file `NNNN_name.sql` is paired with an exact `NNNN_name.down.sql` reversal script.
2. **State Corruption Rollback:** In the event of data corruption during migration:
   - Drop the affected read-model tables.
   - Execute `pnpm run db:rebuild --from-block=<seasonStart>` against the on-chain Avalanche RPC.
   - Reconstructed state is guaranteed to achieve 100% parity with on-chain evidence.

### 7.3 Test Strategy

Before accepting any database implementation in GE-09 and GE-10, the test suite MUST pass the following automated suites:

1. **Idempotency & Duplicate Replay Tests:**
   - Submitting the identical checkpoint evidence 5 consecutive times MUST produce exactly one confirmed record and exactly one score event.
   - Submitting duplicate team join requests with identical nonces MUST be rejected.
2. **Out-of-Order & Race Condition Tests:**
   - Receiving `REMOTE_EXECUTED` before `SENT` MUST settle correctly without error.
   - 20 concurrent requests attempting to claim the final perk voucher MUST allow exactly one winner and reject 19 with `AlreadyClaimedException`.
3. **Rebuild Parity Verification Test:**
   - Replaying 1,000 synthetic trail completion events into an empty database MUST produce a leaderboard state with a cryptographic hash (`parityHash`) identical to the state built incrementally.
4. **Security & Privacy Negative Tests:**
   - Any query attempting to write or read raw GPS coordinates (`latitude`, `longitude`) MUST fail schema validation.
   - Any mutation lacking a valid EIP-712 cryptographic signature MUST return HTTP 401 Unauthorized.

---

## 8. Consequences

### Positive
- **Clear Architectural Separation:** Frontend and backend developers have unambiguous guidance on where state belongs.
- **Zero Risk to Financial Assets:** On-chain funds and chest mints remain completely insulated from database bugs, outages, or migrations.
- **Fast Pilot Execution:** SQLite single-host deployment enables immediate launch of campus pilots without managing cloud database infrastructure.
- **Deterministic Disaster Recovery:** The ability to rebuild the entire engagement state from blockchain logs provides unmatched resiliency.
- **Strict Privacy Compliance:** Eliminates legal liability by permanently prohibiting the persistence of raw user location data.

### Negative & Mitigations
- *Constraint:* SQLite writes are serialized (single writer).
  - *Mitigation:* In WAL mode, reads are non-blocking and concurrent. Peak write throughput for a 500-player campus pilot is <10 writes/second, well within SQLite's proven capacity of >1,500 writes/second.
- *Constraint:* Rebuilding from RPC logs can take several minutes if the block history is large.
  - *Mitigation:* Hourly atomic snapshots ensure rebuilds only need to process events occurring since the last snapshot.

---

## 9. Conclusion & Acceptance

This ADR is **Accepted**. Milestones **GE-09** (Team Join & Leaderboard Reducer) and **GE-10** (Sponsor Perk Claim & Redemption) are cleared to proceed strictly following the `IEngagementRepository` boundaries and idempotency constraints defined herein.

