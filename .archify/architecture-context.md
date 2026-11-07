# Architecture Context

## System

- Project: `Yield Go Project`
- Target Path: `C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project`
- Dominant Directories: `apps`, `packages`, `eslint.config.mjs`, `scripts`
- Dependency Shape: 454 subsystem links, 5232 ambiguous edges, 5 tagged entrypoints, 0 enriched docs
- Summary: Yield Go Project contains 126 subsystems, 454 cross-subsystem flows, 0 processed documents, and 1071 external dependencies derived from 2589 extracted code nodes.

## Subsystem Inventory

### packages/contracts-cchain [MEDIUM]

- Kind: `domain`
- Summary: packages/contracts-cchain is a domain subsystem covering 1 paths and 154 symbols; strongest evidence: calls x386, contains x150.
- Paths: `packages/contracts-cchain/lib/forge-std/scripts/vm.py`
- Key Symbols: `CheatcodesPrinter`, `main()`, `self._p_str`, `self._p_line`, `prefix_with_group_headers()`
- Depends On: `none`
- Depended On By: `subsystem-114-0-packages-contracts-l1`
- Responsibilities: Primary symbols: call_reference x70, method x54.; Internal relations: calls x385, contains x130.; Exposes 155 interface candidates.
- Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 77 symbols; strongest evidence: calls x134.
- Paths: `apps/web/src/components/map/InteractiveMap.tsx`
- Key Symbols: `console.warn`, `Button`, `Banner`, `Switch`, `URL`
- Depends On: `none`
- Depended On By: `subsystem-104-0-apps-web`, `subsystem-18-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-90-0-apps-web`
- Responsibilities: Primary symbols: call_reference x77.
- Evidence: apps/web/src/components/map/InteractiveMap.tsx:Array.isArray, apps/web/src/components/map/InteractiveMap.tsx:Banner, apps/web/src/components/map/InteractiveMap.tsx:Button

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 48 symbols; strongest evidence: calls x99.
- Paths: `apps/web/src/app/page.tsx`
- Key Symbols: `Map`, `useActiveAccount`, `useActiveWalletChain`, `clearTimeout`, `Wallet`
- Depends On: `none`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-101-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-50-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-90-0-apps-web`, `subsystem-93-0-apps-web`
- Responsibilities: Primary symbols: call_reference x48.; Exposes 2 interface candidates.
- Evidence: apps/web/src/app/page.tsx:HomePage, apps/web/src/app/page.tsx:L1, apps/web/src/app/page.tsx:Map

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 45 symbols; strongest evidence: calls x387.
- Paths: `apps/web/src/app/admin/health/page.tsx`
- Key Symbols: `rgba`, `async`, `setTimeout`, `useEffect`, `useState`
- Depends On: `none`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-100-0-apps-web`, `subsystem-101-0-apps-web`, `subsystem-104-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-63-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-90-0-apps-web`, `subsystem-93-0-apps-web`, `subsystem-94-0-apps-web`, `subsystem-98-0-apps-web`
- Responsibilities: Primary symbols: call_reference x45.; Exposes 2 interface candidates.
- Evidence: apps/web/src/app/admin/health/page.tsx:AVAX, apps/web/src/app/admin/health/page.tsx:Active, apps/web/src/app/admin/health/page.tsx:AdminHealthPage

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 41 symbols; strongest evidence: calls x196, imports x4.
- Paths: `apps/web/src/components/cross-chain/useICMProgress.ts`
- Key Symbols: `async`, `clearPendingRequest`, `getElapsedSeconds`, `getPendingRequest`, `getRelayWaitState`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-69-0-apps-web`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-102-0-apps-web`, `subsystem-14-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-87-0-apps-web`, `subsystem-9-0-apps-web`
- Responsibilities: Primary symbols: call_reference x39, function x1.; Internal relations: calls x117, imports x1.
- Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:useICMProgress(), apps/web/src/components/cross-chain/useICMProgress.ts:react, apps/web/src/components/cross-chain/useICMProgress.ts:PlayerState

### packages/relayer [MEDIUM]

- Kind: `adapter`
- Summary: packages/relayer is a adapter subsystem covering 1 paths and 41 symbols; strongest evidence: calls x147, imports x4.
- Paths: `packages/relayer/scripts/seed.ts`
- Key Symbols: `loadEnvFile()`, `node:path`, `viem/accounts`, `viem/chains`, `Budgets`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-52-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x37, import_reference x3.; Internal relations: calls x76, imports x3.; Exposes 42 interface candidates.
- Evidence: packages/relayer/scripts/seed.ts:loadEnvFile(), packages/relayer/scripts/seed.ts:node:path, packages/relayer/scripts/seed.ts:viem/accounts

### packages/shared [MEDIUM]

- Kind: `ui`
- Summary: packages/shared is a ui subsystem covering 1 paths and 38 symbols; strongest evidence: calls x206, contains x5.
- Paths: `packages/shared/src/gameplay/analytics.ts`
- Key Symbols: `detectForbiddenFields()`, `createDeterministicHash()`, `optional`, `positive`, `z.boolean`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-39-0-packages-shared`, `subsystem-42-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `subsystem-118-0-packages-shared`, `subsystem-36-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x33, function x5.; Internal relations: calls x97, contains x5.
- Evidence: packages/shared/src/gameplay/analytics.ts:calculatePilotFunnel(), packages/shared/src/gameplay/analytics.ts:createDeterministicHash(), packages/shared/src/gameplay/analytics.ts:detectForbiddenFields()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 36 symbols; strongest evidence: calls x72, contains x8.
- Paths: `apps/web/src/features/gameplay/passport/engine.ts`
- Key Symbols: `evaluatePassport()`, `player.toLowerCase`, `stableGameplayId()`, `Date.parse`, `sort`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-46-0-apps-web`
- Depended On By: `subsystem-111-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-31-0-apps-web`, `subsystem-36-0-packages-shared`, `subsystem-37-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-50-0-apps-web`, `subsystem-54-0-packages-shared`, `subsystem-55-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-9-0-apps-web`
- Responsibilities: Primary symbols: call_reference x29, function x7.; Internal relations: calls x36, contains x7.; Exposes 1 interface candidate.
- Evidence: apps/web/src/features/gameplay/passport/engine.ts:awardIdentity(), apps/web/src/features/gameplay/passport/engine.ts:createEmptyPassportState(), apps/web/src/features/gameplay/passport/engine.ts:evaluatePassport()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 35 symbols; strongest evidence: calls x106, imports x2.
- Paths: `apps/web/src/components/position/PositionView.tsx`
- Key Symbols: `PositionView()`, `handleConfirmWithdrawal()`, `Promise`, `setErrorMessage`, `setTxHash`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-10-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-106-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-48-0-apps-web`
- Responsibilities: Primary symbols: call_reference x33, function x2.; Internal relations: calls x52, contains x2.; Exposes 1 interface candidate.
- Evidence: apps/web/src/components/position/PositionView.tsx:PositionView(), apps/web/src/components/position/PositionView.tsx:handleConfirmWithdrawal(), apps/web/src/components/position/PositionView.tsx:BigInt

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 35 symbols; strongest evidence: calls x84, contains x13.
- Paths: `apps/web/src/features/gameplay/trails/evidence-adapter.ts`
- Key Symbols: `recoverTrailProgressFromStorage()`, `MemoryEvidenceReader`, `MemoryEvidenceReader.setRecord()`, `applyCheckpointEvidence`, `createTrailProgress`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-112-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-54-0-packages-shared`, `subsystem-59-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-66-0-apps-web`
- Responsibilities: Primary symbols: call_reference x22, function x10.; Internal relations: calls x50, contains x13.
- Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:MemoryEvidenceReader, apps/web/src/features/gameplay/trails/evidence-adapter.ts:createEvidenceIdempotencyKey(), apps/web/src/features/gameplay/trails/evidence-adapter.ts:logEvidenceReconciliation()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 34 symbols; strongest evidence: calls x98, contains x11.
- Paths: `apps/web/src/components/cross-chain/ICMProgressModal.tsx`
- Key Symbols: `ICMProgressModalView()`, `blur`, `window.addEventListener`, `window.removeEventListener`, `formatSeconds()`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-69-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-102-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-90-0-apps-web`
- Responsibilities: Primary symbols: call_reference x24, function x9.; Internal relations: calls x32, contains x9.; Exposes 2 interface candidates.
- Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:ICMProgressModal(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:ICMProgressModalView(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:UncontrolledICMProgressModal()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 34 symbols; strongest evidence: calls x75, imports x4.
- Paths: `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`
- Key Symbols: `TodayTrailSection()`, `createTrailProgress`, `loadTrailProgressCache`, `saveTrailProgressCache`, `@/components/cross-chain/icm-storage`
- Depends On: `subsystem-22-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-112-0-apps-web`, `subsystem-18-0-apps-web`
- Responsibilities: Primary symbols: call_reference x32, function x1.; Internal relations: calls x48, imports x1.; Exposes 2 interface candidates.
- Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:@/components/cross-chain/icm-storage, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:AbortController

### packages/contracts-cchain [MEDIUM]

- Kind: `module`
- Summary: packages/contracts-cchain is a module subsystem covering 1 paths and 34 symbols; strongest evidence: calls x102, imports x6.
- Paths: `packages/contracts-cchain/test/accounting.test.mjs`
- Key Symbols: `findImports()`, `fs.existsSync`, `fs.readFileSync`, `path.resolve`, `node:assert/strict`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x27, import_reference x6.; Internal relations: calls x102, imports x6.
- Evidence: packages/contracts-cchain/test/accounting.test.mjs:findImports(), packages/contracts-cchain/test/accounting.test.mjs:node:assert/strict, packages/contracts-cchain/test/accounting.test.mjs:node:fs

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 31 symbols; strongest evidence: calls x192, imports x5.
- Paths: `apps/web/src/app/api/admin/health/route.ts`
- Key Symbols: `Date.now`, `JSON.stringify`, `trim`, `NextResponse.json`, `BigInt`
- Depends On: `subsystem-45-0-apps-web`
- Depended On By: `subsystem-14-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-36-0-packages-shared`, `subsystem-37-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-46-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-59-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-61-0-apps-web`, `subsystem-64-0-apps-web`, `subsystem-65-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-72-0-apps-web`, `subsystem-73-0-apps-web`, `subsystem-78-0-apps-web`, `subsystem-88-0-packages-relayer`, `subsystem-9-0-apps-web`, `subsystem-96-0-apps-web`
- Responsibilities: Primary symbols: call_reference x28, function x2.; Internal relations: calls x55, contains x2.; Exposes 32 interface candidates.
- Evidence: apps/web/src/app/api/admin/health/route.ts:formatTokenUnits(), apps/web/src/app/api/admin/health/route.ts:formatWeiToEtherString(), apps/web/src/app/api/admin/health/route.ts:@/lib/proof-signer

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 30 symbols; strongest evidence: calls x164, imports x2.
- Paths: `apps/web/tests/ge07-analytics-funnel.test.ts`
- Key Symbols: `Calculation`, `detectForbiddenFields`, `not.toThrow`, `@/app/api/admin/analytics/route`, `Execution`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-76-0-apps-web`
- Depended On By: `subsystem-16-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-60-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x29, import_reference x1.; Internal relations: calls x60, imports x1.; Exposes 1 interface candidate.
- Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:@/app/api/admin/analytics/route, apps/web/tests/ge07-analytics-funnel.test.ts:Calculation, apps/web/tests/ge07-analytics-funnel.test.ts:Execution

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 28 symbols; strongest evidence: calls x68, contains x5.
- Paths: `apps/web/src/lib/gameplay/repository.ts`
- Key Symbols: `assertValidDate()`, `Number.isSafeInteger`, `GameplayConfigError`, `at.getTime`, `getActiveSeason`
- Depends On: `subsystem-24-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-37-0-apps-web`, `subsystem-55-0-apps-web`, `subsystem-72-0-apps-web`
- Depended On By: `subsystem-29-0-apps-web`, `subsystem-44-0-packages-shared`, `subsystem-54-0-packages-shared`, `subsystem-82-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x23, function x4.; Internal relations: calls x47, contains x5.; Exposes 29 interface candidates.
- Evidence: apps/web/src/lib/gameplay/repository.ts:VersionedGameplayConfigRepository, apps/web/src/lib/gameplay/repository.ts:assertUniqueIds(), apps/web/src/lib/gameplay/repository.ts:assertValidDate()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 27 symbols; strongest evidence: calls x283, imports x2.
- Paths: `apps/web/tests/map.test.ts`
- Key Symbols: `@/components/map/types`, `Generation`, `Management`, `Navigation`, `Rewards`
- Depends On: `subsystem-14-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-41-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x26, import_reference x1.; Internal relations: calls x77, imports x1.
- Evidence: apps/web/tests/map.test.ts:@/components/map/types, apps/web/tests/map.test.ts:Generation, apps/web/tests/map.test.ts:Management

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 26 symbols; strongest evidence: calls x59, contains x14.
- Paths: `apps/web/src/features/analytics/tracker.ts`
- Key Symbols: `GameplayTracker`, `this.track`, `Error`, `toString`, `GameplayTracker.resetCompletedTrails()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-95-0-apps-web`
- Depended On By: `subsystem-109-0-apps-web`, `subsystem-14-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-44-0-packages-shared`, `subsystem-5-0-packages-relayer`, `subsystem-6-0-packages-shared`, `subsystem-60-0-packages-shared`, `subsystem-7-0-apps-web`
- Responsibilities: Primary symbols: method x12, call_reference x12.; Internal relations: calls x28, contains x14.
- Evidence: apps/web/src/features/analytics/tracker.ts:GameplayTracker, apps/web/src/features/analytics/tracker.ts:getGameplayTracker(), apps/web/src/features/analytics/tracker.ts:GameplayTracker.resetCompletedTrails()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 24 symbols; strongest evidence: calls x70, contains x7.
- Paths: `apps/web/tests/trail-ui.test.tsx`
- Key Symbols: `MemoryStorage`, `MemoryStorage.getItem()`, `MemoryStorage.key()`, `MemoryStorage.removeItem()`, `MemoryStorage.setItem()`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-63-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x15, method x5.; Internal relations: calls x56, contains x7.
- Evidence: apps/web/tests/trail-ui.test.tsx:MemoryStorage, apps/web/tests/trail-ui.test.tsx:confirmCheckpoint(), apps/web/tests/trail-ui.test.tsx:MemoryStorage.clear()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 23 symbols; strongest evidence: calls x37, contains x5.
- Paths: `apps/web/src/lib/rate-limiter.ts`
- Key Symbols: `resetRateLimits()`, `Reconciliation`, `state`, `checkFaucetRateLimit()`, `checkReconcileRateLimit()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-6-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x18, function x5.; Internal relations: calls x22, contains x5.
- Evidence: apps/web/src/lib/rate-limiter.ts:checkFaucetRateLimit(), apps/web/src/lib/rate-limiter.ts:checkReconcileRateLimit(), apps/web/src/lib/rate-limiter.ts:recordFaucetClaim()

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 23 symbols; strongest evidence: calls x361, imports x10.
- Paths: `apps/web/tests/api.test.ts`
- Key Symbols: `toHaveLength`, `toEqual`, `toBeGreaterThan`, `beforeEach`, `toBeUndefined`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-58-0-apps-web`, `subsystem-61-0-apps-web`, `subsystem-73-0-apps-web`
- Depended On By: `subsystem-14-0-apps-web`, `subsystem-16-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-43-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-54-0-packages-shared`, `subsystem-59-0-apps-web`, `subsystem-60-0-packages-shared`, `subsystem-66-0-apps-web`, `subsystem-81-0-packages-shared`, `subsystem-82-0-packages-shared`, `subsystem-83-0-packages-shared`, `subsystem-84-0-packages-shared`, `subsystem-87-0-apps-web`
- Responsibilities: Primary symbols: call_reference x23.; Internal relations: calls x49.; Exposes 24 interface candidates.
- Evidence: apps/web/tests/api.test.ts:Conformance, apps/web/tests/api.test.ts:NextRequest, apps/web/tests/api.test.ts:accuracy

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 22 symbols; strongest evidence: calls x38, contains x9.
- Paths: `packages/shared/src/gameplay/rules.ts`
- Key Symbols: `evaluatePerkEligibility()`, `timestamp()`, `createPerkClaim()`, `RangeError`, `policy`
- Depends On: `subsystem-30-0-apps-web`, `subsystem-37-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-118-0-packages-shared`, `subsystem-44-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x13, function x9.; Internal relations: calls x23, contains x9.
- Evidence: packages/shared/src/gameplay/rules.ts:applyCheckpointEvidence(), packages/shared/src/gameplay/rules.ts:createEarnedBadge(), packages/shared/src/gameplay/rules.ts:createPerkClaim()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 21 symbols; strongest evidence: calls x72, imports x4.
- Paths: `apps/web/src/components/sponsor/SponsorScannerModal.tsx`
- Key Symbols: `SponsorScannerModal()`, `handleVerifyPayload()`, `stopScanner()`, `Date.now`, `html5-qrcode`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-10-0-apps-web`, `subsystem-125-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-108-0-apps-web`, `subsystem-11-0-apps-web`
- Responsibilities: Primary symbols: call_reference x17, function x3.; Internal relations: calls x31, contains x3.
- Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:SponsorScannerModal(), apps/web/src/components/sponsor/SponsorScannerModal.tsx:handleVerifyPayload(), apps/web/src/components/sponsor/SponsorScannerModal.tsx:stopScanner()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 20 symbols; strongest evidence: calls x57, contains x10.
- Paths: `apps/web/src/components/map/geo-utils.ts`
- Key Symbols: `USDC`, `calculateOpenRadius()`, `getChestLandmark()`, `getChestReward()`, `getCompassDirection()`
- Depends On: `subsystem-105-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`
- Depended On By: `subsystem-103-0-apps-web`, `subsystem-16-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-53-0-packages-shared`, `subsystem-58-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-70-0-apps-web`, `subsystem-84-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x11, function x9.; Internal relations: calls x31, contains x9.
- Evidence: apps/web/src/components/map/geo-utils.ts:calculateBearing(), apps/web/src/components/map/geo-utils.ts:calculateOpenRadius(), apps/web/src/components/map/geo-utils.ts:createGeodesicCircle()

### apps/web [MEDIUM]

- Kind: `domain`
- Summary: apps/web is a domain subsystem covering 1 paths and 20 symbols; strongest evidence: calls x73, contains x13.
- Paths: `apps/web/src/features/analytics/sink.ts`
- Key Symbols: `MemoryAnalyticsSink`, `CompositeAnalyticsSink`, `constructor`, `DevLogAnalyticsSink`, `CompositeAnalyticsSink.emit()`
- Depends On: `subsystem-40-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-95-0-apps-web`
- Depended On By: `subsystem-109-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-72-0-apps-web`, `subsystem-76-0-apps-web`, `subsystem-88-0-packages-relayer`, `subsystem-9-0-apps-web`
- Responsibilities: Primary symbols: method x10, call_reference x7.; Internal relations: calls x13, contains x13.
- Evidence: apps/web/src/features/analytics/sink.ts:CompositeAnalyticsSink, apps/web/src/features/analytics/sink.ts:DevLogAnalyticsSink, apps/web/src/features/analytics/sink.ts:MemoryAnalyticsSink

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 19 symbols; strongest evidence: calls x76, contains x4.
- Paths: `apps/web/src/components/quest/QuestTutorialModal.tsx`
- Key Symbols: `QuestTutorialModal()`, `handleApproveAndDeposit()`, `handleClaimBudget()`, `onClose`, `requiredAmountUsdc.toFixed`
- Depends On: `subsystem-10-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-107-0-apps-web`, `subsystem-22-0-apps-web`
- Responsibilities: Primary symbols: call_reference x16, function x3.; Internal relations: calls x29, contains x3.
- Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:QuestTutorialModal(), apps/web/src/components/quest/QuestTutorialModal.tsx:handleApproveAndDeposit(), apps/web/src/components/quest/QuestTutorialModal.tsx:handleClaimBudget()

### apps/web [MEDIUM]

- Kind: `shared_library`
- Summary: apps/web is a shared_library subsystem covering 1 paths and 18 symbols; strongest evidence: calls x126, imports x12.
- Paths: `apps/web/src/app/api/faucet/gas/route.ts`
- Key Symbols: `Math.floor`, `errorResponse`, `@/lib/campus`, `POST`, `headers.get`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-15-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-46-0-apps-web`, `subsystem-53-0-packages-shared`, `subsystem-61-0-apps-web`, `subsystem-72-0-apps-web`, `subsystem-73-0-apps-web`, `subsystem-87-0-apps-web`, `subsystem-9-0-apps-web`
- Responsibilities: Primary symbols: call_reference x15, import_reference x3.; Internal relations: calls x20, imports x3.; Exposes 19 interface candidates.
- Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/campus, apps/web/src/app/api/faucet/gas/route.ts:@/lib/rate-limiter, apps/web/src/app/api/faucet/gas/route.ts:thirdweb/utils

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 18 symbols; strongest evidence: calls x83, imports x8.
- Paths: `apps/web/src/app/api/proofs/location/route.ts`
- Key Symbols: `Math.max`, `Math.min`, `haversineDistanceMeters`, `@/lib/geo`, `isNaN`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-16-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-46-0-apps-web`, `subsystem-53-0-packages-shared`, `subsystem-6-0-packages-shared`, `subsystem-61-0-apps-web`, `subsystem-7-0-apps-web`
- Responsibilities: Primary symbols: call_reference x17, import_reference x1.; Internal relations: calls x22, imports x1.; Exposes 19 interface candidates.
- Evidence: apps/web/src/app/api/proofs/location/route.ts:@/lib/geo, apps/web/src/app/api/proofs/location/route.ts:DEMO, apps/web/src/app/api/proofs/location/route.ts:GUARANTEE

### apps/web [MEDIUM]

- Kind: `adapter`
- Summary: apps/web is a adapter subsystem covering 1 paths and 18 symbols; strongest evidence: calls x40, imports x7.
- Paths: `apps/web/src/lib/proof-signer.ts`
- Key Symbols: `createSignedSponsorQrPayload()`, `getCanonicalDomain()`, `getProofSignerAccount()`, `getProofSignerPrivateKey`, `thirdweb/wallets`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-61-0-apps-web`, `subsystem-97-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-65-0-apps-web`
- Responsibilities: Primary symbols: call_reference x11, function x5.; Internal relations: calls x21, contains x5.; Exposes 2 interface candidates.
- Evidence: apps/web/src/lib/proof-signer.ts:createSignedSponsorQrPayload(), apps/web/src/lib/proof-signer.ts:generateNonce(), apps/web/src/lib/proof-signer.ts:getCanonicalDomain()

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 18 symbols; strongest evidence: calls x138, imports x6.
- Paths: `apps/web/tests/gameplay-config-api.test.ts`
- Key Symbols: `not.toContain`, `not.toBeNull`, `toBeNull`, `afterEach`, `toThrow`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-67-0-apps-web`, `subsystem-73-0-apps-web`, `subsystem-92-0-apps-web`
- Depended On By: `subsystem-14-0-apps-web`, `subsystem-16-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-60-0-packages-shared`, `subsystem-66-0-apps-web`, `subsystem-78-0-apps-web`, `subsystem-83-0-packages-shared`, `subsystem-87-0-apps-web`
- Responsibilities: Primary symbols: call_reference x18.; Internal relations: calls x25.; Exposes 19 interface candidates.
- Evidence: apps/web/tests/gameplay-config-api.test.ts:VersionedGameplayConfigRepository, apps/web/tests/gameplay-config-api.test.ts:activeInstant.getTime, apps/web/tests/gameplay-config-api.test.ts:afterEach

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 17 symbols; strongest evidence: calls x39, contains x4.
- Paths: `apps/web/src/components/map/map-styles.ts`
- Key Symbols: `map`, `setupBasemapLayers()`, `cartoRasterTiles()`, `getCartoLabelsTileUrl()`, `encodeURIComponent`
- Depends On: `subsystem-13-0-apps-web`
- Depended On By: `subsystem-15-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-29-0-apps-web`, `subsystem-44-0-packages-shared`, `subsystem-52-0-apps-web`, `subsystem-54-0-packages-shared`, `subsystem-66-0-apps-web`, `subsystem-7-0-apps-web`
- Responsibilities: Primary symbols: call_reference x12, function x4.; Internal relations: calls x26, contains x4.
- Evidence: apps/web/src/components/map/map-styles.ts:applyMapModeVisibility(), apps/web/src/components/map/map-styles.ts:cartoRasterTiles(), apps/web/src/components/map/map-styles.ts:getCartoLabelsTileUrl()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 17 symbols; strongest evidence: calls x32, contains x4.
- Paths: `apps/web/src/features/gameplay/passport/storage.ts`
- Key Symbols: `loadPassportState()`, `savePassportState()`, `recordPassportEvidence()`, `storageKey()`, `JSON.parse`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-111-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-66-0-apps-web`, `subsystem-82-0-packages-shared`, `subsystem-97-0-apps-web`
- Responsibilities: Primary symbols: call_reference x13, function x4.; Internal relations: calls x17, contains x4.
- Evidence: apps/web/src/features/gameplay/passport/storage.ts:loadPassportState(), apps/web/src/features/gameplay/passport/storage.ts:recordPassportEvidence(), apps/web/src/features/gameplay/passport/storage.ts:savePassportState()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 16 symbols; strongest evidence: calls x1550, imports x20.
- Paths: `apps/web/tests/admin-health.test.ts`
- Key Symbols: `vitest`, `describe`, `expect`, `it`, `toBe`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-14-0-apps-web`, `subsystem-16-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-41-0-apps-web`, `subsystem-43-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-54-0-packages-shared`, `subsystem-59-0-apps-web`, `subsystem-60-0-packages-shared`, `subsystem-66-0-apps-web`, `subsystem-78-0-apps-web`, `subsystem-81-0-packages-shared`, `subsystem-82-0-packages-shared`, `subsystem-83-0-packages-shared`, `subsystem-84-0-packages-shared`, `subsystem-87-0-apps-web`
- Responsibilities: Primary symbols: call_reference x15, import_reference x1.; Internal relations: calls x76, imports x1.
- Evidence: apps/web/tests/admin-health.test.ts:vitest, apps/web/tests/admin-health.test.ts:Telemetry, apps/web/tests/admin-health.test.ts:describe

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 15 symbols; strongest evidence: calls x46, imports x5.
- Paths: `apps/web/src/components/map/ChestBottomSheet.tsx`
- Key Symbols: `ChestBottomSheet()`, `Math.max`, `Math.round`, `getChestLandmark`, `getTypeStyle()`
- Depends On: `subsystem-10-0-apps-web`, `subsystem-105-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-103-0-apps-web`, `subsystem-104-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-50-0-apps-web`, `subsystem-63-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-90-0-apps-web`
- Responsibilities: Primary symbols: call_reference x13, function x2.; Internal relations: calls x15, contains x2.
- Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:ChestBottomSheet(), apps/web/src/components/map/ChestBottomSheet.tsx:getTypeStyle(), apps/web/src/components/map/ChestBottomSheet.tsx:Badge

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 15 symbols; strongest evidence: calls x23, contains x6.
- Paths: `apps/web/src/lib/chains.ts`
- Key Symbols: `thirdweb`, `chain`, `defineChain`, `trimmed.slice`, `formatShortAddress()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-38-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-59-0-apps-web`, `subsystem-65-0-apps-web`
- Responsibilities: Primary symbols: call_reference x8, function x6.; Internal relations: calls x13, contains x6.
- Evidence: apps/web/src/lib/chains.ts:formatShortAddress(), apps/web/src/lib/chains.ts:getAlternativeChain(), apps/web/src/lib/chains.ts:getChainById()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 15 symbols; strongest evidence: calls x209, imports x1.
- Paths: `apps/web/tests/features-modals.test.ts`
- Key Symbols: `calculateOpenRadius`, `floor`, `calculateBalanceTier`, `calculateEnergyMax`, `calculatePowerLevel`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-4-0-apps-web`
- Depended On By: `subsystem-16-0-apps-web`, `subsystem-53-0-packages-shared`, `subsystem-84-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x14, function x1.; Internal relations: calls x26, contains x1.
- Evidence: apps/web/tests/features-modals.test.ts:onCameraPermissionDenied(), apps/web/tests/features-modals.test.ts:Fallback, apps/web/tests/features-modals.test.ts:Flow

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 15 symbols; strongest evidence: calls x196, imports x2.
- Paths: `packages/shared/src/gameplay/schemas.ts`
- Key Symbols: `addDuplicateIssues()`, `addWindowIssue()`, `completedCheckpoints.flatMap`, `context.addIssue`, `datetime`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-39-0-packages-shared`, `subsystem-51-0-apps-web`, `subsystem-55-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-118-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x13, function x2.; Internal relations: calls x89, contains x2.
- Evidence: packages/shared/src/gameplay/schemas.ts:addDuplicateIssues(), packages/shared/src/gameplay/schemas.ts:addWindowIssue(), packages/shared/src/gameplay/schemas.ts:completedCheckpoints.flatMap

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 14 symbols; strongest evidence: calls x34, contains x8.
- Paths: `apps/web/src/features/gameplay/trails/storage.ts`
- Key Symbols: `Number.isFinite`, `latestKey()`, `progressKey()`, `completedCheckpoints.some`, `getBrowserStorage()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-55-0-apps-web`, `subsystem-7-0-apps-web`
- Depended On By: `subsystem-112-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-21-0-packages-shared`
- Responsibilities: Primary symbols: function x8, call_reference x6.; Internal relations: calls x16, contains x8.
- Evidence: apps/web/src/features/gameplay/trails/storage.ts:getBrowserStorage(), apps/web/src/features/gameplay/trails/storage.ts:isTrustedConfirmedCache(), apps/web/src/features/gameplay/trails/storage.ts:latestKey()

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 14 symbols; strongest evidence: calls x49, imports x5.
- Paths: `apps/web/src/lib/campus.ts`
- Key Symbols: `Number`, `chestId.toLowerCase`, `computeH3Cell`, `computeCampaignIdHash()`, `computeChestId()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-58-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-39-0-packages-shared`, `subsystem-5-0-packages-relayer`, `subsystem-64-0-apps-web`, `subsystem-88-0-packages-relayer`
- Responsibilities: Primary symbols: call_reference x9, function x5.; Internal relations: calls x19, contains x5.
- Evidence: apps/web/src/lib/campus.ts:computeCampaignIdHash(), apps/web/src/lib/campus.ts:computeChestId(), apps/web/src/lib/campus.ts:findSlotByChestId()

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 14 symbols; strongest evidence: calls x135, imports x4.
- Paths: `packages/shared/src/env.ts`
- Key Symbols: `min`, `zod`, `int`, `z.string`, `regex`
- Depends On: `subsystem-38-0-apps-web`, `subsystem-52-0-apps-web`
- Depended On By: `subsystem-120-0-packages-shared`, `subsystem-36-0-packages-shared`, `subsystem-53-0-packages-shared`, `subsystem-6-0-packages-shared`, `subsystem-84-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x11, function x2.; Internal relations: calls x16, contains x2.; Exposes 2 interface candidates.
- Evidence: packages/shared/src/env.ts:parsePublicEnv(), packages/shared/src/env.ts:parseServerEnv(), packages/shared/src/env.ts:zod

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 13 symbols; strongest evidence: calls x35, contains x7.
- Paths: `apps/web/src/components/cross-chain/icm-storage.ts`
- Key Symbols: `console.warn`, `isStorageAvailable()`, `@/lib/json`, `storage.setItem`, `getStorage()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-69-0-apps-web`
- Depended On By: `subsystem-102-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-37-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-87-0-apps-web`
- Responsibilities: Primary symbols: function x7, call_reference x5.; Internal relations: calls x19, contains x7.
- Evidence: apps/web/src/components/cross-chain/icm-storage.ts:clearPendingRequest(), apps/web/src/components/cross-chain/icm-storage.ts:getPendingRequest(), apps/web/src/components/cross-chain/icm-storage.ts:getStorage()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 12 symbols; strongest evidence: calls x177, imports x1.
- Paths: `apps/web/tests/icm-modal.test.ts`
- Key Symbols: `toHaveBeenCalledTimes`, `Hydration`, `Structure`, `System`, `Timers`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-14-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-4-0-apps-web`
- Depended On By: `subsystem-16-0-apps-web`
- Responsibilities: Primary symbols: call_reference x12.; Internal relations: calls x12.
- Evidence: apps/web/tests/icm-modal.test.ts:Hydration, apps/web/tests/icm-modal.test.ts:Structure, apps/web/tests/icm-modal.test.ts:System

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 11 symbols; strongest evidence: calls x45, imports x16.
- Paths: `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`
- Key Symbols: `@defi-trail/shared`, `@/components/cross-chain/types`, `Array.isArray`, `reconcileTrailProgressWithEvidence`, `checkReconcileRateLimit`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-67-0-apps-web`
- Depended On By: `subsystem-110-0-apps-web`, `subsystem-113-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-66-0-apps-web`, `subsystem-9-0-apps-web`
- Responsibilities: Primary symbols: call_reference x9, import_reference x2.; Internal relations: calls x10, imports x2.; Exposes 12 interface candidates.
- Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@/components/cross-chain/types, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@defi-trail/shared, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Array.isArray

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 11 symbols; strongest evidence: calls x133, imports x1.
- Paths: `apps/web/tests/wallet.test.ts`
- Key Symbols: `Definitions`, `Formatters`, `Modes`, `SUPPORTED_CHAINS.map`, `Switch`
- Depends On: `subsystem-20-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-65-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x11.; Internal relations: calls x28.
- Evidence: apps/web/tests/wallet.test.ts:Definitions, apps/web/tests/wallet.test.ts:Formatters, apps/web/tests/wallet.test.ts:Modes

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 11 symbols; strongest evidence: calls x17, contains x6.
- Paths: `packages/shared/src/gameplay/scoring.ts`
- Key Symbols: `createTeamScoreEvent()`, `createTeamScoreEventIdentity()`, `encodeIdentityPart()`, `appendTeamScoreEvent()`, `calculateTeamScore()`
- Depends On: `subsystem-15-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-30-0-apps-web`
- Depended On By: `subsystem-118-0-packages-shared`
- Responsibilities: Primary symbols: function x6, call_reference x5.; Internal relations: calls x7, contains x6.
- Evidence: packages/shared/src/gameplay/scoring.ts:appendTeamScoreEvent(), packages/shared/src/gameplay/scoring.ts:calculateTeamScore(), packages/shared/src/gameplay/scoring.ts:createTeamScoreEvent()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 10 symbols; strongest evidence: calls x36, imports x20.
- Paths: `apps/web/src/app/api/admin/analytics/route.ts`
- Key Symbols: `next/server`, `Date`, `@/lib/api-response`, `toISOString`, `GET`
- Depends On: `none`
- Depended On By: `subsystem-13-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-61-0-apps-web`, `subsystem-67-0-apps-web`, `subsystem-72-0-apps-web`, `subsystem-73-0-apps-web`, `subsystem-9-0-apps-web`, `subsystem-92-0-apps-web`, `subsystem-96-0-apps-web`
- Responsibilities: Primary symbols: call_reference x6, import_reference x4.; Internal relations: calls x6, imports x4.; Exposes 11 interface candidates.
- Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/funnel, apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/sink, apps/web/src/app/api/admin/analytics/route.ts:@/lib/api-response

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 10 symbols; strongest evidence: contains x8, calls x7.
- Paths: `apps/web/src/components/cross-chain/relay-moment.ts`
- Key Symbols: `getElapsedSeconds()`, `getRelayLearningCard()`, `toUpperCase`, `getRelayAnnouncement()`, `getRelayMomentStages()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-69-0-apps-web`
- Depended On By: `subsystem-7-0-apps-web`
- Responsibilities: Primary symbols: function x8, call_reference x2.; Internal relations: contains x8, calls x3.
- Evidence: apps/web/src/components/cross-chain/relay-moment.ts:getElapsedSeconds(), apps/web/src/components/cross-chain/relay-moment.ts:getRelayAnnouncement(), apps/web/src/components/cross-chain/relay-moment.ts:getRelayLearningCard()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 10 symbols; strongest evidence: calls x36, imports x4.
- Paths: `apps/web/src/components/wallet/NetworkSwitcher.tsx`
- Key Symbols: `handleQuickSwitch()`, `getBadgeStyle()`, `setIsOpen`, `NetworkSwitcher()`, `SUPPORTED_CHAINS.map`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-62-0-apps-web`, `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: call_reference x7, function x3.; Internal relations: calls x12, contains x3.
- Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:NetworkSwitcher(), apps/web/src/components/wallet/NetworkSwitcher.tsx:getBadgeStyle(), apps/web/src/components/wallet/NetworkSwitcher.tsx:handleQuickSwitch()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 10 symbols; strongest evidence: calls x22, imports x7.
- Paths: `apps/web/src/features/gameplay/passport/PassportClient.tsx`
- Key Symbols: `PassportClient()`, `@/features/analytics`, `getGameplayTracker`, `refresh()`, `address.toLowerCase`
- Depends On: `subsystem-10-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-50-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-11-0-apps-web`
- Responsibilities: Primary symbols: call_reference x7, function x2.; Internal relations: calls x8, contains x2.; Exposes 11 interface candidates.
- Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:PassportClient(), apps/web/src/features/gameplay/passport/PassportClient.tsx:refresh(), apps/web/src/features/gameplay/passport/PassportClient.tsx:@/features/analytics

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 9 symbols; strongest evidence: calls x25, imports x5.
- Paths: `apps/web/src/components/wallet/AddressBadge.tsx`
- Key Symbols: `handleCopy()`, `handleDisconnect()`, `calc`, `setMenuOpen`, `AddressBadge()`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-47-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: call_reference x6, function x3.; Internal relations: calls x9, contains x3.
- Evidence: apps/web/src/components/wallet/AddressBadge.tsx:AddressBadge(), apps/web/src/components/wallet/AddressBadge.tsx:handleCopy(), apps/web/src/components/wallet/AddressBadge.tsx:handleDisconnect()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 9 symbols; strongest evidence: calls x9, imports x6.
- Paths: `apps/web/src/features/gameplay/passport/PassportCollection.tsx`
- Key Symbols: `PassportCollection()`, `statusLabel()`, `./PassportCollection.module.css`, `collection.filter`, `collection.map`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-77-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-48-0-apps-web`
- Responsibilities: Primary symbols: call_reference x6, function x2.; Internal relations: calls x7, contains x2.
- Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:PassportCollection(), apps/web/src/features/gameplay/passport/PassportCollection.tsx:statusLabel(), apps/web/src/features/gameplay/passport/PassportCollection.tsx:./PassportCollection.module.css

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 9 symbols; strongest evidence: calls x15, contains x4.
- Paths: `apps/web/src/features/gameplay/trails/model.ts`
- Key Symbols: `checkpoints.map`, `applyConfirmedEvidence()`, `findEvidenceCheckpointId()`, `createTrailProgress()`, `deriveTrailProgressView()`
- Depends On: `subsystem-55-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `subsystem-112-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-36-0-packages-shared`, `subsystem-37-0-apps-web`, `subsystem-66-0-apps-web`
- Responsibilities: Primary symbols: function x4, call_reference x4.; Internal relations: calls x8, contains x4.; Exposes 10 interface candidates.
- Evidence: apps/web/src/features/gameplay/trails/model.ts:applyConfirmedEvidence(), apps/web/src/features/gameplay/trails/model.ts:createTrailProgress(), apps/web/src/features/gameplay/trails/model.ts:deriveTrailProgressView()

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 9 symbols; strongest evidence: calls x97, imports x4.
- Paths: `apps/web/tests/ge06-relay-moment.test.ts`
- Key Symbols: `node:fs`, `URL`, `not.toMatch`, `every`, `getRelayAnnouncement`
- Depends On: `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-42-0-apps-web`
- Depended On By: `subsystem-39-0-packages-shared`, `subsystem-5-0-packages-relayer`, `subsystem-66-0-apps-web`
- Responsibilities: Primary symbols: call_reference x8, import_reference x1.; Internal relations: calls x18, imports x1.
- Evidence: apps/web/tests/ge06-relay-moment.test.ts:node:fs, apps/web/tests/ge06-relay-moment.test.ts:URL, apps/web/tests/ge06-relay-moment.test.ts:every

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 9 symbols; strongest evidence: calls x32, contains x8.
- Paths: `packages/shared/src/math/progression.ts`
- Key Symbols: `calculateCompassLevel()`, `calculateEnergyMax()`, `getRarityAndApr()`, `calculateStreakTier()`, `calculateBalanceTier()`
- Depends On: `subsystem-122-0-packages-shared`, `subsystem-23-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-39-0-packages-shared`
- Depended On By: `subsystem-121-0-packages-shared`
- Responsibilities: Primary symbols: function x7, call_reference x2.; Internal relations: contains x7, calls x6.
- Evidence: packages/shared/src/math/progression.ts:calculateBalanceTier(), packages/shared/src/math/progression.ts:calculateCompassLevel(), packages/shared/src/math/progression.ts:calculateEnergyMax()

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 9 symbols; strongest evidence: calls x90, contains x4.
- Paths: `packages/shared/tests/gameplay-rules.test.ts`
- Key Symbols: `identityOf()`, `makeEvidence()`, `makeProgress()`, `makeTrail()`, `chestTypes.get`
- Depends On: `subsystem-15-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x5, function x4.; Internal relations: calls x27, contains x4.
- Evidence: packages/shared/tests/gameplay-rules.test.ts:identityOf(), packages/shared/tests/gameplay-rules.test.ts:makeEvidence(), packages/shared/tests/gameplay-rules.test.ts:makeProgress()

### apps/web [MEDIUM]

- Kind: `adapter`
- Summary: apps/web is a adapter subsystem covering 1 paths and 8 symbols; strongest evidence: calls x21, imports x2.
- Paths: `apps/web/src/features/gameplay/passport/trail-integration.ts`
- Key Symbols: `createConfirmedTrailEvidence()`, `Set`, `completedCheckpoints.map`, `completedCheckpoints.filter`, `newCompletions.at`
- Depends On: `subsystem-7-0-apps-web`
- Depended On By: `subsystem-111-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-36-0-packages-shared`, `subsystem-37-0-apps-web`, `subsystem-51-0-apps-web`
- Responsibilities: Primary symbols: call_reference x7, function x1.; Internal relations: calls x7, contains x1.
- Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:createConfirmedTrailEvidence(), apps/web/src/features/gameplay/passport/trail-integration.ts:Set, apps/web/src/features/gameplay/passport/trail-integration.ts:completedCheckpoints.filter

### apps/web [HIGH]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 9 symbols; strongest evidence: imports x16.
- Paths: `apps/web/src/app/page.tsx`
- Key Symbols: `thirdweb/react`, `@/components/cross-chain`, `@/components/position`, `@/components/quest`, `@/components/sponsor`
- Depends On: `none`
- Depended On By: `subsystem-101-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-85-0-apps-web`
- Responsibilities: Primary symbols: import_reference x9.
- Evidence: apps/web/src/app/page.tsx:@/components/cross-chain, apps/web/src/app/page.tsx:@/components/position, apps/web/src/app/page.tsx:@/components/quest

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 7 symbols; strongest evidence: calls x12, imports x6.
- Paths: `apps/web/src/components/wallet/GasBalance.tsx`
- Key Symbols: `chain`, `GasBalance()`, `getChainById`, `isNaN`, `num.toFixed`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-62-0-apps-web`, `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: call_reference x6, function x1.; Internal relations: calls x6, contains x1.
- Evidence: apps/web/src/components/wallet/GasBalance.tsx:GasBalance(), apps/web/src/components/wallet/GasBalance.tsx:chain, apps/web/src/components/wallet/GasBalance.tsx:getChainById

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 7 symbols; strongest evidence: calls x8, imports x3.
- Paths: `apps/web/src/lib/geo.ts`
- Key Symbols: `computeH3Cell()`, `haversineDistanceMeters()`, `h3-js`, `Math.sqrt`, `formula`
- Depends On: `subsystem-23-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-38-0-apps-web`
- Responsibilities: Primary symbols: call_reference x4, function x2.; Internal relations: calls x4, contains x2.
- Evidence: apps/web/src/lib/geo.ts:computeH3Cell(), apps/web/src/lib/geo.ts:haversineDistanceMeters(), apps/web/src/lib/geo.ts:h3-js

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 7 symbols; strongest evidence: calls x246, imports x6.
- Paths: `apps/web/tests/ge04-evidence-reconciliation.test.ts`
- Key Symbols: `createTeamScoreEvent`, `limit`, `logEvidenceReconciliation`, `postReconcile`, `recoverTrailProgressFromStorage`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-19-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-34-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `subsystem-83-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x7.; Internal relations: calls x13.
- Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:createTeamScoreEvent, apps/web/tests/ge04-evidence-reconciliation.test.ts:limit, apps/web/tests/ge04-evidence-reconciliation.test.ts:logEvidenceReconciliation

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 7 symbols; strongest evidence: calls x87, imports x1.
- Paths: `packages/shared/tests/gameplay-analytics.test.ts`
- Key Symbols: `checkpoint`, `dummyWallet.slice`, `dummyWallet.toUpperCase`, `e.includes`, `keys`
- Depends On: `subsystem-14-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-76-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x7.; Internal relations: calls x8.
- Evidence: packages/shared/tests/gameplay-analytics.test.ts:checkpoint, packages/shared/tests/gameplay-analytics.test.ts:dummyWallet.slice, packages/shared/tests/gameplay-analytics.test.ts:dummyWallet.toUpperCase

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 6 symbols; strongest evidence: calls x49, imports x6.
- Paths: `apps/web/src/app/api/proofs/sponsor/route.ts`
- Key Symbols: `computeCampaignIdHash`, `signSponsorProof`, `Chest`, `SponsorProof`, `verifySponsorQrPayload`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-27-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-28-0-apps-web`
- Responsibilities: Primary symbols: call_reference x6.; Internal relations: calls x6.; Exposes 7 interface candidates.
- Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:Chest, apps/web/src/app/api/proofs/sponsor/route.ts:SponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:computeCampaignIdHash

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 6 symbols; strongest evidence: calls x15, imports x9.
- Paths: `apps/web/src/components/wallet/WalletHeader.tsx`
- Key Symbols: `WalletHeader()`, `address`, `Balance`, `indicator`, `menu`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-10-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-89-0-apps-web`, `subsystem-94-0-apps-web`
- Depended On By: `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: call_reference x5, function x1.; Internal relations: calls x6, contains x1.
- Evidence: apps/web/src/components/wallet/WalletHeader.tsx:WalletHeader(), apps/web/src/components/wallet/WalletHeader.tsx:Balance, apps/web/src/components/wallet/WalletHeader.tsx:address

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 6 symbols; strongest evidence: calls x21, imports x4.
- Paths: `apps/web/src/features/gameplay/trails/TodayTrailCard.tsx`
- Key Symbols: `TodayTrailCard()`, `@defi-trail/shared`, `checkpoints.map`, `deriveTrailProgressView`, `StateMessage()`
- Depends On: `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-112-0-apps-web`, `subsystem-18-0-apps-web`
- Responsibilities: Primary symbols: call_reference x3, function x2.; Internal relations: calls x3, contains x2.
- Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:StateMessage(), apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:TodayTrailCard(), apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:@defi-trail/shared

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 6 symbols; strongest evidence: calls x6, contains x4.
- Paths: `apps/web/src/lib/server-env.ts`
- Key Symbols: `getFujiCChainId()`, `getGameL1ChainId()`, `getChestManagerAddress()`, `getProofSignerPrivateKey()`, `addr.startsWith`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-38-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: function x4, call_reference x2.; Internal relations: contains x4, calls x2.; Exposes 7 interface candidates.
- Evidence: apps/web/src/lib/server-env.ts:getChestManagerAddress(), apps/web/src/lib/server-env.ts:getFujiCChainId(), apps/web/src/lib/server-env.ts:getGameL1ChainId()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 6 symbols; strongest evidence: calls x10, imports x3.
- Paths: `apps/web/src/lib/thirdweb.ts`
- Key Symbols: `Wallet`, `thirdweb/react`, `createWallet`, `darkTheme`, `inAppWallet`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-28-0-apps-web`, `subsystem-34-0-apps-web`
- Depended On By: `subsystem-43-0-apps-web`
- Responsibilities: Primary symbols: call_reference x5, import_reference x1.; Internal relations: calls x6, imports x1.
- Evidence: apps/web/src/lib/thirdweb.ts:thirdweb/react, apps/web/src/lib/thirdweb.ts:Wallet, apps/web/src/lib/thirdweb.ts:createWallet

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 6 symbols; strongest evidence: calls x31, imports x3.
- Paths: `apps/web/tests/passport-engine.test.ts`
- Key Symbols: `PASSPORT_BADGES.map`, `badges.filter`, `createConfirmedTrailEvidence`, `getBadgeProgress`, `stampId.startsWith`
- Depends On: `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-30-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-52-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x6.; Internal relations: calls x6.
- Evidence: apps/web/tests/passport-engine.test.ts:PASSPORT_BADGES.map, apps/web/tests/passport-engine.test.ts:badges.filter, apps/web/tests/passport-engine.test.ts:createConfirmedTrailEvidence

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 5 symbols; strongest evidence: calls x14, imports x4.
- Paths: `apps/web/src/app/api/gameplay/seasons/active/route.ts`
- Key Symbols: `@/lib/gameplay/repository`, `getGameplayConfigRepository`, `gameplayErrorResponse`, `gameplayResponse`, `repository.getActiveSeason`
- Depends On: `subsystem-45-0-apps-web`
- Depended On By: `subsystem-29-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-92-0-apps-web`
- Responsibilities: Primary symbols: call_reference x4, import_reference x1.; Internal relations: calls x5, imports x1.; Exposes 6 interface candidates.
- Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:@/lib/gameplay/repository, apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayErrorResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayResponse

### apps/web [HIGH]

- Kind: `adapter`
- Summary: apps/web is a adapter subsystem covering 1 paths and 5 symbols; strongest evidence: contains x5.
- Paths: `apps/web/src/lib/empty-module.ts`
- Key Symbols: `cdpSolanaAccountToSvmSigner()`, `fromCdpSmartWallet()`, `registerExactEvmScheme()`, `registerExactSvmScheme()`, `toClientEvmSigner()`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Primary symbols: function x5.; Internal relations: contains x5.; Exposes 1 interface candidate.
- Evidence: apps/web/src/lib/empty-module.ts:cdpSolanaAccountToSvmSigner(), apps/web/src/lib/empty-module.ts:fromCdpSmartWallet(), apps/web/src/lib/empty-module.ts:registerExactEvmScheme()

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 4 symbols; strongest evidence: imports x7, calls x4.
- Paths: `apps/web/src/components/cross-chain/types.ts`
- Key Symbols: `Messaging`, `RequestStatus`, `localStorage`, `transactions`
- Depends On: `none`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-102-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-46-0-apps-web`
- Responsibilities: Primary symbols: call_reference x4.; Internal relations: calls x4.
- Evidence: apps/web/src/components/cross-chain/types.ts:Messaging, apps/web/src/components/cross-chain/types.ts:RequestStatus, apps/web/src/components/cross-chain/types.ts:localStorage

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 4 symbols; strongest evidence: calls x14, imports x5.
- Paths: `apps/web/src/components/map/VirtualCompass.tsx`
- Key Symbols: `VirtualCompass()`, `component`, `rotate`, `translateY`
- Depends On: `subsystem-10-0-apps-web`, `subsystem-105-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-103-0-apps-web`, `subsystem-104-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-49-0-apps-web`
- Responsibilities: Primary symbols: call_reference x3, function x1.; Internal relations: calls x4, contains x1.
- Evidence: apps/web/src/components/map/VirtualCompass.tsx:VirtualCompass(), apps/web/src/components/map/VirtualCompass.tsx:component, apps/web/src/components/map/VirtualCompass.tsx:rotate

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 4 symbols; strongest evidence: calls x6, imports x4.
- Paths: `apps/web/src/components/wallet/WalletProvider.tsx`
- Key Symbols: `handleUnhandledRejection()`, `WalletProvider()`, `console.debug`, `reloads`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-10-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: function x2, call_reference x2.; Internal relations: calls x2, contains x2.; Exposes 2 interface candidates.
- Evidence: apps/web/src/components/wallet/WalletProvider.tsx:WalletProvider(), apps/web/src/components/wallet/WalletProvider.tsx:handleUnhandledRejection(), apps/web/src/components/wallet/WalletProvider.tsx:console.debug

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 4 symbols; strongest evidence: calls x6, imports x3.
- Paths: `apps/web/src/lib/gameplay/errors.ts`
- Key Symbols: `GameplayConfigError`, `gameplayErrorResponse()`, `GameplayConfigError.super()`, `headers.set`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-15-0-apps-web`
- Responsibilities: Primary symbols: class x1, function x1.; Internal relations: contains x3, calls x3.
- Evidence: apps/web/src/lib/gameplay/errors.ts:GameplayConfigError, apps/web/src/lib/gameplay/errors.ts:gameplayErrorResponse(), apps/web/src/lib/gameplay/errors.ts:GameplayConfigError.super()

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 3 symbols; strongest evidence: calls x16, imports x5.
- Paths: `apps/web/src/app/api/map-config/route.ts`
- Key Symbols: `getDemoCampusConfig`, `hour`, `status`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-87-0-apps-web`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x3.; Exposes 4 interface candidates.
- Evidence: apps/web/src/app/api/map-config/route.ts:getDemoCampusConfig, apps/web/src/app/api/map-config/route.ts:hour, apps/web/src/app/api/map-config/route.ts:status

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: imports x3, calls x1.
- Paths: `apps/web/src/app/layout.tsx`
- Key Symbols: `@/components/wallet/WalletHeader`, `@/components/wallet/WalletProvider`, `RootLayout`
- Depends On: `subsystem-89-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x2, call_reference x1.; Internal relations: imports x2, calls x1.
- Evidence: apps/web/src/app/layout.tsx:@/components/wallet/WalletHeader, apps/web/src/app/layout.tsx:@/components/wallet/WalletProvider, apps/web/src/app/layout.tsx:RootLayout

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: imports x2, calls x1.
- Paths: `apps/web/src/app/passport/page.tsx`
- Key Symbols: `@/features/gameplay/passport/PassportClient`, `next`, `PassportPage`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x2, call_reference x1.; Internal relations: imports x2, calls x1.; Exposes 1 interface candidate.
- Evidence: apps/web/src/app/passport/page.tsx:@/features/gameplay/passport/PassportClient, apps/web/src/app/passport/page.tsx:next, apps/web/src/app/passport/page.tsx:PassportPage

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 3 symbols; strongest evidence: calls x7, imports x3.
- Paths: `apps/web/src/features/analytics/funnel.ts`
- Key Symbols: `calculatePilotFunnel`, `sink.getEvents`, `getPilotFunnelMetrics()`
- Depends On: `subsystem-24-0-apps-web`
- Depended On By: `subsystem-109-0-apps-web`, `subsystem-14-0-apps-web`, `subsystem-60-0-packages-shared`
- Responsibilities: Primary symbols: call_reference x2, function x1.; Internal relations: calls x2, contains x1.
- Evidence: apps/web/src/features/analytics/funnel.ts:getPilotFunnelMetrics(), apps/web/src/features/analytics/funnel.ts:calculatePilotFunnel, apps/web/src/features/analytics/funnel.ts:sink.getEvents

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 3 symbols; strongest evidence: imports x2, contains x2.
- Paths: `apps/web/src/features/gameplay/passport/share.ts`
- Key Symbols: `maskWalletForShare()`, `createPassportShareSnapshot()`, `walletAddress.slice`
- Depends On: `none`
- Depended On By: `subsystem-111-0-apps-web`, `subsystem-50-0-apps-web`
- Responsibilities: Primary symbols: function x2, call_reference x1.; Internal relations: contains x2, calls x2.
- Evidence: apps/web/src/features/gameplay/passport/share.ts:createPassportShareSnapshot(), apps/web/src/features/gameplay/passport/share.ts:maskWalletForShare(), apps/web/src/features/gameplay/passport/share.ts:walletAddress.slice

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 3 symbols; strongest evidence: calls x14, imports x2.
- Paths: `apps/web/tests/passport-privacy.test.ts`
- Key Symbols: `createPassportShareSnapshot`, `not.toHaveProperty`, `toMatchInlineSnapshot`
- Depends On: `subsystem-111-0-apps-web`, `subsystem-13-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x4.
- Evidence: apps/web/tests/passport-privacy.test.ts:createPassportShareSnapshot, apps/web/tests/passport-privacy.test.ts:not.toHaveProperty, apps/web/tests/passport-privacy.test.ts:toMatchInlineSnapshot

### eslint.config.mjs [MEDIUM]

- Kind: `infrastructure`
- Summary: eslint.config.mjs is a infrastructure subsystem covering 1 paths and 3 symbols; strongest evidence: imports x2, calls x1.
- Paths: `eslint.config.mjs`
- Key Symbols: `@eslint/js`, `typescript-eslint`, `tseslint.config`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x2, call_reference x1.; Internal relations: imports x2, calls x1.
- Evidence: eslint.config.mjs:@eslint/js, eslint.config.mjs:typescript-eslint, eslint.config.mjs:tseslint.config

### packages/shared [HIGH]

- Kind: `ui`
- Summary: packages/shared is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: contains x3, imports x2.
- Paths: `packages/shared/src/eip712/schemas.ts`
- Key Symbols: `buildEip712Domain()`, `createLocationProofTypedData()`, `createSponsorProofTypedData()`
- Depends On: `subsystem-122-0-packages-shared`
- Depended On By: `subsystem-117-0-packages-shared`
- Responsibilities: Primary symbols: function x3.; Internal relations: contains x3, calls x2.; Exposes 1 interface candidate.
- Evidence: packages/shared/src/eip712/schemas.ts:buildEip712Domain(), packages/shared/src/eip712/schemas.ts:createLocationProofTypedData(), packages/shared/src/eip712/schemas.ts:createSponsorProofTypedData()

### packages/shared [MEDIUM]

- Kind: `ui`
- Summary: packages/shared is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: calls x60, imports x2.
- Paths: `packages/shared/tests/eip712.test.ts`
- Key Symbols: `buildEip712Domain`, `createLocationProofTypedData`, `createSponsorProofTypedData`
- Depends On: `subsystem-122-0-packages-shared`, `subsystem-20-0-apps-web`, `subsystem-32-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x3.; Exposes 1 interface candidate.
- Evidence: packages/shared/tests/eip712.test.ts:buildEip712Domain, packages/shared/tests/eip712.test.ts:createLocationProofTypedData, packages/shared/tests/eip712.test.ts:createSponsorProofTypedData

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 3 symbols; strongest evidence: calls x33, imports x1.
- Paths: `packages/shared/tests/gameplay-schemas.test.ts`
- Key Symbols: `repeat`, `seasonDefinitionSchema.safeParse`, `trailDefinitionSchema.safeParse`
- Depends On: `subsystem-15-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-32-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x5.
- Evidence: packages/shared/tests/gameplay-schemas.test.ts:repeat, packages/shared/tests/gameplay-schemas.test.ts:seasonDefinitionSchema.safeParse, packages/shared/tests/gameplay-schemas.test.ts:trailDefinitionSchema.safeParse

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 3 symbols; strongest evidence: calls x34, imports x1.
- Paths: `packages/shared/tests/gameplay-scoring.test.ts`
- Key Symbols: `appendTeamScoreEvent`, `calculateTeamScore`, `createTeamScoreEventIdentity`
- Depends On: `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-59-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x5.
- Evidence: packages/shared/tests/gameplay-scoring.test.ts:appendTeamScoreEvent, packages/shared/tests/gameplay-scoring.test.ts:calculateTeamScore, packages/shared/tests/gameplay-scoring.test.ts:createTeamScoreEventIdentity

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 3 symbols; strongest evidence: calls x356, imports x2.
- Paths: `packages/shared/tests/progression.test.ts`
- Key Symbols: `calculateCompassLevel`, `calculateExplorationScore`, `getRarityAndApr`
- Depends On: `subsystem-122-0-packages-shared`, `subsystem-20-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-39-0-packages-shared`
- Depended On By: `none`
- Responsibilities: Primary symbols: call_reference x3.; Internal relations: calls x32.
- Evidence: packages/shared/tests/progression.test.ts:calculateCompassLevel, packages/shared/tests/progression.test.ts:calculateExplorationScore, packages/shared/tests/progression.test.ts:getRarityAndApr

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 2 symbols; strongest evidence: imports x8, calls x4.
- Paths: `apps/web/src/components/wallet/ConnectWalletButton.tsx`
- Key Symbols: `@/lib/thirdweb`, `ConnectWalletButton()`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: function x1, import_reference x1.; Internal relations: imports x1, contains x1.
- Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:ConnectWalletButton(), apps/web/src/components/wallet/ConnectWalletButton.tsx:@/lib/thirdweb, apps/web/src/components/wallet/ConnectWalletButton.tsx:apps/web/src/components/wallet/ConnectWalletButton.tsx

### apps/web [HIGH]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 2 symbols; strongest evidence: imports x9.
- Paths: `apps/web/src/components/wallet/index.ts`
- Key Symbols: `@/lib/chains`, `@/lib/thirdweb`
- Depends On: `subsystem-47-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-94-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x2.; Internal relations: imports x2.
- Evidence: apps/web/src/components/wallet/index.ts:@/lib/chains, apps/web/src/components/wallet/index.ts:@/lib/thirdweb, apps/web/src/components/wallet/index.ts:apps/web/src/components/wallet/index.ts

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 2 symbols; strongest evidence: calls x65, imports x4.
- Paths: `apps/web/tests/json-safe.test.ts`
- Key Symbols: `@/app/api/map-config/route`, `parseSafeJSON`
- Depends On: `subsystem-20-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-32-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-73-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x1, call_reference x1.; Internal relations: calls x14, imports x1.; Exposes 1 interface candidate.
- Evidence: apps/web/tests/json-safe.test.ts:@/app/api/map-config/route, apps/web/tests/json-safe.test.ts:parseSafeJSON, apps/web/tests/json-safe.test.ts:apps/web/tests/json-safe.test.ts

### packages/relayer [MEDIUM]

- Kind: `infrastructure`
- Summary: packages/relayer is a infrastructure subsystem covering 1 paths and 2 symbols; strongest evidence: calls x10, contains x1.
- Paths: `packages/relayer/src/main.ts`
- Key Symbols: `getRelayerConfiguration()`, `url.endsWith`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-38-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: function x1, call_reference x1.; Internal relations: calls x2, contains x1.; Exposes 3 interface candidates.
- Evidence: packages/relayer/src/main.ts:getRelayerConfiguration(), packages/relayer/src/main.ts:url.endsWith, packages/relayer/src/main.ts:packages/relayer/src/main.ts

### apps/web [HIGH]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: imports x30.
- Paths: `apps/web/src/app/admin/health/page.tsx`
- Key Symbols: `react`, `@/lib/chains`, `next/link`
- Depends On: `none`
- Depended On By: `subsystem-10-0-apps-web`, `subsystem-100-0-apps-web`, `subsystem-101-0-apps-web`, `subsystem-104-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-22-0-apps-web`, `subsystem-25-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-47-0-apps-web`, `subsystem-48-0-apps-web`, `subsystem-49-0-apps-web`, `subsystem-50-0-apps-web`, `subsystem-57-0-apps-web`, `subsystem-62-0-apps-web`, `subsystem-63-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-71-0-apps-web`, `subsystem-74-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-85-0-apps-web`, `subsystem-93-0-apps-web`, `subsystem-94-0-apps-web`
- Responsibilities: Primary symbols: import_reference x3.
- Evidence: apps/web/src/app/admin/health/page.tsx:@/lib/chains, apps/web/src/app/admin/health/page.tsx:next/link, apps/web/src/app/admin/health/page.tsx:react

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 3 symbols; strongest evidence: calls x160, contains x3.
- Paths: `apps/web/src/components/map/InteractiveMap.tsx`
- Key Symbols: `InteractiveMap()`, `handleRecenter()`, `handleResize()`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-10-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`
- Depended On By: `subsystem-104-0-apps-web`
- Responsibilities: Primary symbols: function x3.; Internal relations: contains x2.; Exposes 2 interface candidates.
- Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/components/map/InteractiveMap.tsx:handleRecenter(), apps/web/src/components/map/InteractiveMap.tsx:handleResize()

### apps/web [HIGH]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 1 symbols; strongest evidence: imports x1.
- Paths: `apps/web/next.config.ts`
- Key Symbols: `next`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Primary symbols: import_reference x1.; Internal relations: imports x1.
- Evidence: apps/web/next.config.ts:next, apps/web/next.config.ts:apps/web/next.config.ts, apps/web/next.config.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 1 symbols; strongest evidence: calls x7, imports x2.
- Paths: `apps/web/src/app/api/gameplay/trails/today/route.ts`
- Key Symbols: `repository.getTodayTrail`
- Depends On: `subsystem-45-0-apps-web`, `subsystem-67-0-apps-web`
- Depended On By: `subsystem-29-0-apps-web`
- Responsibilities: Primary symbols: call_reference x1.; Internal relations: calls x1.; Exposes 2 interface candidates.
- Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:repository.getTodayTrail, apps/web/src/app/api/gameplay/trails/today/route.ts:apps/web/src/app/api/gameplay/trails/today/route.ts, apps/web/src/app/api/gameplay/trails/today/route.ts:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 1 symbols; strongest evidence: calls x9, imports x3.
- Paths: `apps/web/src/components/map/DemoLocationBanner.tsx`
- Key Symbols: `DemoLocationBanner()`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-103-0-apps-web`, `subsystem-104-0-apps-web`
- Responsibilities: Primary symbols: function x1.; Internal relations: contains x1.
- Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:DemoLocationBanner(), apps/web/src/components/map/DemoLocationBanner.tsx:apps/web/src/components/map/DemoLocationBanner.tsx, apps/web/src/components/map/DemoLocationBanner.tsx:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 1 symbols; strongest evidence: imports x3, calls x2.
- Paths: `apps/web/src/components/wallet/TestnetBanner.tsx`
- Key Symbols: `TestnetBanner()`
- Depends On: `subsystem-3-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `subsystem-62-0-apps-web`, `subsystem-86-0-apps-web`
- Responsibilities: Primary symbols: function x1.; Internal relations: contains x1.
- Evidence: apps/web/src/components/wallet/TestnetBanner.tsx:TestnetBanner(), apps/web/src/components/wallet/TestnetBanner.tsx:apps/web/src/components/wallet/TestnetBanner.tsx, apps/web/src/components/wallet/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 1 symbols; strongest evidence: imports x3, calls x1.
- Paths: `apps/web/src/features/analytics/types.ts`
- Key Symbols: `emit`
- Depends On: `none`
- Depended On By: `subsystem-109-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-24-0-apps-web`
- Responsibilities: Primary symbols: call_reference x1.; Internal relations: calls x1.
- Evidence: apps/web/src/features/analytics/types.ts:emit, apps/web/src/features/analytics/types.ts:apps/web/src/features/analytics/types.ts, apps/web/src/features/analytics/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 1 symbols; strongest evidence: calls x2, imports x1.
- Paths: `apps/web/src/lib/api-response.ts`
- Key Symbols: `errorResponse()`
- Depends On: `subsystem-13-0-apps-web`, `subsystem-45-0-apps-web`
- Depended On By: `none`
- Responsibilities: Primary symbols: function x1.; Internal relations: contains x1.; Exposes 2 interface candidates.
- Evidence: apps/web/src/lib/api-response.ts:errorResponse(), apps/web/src/lib/api-response.ts:apps/web/src/lib/api-response.ts, apps/web/src/lib/api-response.ts:calls

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 1 symbols; strongest evidence: calls x2, imports x1.
- Paths: `apps/web/src/lib/json.ts`
- Key Symbols: `val.trim`
- Depends On: `subsystem-31-0-apps-web`
- Depended On By: `subsystem-28-0-apps-web`
- Responsibilities: Primary symbols: call_reference x1.; Internal relations: calls x1.
- Evidence: apps/web/src/lib/json.ts:val.trim, apps/web/src/lib/json.ts:apps/web/src/lib/json.ts, apps/web/src/lib/json.ts:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 2 symbols; strongest evidence: calls x19, contains x2.
- Paths: `apps/web/src/app/admin/health/page.tsx`
- Key Symbols: `copyToClipboard()`, `renderLatencyBadge()`
- Depends On: `subsystem-3-0-apps-web`
- Depended On By: `subsystem-100-0-apps-web`
- Responsibilities: Primary symbols: function x2.; Exposes 1 interface candidate.
- Evidence: apps/web/src/app/admin/health/page.tsx:copyToClipboard(), apps/web/src/app/admin/health/page.tsx:renderLatencyBadge(), apps/web/src/app/admin/health/page.tsx:calls

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `apps/web/next-env.d.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/next-env.d.ts:apps/web/next-env.d.ts

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: calls x109, imports x3.
- Paths: `apps/web/src/app/admin/health/page.tsx`
- Key Symbols: `none`
- Depends On: `subsystem-3-0-apps-web`, `subsystem-89-0-apps-web`, `subsystem-98-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/app/admin/health/page.tsx:apps/web/src/app/admin/health/page.tsx, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: calls x102, imports x11.
- Paths: `apps/web/src/app/page.tsx`
- Key Symbols: `none`
- Depends On: `subsystem-2-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-56-0-apps-web`, `subsystem-89-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/app/page.tsx:apps/web/src/app/page.tsx, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x4.
- Paths: `apps/web/src/components/cross-chain/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-10-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-40-0-apps-web`, `subsystem-69-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/components/cross-chain/index.ts:apps/web/src/components/cross-chain/index.ts, apps/web/src/components/cross-chain/index.ts:imports, apps/web/src/components/cross-chain/index.ts:imports

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x6.
- Paths: `apps/web/src/components/map/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-104-0-apps-web`, `subsystem-105-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-93-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/components/map/index.ts:apps/web/src/components/map/index.ts, apps/web/src/components/map/index.ts:imports, apps/web/src/components/map/index.ts:imports

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: calls x8, imports x7.
- Paths: `apps/web/src/components/map/InteractiveMap.tsx`
- Key Symbols: `none`
- Depends On: `subsystem-1-0-apps-web`, `subsystem-105-0-apps-web`, `subsystem-125-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-70-0-apps-web`, `subsystem-89-0-apps-web`, `subsystem-90-0-apps-web`, `subsystem-93-0-apps-web`
- Depended On By: `subsystem-103-0-apps-web`
- Responsibilities: none
- Evidence: apps/web/src/components/map/InteractiveMap.tsx:apps/web/src/components/map/InteractiveMap.tsx, apps/web/src/components/map/index.ts:imports, apps/web/src/components/map/InteractiveMap.tsx:calls

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x5.
- Paths: `apps/web/src/components/map/types.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `subsystem-103-0-apps-web`, `subsystem-104-0-apps-web`, `subsystem-23-0-apps-web`, `subsystem-33-0-apps-web`, `subsystem-70-0-apps-web`
- Responsibilities: none
- Evidence: apps/web/src/components/map/types.ts:apps/web/src/components/map/types.ts, apps/web/src/components/map/ChestBottomSheet.tsx:imports, apps/web/src/components/map/geo-utils.ts:imports

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x1.
- Paths: `apps/web/src/components/position/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-8-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/components/position/index.ts:apps/web/src/components/position/index.ts, apps/web/src/components/position/index.ts:imports

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x1.
- Paths: `apps/web/src/components/quest/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-25-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/components/quest/index.ts:apps/web/src/components/quest/index.ts, apps/web/src/components/quest/index.ts:imports

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: imports x1.
- Paths: `apps/web/src/components/sponsor/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-22-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/components/sponsor/index.ts:apps/web/src/components/sponsor/index.ts, apps/web/src/components/sponsor/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: imports x4.
- Paths: `apps/web/src/features/analytics/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-17-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-76-0-apps-web`, `subsystem-95-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/features/analytics/index.ts:apps/web/src/features/analytics/index.ts, apps/web/src/features/analytics/index.ts:imports, apps/web/src/features/analytics/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `apps/web/src/features/gameplay/passport/definitions.ts`
- Key Symbols: `none`
- Depends On: `subsystem-42-0-apps-web`
- Depended On By: `subsystem-111-0-apps-web`
- Responsibilities: none
- Evidence: apps/web/src/features/gameplay/passport/definitions.ts:apps/web/src/features/gameplay/passport/definitions.ts, apps/web/src/features/gameplay/passport/definitions.ts:imports, apps/web/src/features/gameplay/passport/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: imports x6.
- Paths: `apps/web/src/features/gameplay/passport/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-110-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-55-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-77-0-apps-web`
- Depended On By: `subsystem-78-0-apps-web`
- Responsibilities: none
- Evidence: apps/web/src/features/gameplay/passport/index.ts:apps/web/src/features/gameplay/passport/index.ts, apps/web/src/features/gameplay/passport/index.ts:imports, apps/web/src/features/gameplay/passport/index.ts:imports

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: imports x5.
- Paths: `apps/web/src/features/gameplay/trails/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-11-0-apps-web`, `subsystem-37-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-63-0-apps-web`, `subsystem-9-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/features/gameplay/trails/index.ts:apps/web/src/features/gameplay/trails/index.ts, apps/web/src/features/gameplay/trails/index.ts:imports, apps/web/src/features/gameplay/trails/index.ts:imports

### apps/web [MEDIUM]

- Kind: `infrastructure`
- Summary: apps/web is a infrastructure subsystem covering 1 paths and 0 symbols; strongest evidence: imports x1.
- Paths: `apps/web/src/lib/gameplay/config.ts`
- Key Symbols: `none`
- Depends On: `subsystem-42-0-apps-web`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/lib/gameplay/config.ts:apps/web/src/lib/gameplay/config.ts, apps/web/src/lib/gameplay/config.ts:imports

### packages/contracts-l1 [MEDIUM]

- Kind: `module`
- Summary: packages/contracts-l1 is a module subsystem covering 1 paths and 0 symbols; strongest evidence: contains x20, imports x9.
- Paths: `packages/contracts-l1/lib/forge-std/scripts/vm.py`
- Key Symbols: `none`
- Depends On: `subsystem-0-0-packages-contracts-cchain`
- Depended On By: `none`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: packages/contracts-l1/lib/forge-std/scripts/vm.py:packages/contracts-l1/lib/forge-std/scripts/vm.py, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `packages/shared/src/constants/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-116-0-packages-shared`
- Depended On By: `subsystem-120-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/constants/index.ts:packages/shared/src/constants/index.ts, packages/shared/src/constants/index.ts:imports, packages/shared/src/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `packages/shared/src/constants/progression.ts`
- Key Symbols: `none`
- Depends On: `subsystem-122-0-packages-shared`
- Depended On By: `subsystem-115-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/constants/progression.ts:packages/shared/src/constants/progression.ts, packages/shared/src/constants/index.ts:imports, packages/shared/src/constants/progression.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `packages/shared/src/eip712/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-80-0-packages-shared`
- Depended On By: `subsystem-120-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/eip712/index.ts:packages/shared/src/eip712/index.ts, packages/shared/src/eip712/index.ts:imports, packages/shared/src/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x6.
- Paths: `packages/shared/src/gameplay/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-119-0-packages-shared`, `subsystem-21-0-packages-shared`, `subsystem-36-0-packages-shared`, `subsystem-44-0-packages-shared`, `subsystem-6-0-packages-shared`
- Depended On By: `subsystem-120-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/gameplay/index.ts:packages/shared/src/gameplay/index.ts, packages/shared/src/gameplay/index.ts:imports, packages/shared/src/gameplay/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x1.
- Paths: `packages/shared/src/gameplay/types.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `subsystem-118-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/gameplay/types.ts:packages/shared/src/gameplay/types.ts, packages/shared/src/gameplay/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x6.
- Paths: `packages/shared/src/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-115-0-packages-shared`, `subsystem-117-0-packages-shared`, `subsystem-118-0-packages-shared`, `subsystem-121-0-packages-shared`, `subsystem-123-0-packages-shared`, `subsystem-39-0-packages-shared`
- Depended On By: `none`
- Responsibilities: none
- Evidence: packages/shared/src/index.ts:packages/shared/src/index.ts, packages/shared/src/index.ts:imports, packages/shared/src/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `packages/shared/src/math/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-53-0-packages-shared`
- Depended On By: `subsystem-120-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/math/index.ts:packages/shared/src/math/index.ts, packages/shared/src/index.ts:imports, packages/shared/src/math/index.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x6.
- Paths: `packages/shared/src/types/domain.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `subsystem-116-0-packages-shared`, `subsystem-123-0-packages-shared`, `subsystem-53-0-packages-shared`, `subsystem-80-0-packages-shared`, `subsystem-81-0-packages-shared`, `subsystem-84-0-packages-shared`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: packages/shared/src/types/domain.ts:packages/shared/src/types/domain.ts, packages/shared/src/constants/progression.ts:imports, packages/shared/src/eip712/schemas.ts:imports

### packages/shared [MEDIUM]

- Kind: `shared_library`
- Summary: packages/shared is a shared_library subsystem covering 1 paths and 0 symbols; strongest evidence: imports x2.
- Paths: `packages/shared/src/types/index.ts`
- Key Symbols: `none`
- Depends On: `subsystem-122-0-packages-shared`
- Depended On By: `subsystem-120-0-packages-shared`
- Responsibilities: none
- Evidence: packages/shared/src/types/index.ts:packages/shared/src/types/index.ts, packages/shared/src/index.ts:imports, packages/shared/src/types/index.ts:imports

### scripts [MEDIUM]

- Kind: `module`
- Summary: scripts is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `scripts/main.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: scripts/main.ts:scripts/main.ts

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 1 symbols; strongest evidence: imports x2.
- Paths: `apps/web/src/components/map/InteractiveMap.tsx`
- Key Symbols: `@/lib/json`
- Depends On: `none`
- Depended On By: `subsystem-104-0-apps-web`, `subsystem-22-0-apps-web`
- Responsibilities: Primary symbols: import_reference x1.
- Evidence: apps/web/src/components/map/InteractiveMap.tsx:@/lib/json, apps/web/src/components/map/InteractiveMap.tsx:imports, apps/web/src/components/sponsor/SponsorScannerModal.tsx:imports

## Interfaces

- `Cheatcode` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcode.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcode.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_json()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_json(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_json_file()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_json_file(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._dec_indent()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._dec_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._inc_indent()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._inc_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_comment()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_comment(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_indent()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_indented()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_indented(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_items()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_items(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_line()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_line(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_nl()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_nl(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_str()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_str(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._with_indent()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._with_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.finish()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.finish(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_contract()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_contract(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enum()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enum(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enum_variants()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enum_variants(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enums()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enums(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_error()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_error(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_errors()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_errors(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_event()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_event(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_events()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_events(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_function()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_function(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_functions()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_functions(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_prelude()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_prelude(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct_field()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct_field(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct_fields()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct_fields(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_structs()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_structs(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__eq__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__eq__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__gt__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__gt__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__lt__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__lt__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `EnumVariant` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:EnumVariant, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `EnumVariant.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:EnumVariant.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Item` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Item, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.default()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.default(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.get_list()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.get_list(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Mutability` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Mutability, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Mutability.__str__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Mutability.__str__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Path` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Path, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `Struct` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Struct.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Struct.from_dict()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `StructField` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:StructField, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `StructField.__init__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:StructField.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Visibility` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Visibility, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Visibility.__str__()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Visibility.__str__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `argparse` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `argparse.ArgumentParser` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse.ArgumentParser, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `bytes` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `ccs.sort` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ccs.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `cheats.insert` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:cheats.insert, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `cmp_cheatcode()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:cmp_cheatcode(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `copy` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `copy.deepcopy` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy.deepcopy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `decode` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:decode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `enum` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `enumerate` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:enumerate, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `f` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `f.write` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f.write, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `filter` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:filter, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `group()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:group(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `int.from_bytes` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:int.from_bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `isinstance` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:isinstance, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `json` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `json.load` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.load, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `json.loads` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.loads, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `len` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:len, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `line.lstrip` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:line.lstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `list` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:list, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `m.group` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:m.group, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `main()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:main(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains
- `map` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:map, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `memory_to_calldata()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:memory_to_calldata(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `name.strip` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:name.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `open` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:open, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `packages/contracts-cchain/lib/forge-std/scripts/vm.py` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:packages/contracts-cchain/lib/forge-std/scripts/vm.py, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains
- `parser.add_argument` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.add_argument, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `parser.parse_args` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.parse_args, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `pathlib` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pathlib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `pp.finish` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.finish, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_contract` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_contract, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_prelude` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `prefix_with_group_headers()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:prefix_with_group_headers(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `print` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:print, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `range` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:range, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `re` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `re.sub` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.sub, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `re.subn` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.subn, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read_text` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `request.urlopen` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:request.urlopen, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `rstrip` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:rstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.add` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.add, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.split` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.split, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.strip` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `safe.sort` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:safe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._dec_indent` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._dec_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._inc_indent` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._inc_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_comment` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_comment, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_indent` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_indented` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indented, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_items` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_items, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_line` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_line, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_nl` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_nl, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_str` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._with_indent` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._with_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum_variants` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum_variants, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enums` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enums, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_error` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_error, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_errors` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_errors, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_event` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_event, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_events` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_events, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_function` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_function, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_functions` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_functions, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_prelude` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_field` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_field, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_fields` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_fields, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_structs` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_structs, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `set` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:set, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `str` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `subprocess` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `subprocess.run` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess.run, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `test_path.read_text` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `test_path.write_text` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.write_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `typing` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:typing, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `unsafe.sort` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:unsafe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `update_interface_ids()` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:update_interface_ids(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `upper` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:upper, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `urllib` [HIGH] in `subsystem-0-0-packages-contracts-cchain` as `entrypoint` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:urllib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `handleBackdropClick()` [HIGH] in `subsystem-10-0-apps-web` as `cli` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`.
  Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:handleBackdropClick(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:contains
- `truncateHash()` [HIGH] in `subsystem-10-0-apps-web` as `cli` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`.
  Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:truncateHash(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `AbortController` [HIGH] in `subsystem-11-0-apps-web` as `route` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`.
  Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:AbortController, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `controller.abort` [HIGH] in `subsystem-11-0-apps-web` as `route` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`.
  Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:controller.abort, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `packages/contracts-l1/lib/forge-std/scripts/vm.py` [HIGH] in `subsystem-114-0-packages-contracts-l1` as `entrypoint` from `packages/contracts-l1/lib/forge-std/scripts/vm.py`.
  Evidence: packages/contracts-l1/lib/forge-std/scripts/vm.py:packages/contracts-l1/lib/forge-std/scripts/vm.py, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `packages/shared/src/types/domain.ts` [HIGH] in `subsystem-122-0-packages-shared` as `cli` from `packages/shared/src/types/domain.ts`.
  Evidence: packages/shared/src/types/domain.ts:packages/shared/src/types/domain.ts, packages/shared/src/constants/progression.ts:imports, packages/shared/src/eip712/schemas.ts:imports
- `scripts/main.ts` [HIGH] in `subsystem-124-0-scripts` as `entrypoint` from `scripts/main.ts`.
  Evidence: scripts/main.ts:scripts/main.ts
- `@/lib/proof-signer` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:@/lib/proof-signer, apps/web/src/app/api/admin/health/route.ts:imports, apps/web/src/app/api/proofs/location/route.ts:imports
- `AbortController` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:AbortController, apps/web/src/app/api/admin/health/route.ts:calls
- `BigInt` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:BigInt, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `Date.now` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:Date.now, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `JSON.stringify` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:JSON.stringify, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `NextResponse.json` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:NextResponse.json, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `Promise.all` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:Promise.all, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/scripts/seed.ts:calls
- `Relayer` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:Relayer, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/src/main.ts:calls
- `apps/web/src/app/api/admin/health/route.ts` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:apps/web/src/app/api/admin/health/route.ts, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `balance` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:balance, apps/web/src/app/api/admin/health/route.ts:calls
- `clearTimeout` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:clearTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `controller.abort` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:controller.abort, apps/web/src/app/api/admin/health/route.ts:calls
- `epoch` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:epoch, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `fetch` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:fetch, apps/web/src/app/api/admin/health/route.ts:calls
- `formatTokenUnits()` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:formatTokenUnits(), apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `formatWeiToEtherString()` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:formatWeiToEtherString(), apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `fraction.toString` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:fraction.toString, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `getProofSignerAccount` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:getProofSignerAccount, apps/web/src/app/api/admin/health/route.ts:calls
- `hexAmount.startsWith` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:hexAmount.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `hexWei.startsWith` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:hexWei.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `padStart` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:padStart, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `parseFloat` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:parseFloat, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `parseInt` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:parseInt, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `principalBudget` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:principalBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `queryRpcWithLatency` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:queryRpcWithLatency, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `questBudget` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:questBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `res.json` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:res.json, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/tests/api.test.ts:calls
- `setTimeout` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:setTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `sponsorPoolAddress.startsWith` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:sponsorPoolAddress.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `totalNum.toFixed` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:totalNum.toFixed, apps/web/src/app/api/admin/health/route.ts:calls
- `trim` [HIGH] in `subsystem-13-0-apps-web` as `route` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:trim, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `rewardReserve` [MEDIUM] in `subsystem-13-0-apps-web` as `cli` from `apps/web/src/app/api/admin/health/route.ts`.
  Evidence: apps/web/src/app/api/admin/health/route.ts:rewardReserve, apps/web/src/app/api/admin/health/route.ts:calls
- `@/app/api/admin/analytics/route` [HIGH] in `subsystem-14-0-apps-web` as `route` from `apps/web/tests/ge07-analytics-funnel.test.ts`.
  Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:@/app/api/admin/analytics/route, apps/web/tests/ge07-analytics-funnel.test.ts:imports
- `GameplayConfigError` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:GameplayConfigError, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `Number.isSafeInteger` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:Number.isSafeInteger, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- `VersionedGameplayConfigRepository` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:VersionedGameplayConfigRepository, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:contains
- `apps/web/src/lib/gameplay/repository.ts` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:apps/web/src/lib/gameplay/repository.ts, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `assertUniqueIds()` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:assertUniqueIds(), apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `assertValidDate()` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:assertValidDate(), apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:contains
- `at.getTime` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:at.getTime, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `at.toISOString` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:at.toISOString, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `checkpointSlots.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:checkpointSlots.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `getActiveSeason` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:getActiveSeason, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `getGameplayConfigRepository()` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:getGameplayConfigRepository(), apps/web/src/lib/gameplay/repository.ts:contains
- `getTodayTrail` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:getTodayTrail, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `resolveTrail()` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:resolveTrail(), apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `resolvedTrails.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:resolvedTrails.map, apps/web/src/lib/gameplay/repository.ts:calls
- `seasonDefinitionSchema.parse` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:seasonDefinitionSchema.parse, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `seasonIds.has` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:seasonIds.has, apps/web/src/lib/gameplay/repository.ts:calls
- `seasons.filter` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:seasons.filter, apps/web/src/lib/gameplay/repository.ts:calls
- `seasons.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:seasons.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `slots.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:slots.map, apps/web/src/lib/gameplay/repository.ts:calls
- `slotsByNumber.get` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:slotsByNumber.get, apps/web/src/lib/gameplay/repository.ts:calls
- `this.getActiveSeason` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:this.getActiveSeason, apps/web/src/lib/gameplay/repository.ts:calls
- `this.loadCampusConfig` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:this.loadCampusConfig, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `trailDefinitionSchema.parse` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:trailDefinitionSchema.parse, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `trailIds.includes` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:trailIds.includes, apps/web/src/lib/gameplay/repository.ts:calls
- `trails.filter` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:trails.filter, apps/web/src/lib/gameplay/repository.ts:calls
- `trails.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:trails.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `trailsById.get` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:trailsById.get, apps/web/src/lib/gameplay/repository.ts:calls
- `validateActiveWindow` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:validateActiveWindow, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `values.map` [MEDIUM] in `subsystem-15-0-apps-web` as `database` from `apps/web/src/lib/gameplay/repository.ts`.
  Evidence: apps/web/src/lib/gameplay/repository.ts:values.map, apps/web/src/lib/gameplay/repository.ts:calls
- `runIcmSimulation` [MEDIUM] in `subsystem-2-0-apps-web` as `cli` from `apps/web/src/app/page.tsx`.
  Evidence: apps/web/src/app/page.tsx:runIcmSimulation, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setMainTab` [MEDIUM] in `subsystem-2-0-apps-web` as `cli` from `apps/web/src/app/page.tsx`.
  Evidence: apps/web/src/app/page.tsx:setMainTab, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `Conformance` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:Conformance, apps/web/tests/api.test.ts:calls
- `NextRequest` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:NextRequest, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `accuracy` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:accuracy, apps/web/tests/api.test.ts:calls
- `apps/web/tests/api.test.ts` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:apps/web/tests/api.test.ts, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `beforeEach` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:beforeEach, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `code` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:code, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `createSignedSponsorQrPayload` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:createSignedSponsorQrPayload, apps/web/tests/api.test.ts:calls
- `getMapConfig` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:getMapConfig, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `postFaucetGas` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:postFaucetGas, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postLocationProof` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:postLocationProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postSponsorProof` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:postSponsorProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `radius` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:radius, apps/web/tests/api.test.ts:calls
- `res1.json` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:res1.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res2.json` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:res2.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res3.json` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:res3.json, apps/web/tests/api.test.ts:calls
- `resetRateLimits` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:resetRateLimits, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `slots` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:slots, apps/web/tests/api.test.ts:calls
- `testWallet.toLowerCase` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:testWallet.toLowerCase, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `timestamp` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:timestamp, apps/web/tests/api.test.ts:calls
- `toBeGreaterThan` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:toBeGreaterThan, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toBeUndefined` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:toBeUndefined, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `toEqual` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:toEqual, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `toHaveLength` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:toHaveLength, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `valid` [HIGH] in `subsystem-20-0-apps-web` as `route` from `apps/web/tests/api.test.ts`.
  Evidence: apps/web/tests/api.test.ts:valid, apps/web/tests/api.test.ts:calls
- `@/lib/campus` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/campus, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/map-config/route.ts:imports
- `@/lib/rate-limiter` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/rate-limiter, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `Math.floor` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:Math.floor, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `POST` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:POST, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `apps/web/src/app/api/faucet/gas/route.ts` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:apps/web/src/app/api/faucet/gas/route.ts, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `check` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:check, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `checkFaucetRateLimit` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:checkFaucetRateLimit, apps/web/src/app/api/faucet/gas/route.ts:calls
- `encodePacked` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:encodePacked, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `errorResponse` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:errorResponse, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `getCurrentEpoch` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:getCurrentEpoch, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `headers.get` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:headers.get, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `keccak256` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:keccak256, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `recordFaucetClaim` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:recordFaucetClaim, apps/web/src/app/api/faucet/gas/route.ts:calls
- `req.json` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:req.json, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `split` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:split, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `test` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:test, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `thirdweb/utils` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:thirdweb/utils, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/lib/campus.ts:imports
- `up` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:up, apps/web/src/app/api/faucet/gas/route.ts:calls
- `wallet.toLowerCase` [HIGH] in `subsystem-26-0-apps-web` as `route` from `apps/web/src/app/api/faucet/gas/route.ts`.
  Evidence: apps/web/src/app/api/faucet/gas/route.ts:wallet.toLowerCase, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `@/lib/geo` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:@/lib/geo, apps/web/src/app/api/proofs/location/route.ts:imports, apps/web/src/app/api/proofs/sponsor/route.ts:imports
- `DEMO` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:DEMO, apps/web/src/app/api/proofs/location/route.ts:calls
- `GUARANTEE` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:GUARANTEE, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.abs` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.abs, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.max` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.max, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.min` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.min, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `accuracyMeters.toFixed` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:accuracyMeters.toFixed, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/app/api/proofs/location/route.ts` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:apps/web/src/app/api/proofs/location/route.ts, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `clock` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:clock, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `constraints` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:constraints, apps/web/src/app/api/proofs/location/route.ts:calls
- `coordinates` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:coordinates, apps/web/src/app/api/proofs/location/route.ts:calls
- `findSlotByChestId` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:findSlotByChestId, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `generateNonce` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:generateNonce, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `haversineDistanceMeters` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:haversineDistanceMeters, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `isNaN` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:isNaN, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `lifetime` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:lifetime, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `low` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:low, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `m` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:m, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `signLocationProof` [HIGH] in `subsystem-27-0-apps-web` as `route` from `apps/web/src/app/api/proofs/location/route.ts`.
  Evidence: apps/web/src/app/api/proofs/location/route.ts:signLocationProof, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `createThirdwebClient` [HIGH] in `subsystem-28-0-apps-web` as `cli` from `apps/web/src/lib/proof-signer.ts`.
  Evidence: apps/web/src/lib/proof-signer.ts:createThirdwebClient, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/thirdweb.ts:calls
- `getCanonicalDomain()` [HIGH] in `subsystem-28-0-apps-web` as `cli` from `apps/web/src/lib/proof-signer.ts`.
  Evidence: apps/web/src/lib/proof-signer.ts:getCanonicalDomain(), apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `VersionedGameplayConfigRepository` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:VersionedGameplayConfigRepository, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `activeInstant.getTime` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:activeInstant.getTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `afterEach` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:afterEach, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `apps/web/tests/gameplay-config-api.test.ts` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:apps/web/tests/gameplay-config-api.test.ts, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `json` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:json, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `mockReturnValue` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:mockReturnValue, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `not.toBeNull` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `not.toContain` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toContain, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `seasonResponse.json` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:seasonResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `slots.slice` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:slots.slice, apps/web/tests/gameplay-config-api.test.ts:calls
- `toBeNull` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toMatchObject` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:toMatchObject, apps/web/tests/gameplay-config-api.test.ts:calls
- `toThrow` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:toThrow, apps/web/tests/gameplay-config-api.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `trailResponse.json` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:trailResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.restoreAllMocks` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.restoreAllMocks, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `vi.setSystemTime` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.setSystemTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.spyOn` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.spyOn, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.useFakeTimers` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useFakeTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.useRealTimers` [HIGH] in `subsystem-29-0-apps-web` as `route` from `apps/web/tests/gameplay-config-api.test.ts`.
  Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useRealTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `clipboard.writeText` [HIGH] in `subsystem-3-0-apps-web` as `cli` from `apps/web/src/app/admin/health/page.tsx`.
  Evidence: apps/web/src/app/admin/health/page.tsx:clipboard.writeText, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `Reserve` [MEDIUM] in `subsystem-3-0-apps-web` as `cli` from `apps/web/src/app/admin/health/page.tsx`.
  Evidence: apps/web/src/app/admin/health/page.tsx:Reserve, apps/web/src/app/admin/health/page.tsx:calls
- `parseServerEnv()` [MEDIUM] in `subsystem-39-0-packages-shared` as `cli` from `packages/shared/src/env.ts`.
  Evidence: packages/shared/src/env.ts:parseServerEnv(), packages/shared/src/env.ts:contains
- `serverEnvSchema.parse` [MEDIUM] in `subsystem-39-0-packages-shared` as `cli` from `packages/shared/src/env.ts`.
  Evidence: packages/shared/src/env.ts:serverEnvSchema.parse, packages/shared/src/env.ts:calls
- `@/components/cross-chain/types` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@/components/cross-chain/types, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports, apps/web/src/features/gameplay/trails/evidence-adapter.ts:imports
- `@defi-trail/shared` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@defi-trail/shared, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports, apps/web/src/features/analytics/sink.ts:imports
- `Array.isArray` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Array.isArray, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `Enforcement` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Enforcement, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:apps/web/src/app/api/gameplay/trails/reconcile/route.ts, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `checkReconcileRateLimit` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:checkReconcileRateLimit, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `items.push` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:items.push, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `mapRequestStatusToLifecycle` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapRequestStatusToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `mapUIStateToLifecycle` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapUIStateToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `reconcileTrailProgressWithEvidence` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:reconcileTrailProgressWithEvidence, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `recordReconcileRequest` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:recordReconcileRequest, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `repo.getTodayTrail` [HIGH] in `subsystem-42-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:repo.getTodayTrail, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `@/features/analytics/funnel` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/funnel, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/features/analytics/sink` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/sink, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/lib/api-response` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/lib/api-response, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/faucet/gas/route.ts:imports
- `Date` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:Date, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `GET` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:GET, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `apps/web/src/app/api/admin/analytics/route.ts` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:apps/web/src/app/api/admin/analytics/route.ts, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/analytics/route.ts:calls
- `getPilotFunnelMetrics` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:getPilotFunnelMetrics, apps/web/src/app/api/admin/analytics/route.ts:calls
- `globalMemoryAnalyticsSink.getEvents` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:globalMemoryAnalyticsSink.getEvents, apps/web/src/app/api/admin/analytics/route.ts:calls
- `next/server` [HIGH] in `subsystem-45-0-apps-web` as `cli` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:next/server, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/admin/health/route.ts:imports
- `successResponse` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:successResponse, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `toISOString` [HIGH] in `subsystem-45-0-apps-web` as `route` from `apps/web/src/app/api/admin/analytics/route.ts`.
  Evidence: apps/web/src/app/api/admin/analytics/route.ts:toISOString, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `@/features/analytics` [HIGH] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:@/features/analytics, apps/web/src/features/gameplay/passport/PassportClient.tsx:imports, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports
- `PassportClient()` [HIGH] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:PassportClient(), apps/web/src/features/gameplay/passport/PassportClient.tsx:contains, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `apps/web/src/features/gameplay/passport/PassportClient.tsx` [HIGH] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:apps/web/src/features/gameplay/passport/PassportClient.tsx, apps/web/src/features/gameplay/passport/PassportClient.tsx:contains, apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `getGameplayTracker` [HIGH] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:getGameplayTracker, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `address.toLowerCase` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:address.toLowerCase, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `createEmptyPassportState` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:createEmptyPassportState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `evaluatePassport` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:evaluatePassport, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `loadPassportState` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:loadPassportState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `refresh()` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:refresh(), apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:contains
- `setState` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:setState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `trackPassportViewed` [MEDIUM] in `subsystem-48-0-apps-web` as `cli` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`.
  Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:trackPassportViewed, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `Budgets` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:Budgets, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `MOCK_USDC_ADDRESS.startsWith` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:MOCK_USDC_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `SPONSOR_POOL_ADDRESS.startsWith` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:SPONSOR_POOL_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `Seeding` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:Seeding, packages/relayer/scripts/seed.ts:calls
- `Signer` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:Signer, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `SponsorPool` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:SponsorPool, packages/relayer/scripts/seed.ts:calls
- `SponsorPool.fundAll` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:SponsorPool.fundAll, packages/relayer/scripts/seed.ts:calls
- `address.startsWith` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:address.startsWith, packages/relayer/scripts/seed.ts:calls
- `budget` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:budget, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `console.error` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:console.error, packages/relayer/scripts/seed.ts:calls
- `content.split` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:content.split, packages/relayer/scripts/seed.ts:calls
- `createPublicClient` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:createPublicClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `createWalletClient` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:createWalletClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `endsWith` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:endsWith, packages/relayer/scripts/seed.ts:calls
- `ensureGasOnChain` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:ensureGasOnChain, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formatEther` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:formatEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formatUnits` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:formatUnits, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fs.existsSync` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:fs.existsSync, packages/relayer/scripts/seed.ts:calls
- `fs.readFileSync` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:fs.readFileSync, packages/relayer/scripts/seed.ts:calls
- `fujiPublicClient.readContract` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.readContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiPublicClient.waitForTransactionReceipt` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiWalletClient.writeContract` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:fujiWalletClient.writeContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `gas` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:gas, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `http` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:http, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `line.trim` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:line.trim, packages/relayer/scripts/seed.ts:calls
- `loadEnvFile()` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:loadEnvFile(), packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `main` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:main, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `node:path` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:node:path, packages/relayer/scripts/seed.ts:imports
- `packages/relayer/scripts/seed.ts` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:packages/relayer/scripts/seed.ts, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `parseEther` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:parseEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `path.resolve` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:path.resolve, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `process.cwd` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:process.cwd, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `process.exit` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:process.exit, packages/relayer/scripts/seed.ts:calls
- `publicClient.getBalance` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:publicClient.getBalance, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `publicClient.waitForTransactionReceipt` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:publicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls
- `replace` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:replace, packages/relayer/scripts/seed.ts:calls
- `reserve` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:reserve, packages/relayer/scripts/seed.ts:calls
- `trimmed.indexOf` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:trimmed.indexOf, packages/relayer/scripts/seed.ts:calls
- `trimmed.startsWith` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:trimmed.startsWith, packages/relayer/scripts/seed.ts:calls
- `viem/accounts` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:viem/accounts, packages/relayer/scripts/seed.ts:imports
- `viem/chains` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:viem/chains, packages/relayer/scripts/seed.ts:imports
- `walletClient.sendTransaction` [HIGH] in `subsystem-5-0-packages-relayer` as `entrypoint` from `packages/relayer/scripts/seed.ts`.
  Evidence: packages/relayer/scripts/seed.ts:walletClient.sendTransaction, packages/relayer/scripts/seed.ts:calls
- `@/components/cross-chain` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:@/components/cross-chain, apps/web/src/features/gameplay/trails/model.ts:imports
- `PENDING_ICM_STATES.has` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:PENDING_ICM_STATES.has, apps/web/src/features/gameplay/trails/model.ts:calls
- `applyConfirmedEvidence()` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:applyConfirmedEvidence(), apps/web/src/features/gameplay/trails/model.ts:contains, apps/web/src/features/gameplay/trails/model.ts:calls
- `apps/web/src/features/gameplay/trails/model.ts` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:apps/web/src/features/gameplay/trails/model.ts, apps/web/src/features/gameplay/trails/index.ts:imports, apps/web/src/features/gameplay/trails/model.ts:calls
- `checkpoints.find` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:checkpoints.find, apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/model.ts:calls
- `checkpoints.map` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:checkpoints.map, apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `confirmedIds.has` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:confirmedIds.has, apps/web/src/features/gameplay/trails/model.ts:calls
- `createTrailProgress()` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:createTrailProgress(), apps/web/src/features/gameplay/trails/model.ts:contains
- `deriveTrailProgressView()` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:deriveTrailProgressView(), apps/web/src/features/gameplay/trails/model.ts:contains
- `findEvidenceCheckpointId()` [MEDIUM] in `subsystem-51-0-apps-web` as `database` from `apps/web/src/features/gameplay/trails/model.ts`.
  Evidence: apps/web/src/features/gameplay/trails/model.ts:findEvidenceCheckpointId(), apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/model.ts:contains
- `Chest` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:Chest, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `SponsorProof` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:SponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/app/api/proofs/sponsor/route.ts` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:apps/web/src/app/api/proofs/sponsor/route.ts, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `computeCampaignIdHash` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:computeCampaignIdHash, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `signSponsorProof` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:signSponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `verifySponsorQrPayload` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:verifySponsorQrPayload, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `window` [HIGH] in `subsystem-61-0-apps-web` as `route` from `apps/web/src/app/api/proofs/sponsor/route.ts`.
  Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:window, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/lib/server-env.ts` [HIGH] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:apps/web/src/lib/server-env.ts, apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- `getFujiCChainId()` [HIGH] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:getFujiCChainId(), apps/web/src/lib/server-env.ts:contains, apps/web/src/lib/server-env.ts:calls
- `getGameL1ChainId()` [HIGH] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:getGameL1ChainId(), apps/web/src/lib/server-env.ts:contains, apps/web/src/lib/server-env.ts:calls
- `addr.startsWith` [MEDIUM] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:addr.startsWith, apps/web/src/lib/server-env.ts:calls
- `envKey.startsWith` [MEDIUM] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:envKey.startsWith, apps/web/src/lib/server-env.ts:calls
- `getChestManagerAddress()` [MEDIUM] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:getChestManagerAddress(), apps/web/src/lib/server-env.ts:contains
- `getProofSignerPrivateKey()` [MEDIUM] in `subsystem-64-0-apps-web` as `cli` from `apps/web/src/lib/server-env.ts`.
  Evidence: apps/web/src/lib/server-env.ts:getProofSignerPrivateKey(), apps/web/src/lib/server-env.ts:contains
- `@/lib/gameplay/repository` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:@/lib/gameplay/repository, apps/web/src/app/api/gameplay/seasons/active/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `apps/web/src/app/api/gameplay/seasons/active/route.ts` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:apps/web/src/app/api/gameplay/seasons/active/route.ts, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `gameplayErrorResponse` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayErrorResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `gameplayResponse` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `getGameplayConfigRepository` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:getGameplayConfigRepository, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `repository.getActiveSeason` [HIGH] in `subsystem-67-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:repository.getActiveSeason, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `toClientEvmSigner()` [MEDIUM] in `subsystem-68-0-apps-web` as `cli` from `apps/web/src/lib/empty-module.ts`.
  Evidence: apps/web/src/lib/empty-module.ts:toClientEvmSigner(), apps/web/src/lib/empty-module.ts:contains
- `stableGameplayId()` [MEDIUM] in `subsystem-7-0-apps-web` as `database` from `apps/web/src/features/gameplay/passport/engine.ts`.
  Evidence: apps/web/src/features/gameplay/passport/engine.ts:stableGameplayId(), apps/web/src/features/gameplay/passport/engine.ts:contains, apps/web/src/features/gameplay/passport/trail-integration.ts:contains
- `apps/web/src/components/wallet/WalletProvider.tsx` [MEDIUM] in `subsystem-71-0-apps-web` as `service` from `apps/web/src/components/wallet/WalletProvider.tsx`.
  Evidence: apps/web/src/components/wallet/WalletProvider.tsx:apps/web/src/components/wallet/WalletProvider.tsx, apps/web/src/components/wallet/index.ts:imports, apps/web/src/components/wallet/WalletProvider.tsx:calls
- `handleUnhandledRejection()` [MEDIUM] in `subsystem-71-0-apps-web` as `service` from `apps/web/src/components/wallet/WalletProvider.tsx`.
  Evidence: apps/web/src/components/wallet/WalletProvider.tsx:handleUnhandledRejection(), apps/web/src/components/wallet/WalletProvider.tsx:contains, apps/web/src/components/wallet/WalletProvider.tsx:calls
- `apps/web/src/app/api/map-config/route.ts` [HIGH] in `subsystem-73-0-apps-web` as `route` from `apps/web/src/app/api/map-config/route.ts`.
  Evidence: apps/web/src/app/api/map-config/route.ts:apps/web/src/app/api/map-config/route.ts, apps/web/src/app/api/map-config/route.ts:calls, apps/web/src/app/api/map-config/route.ts:calls
- `getDemoCampusConfig` [HIGH] in `subsystem-73-0-apps-web` as `route` from `apps/web/src/app/api/map-config/route.ts`.
  Evidence: apps/web/src/app/api/map-config/route.ts:getDemoCampusConfig, apps/web/src/app/api/map-config/route.ts:calls, apps/web/tests/api.test.ts:calls
- `hour` [HIGH] in `subsystem-73-0-apps-web` as `route` from `apps/web/src/app/api/map-config/route.ts`.
  Evidence: apps/web/src/app/api/map-config/route.ts:hour, apps/web/src/app/api/map-config/route.ts:calls
- `status` [HIGH] in `subsystem-73-0-apps-web` as `route` from `apps/web/src/app/api/map-config/route.ts`.
  Evidence: apps/web/src/app/api/map-config/route.ts:status, apps/web/src/app/api/map-config/route.ts:calls
- `@/features/gameplay/passport/PassportClient` [MEDIUM] in `subsystem-75-0-apps-web` as `cli` from `apps/web/src/app/passport/page.tsx`.
  Evidence: apps/web/src/app/passport/page.tsx:@/features/gameplay/passport/PassportClient, apps/web/src/app/passport/page.tsx:imports
- `remainingAssets.toFixed` [MEDIUM] in `subsystem-8-0-apps-web` as `cli` from `apps/web/src/components/position/PositionView.tsx`.
  Evidence: apps/web/src/components/position/PositionView.tsx:remainingAssets.toFixed, apps/web/src/components/position/PositionView.tsx:calls
- `buildEip712Domain()` [MEDIUM] in `subsystem-80-0-packages-shared` as `cli` from `packages/shared/src/eip712/schemas.ts`.
  Evidence: packages/shared/src/eip712/schemas.ts:buildEip712Domain(), packages/shared/src/eip712/schemas.ts:calls, packages/shared/src/eip712/schemas.ts:calls
- `buildEip712Domain` [MEDIUM] in `subsystem-81-0-packages-shared` as `cli` from `packages/shared/tests/eip712.test.ts`.
  Evidence: packages/shared/tests/eip712.test.ts:buildEip712Domain, packages/shared/tests/eip712.test.ts:calls
- `@/app/api/map-config/route` [HIGH] in `subsystem-87-0-apps-web` as `route` from `apps/web/tests/json-safe.test.ts`.
  Evidence: apps/web/tests/json-safe.test.ts:@/app/api/map-config/route, apps/web/tests/json-safe.test.ts:imports
- `getRelayerConfiguration()` [HIGH] in `subsystem-88-0-packages-relayer` as `entrypoint` from `packages/relayer/src/main.ts`.
  Evidence: packages/relayer/src/main.ts:getRelayerConfiguration(), packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:contains
- `packages/relayer/src/main.ts` [HIGH] in `subsystem-88-0-packages-relayer` as `entrypoint` from `packages/relayer/src/main.ts`.
  Evidence: packages/relayer/src/main.ts:packages/relayer/src/main.ts, packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- `url.endsWith` [HIGH] in `subsystem-88-0-packages-relayer` as `entrypoint` from `packages/relayer/src/main.ts`.
  Evidence: packages/relayer/src/main.ts:url.endsWith, packages/relayer/src/main.ts:calls
- `handleRecenter()` [HIGH] in `subsystem-90-0-apps-web` as `route` from `apps/web/src/components/map/InteractiveMap.tsx`.
  Evidence: apps/web/src/components/map/InteractiveMap.tsx:handleRecenter(), apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:contains
- `handleResize()` [HIGH] in `subsystem-90-0-apps-web` as `route` from `apps/web/src/components/map/InteractiveMap.tsx`.
  Evidence: apps/web/src/components/map/InteractiveMap.tsx:handleResize(), apps/web/src/components/map/InteractiveMap.tsx:contains
- `apps/web/src/app/api/gameplay/trails/today/route.ts` [HIGH] in `subsystem-92-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/today/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:apps/web/src/app/api/gameplay/trails/today/route.ts, apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `repository.getTodayTrail` [HIGH] in `subsystem-92-0-apps-web` as `route` from `apps/web/src/app/api/gameplay/trails/today/route.ts`.
  Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:repository.getTodayTrail, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `apps/web/src/lib/api-response.ts` [HIGH] in `subsystem-96-0-apps-web` as `route` from `apps/web/src/lib/api-response.ts`.
  Evidence: apps/web/src/lib/api-response.ts:apps/web/src/lib/api-response.ts, apps/web/src/lib/api-response.ts:calls, apps/web/src/lib/api-response.ts:calls
- `errorResponse()` [HIGH] in `subsystem-96-0-apps-web` as `route` from `apps/web/src/lib/api-response.ts`.
  Evidence: apps/web/src/lib/api-response.ts:errorResponse(), apps/web/src/lib/api-response.ts:contains
- `copyToClipboard()` [HIGH] in `subsystem-98-0-apps-web` as `cli` from `apps/web/src/app/admin/health/page.tsx`.
  Evidence: apps/web/src/app/admin/health/page.tsx:copyToClipboard(), apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls

## Key Flows

- `subsystem-10-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `subsystem-10-0-apps-web` -> `subsystem-25-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-10-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x40 Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `subsystem-10-0-apps-web` -> `subsystem-4-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:imports
- `subsystem-10-0-apps-web` -> `subsystem-69-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:imports
- `subsystem-10-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:imports
- `subsystem-100-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x100 Evidence: apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `subsystem-100-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x3 Evidence: apps/web/src/app/admin/health/page.tsx:imports, apps/web/src/app/admin/health/page.tsx:imports, apps/web/src/app/admin/health/page.tsx:imports
- `subsystem-100-0-apps-web` -> `subsystem-98-0-apps-web` [HIGH] via `calls`: calls x9, contains x2 Evidence: apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `subsystem-101-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x75 Evidence: apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `subsystem-101-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x27 Evidence: apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `subsystem-101-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x9 Evidence: apps/web/src/app/page.tsx:imports, apps/web/src/app/page.tsx:imports, apps/web/src/app/page.tsx:imports
- `subsystem-101-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/app/page.tsx:imports, apps/web/src/app/page.tsx:imports
- `subsystem-102-0-apps-web` -> `subsystem-10-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/index.ts:imports
- `subsystem-102-0-apps-web` -> `subsystem-4-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/index.ts:imports
- `subsystem-102-0-apps-web` -> `subsystem-40-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/index.ts:imports
- `subsystem-102-0-apps-web` -> `subsystem-69-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-104-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-105-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-23-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-33-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-70-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-103-0-apps-web` -> `subsystem-93-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/index.ts:imports
- `subsystem-104-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-104-0-apps-web` -> `subsystem-105-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-104-0-apps-web` -> `subsystem-125-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-104-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-104-0-apps-web` -> `subsystem-33-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-104-0-apps-web` -> `subsystem-70-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-104-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-104-0-apps-web` -> `subsystem-90-0-apps-web` [HIGH] via `contains`: contains x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:contains
- `subsystem-104-0-apps-web` -> `subsystem-93-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:imports
- `subsystem-106-0-apps-web` -> `subsystem-8-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/position/index.ts:imports
- `subsystem-107-0-apps-web` -> `subsystem-25-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/quest/index.ts:imports
- `subsystem-108-0-apps-web` -> `subsystem-22-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/sponsor/index.ts:imports
- `subsystem-109-0-apps-web` -> `subsystem-17-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/index.ts:imports
- `subsystem-109-0-apps-web` -> `subsystem-24-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/index.ts:imports
- `subsystem-109-0-apps-web` -> `subsystem-76-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/index.ts:imports
- `subsystem-109-0-apps-web` -> `subsystem-95-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/index.ts:imports
- `subsystem-11-0-apps-web` -> `subsystem-22-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `subsystem-11-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x11 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `subsystem-11-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `subsystem-11-0-apps-web` -> `subsystem-48-0-apps-web` [HIGH] via `calls`: calls x6, imports x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `subsystem-11-0-apps-web` -> `subsystem-8-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `subsystem-11-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports
- `subsystem-110-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/definitions.ts:imports
- `subsystem-111-0-apps-web` -> `subsystem-110-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/index.ts:imports
- `subsystem-111-0-apps-web` -> `subsystem-31-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/index.ts:imports
- `subsystem-111-0-apps-web` -> `subsystem-55-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/index.ts:imports
- `subsystem-111-0-apps-web` -> `subsystem-7-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/index.ts:imports
- `subsystem-111-0-apps-web` -> `subsystem-77-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/index.ts:imports
- `subsystem-112-0-apps-web` -> `subsystem-11-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/index.ts:imports
- `subsystem-112-0-apps-web` -> `subsystem-37-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/index.ts:imports
- `subsystem-112-0-apps-web` -> `subsystem-51-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/index.ts:imports
- `subsystem-112-0-apps-web` -> `subsystem-63-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/index.ts:imports
- `subsystem-112-0-apps-web` -> `subsystem-9-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/index.ts:imports
- `subsystem-113-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/lib/gameplay/config.ts:imports
- `subsystem-114-0-packages-contracts-l1` -> `subsystem-0-0-packages-contracts-cchain` [HIGH] via `contains`: contains x20, imports x9 Evidence: packages/contracts-l1/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `subsystem-115-0-packages-shared` -> `subsystem-116-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/constants/index.ts:imports
- `subsystem-116-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/constants/progression.ts:imports
- `subsystem-117-0-packages-shared` -> `subsystem-80-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/eip712/index.ts:imports
- `subsystem-118-0-packages-shared` -> `subsystem-119-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/gameplay/index.ts:imports
- `subsystem-118-0-packages-shared` -> `subsystem-21-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/gameplay/index.ts:imports
- `subsystem-118-0-packages-shared` -> `subsystem-36-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/gameplay/index.ts:imports
- `subsystem-118-0-packages-shared` -> `subsystem-44-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/gameplay/index.ts:imports
- `subsystem-118-0-packages-shared` -> `subsystem-6-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/gameplay/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-115-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-117-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-118-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-121-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-123-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-120-0-packages-shared` -> `subsystem-39-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/index.ts:imports
- `subsystem-121-0-packages-shared` -> `subsystem-53-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/math/index.ts:imports
- `subsystem-123-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/types/index.ts:imports
- `subsystem-13-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `calls`: calls x3, imports x1 Evidence: apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x9 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x79, imports x1 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-14-0-apps-web` -> `subsystem-76-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-24-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-37-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-55-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `subsystem-15-0-apps-web` -> `subsystem-72-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/lib/gameplay/repository.ts:imports
- `subsystem-16-0-apps-web` -> `subsystem-14-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x187, imports x1 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-35-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-16-0-apps-web` -> `subsystem-41-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `subsystem-17-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/analytics/tracker.ts:calls
- `subsystem-17-0-apps-web` -> `subsystem-24-0-apps-web` [MEDIUM] via `calls`: imports x1, calls x1 Evidence: apps/web/src/features/analytics/tracker.ts:imports, apps/web/src/features/analytics/tracker.ts:calls
- `subsystem-17-0-apps-web` -> `subsystem-40-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls
- `subsystem-17-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls
- `subsystem-17-0-apps-web` -> `subsystem-95-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/tracker.ts:imports
- `subsystem-18-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/trail-ui.test.tsx:calls
- `subsystem-18-0-apps-web` -> `subsystem-11-0-apps-web` [LOW] via `calls`: calls x6 Evidence: apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls
- `subsystem-18-0-apps-web` -> `subsystem-63-0-apps-web` [HIGH] via `calls`: calls x7, imports x1 Evidence: apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls
- `subsystem-19-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `subsystem-19-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `subsystem-19-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `subsystem-19-0-apps-web` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x35 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-19-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-26-0-apps-web` [MEDIUM] via `calls`: calls x9, imports x1 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-27-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-28-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x157, imports x1 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-34-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/api.test.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-38-0-apps-web` [MEDIUM] via `calls`: imports x1, calls x1 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x12 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `subsystem-20-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-58-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-61-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/api.test.ts:imports
- `subsystem-20-0-apps-web` -> `subsystem-73-0-apps-web` [MEDIUM] via `calls`: calls x7, imports x1 Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `subsystem-21-0-packages-shared` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/rules.ts:calls
- `subsystem-21-0-packages-shared` -> `subsystem-37-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `subsystem-21-0-packages-shared` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `subsystem-21-0-packages-shared` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x6 Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `subsystem-22-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-10-0-apps-web` [HIGH] via `calls`: calls x5, contains x1 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-125-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:imports
- `subsystem-22-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-25-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x26 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-8-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `subsystem-22-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:imports
- `subsystem-23-0-apps-web` -> `subsystem-105-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/geo-utils.ts:imports
- `subsystem-23-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/map/geo-utils.ts:calls, packages/shared/src/math/progression.ts:calls
- `subsystem-23-0-apps-web` -> `subsystem-27-0-apps-web` [HIGH] via `calls`: calls x4, imports x1 Evidence: apps/web/src/components/map/geo-utils.ts:calls, apps/web/src/components/map/geo-utils.ts:imports, apps/web/src/components/map/geo-utils.ts:calls
- `subsystem-24-0-apps-web` -> `subsystem-40-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/analytics/sink.ts:calls
- `subsystem-24-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/sink.ts:imports
- `subsystem-24-0-apps-web` -> `subsystem-95-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/analytics/sink.ts:imports
- `subsystem-25-0-apps-web` -> `subsystem-10-0-apps-web` [HIGH] via `calls`: calls x4, contains x1 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `subsystem-25-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `subsystem-25-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x31 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `subsystem-25-0-apps-web` -> `subsystem-8-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `subsystem-25-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:imports
- `subsystem-26-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x5 Evidence: apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `subsystem-26-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/faucet/gas/route.ts:imports
- `subsystem-27-0-apps-web` -> `subsystem-13-0-apps-web` [HIGH] via `calls`: calls x2, imports x1 Evidence: apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:imports
- `subsystem-27-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x20, imports x1 Evidence: apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `subsystem-27-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/app/api/proofs/location/route.ts:imports, apps/web/src/app/api/proofs/location/route.ts:imports
- `subsystem-28-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x6 Evidence: apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-34-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/lib/proof-signer.ts:imports
- `subsystem-28-0-apps-web` -> `subsystem-38-0-apps-web` [MEDIUM] via `calls`: calls x6, imports x1 Evidence: apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-61-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `subsystem-28-0-apps-web` -> `subsystem-97-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/lib/proof-signer.ts:imports
- `subsystem-29-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-15-0-apps-web` [MEDIUM] via `calls`: calls x6, imports x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x42, imports x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-38-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:imports
- `subsystem-29-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-51-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls
- `subsystem-29-0-apps-web` -> `subsystem-67-0-apps-web` [MEDIUM] via `calls`: calls x2, imports x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:imports
- `subsystem-29-0-apps-web` -> `subsystem-73-0-apps-web` [MEDIUM] via `calls`: imports x1, calls x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:imports
- `subsystem-29-0-apps-web` -> `subsystem-92-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/gameplay-config-api.test.ts:imports
- `subsystem-30-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/map/map-styles.ts:calls
- `subsystem-31-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls
- `subsystem-31-0-apps-web` -> `subsystem-42-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls
- `subsystem-31-0-apps-web` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls
- `subsystem-32-0-apps-web` -> `subsystem-13-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/admin-health.test.ts:imports
- `subsystem-32-0-apps-web` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- `subsystem-32-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- `subsystem-32-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/admin-health.test.ts:calls
- `subsystem-33-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `subsystem-33-0-apps-web` -> `subsystem-105-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:imports
- `subsystem-33-0-apps-web` -> `subsystem-23-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:imports
- `subsystem-33-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x16 Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `subsystem-33-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:imports
- `subsystem-34-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls
- `subsystem-34-0-apps-web` -> `subsystem-38-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/chains.ts:calls
- `subsystem-35-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `subsystem-35-0-apps-web` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/features-modals.test.ts:calls
- `subsystem-35-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `subsystem-35-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x87, imports x1 Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `subsystem-35-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x14 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-39-0-packages-shared` [HIGH] via `calls`: calls x50, imports x1 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-51-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-55-0-apps-web` [LOW] via `calls`: calls x5 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-6-0-packages-shared` [LOW] via `calls`: calls x34 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-36-0-packages-shared` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `subsystem-37-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `subsystem-37-0-apps-web` -> `subsystem-40-0-apps-web` [HIGH] via `calls`: calls x4, imports x1 Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `subsystem-37-0-apps-web` -> `subsystem-51-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls
- `subsystem-37-0-apps-web` -> `subsystem-55-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `subsystem-37-0-apps-web` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x5 Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `subsystem-38-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x7 Evidence: apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls
- `subsystem-38-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x9, imports x1 Evidence: apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls
- `subsystem-38-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/campus.ts:calls
- `subsystem-38-0-apps-web` -> `subsystem-58-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/lib/campus.ts:imports
- `subsystem-39-0-packages-shared` -> `subsystem-38-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/env.ts:calls
- `subsystem-39-0-packages-shared` -> `subsystem-52-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `subsystem-4-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x5 Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `subsystem-4-0-apps-web` -> `subsystem-40-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `subsystem-4-0-apps-web` -> `subsystem-69-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:imports
- `subsystem-40-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/cross-chain/icm-storage.ts:calls, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `subsystem-40-0-apps-web` -> `subsystem-69-0-apps-web` [MEDIUM] via `imports`: imports x2 Evidence: apps/web/src/components/cross-chain/icm-storage.ts:imports, apps/web/src/components/cross-chain/icm-storage.ts:imports
- `subsystem-41-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-14-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x6 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x10 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x107, imports x1 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-41-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x32 Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `subsystem-42-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `subsystem-42-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x10, imports x1 Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `subsystem-42-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `calls`: calls x6, imports x2 Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `subsystem-42-0-apps-web` -> `subsystem-67-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `subsystem-43-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls
- `subsystem-43-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x100, imports x1 Evidence: apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls
- `subsystem-43-0-apps-web` -> `subsystem-65-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls
- `subsystem-44-0-packages-shared` -> `subsystem-15-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- `subsystem-44-0-packages-shared` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/scoring.ts:calls
- `subsystem-44-0-packages-shared` -> `subsystem-21-0-packages-shared` [MEDIUM] via `calls`: calls x4, imports x1 Evidence: packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:imports, packages/shared/src/gameplay/scoring.ts:calls
- `subsystem-44-0-packages-shared` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- `subsystem-46-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- `subsystem-46-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- `subsystem-46-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- `subsystem-46-0-apps-web` -> `subsystem-69-0-apps-web` [MEDIUM] via `imports`: imports x2 Evidence: apps/web/src/components/cross-chain/relay-moment.ts:imports, apps/web/src/components/cross-chain/relay-moment.ts:imports
- `subsystem-47-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x17 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-49-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:imports
- `subsystem-47-0-apps-web` -> `subsystem-70-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-8-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `subsystem-47-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:imports
- `subsystem-48-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `subsystem-48-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `subsystem-48-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `subsystem-48-0-apps-web` -> `subsystem-31-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `subsystem-48-0-apps-web` -> `subsystem-50-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `subsystem-48-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `subsystem-48-0-apps-web` -> `subsystem-7-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `subsystem-48-0-apps-web` -> `subsystem-8-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `subsystem-48-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `subsystem-49-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `subsystem-49-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x12 Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `subsystem-49-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/AddressBadge.tsx:imports
- `subsystem-49-0-apps-web` -> `subsystem-70-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls
- `subsystem-49-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/components/wallet/AddressBadge.tsx:imports, apps/web/src/components/wallet/AddressBadge.tsx:imports
- `subsystem-5-0-packages-relayer` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x8 Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-24-0-apps-web` [LOW] via `calls`: calls x50 Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-28-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-34-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-38-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-40-0-apps-web` [LOW] via `calls`: calls x4 Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `subsystem-5-0-packages-relayer` -> `subsystem-52-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: packages/relayer/scripts/seed.ts:imports
- `subsystem-50-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- `subsystem-50-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- `subsystem-50-0-apps-web` -> `subsystem-7-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:imports
- `subsystem-50-0-apps-web` -> `subsystem-77-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:imports
- `subsystem-50-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:imports, apps/web/src/features/gameplay/passport/PassportCollection.tsx:imports
- `subsystem-51-0-apps-web` -> `subsystem-55-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/model.ts:calls
- `subsystem-51-0-apps-web` -> `subsystem-9-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/model.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x9 Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x55, imports x1 Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `subsystem-52-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/tests/ge06-relay-moment.test.ts:imports
- `subsystem-53-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/math/progression.ts:imports
- `subsystem-53-0-packages-shared` -> `subsystem-23-0-apps-web` [HIGH] via `calls`: calls x5, contains x1 Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- `subsystem-53-0-packages-shared` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x9 Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- `subsystem-53-0-packages-shared` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x9 Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- `subsystem-53-0-packages-shared` -> `subsystem-35-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/math/progression.ts:calls
- `subsystem-53-0-packages-shared` -> `subsystem-39-0-packages-shared` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-15-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x4 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x45, imports x1 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-54-0-packages-shared` -> `subsystem-9-0-apps-web` [LOW] via `calls`: calls x8 Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `subsystem-55-0-apps-web` -> `subsystem-7-0-apps-web` [HIGH] via `calls`: calls x2, imports x1 Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:contains, apps/web/src/features/gameplay/passport/trail-integration.ts:imports, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `subsystem-57-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls
- `subsystem-57-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls
- `subsystem-57-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/GasBalance.tsx:imports
- `subsystem-57-0-apps-web` -> `subsystem-85-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/GasBalance.tsx:imports
- `subsystem-57-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/components/wallet/GasBalance.tsx:imports, apps/web/src/components/wallet/GasBalance.tsx:imports
- `subsystem-58-0-apps-web` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/lib/geo.ts:calls, apps/web/src/lib/geo.ts:calls, apps/web/src/lib/geo.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x9 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-19-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x22 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x7 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x166, imports x1 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-34-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `calls`: calls x11, imports x4 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-59-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:imports
- `subsystem-59-0-apps-web` -> `subsystem-9-0-apps-web` [LOW] via `calls`: calls x6 Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-19-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-39-0-packages-shared` [HIGH] via `calls`: calls x63, imports x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-42-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-6-0-packages-shared` -> `subsystem-9-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/src/gameplay/analytics.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-14-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x14 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x60, imports x1 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-60-0-packages-shared` -> `subsystem-76-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `subsystem-61-0-apps-web` -> `subsystem-13-0-apps-web` [HIGH] via `calls`: calls x2, imports x1 Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:imports
- `subsystem-61-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x23, imports x1 Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `subsystem-61-0-apps-web` -> `subsystem-27-0-apps-web` [HIGH] via `calls`: calls x16, imports x1 Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `subsystem-61-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:imports, apps/web/src/app/api/proofs/sponsor/route.ts:imports
- `subsystem-62-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `subsystem-62-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls
- `subsystem-62-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls
- `subsystem-62-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `subsystem-62-0-apps-web` -> `subsystem-47-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-49-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-57-0-apps-web` [MEDIUM] via `calls`: imports x1, calls x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-85-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports, apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-62-0-apps-web` -> `subsystem-94-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletHeader.tsx:imports
- `subsystem-63-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x10 Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls
- `subsystem-63-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls
- `subsystem-63-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:imports
- `subsystem-64-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- `subsystem-64-0-apps-web` -> `subsystem-38-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- `subsystem-65-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/thirdweb.ts:calls
- `subsystem-65-0-apps-web` -> `subsystem-28-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/src/lib/thirdweb.ts:calls, apps/web/src/lib/thirdweb.ts:imports
- `subsystem-65-0-apps-web` -> `subsystem-34-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/lib/thirdweb.ts:imports
- `subsystem-66-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x5 Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-31-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x12, imports x1 Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:imports
- `subsystem-66-0-apps-web` -> `subsystem-51-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/passport-engine.test.ts:imports
- `subsystem-66-0-apps-web` -> `subsystem-52-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-engine.test.ts:calls
- `subsystem-66-0-apps-web` -> `subsystem-9-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-engine.test.ts:calls
- `subsystem-67-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `subsystem-7-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/engine.ts:calls
- `subsystem-7-0-apps-web` -> `subsystem-17-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `subsystem-7-0-apps-web` -> `subsystem-27-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- `subsystem-7-0-apps-web` -> `subsystem-30-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- `subsystem-7-0-apps-web` -> `subsystem-46-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- `subsystem-70-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls
- `subsystem-70-0-apps-web` -> `subsystem-105-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/VirtualCompass.tsx:imports
- `subsystem-70-0-apps-web` -> `subsystem-23-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/map/VirtualCompass.tsx:imports
- `subsystem-70-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- `subsystem-70-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x4 Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- `subsystem-70-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/map/VirtualCompass.tsx:imports
- `subsystem-71-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls
- `subsystem-71-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls, apps/web/src/components/wallet/WalletProvider.tsx:calls
- `subsystem-71-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls
- `subsystem-71-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:imports
- `subsystem-71-0-apps-web` -> `subsystem-85-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:imports
- `subsystem-71-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/WalletProvider.tsx:imports
- `subsystem-72-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- `subsystem-72-0-apps-web` -> `subsystem-24-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- `subsystem-72-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- `subsystem-72-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/lib/gameplay/errors.ts:imports, apps/web/src/lib/gameplay/errors.ts:imports
- `subsystem-73-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/app/api/map-config/route.ts:calls
- `subsystem-73-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/src/app/api/map-config/route.ts:calls, apps/web/src/app/api/map-config/route.ts:imports
- `subsystem-73-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x2, calls x1 Evidence: apps/web/src/app/api/map-config/route.ts:calls, apps/web/src/app/api/map-config/route.ts:imports, apps/web/src/app/api/map-config/route.ts:imports
- `subsystem-74-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/app/layout.tsx:imports
- `subsystem-76-0-apps-web` -> `subsystem-24-0-apps-web` [MEDIUM] via `imports`: imports x2 Evidence: apps/web/src/features/analytics/funnel.ts:imports, apps/web/src/features/analytics/funnel.ts:imports
- `subsystem-78-0-apps-web` -> `subsystem-111-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/tests/passport-privacy.test.ts:imports
- `subsystem-78-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-privacy.test.ts:calls
- `subsystem-78-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/passport-privacy.test.ts:calls
- `subsystem-78-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x8, imports x1 Evidence: apps/web/tests/passport-privacy.test.ts:calls, apps/web/tests/passport-privacy.test.ts:calls, apps/web/tests/passport-privacy.test.ts:calls
- `subsystem-8-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `subsystem-8-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `subsystem-8-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/position/PositionView.tsx:calls
- `subsystem-8-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x29 Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `subsystem-8-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x6 Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `subsystem-8-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/position/PositionView.tsx:imports
- `subsystem-80-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/src/eip712/schemas.ts:imports
- `subsystem-81-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/tests/eip712.test.ts:imports
- `subsystem-81-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/tests/eip712.test.ts:calls, packages/shared/tests/eip712.test.ts:calls
- `subsystem-81-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x55, imports x1 Evidence: packages/shared/tests/eip712.test.ts:calls, packages/shared/tests/eip712.test.ts:calls, packages/shared/tests/eip712.test.ts:calls
- `subsystem-82-0-packages-shared` -> `subsystem-15-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `subsystem-82-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `subsystem-82-0-packages-shared` -> `subsystem-31-0-apps-web` [LOW] via `calls`: calls x3 Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `subsystem-82-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x21, imports x1 Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `subsystem-83-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls
- `subsystem-83-0-packages-shared` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x6 Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `subsystem-83-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x16, imports x1 Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `subsystem-83-0-packages-shared` -> `subsystem-59-0-apps-web` [LOW] via `calls`: calls x6 Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `subsystem-84-0-packages-shared` -> `subsystem-122-0-packages-shared` [MEDIUM] via `imports`: imports x1 Evidence: packages/shared/tests/progression.test.ts:imports
- `subsystem-84-0-packages-shared` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x9 Evidence: packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `subsystem-84-0-packages-shared` -> `subsystem-23-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/progression.test.ts:calls
- `subsystem-84-0-packages-shared` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x236, imports x1 Evidence: packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `subsystem-84-0-packages-shared` -> `subsystem-35-0-apps-web` [LOW] via `calls`: calls x77 Evidence: packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `subsystem-84-0-packages-shared` -> `subsystem-39-0-packages-shared` [LOW] via `calls`: calls x1 Evidence: packages/shared/tests/progression.test.ts:calls
- `subsystem-85-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:calls, apps/web/src/components/wallet/ConnectWalletButton.tsx:calls
- `subsystem-85-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:calls, apps/web/src/components/wallet/ConnectWalletButton.tsx:calls
- `subsystem-85-0-apps-web` -> `subsystem-56-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:imports
- `subsystem-85-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x2 Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:imports, apps/web/src/components/wallet/ConnectWalletButton.tsx:imports
- `subsystem-86-0-apps-web` -> `subsystem-47-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-49-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-57-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-62-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-71-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-85-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-86-0-apps-web` -> `subsystem-94-0-apps-web` [MEDIUM] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/index.ts:imports
- `subsystem-87-0-apps-web` -> `subsystem-20-0-apps-web` [LOW] via `calls`: calls x7 Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- `subsystem-87-0-apps-web` -> `subsystem-26-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:imports
- `subsystem-87-0-apps-web` -> `subsystem-29-0-apps-web` [LOW] via `calls`: calls x7 Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- `subsystem-87-0-apps-web` -> `subsystem-32-0-apps-web` [HIGH] via `calls`: calls x33, imports x1 Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- `subsystem-87-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/tests/json-safe.test.ts:calls
- `subsystem-87-0-apps-web` -> `subsystem-40-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/tests/json-safe.test.ts:imports
- `subsystem-87-0-apps-web` -> `subsystem-73-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- `subsystem-88-0-packages-relayer` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- `subsystem-88-0-packages-relayer` -> `subsystem-24-0-apps-web` [LOW] via `calls`: calls x5 Evidence: packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- `subsystem-88-0-packages-relayer` -> `subsystem-38-0-apps-web` [LOW] via `calls`: calls x1 Evidence: packages/relayer/src/main.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-24-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-26-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-4-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-42-0-apps-web` [HIGH] via `calls`: calls x1, imports x1 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:imports
- `subsystem-9-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-9-0-apps-web` -> `subsystem-7-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `subsystem-90-0-apps-web` -> `subsystem-1-0-apps-web` [LOW] via `calls`: calls x117 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-90-0-apps-web` -> `subsystem-10-0-apps-web` [LOW] via `calls`: calls x3 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-90-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x9 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-90-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x30 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-90-0-apps-web` -> `subsystem-33-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls
- `subsystem-92-0-apps-web` -> `subsystem-45-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `subsystem-92-0-apps-web` -> `subsystem-67-0-apps-web` [HIGH] via `calls`: calls x4, imports x1 Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `subsystem-93-0-apps-web` -> `subsystem-2-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:calls
- `subsystem-93-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x8 Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls
- `subsystem-93-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:imports
- `subsystem-94-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/components/wallet/TestnetBanner.tsx:calls, apps/web/src/components/wallet/TestnetBanner.tsx:calls
- `subsystem-94-0-apps-web` -> `subsystem-89-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/components/wallet/TestnetBanner.tsx:imports
- `subsystem-96-0-apps-web` -> `subsystem-13-0-apps-web` [LOW] via `calls`: calls x2 Evidence: apps/web/src/lib/api-response.ts:calls, apps/web/src/lib/api-response.ts:calls
- `subsystem-96-0-apps-web` -> `subsystem-45-0-apps-web` [HIGH] via `imports`: imports x1 Evidence: apps/web/src/lib/api-response.ts:imports
- `subsystem-97-0-apps-web` -> `subsystem-31-0-apps-web` [LOW] via `calls`: calls x1 Evidence: apps/web/src/lib/json.ts:calls
- `subsystem-98-0-apps-web` -> `subsystem-3-0-apps-web` [LOW] via `calls`: calls x10 Evidence: apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls

## Cross-Cutting Concerns

- `auth` [HIGH] touches `subsystem-11-0-apps-web`, `subsystem-13-0-apps-web`, `subsystem-35-0-apps-web`, `subsystem-37-0-apps-web`: auth signals appear across 4 subsystems via 7 matched nodes. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:loadLastTrailSession, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:saveLastTrailSession, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:setReloadToken
- `caching` [HIGH] touches `subsystem-0-0-packages-contracts-cchain`, `subsystem-1-0-apps-web`, `subsystem-11-0-apps-web`, `subsystem-14-0-apps-web`, `subsystem-18-0-apps-web`, `subsystem-2-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-37-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-9-0-apps-web`: caching signals appear across 11 subsystems via 29 matched nodes. Evidence: apps/web/src/app/api/admin/analytics/route.ts:globalMemoryAnalyticsSink.getEvents, apps/web/src/app/page.tsx:React.useMemo, apps/web/src/components/map/InteractiveMap.tsx:getCachedMapConfig
- `config` [HIGH] touches `subsystem-1-0-apps-web`, `subsystem-113-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-20-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-38-0-apps-web`, `subsystem-39-0-packages-shared`, `subsystem-5-0-packages-relayer`, `subsystem-64-0-apps-web`, `subsystem-67-0-apps-web`, `subsystem-72-0-apps-web`, `subsystem-73-0-apps-web`, `subsystem-79-0-eslint-config-mjs`, `subsystem-87-0-apps-web`, `subsystem-88-0-packages-relayer`, `subsystem-91-0-apps-web`, `subsystem-99-0-apps-web`: config signals appear across 17 subsystems via 67 matched nodes. Evidence: apps/web/next.config.ts:apps/web/next.config.ts, apps/web/next-env.d.ts:apps/web/next-env.d.ts, apps/web/src/app/api/map-config/route.ts:apps/web/src/app/api/map-config/route.ts
- `errors` [HIGH] touches `subsystem-0-0-packages-contracts-cchain`, `subsystem-12-0-packages-contracts-cchain`, `subsystem-14-0-apps-web`, `subsystem-15-0-apps-web`, `subsystem-17-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-22-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-26-0-apps-web`, `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web`, `subsystem-5-0-packages-relayer`, `subsystem-67-0-apps-web`, `subsystem-72-0-apps-web`, `subsystem-8-0-apps-web`, `subsystem-9-0-apps-web`, `subsystem-96-0-apps-web`: errors signals appear across 17 subsystems via 33 matched nodes. Evidence: apps/web/src/lib/gameplay/errors.ts:apps/web/src/lib/gameplay/errors.ts, apps/web/src/app/admin/health/page.tsx:Error, apps/web/src/app/admin/health/page.tsx:setError
- `logging` [HIGH] touches `subsystem-2-0-apps-web`, `subsystem-24-0-apps-web`, `subsystem-59-0-apps-web`, `subsystem-9-0-apps-web`: logging signals appear across 4 subsystems via 7 matched nodes. Evidence: apps/web/src/app/page.tsx:console.log, apps/web/src/features/analytics/sink.ts:console.log, apps/web/tests/ge04-evidence-reconciliation.test.ts:logEvidenceReconciliation
- `observability` [HIGH] touches `subsystem-32-0-apps-web`, `subsystem-45-0-apps-web`, `subsystem-6-0-packages-shared`, `subsystem-76-0-apps-web`: observability signals appear across 4 subsystems via 4 matched nodes. Evidence: apps/web/src/app/api/admin/analytics/route.ts:getPilotFunnelMetrics, apps/web/tests/admin-health.test.ts:Telemetry, packages/shared/src/gameplay/analytics.ts:metrics
- `persistence` [HIGH] touches `subsystem-15-0-apps-web`, `subsystem-21-0-packages-shared`, `subsystem-25-0-apps-web`, `subsystem-29-0-apps-web`, `subsystem-31-0-apps-web`, `subsystem-42-0-apps-web`, `subsystem-51-0-apps-web`, `subsystem-67-0-apps-web`, `subsystem-7-0-apps-web`, `subsystem-92-0-apps-web`: persistence signals appear across 10 subsystems via 50 matched nodes. Evidence: apps/web/src/features/gameplay/trails/model.ts:apps/web/src/features/gameplay/trails/model.ts, apps/web/src/lib/gameplay/repository.ts:apps/web/src/lib/gameplay/repository.ts, apps/web/src/app/api/gameplay/seasons/active/route.ts:getGameplayConfigRepository

## Entrypoints

- `Cheatcode` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcode.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcode.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcode.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 8. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_json()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_json(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Cheatcodes.from_json_file()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Cheatcodes.from_json_file(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 30. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._dec_indent()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._dec_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._inc_indent()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._inc_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_comment()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 8. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_comment(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_indent()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_indented()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_indented(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_items()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_items(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_line()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_line(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_nl()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_nl(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._p_str()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._p_str(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter._with_indent()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter._with_indent(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.finish()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.finish(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_contract()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_contract(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enum()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enum(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enum_variants()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enum_variants(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_enums()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_enums(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_error()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_error(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_errors()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_errors(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_event()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_event(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_events()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_events(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_function()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_function(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_functions()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_functions(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_prelude()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_prelude(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct_field()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct_field(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_struct_fields()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_struct_fields(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CheatcodesPrinter.p_structs()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CheatcodesPrinter.p_structs(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__eq__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__eq__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__gt__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__gt__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `CmpCheatcode.__lt__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:CmpCheatcode.__lt__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Enum.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Enum.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `EnumVariant` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:EnumVariant, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `EnumVariant.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:EnumVariant.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Error.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Error.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Event.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Event.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Function.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Function.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Item` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Item, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.default()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.default(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `ItemOrder.get_list()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ItemOrder.get_list(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Mutability` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Mutability, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Mutability.__str__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Mutability.__str__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Path` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Path, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `Struct` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Struct.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Struct.from_dict()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Struct.from_dict(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `StructField` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:StructField, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `StructField.__init__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:StructField.__init__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Visibility` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Visibility, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `Visibility.__str__()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Visibility.__str__(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `argparse` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `argparse.ArgumentParser` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse.ArgumentParser, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `bytes` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `ccs.sort` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ccs.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `cheats.insert` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:cheats.insert, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `cmp_cheatcode()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:cmp_cheatcode(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `copy` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `copy.deepcopy` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy.deepcopy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `decode` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:decode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `enum` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `enumerate` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:enumerate, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `f` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `f.write` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f.write, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `filter` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:filter, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `group()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:group(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `int.from_bytes` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:int.from_bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `isinstance` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:isinstance, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `json` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `json.load` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.load, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `json.loads` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.loads, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `len` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:len, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `line.lstrip` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:line.lstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `list` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:list, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `m.group` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:m.group, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `main()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 30. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:main(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains
- `map` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:map, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `memory_to_calldata()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:memory_to_calldata(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `name.strip` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:name.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `open` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:open, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `packages/contracts-cchain/lib/forge-std/scripts/vm.py` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 29. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:packages/contracts-cchain/lib/forge-std/scripts/vm.py, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains
- `parser.add_argument` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.add_argument, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `parser.parse_args` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.parse_args, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `pathlib` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pathlib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `pp.finish` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.finish, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_contract` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_contract, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_prelude` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `prefix_with_group_headers()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 9. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:prefix_with_group_headers(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `print` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:print, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `range` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:range, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `re` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `re.sub` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.sub, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `re.subn` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.subn, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read_text` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `request.urlopen` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:request.urlopen, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `rstrip` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:rstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.add` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.add, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.split` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.split, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.strip` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `safe.sort` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:safe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._dec_indent` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._dec_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._inc_indent` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._inc_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_comment` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_comment, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_indent` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_indented` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indented, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_items` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_items, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_line` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 11. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_line, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_nl` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_nl, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_str` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 12. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._with_indent` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._with_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum_variants` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum_variants, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enums` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enums, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_error` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_error, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_errors` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_errors, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_event` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_event, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_events` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_events, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_function` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_function, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_functions` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_functions, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_prelude` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_field` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_field, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_fields` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_fields, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_structs` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_structs, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `set` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:set, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `str` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `subprocess` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `subprocess.run` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess.run, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `test_path.read_text` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `test_path.write_text` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.write_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `typing` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:typing, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `unsafe.sort` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:unsafe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `update_interface_ids()` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 8. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:update_interface_ids(), packages/contracts-cchain/lib/forge-std/scripts/vm.py:contains, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `upper` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:upper, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `urllib` [HIGH] from `packages/contracts-cchain/lib/forge-std/scripts/vm.py` in `subsystem-0-0-packages-contracts-cchain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:urllib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `handleBackdropClick()` [HIGH] from `apps/web/src/components/cross-chain/ICMProgressModal.tsx` in `subsystem-10-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:handleBackdropClick(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:contains
- `truncateHash()` [HIGH] from `apps/web/src/components/cross-chain/ICMProgressModal.tsx` in `subsystem-10-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:truncateHash(), apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `AbortController` [HIGH] from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx` in `subsystem-11-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:AbortController, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `controller.abort` [HIGH] from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx` in `subsystem-11-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:controller.abort, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `packages/contracts-l1/lib/forge-std/scripts/vm.py` [HIGH] from `packages/contracts-l1/lib/forge-std/scripts/vm.py` in `subsystem-114-0-packages-contracts-l1`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 29. Evidence: packages/contracts-l1/lib/forge-std/scripts/vm.py:packages/contracts-l1/lib/forge-std/scripts/vm.py, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:contains
- `packages/shared/src/types/domain.ts` [HIGH] from `packages/shared/src/types/domain.ts` in `subsystem-122-0-packages-shared`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: packages/shared/src/types/domain.ts:packages/shared/src/types/domain.ts, packages/shared/src/constants/progression.ts:imports, packages/shared/src/eip712/schemas.ts:imports
- `scripts/main.ts` [HIGH] from `scripts/main.ts` in `subsystem-124-0-scripts`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 0. Evidence: scripts/main.ts:scripts/main.ts
- `@/lib/proof-signer` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/admin/health/route.ts:@/lib/proof-signer, apps/web/src/app/api/admin/health/route.ts:imports, apps/web/src/app/api/proofs/location/route.ts:imports
- `AbortController` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:AbortController, apps/web/src/app/api/admin/health/route.ts:calls
- `BigInt` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/src/app/api/admin/health/route.ts:BigInt, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `Date.now` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 13. Evidence: apps/web/src/app/api/admin/health/route.ts:Date.now, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `JSON.stringify` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 12. Evidence: apps/web/src/app/api/admin/health/route.ts:JSON.stringify, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `NextResponse.json` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: apps/web/src/app/api/admin/health/route.ts:NextResponse.json, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `Promise.all` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/admin/health/route.ts:Promise.all, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/scripts/seed.ts:calls
- `Relayer` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/admin/health/route.ts:Relayer, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/src/main.ts:calls
- `apps/web/src/app/api/admin/health/route.ts` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 31. Evidence: apps/web/src/app/api/admin/health/route.ts:apps/web/src/app/api/admin/health/route.ts, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `balance` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:balance, apps/web/src/app/api/admin/health/route.ts:calls
- `clearTimeout` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:clearTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `controller.abort` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:controller.abort, apps/web/src/app/api/admin/health/route.ts:calls
- `epoch` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/admin/health/route.ts:epoch, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `fetch` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:fetch, apps/web/src/app/api/admin/health/route.ts:calls
- `formatTokenUnits()` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/src/app/api/admin/health/route.ts:formatTokenUnits(), apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `formatWeiToEtherString()` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/src/app/api/admin/health/route.ts:formatWeiToEtherString(), apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `fraction.toString` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/admin/health/route.ts:fraction.toString, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `getProofSignerAccount` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:getProofSignerAccount, apps/web/src/app/api/admin/health/route.ts:calls
- `hexAmount.startsWith` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:hexAmount.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `hexWei.startsWith` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:hexWei.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `padStart` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/admin/health/route.ts:padStart, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `parseFloat` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:parseFloat, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `parseInt` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/admin/health/route.ts:parseInt, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `principalBudget` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:principalBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `queryRpcWithLatency` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:queryRpcWithLatency, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `questBudget` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:questBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `res.json` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/admin/health/route.ts:res.json, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/tests/api.test.ts:calls
- `setTimeout` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:setTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `sponsorPoolAddress.startsWith` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:sponsorPoolAddress.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `totalNum.toFixed` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:totalNum.toFixed, apps/web/src/app/api/admin/health/route.ts:calls
- `trim` [HIGH] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 12. Evidence: apps/web/src/app/api/admin/health/route.ts:trim, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `@/app/api/admin/analytics/route` [HIGH] from `apps/web/tests/ge07-analytics-funnel.test.ts` in `subsystem-14-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:@/app/api/admin/analytics/route, apps/web/tests/ge07-analytics-funnel.test.ts:imports
- `Conformance` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:Conformance, apps/web/tests/api.test.ts:calls
- `NextRequest` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/api.test.ts:NextRequest, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `accuracy` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:accuracy, apps/web/tests/api.test.ts:calls
- `apps/web/tests/api.test.ts` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 49. Evidence: apps/web/tests/api.test.ts:apps/web/tests/api.test.ts, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `beforeEach` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/tests/api.test.ts:beforeEach, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `code` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:code, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `createSignedSponsorQrPayload` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:createSignedSponsorQrPayload, apps/web/tests/api.test.ts:calls
- `getMapConfig` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/tests/api.test.ts:getMapConfig, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `postFaucetGas` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:postFaucetGas, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postLocationProof` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:postLocationProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postSponsorProof` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:postSponsorProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `radius` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:radius, apps/web/tests/api.test.ts:calls
- `res1.json` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/api.test.ts:res1.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res2.json` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/api.test.ts:res2.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res3.json` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:res3.json, apps/web/tests/api.test.ts:calls
- `resetRateLimits` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/api.test.ts:resetRateLimits, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `slots` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:slots, apps/web/tests/api.test.ts:calls
- `testWallet.toLowerCase` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:testWallet.toLowerCase, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `timestamp` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:timestamp, apps/web/tests/api.test.ts:calls
- `toBeGreaterThan` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/tests/api.test.ts:toBeGreaterThan, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toBeUndefined` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/tests/api.test.ts:toBeUndefined, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `toEqual` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 9. Evidence: apps/web/tests/api.test.ts:toEqual, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `toHaveLength` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 11. Evidence: apps/web/tests/api.test.ts:toHaveLength, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `valid` [HIGH] from `apps/web/tests/api.test.ts` in `subsystem-20-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/api.test.ts:valid, apps/web/tests/api.test.ts:calls
- `@/lib/campus` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/campus, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/map-config/route.ts:imports
- `@/lib/rate-limiter` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/rate-limiter, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `Math.floor` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 17. Evidence: apps/web/src/app/api/faucet/gas/route.ts:Math.floor, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `POST` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/faucet/gas/route.ts:POST, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `apps/web/src/app/api/faucet/gas/route.ts` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 25. Evidence: apps/web/src/app/api/faucet/gas/route.ts:apps/web/src/app/api/faucet/gas/route.ts, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `check` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:check, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `checkFaucetRateLimit` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/faucet/gas/route.ts:checkFaucetRateLimit, apps/web/src/app/api/faucet/gas/route.ts:calls
- `encodePacked` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:encodePacked, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `errorResponse` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/src/app/api/faucet/gas/route.ts:errorResponse, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `getCurrentEpoch` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/faucet/gas/route.ts:getCurrentEpoch, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `headers.get` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/faucet/gas/route.ts:headers.get, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `keccak256` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:keccak256, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `recordFaucetClaim` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/faucet/gas/route.ts:recordFaucetClaim, apps/web/src/app/api/faucet/gas/route.ts:calls
- `req.json` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/faucet/gas/route.ts:req.json, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `split` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:split, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `test` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/faucet/gas/route.ts:test, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `thirdweb/utils` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/faucet/gas/route.ts:thirdweb/utils, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/lib/campus.ts:imports
- `up` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/faucet/gas/route.ts:up, apps/web/src/app/api/faucet/gas/route.ts:calls
- `wallet.toLowerCase` [HIGH] from `apps/web/src/app/api/faucet/gas/route.ts` in `subsystem-26-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/faucet/gas/route.ts:wallet.toLowerCase, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `@/lib/geo` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/proofs/location/route.ts:@/lib/geo, apps/web/src/app/api/proofs/location/route.ts:imports, apps/web/src/app/api/proofs/sponsor/route.ts:imports
- `DEMO` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/location/route.ts:DEMO, apps/web/src/app/api/proofs/location/route.ts:calls
- `GUARANTEE` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:GUARANTEE, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.abs` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.abs, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.max` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 10. Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.max, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.min` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.min, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `accuracyMeters.toFixed` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:accuracyMeters.toFixed, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/app/api/proofs/location/route.ts` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 32. Evidence: apps/web/src/app/api/proofs/location/route.ts:apps/web/src/app/api/proofs/location/route.ts, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `clock` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:clock, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `constraints` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/location/route.ts:constraints, apps/web/src/app/api/proofs/location/route.ts:calls
- `coordinates` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/location/route.ts:coordinates, apps/web/src/app/api/proofs/location/route.ts:calls
- `findSlotByChestId` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:findSlotByChestId, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `generateNonce` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:generateNonce, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `haversineDistanceMeters` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/proofs/location/route.ts:haversineDistanceMeters, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `isNaN` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/proofs/location/route.ts:isNaN, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `lifetime` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:lifetime, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `low` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:low, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `m` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:m, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `signLocationProof` [HIGH] from `apps/web/src/app/api/proofs/location/route.ts` in `subsystem-27-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/location/route.ts:signLocationProof, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `createThirdwebClient` [HIGH] from `apps/web/src/lib/proof-signer.ts` in `subsystem-28-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/lib/proof-signer.ts:createThirdwebClient, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/thirdweb.ts:calls
- `getCanonicalDomain()` [HIGH] from `apps/web/src/lib/proof-signer.ts` in `subsystem-28-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/lib/proof-signer.ts:getCanonicalDomain(), apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `VersionedGameplayConfigRepository` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:VersionedGameplayConfigRepository, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `activeInstant.getTime` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:activeInstant.getTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `afterEach` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/gameplay-config-api.test.ts:afterEach, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `apps/web/tests/gameplay-config-api.test.ts` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 44. Evidence: apps/web/tests/gameplay-config-api.test.ts:apps/web/tests/gameplay-config-api.test.ts, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `json` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:json, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `mockReturnValue` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:mockReturnValue, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `not.toBeNull` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `not.toContain` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toContain, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `seasonResponse.json` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:seasonResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `slots.slice` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:slots.slice, apps/web/tests/gameplay-config-api.test.ts:calls
- `toBeNull` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 5. Evidence: apps/web/tests/gameplay-config-api.test.ts:toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toMatchObject` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:toMatchObject, apps/web/tests/gameplay-config-api.test.ts:calls
- `toThrow` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/gameplay-config-api.test.ts:toThrow, apps/web/tests/gameplay-config-api.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `trailResponse.json` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:trailResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.restoreAllMocks` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.restoreAllMocks, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `vi.setSystemTime` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.setSystemTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.spyOn` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.spyOn, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.useFakeTimers` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useFakeTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.useRealTimers` [HIGH] from `apps/web/tests/gameplay-config-api.test.ts` in `subsystem-29-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useRealTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `clipboard.writeText` [HIGH] from `apps/web/src/app/admin/health/page.tsx` in `subsystem-3-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/admin/health/page.tsx:clipboard.writeText, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `@/components/cross-chain/types` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@/components/cross-chain/types, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports, apps/web/src/features/gameplay/trails/evidence-adapter.ts:imports
- `@defi-trail/shared` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@defi-trail/shared, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports, apps/web/src/features/analytics/sink.ts:imports
- `Array.isArray` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Array.isArray, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `Enforcement` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Enforcement, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 26. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:apps/web/src/app/api/gameplay/trails/reconcile/route.ts, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `checkReconcileRateLimit` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:checkReconcileRateLimit, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `items.push` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:items.push, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `mapRequestStatusToLifecycle` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapRequestStatusToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `mapUIStateToLifecycle` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapUIStateToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `reconcileTrailProgressWithEvidence` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:reconcileTrailProgressWithEvidence, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `recordReconcileRequest` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:recordReconcileRequest, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `repo.getTodayTrail` [HIGH] from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts` in `subsystem-42-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:repo.getTodayTrail, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `@/features/analytics/funnel` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/funnel, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/features/analytics/sink` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/sink, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/lib/api-response` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/lib/api-response, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/faucet/gas/route.ts:imports
- `Date` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 10. Evidence: apps/web/src/app/api/admin/analytics/route.ts:Date, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `GET` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 6. Evidence: apps/web/src/app/api/admin/analytics/route.ts:GET, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `apps/web/src/app/api/admin/analytics/route.ts` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 10. Evidence: apps/web/src/app/api/admin/analytics/route.ts:apps/web/src/app/api/admin/analytics/route.ts, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/analytics/route.ts:calls
- `getPilotFunnelMetrics` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/analytics/route.ts:getPilotFunnelMetrics, apps/web/src/app/api/admin/analytics/route.ts:calls
- `globalMemoryAnalyticsSink.getEvents` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/analytics/route.ts:globalMemoryAnalyticsSink.getEvents, apps/web/src/app/api/admin/analytics/route.ts:calls
- `next/server` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 11. Evidence: apps/web/src/app/api/admin/analytics/route.ts:next/server, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/admin/health/route.ts:imports
- `successResponse` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/admin/analytics/route.ts:successResponse, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `toISOString` [HIGH] from `apps/web/src/app/api/admin/analytics/route.ts` in `subsystem-45-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: apps/web/src/app/api/admin/analytics/route.ts:toISOString, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `@/features/analytics` [HIGH] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:@/features/analytics, apps/web/src/features/gameplay/passport/PassportClient.tsx:imports, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports
- `PassportClient()` [HIGH] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 15. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:PassportClient(), apps/web/src/features/gameplay/passport/PassportClient.tsx:contains, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `apps/web/src/features/gameplay/passport/PassportClient.tsx` [HIGH] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:apps/web/src/features/gameplay/passport/PassportClient.tsx, apps/web/src/features/gameplay/passport/PassportClient.tsx:contains, apps/web/src/features/gameplay/passport/PassportClient.tsx:imports
- `getGameplayTracker` [HIGH] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:getGameplayTracker, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `Budgets` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:Budgets, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `MOCK_USDC_ADDRESS.startsWith` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:MOCK_USDC_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `SPONSOR_POOL_ADDRESS.startsWith` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:SPONSOR_POOL_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `Seeding` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:Seeding, packages/relayer/scripts/seed.ts:calls
- `Signer` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:Signer, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `SponsorPool` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:SponsorPool, packages/relayer/scripts/seed.ts:calls
- `SponsorPool.fundAll` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:SponsorPool.fundAll, packages/relayer/scripts/seed.ts:calls
- `address.startsWith` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:address.startsWith, packages/relayer/scripts/seed.ts:calls
- `budget` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:budget, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `console.error` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:console.error, packages/relayer/scripts/seed.ts:calls
- `content.split` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:content.split, packages/relayer/scripts/seed.ts:calls
- `createPublicClient` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:createPublicClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `createWalletClient` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:createWalletClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `endsWith` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:endsWith, packages/relayer/scripts/seed.ts:calls
- `ensureGasOnChain` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:ensureGasOnChain, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formatEther` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:formatEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formatUnits` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:formatUnits, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fs.existsSync` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:fs.existsSync, packages/relayer/scripts/seed.ts:calls
- `fs.readFileSync` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:fs.readFileSync, packages/relayer/scripts/seed.ts:calls
- `fujiPublicClient.readContract` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.readContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiPublicClient.waitForTransactionReceipt` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiWalletClient.writeContract` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:fujiWalletClient.writeContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `gas` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:gas, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `http` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:http, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `line.trim` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:line.trim, packages/relayer/scripts/seed.ts:calls
- `loadEnvFile()` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 10. Evidence: packages/relayer/scripts/seed.ts:loadEnvFile(), packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `main` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:main, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `node:path` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:node:path, packages/relayer/scripts/seed.ts:imports
- `packages/relayer/scripts/seed.ts` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 44. Evidence: packages/relayer/scripts/seed.ts:packages/relayer/scripts/seed.ts, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `parseEther` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:parseEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `path.resolve` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:path.resolve, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `process.cwd` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:process.cwd, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `process.exit` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:process.exit, packages/relayer/scripts/seed.ts:calls
- `publicClient.getBalance` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:publicClient.getBalance, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `publicClient.waitForTransactionReceipt` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:publicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls
- `replace` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:replace, packages/relayer/scripts/seed.ts:calls
- `reserve` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:reserve, packages/relayer/scripts/seed.ts:calls
- `trimmed.indexOf` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:trimmed.indexOf, packages/relayer/scripts/seed.ts:calls
- `trimmed.startsWith` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:trimmed.startsWith, packages/relayer/scripts/seed.ts:calls
- `viem/accounts` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:viem/accounts, packages/relayer/scripts/seed.ts:imports
- `viem/chains` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:viem/chains, packages/relayer/scripts/seed.ts:imports
- `walletClient.sendTransaction` [HIGH] from `packages/relayer/scripts/seed.ts` in `subsystem-5-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/scripts/seed.ts:walletClient.sendTransaction, packages/relayer/scripts/seed.ts:calls
- `Chest` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:Chest, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `SponsorProof` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:SponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/app/api/proofs/sponsor/route.ts` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 34. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:apps/web/src/app/api/proofs/sponsor/route.ts, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `computeCampaignIdHash` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:computeCampaignIdHash, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `signSponsorProof` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:signSponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `verifySponsorQrPayload` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:verifySponsorQrPayload, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `window` [HIGH] from `apps/web/src/app/api/proofs/sponsor/route.ts` in `subsystem-61-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:window, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `apps/web/src/lib/server-env.ts` [HIGH] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 7. Evidence: apps/web/src/lib/server-env.ts:apps/web/src/lib/server-env.ts, apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- `getFujiCChainId()` [HIGH] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/lib/server-env.ts:getFujiCChainId(), apps/web/src/lib/server-env.ts:contains, apps/web/src/lib/server-env.ts:calls
- `getGameL1ChainId()` [HIGH] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/lib/server-env.ts:getGameL1ChainId(), apps/web/src/lib/server-env.ts:contains, apps/web/src/lib/server-env.ts:calls
- `@/lib/gameplay/repository` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:@/lib/gameplay/repository, apps/web/src/app/api/gameplay/seasons/active/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `apps/web/src/app/api/gameplay/seasons/active/route.ts` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 8. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:apps/web/src/app/api/gameplay/seasons/active/route.ts, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `gameplayErrorResponse` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayErrorResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `gameplayResponse` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `getGameplayConfigRepository` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:getGameplayConfigRepository, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `repository.getActiveSeason` [HIGH] from `apps/web/src/app/api/gameplay/seasons/active/route.ts` in `subsystem-67-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:repository.getActiveSeason, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `apps/web/src/app/api/map-config/route.ts` [HIGH] from `apps/web/src/app/api/map-config/route.ts` in `subsystem-73-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 11. Evidence: apps/web/src/app/api/map-config/route.ts:apps/web/src/app/api/map-config/route.ts, apps/web/src/app/api/map-config/route.ts:calls, apps/web/src/app/api/map-config/route.ts:calls
- `getDemoCampusConfig` [HIGH] from `apps/web/src/app/api/map-config/route.ts` in `subsystem-73-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/api/map-config/route.ts:getDemoCampusConfig, apps/web/src/app/api/map-config/route.ts:calls, apps/web/tests/api.test.ts:calls
- `hour` [HIGH] from `apps/web/src/app/api/map-config/route.ts` in `subsystem-73-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/map-config/route.ts:hour, apps/web/src/app/api/map-config/route.ts:calls
- `status` [HIGH] from `apps/web/src/app/api/map-config/route.ts` in `subsystem-73-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/map-config/route.ts:status, apps/web/src/app/api/map-config/route.ts:calls
- `@/app/api/map-config/route` [HIGH] from `apps/web/tests/json-safe.test.ts` in `subsystem-87-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/tests/json-safe.test.ts:@/app/api/map-config/route, apps/web/tests/json-safe.test.ts:imports
- `getRelayerConfiguration()` [HIGH] from `packages/relayer/src/main.ts` in `subsystem-88-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: packages/relayer/src/main.ts:getRelayerConfiguration(), packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:contains
- `packages/relayer/src/main.ts` [HIGH] from `packages/relayer/src/main.ts` in `subsystem-88-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: packages/relayer/src/main.ts:packages/relayer/src/main.ts, packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- `url.endsWith` [HIGH] from `packages/relayer/src/main.ts` in `subsystem-88-0-packages-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/relayer/src/main.ts:url.endsWith, packages/relayer/src/main.ts:calls
- `handleRecenter()` [HIGH] from `apps/web/src/components/map/InteractiveMap.tsx` in `subsystem-90-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 2. Evidence: apps/web/src/components/map/InteractiveMap.tsx:handleRecenter(), apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:contains
- `handleResize()` [HIGH] from `apps/web/src/components/map/InteractiveMap.tsx` in `subsystem-90-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/components/map/InteractiveMap.tsx:handleResize(), apps/web/src/components/map/InteractiveMap.tsx:contains
- `apps/web/src/app/api/gameplay/trails/today/route.ts` [HIGH] from `apps/web/src/app/api/gameplay/trails/today/route.ts` in `subsystem-92-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 8. Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:apps/web/src/app/api/gameplay/trails/today/route.ts, apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `repository.getTodayTrail` [HIGH] from `apps/web/src/app/api/gameplay/trails/today/route.ts` in `subsystem-92-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:repository.getTodayTrail, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `apps/web/src/lib/api-response.ts` [HIGH] from `apps/web/src/lib/api-response.ts` in `subsystem-96-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 3. Evidence: apps/web/src/lib/api-response.ts:apps/web/src/lib/api-response.ts, apps/web/src/lib/api-response.ts:calls, apps/web/src/lib/api-response.ts:calls
- `errorResponse()` [HIGH] from `apps/web/src/lib/api-response.ts` in `subsystem-96-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/api-response.ts:errorResponse(), apps/web/src/lib/api-response.ts:contains
- `copyToClipboard()` [HIGH] from `apps/web/src/app/admin/health/page.tsx` in `subsystem-98-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 4. Evidence: apps/web/src/app/admin/health/page.tsx:copyToClipboard(), apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `rewardReserve` [MEDIUM] from `apps/web/src/app/api/admin/health/route.ts` in `subsystem-13-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/api/admin/health/route.ts:rewardReserve, apps/web/src/app/api/admin/health/route.ts:calls
- `runIcmSimulation` [MEDIUM] from `apps/web/src/app/page.tsx` in `subsystem-2-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/page.tsx:runIcmSimulation, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setMainTab` [MEDIUM] from `apps/web/src/app/page.tsx` in `subsystem-2-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/page.tsx:setMainTab, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `Reserve` [MEDIUM] from `apps/web/src/app/admin/health/page.tsx` in `subsystem-3-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/admin/health/page.tsx:Reserve, apps/web/src/app/admin/health/page.tsx:calls
- `parseServerEnv()` [MEDIUM] from `packages/shared/src/env.ts` in `subsystem-39-0-packages-shared`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/shared/src/env.ts:parseServerEnv(), packages/shared/src/env.ts:contains
- `serverEnvSchema.parse` [MEDIUM] from `packages/shared/src/env.ts` in `subsystem-39-0-packages-shared`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/shared/src/env.ts:serverEnvSchema.parse, packages/shared/src/env.ts:calls
- `address.toLowerCase` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:address.toLowerCase, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `createEmptyPassportState` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:createEmptyPassportState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `evaluatePassport` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:evaluatePassport, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `loadPassportState` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:loadPassportState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `refresh()` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:refresh(), apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:contains
- `setState` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:setState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `trackPassportViewed` [MEDIUM] from `apps/web/src/features/gameplay/passport/PassportClient.tsx` in `subsystem-48-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:trackPassportViewed, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `addr.startsWith` [MEDIUM] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/server-env.ts:addr.startsWith, apps/web/src/lib/server-env.ts:calls
- `envKey.startsWith` [MEDIUM] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/server-env.ts:envKey.startsWith, apps/web/src/lib/server-env.ts:calls
- `getChestManagerAddress()` [MEDIUM] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/server-env.ts:getChestManagerAddress(), apps/web/src/lib/server-env.ts:contains
- `getProofSignerPrivateKey()` [MEDIUM] from `apps/web/src/lib/server-env.ts` in `subsystem-64-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/server-env.ts:getProofSignerPrivateKey(), apps/web/src/lib/server-env.ts:contains
- `toClientEvmSigner()` [MEDIUM] from `apps/web/src/lib/empty-module.ts` in `subsystem-68-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/lib/empty-module.ts:toClientEvmSigner(), apps/web/src/lib/empty-module.ts:contains
- `@/features/gameplay/passport/PassportClient` [MEDIUM] from `apps/web/src/app/passport/page.tsx` in `subsystem-75-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/app/passport/page.tsx:@/features/gameplay/passport/PassportClient, apps/web/src/app/passport/page.tsx:imports
- `remainingAssets.toFixed` [MEDIUM] from `apps/web/src/components/position/PositionView.tsx` in `subsystem-8-0-apps-web`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: apps/web/src/components/position/PositionView.tsx:remainingAssets.toFixed, apps/web/src/components/position/PositionView.tsx:calls
- `buildEip712Domain()` [MEDIUM] from `packages/shared/src/eip712/schemas.ts` in `subsystem-80-0-packages-shared`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/shared/src/eip712/schemas.ts:buildEip712Domain(), packages/shared/src/eip712/schemas.ts:calls, packages/shared/src/eip712/schemas.ts:calls
- `buildEip712Domain` [MEDIUM] from `packages/shared/tests/eip712.test.ts` in `subsystem-81-0-packages-shared`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 1. Evidence: packages/shared/tests/eip712.test.ts:buildEip712Domain, packages/shared/tests/eip712.test.ts:calls

## External Dependencies

- `@/components/cross-chain` [MEDIUM] used by `subsystem-51-0-apps-web`, `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/features/gameplay/trails/model.ts`. Evidence: apps/web/src/app/page.tsx:@/components/cross-chain, apps/web/src/features/gameplay/trails/model.ts:@/components/cross-chain, apps/web/src/app/page.tsx:imports
- `@/lib/chains` [MEDIUM] used by `subsystem-86-0-apps-web`, `subsystem-89-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/wallet/index.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:@/lib/chains, apps/web/src/components/wallet/index.ts:@/lib/chains, apps/web/src/app/admin/health/page.tsx:imports
- `@/lib/json` [MEDIUM] used by `subsystem-125-0-apps-web`, `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`, `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:@/lib/json, apps/web/src/components/map/InteractiveMap.tsx:@/lib/json, apps/web/src/components/cross-chain/icm-storage.ts:imports
- `@/lib/thirdweb` [MEDIUM] used by `subsystem-85-0-apps-web`, `subsystem-86-0-apps-web` from `apps/web/src/components/wallet/ConnectWalletButton.tsx`, `apps/web/src/components/wallet/index.ts`. Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:@/lib/thirdweb, apps/web/src/components/wallet/index.ts:@/lib/thirdweb, apps/web/src/components/wallet/ConnectWalletButton.tsx:imports
- `@defi-trail/shared` [MEDIUM] used by `subsystem-42-0-apps-web`, `subsystem-63-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailCard.tsx`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@defi-trail/shared, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:@defi-trail/shared, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `AbortController` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:AbortController, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:AbortController, apps/web/src/app/api/admin/health/route.ts:calls
- `Array.isArray` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`, `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Array.isArray, apps/web/src/components/map/InteractiveMap.tsx:Array.isArray, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `BigInt` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:BigInt, apps/web/src/components/position/PositionView.tsx:BigInt, apps/web/src/app/api/faucet/gas/route.ts:calls
- `Date` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-45-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:Date, apps/web/src/app/api/admin/analytics/route.ts:Date, apps/web/src/app/admin/health/page.tsx:calls
- `Date.now` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-22-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:Date.now, apps/web/src/components/sponsor/SponsorScannerModal.tsx:Date.now, apps/web/src/app/api/admin/health/route.ts:calls
- `Date.parse` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:Date.parse, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:Date.parse, apps/web/src/features/gameplay/passport/engine.ts:calls
- `Error` [MEDIUM] used by `subsystem-17-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:Error, apps/web/src/features/analytics/tracker.ts:Error, apps/web/src/app/admin/health/page.tsx:calls
- `JSON.parse` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:JSON.parse, packages/contracts-cchain/test/accounting.test.mjs:JSON.parse, apps/web/src/lib/json.ts:calls
- `JSON.stringify` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-13-0-apps-web`, `subsystem-22-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/components/sponsor/SponsorScannerModal.tsx`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/app/api/admin/health/route.ts:JSON.stringify, apps/web/src/components/sponsor/SponsorScannerModal.tsx:JSON.stringify, packages/contracts-cchain/test/accounting.test.mjs:JSON.stringify
- `Math.floor` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`, `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:Math.floor, apps/web/src/components/cross-chain/ICMProgressModal.tsx:Math.floor, apps/web/src/app/api/faucet/gas/route.ts:calls
- `Math.max` [MEDIUM] used by `subsystem-27-0-apps-web`, `subsystem-33-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`, `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.max, apps/web/src/components/map/ChestBottomSheet.tsx:Math.max, apps/web/src/app/api/proofs/location/route.ts:calls
- `Math.min` [MEDIUM] used by `subsystem-27-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:Math.min, apps/web/src/app/api/proofs/location/route.ts:Math.min, apps/web/src/app/admin/health/page.tsx:calls
- `Math.round` [MEDIUM] used by `subsystem-23-0-apps-web`, `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`, `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:Math.round, apps/web/src/components/map/geo-utils.ts:Math.round, packages/shared/src/gameplay/analytics.ts:calls
- `Navigation` [MEDIUM] used by `subsystem-16-0-apps-web`, `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/app/page.tsx:Navigation, apps/web/tests/map.test.ts:Navigation, apps/web/src/app/page.tsx:calls
- `Number` [MEDIUM] used by `subsystem-38-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`, `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/components/position/PositionView.tsx:Number, apps/web/src/lib/campus.ts:Number, apps/web/src/lib/campus.ts:calls
- `SUPPORTED_CHAINS.map` [MEDIUM] used by `subsystem-43-0-apps-web`, `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:SUPPORTED_CHAINS.map, apps/web/tests/wallet.test.ts:SUPPORTED_CHAINS.map, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `Steps` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:Steps, apps/web/src/components/cross-chain/useICMProgress.ts:Steps, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `Switch` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-43-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Switch, apps/web/tests/wallet.test.ts:Switch, apps/web/tests/wallet.test.ts:calls
- `URL` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:URL, apps/web/tests/ge06-relay-moment.test.ts:URL, apps/web/tests/ge06-relay-moment.test.ts:calls
- `Wallet` [MEDIUM] used by `subsystem-2-0-apps-web`, `subsystem-65-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/app/page.tsx:Wallet, apps/web/src/lib/thirdweb.ts:Wallet, apps/web/src/app/page.tsx:calls
- `applyMapModeVisibility` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:applyMapModeVisibility, apps/web/tests/map.test.ts:applyMapModeVisibility, apps/web/tests/map.test.ts:calls
- `async` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/app/admin/health/page.tsx:async, apps/web/src/components/cross-chain/useICMProgress.ts:async, packages/contracts-cchain/test/accounting.test.mjs:async
- `calculateBalanceTier` [MEDIUM] used by `subsystem-35-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/position/PositionView.tsx:calculateBalanceTier, apps/web/tests/features-modals.test.ts:calculateBalanceTier, apps/web/tests/features-modals.test.ts:calls
- `calculateEnergyMax` [MEDIUM] used by `subsystem-35-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/position/PositionView.tsx:calculateEnergyMax, apps/web/tests/features-modals.test.ts:calculateEnergyMax, apps/web/tests/features-modals.test.ts:calls
- `calculateOpenRadius` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-35-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calculateOpenRadius, apps/web/tests/features-modals.test.ts:calculateOpenRadius, apps/web/tests/features-modals.test.ts:calls
- `calculatePowerLevel` [MEDIUM] used by `subsystem-35-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/position/PositionView.tsx:calculatePowerLevel, apps/web/tests/features-modals.test.ts:calculatePowerLevel, apps/web/tests/features-modals.test.ts:calls
- `calculateStreakTier` [MEDIUM] used by `subsystem-35-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/position/PositionView.tsx:calculateStreakTier, apps/web/tests/features-modals.test.ts:calculateStreakTier, apps/web/tests/features-modals.test.ts:calls
- `chain` [MEDIUM] used by `subsystem-34-0-apps-web`, `subsystem-57-0-apps-web` from `apps/web/src/components/wallet/GasBalance.tsx`, `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/components/wallet/GasBalance.tsx:chain, apps/web/src/lib/chains.ts:chain, apps/web/src/components/wallet/GasBalance.tsx:calls
- `checkpoints.findIndex` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-21-0-packages-shared` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `packages/shared/src/gameplay/rules.ts`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:checkpoints.findIndex, packages/shared/src/gameplay/rules.ts:checkpoints.findIndex, packages/shared/src/gameplay/rules.ts:calls
- `checkpoints.map` [MEDIUM] used by `subsystem-51-0-apps-web`, `subsystem-63-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailCard.tsx`, `apps/web/src/features/gameplay/trails/model.ts`. Evidence: apps/web/src/features/gameplay/trails/model.ts:checkpoints.map, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:checkpoints.map, apps/web/src/features/gameplay/trails/model.ts:calls
- `clearInterval` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:clearInterval, apps/web/src/components/cross-chain/useICMProgress.ts:clearInterval, apps/web/src/app/admin/health/page.tsx:calls
- `clearTimeout` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-2-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:clearTimeout, apps/web/src/app/page.tsx:clearTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `console.log` [MEDIUM] used by `subsystem-2-0-apps-web`, `subsystem-24-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/app/page.tsx:console.log, apps/web/src/features/analytics/sink.ts:console.log, apps/web/src/app/page.tsx:calls
- `console.warn` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`, `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:console.warn, apps/web/src/components/map/InteractiveMap.tsx:console.warn, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `controller.abort` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:controller.abort, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:controller.abort, apps/web/src/app/api/admin/health/route.ts:calls
- `createConfirmedTrailEvidence` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-66-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:createConfirmedTrailEvidence, apps/web/tests/passport-engine.test.ts:createConfirmedTrailEvidence, apps/web/tests/passport-engine.test.ts:calls
- `createEmptyPassportState` [MEDIUM] used by `subsystem-31-0-apps-web`, `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`, `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:createEmptyPassportState, apps/web/src/features/gameplay/passport/storage.ts:createEmptyPassportState, apps/web/tests/passport-engine.test.ts:calls
- `createGeodesicCircle` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:createGeodesicCircle, apps/web/tests/map.test.ts:createGeodesicCircle, apps/web/tests/map.test.ts:calls
- `createPassportShareSnapshot` [MEDIUM] used by `subsystem-50-0-apps-web`, `subsystem-78-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportCollection.tsx`, `apps/web/tests/passport-privacy.test.ts`. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:createPassportShareSnapshot, apps/web/tests/passport-privacy.test.ts:createPassportShareSnapshot, apps/web/tests/passport-privacy.test.ts:calls
- `createTrailProgress` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:createTrailProgress, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:createTrailProgress, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `deriveTrailProgressView` [MEDIUM] used by `subsystem-63-0-apps-web`, `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailCard.tsx`, `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:deriveTrailProgressView, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:deriveTrailProgressView, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `describe` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:describe, apps/web/tests/trail-ui.test.tsx:describe, apps/web/tests/admin-health.test.ts:calls
- `enum` [MEDIUM] used by `subsystem-0-0-packages-contracts-cchain`, `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`, `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:enum, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `evaluatePassport` [MEDIUM] used by `subsystem-31-0-apps-web`, `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`, `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:evaluatePassport, apps/web/src/features/gameplay/passport/storage.ts:evaluatePassport, apps/web/tests/passport-engine.test.ts:calls
- `expect` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:expect, apps/web/tests/trail-ui.test.tsx:expect, apps/web/tests/admin-health.test.ts:calls
- `fetch` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:fetch, apps/web/src/app/api/admin/health/route.ts:fetch, apps/web/src/app/admin/health/page.tsx:calls
- `filter` [MEDIUM] used by `subsystem-0-0-packages-contracts-cchain`, `subsystem-12-0-packages-contracts-cchain`, `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`, `packages/contracts-cchain/lib/forge-std/scripts/vm.py`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:filter, packages/contracts-cchain/lib/forge-std/scripts/vm.py:filter, packages/contracts-cchain/test/accounting.test.mjs:filter
- `findNearestChest` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:findNearestChest, apps/web/tests/map.test.ts:findNearestChest, apps/web/tests/map.test.ts:calls
- `formatShortAddress` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-43-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:formatShortAddress, apps/web/tests/wallet.test.ts:formatShortAddress, apps/web/src/app/admin/health/page.tsx:calls
- `fs.existsSync` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-5-0-packages-relayer` from `packages/contracts-cchain/test/accounting.test.mjs`, `packages/relayer/scripts/seed.ts`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:fs.existsSync, packages/relayer/scripts/seed.ts:fs.existsSync, packages/contracts-cchain/test/accounting.test.mjs:calls
- `fs.readFileSync` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-5-0-packages-relayer` from `packages/contracts-cchain/test/accounting.test.mjs`, `packages/relayer/scripts/seed.ts`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:fs.readFileSync, packages/relayer/scripts/seed.ts:fs.readFileSync, packages/contracts-cchain/test/accounting.test.mjs:calls
- `getAlternativeChain` [MEDIUM] used by `subsystem-43-0-apps-web`, `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:getAlternativeChain, apps/web/tests/wallet.test.ts:getAlternativeChain, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `getChainById` [MEDIUM] used by `subsystem-43-0-apps-web`, `subsystem-57-0-apps-web` from `apps/web/src/components/wallet/GasBalance.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/components/wallet/GasBalance.tsx:getChainById, apps/web/tests/wallet.test.ts:getChainById, apps/web/src/components/wallet/GasBalance.tsx:calls
- `getChestLandmark` [MEDIUM] used by `subsystem-16-0-apps-web`, `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:getChestLandmark, apps/web/tests/map.test.ts:getChestLandmark, apps/web/tests/map.test.ts:calls
- `getChestReward` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:getChestReward, apps/web/tests/map.test.ts:getChestReward, apps/web/tests/map.test.ts:calls
- `getCompassDirection` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:getCompassDirection, apps/web/tests/map.test.ts:getCompassDirection, apps/web/tests/map.test.ts:calls
- `getExplorerAddressUrl` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-43-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:getExplorerAddressUrl, apps/web/tests/wallet.test.ts:getExplorerAddressUrl, apps/web/src/app/admin/health/page.tsx:calls
- `getGameplayTracker` [MEDIUM] used by `subsystem-14-0-apps-web`, `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`, `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:getGameplayTracker, apps/web/tests/ge07-analytics-funnel.test.ts:getGameplayTracker, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `getPendingRequest` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:getPendingRequest, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:getPendingRequest, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `getRelayAnnouncement` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`, `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:getRelayAnnouncement, apps/web/tests/ge06-relay-moment.test.ts:getRelayAnnouncement, apps/web/tests/ge06-relay-moment.test.ts:calls
- `getRelayLearningCard` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`, `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:getRelayLearningCard, apps/web/tests/ge06-relay-moment.test.ts:getRelayLearningCard, apps/web/tests/ge06-relay-moment.test.ts:calls
- `getRelayMomentStages` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`, `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:getRelayMomentStages, apps/web/tests/ge06-relay-moment.test.ts:getRelayMomentStages, apps/web/tests/ge06-relay-moment.test.ts:calls
- `haversineDistanceMeters` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`, `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/app/api/proofs/location/route.ts:haversineDistanceMeters, apps/web/src/components/map/InteractiveMap.tsx:haversineDistanceMeters, apps/web/src/app/api/proofs/location/route.ts:calls
- `isNaN` [MEDIUM] used by `subsystem-27-0-apps-web`, `subsystem-57-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`, `apps/web/src/components/wallet/GasBalance.tsx`. Evidence: apps/web/src/app/api/proofs/location/route.ts:isNaN, apps/web/src/components/wallet/GasBalance.tsx:isNaN, apps/web/src/app/api/proofs/location/route.ts:calls
- `isSupportedChain` [MEDIUM] used by `subsystem-43-0-apps-web`, `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`, `apps/web/tests/wallet.test.ts`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:isSupportedChain, apps/web/tests/wallet.test.ts:isSupportedChain, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `it` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:it, apps/web/tests/trail-ui.test.tsx:it, apps/web/tests/admin-health.test.ts:calls
- `join` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-17-0-apps-web`, `subsystem-50-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`, `apps/web/src/features/gameplay/passport/PassportCollection.tsx`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/features/analytics/tracker.ts:join, apps/web/src/features/gameplay/passport/PassportCollection.tsx:join, packages/contracts-cchain/test/accounting.test.mjs:join
- `json` [MEDIUM] used by `subsystem-0-0-packages-contracts-cchain`, `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`, `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: apps/web/tests/gameplay-config-api.test.ts:json, packages/contracts-cchain/lib/forge-std/scripts/vm.py:json, apps/web/tests/gameplay-config-api.test.ts:calls
- `map` [MEDIUM] used by `subsystem-0-0-packages-contracts-cchain`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`, `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: apps/web/src/components/map/map-styles.ts:map, packages/contracts-cchain/lib/forge-std/scripts/vm.py:map, apps/web/src/lib/gameplay/repository.ts:calls
- `map.addLayer` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.addLayer, apps/web/src/components/map/map-styles.ts:map.addLayer, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.addSource` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.addSource, apps/web/src/components/map/map-styles.ts:map.addSource, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.getLayer` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.getLayer, apps/web/src/components/map/map-styles.ts:map.getLayer, apps/web/src/components/map/map-styles.ts:calls
- `map.getSource` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.getSource, apps/web/src/components/map/map-styles.ts:map.getSource, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.isStyleLoaded` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.isStyleLoaded, apps/web/src/components/map/map-styles.ts:map.isStyleLoaded, apps/web/src/components/map/map-styles.ts:calls
- `mapUIStateToLifecycle` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapUIStateToLifecycle, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:mapUIStateToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `next` [MEDIUM] used by `subsystem-75-0-apps-web`, `subsystem-91-0-apps-web` from `apps/web/next.config.ts`, `apps/web/src/app/passport/page.tsx`. Evidence: apps/web/next.config.ts:next, apps/web/src/app/passport/page.tsx:next, apps/web/next.config.ts:imports
- `node:fs` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-18-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/tests/ge06-relay-moment.test.ts`, `apps/web/tests/trail-ui.test.tsx`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/tests/ge06-relay-moment.test.ts:node:fs, apps/web/tests/trail-ui.test.tsx:node:fs, packages/contracts-cchain/test/accounting.test.mjs:node:fs
- `node:path` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-5-0-packages-relayer` from `packages/contracts-cchain/test/accounting.test.mjs`, `packages/relayer/scripts/seed.ts`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:node:path, packages/relayer/scripts/seed.ts:node:path, packages/contracts-cchain/test/accounting.test.mjs:imports
- `onApproveAndDeposit` [MEDIUM] used by `subsystem-25-0-apps-web`, `subsystem-35-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`, `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:onApproveAndDeposit, apps/web/tests/features-modals.test.ts:onApproveAndDeposit, apps/web/tests/features-modals.test.ts:calls
- `padStart` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`, `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/app/api/admin/health/route.ts:padStart, apps/web/src/components/cross-chain/ICMProgressModal.tsx:padStart, apps/web/src/app/api/admin/health/route.ts:calls
- `parseFloat` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:parseFloat, apps/web/src/app/api/admin/health/route.ts:parseFloat, apps/web/src/app/admin/health/page.tsx:calls
- `parseSafeJSON` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-87-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/json-safe.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:parseSafeJSON, apps/web/tests/json-safe.test.ts:parseSafeJSON, apps/web/src/components/map/InteractiveMap.tsx:calls
- `path.join` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-6-0-packages-shared` from `packages/contracts-cchain/test/accounting.test.mjs`, `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:path.join, packages/shared/src/gameplay/analytics.ts:path.join, packages/contracts-cchain/test/accounting.test.mjs:calls
- `path.resolve` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-5-0-packages-relayer` from `packages/contracts-cchain/test/accounting.test.mjs`, `packages/relayer/scripts/seed.ts`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:path.resolve, packages/relayer/scripts/seed.ts:path.resolve, packages/contracts-cchain/test/accounting.test.mjs:calls
- `react` [MEDIUM] used by `subsystem-4-0-apps-web`, `subsystem-89-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:react, apps/web/src/components/cross-chain/useICMProgress.ts:react, apps/web/src/app/admin/health/page.tsx:imports
- `readFileSync` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/tests/ge06-relay-moment.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/ge06-relay-moment.test.ts:readFileSync, apps/web/tests/trail-ui.test.tsx:readFileSync, apps/web/tests/ge06-relay-moment.test.ts:calls
- `reconcileTrailProgressWithEvidence` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:reconcileTrailProgressWithEvidence, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:reconcileTrailProgressWithEvidence, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `recoverTrailProgressFromStorage` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-59-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:recoverTrailProgressFromStorage, apps/web/tests/ge04-evidence-reconciliation.test.ts:recoverTrailProgressFromStorage, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `reload` [MEDIUM] used by `subsystem-2-0-apps-web`, `subsystem-41-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/src/app/page.tsx:reload, apps/web/tests/icm-modal.test.ts:reload, apps/web/src/app/page.tsx:calls
- `repeat` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-82-0-packages-shared` from `apps/web/src/app/admin/health/page.tsx`, `packages/shared/tests/gameplay-schemas.test.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:repeat, packages/shared/tests/gameplay-schemas.test.ts:repeat, apps/web/src/app/admin/health/page.tsx:calls
- `res.json` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:res.json, apps/web/src/app/api/admin/health/route.ts:res.json, apps/web/src/app/admin/health/page.tsx:calls
- `response.json` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:response.json, apps/web/tests/admin-health.test.ts:response.json, apps/web/tests/admin-health.test.ts:calls
- `setErrorMessage` [MEDIUM] used by `subsystem-4-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setErrorMessage, apps/web/src/components/position/PositionView.tsx:setErrorMessage, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setInterval` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:setInterval, apps/web/src/components/cross-chain/useICMProgress.ts:setInterval, apps/web/src/app/admin/health/page.tsx:calls
- `setIsOpen` [MEDIUM] used by `subsystem-4-0-apps-web`, `subsystem-47-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/components/wallet/NetworkSwitcher.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setIsOpen, apps/web/src/components/wallet/NetworkSwitcher.tsx:setIsOpen, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setOnChainStatus` [MEDIUM] used by `subsystem-2-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/page.tsx:setOnChainStatus, apps/web/src/components/cross-chain/useICMProgress.ts:setOnChainStatus, apps/web/src/app/page.tsx:calls
- `setState` [MEDIUM] used by `subsystem-4-0-apps-web`, `subsystem-48-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/features/gameplay/passport/PassportClient.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setState, apps/web/src/features/gameplay/passport/PassportClient.tsx:setState, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setTimeout` [MEDIUM] used by `subsystem-13-0-apps-web`, `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:setTimeout, apps/web/src/app/api/admin/health/route.ts:setTimeout, apps/web/src/app/api/admin/health/route.ts:calls
- `setTxHash` [MEDIUM] used by `subsystem-4-0-apps-web`, `subsystem-8-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setTxHash, apps/web/src/components/position/PositionView.tsx:setTxHash, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setupBasemapLayers` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-16-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/tests/map.test.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setupBasemapLayers, apps/web/tests/map.test.ts:setupBasemapLayers, apps/web/tests/map.test.ts:calls
- `shouldCelebrateICM` [MEDIUM] used by `subsystem-10-0-apps-web`, `subsystem-52-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`, `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:shouldCelebrateICM, apps/web/tests/ge06-relay-moment.test.ts:shouldCelebrateICM, apps/web/tests/ge06-relay-moment.test.ts:calls
- `slice` [MEDIUM] used by `subsystem-17-0-apps-web`, `subsystem-50-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`, `apps/web/src/features/gameplay/passport/PassportCollection.tsx`. Evidence: apps/web/src/features/analytics/tracker.ts:slice, apps/web/src/features/gameplay/passport/PassportCollection.tsx:slice, apps/web/src/features/analytics/tracker.ts:calls
- `split` [MEDIUM] used by `subsystem-26-0-apps-web`, `subsystem-50-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`, `apps/web/src/features/gameplay/passport/PassportCollection.tsx`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:split, apps/web/src/features/gameplay/passport/PassportCollection.tsx:split, apps/web/src/app/api/faucet/gas/route.ts:calls
- `style` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-30-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`, `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:style, apps/web/src/components/map/map-styles.ts:style, apps/web/src/components/map/map-styles.ts:calls
- `test` [MEDIUM] used by `subsystem-12-0-packages-contracts-cchain`, `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`, `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:test, packages/contracts-cchain/test/accounting.test.mjs:test, apps/web/src/app/api/faucet/gas/route.ts:calls
- `thirdweb/react` [MEDIUM] used by `subsystem-56-0-apps-web`, `subsystem-65-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/app/page.tsx:thirdweb/react, apps/web/src/lib/thirdweb.ts:thirdweb/react, apps/web/src/app/page.tsx:imports
- `toBe` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:toBe, apps/web/tests/trail-ui.test.tsx:toBe, apps/web/tests/admin-health.test.ts:calls
- `toBeDefined` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:toBeDefined, apps/web/tests/trail-ui.test.tsx:toBeDefined, apps/web/tests/admin-health.test.ts:calls
- `toContain` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:toContain, apps/web/tests/trail-ui.test.tsx:toContain, apps/web/tests/admin-health.test.ts:calls
- `toEqual` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/api.test.ts:toEqual, apps/web/tests/trail-ui.test.tsx:toEqual, apps/web/tests/api.test.ts:calls
- `toHaveLength` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/api.test.ts:toHaveLength, apps/web/tests/trail-ui.test.tsx:toHaveLength, apps/web/tests/api.test.ts:calls
- `toISOString` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:toISOString, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:toISOString, apps/web/src/app/api/admin/analytics/route.ts:calls
- `toLowerCase` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`, `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:toLowerCase, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:toLowerCase, apps/web/src/features/gameplay/passport/engine.ts:calls
- `toString` [MEDIUM] used by `subsystem-17-0-apps-web`, `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`, `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/app/page.tsx:toString, apps/web/src/features/analytics/tracker.ts:toString, apps/web/src/app/page.tsx:calls
- `trailDefinitionSchema.safeParse` [MEDIUM] used by `subsystem-11-0-apps-web`, `subsystem-82-0-packages-shared` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`, `packages/shared/tests/gameplay-schemas.test.ts`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trailDefinitionSchema.safeParse, packages/shared/tests/gameplay-schemas.test.ts:trailDefinitionSchema.safeParse, packages/shared/tests/gameplay-schemas.test.ts:calls
- `useCallback` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:useCallback, apps/web/src/components/cross-chain/useICMProgress.ts:useCallback, apps/web/src/app/admin/health/page.tsx:calls
- `useEffect` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:useEffect, apps/web/src/components/cross-chain/useICMProgress.ts:useEffect, apps/web/src/app/admin/health/page.tsx:calls
- `useRef` [MEDIUM] used by `subsystem-1-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`, `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:useRef, apps/web/src/components/map/InteractiveMap.tsx:useRef, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `useState` [MEDIUM] used by `subsystem-3-0-apps-web`, `subsystem-4-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`, `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/app/admin/health/page.tsx:useState, apps/web/src/components/cross-chain/useICMProgress.ts:useState, apps/web/src/app/admin/health/page.tsx:calls
- `vitest` [MEDIUM] used by `subsystem-18-0-apps-web`, `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`, `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/admin-health.test.ts:vitest, apps/web/tests/trail-ui.test.tsx:vitest, apps/web/tests/admin-health.test.ts:imports
- `./ICMProgressModal.module.css` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:./ICMProgressModal.module.css, apps/web/src/components/cross-chain/ICMProgressModal.tsx:imports
- `./PassportCollection.module.css` [LOW] used by `subsystem-50-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportCollection.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:./PassportCollection.module.css, apps/web/src/features/gameplay/passport/PassportCollection.tsx:imports
- `@/app/api/admin/analytics/route` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:@/app/api/admin/analytics/route, apps/web/tests/ge07-analytics-funnel.test.ts:imports
- `@/app/api/map-config/route` [LOW] used by `subsystem-87-0-apps-web` from `apps/web/tests/json-safe.test.ts`. Evidence: apps/web/tests/json-safe.test.ts:@/app/api/map-config/route, apps/web/tests/json-safe.test.ts:imports
- `@/components/cross-chain/icm-storage` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:@/components/cross-chain/icm-storage, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports
- `@/components/cross-chain/types` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:@/components/cross-chain/types, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports, apps/web/src/features/gameplay/trails/evidence-adapter.ts:imports
- `@/components/map/types` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:@/components/map/types, apps/web/tests/map.test.ts:imports
- `@/components/position` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/position, apps/web/src/app/page.tsx:imports
- `@/components/quest` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/quest, apps/web/src/app/page.tsx:imports
- `@/components/sponsor` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/sponsor, apps/web/src/app/page.tsx:imports
- `@/components/wallet/ConnectWalletButton` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/wallet/ConnectWalletButton, apps/web/src/app/page.tsx:imports
- `@/components/wallet/GasBalance` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/wallet/GasBalance, apps/web/src/app/page.tsx:imports
- `@/components/wallet/NetworkSwitcher` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/components/wallet/NetworkSwitcher, apps/web/src/app/page.tsx:imports
- `@/components/wallet/WalletHeader` [LOW] used by `subsystem-74-0-apps-web` from `apps/web/src/app/layout.tsx`. Evidence: apps/web/src/app/layout.tsx:@/components/wallet/WalletHeader, apps/web/src/app/layout.tsx:imports
- `@/components/wallet/WalletProvider` [LOW] used by `subsystem-74-0-apps-web` from `apps/web/src/app/layout.tsx`. Evidence: apps/web/src/app/layout.tsx:@/components/wallet/WalletProvider, apps/web/src/app/layout.tsx:imports
- `@/features/analytics` [LOW] used by `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:@/features/analytics, apps/web/src/features/gameplay/passport/PassportClient.tsx:imports, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:imports
- `@/features/analytics/funnel` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/funnel, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/features/analytics/sink` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/features/analytics/sink, apps/web/src/app/api/admin/analytics/route.ts:imports
- `@/features/gameplay/passport/PassportClient` [LOW] used by `subsystem-75-0-apps-web` from `apps/web/src/app/passport/page.tsx`. Evidence: apps/web/src/app/passport/page.tsx:@/features/gameplay/passport/PassportClient, apps/web/src/app/passport/page.tsx:imports
- `@/features/gameplay/trails` [LOW] used by `subsystem-56-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:@/features/gameplay/trails, apps/web/src/app/page.tsx:imports
- `@/lib/api-response` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:@/lib/api-response, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/faucet/gas/route.ts:imports
- `@/lib/campus` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/campus, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/map-config/route.ts:imports
- `@/lib/gameplay/repository` [LOW] used by `subsystem-67-0-apps-web` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:@/lib/gameplay/repository, apps/web/src/app/api/gameplay/seasons/active/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `@/lib/geo` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:@/lib/geo, apps/web/src/app/api/proofs/location/route.ts:imports, apps/web/src/app/api/proofs/sponsor/route.ts:imports
- `@/lib/proof-signer` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:@/lib/proof-signer, apps/web/src/app/api/admin/health/route.ts:imports, apps/web/src/app/api/proofs/location/route.ts:imports
- `@/lib/rate-limiter` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:@/lib/rate-limiter, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:imports
- `@eslint/js` [LOW] used by `subsystem-79-0-eslint-config-mjs` from `eslint.config.mjs`. Evidence: eslint.config.mjs:@eslint/js, eslint.config.mjs:imports
- `APR` [LOW] used by `subsystem-53-0-packages-shared` from `packages/shared/src/math/progression.ts`. Evidence: packages/shared/src/math/progression.ts:APR, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- `AVAX` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:AVAX, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `Active` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Active, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls
- `AdminHealthPage` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:AdminHealthPage, apps/web/src/app/admin/health/page.tsx:calls
- `Array.from` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:Array.from, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `BUỘC` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:BUỘC, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `Badge` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:Badge, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `Balance` [LOW] used by `subsystem-62-0-apps-web` from `apps/web/src/components/wallet/WalletHeader.tsx`. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:Balance, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `Banner` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Banner, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `Bar` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Bar, apps/web/src/app/admin/health/page.tsx:calls
- `Boolean` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:Boolean, packages/shared/src/gameplay/rules.ts:calls
- `Box` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Box, apps/web/src/components/position/PositionView.tsx:calls
- `Budget` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Budget, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `Budgets` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:Budgets, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `Button` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Button, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `Calculation` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:Calculation, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/map.test.ts:calls
- `Calculations` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Calculations, apps/web/src/components/position/PositionView.tsx:calls
- `Card` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:Card, apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `Center` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:Center, apps/web/tests/map.test.ts:calls, apps/web/src/components/map/geo-utils.ts:calls
- `Chest` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:Chest, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Chests` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Chests, apps/web/src/components/map/InteractiveMap.tsx:calls
- `Compass` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Compass, apps/web/src/components/map/InteractiveMap.tsx:calls
- `Conformance` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:Conformance, apps/web/tests/api.test.ts:calls
- `CustomEvent` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:CustomEvent, apps/web/src/features/gameplay/passport/storage.ts:calls
- `DEFAULT_DEMO_CHESTS.find` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:DEFAULT_DEMO_CHESTS.find, apps/web/src/components/map/InteractiveMap.tsx:calls
- `DEMO` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:DEMO, apps/web/src/app/api/proofs/location/route.ts:calls
- `DEMO_CAMPUS_SLOTS.map` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:DEMO_CAMPUS_SLOTS.map, apps/web/src/lib/campus.ts:calls
- `Definitions` [LOW] used by `subsystem-43-0-apps-web` from `apps/web/tests/wallet.test.ts`. Evidence: apps/web/tests/wallet.test.ts:Definitions, apps/web/tests/wallet.test.ts:calls
- `Enforcement` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:Enforcement, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `Engine` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:Engine, packages/shared/src/gameplay/analytics.ts:calls
- `Execution` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:Execution, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `FORBIDDEN_ANALYTICS_KEY_REGEX.test` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:FORBIDDEN_ANALYTICS_KEY_REGEX.test, packages/shared/src/gameplay/analytics.ts:calls
- `Fallback` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:Fallback, apps/web/tests/features-modals.test.ts:calls
- `Faucet` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Faucet, apps/web/src/app/admin/health/page.tsx:calls
- `Flow` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:Flow, apps/web/tests/features-modals.test.ts:calls
- `Formatters` [LOW] used by `subsystem-43-0-apps-web` from `apps/web/tests/wallet.test.ts`. Evidence: apps/web/tests/wallet.test.ts:Formatters, apps/web/tests/wallet.test.ts:calls
- `GAS` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:GAS, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `GET` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:GET, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `GPS` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:GPS, packages/shared/src/gameplay/analytics.ts:calls
- `GUARANTEE` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:GUARANTEE, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `GameplayConfigError` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:GameplayConfigError, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `GameplayTracker` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:GameplayTracker, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `Generation` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:Generation, apps/web/tests/map.test.ts:calls
- `Guard` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Guard, apps/web/src/app/admin/health/page.tsx:calls
- `HUD` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:HUD, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `HomePage` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:HomePage, apps/web/src/app/page.tsx:calls
- `Html5Qrcode` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:Html5Qrcode, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `Hydration` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:Hydration, apps/web/tests/icm-modal.test.ts:calls
- `L1` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:L1, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `Layer` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:Layer, apps/web/src/components/map/map-styles.ts:calls, apps/web/src/components/map/map-styles.ts:calls
- `MOCK_USDC_ADDRESS.startsWith` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:MOCK_USDC_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `Management` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:Management, apps/web/tests/map.test.ts:calls
- `Map` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Map, apps/web/src/app/page.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls
- `MapLibreMap` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:MapLibreMap, apps/web/src/components/map/InteractiveMap.tsx:calls
- `MapLibreMarker` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:MapLibreMarker, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `Math.abs` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:Math.abs, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Math.asin` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:Math.asin, apps/web/src/components/map/geo-utils.ts:calls
- `Math.atan2` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:Math.atan2, apps/web/src/components/map/geo-utils.ts:calls, apps/web/src/components/map/geo-utils.ts:calls
- `Math.cos` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:Math.cos, apps/web/src/components/map/geo-utils.ts:calls, apps/web/src/components/map/geo-utils.ts:calls
- `Math.imul` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:Math.imul, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `Math.random` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:Math.random, apps/web/src/features/analytics/tracker.ts:calls
- `Math.sin` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:Math.sin, apps/web/src/components/map/geo-utils.ts:calls, apps/web/src/components/map/geo-utils.ts:calls
- `Math.sqrt` [LOW] used by `subsystem-58-0-apps-web` from `apps/web/src/lib/geo.ts`. Evidence: apps/web/src/lib/geo.ts:Math.sqrt, apps/web/src/lib/geo.ts:calls
- `MemoryAnalyticsSink` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:MemoryAnalyticsSink, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `Messaging` [LOW] used by `subsystem-69-0-apps-web` from `apps/web/src/components/cross-chain/types.ts`. Evidence: apps/web/src/components/cross-chain/types.ts:Messaging, apps/web/src/components/cross-chain/types.ts:calls
- `Modal` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Modal, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `Modes` [LOW] used by `subsystem-43-0-apps-web` from `apps/web/tests/wallet.test.ts`. Evidence: apps/web/tests/wallet.test.ts:Modes, apps/web/tests/wallet.test.ts:calls
- `Mạnh` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Mạnh, apps/web/src/components/position/PositionView.tsx:calls
- `NavigationControl` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:NavigationControl, apps/web/src/components/map/InteractiveMap.tsx:calls
- `NextRequest` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:NextRequest, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `NextResponse.json` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:NextResponse.json, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `Ngày` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Ngày, apps/web/src/components/position/PositionView.tsx:calls
- `Number.isFinite` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:Number.isFinite, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `Number.isSafeInteger` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:Number.isSafeInteger, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- `Object.entries` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:Object.entries, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `PASSPORT_BADGES.map` [LOW] used by `subsystem-66-0-apps-web` from `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/tests/passport-engine.test.ts:PASSPORT_BADGES.map, apps/web/tests/passport-engine.test.ts:calls
- `PENDING_ICM_STATES.has` [LOW] used by `subsystem-51-0-apps-web` from `apps/web/src/features/gameplay/trails/model.ts`. Evidence: apps/web/src/features/gameplay/trails/model.ts:PENDING_ICM_STATES.has, apps/web/src/features/gameplay/trails/model.ts:calls
- `PENDING_LIFECYCLE_STATUSES.has` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:PENDING_LIFECYCLE_STATUSES.has, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `POST` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:POST, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `Pass` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:Pass, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `PassportPage` [LOW] used by `subsystem-75-0-apps-web` from `apps/web/src/app/passport/page.tsx`. Evidence: apps/web/src/app/passport/page.tsx:PassportPage, apps/web/src/app/passport/page.tsx:calls
- `Path` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:Path, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `Phá` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Phá, apps/web/src/app/page.tsx:calls
- `Pipeline` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Pipeline, apps/web/src/app/page.tsx:calls
- `PlayerState` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:PlayerState, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `Preview` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:Preview, apps/web/tests/features-modals.test.ts:calls
- `Privacy` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:Privacy, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `Promise` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Promise, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `Promise.all` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:Promise.all, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/scripts/seed.ts:calls
- `Promise.resolve` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:Promise.resolve, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `RANGE` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:RANGE, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `RELAY_STAGE_COPY.map` [LOW] used by `subsystem-46-0-apps-web` from `apps/web/src/components/cross-chain/relay-moment.ts`. Evidence: apps/web/src/components/cross-chain/relay-moment.ts:RELAY_STAGE_COPY.map, apps/web/src/components/cross-chain/relay-moment.ts:calls
- `RangeError` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:RangeError, packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `Ratio` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Ratio, apps/web/src/app/admin/health/page.tsx:calls
- `React.useCallback` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:React.useCallback, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `React.useEffect` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:React.useEffect, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `React.useMemo` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:React.useMemo, apps/web/src/app/page.tsx:calls
- `React.useRef` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:React.useRef, apps/web/src/app/page.tsx:calls
- `Reconciliation` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:Reconciliation, apps/web/src/lib/rate-limiter.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `Relayer` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:Relayer, apps/web/src/app/api/admin/health/route.ts:calls, packages/relayer/src/main.ts:calls
- `RequestStatus` [LOW] used by `subsystem-69-0-apps-web` from `apps/web/src/components/cross-chain/types.ts`. Evidence: apps/web/src/components/cross-chain/types.ts:RequestStatus, apps/web/src/components/cross-chain/types.ts:calls
- `Reserve` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Reserve, apps/web/src/app/admin/health/page.tsx:calls
- `Retry` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:Retry, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `Rewards` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:Rewards, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `RootLayout` [LOW] used by `subsystem-74-0-apps-web` from `apps/web/src/app/layout.tsx`. Evidence: apps/web/src/app/layout.tsx:RootLayout, apps/web/src/app/layout.tsx:calls
- `SENSITIVE_KEY_PATTERN.test` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:SENSITIVE_KEY_PATTERN.test, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `SPONSOR_POOL_ADDRESS.startsWith` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:SPONSOR_POOL_ADDRESS.startsWith, packages/relayer/scripts/seed.ts:calls
- `Safe` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:Safe, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `Schemas` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:Schemas, packages/shared/src/gameplay/analytics.ts:calls
- `Screens` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:Screens, apps/web/tests/features-modals.test.ts:calls
- `Section` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Section, apps/web/src/app/page.tsx:calls
- `Seeding` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:Seeding, packages/relayer/scripts/seed.ts:calls
- `Selector` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Selector, apps/web/src/components/map/InteractiveMap.tsx:calls
- `Set` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:Set, apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `Sheet` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:Sheet, apps/web/src/components/map/InteractiveMap.tsx:calls
- `Signer` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:Signer, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `Sinks` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:Sinks, apps/web/src/features/analytics/sink.ts:calls
- `SponsorPool` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:SponsorPool, packages/relayer/scripts/seed.ts:calls
- `SponsorPool.fundAll` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:SponsorPool.fundAll, packages/relayer/scripts/seed.ts:calls
- `SponsorProof` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:SponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `Structure` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:Structure, apps/web/tests/icm-modal.test.ts:calls
- `System` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:System, apps/web/tests/icm-modal.test.ts:calls
- `Sản` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Sản, apps/web/src/components/position/PositionView.tsx:calls
- `Telemetry` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:Telemetry, apps/web/tests/admin-health.test.ts:calls
- `Timers` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:Timers, apps/web/tests/icm-modal.test.ts:calls
- `Transitions` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:Transitions, apps/web/tests/icm-modal.test.ts:calls
- `Type` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:Type, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `USDC` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:USDC, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- `Unlock` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:Unlock, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `VersionedGameplayConfigRepository` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:VersionedGameplayConfigRepository, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `Vốn` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:Vốn, apps/web/src/app/page.tsx:calls
- `Withdrawal` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:Withdrawal, apps/web/src/components/position/PositionView.tsx:calls
- `YieldVault` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:YieldVault, apps/web/src/app/page.tsx:calls
- `account.signTypedData` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:account.signTypedData, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `accruedReward.toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:accruedReward.toFixed, apps/web/src/components/position/PositionView.tsx:calls
- `accuracy` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:accuracy, apps/web/tests/api.test.ts:calls
- `accuracyMeters.toFixed` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:accuracyMeters.toFixed, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `activeInstant.getTime` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:activeInstant.getTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `addTo` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:addTo, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `addr.startsWith` [LOW] used by `subsystem-64-0-apps-web` from `apps/web/src/lib/server-env.ts`. Evidence: apps/web/src/lib/server-env.ts:addr.startsWith, apps/web/src/lib/server-env.ts:calls
- `address` [LOW] used by `subsystem-62-0-apps-web` from `apps/web/src/components/wallet/WalletHeader.tsx`. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:address, apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `address.slice` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:address.slice, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `address.startsWith` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:address.startsWith, packages/relayer/scripts/seed.ts:calls
- `address.toLowerCase` [LOW] used by `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:address.toLowerCase, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `address.trim` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:address.trim, apps/web/src/lib/chains.ts:calls
- `afterEach` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:afterEach, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `altChestId.toLowerCase` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:altChestId.toLowerCase, apps/web/src/lib/campus.ts:calls
- `amountUsdc.toFixed` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:amountUsdc.toFixed, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `app` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:app, apps/web/src/lib/chains.ts:calls
- `appendTeamScoreEvent` [LOW] used by `subsystem-83-0-packages-shared` from `packages/shared/tests/gameplay-scoring.test.ts`. Evidence: packages/shared/tests/gameplay-scoring.test.ts:appendTeamScoreEvent, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `applyCheckpointEvidence` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:applyCheckpointEvidence, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `applyConfirmedEvidence` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:applyConfirmedEvidence, apps/web/tests/trail-ui.test.tsx:calls
- `argparse` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `argparse.ArgumentParser` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:argparse.ArgumentParser, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `assert.equal` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:assert.equal, packages/contracts-cchain/test/accounting.test.mjs:calls
- `assert.ok` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:assert.ok, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `at.getTime` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:at.getTime, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `at.toISOString` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:at.toISOString, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `badges.filter` [LOW] used by `subsystem-66-0-apps-web` from `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/tests/passport-engine.test.ts:badges.filter, apps/web/tests/passport-engine.test.ts:calls
- `badges.find` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:badges.find, apps/web/src/features/gameplay/passport/engine.ts:calls
- `badges.flatMap` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:badges.flatMap, apps/web/src/features/gameplay/passport/storage.ts:calls
- `badges.push` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:badges.push, apps/web/src/features/gameplay/passport/engine.ts:calls
- `badges.sort` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:badges.sort, apps/web/src/features/gameplay/passport/engine.ts:calls
- `balance` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:balance, apps/web/src/app/api/admin/health/route.ts:calls
- `baseUrl.replace` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:baseUrl.replace, apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls
- `basemap` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:basemap, apps/web/src/components/map/InteractiveMap.tsx:calls
- `bearing` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:bearing, apps/web/src/components/map/geo-utils.ts:calls
- `beforeEach` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:beforeEach, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `bezier` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:bezier, apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- `blur` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:blur, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `budget` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:budget, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `buildEip712Domain` [LOW] used by `subsystem-81-0-packages-shared` from `packages/shared/tests/eip712.test.ts`. Evidence: packages/shared/tests/eip712.test.ts:buildEip712Domain, packages/shared/tests/eip712.test.ts:calls
- `bytes` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `calc` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calc, apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `calculateBearing` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:calculateBearing, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `calculateCompassLevel` [LOW] used by `subsystem-84-0-packages-shared` from `packages/shared/tests/progression.test.ts`. Evidence: packages/shared/tests/progression.test.ts:calculateCompassLevel, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `calculateExplorationScore` [LOW] used by `subsystem-84-0-packages-shared` from `packages/shared/tests/progression.test.ts`. Evidence: packages/shared/tests/progression.test.ts:calculateExplorationScore, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `calculatePilotFunnel` [LOW] used by `subsystem-76-0-apps-web` from `apps/web/src/features/analytics/funnel.ts`. Evidence: apps/web/src/features/analytics/funnel.ts:calculatePilotFunnel, apps/web/src/features/analytics/funnel.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `calculateTeamScore` [LOW] used by `subsystem-83-0-packages-shared` from `packages/shared/tests/gameplay-scoring.test.ts`. Evidence: packages/shared/tests/gameplay-scoring.test.ts:calculateTeamScore, packages/shared/tests/gameplay-scoring.test.ts:calls
- `cb` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:cb, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `ccs.sort` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:ccs.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `chainKey.toLowerCase` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:chainKey.toLowerCase, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `cheats.insert` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:cheats.insert, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `check` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:check, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `checkFaucetRateLimit` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:checkFaucetRateLimit, apps/web/src/app/api/faucet/gas/route.ts:calls
- `checkReconcileRateLimit` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:checkReconcileRateLimit, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `checkpoint` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:checkpoint, packages/shared/tests/gameplay-analytics.test.ts:calls
- `checkpointIds.has` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:checkpointIds.has, apps/web/src/features/gameplay/trails/storage.ts:calls
- `checkpointSlots.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:checkpointSlots.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `checkpoints.find` [LOW] used by `subsystem-51-0-apps-web` from `apps/web/src/features/gameplay/trails/model.ts`. Evidence: apps/web/src/features/gameplay/trails/model.ts:checkpoints.find, apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/model.ts:calls
- `checkpoints.some` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:checkpoints.some, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `chestId` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:chestId, apps/web/src/lib/campus.ts:calls
- `chestId.replace` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:chestId.replace, apps/web/src/lib/campus.ts:calls
- `chestId.toLowerCase` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:chestId.toLowerCase, apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls
- `chestTypes.get` [LOW] used by `subsystem-54-0-packages-shared` from `packages/shared/tests/gameplay-rules.test.ts`. Evidence: packages/shared/tests/gameplay-rules.test.ts:chestTypes.get, packages/shared/tests/gameplay-rules.test.ts:calls
- `chests.find` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:chests.find, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `chests.forEach` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:chests.forEach, apps/web/src/components/map/InteractiveMap.tsx:calls
- `chuẩn` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:chuẩn, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `clearPendingRequest` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:clearPendingRequest, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `clearSimulationTimers` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:clearSimulationTimers, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `clipboard.writeText` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:clipboard.writeText, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `clock` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:clock, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `closeModal` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:closeModal, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `code` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:code, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `collection.filter` [LOW] used by `subsystem-50-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportCollection.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:collection.filter, apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- `collection.find` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:collection.find, apps/web/src/features/gameplay/passport/engine.ts:calls
- `collection.map` [LOW] used by `subsystem-50-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportCollection.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:collection.map, apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- `collection.push` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:collection.push, apps/web/src/features/gameplay/passport/engine.ts:calls
- `completedCheckpointIds.add` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedCheckpointIds.add, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedCheckpointIds.has` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedCheckpointIds.has, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedCheckpoints.every` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:completedCheckpoints.every, apps/web/src/features/gameplay/trails/storage.ts:calls
- `completedCheckpoints.filter` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:completedCheckpoints.filter, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `completedCheckpoints.flatMap` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:completedCheckpoints.flatMap, packages/shared/src/gameplay/schemas.ts:calls
- `completedCheckpoints.map` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:completedCheckpoints.map, apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `completedCheckpoints.slice` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:completedCheckpoints.slice, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `completedCheckpoints.some` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:completedCheckpoints.some, apps/web/src/features/gameplay/trails/storage.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `completedKeys.add` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedKeys.add, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedKeys.has` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedKeys.has, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedRequestIds.add` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedRequestIds.add, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedRequestIds.has` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:completedRequestIds.has, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `completedTrailKeys.add` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:completedTrailKeys.add, apps/web/src/features/analytics/tracker.ts:calls
- `completedTrailKeys.clear` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:completedTrailKeys.clear, apps/web/src/features/analytics/tracker.ts:calls
- `completedTrailKeys.has` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:completedTrailKeys.has, apps/web/src/features/analytics/tracker.ts:calls
- `completion` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:completion, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `component` [LOW] used by `subsystem-70-0-apps-web` from `apps/web/src/components/map/VirtualCompass.tsx`. Evidence: apps/web/src/components/map/VirtualCompass.tsx:component, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `computeCampaignIdHash` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:computeCampaignIdHash, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `computeH3Cell` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:computeH3Cell, apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls
- `confirmedIds.has` [LOW] used by `subsystem-51-0-apps-web` from `apps/web/src/features/gameplay/trails/model.ts`. Evidence: apps/web/src/features/gameplay/trails/model.ts:confirmedIds.has, apps/web/src/features/gameplay/trails/model.ts:calls
- `console.debug` [LOW] used by `subsystem-71-0-apps-web` from `apps/web/src/components/wallet/WalletProvider.tsx`. Evidence: apps/web/src/components/wallet/WalletProvider.tsx:console.debug, apps/web/src/components/wallet/WalletProvider.tsx:calls
- `console.error` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:console.error, packages/relayer/scripts/seed.ts:calls
- `constraints` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:constraints, apps/web/src/app/api/proofs/location/route.ts:calls
- `constructor` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:constructor, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/features/analytics/sink.ts:calls
- `content.includes` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:content.includes, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `content.split` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:content.split, packages/relayer/scripts/seed.ts:calls
- `context.addIssue` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:context.addIssue, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `coordinates` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:coordinates, apps/web/src/app/api/proofs/location/route.ts:calls
- `coordinates.push` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:coordinates.push, apps/web/src/components/map/geo-utils.ts:calls
- `copy` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `copy.deepcopy` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:copy.deepcopy, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `cost` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:cost, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `createEarnedBadge` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:createEarnedBadge, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `createLocationProofTypedData` [LOW] used by `subsystem-81-0-packages-shared` from `packages/shared/tests/eip712.test.ts`. Evidence: packages/shared/tests/eip712.test.ts:createLocationProofTypedData, packages/shared/tests/eip712.test.ts:calls
- `createPerkClaim` [LOW] used by `subsystem-54-0-packages-shared` from `packages/shared/tests/gameplay-rules.test.ts`. Evidence: packages/shared/tests/gameplay-rules.test.ts:createPerkClaim, packages/shared/tests/gameplay-rules.test.ts:calls
- `createPublicClient` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:createPublicClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `createSignedSponsorQrPayload` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:createSignedSponsorQrPayload, apps/web/tests/api.test.ts:calls
- `createSponsorProofTypedData` [LOW] used by `subsystem-81-0-packages-shared` from `packages/shared/tests/eip712.test.ts`. Evidence: packages/shared/tests/eip712.test.ts:createSponsorProofTypedData, packages/shared/tests/eip712.test.ts:calls
- `createTeamScoreEvent` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:createTeamScoreEvent, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `createTeamScoreEventIdentity` [LOW] used by `subsystem-83-0-packages-shared` from `packages/shared/tests/gameplay-scoring.test.ts`. Evidence: packages/shared/tests/gameplay-scoring.test.ts:createTeamScoreEventIdentity, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `createThirdwebClient` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:createThirdwebClient, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/thirdweb.ts:calls
- `createWallet` [LOW] used by `subsystem-65-0-apps-web` from `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/lib/thirdweb.ts:createWallet, apps/web/src/lib/thirdweb.ts:calls
- `createWalletClient` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:createWalletClient, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `crypto.createHmac` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:crypto.createHmac, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `crypto.randomBytes` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:crypto.randomBytes, apps/web/src/lib/proof-signer.ts:calls
- `current.clear` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:current.clear, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `current.flyTo` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:current.flyTo, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `current.forEach` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.forEach, apps/web/src/app/page.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `current.push` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.push, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `current.remove` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:current.remove, apps/web/src/components/map/InteractiveMap.tsx:calls
- `current.setConfirmed` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.setConfirmed, apps/web/src/app/page.tsx:calls
- `current.setLngLat` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:current.setLngLat, apps/web/src/components/map/InteractiveMap.tsx:calls
- `current.setOnChainStatus` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.setOnChainStatus, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `current.setPending` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.setPending, apps/web/src/app/page.tsx:calls
- `current.setSubmitted` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.setSubmitted, apps/web/src/app/page.tsx:calls
- `current.startRequest` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:current.startRequest, apps/web/src/app/page.tsx:calls
- `current.stop` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:current.stop, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `darkTheme` [LOW] used by `subsystem-65-0-apps-web` from `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/lib/thirdweb.ts:darkTheme, apps/web/src/lib/thirdweb.ts:calls
- `datetime` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:datetime, packages/shared/src/gameplay/schemas.ts:calls
- `decimals` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:decimals, packages/contracts-cchain/test/accounting.test.mjs:calls
- `decode` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:decode, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `defineChain` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:defineChain, apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls
- `definition` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:definition, apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls
- `demoModePolicy` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:demoModePolicy, packages/shared/src/gameplay/rules.ts:calls
- `deposit` [LOW] used by `subsystem-53-0-packages-shared` from `packages/shared/src/math/progression.ts`. Evidence: packages/shared/src/math/progression.ts:deposit, packages/shared/src/math/progression.ts:calls
- `details` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:details, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `detectForbiddenFields` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:detectForbiddenFields, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `digest` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:digest, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `direction` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:direction, apps/web/src/components/map/geo-utils.ts:calls
- `disconnect` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:disconnect, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `document.createElement` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:document.createElement, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `document.getElementById` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:document.getElementById, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `dummyWallet.slice` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:dummyWallet.slice, packages/shared/tests/gameplay-analytics.test.ts:calls
- `dummyWallet.toUpperCase` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:dummyWallet.toUpperCase, packages/shared/tests/gameplay-analytics.test.ts:calls
- `e.includes` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:e.includes, packages/shared/tests/gameplay-analytics.test.ts:calls
- `e.stopPropagation` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:e.stopPropagation, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `earnedBadgeSchema.safeParse` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:earnedBadgeSchema.safeParse, apps/web/src/features/gameplay/passport/storage.ts:calls
- `el.addEventListener` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:el.addEventListener, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `el.setAttribute` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:el.setAttribute, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `eligibleEventTypes.includes` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:eligibleEventTypes.includes, packages/shared/src/gameplay/rules.ts:calls
- `emit` [LOW] used by `subsystem-95-0-apps-web` from `apps/web/src/features/analytics/types.ts`. Evidence: apps/web/src/features/analytics/types.ts:emit, apps/web/src/features/analytics/types.ts:calls
- `encodePacked` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:encodePacked, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `encodeURIComponent` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:encodeURIComponent, apps/web/src/components/map/map-styles.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- `endsWith` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:endsWith, packages/relayer/scripts/seed.ts:calls
- `ensureGasOnChain` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:ensureGasOnChain, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `enumerate` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:enumerate, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `envKey.startsWith` [LOW] used by `subsystem-64-0-apps-web` from `apps/web/src/lib/server-env.ts`. Evidence: apps/web/src/lib/server-env.ts:envKey.startsWith, apps/web/src/lib/server-env.ts:calls
- `epoch` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:epoch, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `errorResponse` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:errorResponse, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `errors.map` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:errors.map, packages/contracts-cchain/test/accounting.test.mjs:calls
- `errors.push` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:errors.push, apps/web/src/features/analytics/sink.ts:calls
- `evaluatePerkEligibility` [LOW] used by `subsystem-54-0-packages-shared` from `packages/shared/tests/gameplay-rules.test.ts`. Evidence: packages/shared/tests/gameplay-rules.test.ts:evaluatePerkEligibility, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `event.preventDefault` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:event.preventDefault, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `event.stopPropagation` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:event.stopPropagation, apps/web/src/components/map/InteractiveMap.tsx:calls
- `eventId.localeCompare` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:eventId.localeCompare, apps/web/src/features/gameplay/passport/engine.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `events.filter` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:events.filter, apps/web/src/features/analytics/sink.ts:calls
- `events.push` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:events.push, apps/web/src/features/analytics/sink.ts:calls
- `every` [LOW] used by `subsystem-52-0-apps-web` from `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/tests/ge06-relay-moment.test.ts:every, apps/web/tests/ge06-relay-moment.test.ts:calls
- `evidence.at` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:evidence.at, apps/web/src/features/gameplay/passport/engine.ts:calls
- `evidence.flatMap` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:evidence.flatMap, apps/web/src/features/gameplay/passport/storage.ts:calls
- `evidence.map` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:evidence.map, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/engine.ts:calls
- `evidence.slice` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:evidence.slice, packages/shared/src/gameplay/rules.ts:calls
- `evidenceEventId.startsWith` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:evidenceEventId.startsWith, apps/web/src/features/gameplay/trails/storage.ts:calls
- `evidenceItems.push` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:evidenceItems.push, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `evidenceRefs.at` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:evidenceRefs.at, apps/web/src/features/gameplay/passport/engine.ts:calls
- `existing.some` [LOW] used by `subsystem-44-0-packages-shared` from `packages/shared/src/gameplay/scoring.ts`. Evidence: packages/shared/src/gameplay/scoring.ts:existing.some, packages/shared/src/gameplay/scoring.ts:calls
- `existingClaims.some` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:existingClaims.some, packages/shared/src/gameplay/rules.ts:calls
- `existingSource.setData` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:existingSource.setData, apps/web/src/components/map/InteractiveMap.tsx:calls
- `expectedChestId.toLowerCase` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:expectedChestId.toLowerCase, apps/web/src/lib/proof-signer.ts:calls
- `f` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `f.write` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:f.write, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `failedCheckpoints.push` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:failedCheckpoints.push, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `failure` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:failure, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `faucetClaims.clear` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:faucetClaims.clear, apps/web/src/lib/rate-limiter.ts:calls
- `faucetClaims.has` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:faucetClaims.has, apps/web/src/lib/rate-limiter.ts:calls
- `faucetClaims.set` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:faucetClaims.set, apps/web/src/lib/rate-limiter.ts:calls
- `fetchHealth` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:fetchHealth, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `fileURLToPath` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:fileURLToPath, packages/contracts-cchain/test/accounting.test.mjs:calls
- `findEvidenceCheckpointId` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:findEvidenceCheckpointId, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `findSlotByChestId` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:findSlotByChestId, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `firstCheckpointConfirmed.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:firstCheckpointConfirmed.add, packages/shared/src/gameplay/analytics.ts:calls
- `firstCheckpointConfirmedUsers.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:firstCheckpointConfirmedUsers.add, packages/shared/src/gameplay/analytics.ts:calls
- `firstCheckpointConfirmedUsers.has` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:firstCheckpointConfirmedUsers.has, packages/shared/src/gameplay/analytics.ts:calls
- `floor` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:floor, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `flyTo` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:flyTo, apps/web/src/components/map/InteractiveMap.tsx:calls
- `focus` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:focus, apps/web/src/app/page.tsx:calls
- `format` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:format, apps/web/src/lib/chains.ts:calls
- `formatEther` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:formatEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formatUnits` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:formatUnits, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `formula` [LOW] used by `subsystem-58-0-apps-web` from `apps/web/src/lib/geo.ts`. Evidence: apps/web/src/lib/geo.ts:formula, apps/web/src/lib/geo.ts:calls
- `fraction.toString` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:fraction.toString, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `fujiPublicClient.readContract` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.readContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiPublicClient.waitForTransactionReceipt` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:fujiPublicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `fujiWalletClient.writeContract` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:fujiWalletClient.writeContract, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `gameplayErrorResponse` [LOW] used by `subsystem-67-0-apps-web` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayErrorResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `gameplayEvidenceEventSchema.safeParse` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:gameplayEvidenceEventSchema.safeParse, packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `gameplayIdSchema.optional` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:gameplayIdSchema.optional, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `gameplayResponse` [LOW] used by `subsystem-67-0-apps-web` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:gameplayResponse, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- `gas` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:gas, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `generateNonce` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:generateNonce, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `geolocation.clearWatch` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:geolocation.clearWatch, apps/web/src/components/map/InteractiveMap.tsx:calls
- `geolocation.watchPosition` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:geolocation.watchPosition, apps/web/src/components/map/InteractiveMap.tsx:calls
- `getActiveSeason` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:getActiveSeason, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `getAdminAnalytics` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:getAdminAnalytics, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `getBadgeEligibilityEvidence` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:getBadgeEligibilityEvidence, apps/web/src/features/gameplay/passport/engine.ts:calls
- `getBadgeProgress` [LOW] used by `subsystem-66-0-apps-web` from `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/tests/passport-engine.test.ts:getBadgeProgress, apps/web/tests/passport-engine.test.ts:calls
- `getCachedMapConfig` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:getCachedMapConfig, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `getCartoLabelsTileUrl` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:getCartoLabelsTileUrl, apps/web/tests/map.test.ts:calls
- `getChestManagerAddress` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:getChestManagerAddress, apps/web/src/lib/proof-signer.ts:calls
- `getCurrentEpoch` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:getCurrentEpoch, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `getDemoCampusConfig` [LOW] used by `subsystem-73-0-apps-web` from `apps/web/src/app/api/map-config/route.ts`. Evidence: apps/web/src/app/api/map-config/route.ts:getDemoCampusConfig, apps/web/src/app/api/map-config/route.ts:calls, apps/web/tests/api.test.ts:calls
- `getElapsedSeconds` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:getElapsedSeconds, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `getExplorerTxUrl` [LOW] used by `subsystem-43-0-apps-web` from `apps/web/tests/wallet.test.ts`. Evidence: apps/web/tests/wallet.test.ts:getExplorerTxUrl, apps/web/tests/wallet.test.ts:calls
- `getGameL1ChainId` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:getGameL1ChainId, apps/web/src/lib/proof-signer.ts:calls
- `getGameplayConfigRepository` [LOW] used by `subsystem-67-0-apps-web` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:getGameplayConfigRepository, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `getMapConfig` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:getMapConfig, apps/web/tests/api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `getPilotFunnelMetrics` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:getPilotFunnelMetrics, apps/web/src/app/api/admin/analytics/route.ts:calls
- `getProofSignerAccount` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:getProofSignerAccount, apps/web/src/app/api/admin/health/route.ts:calls
- `getProofSignerPrivateKey` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:getProofSignerPrivateKey, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `getRarityAndApr` [LOW] used by `subsystem-84-0-packages-shared` from `packages/shared/tests/progression.test.ts`. Evidence: packages/shared/tests/progression.test.ts:getRarityAndApr, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- `getRelayWaitState` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:getRelayWaitState, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `getStepStatus` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:getStepStatus, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `getTimelineStepStatus` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:getTimelineStepStatus, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- `getTodayTrail` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:getTodayTrail, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `globalMemoryAnalyticsSink.clear` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:globalMemoryAnalyticsSink.clear, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `globalMemoryAnalyticsSink.emit` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:globalMemoryAnalyticsSink.emit, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `globalMemoryAnalyticsSink.getEvents` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:globalMemoryAnalyticsSink.getEvents, apps/web/src/app/api/admin/analytics/route.ts:calls
- `gradient` [LOW] used by `subsystem-63-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailCard.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:gradient, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls
- `h3-js` [LOW] used by `subsystem-58-0-apps-web` from `apps/web/src/lib/geo.ts`. Evidence: apps/web/src/lib/geo.ts:h3-js, apps/web/src/lib/geo.ts:imports
- `h3.latLngToCell` [LOW] used by `subsystem-58-0-apps-web` from `apps/web/src/lib/geo.ts`. Evidence: apps/web/src/lib/geo.ts:h3.latLngToCell, apps/web/src/lib/geo.ts:calls
- `h3Cell.slice` [LOW] used by `subsystem-33-0-apps-web` from `apps/web/src/components/map/ChestBottomSheet.tsx`. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:h3Cell.slice, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- `hash.slice` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:hash.slice, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `headers.get` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:headers.get, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- `headers.set` [LOW] used by `subsystem-72-0-apps-web` from `apps/web/src/lib/gameplay/errors.ts`. Evidence: apps/web/src/lib/gameplay/errors.ts:headers.set, apps/web/src/lib/gameplay/errors.ts:calls, apps/web/src/lib/gameplay/errors.ts:calls
- `hexAmount.startsWith` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:hexAmount.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `hexWei.startsWith` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:hexWei.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `hour` [LOW] used by `subsystem-73-0-apps-web` from `apps/web/src/app/api/map-config/route.ts`. Evidence: apps/web/src/app/api/map-config/route.ts:hour, apps/web/src/app/api/map-config/route.ts:calls
- `hours` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:hours, apps/web/src/lib/campus.ts:calls
- `html5-qrcode` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:html5-qrcode, apps/web/src/components/sponsor/SponsorScannerModal.tsx:imports
- `html5Qr.start` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:html5Qr.start, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `http` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:http, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `hydration` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:hydration, apps/web/src/components/map/InteractiveMap.tsx:calls
- `icm.setIsOpen` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:icm.setIsOpen, apps/web/src/app/page.tsx:calls
- `identityOf` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:identityOf, packages/shared/src/gameplay/rules.ts:calls
- `importPath.startsWith` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:importPath.startsWith, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `inAppWallet` [LOW] used by `subsystem-65-0-apps-web` from `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/lib/thirdweb.ts:inAppWallet, apps/web/src/lib/thirdweb.ts:calls
- `includes` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:includes, packages/shared/src/env.ts:calls
- `indicator` [LOW] used by `subsystem-62-0-apps-web` from `apps/web/src/components/wallet/WalletHeader.tsx`. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:indicator, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `initCamera` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:initCamera, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `initialization` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:initialization, apps/web/src/app/admin/health/page.tsx:calls
- `input.charCodeAt` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:input.charCodeAt, packages/shared/src/gameplay/analytics.ts:calls
- `int` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:int, packages/shared/src/env.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `int.from_bytes` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:int.from_bytes, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `ipFaucetCounts.clear` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:ipFaucetCounts.clear, apps/web/src/lib/rate-limiter.ts:calls
- `ipFaucetCounts.get` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:ipFaucetCounts.get, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `ipFaucetCounts.set` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:ipFaucetCounts.set, apps/web/src/lib/rate-limiter.ts:calls
- `ipTimes.push` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:ipTimes.push, apps/web/src/lib/rate-limiter.ts:calls
- `isBadgeEligible` [LOW] used by `subsystem-54-0-packages-shared` from `packages/shared/tests/gameplay-rules.test.ts`. Evidence: packages/shared/tests/gameplay-rules.test.ts:isBadgeEligible, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `isPerkClaimExpired` [LOW] used by `subsystem-54-0-packages-shared` from `packages/shared/tests/gameplay-rules.test.ts`. Evidence: packages/shared/tests/gameplay-rules.test.ts:isPerkClaimExpired, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- `isinstance` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:isinstance, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `isoDateTimeSchema.optional` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:isoDateTimeSchema.optional, packages/shared/src/gameplay/schemas.ts:calls
- `issues.map` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:issues.map, packages/shared/src/gameplay/analytics.ts:calls
- `items.push` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:items.push, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `json.load` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.load, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `json.loads` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:json.loads, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `keccak256` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:keccak256, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/lib/campus.ts:calls
- `key.toLowerCase` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:key.toLowerCase, apps/web/src/features/gameplay/passport/engine.ts:calls
- `keys` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:keys, packages/shared/tests/gameplay-analytics.test.ts:calls
- `lastRefreshed.toLocaleTimeString` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:lastRefreshed.toLocaleTimeString, apps/web/src/app/admin/health/page.tsx:calls
- `layerIds.indexOf` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layerIds.indexOf, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `layers.find` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layers.find, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `layers.findIndex` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layers.findIndex, apps/web/tests/map.test.ts:calls
- `layers.map` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layers.map, apps/web/tests/map.test.ts:calls
- `layers.push` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layers.push, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `layers.splice` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:layers.splice, apps/web/tests/map.test.ts:calls
- `len` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:len, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `length` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:length, apps/web/tests/trail-ui.test.tsx:calls
- `lifetime` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:lifetime, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `limit` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:limit, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `line.lstrip` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:line.lstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `line.trim` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:line.trim, packages/relayer/scripts/seed.ts:calls
- `list` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:list, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `loadLastTrailSession` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:loadLastTrailSession, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `loadMapConfig` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:loadMapConfig, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `loadPassportState` [LOW] used by `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:loadPassportState, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `loadTrail` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:loadTrail, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `loadTrailProgressCache` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:loadTrailProgressCache, apps/web/tests/trail-ui.test.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `localStorage` [LOW] used by `subsystem-69-0-apps-web` from `apps/web/src/components/cross-chain/types.ts`. Evidence: apps/web/src/components/cross-chain/types.ts:localStorage, apps/web/src/components/cross-chain/types.ts:calls
- `localStorage.getItem` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:localStorage.getItem, apps/web/src/features/gameplay/passport/storage.ts:calls
- `localStorage.setItem` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:localStorage.setItem, apps/web/src/features/gameplay/passport/storage.ts:calls
- `localeCompare` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:localeCompare, apps/web/src/features/gameplay/passport/engine.ts:calls
- `logEvidenceReconciliation` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:logEvidenceReconciliation, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `low` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:low, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `m` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:m, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `m.group` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:m.group, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `m.remove` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:m.remove, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `main` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:main, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `manualCode.trim` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:manualCode.trim, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `map.addControl` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.addControl, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.on` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.on, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.once` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.once, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.remove` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.remove, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.resize` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:map.resize, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `map.setLayoutProperty` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:map.setLayoutProperty, apps/web/src/components/map/map-styles.ts:calls, apps/web/src/components/map/map-styles.ts:calls
- `mapOnChainStatusToUIState` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:mapOnChainStatusToUIState, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `mapRequestStatusToLifecycle` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:mapRequestStatusToLifecycle, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `maplibre-gl` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:maplibre-gl, apps/web/src/components/map/map-styles.ts:imports
- `max` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:max, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `menu` [LOW] used by `subsystem-62-0-apps-web` from `apps/web/src/components/wallet/WalletHeader.tsx`. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:menu, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `metrics` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:metrics, packages/shared/src/gameplay/analytics.ts:calls
- `min` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:min, packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `minmax` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:minmax, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `mins.toString` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:mins.toString, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `mint` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:mint, packages/contracts-cchain/test/accounting.test.mjs:calls
- `mockImplementation` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:mockImplementation, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- `mockReturnValue` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:mockReturnValue, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `mockUsdcAbi.map` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:mockUsdcAbi.map, packages/contracts-cchain/test/accounting.test.mjs:calls
- `mount` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:mount, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `name.strip` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:name.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `newBadges.push` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:newBadges.push, apps/web/src/features/gameplay/passport/engine.ts:calls
- `newCompletions.at` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:newCompletions.at, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `newCompletions.map` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:newCompletions.map, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `newStamps.push` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:newStamps.push, apps/web/src/features/gameplay/passport/engine.ts:calls
- `next/link` [LOW] used by `subsystem-89-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:next/link, apps/web/src/app/admin/health/page.tsx:imports, apps/web/src/components/wallet/WalletHeader.tsx:imports
- `next/server` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:next/server, apps/web/src/app/api/admin/analytics/route.ts:imports, apps/web/src/app/api/admin/health/route.ts:imports
- `ng` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:ng, apps/web/src/components/position/PositionView.tsx:calls
- `node:assert/strict` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:node:assert/strict, packages/contracts-cchain/test/accounting.test.mjs:imports
- `node:crypto` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:node:crypto, apps/web/src/lib/proof-signer.ts:imports
- `node:test` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:node:test, packages/contracts-cchain/test/accounting.test.mjs:imports
- `node:url` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:node:url, packages/contracts-cchain/test/accounting.test.mjs:imports
- `nonnegative` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:nonnegative, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `not.toBe` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:not.toBe, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `not.toBeNull` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `not.toContain` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:not.toContain, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `not.toHaveBeenCalled` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:not.toHaveBeenCalled, apps/web/tests/map.test.ts:calls
- `not.toHaveProperty` [LOW] used by `subsystem-78-0-apps-web` from `apps/web/tests/passport-privacy.test.ts`. Evidence: apps/web/tests/passport-privacy.test.ts:not.toHaveProperty, apps/web/tests/passport-privacy.test.ts:calls
- `not.toMatch` [LOW] used by `subsystem-52-0-apps-web` from `apps/web/tests/ge06-relay-moment.test.ts`. Evidence: apps/web/tests/ge06-relay-moment.test.ts:not.toMatch, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- `not.toThrow` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:not.toThrow, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `num.toFixed` [LOW] used by `subsystem-57-0-apps-web` from `apps/web/src/components/wallet/GasBalance.tsx`. Evidence: apps/web/src/components/wallet/GasBalance.tsx:num.toFixed, apps/web/src/components/wallet/GasBalance.tsx:calls
- `nào` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:nào, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `object` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:object, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `onClaim` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:onClaim, apps/web/tests/features-modals.test.ts:calls
- `onClaimBudget` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:onClaimBudget, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `onClose` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:onClose, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `onComplete` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:onComplete, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `onFocusChest` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:onFocusChest, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `onProofReceived` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:onProofReceived, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `onRequestWithdrawal` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:onRequestWithdrawal, apps/web/src/components/position/PositionView.tsx:calls
- `onRetryMock` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:onRetryMock, apps/web/tests/icm-modal.test.ts:calls
- `onSuccessDismiss` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:onSuccessDismiss, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `onWithdrawConfirmed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:onWithdrawConfirmed, apps/web/src/components/position/PositionView.tsx:calls
- `open` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:open, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `optional` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:optional, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `options` [LOW] used by `subsystem-62-0-apps-web` from `apps/web/src/components/wallet/WalletHeader.tsx`. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:options, apps/web/src/components/wallet/WalletHeader.tsx:calls
- `parseEther` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:parseEther, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `parseInt` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:parseInt, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `parser.add_argument` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.add_argument, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `parser.parse_args` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:parser.parse_args, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `passportStampSchema.safeParse` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:passportStampSchema.safeParse, apps/web/src/features/gameplay/passport/storage.ts:calls
- `passportViewed.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:passportViewed.add, packages/shared/src/gameplay/analytics.ts:calls
- `path.dirname` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:path.dirname, packages/contracts-cchain/test/accounting.test.mjs:calls
- `pathlib` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pathlib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `payload.forEach` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:payload.forEach, packages/shared/src/gameplay/analytics.ts:calls
- `payload.trim` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:payload.trim, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `perkIssued.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:perkIssued.add, packages/shared/src/gameplay/analytics.ts:calls
- `perkRedeemed.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:perkRedeemed.add, packages/shared/src/gameplay/analytics.ts:calls
- `phỏng` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:phỏng, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `phụ` [LOW] used by `subsystem-65-0-apps-web` from `apps/web/src/lib/thirdweb.ts`. Evidence: apps/web/src/lib/thirdweb.ts:phụ, apps/web/src/lib/thirdweb.ts:calls
- `player.toLowerCase` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:player.toLowerCase, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `playerWallet.slice` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:playerWallet.slice, apps/web/src/components/position/PositionView.tsx:calls
- `policy` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:policy, packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `poolMethods.includes` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:poolMethods.includes, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `position` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:position, apps/web/src/components/map/InteractiveMap.tsx:calls
- `positive` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:positive, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `postFaucetGas` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:postFaucetGas, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postLocationProof` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:postLocationProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `postReconcile` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:postReconcile, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `postSponsorProof` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:postSponsorProof, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `powerLevel` [LOW] used by `subsystem-23-0-apps-web` from `apps/web/src/components/map/geo-utils.ts`. Evidence: apps/web/src/components/map/geo-utils.ts:powerLevel, apps/web/src/components/map/geo-utils.ts:calls, apps/web/src/components/map/geo-utils.ts:calls
- `pp.finish` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.finish, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_contract` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_contract, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `pp.p_prelude` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:pp.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `previousIds.has` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:previousIds.has, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `principal.toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:principal.toFixed, apps/web/src/components/position/PositionView.tsx:calls
- `principalBudget` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:principalBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `print` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:print, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `privateKeyToAccount` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:privateKeyToAccount, packages/relayer/scripts/seed.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `process.cwd` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:process.cwd, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `process.exit` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:process.exit, packages/relayer/scripts/seed.ts:calls
- `props.onClose` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:props.onClose, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `protection` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:protection, apps/web/src/lib/rate-limiter.ts:calls
- `pseudonymizeWallet` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:pseudonymizeWallet, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `publicClient.getBalance` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:publicClient.getBalance, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- `publicClient.waitForTransactionReceipt` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:publicClient.waitForTransactionReceipt, packages/relayer/scripts/seed.ts:calls
- `publicEnvSchema.extend` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:publicEnvSchema.extend, packages/shared/src/env.ts:calls
- `publicEnvSchema.parse` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:publicEnvSchema.parse, packages/shared/src/env.ts:calls
- `queryRpcWithLatency` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:queryRpcWithLatency, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `questBudget` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:questBudget, apps/web/src/app/api/admin/health/route.ts:calls
- `queue` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:queue, apps/web/src/app/page.tsx:calls
- `quyền` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:quyền, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `radius` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:radius, apps/web/tests/api.test.ts:calls
- `range` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:range, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `raw.startsWith` [LOW] used by `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:raw.startsWith, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `re` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `re.sub` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.sub, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `re.subn` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:re.subn, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `read_text` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `reconcileIpTimestamps.clear` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileIpTimestamps.clear, apps/web/src/lib/rate-limiter.ts:calls
- `reconcileIpTimestamps.get` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileIpTimestamps.get, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `reconcileIpTimestamps.set` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileIpTimestamps.set, apps/web/src/lib/rate-limiter.ts:calls
- `reconcileWalletTimestamps.clear` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileWalletTimestamps.clear, apps/web/src/lib/rate-limiter.ts:calls
- `reconcileWalletTimestamps.get` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileWalletTimestamps.get, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- `reconcileWalletTimestamps.set` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:reconcileWalletTimestamps.set, apps/web/src/lib/rate-limiter.ts:calls
- `recordFaucetClaim` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:recordFaucetClaim, apps/web/src/app/api/faucet/gas/route.ts:calls
- `recordPassportEvidence` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:recordPassportEvidence, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `recordReconcileRequest` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:recordReconcileRequest, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `records.get` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:records.get, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `records.has` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:records.has, apps/web/src/features/gameplay/passport/engine.ts:calls
- `records.push` [LOW] used by `subsystem-55-0-apps-web` from `apps/web/src/features/gameplay/passport/trail-integration.ts`. Evidence: apps/web/src/features/gameplay/passport/trail-integration.ts:records.push, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `records.set` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:records.set, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `records.values` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:records.values, apps/web/src/features/gameplay/passport/engine.ts:calls
- `reduce` [LOW] used by `subsystem-44-0-packages-shared` from `packages/shared/src/gameplay/scoring.ts`. Evidence: packages/shared/src/gameplay/scoring.ts:reduce, packages/shared/src/gameplay/scoring.ts:calls
- `refetch` [LOW] used by `subsystem-57-0-apps-web` from `apps/web/src/components/wallet/GasBalance.tsx`. Evidence: apps/web/src/components/wallet/GasBalance.tsx:refetch, apps/web/src/components/wallet/GasBalance.tsx:calls
- `refine` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:refine, packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `regex` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:regex, packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `rejectedRes.json` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:rejectedRes.json, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `relayStages.map` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:relayStages.map, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `reloads` [LOW] used by `subsystem-71-0-apps-web` from `apps/web/src/components/wallet/WalletProvider.tsx`. Evidence: apps/web/src/components/wallet/WalletProvider.tsx:reloads, apps/web/src/components/wallet/WalletProvider.tsx:calls
- `remainingAssets.toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:remainingAssets.toFixed, apps/web/src/components/position/PositionView.tsx:calls
- `replace` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:replace, packages/relayer/scripts/seed.ts:calls
- `repo.getTodayTrail` [LOW] used by `subsystem-42-0-apps-web` from `apps/web/src/app/api/gameplay/trails/reconcile/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:repo.getTodayTrail, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `repository.getActiveSeason` [LOW] used by `subsystem-67-0-apps-web` from `apps/web/src/app/api/gameplay/seasons/active/route.ts`. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:repository.getActiveSeason, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `repository.getTodayTrail` [LOW] used by `subsystem-92-0-apps-web` from `apps/web/src/app/api/gameplay/trails/today/route.ts`. Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:repository.getTodayTrail, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- `req.json` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:req.json, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `request.urlopen` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:request.urlopen, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `requestId` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:requestId, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `requestId.slice` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:requestId.slice, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `requestId.toLowerCase` [LOW] used by `subsystem-9-0-apps-web` from `apps/web/src/features/gameplay/trails/evidence-adapter.ts`. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:requestId.toLowerCase, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `requiredAmountUsdc.toFixed` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:requiredAmountUsdc.toFixed, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `res.text` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:res.text, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `res1.json` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:res1.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res2.json` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:res2.json, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `res3.json` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:res3.json, apps/web/tests/api.test.ts:calls
- `reserve` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:reserve, packages/relayer/scripts/seed.ts:calls
- `resetCompletedTrails` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:resetCompletedTrails, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `resetRateLimits` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:resetRateLimits, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `resolution` [LOW] used by `subsystem-58-0-apps-web` from `apps/web/src/lib/geo.ts`. Evidence: apps/web/src/lib/geo.ts:resolution, apps/web/src/lib/geo.ts:calls
- `resolvedTrails.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:resolvedTrails.map, apps/web/src/lib/gameplay/repository.ts:calls
- `response` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:response, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `rewardReserve` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:rewardReserve, apps/web/src/app/api/admin/health/route.ts:calls
- `rgba` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:rgba, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `rotate` [LOW] used by `subsystem-70-0-apps-web` from `apps/web/src/components/map/VirtualCompass.tsx`. Evidence: apps/web/src/components/map/VirtualCompass.tsx:rotate, apps/web/src/components/map/VirtualCompass.tsx:calls
- `rstrip` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:rstrip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `rules` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:rules, apps/web/src/components/map/map-styles.ts:calls
- `runIcmSimulation` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:runIcmSimulation, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `s.add` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.add, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.split` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.split, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `s.strip` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:s.strip, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `safe.sort` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:safe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `sanitizeCorrelationPayload` [LOW] used by `subsystem-59-0-apps-web` from `apps/web/tests/ge04-evidence-reconciliation.test.ts`. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:sanitizeCorrelationPayload, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `saveLastTrailSession` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:saveLastTrailSession, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `savePendingRequest` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:savePendingRequest, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `saveTrailProgressCache` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:saveTrailProgressCache, apps/web/tests/trail-ui.test.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `scale` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:scale, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `schema.safeParse` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:schema.safeParse, packages/shared/src/gameplay/analytics.ts:calls
- `scrollIntoView` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:scrollIntoView, apps/web/src/app/page.tsx:calls
- `seasonDefinitionSchema.parse` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:seasonDefinitionSchema.parse, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `seasonDefinitionSchema.safeParse` [LOW] used by `subsystem-82-0-packages-shared` from `packages/shared/tests/gameplay-schemas.test.ts`. Evidence: packages/shared/tests/gameplay-schemas.test.ts:seasonDefinitionSchema.safeParse, packages/shared/tests/gameplay-schemas.test.ts:calls
- `seasonIds.has` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:seasonIds.has, apps/web/src/lib/gameplay/repository.ts:calls
- `seasonResponse.json` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:seasonResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `seasonViewed.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:seasonViewed.add, packages/shared/src/gameplay/analytics.ts:calls
- `seasons.filter` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:seasons.filter, apps/web/src/lib/gameplay/repository.ts:calls
- `seasons.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:seasons.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `secs.toString` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:secs.toString, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `seen.add` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:seen.add, packages/shared/src/gameplay/schemas.ts:calls
- `seen.has` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:seen.has, packages/shared/src/gameplay/schemas.ts:calls
- `selectChest` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:selectChest, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `self._dec_indent` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._dec_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._inc_indent` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._inc_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_comment` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_comment, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_indent` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_indented` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_indented, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_items` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_items, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self._p_line` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_line, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_nl` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_nl, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._p_str` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._p_str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `self._with_indent` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self._with_indent, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enum_variants` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enum_variants, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_enums` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_enums, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_error` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_error, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_errors` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_errors, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_event` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_event, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_events` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_events, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_function` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_function, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_functions` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_functions, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_prelude` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_prelude, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_field` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_field, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_struct_fields` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_struct_fields, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `self.p_structs` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:self.p_structs, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `serverEnvSchema.parse` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:serverEnvSchema.parse, packages/shared/src/env.ts:calls
- `set` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:set, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `setAccruedReward` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:setAccruedReward, apps/web/src/components/position/PositionView.tsx:calls
- `setActiveTab` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setActiveTab, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setAutoRefresh` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setAutoRefresh, apps/web/src/app/admin/health/page.tsx:calls
- `setCameraError` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:setCameraError, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `setChestSlot` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setChestSlot, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setChestType` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setChestType, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setChests` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setChests, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setConfirmed` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setConfirmed, apps/web/src/app/page.tsx:calls
- `setCopied` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:setCopied, apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `setCopiedId` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:setCopiedId, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `setCopiedKey` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setCopiedKey, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `setCountdown` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setCountdown, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `setData` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setData, apps/web/src/app/admin/health/page.tsx:calls
- `setDemoMode` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setDemoMode, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setDemoSlotIndex` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setDemoSlotIndex, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setElapsedSeconds` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setElapsedSeconds, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setError` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setError, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `setHasApproved` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setHasApproved, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setHasClaimedBudget` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setHasClaimedBudget, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setHasDeposited` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setHasDeposited, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setIsCheckingStatus` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setIsCheckingStatus, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setIsLoadingChests` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setIsLoadingChests, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setIsMapReady` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setIsMapReady, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setIsProcessing` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setIsProcessing, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setIsRetrying` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setIsRetrying, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setIsSubmitting` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:setIsSubmitting, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `setIsSwitching` [LOW] used by `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:setIsSwitching, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `setIsVerifying` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:setIsVerifying, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `setLastRefreshed` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setLastRefreshed, apps/web/src/app/admin/health/page.tsx:calls
- `setLayoutProperty.mockClear` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:setLayoutProperty.mockClear, apps/web/tests/map.test.ts:calls
- `setLngLat` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setLngLat, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setLoading` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:setLoading, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `setMainTab` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setMainTab, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setManualCode` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:setManualCode, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `setMapFocusRequest` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setMapFocusRequest, apps/web/src/app/page.tsx:calls
- `setMapMode` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setMapMode, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setMenuOpen` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:setMenuOpen, apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `setPlayerPosition` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setPlayerPosition, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setPowerLevel` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setPowerLevel, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setPrincipal` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:setPrincipal, apps/web/src/components/position/PositionView.tsx:calls
- `setProgress` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:setProgress, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `setQuestModalOpen` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setQuestModalOpen, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setReloadToken` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:setReloadToken, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `setRequestId` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setRequestId, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setRetryableError` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setRetryableError, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setScanMode` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:setScanMode, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `setSelectedChest` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setSelectedChest, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setSelectedChestForModal` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setSelectedChestForModal, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setSponsorModalOpen` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:setSponsorModalOpen, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- `setStartedAt` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:setStartedAt, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `setStatusMessage` [LOW] used by `subsystem-25-0-apps-web` from `apps/web/src/components/quest/QuestTutorialModal.tsx`. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:setStatusMessage, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `setStyle` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setStyle, apps/web/src/components/map/InteractiveMap.tsx:calls
- `setSuccessProof` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:setSuccessProof, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `setTrail` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:setTrail, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `setViewState` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:setViewState, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `setWithdrawAmount` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:setWithdrawAmount, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `setWithdrawStage` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:setWithdrawStage, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `setWorkerUrl` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:setWorkerUrl, apps/web/src/components/map/InteractiveMap.tsx:calls
- `signLocationProof` [LOW] used by `subsystem-27-0-apps-web` from `apps/web/src/app/api/proofs/location/route.ts`. Evidence: apps/web/src/app/api/proofs/location/route.ts:signLocationProof, apps/web/src/app/api/proofs/location/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `signSponsorProof` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:signSponsorProof, apps/web/src/app/api/proofs/sponsor/route.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `signature` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:signature, apps/web/src/app/page.tsx:calls
- `sink` [LOW] used by `subsystem-24-0-apps-web` from `apps/web/src/features/analytics/sink.ts`. Evidence: apps/web/src/features/analytics/sink.ts:sink, apps/web/src/features/analytics/sink.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `sink.emit` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:sink.emit, apps/web/src/features/analytics/tracker.ts:calls
- `sink.getErrors` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:sink.getErrors, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `sink.getEvents` [LOW] used by `subsystem-76-0-apps-web` from `apps/web/src/features/analytics/funnel.ts`. Evidence: apps/web/src/features/analytics/funnel.ts:sink.getEvents, apps/web/src/features/analytics/funnel.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `sink.getEventsByType` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:sink.getEventsByType, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `slots` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:slots, apps/web/tests/api.test.ts:calls
- `slots.find` [LOW] used by `subsystem-38-0-apps-web` from `apps/web/src/lib/campus.ts`. Evidence: apps/web/src/lib/campus.ts:slots.find, apps/web/src/lib/campus.ts:calls
- `slots.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:slots.map, apps/web/src/lib/gameplay/repository.ts:calls
- `slots.slice` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:slots.slice, apps/web/tests/gameplay-config-api.test.ts:calls
- `slotsByNumber.get` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:slotsByNumber.get, apps/web/src/lib/gameplay/repository.ts:calls
- `solc` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:solc, packages/contracts-cchain/test/accounting.test.mjs:imports
- `solc.compile` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:solc.compile, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `some` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:some, packages/shared/tests/gameplay-analytics.test.ts:calls
- `sort` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:sort, apps/web/src/features/gameplay/passport/engine.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- `sources.get` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:sources.get, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `sources.has` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:sources.has, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `sources.set` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:sources.set, apps/web/tests/map.test.ts:calls
- `sponsorPoolAbi.map` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:sponsorPoolAbi.map, packages/contracts-cchain/test/accounting.test.mjs:calls
- `sponsorPoolAddress.startsWith` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:sponsorPoolAddress.startsWith, apps/web/src/app/api/admin/health/route.ts:calls
- `stampId.localeCompare` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:stampId.localeCompare, apps/web/src/features/gameplay/passport/engine.ts:calls
- `stampId.startsWith` [LOW] used by `subsystem-66-0-apps-web` from `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/tests/passport-engine.test.ts:stampId.startsWith, apps/web/tests/passport-engine.test.ts:calls
- `stamps.filter` [LOW] used by `subsystem-66-0-apps-web` from `apps/web/tests/passport-engine.test.ts`. Evidence: apps/web/tests/passport-engine.test.ts:stamps.filter, apps/web/tests/passport-engine.test.ts:calls
- `stamps.flatMap` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:stamps.flatMap, apps/web/src/features/gameplay/passport/storage.ts:calls
- `stamps.push` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:stamps.push, apps/web/src/features/gameplay/passport/engine.ts:calls
- `stamps.some` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:stamps.some, apps/web/src/features/gameplay/passport/engine.ts:calls
- `stamps.sort` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:stamps.sort, apps/web/src/features/gameplay/passport/engine.ts:calls
- `state` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:state, apps/web/src/lib/rate-limiter.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `states` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:states, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- `status` [LOW] used by `subsystem-73-0-apps-web` from `apps/web/src/app/api/map-config/route.ts`. Evidence: apps/web/src/app/api/map-config/route.ts:status, apps/web/src/app/api/map-config/route.ts:calls
- `status.replace` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:status.replace, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `stopped` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:stopped, apps/web/src/app/admin/health/page.tsx:calls
- `storage.getItem` [LOW] used by `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:storage.getItem, apps/web/src/components/cross-chain/icm-storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `storage.removeItem` [LOW] used by `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:storage.removeItem, apps/web/src/components/cross-chain/icm-storage.ts:calls, apps/web/src/components/cross-chain/icm-storage.ts:calls
- `storage.setItem` [LOW] used by `subsystem-40-0-apps-web` from `apps/web/src/components/cross-chain/icm-storage.ts`. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:storage.setItem, apps/web/src/components/cross-chain/icm-storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `str` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:str, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls
- `strict` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:strict, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `strictObject` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:strictObject, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `string` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:string, packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `style.json` [LOW] used by `subsystem-30-0-apps-web` from `apps/web/src/components/map/map-styles.ts`. Evidence: apps/web/src/components/map/map-styles.ts:style.json, apps/web/src/components/map/map-styles.ts:calls
- `submitted` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:submitted, apps/web/src/app/page.tsx:calls
- `subprocess` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `subprocess.run` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:subprocess.run, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `successResponse` [LOW] used by `subsystem-45-0-apps-web` from `apps/web/src/app/api/admin/analytics/route.ts`. Evidence: apps/web/src/app/api/admin/analytics/route.ts:successResponse, apps/web/src/app/api/admin/analytics/route.ts:calls, apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- `superRefine` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:superRefine, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `supported` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:supported, apps/web/src/app/page.tsx:calls
- `switchChain` [LOW] used by `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:switchChain, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `sync` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:sync, apps/web/src/components/map/InteractiveMap.tsx:calls
- `syncRadiusLayer` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:syncRadiusLayer, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- `t.test` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:t.test, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `targets` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:targets, apps/web/tests/admin-health.test.ts:calls
- `teamJoined.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:teamJoined.add, packages/shared/src/gameplay/analytics.ts:calls
- `testWallet.toLowerCase` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:testWallet.toLowerCase, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `test_path.read_text` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.read_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `test_path.write_text` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:test_path.write_text, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `then` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:then, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `thirdweb` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:thirdweb, apps/web/src/lib/chains.ts:imports, apps/web/src/lib/proof-signer.ts:imports
- `thirdweb/utils` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:thirdweb/utils, apps/web/src/app/api/faucet/gas/route.ts:imports, apps/web/src/lib/campus.ts:imports
- `thirdweb/wallets` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:thirdweb/wallets, apps/web/src/lib/proof-signer.ts:imports, apps/web/src/lib/thirdweb.ts:imports
- `this.getActiveSeason` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:this.getActiveSeason, apps/web/src/lib/gameplay/repository.ts:calls
- `this.loadCampusConfig` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:this.loadCampusConfig, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `this.track` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:this.track, apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls
- `threshold` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:threshold, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `thresholds` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:thresholds, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `tier` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:tier, apps/web/src/app/admin/health/page.tsx:calls
- `tiers` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:tiers, apps/web/tests/features-modals.test.ts:calls
- `timelineSteps.map` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:timelineSteps.map, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `timestamp` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:timestamp, apps/web/tests/api.test.ts:calls
- `toBeCloseTo` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:toBeCloseTo, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `toBeGreaterThan` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:toBeGreaterThan, apps/web/tests/api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toBeGreaterThanOrEqual` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:toBeGreaterThanOrEqual, apps/web/tests/icm-modal.test.ts:calls
- `toBeLessThan` [LOW] used by `subsystem-16-0-apps-web` from `apps/web/tests/map.test.ts`. Evidence: apps/web/tests/map.test.ts:toBeLessThan, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- `toBeLessThanOrEqual` [LOW] used by `subsystem-35-0-apps-web` from `apps/web/tests/features-modals.test.ts`. Evidence: apps/web/tests/features-modals.test.ts:toBeLessThanOrEqual, apps/web/tests/features-modals.test.ts:calls
- `toBeNull` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:toBeNull, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- `toBeUndefined` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:toBeUndefined, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- `toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:toFixed, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `toHaveBeenCalledTimes` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:toHaveBeenCalledTimes, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/map.test.ts:calls
- `toHaveBeenCalledWith` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:toHaveBeenCalledWith, apps/web/tests/icm-modal.test.ts:calls
- `toHaveProperty` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:toHaveProperty, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- `toLocaleString` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:toLocaleString, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- `toMatch` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:toMatch, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- `toMatchInlineSnapshot` [LOW] used by `subsystem-78-0-apps-web` from `apps/web/tests/passport-privacy.test.ts`. Evidence: apps/web/tests/passport-privacy.test.ts:toMatchInlineSnapshot, apps/web/tests/passport-privacy.test.ts:calls
- `toMatchObject` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:toMatchObject, apps/web/tests/gameplay-config-api.test.ts:calls
- `toPct` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:toPct, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `toThrow` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:toThrow, apps/web/tests/gameplay-config-api.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- `toUpperCase` [LOW] used by `subsystem-46-0-apps-web` from `apps/web/src/components/cross-chain/relay-moment.ts`. Evidence: apps/web/src/components/cross-chain/relay-moment.ts:toUpperCase, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/components/cross-chain/relay-moment.ts:calls
- `toggle` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:toggle, apps/web/src/components/map/InteractiveMap.tsx:calls
- `totalAssets.toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:totalAssets.toFixed, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `totalNum.toFixed` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:totalNum.toFixed, apps/web/src/app/api/admin/health/route.ts:calls
- `trackCheckpointConfirmed` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackCheckpointConfirmed, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `trackCheckpointSubmitted` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackCheckpointSubmitted, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `trackCheckpointViewed` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackCheckpointViewed, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `trackPassportViewed` [LOW] used by `subsystem-48-0-apps-web` from `apps/web/src/features/gameplay/passport/PassportClient.tsx`. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:trackPassportViewed, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- `trackSeasonViewed` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackSeasonViewed, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `trackTrailCompleted` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackTrailCompleted, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `trackTrailStarted` [LOW] used by `subsystem-11-0-apps-web` from `apps/web/src/features/gameplay/trails/TodayTrailSection.tsx`. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:trackTrailStarted, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- `tracker.track` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.track, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackBadgeEarned` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackBadgeEarned, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackCheckpointConfirmed` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackCheckpointConfirmed, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackCheckpointSubmitted` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackCheckpointSubmitted, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackCheckpointViewed` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackCheckpointViewed, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackPassportViewed` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackPassportViewed, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackPerkIssued` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackPerkIssued, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackPerkRedeemed` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackPerkRedeemed, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackSeasonViewed` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackSeasonViewed, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackTeamJoined` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackTeamJoined, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackTrailCompleted` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackTrailCompleted, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `tracker.trackTrailStarted` [LOW] used by `subsystem-14-0-apps-web` from `apps/web/tests/ge07-analytics-funnel.test.ts`. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:tracker.trackTrailStarted, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- `trail` [LOW] used by `subsystem-60-0-packages-shared` from `packages/shared/tests/gameplay-analytics.test.ts`. Evidence: packages/shared/tests/gameplay-analytics.test.ts:trail, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `trailCompleted.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:trailCompleted.add, packages/shared/src/gameplay/analytics.ts:calls
- `trailDefinitionSchema.parse` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:trailDefinitionSchema.parse, apps/web/src/lib/gameplay/repository.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- `trailIds.includes` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:trailIds.includes, apps/web/src/lib/gameplay/repository.ts:calls
- `trailProgressSchema.safeParse` [LOW] used by `subsystem-37-0-apps-web` from `apps/web/src/features/gameplay/trails/storage.ts`. Evidence: apps/web/src/features/gameplay/trails/storage.ts:trailProgressSchema.safeParse, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- `trailResponse.json` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:trailResponse.json, apps/web/tests/gameplay-config-api.test.ts:calls
- `trailStarted.add` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:trailStarted.add, packages/shared/src/gameplay/analytics.ts:calls
- `trails.filter` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:trails.filter, apps/web/src/lib/gameplay/repository.ts:calls
- `trails.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:trails.map, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `trailsById.get` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:trailsById.get, apps/web/src/lib/gameplay/repository.ts:calls
- `transactions` [LOW] used by `subsystem-69-0-apps-web` from `apps/web/src/components/cross-chain/types.ts`. Evidence: apps/web/src/components/cross-chain/types.ts:transactions, apps/web/src/components/cross-chain/types.ts:calls
- `translateY` [LOW] used by `subsystem-70-0-apps-web` from `apps/web/src/components/map/VirtualCompass.tsx`. Evidence: apps/web/src/components/map/VirtualCompass.tsx:translateY, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- `trim` [LOW] used by `subsystem-13-0-apps-web` from `apps/web/src/app/api/admin/health/route.ts`. Evidence: apps/web/src/app/api/admin/health/route.ts:trim, apps/web/src/app/api/admin/health/route.ts:calls, apps/web/src/app/api/admin/health/route.ts:calls
- `trimmed.indexOf` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:trimmed.indexOf, packages/relayer/scripts/seed.ts:calls
- `trimmed.slice` [LOW] used by `subsystem-34-0-apps-web` from `apps/web/src/lib/chains.ts`. Evidence: apps/web/src/lib/chains.ts:trimmed.slice, apps/web/src/lib/chains.ts:calls, packages/relayer/scripts/seed.ts:calls
- `trimmed.startsWith` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:trimmed.startsWith, packages/relayer/scripts/seed.ts:calls
- `trợ` [LOW] used by `subsystem-22-0-apps-web` from `apps/web/src/components/sponsor/SponsorScannerModal.tsx`. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:trợ, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- `tseslint.config` [LOW] used by `subsystem-79-0-eslint-config-mjs` from `eslint.config.mjs`. Evidence: eslint.config.mjs:tseslint.config, eslint.config.mjs:calls
- `txHash.slice` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:txHash.slice, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- `type.toLowerCase` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:type.toLowerCase, apps/web/src/components/map/InteractiveMap.tsx:calls
- `typescript-eslint` [LOW] used by `subsystem-79-0-eslint-config-mjs` from `eslint.config.mjs`. Evidence: eslint.config.mjs:typescript-eslint, eslint.config.mjs:imports
- `typing` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:typing, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `tất` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:tất, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `tục` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:tục, apps/web/src/components/position/PositionView.tsx:calls
- `unique.has` [LOW] used by `subsystem-44-0-packages-shared` from `packages/shared/src/gameplay/scoring.ts`. Evidence: packages/shared/src/gameplay/scoring.ts:unique.has, packages/shared/src/gameplay/scoring.ts:calls
- `unique.set` [LOW] used by `subsystem-44-0-packages-shared` from `packages/shared/src/gameplay/scoring.ts`. Evidence: packages/shared/src/gameplay/scoring.ts:unique.set, packages/shared/src/gameplay/scoring.ts:calls
- `unique.values` [LOW] used by `subsystem-44-0-packages-shared` from `packages/shared/src/gameplay/scoring.ts`. Evidence: packages/shared/src/gameplay/scoring.ts:unique.values, packages/shared/src/gameplay/scoring.ts:calls
- `uniqueEvents.has` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:uniqueEvents.has, packages/shared/src/gameplay/rules.ts:calls
- `uniqueEvents.set` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:uniqueEvents.set, packages/shared/src/gameplay/rules.ts:calls
- `uniqueEvents.values` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:uniqueEvents.values, packages/shared/src/gameplay/rules.ts:calls
- `unsafe.sort` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:unsafe.sort, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `up` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:up, apps/web/src/app/api/faucet/gas/route.ts:calls
- `update` [LOW] used by `subsystem-28-0-apps-web` from `apps/web/src/lib/proof-signer.ts`. Evidence: apps/web/src/lib/proof-signer.ts:update, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- `updatePendingRequest` [LOW] used by `subsystem-4-0-apps-web` from `apps/web/src/components/cross-chain/useICMProgress.ts`. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:updatePendingRequest, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- `upper` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:upper, packages/contracts-cchain/lib/forge-std/scripts/vm.py:calls, packages/contracts-l1/lib/forge-std/scripts/vm.py:calls
- `url.endsWith` [LOW] used by `subsystem-88-0-packages-relayer` from `packages/relayer/src/main.ts`. Evidence: packages/relayer/src/main.ts:url.endsWith, packages/relayer/src/main.ts:calls
- `url.toString` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:url.toString, apps/web/tests/admin-health.test.ts:calls
- `urlStr.includes` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:urlStr.includes, apps/web/tests/admin-health.test.ts:calls
- `urllib` [LOW] used by `subsystem-0-0-packages-contracts-cchain` from `packages/contracts-cchain/lib/forge-std/scripts/vm.py`. Evidence: packages/contracts-cchain/lib/forge-std/scripts/vm.py:urllib, packages/contracts-cchain/lib/forge-std/scripts/vm.py:imports, packages/contracts-l1/lib/forge-std/scripts/vm.py:imports
- `usdcMethods.includes` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:usdcMethods.includes, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `useActiveAccount` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:useActiveAccount, apps/web/src/app/page.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `useActiveWallet` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:useActiveWallet, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `useActiveWalletChain` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:useActiveWalletChain, apps/web/src/app/page.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `useDisconnect` [LOW] used by `subsystem-49-0-apps-web` from `apps/web/src/components/wallet/AddressBadge.tsx`. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:useDisconnect, apps/web/src/components/wallet/AddressBadge.tsx:calls
- `useICMProgress` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:useICMProgress, apps/web/src/app/page.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `useId` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:useId, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `useMemo` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:useMemo, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `useSwitchActiveWalletChain` [LOW] used by `subsystem-47-0-apps-web` from `apps/web/src/components/wallet/NetworkSwitcher.tsx`. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:useSwitchActiveWalletChain, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- `useWalletBalance` [LOW] used by `subsystem-57-0-apps-web` from `apps/web/src/components/wallet/GasBalance.tsx`. Evidence: apps/web/src/components/wallet/GasBalance.tsx:useWalletBalance, apps/web/src/components/wallet/GasBalance.tsx:calls
- `v1` [LOW] used by `subsystem-3-0-apps-web` from `apps/web/src/app/admin/health/page.tsx`. Evidence: apps/web/src/app/admin/health/page.tsx:v1, apps/web/src/app/admin/health/page.tsx:calls
- `val.trim` [LOW] used by `subsystem-97-0-apps-web` from `apps/web/src/lib/json.ts`. Evidence: apps/web/src/lib/json.ts:val.trim, apps/web/src/lib/json.ts:calls
- `valid` [LOW] used by `subsystem-20-0-apps-web` from `apps/web/tests/api.test.ts`. Evidence: apps/web/tests/api.test.ts:valid, apps/web/tests/api.test.ts:calls
- `validateActiveWindow` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:validateActiveWindow, apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- `validateAnalyticsEvent` [LOW] used by `subsystem-17-0-apps-web` from `apps/web/src/features/analytics/tracker.ts`. Evidence: apps/web/src/features/analytics/tracker.ts:validateAnalyticsEvent, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- `value.getTime` [LOW] used by `subsystem-21-0-packages-shared` from `packages/shared/src/gameplay/rules.ts`. Evidence: packages/shared/src/gameplay/rules.ts:value.getTime, packages/shared/src/gameplay/rules.ts:calls
- `value.replace` [LOW] used by `subsystem-7-0-apps-web` from `apps/web/src/features/gameplay/passport/engine.ts`. Evidence: apps/web/src/features/gameplay/passport/engine.ts:value.replace, apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- `values.delete` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:values.delete, apps/web/tests/trail-ui.test.tsx:calls
- `values.get` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:values.get, apps/web/tests/trail-ui.test.tsx:calls
- `values.keys` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:values.keys, apps/web/tests/trail-ui.test.tsx:calls
- `values.map` [LOW] used by `subsystem-15-0-apps-web` from `apps/web/src/lib/gameplay/repository.ts`. Evidence: apps/web/src/lib/gameplay/repository.ts:values.map, apps/web/src/lib/gameplay/repository.ts:calls
- `values.set` [LOW] used by `subsystem-18-0-apps-web` from `apps/web/tests/trail-ui.test.tsx`. Evidence: apps/web/tests/trail-ui.test.tsx:values.set, apps/web/tests/trail-ui.test.tsx:calls
- `vaultMethods.includes` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:vaultMethods.includes, packages/contracts-cchain/test/accounting.test.mjs:calls, packages/contracts-cchain/test/accounting.test.mjs:calls
- `verifySponsorQrPayload` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:verifySponsorQrPayload, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `vi.fn` [LOW] used by `subsystem-32-0-apps-web` from `apps/web/tests/admin-health.test.ts`. Evidence: apps/web/tests/admin-health.test.ts:vi.fn, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- `vi.restoreAllMocks` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.restoreAllMocks, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- `vi.setSystemTime` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.setSystemTime, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.spyOn` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.spyOn, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.stubGlobal` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:vi.stubGlobal, apps/web/tests/icm-modal.test.ts:calls
- `vi.unstubAllGlobals` [LOW] used by `subsystem-41-0-apps-web` from `apps/web/tests/icm-modal.test.ts`. Evidence: apps/web/tests/icm-modal.test.ts:vi.unstubAllGlobals, apps/web/tests/icm-modal.test.ts:calls
- `vi.useFakeTimers` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useFakeTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `vi.useRealTimers` [LOW] used by `subsystem-29-0-apps-web` from `apps/web/tests/gameplay-config-api.test.ts`. Evidence: apps/web/tests/gameplay-config-api.test.ts:vi.useRealTimers, apps/web/tests/gameplay-config-api.test.ts:calls
- `viem/accounts` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:viem/accounts, packages/relayer/scripts/seed.ts:imports
- `viem/chains` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:viem/chains, packages/relayer/scripts/seed.ts:imports
- `violations.map` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:violations.map, packages/shared/src/gameplay/analytics.ts:calls
- `violations.push` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:violations.push, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `wallet.toLowerCase` [LOW] used by `subsystem-26-0-apps-web` from `apps/web/src/app/api/faucet/gas/route.ts`. Evidence: apps/web/src/app/api/faucet/gas/route.ts:wallet.toLowerCase, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/proofs/location/route.ts:calls
- `wallet.trim` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:wallet.trim, packages/shared/src/gameplay/analytics.ts:calls
- `walletAddress.slice` [LOW] used by `subsystem-77-0-apps-web` from `apps/web/src/features/gameplay/passport/share.ts`. Evidence: apps/web/src/features/gameplay/passport/share.ts:walletAddress.slice, apps/web/src/features/gameplay/passport/share.ts:calls
- `walletClient.sendTransaction` [LOW] used by `subsystem-5-0-packages-relayer` from `packages/relayer/scripts/seed.ts`. Evidence: packages/relayer/scripts/seed.ts:walletClient.sendTransaction, packages/relayer/scripts/seed.ts:calls
- `walletTimes.push` [LOW] used by `subsystem-19-0-apps-web` from `apps/web/src/lib/rate-limiter.ts`. Evidence: apps/web/src/lib/rate-limiter.ts:walletTimes.push, apps/web/src/lib/rate-limiter.ts:calls
- `window` [LOW] used by `subsystem-61-0-apps-web` from `apps/web/src/app/api/proofs/sponsor/route.ts`. Evidence: apps/web/src/app/api/proofs/sponsor/route.ts:window, apps/web/src/app/api/proofs/sponsor/route.ts:calls
- `window.addEventListener` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:window.addEventListener, apps/web/src/components/wallet/WalletProvider.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `window.dispatchEvent` [LOW] used by `subsystem-31-0-apps-web` from `apps/web/src/features/gameplay/passport/storage.ts`. Evidence: apps/web/src/features/gameplay/passport/storage.ts:window.dispatchEvent, apps/web/src/features/gameplay/passport/storage.ts:calls
- `window.matchMedia` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:window.matchMedia, apps/web/src/app/page.tsx:calls
- `window.removeEventListener` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:window.removeEventListener, apps/web/src/components/wallet/WalletProvider.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `window.requestAnimationFrame` [LOW] used by `subsystem-2-0-apps-web` from `apps/web/src/app/page.tsx`. Evidence: apps/web/src/app/page.tsx:window.requestAnimationFrame, apps/web/src/app/page.tsx:calls
- `withdrawAmount.toFixed` [LOW] used by `subsystem-8-0-apps-web` from `apps/web/src/components/position/PositionView.tsx`. Evidence: apps/web/src/components/position/PositionView.tsx:withdrawAmount.toFixed, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- `writeText` [LOW] used by `subsystem-10-0-apps-web` from `apps/web/src/components/cross-chain/ICMProgressModal.tsx`. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:writeText, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- `yieldVaultAbi.map` [LOW] used by `subsystem-12-0-packages-contracts-cchain` from `packages/contracts-cchain/test/accounting.test.mjs`. Evidence: packages/contracts-cchain/test/accounting.test.mjs:yieldVaultAbi.map, packages/contracts-cchain/test/accounting.test.mjs:calls
- `z.array` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:z.array, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `z.boolean` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:z.boolean, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `z.enum` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:z.enum, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `z.literal` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:z.literal, packages/shared/src/gameplay/schemas.ts:calls
- `z.number` [LOW] used by `subsystem-6-0-packages-shared` from `packages/shared/src/gameplay/analytics.ts`. Evidence: packages/shared/src/gameplay/analytics.ts:z.number, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- `z.object` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:z.object, packages/shared/src/env.ts:calls
- `z.strictObject` [LOW] used by `subsystem-36-0-packages-shared` from `packages/shared/src/gameplay/schemas.ts`. Evidence: packages/shared/src/gameplay/schemas.ts:z.strictObject, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- `z.string` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:z.string, packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- `zod` [LOW] used by `subsystem-39-0-packages-shared` from `packages/shared/src/env.ts`. Evidence: packages/shared/src/env.ts:zod, packages/shared/src/env.ts:imports, packages/shared/src/gameplay/analytics.ts:imports
- `zoom` [LOW] used by `subsystem-1-0-apps-web` from `apps/web/src/components/map/InteractiveMap.tsx`. Evidence: apps/web/src/components/map/InteractiveMap.tsx:zoom, apps/web/src/components/map/InteractiveMap.tsx:calls

## Open Questions

- LOW: Does `subsystem-10-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- LOW: Does `subsystem-10-0-apps-web` really depend on `subsystem-25-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-10-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls, apps/web/src/components/cross-chain/ICMProgressModal.tsx:calls
- LOW: Does `subsystem-100-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- LOW: Does `subsystem-101-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- LOW: Does `subsystem-101-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls, apps/web/src/app/page.tsx:calls
- LOW: Does `subsystem-104-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-104-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-11-0-apps-web` really depend on `subsystem-22-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- LOW: Does `subsystem-11-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- LOW: Does `subsystem-11-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- LOW: Does `subsystem-11-0-apps-web` really depend on `subsystem-8-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-14-0-apps-web` really depend on `subsystem-76-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls, apps/web/tests/ge07-analytics-funnel.test.ts:calls
- LOW: Does `subsystem-15-0-apps-web` really depend on `subsystem-24-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- LOW: Does `subsystem-15-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- LOW: Does `subsystem-15-0-apps-web` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- LOW: Does `subsystem-15-0-apps-web` really depend on `subsystem-37-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/repository.ts:calls
- LOW: Does `subsystem-15-0-apps-web` really depend on `subsystem-55-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/repository.ts:calls, apps/web/src/lib/gameplay/repository.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-14-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-35-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-16-0-apps-web` really depend on `subsystem-41-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls, apps/web/tests/map.test.ts:calls
- LOW: Does `subsystem-17-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/analytics/tracker.ts:calls
- LOW: Does `subsystem-17-0-apps-web` really depend on `subsystem-40-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls
- LOW: Does `subsystem-17-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/analytics/tracker.ts:calls, apps/web/src/features/analytics/tracker.ts:calls
- LOW: Does `subsystem-18-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/trail-ui.test.tsx:calls
- LOW: Does `subsystem-18-0-apps-web` really depend on `subsystem-11-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls, apps/web/tests/trail-ui.test.tsx:calls
- LOW: Does `subsystem-19-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- LOW: Does `subsystem-19-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- LOW: Does `subsystem-19-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- LOW: Does `subsystem-19-0-apps-web` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls, apps/web/src/lib/rate-limiter.ts:calls
- LOW: Does `subsystem-20-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- LOW: Does `subsystem-20-0-apps-web` really depend on `subsystem-34-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/api.test.ts:calls
- LOW: Does `subsystem-20-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls, apps/web/tests/api.test.ts:calls
- LOW: Does `subsystem-21-0-packages-shared` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/rules.ts:calls
- LOW: Does `subsystem-21-0-packages-shared` really depend on `subsystem-37-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- LOW: Does `subsystem-21-0-packages-shared` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- LOW: Does `subsystem-21-0-packages-shared` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls, packages/shared/src/gameplay/rules.ts:calls
- LOW: Does `subsystem-22-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-22-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-22-0-apps-web` really depend on `subsystem-25-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-22-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-22-0-apps-web` really depend on `subsystem-8-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls, apps/web/src/components/sponsor/SponsorScannerModal.tsx:calls
- LOW: Does `subsystem-23-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/geo-utils.ts:calls, packages/shared/src/math/progression.ts:calls
- LOW: Does `subsystem-24-0-apps-web` really depend on `subsystem-40-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/analytics/sink.ts:calls
- LOW: Does `subsystem-25-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- LOW: Does `subsystem-25-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- LOW: Does `subsystem-25-0-apps-web` really depend on `subsystem-8-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls, apps/web/src/components/quest/QuestTutorialModal.tsx:calls
- LOW: Does `subsystem-26-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls, apps/web/src/app/api/faucet/gas/route.ts:calls
- LOW: Does `subsystem-28-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- LOW: Does `subsystem-28-0-apps-web` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/proof-signer.ts:calls
- LOW: Does `subsystem-28-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/proof-signer.ts:calls
- LOW: Does `subsystem-28-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/proof-signer.ts:calls
- LOW: Does `subsystem-28-0-apps-web` really depend on `subsystem-61-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/proof-signer.ts:calls, apps/web/src/lib/proof-signer.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls, apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-29-0-apps-web` really depend on `subsystem-51-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/gameplay-config-api.test.ts:calls
- LOW: Does `subsystem-30-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/map-styles.ts:calls
- LOW: Does `subsystem-31-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls
- LOW: Does `subsystem-31-0-apps-web` really depend on `subsystem-42-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls
- LOW: Does `subsystem-31-0-apps-web` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls, apps/web/src/features/gameplay/passport/storage.ts:calls
- LOW: Does `subsystem-32-0-apps-web` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- LOW: Does `subsystem-32-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls, apps/web/tests/admin-health.test.ts:calls
- LOW: Does `subsystem-32-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/admin-health.test.ts:calls
- LOW: Does `subsystem-33-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:calls
- LOW: Does `subsystem-33-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/ChestBottomSheet.tsx:calls, apps/web/src/components/map/ChestBottomSheet.tsx:calls
- LOW: Does `subsystem-34-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls, apps/web/src/lib/chains.ts:calls
- LOW: Does `subsystem-34-0-apps-web` really depend on `subsystem-38-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/chains.ts:calls
- LOW: Does `subsystem-35-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- LOW: Does `subsystem-35-0-apps-web` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/features-modals.test.ts:calls
- LOW: Does `subsystem-35-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- LOW: Does `subsystem-35-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls, apps/web/tests/features-modals.test.ts:calls
- LOW: Does `subsystem-36-0-packages-shared` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- LOW: Does `subsystem-36-0-packages-shared` really depend on `subsystem-51-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- LOW: Does `subsystem-36-0-packages-shared` really depend on `subsystem-55-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- LOW: Does `subsystem-36-0-packages-shared` really depend on `subsystem-6-0-packages-shared` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- LOW: Does `subsystem-36-0-packages-shared` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/schemas.ts:calls, packages/shared/src/gameplay/schemas.ts:calls
- LOW: Does `subsystem-37-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- LOW: Does `subsystem-37-0-apps-web` really depend on `subsystem-51-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls
- LOW: Does `subsystem-37-0-apps-web` really depend on `subsystem-55-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- LOW: Does `subsystem-37-0-apps-web` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls, apps/web/src/features/gameplay/trails/storage.ts:calls
- LOW: Does `subsystem-38-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls, apps/web/src/lib/campus.ts:calls
- LOW: Does `subsystem-38-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/campus.ts:calls
- LOW: Does `subsystem-39-0-packages-shared` really depend on `subsystem-38-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/env.ts:calls
- LOW: Does `subsystem-39-0-packages-shared` really depend on `subsystem-52-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/env.ts:calls, packages/shared/src/env.ts:calls
- LOW: Does `subsystem-4-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- LOW: Does `subsystem-4-0-apps-web` really depend on `subsystem-40-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/useICMProgress.ts:calls, apps/web/src/components/cross-chain/useICMProgress.ts:calls
- LOW: Does `subsystem-40-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/icm-storage.ts:calls, apps/web/src/components/cross-chain/icm-storage.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-14-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-41-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls, apps/web/tests/icm-modal.test.ts:calls
- LOW: Does `subsystem-42-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/api/gameplay/trails/reconcile/route.ts:calls
- LOW: Does `subsystem-43-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls
- LOW: Does `subsystem-43-0-apps-web` really depend on `subsystem-65-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/wallet.test.ts:calls, apps/web/tests/wallet.test.ts:calls
- LOW: Does `subsystem-44-0-packages-shared` really depend on `subsystem-15-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- LOW: Does `subsystem-44-0-packages-shared` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/scoring.ts:calls
- LOW: Does `subsystem-44-0-packages-shared` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/scoring.ts:calls, packages/shared/src/gameplay/scoring.ts:calls
- LOW: Does `subsystem-46-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- LOW: Does `subsystem-46-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- LOW: Does `subsystem-46-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/cross-chain/relay-moment.ts:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-49-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-70-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-47-0-apps-web` really depend on `subsystem-8-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/NetworkSwitcher.tsx:calls, apps/web/src/components/wallet/NetworkSwitcher.tsx:calls
- LOW: Does `subsystem-48-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- LOW: Does `subsystem-48-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- LOW: Does `subsystem-48-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls, apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- LOW: Does `subsystem-48-0-apps-web` really depend on `subsystem-8-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportClient.tsx:calls
- LOW: Does `subsystem-49-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- LOW: Does `subsystem-49-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls, apps/web/src/components/wallet/AddressBadge.tsx:calls
- LOW: Does `subsystem-49-0-apps-web` really depend on `subsystem-70-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/AddressBadge.tsx:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-24-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-28-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-34-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-38-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-5-0-packages-relayer` really depend on `subsystem-40-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls, packages/relayer/scripts/seed.ts:calls
- LOW: Does `subsystem-50-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- LOW: Does `subsystem-50-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/PassportCollection.tsx:calls
- LOW: Does `subsystem-51-0-apps-web` really depend on `subsystem-55-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/model.ts:calls, apps/web/src/features/gameplay/trails/model.ts:calls
- LOW: Does `subsystem-51-0-apps-web` really depend on `subsystem-9-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/model.ts:calls
- LOW: Does `subsystem-52-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- LOW: Does `subsystem-52-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls
- LOW: Does `subsystem-52-0-apps-web` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- LOW: Does `subsystem-52-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls, apps/web/tests/ge06-relay-moment.test.ts:calls
- LOW: Does `subsystem-53-0-packages-shared` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- LOW: Does `subsystem-53-0-packages-shared` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- LOW: Does `subsystem-53-0-packages-shared` really depend on `subsystem-35-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/math/progression.ts:calls
- LOW: Does `subsystem-53-0-packages-shared` really depend on `subsystem-39-0-packages-shared` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/math/progression.ts:calls, packages/shared/src/math/progression.ts:calls
- LOW: Does `subsystem-54-0-packages-shared` really depend on `subsystem-15-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- LOW: Does `subsystem-54-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- LOW: Does `subsystem-54-0-packages-shared` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-rules.test.ts:calls
- LOW: Does `subsystem-54-0-packages-shared` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- LOW: Does `subsystem-54-0-packages-shared` really depend on `subsystem-9-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls, packages/shared/tests/gameplay-rules.test.ts:calls
- LOW: Does `subsystem-57-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls
- LOW: Does `subsystem-57-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls, apps/web/src/components/wallet/GasBalance.tsx:calls
- LOW: Does `subsystem-58-0-apps-web` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/geo.ts:calls, apps/web/src/lib/geo.ts:calls, apps/web/src/lib/geo.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-19-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-34-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-59-0-apps-web` really depend on `subsystem-9-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls, apps/web/tests/ge04-evidence-reconciliation.test.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-19-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls, packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-42-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-6-0-packages-shared` really depend on `subsystem-9-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/src/gameplay/analytics.ts:calls
- LOW: Does `subsystem-60-0-packages-shared` really depend on `subsystem-14-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- LOW: Does `subsystem-60-0-packages-shared` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- LOW: Does `subsystem-60-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- LOW: Does `subsystem-60-0-packages-shared` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls
- LOW: Does `subsystem-60-0-packages-shared` really depend on `subsystem-76-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-analytics.test.ts:calls, packages/shared/tests/gameplay-analytics.test.ts:calls
- LOW: Does `subsystem-62-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- LOW: Does `subsystem-62-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls
- LOW: Does `subsystem-62-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls
- LOW: Does `subsystem-62-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls, apps/web/src/components/wallet/WalletHeader.tsx:calls
- LOW: Does `subsystem-63-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls, apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls
- LOW: Does `subsystem-63-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/TodayTrailCard.tsx:calls
- LOW: Does `subsystem-64-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- LOW: Does `subsystem-64-0-apps-web` really depend on `subsystem-38-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/server-env.ts:calls, apps/web/src/lib/server-env.ts:calls
- LOW: Does `subsystem-65-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/thirdweb.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-31-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls, apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-52-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-66-0-apps-web` really depend on `subsystem-9-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-engine.test.ts:calls
- LOW: Does `subsystem-67-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/api/gameplay/seasons/active/route.ts:calls, apps/web/src/app/api/gameplay/seasons/active/route.ts:calls
- LOW: Does `subsystem-7-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/engine.ts:calls
- LOW: Does `subsystem-7-0-apps-web` really depend on `subsystem-17-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls, apps/web/src/features/gameplay/passport/trail-integration.ts:calls
- LOW: Does `subsystem-7-0-apps-web` really depend on `subsystem-27-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- LOW: Does `subsystem-7-0-apps-web` really depend on `subsystem-30-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- LOW: Does `subsystem-7-0-apps-web` really depend on `subsystem-46-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/passport/engine.ts:calls
- LOW: Does `subsystem-70-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls
- LOW: Does `subsystem-70-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- LOW: Does `subsystem-70-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls, apps/web/src/components/map/VirtualCompass.tsx:calls
- LOW: Does `subsystem-71-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls
- LOW: Does `subsystem-71-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls, apps/web/src/components/wallet/WalletProvider.tsx:calls
- LOW: Does `subsystem-71-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/WalletProvider.tsx:calls
- LOW: Does `subsystem-72-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- LOW: Does `subsystem-72-0-apps-web` really depend on `subsystem-24-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- LOW: Does `subsystem-72-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/gameplay/errors.ts:calls
- LOW: Does `subsystem-73-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/api/map-config/route.ts:calls
- LOW: Does `subsystem-78-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-privacy.test.ts:calls
- LOW: Does `subsystem-78-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/passport-privacy.test.ts:calls
- LOW: Does `subsystem-8-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- LOW: Does `subsystem-8-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- LOW: Does `subsystem-8-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/position/PositionView.tsx:calls
- LOW: Does `subsystem-8-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- LOW: Does `subsystem-8-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls, apps/web/src/components/position/PositionView.tsx:calls
- LOW: Does `subsystem-81-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/eip712.test.ts:calls, packages/shared/tests/eip712.test.ts:calls
- LOW: Does `subsystem-82-0-packages-shared` really depend on `subsystem-15-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- LOW: Does `subsystem-82-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- LOW: Does `subsystem-82-0-packages-shared` really depend on `subsystem-31-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls, packages/shared/tests/gameplay-schemas.test.ts:calls
- LOW: Does `subsystem-83-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls
- LOW: Does `subsystem-83-0-packages-shared` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- LOW: Does `subsystem-83-0-packages-shared` really depend on `subsystem-59-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls, packages/shared/tests/gameplay-scoring.test.ts:calls
- LOW: Does `subsystem-84-0-packages-shared` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- LOW: Does `subsystem-84-0-packages-shared` really depend on `subsystem-23-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/progression.test.ts:calls
- LOW: Does `subsystem-84-0-packages-shared` really depend on `subsystem-35-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls, packages/shared/tests/progression.test.ts:calls
- LOW: Does `subsystem-84-0-packages-shared` really depend on `subsystem-39-0-packages-shared` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/shared/tests/progression.test.ts:calls
- LOW: Does `subsystem-85-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:calls, apps/web/src/components/wallet/ConnectWalletButton.tsx:calls
- LOW: Does `subsystem-85-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/ConnectWalletButton.tsx:calls, apps/web/src/components/wallet/ConnectWalletButton.tsx:calls
- LOW: Does `subsystem-87-0-apps-web` really depend on `subsystem-20-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- LOW: Does `subsystem-87-0-apps-web` really depend on `subsystem-29-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- LOW: Does `subsystem-87-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/json-safe.test.ts:calls
- LOW: Does `subsystem-87-0-apps-web` really depend on `subsystem-73-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/tests/json-safe.test.ts:calls, apps/web/tests/json-safe.test.ts:calls
- LOW: Does `subsystem-88-0-packages-relayer` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- LOW: Does `subsystem-88-0-packages-relayer` really depend on `subsystem-24-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls, packages/relayer/src/main.ts:calls
- LOW: Does `subsystem-88-0-packages-relayer` really depend on `subsystem-38-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: packages/relayer/src/main.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-24-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-26-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-4-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-9-0-apps-web` really depend on `subsystem-7-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls, apps/web/src/features/gameplay/trails/evidence-adapter.ts:calls
- LOW: Does `subsystem-90-0-apps-web` really depend on `subsystem-1-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-90-0-apps-web` really depend on `subsystem-10-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-90-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-90-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls, apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-90-0-apps-web` really depend on `subsystem-33-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/InteractiveMap.tsx:calls
- LOW: Does `subsystem-92-0-apps-web` really depend on `subsystem-45-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/api/gameplay/trails/today/route.ts:calls, apps/web/src/app/api/gameplay/trails/today/route.ts:calls
- LOW: Does `subsystem-93-0-apps-web` really depend on `subsystem-2-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:calls
- LOW: Does `subsystem-93-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/map/DemoLocationBanner.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls, apps/web/src/components/map/DemoLocationBanner.tsx:calls
- LOW: Does `subsystem-94-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/components/wallet/TestnetBanner.tsx:calls, apps/web/src/components/wallet/TestnetBanner.tsx:calls
- LOW: Does `subsystem-96-0-apps-web` really depend on `subsystem-13-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/api-response.ts:calls, apps/web/src/lib/api-response.ts:calls
- LOW: Does `subsystem-97-0-apps-web` really depend on `subsystem-31-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/lib/json.ts:calls
- LOW: Does `subsystem-98-0-apps-web` really depend on `subsystem-3-0-apps-web` through `calls`? Why: The strongest cross-subsystem signal is backed by ambiguous or sparse evidence. Evidence: apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls, apps/web/src/app/admin/health/page.tsx:calls
- LOW: How does `loadEnvFile()` connect to `trim` across boundaries? Why: ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection()
- LOW: What responsibilities are grouped inside Community 0? Why: Representative nodes: argparse.ArgumentParser, bytes, ccs.sort. Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection()
- LOW: What responsibilities are grouped inside Community 1? Why: Representative nodes: addTo, applyMapModeVisibility, Array.isArray. Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection()
- LOW: What responsibilities are grouped inside Community 2? Why: Representative nodes: clearSimulationTimers, clearTimeout, console.log. Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection()
- LOW: Why is `InteractiveMap()` central to the repository? Why: It has the highest grounded degree in community 90. Evidence: apps/web/src/components/map/InteractiveMap.tsx:InteractiveMap(), apps/web/src/features/gameplay/trails/TodayTrailSection.tsx:TodayTrailSection()
