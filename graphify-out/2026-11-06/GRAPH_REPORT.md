# Graph Report - Yield Go Project  (2026-11-05)

## Corpus Check
- 121 files · ~147,558 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 36 file(s) not represented in the graph (top: (none) 29, .toml 4, .example 1)
- WARNING: 36 of 158 files seen (23%) have no supported extractor and are missing from this graph entirely. It may look complete while representing only part of the codebase.

## Summary
- 3985 nodes · 5685 edges · 178 communities (157 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4088017e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- manifest.json
- Extraction Metadata
- math/progression.ts
- vm.py
- DeFi Contracts and Flows
- Monorepo Root Configuration
- System Architecture Concepts
- Incremental Analysis State
- Semantic Analysis Metadata
- Shared TypeScript Configuration
- Web TypeScript Configuration
- Contributing to Foundry
- Next Type Environment
- Web Package Metadata
- Domain Config Metadata
- Relayer Package Metadata
- Relayer Entrypoint Metadata
- Module Analysis Artifact
- Domain Package Configuration
- Relayer Package Configuration
- Fuji Contract Package
- Game L1 Contract Package
- Domain TypeScript Configuration
- Relayer TypeScript Configuration
- Domain Architecture Boundary
- Scripts Architecture Boundary
- Next Environment Entry
- Web Layout Entry
- Web Page Entry
- contracts-cchain/package.json
- Operations Script Entry
- packages/domain Subsystem
- scripts Subsystem
- sync-release-branch
- with
- scan-github-actions.yml
- updates
- test
- jobs
- forge-std/package.json
- architectureContextSummary
- matrix
- dedupSummary
- clusteringSummary
- graphSummary
- build-matrix
- VmSafe
- analysisSummary
- build
- ci-success
- codeql
- typos
- Release checklist
- console
- _sendLogPayload
- _sendLogPayload
- safeconsole
- Vm
- StdAssertions
- StdStyle
- stdJson
- stdToml
- AccountingTest
- StdStorageTest
- StdCheatsSafe
- StdCheats
- LibVariable
- StdConfig
- StdInvariant
- ErrorsTest
- StorageTest
- LibVariableHelper
- StdCheatsTest
- StdCheats.t.sol
- SponsorPool
- IERC4626
- IMulticall3
- Test.sol
- YieldVault
- IERC721
- StdChains
- LibVariableTest
- StdChainsTest
- StdUtils
- assertTrue
- stdStorageSafe
- IERC6909
- stdStorage
- StdUtilsTest
- ConfigTest
- IERC7575
- StdAssertionsTest
- IERC1155
- StdMathTest
- StdStorage.t.sol
- IERC7540Deposit
- Test
- StdSecp256k1
- TxDetailLegacy
- StdUtilsForkTest
- AccountAccess
- schemas.ts
- env.ts
- CommonBase
- StdCheatsForkTest
- RawReceipt
- Receipt
- _styleConcat
- AccountAccessKind
- domain.ts
- RawReceiptLog
- checked_write
- ReceiptLog
- ForgeContext
- EthGetLogs
- CommonBaseTest
- MockUSDC
- RawTx1559Detail
- Tx1559Detail
- PositionSnapshot
- PositionView
- RequestStatus
- Script
- EIP1559ScriptArtifact
- RawEIP1559ScriptArtifact
- RawTx1559
- Tx1559
- TxLegacy
- StdConstants
- EthGetProof
- FsMetadata
- Bar
- StdStyleTest
- _read
- StdUtilsMock
- DebugStep
- Gas
- StorageAccess
- AddressType
- makeAddrAndKey
- yParity
- CallerMode
- BroadcastTxSummary
- DirEntry
- SignedDelegation
- Position
- Chain
- Wallet
- TestMockCall
- ReflectionTokenTarget
- StorageTestTarget
- Rarity
- FindCallData
- BroadcastTxType
- EthStorageProof
- FfiResult
- Log
- PotentialRevert
- BudgetType
- AccessList
- Account
- sigs
- AccessListItem
- ChainInfo
- Rpc
- logMemory
- fail
- root
- VmInternal
- findSlot
- readNonBoolValue

## God Nodes (most connected - your core abstractions)
1. `VmSafe` - 446 edges
2. `console` - 398 edges
3. `_sendLogPayload()` - 395 edges
4. `safeconsole` - 347 edges
5. `_sendLogPayload()` - 342 edges
6. `Vm` - 151 edges
7. `StdAssertions` - 129 edges
8. `StdStyle` - 92 edges
9. `StdCheatsSafe` - 63 edges
10. `StdCheatsTest` - 58 edges

## Surprising Connections (you probably didn't know these)
- `Grounded Architecture Synthesis` --semantically_similar_to--> `Confirmed Repository Context`  [INFERRED] [semantically similar]
  .archify/docs/archify/brief.md → docs/ARCHITECTURE_AI.md
- `Archify Fact Policy` --semantically_similar_to--> `Confirmed Repository Context`  [INFERRED] [semantically similar]
  .archify/docs/archify/guide.md → docs/ARCHITECTURE_AI.md
- `apps/web Subsystem` --semantically_similar_to--> `Walk-to-DeFi PWA`  [INFERRED] [semantically similar]
  .archify/architecture-context.md → DeFi-Trail-PRD.md
- `services/relayer Subsystem` --semantically_similar_to--> `Self-Hosted ICM Relayer`  [INFERRED] [semantically similar]
  .archify/architecture-context.md → DeFi-Trail-PRD.md
- `test_StorageCheckedWriteMapBool()` --calls--> `assertTrue()`  [EXTRACTED]
  packages/contracts-cchain/lib/forge-std/test/StdStorage.t.sol → packages/contracts-cchain/lib/forge-std/src/StdAssertions.sol

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cross-Chain Position Lifecycle** — defi_trail_prd_chest_manager, defi_trail_prd_game_icm_gateway, defi_trail_prd_c_chain_icm_gateway, defi_trail_prd_yield_vault, defi_trail_prd_position_snapshot, defi_trail_prd_player_state [EXTRACTED 1.00]
- **Three Chest Flows** — defi_trail_prd_yield_chest, defi_trail_prd_quest_chest, defi_trail_prd_sponsor_chest [EXTRACTED 1.00]
- **Grounded Architecture Prompt Pipeline** — _archify_docs_archify_brief_grounded_architecture, _archify_docs_archify_guide_fact_policy, docs_architecture_ai_architecture_prompt_pack [INFERRED 0.85]

## Communities (178 total, 21 thin omitted)

### Community 0 - "manifest.json"
Cohesion: 0.15
Nodes (12): artifact, generatedAt, graphArtifactVersion, manifestVersion, mode, phase, scanRoot, semanticConfigFingerprint (+4 more)

### Community 1 - "Extraction Metadata"
Cohesion: 0.06
Nodes (37): nextConfig, dependencies, @defi-trail/shared@workspace:*, h3-js@4.5.0, maplibre-gl@6.16.0, next@16.4.5, react@19.3.1, react-dom@19.3.1 (+29 more)

### Community 2 - "math/progression.ts"
Cohesion: 0.21
Nodes (19): BALANCE_TIER_THRESHOLDS, BASE_COMPASS_LEVEL, BASE_ENERGY_MAX, BASE_OPEN_RADIUS_METERS, MAX_EXPLORATION_STREAK_BONUS, MAX_POWER_LEVEL, MOCK_USDC_DECIMALS, MOCK_USDC_UNIT (+11 more)

### Community 3 - "vm.py"
Cohesion: 0.05
Nodes (20): Cheatcode, Cheatcodes, CheatcodesPrinter, cmp_cheatcode(), CmpCheatcode, Enum, EnumVariant, Error (+12 more)

### Community 4 - "DeFi Contracts and Flows"
Cohesion: 0.11
Nodes (28): extraction, architectureTags, extraction, fileType, hash, mtime, sizeBytes, architectureTags (+20 more)

### Community 5 - "Monorepo Root Configuration"
Cohesion: 0.09
Nodes (26): devDependencies, eslint@10.14.0, @eslint/js@10.0.1, @types/node@26.6.6, typescript@5.9.3, typescript-eslint@8.72.1, engines, node (+18 more)

### Community 6 - "System Architecture Concepts"
Cohesion: 0.15
Nodes (14): dependencies, zod@4.6.7, devDependencies, vitest@^5.1.0, exports, name, private, scripts (+6 more)

### Community 7 - "Incremental Analysis State"
Cohesion: 0.15
Nodes (23): semantic, semantic, semantic, architectureTags, fileType, hash, mtime, semantic (+15 more)

### Community 8 - "Semantic Analysis Metadata"
Cohesion: 0.08
Nodes (30): apps/web Subsystem, Configuration Cross-Cutting Concern, services/relayer Subsystem, Next.js Graph Hub, Initial Repository Knowledge Graph, CChainICMGateway, ChestManager, DeFi Trail (+22 more)

### Community 9 - "Shared TypeScript Configuration"
Cohesion: 0.13
Nodes (12): compilerOptions, jsx, paths, plugins, exclude, extends, include, ../../tsconfig.base.json (+4 more)

### Community 10 - "Web TypeScript Configuration"
Cohesion: 0.13
Nodes (15): architectureTags, fileType, hash, mtime, sizeBytes, files, apps/web/next-env.d.ts, services/relayer/src/main.ts (+7 more)

### Community 11 - "Contributing to Foundry"
Cohesion: 0.06
Nodes (33): Abandoned or stale pull requests, Adding cheatcodes, Asking for help, Be aware of the person behind the code, Code of Conduct, Commits, Contributing to Foundry, Contributions Related to Spelling and Grammar (+25 more)

### Community 12 - "Next Type Environment"
Cohesion: 0.14
Nodes (14): incremental, changed_code_files, changed_semantic_files, changedFileCount, deleted_files, deletedFileCount, fallbackReason, incrementalEligible (+6 more)

### Community 13 - "Web Package Metadata"
Cohesion: 0.17
Nodes (12): semanticSummary, backend, edgeCount, enabled, hyperedgeCount, mode, nodeCount, processedDocumentCount (+4 more)

### Community 14 - "Domain Config Metadata"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, resolveJsonModule (+3 more)

### Community 15 - "Relayer Package Metadata"
Cohesion: 0.25
Nodes (5): Guided Architecture Generation, Required Architecture Prompt Sections, Architecture AI Prompt Pack, Confirmed Repository Context, Open Architecture Uncertainty

### Community 16 - "Relayer Entrypoint Metadata"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, apps/web/next.config.ts

### Community 17 - "Module Analysis Artifact"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, apps/web/src/app/page.tsx

### Community 18 - "Domain Package Configuration"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, apps/web/tsconfig.json

### Community 19 - "Relayer Package Configuration"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, DeFi-Trail-PRD.md

### Community 20 - "Fuji Contract Package"
Cohesion: 0.25
Nodes (8): package.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 21 - "Game L1 Contract Package"
Cohesion: 0.25
Nodes (8): packages/domain/package.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 22 - "Domain TypeScript Configuration"
Cohesion: 0.25
Nodes (8): packages/domain/src/index.ts, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 23 - "Relayer TypeScript Configuration"
Cohesion: 0.25
Nodes (8): packages/domain/tsconfig.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 24 - "Domain Architecture Boundary"
Cohesion: 0.25
Nodes (8): scripts/main.ts, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 25 - "Scripts Architecture Boundary"
Cohesion: 0.25
Nodes (8): services/relayer/package.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 26 - "Next Environment Entry"
Cohesion: 0.25
Nodes (8): services/relayer/tsconfig.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 27 - "Web Layout Entry"
Cohesion: 0.25
Nodes (7): artifact, dependencies, modules, phase, scanRoot, status, targetPath

### Community 28 - "Web Page Entry"
Cohesion: 0.25
Nodes (7): allowBuilds, bufferutil, keccak, utf-8-validate, overrides, use-sync-external-store, packages

### Community 29 - "contracts-cchain/package.json"
Cohesion: 0.10
Nodes (15): dependencies, @openzeppelin/contracts@^5.6.1, devDependencies, forge-std@^1.1.2, solc@0.8.28, name, private, scripts (+7 more)

### Community 30 - "Operations Script Entry"
Cohesion: 0.33
Nodes (5): name, private, scripts, test, version

### Community 37 - "sync-release-branch"
Cohesion: 0.10
Nodes (20): jobs, sync-release-branch, name, on, release, permissions, contents, id-token (+12 more)

### Community 38 - "with"
Cohesion: 0.16
Nodes (18): steps, steps, steps, INPUT_FLAGS, steps, env, id, name (+10 more)

### Community 39 - "scan-github-actions.yml"
Cohesion: 0.12
Nodes (16): jobs, scan, name, on, pull_request, push, workflow_dispatch, permissions (+8 more)

### Community 40 - "updates"
Cohesion: 0.13
Nodes (14): patterns, default-days, ci-weekly, day, interval, time, timezone, updates (+6 more)

### Community 41 - "test"
Cohesion: 0.17
Nodes (15): permissions, permissions, permissions, runs-on, timeout-minutes, fmt, test, actions (+7 more)

### Community 42 - "jobs"
Cohesion: 0.15
Nodes (12): env, SOLC_LATEST, SOLC_MINIMUM, SOLC_PRERELEASE, jobs, name, on, pull_request (+4 more)

### Community 43 - "forge-std/package.json"
Cohesion: 0.17
Nodes (11): author, bugs, description, files, homepage, license, name, repository (+3 more)

### Community 44 - "architectureContextSummary"
Cohesion: 0.20
Nodes (10): architectureContextSummary, crossCuttingConcernCount, dataFlowCount, docEvidenceSubsystemCount, entrypointCount, externalDependencyCount, interfaceCount, openQuestionCount (+2 more)

### Community 45 - "matrix"
Cohesion: 0.28
Nodes (9): strategy, strategy, build-mode, language, include, toolchain, fail-fast, matrix (+1 more)

### Community 46 - "dedupSummary"
Cohesion: 0.29
Nodes (7): dedupSummary, droppedSelfLoopCount, duplicateEdgeCount, duplicateNodeCount, duplicateNodeIdCount, mergedLabelGroupCount, mergedLabelGroups

### Community 47 - "clusteringSummary"
Cohesion: 0.33
Nodes (6): clusteringSummary, backend, communityCount, isolateCount, maxCommunitySize, usedFallback

### Community 48 - "graphSummary"
Cohesion: 0.33
Nodes (6): graphSummary, communityCount, edgeCount, hyperedgeCount, nodeCount, warningCount

### Community 49 - "build-matrix"
Cohesion: 0.33
Nodes (6): outputs, permissions, runs-on, timeout-minutes, build-matrix, matrix

### Community 51 - "analysisSummary"
Cohesion: 0.40
Nodes (5): analysisSummary, ambiguousEdgeCount, godNodeCount, suggestedQuestionCount, surprisingConnectionCount

### Community 52 - "build"
Cohesion: 0.40
Nodes (5): name, needs, runs-on, timeout-minutes, build

### Community 53 - "ci-success"
Cohesion: 0.40
Nodes (5): if, needs, runs-on, timeout-minutes, ci-success

### Community 54 - "codeql"
Cohesion: 0.50
Nodes (4): name, runs-on, steps, codeql

### Community 55 - "typos"
Cohesion: 0.50
Nodes (4): typos, runs-on, steps, timeout-minutes

### Community 58 - "console"
Cohesion: 0.01
Nodes (198): console, log(), log(), log(), log(), log(), log(), log() (+190 more)

### Community 59 - "_sendLogPayload"
Cohesion: 0.01
Nodes (199): _castToPure(), log(), log(), log(), log(), log(), log(), log() (+191 more)

### Community 60 - "_sendLogPayload"
Cohesion: 0.01
Nodes (173): log(), log(), log(), log(), log(), log(), log(), log() (+165 more)

### Community 61 - "safeconsole"
Cohesion: 0.01
Nodes (170): safeconsole, log(), log(), log(), log(), log(), log(), log() (+162 more)

### Community 63 - "StdAssertions"
Cohesion: 0.02
Nodes (20): StdAssertions, log_address, log_array, log_bytes32, log_bytes, log_int, log_named_address, log_named_array (+12 more)

### Community 64 - "StdStyle"
Cohesion: 0.03
Nodes (14): StdStyle, BLUE, BOLD, CYAN, DIM, GREEN, INVERSE, ITALIC (+6 more)

### Community 65 - "stdJson"
Cohesion: 0.05
Nodes (41): stdJson, keyExists(), readAddress(), readAddressArray(), readAddressArrayOr(), readAddressOr(), readBool(), readBoolArray() (+33 more)

### Community 66 - "stdToml"
Cohesion: 0.05
Nodes (41): stdToml, keyExists(), readAddress(), readAddressArray(), readAddressArrayOr(), readAddressOr(), readBool(), readBoolArray() (+33 more)

### Community 67 - "AccountingTest"
Cohesion: 0.04
Nodes (14): AccountingTest, admin, alice, bob, eve, funder, gateway, INITIAL_PRINCIPAL (+6 more)

### Community 68 - "StdStorageTest"
Cohesion: 0.04
Nodes (3): StdStorageTest, test_StorageCheckedWriteMapBool(), test

### Community 69 - "StdCheatsSafe"
Cohesion: 0.06
Nodes (48): StdCheatsSafe, assumeAddressIsNot(), assumeAddressIsNot(), assumeAddressIsNot(), assumeAddressIsNot(), assumeNotForgeAddress(), assumeNotPayable(), assumeNotPrecompile() (+40 more)

### Community 70 - "StdCheats"
Cohesion: 0.05
Nodes (37): StdCheats, changePrank(), changePrank(), _console2_log_StdCheats(), deal(), deal(), dealERC1155(), dealERC1155() (+29 more)

### Community 71 - "LibVariable"
Cohesion: 0.08
Nodes (42): LibVariable, NotInitialized, TypeMismatch, UnsafeCast, assertEq(), assertExists(), isEqual(), toAddress() (+34 more)

### Community 72 - "StdConfig"
Cohesion: 0.08
Nodes (38): StdConfig, constructor(), AlreadyInitialized, ChainNotInitialized, InvalidChainKey, MissingRpcEndpoint, UnableToParseVariable, WriteToFileInForbiddenCtxt (+30 more)

### Community 73 - "StdInvariant"
Cohesion: 0.05
Nodes (20): StdInvariant, _excludedArtifacts, _excludedContracts, _excludedSelectors, _excludedSenders, _targetedArtifacts, _targetedArtifactSelectors, _targetedContracts (+12 more)

### Community 74 - "ErrorsTest"
Cohesion: 0.05
Nodes (17): stdError, arithmeticError, assertionError, divisionError, encodeStorageError, enumConversionError, indexOOBError, memOverflowError (+9 more)

### Community 75 - "StorageTest"
Cohesion: 0.05
Nodes (31): StorageTest, _getMask(), getRandomPacked(), setRandomPacking(), basic, deep_map, deep_map_struct, edgeCaseArray (+23 more)

### Community 77 - "StdCheatsTest"
Cohesion: 0.08
Nodes (24): deal(), deployCode(), deployCode(), deriveRememberKey(), destroyAccount(), noGasMetering(), StdCheatsTest, addInLoop() (+16 more)

### Community 78 - "StdCheats.t.sol"
Cohesion: 0.06
Nodes (18): BarERC1155, _balances, _totalSupply, BarERC721, _balances, _owners, MockContractPayable, MockContractWithConstructorArgs (+10 more)

### Community 79 - "SponsorPool"
Cohesion: 0.10
Nodes (33): SponsorPool, constructor(), InsufficientPrincipalBudget, InsufficientQuestBudget, InsufficientRewardReserve, InvariantViolation, ZeroAddress, ZeroAmount (+25 more)

### Community 80 - "IERC4626"
Cohesion: 0.06
Nodes (6): IERC20, Approval, Transfer, IERC4626, Deposit, Withdraw

### Community 81 - "IMulticall3"
Cohesion: 0.06
Nodes (16): IMulticall3, Call3, allowFailure, callData, target, Call3Value, allowFailure, callData (+8 more)

### Community 83 - "YieldVault"
Cohesion: 0.11
Nodes (27): YieldVault, constructor(), InsufficientPositionBalance, ZeroAddress, ZeroAmount, PositionDeposited, PositionWithdrawn, RewardAccrued (+19 more)

### Community 84 - "IERC721"
Cohesion: 0.09
Nodes (7): IERC721, Approval, ApprovalForAll, Transfer, IERC721Enumerable, IERC721Metadata, IERC721TokenReceiver

### Community 85 - "StdChains"
Cohesion: 0.11
Nodes (23): StdChains, getChain(), getChain(), _getChainWithUpdatedRpcUrl(), _initializeStdChains(), setChain(), _setChainWithDefaultRpcUrl(), _toUpper() (+15 more)

### Community 86 - "LibVariableTest"
Cohesion: 0.08
Nodes (18): LibVariableTest, addressArrayVar, addressVar, boolArrayVar, boolVar, bytes32ArrayVar, bytes32Var, bytesArrayVar (+10 more)

### Community 87 - "StdChainsTest"
Cohesion: 0.09
Nodes (4): setFallbackToDefaultRpcUrls(), StdChainsMock, exposedSetFallbackToDefaultRpcUrls(), StdChainsTest

### Community 88 - "StdUtils"
Cohesion: 0.12
Nodes (19): StdUtils, _castLogPayloadViewToPure(), computeCreate2Address(), computeCreate2Address(), computeCreateAddress(), _console2_log_StdUtils(), _console2_log_StdUtils(), _console2_log_StdUtils() (+11 more)

### Community 89 - "assertTrue"
Cohesion: 0.20
Nodes (21): assertFalse(), assertTrue(), isIdentityAffine(), isIdentityProjective(), isOnCurve(), isValidNonZeroScalar(), isValidScalar(), toAddress() (+13 more)

### Community 90 - "stdStorageSafe"
Cohesion: 0.18
Nodes (18): stdStorageSafe, SlotFound, WARNING_UninitedSlot, _bytesToBytes32(), callTarget(), callTargetRaw(), _checkShortBytesSlot(), checkSlotMutatesCall() (+10 more)

### Community 91 - "IERC6909"
Cohesion: 0.11
Nodes (7): IERC6909, Approval, OperatorSet, Transfer, IERC6909ContentURI, IERC6909Metadata, IERC6909TokenSupply

### Community 92 - "stdStorage"
Cohesion: 0.10
Nodes (12): stdStorage, depth(), enable_packed_slots(), parent(), target(), with_calldata(), vm, depth() (+4 more)

### Community 93 - "StdUtilsTest"
Cohesion: 0.10
Nodes (3): boundPrivateKey(), StdUtilsTest, test_BoundPrivateKey()

### Community 94 - "ConfigTest"
Cohesion: 0.15
Nodes (17): Config, _loadConfig(), _loadConfigAndForks(), chainIds, config, forkOf, assertFalse(), assertTrue() (+9 more)

### Community 95 - "IERC7575"
Cohesion: 0.10
Nodes (3): IERC7575, Deposit, Withdraw

### Community 96 - "StdAssertionsTest"
Cohesion: 0.13
Nodes (20): log, log_named_bytes, assertEqCall(), assertEqCall(), assertEqCall(), assertEqCall(), StdAssertionsTest, assertEqCallExternal() (+12 more)

### Community 97 - "IERC1155"
Cohesion: 0.12
Nodes (8): IERC1155, ApprovalForAll, TransferBatch, TransferSingle, URI, IERC165, IERC7575Share, VaultUpdate

### Community 98 - "StdMathTest"
Cohesion: 0.14
Nodes (11): stdMath, abs(), delta(), percentDelta(), _INT256_MIN, StdMathTest, getAbs(), test_GetAbs() (+3 more)

### Community 99 - "StdStorage.t.sol"
Cohesion: 0.11
Nodes (14): CanonicalLookingStaticReturn, decoy, first, second, MockReflectionToken, _a, _b, _balances (+6 more)

### Community 100 - "IERC7540Deposit"
Cohesion: 0.14
Nodes (7): IERC7540, IERC7540Deposit, DepositRequest, IERC7540Operator, OperatorSet, IERC7540Redeem, RedeemRequest

### Community 101 - "Test"
Cohesion: 0.11
Nodes (6): Test, IS_TEST, CompilationTest, StdConstantsTest, StdMathMock, VmTest

### Community 102 - "StdSecp256k1"
Cohesion: 0.15
Nodes (14): StdSecp256k1, generatorAffine(), generatorProjective(), identityAffine(), identityProjective(), A, B, GX (+6 more)

### Community 103 - "TxDetailLegacy"
Cohesion: 0.12
Nodes (16): TxDetailLegacy, accessList, chainId, data, from, gas, gasPrice, hash (+8 more)

### Community 104 - "StdUtilsForkTest"
Cohesion: 0.14
Nodes (13): getTokenBalances(), StdUtilsForkTest, test_GetTokenBalances_Empty(), test_GetTokenBalances_SHIB(), test_GetTokenBalances_USDC(), SHIB_HOLDER_0, SHIB_HOLDER_1, SHIB_HOLDER_2 (+5 more)

### Community 105 - "AccountAccess"
Cohesion: 0.12
Nodes (16): AccountAccess, accessor, account, chainInfo, data, deployedCode, depth, initialized (+8 more)

### Community 106 - "schemas.ts"
Cohesion: 0.25
Nodes (14): buildEip712Domain(), createLocationProofTypedData(), createSponsorProofTypedData(), EIP712_DOMAIN_NAME, EIP712_DOMAIN_VERSION, EIP712Domain, LOCATION_PROOF_TYPE_NAME, LOCATION_PROOF_TYPES (+6 more)

### Community 107 - "env.ts"
Cohesion: 0.13
Nodes (7): evmAddressSchema, httpUrlSchema, privateKeySchema, PublicEnv, publicEnvSchema, ServerEnv, serverEnvSchema

### Community 108 - "CommonBase"
Cohesion: 0.14
Nodes (13): CommonBase, CONSOLE, CREATE2_FACTORY, DEFAULT_SENDER, DEFAULT_TEST_CONTRACT, MULTICALL3_ADDRESS, SECP256K1_ORDER, stdstore (+5 more)

### Community 109 - "StdCheatsForkTest"
Cohesion: 0.16
Nodes (10): assumeNoBlacklisted(), assumeNotBlacklisted(), StdCheatsForkTest, testFuzz_AssumeNotBlacklisted_TokenWithoutBlacklist(), testFuzz_AssumeNotBlacklisted_USDC(), testFuzz_AssumeNotBlacklisted_USDT(), USDC_BLACKLISTED_USER, USDC (+2 more)

### Community 110 - "RawReceipt"
Cohesion: 0.14
Nodes (14): RawReceipt, blockHash, blockNumber, contractAddress, cumulativeGasUsed, effectiveGasPrice, from, gasUsed (+6 more)

### Community 111 - "Receipt"
Cohesion: 0.14
Nodes (14): Receipt, blockHash, blockNumber, contractAddress, cumulativeGasUsed, effectiveGasPrice, from, gasUsed (+6 more)

### Community 112 - "_styleConcat"
Cohesion: 0.17
Nodes (12): blue(), bold(), cyan(), dim(), green(), inverse(), italic(), magenta() (+4 more)

### Community 113 - "AccountAccessKind"
Cohesion: 0.17
Nodes (12): AccountAccessKind, Balance, Call, CallCode, Create, DelegateCall, Extcodecopy, Extcodehash (+4 more)

### Community 114 - "domain.ts"
Cohesion: 0.17
Nodes (11): ChestType, QUEST, SPONSOR, YIELD, DepositRequest, Hex, LocationProof, PositionSnapshot (+3 more)

### Community 116 - "RawReceiptLog"
Cohesion: 0.18
Nodes (11): RawReceiptLog, blockHash, blockNumber, data, logAddress, logIndex, removed, topics (+3 more)

### Community 117 - "checked_write"
Cohesion: 0.20
Nodes (11): checked_write(), clear(), find(), find(), read_bool(), read_int(), clear(), getMaskByOffsets() (+3 more)

### Community 118 - "ReceiptLog"
Cohesion: 0.20
Nodes (10): ReceiptLog, blockHash, blockNumber, data, logAddress, logIndex, removed, topics (+2 more)

### Community 119 - "ForgeContext"
Cohesion: 0.20
Nodes (10): ForgeContext, Coverage, ScriptBroadcast, ScriptDryRun, ScriptGroup, ScriptResume, Snapshot, Test (+2 more)

### Community 120 - "EthGetLogs"
Cohesion: 0.20
Nodes (10): EthGetLogs, blockHash, blockNumber, data, emitter, logIndex, removed, topics (+2 more)

### Community 122 - "MockUSDC"
Cohesion: 0.22
Nodes (6): MockUSDC, ZeroAddress, MinterRoleGranted, MinterRoleRevoked, mint(), MINTER_ROLE

### Community 123 - "RawTx1559Detail"
Cohesion: 0.22
Nodes (9): RawTx1559Detail, accessList, data, from, gas, nonce, to, txType (+1 more)

### Community 124 - "Tx1559Detail"
Cohesion: 0.22
Nodes (9): Tx1559Detail, accessList, data, from, gas, nonce, to, txType (+1 more)

### Community 125 - "PositionSnapshot"
Cohesion: 0.22
Nodes (9): PositionSnapshot, accruedReward, player, positionStreak, principal, questCompleted, requestId, updatedAt (+1 more)

### Community 126 - "PositionView"
Cohesion: 0.22
Nodes (9): PositionView, accruedReward, lastAccruedAt, pendingReward, positionStreak, principal, qualifyingSince, totalAssets (+1 more)

### Community 127 - "RequestStatus"
Cohesion: 0.22
Nodes (9): RequestStatus, ACK_PENDING, CONFIRMED, CREATED, FAILED_FINAL, NONE, REMOTE_EXECUTED, RETRYABLE_FAILED (+1 more)

### Community 128 - "Script"
Cohesion: 0.25
Nodes (6): ScriptBase, vmSafe, Script, IS_SCRIPT, CompilationScript, CompilationScriptBase

### Community 129 - "EIP1559ScriptArtifact"
Cohesion: 0.25
Nodes (8): EIP1559ScriptArtifact, libraries, path, pending, receipts, timestamp, transactions, txReturns

### Community 130 - "RawEIP1559ScriptArtifact"
Cohesion: 0.25
Nodes (8): RawEIP1559ScriptArtifact, libraries, path, pending, receipts, timestamp, transactions, txReturns

### Community 131 - "RawTx1559"
Cohesion: 0.25
Nodes (8): RawTx1559, arguments, contractAddress, contractName, functionSig, hash, opcode, txDetail

### Community 132 - "Tx1559"
Cohesion: 0.25
Nodes (8): Tx1559, arguments, contractAddress, contractName, functionSig, hash, opcode, txDetail

### Community 133 - "TxLegacy"
Cohesion: 0.25
Nodes (8): TxLegacy, arguments, contractAddress, contractName, functionSig, hash, opcode, transaction

### Community 134 - "StdConstants"
Cohesion: 0.25
Nodes (8): StdConstants, CONSOLE, CREATE2_FACTORY, DEFAULT_SENDER, DEFAULT_TEST_CONTRACT, MULTICALL3_ADDRESS, SECP256K1_ORDER, VM

### Community 135 - "EthGetProof"
Cohesion: 0.25
Nodes (8): EthGetProof, account, accountProof, balance, codeHash, nonce, storageHash, storageProof

### Community 136 - "FsMetadata"
Cohesion: 0.25
Nodes (8): FsMetadata, accessed, created, isDir, isSymlink, length, modified, readOnly

### Community 137 - "Bar"
Cohesion: 0.25
Nodes (3): Bar, balanceOf, totalSupply

### Community 138 - "StdStyleTest"
Cohesion: 0.32
Nodes (4): StdStyleTest, h1(), h2(), test_StyleCustom()

### Community 139 - "_read"
Cohesion: 0.29
Nodes (7): read_address(), read_bytes32(), read_uint(), _read(), read_address(), read_bytes32(), read_uint()

### Community 140 - "StdUtilsMock"
Cohesion: 0.29
Nodes (4): bytesToUint(), StdUtilsMock, exposedBytesToUint(), test_BytesToUint()

### Community 141 - "DebugStep"
Cohesion: 0.29
Nodes (7): DebugStep, contractAddr, depth, isOutOfGas, memoryInput, opcode, stack

### Community 142 - "Gas"
Cohesion: 0.29
Nodes (7): Gas, gasLimit, gasMemoryUsed, gasRefunded, gasRemaining, gasStateUsed, gasTotalUsed

### Community 143 - "StorageAccess"
Cohesion: 0.29
Nodes (7): StorageAccess, account, isWrite, newValue, previousValue, reverted, slot

### Community 144 - "AddressType"
Cohesion: 0.33
Nodes (6): AddressType, ForgeAddress, NonPayable, Payable, Precompile, ZeroAddress

### Community 145 - "makeAddrAndKey"
Cohesion: 0.47
Nodes (6): makeAccount(), makeAddr(), makeAddrAndKey(), test_MakeAccountEquivalence(), test_MakeAddrEquivalence(), test_MakeAddrSigning()

### Community 146 - "yParity"
Cohesion: 0.73
Nodes (6): yCompressed(), yParity(), yParityEthereum(), encodings(), test_ParityBounds(), testFuzz_Parity()

### Community 147 - "CallerMode"
Cohesion: 0.33
Nodes (6): CallerMode, Broadcast, None, Prank, RecurrentBroadcast, RecurrentPrank

### Community 148 - "BroadcastTxSummary"
Cohesion: 0.33
Nodes (6): BroadcastTxSummary, blockNumber, contractAddress, success, txHash, txType

### Community 149 - "DirEntry"
Cohesion: 0.33
Nodes (6): DirEntry, depth, errorMessage, isDir, isSymlink, path

### Community 150 - "SignedDelegation"
Cohesion: 0.33
Nodes (6): SignedDelegation, implementation, nonce, r, s, v

### Community 151 - "Position"
Cohesion: 0.33
Nodes (6): Position, accruedReward, lastAccruedAt, principal, qualifyingSince, weightedAprBps

### Community 152 - "Chain"
Cohesion: 0.40
Nodes (5): Chain, chainAlias, chainId, name, rpcUrl

### Community 153 - "Wallet"
Cohesion: 0.40
Nodes (5): Wallet, addr, privateKey, publicKeyX, publicKeyY

### Community 154 - "TestMockCall"
Cohesion: 0.40
Nodes (3): TestMockCall, returnData, shouldRevert

### Community 155 - "ReflectionTokenTarget"
Cohesion: 0.40
Nodes (3): ReflectionTokenTarget, stdstore, token

### Community 156 - "StorageTestTarget"
Cohesion: 0.40
Nodes (3): StorageTestTarget, stdstore, test

### Community 157 - "Rarity"
Cohesion: 0.40
Nodes (5): Rarity, COMMON, EPIC, LEGENDARY, RARE

### Community 158 - "FindCallData"
Cohesion: 0.50
Nodes (4): FindCallData, reads, result, shortBytesStorageValue

### Community 159 - "BroadcastTxType"
Cohesion: 0.50
Nodes (4): BroadcastTxType, Call, Create, Create2

### Community 160 - "EthStorageProof"
Cohesion: 0.50
Nodes (4): EthStorageProof, key, proof, value

### Community 161 - "FfiResult"
Cohesion: 0.50
Nodes (4): FfiResult, exitCode, stderr, stdout

### Community 162 - "Log"
Cohesion: 0.50
Nodes (4): Log, data, emitter, topics

### Community 163 - "PotentialRevert"
Cohesion: 0.50
Nodes (4): PotentialRevert, partialMatch, revertData, reverter

### Community 164 - "BudgetType"
Cohesion: 0.50
Nodes (4): BudgetType, PRINCIPAL, QUEST, REWARD

### Community 165 - "AccessList"
Cohesion: 0.67
Nodes (3): AccessList, accessAddress, storageKeys

### Community 166 - "Account"
Cohesion: 0.67
Nodes (3): Account, addr, key

### Community 167 - "sigs"
Cohesion: 0.67
Nodes (3): sigs(), sig(), sigs()

### Community 168 - "AccessListItem"
Cohesion: 0.67
Nodes (3): AccessListItem, storageKeys, target

### Community 169 - "ChainInfo"
Cohesion: 0.67
Nodes (3): ChainInfo, chainId, forkId

### Community 170 - "Rpc"
Cohesion: 0.67
Nodes (3): Rpc, key, url

## Knowledge Gaps
- **59 isolated node(s):** `Payable`, `NonPayable`, `ZeroAddress`, `Precompile`, `ForgeAddress` (+54 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 2215 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `VmSafe` connect `VmSafe` to `EthGetProof`, `FsMetadata`, `DebugStep`, `Gas`, `StorageAccess`, `CallerMode`, `BroadcastTxSummary`, `DirEntry`, `SignedDelegation`, `Chain`, `Wallet`, `BroadcastTxType`, `EthStorageProof`, `FfiResult`, `Log`, `PotentialRevert`, `AccessListItem`, `ChainInfo`, `Rpc`, `Vm`, `Test.sol`, `AccountAccess`, `AccountAccessKind`, `ForgeContext`, `EthGetLogs`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **What connects `Payable`, `NonPayable`, `ZeroAddress` to the rest of the system?**
  _59 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Extraction Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.059233449477351915 - nodes in this community are weakly interconnected._
- **Why does `safeconsole` connect `safeconsole` to `Test.sol`, `logMemory`, `_sendLogPayload`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `vm.py` be split into smaller, more focused modules?**
  _Cohesion score 0.05388151174668029 - nodes in this community are weakly interconnected._
- **Why does `console` connect `console` to `Test.sol`, `_sendLogPayload`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `DeFi Contracts and Flows` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._