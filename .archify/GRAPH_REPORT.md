# Graph Report - C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project (2026-11-07)

## Corpus Check
- 652 files scanned
- 118 code files contributed grounded graph fragments
- Verdict: graph analysis is available without LLM synthesis.

## Summary
- 2484 nodes · 6183 edges · 126 communities
- Warnings: 0 · Ambiguous edges: 5232 (85%)
- Top hubs: 10 · Surprises: 5 · Suggested questions: 5

## God Nodes
1. `InteractiveMap()` - degree 90 · community 90 · apps/web/src/components/map/InteractiveMap.tsx
2. `TodayTrailSection()` - degree 43 · community 11 · apps/web/src/features/gameplay/trails/TodayTrailSection.tsx
3. `PositionView()` - degree 35 · community 8 · apps/web/src/components/position/PositionView.tsx
4. `CheatcodesPrinter` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py
5. `main()` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py
6. `GameplayTracker` - degree 29 · community 17 · apps/web/src/features/analytics/tracker.ts
7. `ICMProgressModalView()` - degree 26 · community 10 · apps/web/src/components/cross-chain/ICMProgressModal.tsx
8. `evaluatePassport()` - degree 26 · community 7 · apps/web/src/features/gameplay/passport/engine.ts
9. `SponsorScannerModal()` - degree 23 · community 22 · apps/web/src/components/sponsor/SponsorScannerModal.tsx
10. `QuestTutorialModal()` - degree 22 · community 25 · apps/web/src/components/quest/QuestTutorialModal.tsx

## Surprising Connections
- `loadEnvFile()` --calls--> `trim` [AMBIGUOUS]
  packages/relayer/scripts/seed.ts -> apps/web/src/app/api/admin/health/route.ts · ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- `loadEnvFile()` --calls--> `trim` [AMBIGUOUS]
  packages/relayer/scripts/seed.ts -> apps/web/src/app/api/admin/health/route.ts · ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- `loadEnvFile()` --calls--> `trimmed.slice` [AMBIGUOUS]
  packages/relayer/scripts/seed.ts -> apps/web/src/lib/chains.ts · ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- `loadEnvFile()` --calls--> `trimmed.slice` [AMBIGUOUS]
  packages/relayer/scripts/seed.ts -> apps/web/src/lib/chains.ts · ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- `getRelayerConfiguration()` --calls--> `Relayer` [AMBIGUOUS]
  packages/relayer/src/main.ts -> apps/web/src/app/api/admin/health/route.ts · ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop

## Communities (126 total)
- Community 0: 155 nodes · cohesion 0.02 · argparse.ArgumentParser, bytes, ccs.sort, cheats.insert, copy.deepcopy, decode, enumerate, f
- Community 1: 77 nodes · cohesion 0.0 · addTo, applyMapModeVisibility, Array.isArray, Banner, basemap, Button, calculateOpenRadius, Chests
- Community 2: 48 nodes · cohesion 0.0 · clearSimulationTimers, clearTimeout, console.log, current.forEach, current.push, current.setConfirmed, current.setOnChainStatus, current.setPending
- Community 3: 45 nodes · cohesion 0.0 · Active, AdminHealthPage, async, AVAX, Bar, Budget, clearInterval, clipboard.writeText
- Community 4: 42 nodes · cohesion 0.05 · async, cb, clearInterval, clearPendingRequest, getElapsedSeconds, getPendingRequest, getRelayWaitState, getStepStatus
- Community 5: 42 nodes · cohesion 0.05 · address.startsWith, budget, Budgets, console.error, content.split, createPublicClient, createWalletClient, endsWith
- Community 6: 39 nodes · cohesion 0.05 · Engine, firstCheckpointConfirmed.add, firstCheckpointConfirmedUsers.add, firstCheckpointConfirmedUsers.has, FORBIDDEN_ANALYTICS_KEY_REGEX.test, GPS, input.charCodeAt, issues.map
- Community 7: 37 nodes · cohesion 0.06 · badges.find, badges.push, badges.sort, collection.find, collection.push, createEarnedBadge, Date.parse, eventId.localeCompare
- Community 8: 36 nodes · cohesion 0.06 · accruedReward.toFixed, BigInt, Box, calculateBalanceTier, calculateEnergyMax, calculatePowerLevel, calculateStreakTier, Calculations
- Community 9: 36 nodes · cohesion 0.07 · address.slice, applyCheckpointEvidence, Array.from, checkpoints.some, completedCheckpointIds.add, completedCheckpointIds.has, completedKeys.add, completedKeys.has
- Community 10: 35 nodes · cohesion 0.06 · blur, closeModal, e.stopPropagation, getRelayAnnouncement, getRelayLearningCard, getRelayMomentStages, hash.slice, Math.floor
- Community 11: 35 nodes · cohesion 0.06 · AbortController, checkpoints.findIndex, completedCheckpoints.slice, controller.abort, createConfirmedTrailEvidence, createTrailProgress, Date.parse, getPendingRequest
- Community 12: 35 nodes · cohesion 0.06 · assert.equal, assert.ok, async, content.includes, decimals, errors.map, fileURLToPath, filter
- Community 13: 32 nodes · cohesion 0.07 · AbortController, balance, BigInt, clearTimeout, controller.abort, Date.now, epoch, fetch
- Community 14: 31 nodes · cohesion 0.06 · Calculation, completion, detectForbiddenFields, Execution, GameplayTracker, getAdminAnalytics, getGameplayTracker, globalMemoryAnalyticsSink.clear
- Community 15: 29 nodes · cohesion 0.07 · at.getTime, at.toISOString, checkpointSlots.map, GameplayConfigError, getActiveSeason, getTodayTrail, Number.isSafeInteger, resolvedTrails.map
- Community 16: 28 nodes · cohesion 0.07 · applyMapModeVisibility, calculateBearing, createGeodesicCircle, findNearestChest, Generation, getCartoLabelsTileUrl, getChestLandmark, getChestReward
- Community 17: 27 nodes · cohesion 0.09 · completedTrailKeys.add, completedTrailKeys.clear, completedTrailKeys.has, Error, join, Math.random, pseudonymizeWallet, sink.emit
- Community 18: 25 nodes · cohesion 0.08 · applyConfirmedEvidence, describe, expect, it, length, readFileSync, toBe, toBeDefined
- Community 19: 24 nodes · cohesion 0.08 · chainKey.toLowerCase, faucetClaims.clear, faucetClaims.has, faucetClaims.set, ipFaucetCounts.clear, ipFaucetCounts.get, ipFaucetCounts.set, ipTimes.push
- Community 20: 24 nodes · cohesion 0.08 · accuracy, beforeEach, code, Conformance, createSignedSponsorQrPayload, getMapConfig, NextRequest, postFaucetGas
- Community 21: 23 nodes · cohesion 0.1 · Boolean, checkpoints.findIndex, demoModePolicy, eligibleEventTypes.includes, evidence.slice, existingClaims.some, identityOf, policy
- Community 22: 22 nodes · cohesion 0.1 · current.clear, current.stop, Date.now, html5Qr.start, Html5Qrcode, initCamera, JSON.stringify, manualCode.trim
- Community 23: 21 nodes · cohesion 0.1 · bearing, Center, coordinates.push, direction, Math.asin, Math.atan2, Math.cos, Math.round
- Community 24: 21 nodes · cohesion 0.11 · console.log, constructor, errors.push, events.filter, events.push, sink, Sinks, CompositeAnalyticsSink
- Community 25: 20 nodes · cohesion 0.11 · BUỘC, chuẩn, nào, onApproveAndDeposit, onClaimBudget, onClose, onComplete, phỏng
- Community 26: 19 nodes · cohesion 0.11 · check, checkFaucetRateLimit, encodePacked, errorResponse, getCurrentEpoch, headers.get, keccak256, Math.floor
- Community 27: 19 nodes · cohesion 0.11 · accuracyMeters.toFixed, clock, constraints, coordinates, DEMO, findSlotByChestId, generateNonce, GUARANTEE
- Community 28: 19 nodes · cohesion 0.13 · account.signTypedData, createThirdwebClient, crypto.createHmac, crypto.randomBytes, digest, expectedChestId.toLowerCase, getChestManagerAddress, getGameL1ChainId
- Community 29: 19 nodes · cohesion 0.11 · activeInstant.getTime, afterEach, json, mockReturnValue, not.toBeNull, not.toContain, seasonResponse.json, slots.slice
- Community 30: 18 nodes · cohesion 0.12 · encodeURIComponent, Layer, map, map.addLayer, map.addSource, map.getLayer, map.getSource, map.isStyleLoaded
- Community 31: 18 nodes · cohesion 0.14 · badges.flatMap, createEmptyPassportState, CustomEvent, earnedBadgeSchema.safeParse, evaluatePassport, evidence.flatMap, gameplayEvidenceEventSchema.safeParse, JSON.parse
- Community 32: 17 nodes · cohesion 0.12 · describe, expect, it, mockImplementation, response.json, targets, Telemetry, toBe
- Community 33: 16 nodes · cohesion 0.12 · amountUsdc.toFixed, Badge, bezier, Card, cost, details, getChestLandmark, h3Cell.slice
- Community 34: 16 nodes · cohesion 0.12 · address.trim, app, baseUrl.replace, chain, defineChain, definition, format, trimmed.slice
- Community 35: 16 nodes · cohesion 0.12 · calculateBalanceTier, calculateEnergyMax, calculateOpenRadius, calculatePowerLevel, calculateStreakTier, Fallback, floor, Flow
- Community 36: 16 nodes · cohesion 0.12 · completedCheckpoints.flatMap, context.addIssue, datetime, gameplayIdSchema.optional, isoDateTimeSchema.optional, max, seen.add, seen.has
- Community 37: 15 nodes · cohesion 0.13 · checkpointIds.has, completedCheckpoints.every, completedCheckpoints.some, evidenceEventId.startsWith, Number.isFinite, trailProgressSchema.safeParse, getBrowserStorage(), isTrustedConfirmedCache()
- Community 38: 15 nodes · cohesion 0.13 · altChestId.toLowerCase, chestId, chestId.replace, chestId.toLowerCase, computeH3Cell, DEMO_CAMPUS_SLOTS.map, hours, Number
- Community 39: 15 nodes · cohesion 0.13 · includes, int, min, publicEnvSchema.extend, publicEnvSchema.parse, refine, regex, serverEnvSchema.parse
- Community 40: 14 nodes · cohesion 0.18 · console.warn, raw.startsWith, storage.getItem, storage.removeItem, storage.setItem, @/lib/json, clearPendingRequest(), getPendingRequest()
- Community 41: 13 nodes · cohesion 0.15 · Hydration, onRetryMock, reload, Structure, System, Timers, toBeGreaterThanOrEqual, toHaveBeenCalledTimes
- Community 42: 12 nodes · cohesion 0.17 · Array.isArray, checkReconcileRateLimit, Enforcement, items.push, mapRequestStatusToLifecycle, mapUIStateToLifecycle, reconcileTrailProgressWithEvidence, recordReconcileRequest
- Community 43: 12 nodes · cohesion 0.17 · Definitions, formatShortAddress, Formatters, getAlternativeChain, getChainById, getExplorerAddressUrl, getExplorerTxUrl, isSupportedChain
- Community 44: 12 nodes · cohesion 0.18 · existing.some, reduce, unique.has, unique.set, unique.values, appendTeamScoreEvent(), calculateTeamScore(), createTeamScoreEvent()
- Community 45: 11 nodes · cohesion 0.18 · Date, GET, getPilotFunnelMetrics, globalMemoryAnalyticsSink.getEvents, successResponse, toISOString, @/features/analytics/funnel, @/features/analytics/sink
- Community 46: 11 nodes · cohesion 0.18 · RELAY_STAGE_COPY.map, toUpperCase, getElapsedSeconds(), getRelayAnnouncement(), getRelayLearningCard(), getRelayMomentStages(), getRelayWaitState(), getTimelineStepStatus()
- Community 47: 11 nodes · cohesion 0.2 · getAlternativeChain, isSupportedChain, setIsOpen, setIsSwitching, SUPPORTED_CHAINS.map, switchChain, useSwitchActiveWalletChain, getBadgeStyle()
- Community 48: 11 nodes · cohesion 0.18 · address.toLowerCase, createEmptyPassportState, evaluatePassport, getGameplayTracker, loadPassportState, setState, trackPassportViewed, @/features/analytics
- Community 49: 10 nodes · cohesion 0.22 · calc, disconnect, setCopied, setMenuOpen, useActiveWallet, useDisconnect, AddressBadge(), handleCopy()
- Community 50: 10 nodes · cohesion 0.22 · collection.filter, collection.map, createPassportShareSnapshot, join, slice, split, ./PassportCollection.module.css, PassportCollection()
- Community 51: 10 nodes · cohesion 0.22 · checkpoints.find, checkpoints.map, confirmedIds.has, PENDING_ICM_STATES.has, @/components/cross-chain, applyConfirmedEvidence(), createTrailProgress(), deriveTrailProgressView()
- Community 52: 10 nodes · cohesion 0.2 · every, getRelayAnnouncement, getRelayLearningCard, getRelayMomentStages, not.toMatch, readFileSync, shouldCelebrateICM, URL
- Community 53: 10 nodes · cohesion 0.2 · APR, deposit, calculateBalanceTier(), calculateCompassLevel(), calculateEnergyMax(), calculateExplorationScore(), calculatePowerLevel(), calculateStreakTier()
- Community 54: 10 nodes · cohesion 0.2 · chestTypes.get, createPerkClaim, evaluatePerkEligibility, isBadgeEligible, isPerkClaimExpired, identityOf(), makeEvidence(), makeProgress()
- Community 55: 9 nodes · cohesion 0.22 · completedCheckpoints.filter, completedCheckpoints.map, newCompletions.at, newCompletions.map, previousIds.has, records.push, Set, createConfirmedTrailEvidence()
- Community 56: 9 nodes · cohesion 0.0 · @/components/cross-chain, @/components/position, @/components/quest, @/components/sponsor, @/components/wallet/ConnectWalletButton, @/components/wallet/GasBalance, @/components/wallet/NetworkSwitcher, @/features/gameplay/trails
- Community 57: 8 nodes · cohesion 0.25 · chain, getChainById, isNaN, num.toFixed, refetch, useWalletBalance, GasBalance()
- Community 58: 8 nodes · cohesion 0.25 · formula, h3.latLngToCell, Math.sqrt, resolution, h3-js, computeH3Cell(), haversineDistanceMeters()
- Community 59: 8 nodes · cohesion 0.25 · createTeamScoreEvent, limit, logEvidenceReconciliation, postReconcile, recoverTrailProgressFromStorage, rejectedRes.json, sanitizeCorrelationPayload
- Community 60: 8 nodes · cohesion 0.25 · checkpoint, dummyWallet.slice, dummyWallet.toUpperCase, e.includes, keys, some, trail
- Community 61: 7 nodes · cohesion 0.29 · Chest, computeCampaignIdHash, signSponsorProof, SponsorProof, verifySponsorQrPayload, window
- Community 62: 7 nodes · cohesion 0.33 · address, Balance, indicator, menu, options, WalletHeader()
- Community 63: 7 nodes · cohesion 0.29 · checkpoints.map, deriveTrailProgressView, gradient, @defi-trail/shared, StateMessage(), TodayTrailCard()
- Community 64: 7 nodes · cohesion 0.29 · addr.startsWith, envKey.startsWith, getChestManagerAddress(), getFujiCChainId(), getGameL1ChainId(), getProofSignerPrivateKey()
- Community 65: 7 nodes · cohesion 0.29 · createWallet, darkTheme, inAppWallet, phụ, Wallet, thirdweb/react
- Community 66: 7 nodes · cohesion 0.29 · badges.filter, createConfirmedTrailEvidence, getBadgeProgress, PASSPORT_BADGES.map, stampId.startsWith, stamps.filter
- Community 67: 6 nodes · cohesion 0.33 · gameplayErrorResponse, gameplayResponse, getGameplayConfigRepository, repository.getActiveSeason, @/lib/gameplay/repository
- Community 68: 6 nodes · cohesion 0.33 · cdpSolanaAccountToSvmSigner(), fromCdpSmartWallet(), registerExactEvmScheme(), registerExactSvmScheme(), toClientEvmSigner()
- Community 69: 5 nodes · cohesion 0.4 · localStorage, Messaging, RequestStatus, transactions
- Community 70: 5 nodes · cohesion 0.4 · component, rotate, translateY, VirtualCompass()
- Community 71: 5 nodes · cohesion 0.4 · console.debug, reloads, handleUnhandledRejection(), WalletProvider()
- Community 72: 5 nodes · cohesion 0.4 · headers.set, GameplayConfigError, gameplayErrorResponse(), GameplayConfigError.super()
- Community 73: 4 nodes · cohesion 0.5 · getDemoCampusConfig, hour, status
- Community 74: 4 nodes · cohesion 0.5 · RootLayout, @/components/wallet/WalletHeader, @/components/wallet/WalletProvider
- Community 75: 4 nodes · cohesion 0.5 · PassportPage, @/features/gameplay/passport/PassportClient, next
- Community 76: 4 nodes · cohesion 0.5 · calculatePilotFunnel, sink.getEvents, getPilotFunnelMetrics()
- Community 77: 4 nodes · cohesion 0.67 · walletAddress.slice, createPassportShareSnapshot(), maskWalletForShare()
- Community 78: 4 nodes · cohesion 0.5 · createPassportShareSnapshot, not.toHaveProperty, toMatchInlineSnapshot
- Community 79: 4 nodes · cohesion 0.5 · tseslint.config, @eslint/js, typescript-eslint
- Community 80: 4 nodes · cohesion 0.5 · buildEip712Domain(), createLocationProofTypedData(), createSponsorProofTypedData()
- Community 81: 4 nodes · cohesion 0.5 · buildEip712Domain, createLocationProofTypedData, createSponsorProofTypedData
- Community 82: 4 nodes · cohesion 0.5 · repeat, seasonDefinitionSchema.safeParse, trailDefinitionSchema.safeParse
- Community 83: 4 nodes · cohesion 0.5 · appendTeamScoreEvent, calculateTeamScore, createTeamScoreEventIdentity
- Community 84: 4 nodes · cohesion 0.5 · calculateCompassLevel, calculateExplorationScore, getRarityAndApr
- Community 85: 3 nodes · cohesion 0.67 · @/lib/thirdweb, ConnectWalletButton()
- Community 86: 3 nodes · cohesion 0.67 · @/lib/chains, @/lib/thirdweb
- Community 87: 3 nodes · cohesion 0.67 · parseSafeJSON, @/app/api/map-config/route
- Community 88: 3 nodes · cohesion 0.67 · url.endsWith, getRelayerConfiguration()
- Community 89: 3 nodes · cohesion 0.0 · @/lib/chains, next/link, react
- Community 90: 3 nodes · cohesion 0.67 · handleRecenter(), handleResize(), InteractiveMap()
- Community 91: 2 nodes · cohesion 1.0 · next
- Community 92: 2 nodes · cohesion 1.0 · repository.getTodayTrail
- Community 93: 2 nodes · cohesion 1.0 · DemoLocationBanner()
- Community 94: 2 nodes · cohesion 1.0 · TestnetBanner()
- Community 95: 2 nodes · cohesion 1.0 · emit
- Community 96: 2 nodes · cohesion 1.0 · errorResponse()
- Community 97: 2 nodes · cohesion 1.0 · val.trim
- Community 98: 2 nodes · cohesion 0.0 · copyToClipboard(), renderLatencyBadge()
- Community 99: 1 nodes · cohesion 1.0 · no non-file members
- Community 100: 1 nodes · cohesion 1.0 · no non-file members
- Community 101: 1 nodes · cohesion 1.0 · no non-file members
- Community 102: 1 nodes · cohesion 1.0 · no non-file members
- Community 103: 1 nodes · cohesion 1.0 · no non-file members
- Community 104: 1 nodes · cohesion 1.0 · no non-file members
- Community 105: 1 nodes · cohesion 1.0 · no non-file members
- Community 106: 1 nodes · cohesion 1.0 · no non-file members
- Community 107: 1 nodes · cohesion 1.0 · no non-file members
- Community 108: 1 nodes · cohesion 1.0 · no non-file members
- Community 109: 1 nodes · cohesion 1.0 · no non-file members
- Community 110: 1 nodes · cohesion 1.0 · no non-file members
- Community 111: 1 nodes · cohesion 1.0 · no non-file members
- Community 112: 1 nodes · cohesion 1.0 · no non-file members
- Community 113: 1 nodes · cohesion 1.0 · no non-file members
- Community 114: 1 nodes · cohesion 1.0 · no non-file members
- Community 115: 1 nodes · cohesion 1.0 · no non-file members
- Community 116: 1 nodes · cohesion 1.0 · no non-file members
- Community 117: 1 nodes · cohesion 1.0 · no non-file members
- Community 118: 1 nodes · cohesion 1.0 · no non-file members
- Community 119: 1 nodes · cohesion 1.0 · no non-file members
- Community 120: 1 nodes · cohesion 1.0 · no non-file members
- Community 121: 1 nodes · cohesion 1.0 · no non-file members
- Community 122: 1 nodes · cohesion 1.0 · no non-file members
- Community 123: 1 nodes · cohesion 1.0 · no non-file members
- Community 124: 1 nodes · cohesion 1.0 · no non-file members
- Community 125: 1 nodes · cohesion 1.0 · @/lib/json

## Ambiguous Edges
- `apps/web/src/app/admin/health/page.tsx` -> `Active` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `AdminHealthPage` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `async` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `AVAX` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `AVAX` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `Bar` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `Budget` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `Budget` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `clearInterval` · relation `calls` · apps/web/src/app/admin/health/page.tsx
- `apps/web/src/app/admin/health/page.tsx` -> `Date` · relation `calls` · apps/web/src/app/admin/health/page.tsx

## Knowledge Gaps
- Isolated grounded nodes: 890
- Thin communities: 76, 85, 86, 87, 88, 90, 91, 92, 93, 95, 97, 98, 125
- Sample isolated nodes: `next`, `AdminHealthPage`, `AVAX`, `Bar`, `clearInterval`

## Suggested Questions
- **Why is `InteractiveMap()` central to the repository?**
  It has the highest grounded degree in community 90.
- **How does `loadEnvFile()` connect to `trim` across boundaries?**
  ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- **What responsibilities are grouped inside Community 0?**
  Representative nodes: argparse.ArgumentParser, bytes, ccs.sort.
- **What responsibilities are grouped inside Community 1?**
  Representative nodes: addTo, applyMapModeVisibility, Array.isArray.
- **What responsibilities are grouped inside Community 2?**
  Representative nodes: clearSimulationTimers, clearTimeout, console.log.
