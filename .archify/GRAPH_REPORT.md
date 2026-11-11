# Graph Report - C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project (2026-11-11)

## Corpus Check
- 718 files scanned
- 147 code files contributed grounded graph fragments
- Verdict: graph analysis is available without LLM synthesis.

## Summary
- 2631 nodes · 8239 edges · 154 communities
- Warnings: 0 · Ambiguous edges: 6909 (84%)
- Top hubs: 10 · Surprises: 5 · Suggested questions: 5

## God Nodes
1. `InteractiveMap()` - degree 90 · community 114 · apps/web/src/components/map/InteractiveMap.tsx
2. `OrganizerWorkspace()` - degree 50 · community 5 · apps/web/src/components/organizer/OrganizerWorkspace.tsx
3. `TeamLeaderboardSection()` - degree 50 · community 10 · apps/web/src/features/gameplay/teams/TeamLeaderboardSection.tsx
4. `TodayTrailSection()` - degree 47 · community 20 · apps/web/src/features/gameplay/trails/TodayTrailSection.tsx
5. `EngagementStore` - degree 44 · community 9 · apps/web/src/lib/engagement-store.ts
6. `OrganizerContentService` - degree 37 · community 1 · apps/web/src/lib/organizer-content-service.ts
7. `PositionView()` - degree 35 · community 17 · apps/web/src/components/position/PositionView.tsx
8. `SponsorPerkService` - degree 32 · community 3 · apps/web/src/lib/sponsor-perk-service.ts
9. `CheatcodesPrinter` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py
10. `main()` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py

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

## Communities (154 total)
- Community 0: 155 nodes · cohesion 0.02 · argparse.ArgumentParser, bytes, ccs.sort, cheats.insert, copy.deepcopy, decode, enumerate, f
- Community 1: 77 nodes · cohesion 0.05 · appendAudit, auditEvents.push, badgeIds.has, badges.map, campaignIds.has, campaigns.forEach, checkpointSlots.flatMap, checkpointSlots.some
- Community 2: 77 nodes · cohesion 0.0 · addTo, applyMapModeVisibility, Array.isArray, Banner, basemap, Button, calculateOpenRadius, Chests
- Community 3: 51 nodes · cohesion 0.06 · action, campaigns.get, campaigns.set, claimAuthorizationHashes.get, claimAuthorizationHashes.set, claimIdsByTokenHash.get, claimIdsByTokenHash.has, claimIdsByTokenHash.set
- Community 4: 50 nodes · cohesion 0.0 · clearSimulationTimers, clearTimeout, console.log, current.forEach, current.push, current.setConfirmed, current.setOnChainStatus, current.setPending
- Community 5: 49 nodes · cohesion 0.05 · accessToken.trim, audit.filter, badgeIds.filter, badgeIds.includes, badges.map, campaigns.map, checkpoints.map, checkpointSlots.filter
- Community 6: 46 nodes · cohesion 0.0 · Active, AdminHealthPage, async, AVAX, Bar, Budget, clearInterval, clipboard.writeText
- Community 7: 42 nodes · cohesion 0.05 · async, cb, clearInterval, clearPendingRequest, getElapsedSeconds, getPendingRequest, getRelayWaitState, getStepStatus
- Community 8: 41 nodes · cohesion 0.05 · address.startsWith, budget, Budgets, content.split, createPublicClient, createWalletClient, endsWith, ensureGasOnChain
- Community 9: 39 nodes · cohesion 0.05 · applyEvidenceEventToLeaderboard, Boolean, competitiveLeaderboards.get, competitiveLeaderboards.set, demoLeaderboards.get, demoLeaderboards.set, EngagementStore.getInstance, filteredPlayers.filter
- Community 10: 38 nodes · cohesion 0.06 · BẠN, Bằng, chứng, console.error, currentPoints.toLocaleString, fetchTeamData, gradient, i
- Community 11: 38 nodes · cohesion 0.05 · Engine, firstCheckpointConfirmed.add, firstCheckpointConfirmedUsers.add, firstCheckpointConfirmedUsers.has, FORBIDDEN_ANALYTICS_KEY_REGEX.test, GPS, input.charCodeAt, issues.map
- Community 12: 37 nodes · cohesion 0.05 · chainKey.toLowerCase, faucetClaims.clear, faucetClaims.has, faucetClaims.set, ipFaucetCounts.clear, ipFaucetCounts.get, ipFaucetCounts.set, ipTimes.push
- Community 13: 36 nodes · cohesion 0.06 · AbortController, balance, BigInt, clearTimeout, controller.abort, Date.now, epoch, fetch
- Community 14: 36 nodes · cohesion 0.06 · badges.find, badges.push, badges.sort, collection.find, collection.push, createEarnedBadge, Date.parse, eventId.localeCompare
- Community 15: 36 nodes · cohesion 0.06 · at.getTime, at.toISOString, campaigns.map, campaignsById.get, checkpointSlots.map, GameplayConfigError, getActiveCampaigns, getActiveSeason
- Community 16: 35 nodes · cohesion 0.06 · blur, closeModal, e.stopPropagation, getRelayAnnouncement, getRelayLearningCard, getRelayMomentStages, hash.slice, Math.floor
- Community 17: 35 nodes · cohesion 0.06 · accruedReward.toFixed, BigInt, Box, calculateBalanceTier, calculateEnergyMax, calculatePowerLevel, calculateStreakTier, Calculations
- Community 18: 35 nodes · cohesion 0.06 · address.slice, applyCheckpointEvidence, Array.from, checkpoints.some, completedCheckpointIds.add, completedCheckpointIds.has, completedKeys.add, completedKeys.has
- Community 19: 35 nodes · cohesion 0.06 · assert.equal, assert.ok, async, content.includes, decimals, errors.map, fileURLToPath, filter
- Community 20: 34 nodes · cohesion 0.06 · AbortController, checkpoints.findIndex, completedCheckpoints.slice, controller.abort, createConfirmedTrailEvidence, createTrailProgress, Date.parse, getPendingRequest
- Community 21: 31 nodes · cohesion 0.06 · accuracy, beforeEach, code, Conformance, createSignedSponsorQrPayload, getMapConfig, NextRequest, not.toContain
- Community 22: 31 nodes · cohesion 0.06 · Calculation, completion, detectForbiddenFields, Execution, GameplayTracker, getAdminAnalytics, getGameplayTracker, globalMemoryAnalyticsSink.clear
- Community 23: 29 nodes · cohesion 0.07 · expect.arrayContaining, expect.objectContaining, firstClaimResponse.json, inactive.claim, inventoryService.claim, issueClaim, postClaim, postRedemption
- Community 24: 28 nodes · cohesion 0.07 · applyMapModeVisibility, calculateBearing, createGeodesicCircle, findNearestChest, Generation, getCartoLabelsTileUrl, getChestLandmark, getChestReward
- Community 25: 27 nodes · cohesion 0.09 · completedTrailKeys.add, completedTrailKeys.clear, completedTrailKeys.has, Error, join, Math.random, pseudonymizeWallet, sink.emit
- Community 26: 25 nodes · cohesion 0.08 · Array.isArray, checkpoints.find, checkReconcileRateLimit, completedCheckpoints.find, Enforcement, evidenceItems.filter, findSlotByChestId, getSponsorPerkCampaign
- Community 27: 25 nodes · cohesion 0.08 · applyConfirmedEvidence, describe, expect, it, length, readFileSync, toBe, toBeDefined
- Community 28: 24 nodes · cohesion 0.08 · API, compRes.json, demoRes.json, EngagementStore.resetInstance, firstRes.json, getLeaderboardRoute, getTeamsRoute, guardians
- Community 29: 22 nodes · cohesion 0.1 · checkpoints.findIndex, demoModePolicy, eligibleEventTypes.includes, evidence.slice, existingClaims.some, identityOf, policy, RangeError
- Community 30: 21 nodes · cohesion 0.1 · bearing, Center, coordinates.push, direction, Math.asin, Math.atan2, Math.cos, Math.round
- Community 31: 21 nodes · cohesion 0.1 · current.clear, current.stop, Date.now, html5Qr.start, Html5Qrcode, initCamera, manualCode.trim, onProofReceived
- Community 32: 21 nodes · cohesion 0.11 · console.log, constructor, errors.push, events.filter, events.push, sink, Sinks, CompositeAnalyticsSink
- Community 33: 20 nodes · cohesion 0.11 · BUỘC, chuẩn, nào, onApproveAndDeposit, onClaimBudget, onClose, onComplete, phỏng
- Community 34: 20 nodes · cohesion 0.1 · describe, expect, it, mockImplementation, not.toMatch, readiness, response.json, targets
- Community 35: 19 nodes · cohesion 0.11 · check, checkFaucetRateLimit, encodePacked, errorResponse, getCurrentEpoch, headers.get, keccak256, Math.floor
- Community 36: 19 nodes · cohesion 0.12 · milestones.filter, milestones.find, nextKeySet.add, Object.keys, player.localeCompare, playerTeamMap.get, processedEventKeySet.has, reduce
- Community 37: 18 nodes · cohesion 0.11 · accuracyMeters.toFixed, clock, constraints, coordinates, DEMO, generateNonce, GUARANTEE, haversineDistanceMeters
- Community 38: 18 nodes · cohesion 0.12 · encodeURIComponent, Layer, map, map.addLayer, map.addSource, map.getLayer, map.getSource, map.isStyleLoaded
- Community 39: 18 nodes · cohesion 0.14 · badges.flatMap, createEmptyPassportState, CustomEvent, earnedBadgeSchema.safeParse, evaluatePassport, evidence.flatMap, gameplayEvidenceEventSchema.safeParse, JSON.parse
- Community 40: 17 nodes · cohesion 0.12 · activeInstant.getTime, afterEach, json, mockReturnValue, not.toBeNull, seasonResponse.json, slots.slice, toBeNull
- Community 41: 17 nodes · cohesion 0.12 · allowed.json, audit.at, audit.filter, forbidden.json, getOrganizerWorkspace, history.find, history.map, mutateOrganizerWorkspace
- Community 42: 16 nodes · cohesion 0.12 · amountUsdc.toFixed, Badge, bezier, Card, cost, details, getChestLandmark, h3Cell.slice
- Community 43: 16 nodes · cohesion 0.12 · address.trim, app, baseUrl.replace, chain, defineChain, definition, format, trimmed.slice
- Community 44: 16 nodes · cohesion 0.15 · account.signTypedData, createThirdwebClient, crypto.createHmac, crypto.randomBytes, expectedChestId.toLowerCase, getChestManagerAddress, getGameL1ChainId, getProofSignerPrivateKey
- Community 45: 16 nodes · cohesion 0.12 · calculateBalanceTier, calculateEnergyMax, calculateOpenRadius, calculatePowerLevel, calculateStreakTier, Fallback, floor, Flow
- Community 46: 16 nodes · cohesion 0.12 · completedCheckpoints.flatMap, context.addIssue, datetime, gameplayIdSchema.optional, isoDateTimeSchema.optional, max, seen.add, seen.has
- Community 47: 15 nodes · cohesion 0.13 · checkpointIds.has, completedCheckpoints.every, completedCheckpoints.some, evidenceEventId.startsWith, Number.isFinite, trailProgressSchema.safeParse, getBrowserStorage(), isTrustedConfirmedCache()
- Community 48: 15 nodes · cohesion 0.13 · altChestId.toLowerCase, chestId, chestId.replace, chestId.toLowerCase, computeH3Cell, DEMO_CAMPUS_SLOTS.map, hours, Number
- Community 49: 14 nodes · cohesion 0.18 · console.warn, raw.startsWith, storage.getItem, storage.removeItem, storage.setItem, @/lib/json, clearPendingRequest(), getPendingRequest()
- Community 50: 13 nodes · cohesion 0.15 · Hydration, onRetryMock, reload, Structure, System, Timers, toBeGreaterThanOrEqual, toHaveBeenCalledTimes
- Community 51: 13 nodes · cohesion 0.15 · int, min, publicEnvSchema.extend, publicEnvSchema.parse, refine, regex, serverEnvSchema.parse, z.object
- Community 52: 12 nodes · cohesion 0.17 · auditTrail.map, eventType.replaceAll, setClaimToken, setOperatorToken, setRedemption, setTransactionId, submitRedemption, toLocaleTimeString
- Community 53: 12 nodes · cohesion 0.17 · Definitions, formatShortAddress, Formatters, getAlternativeChain, getChainById, getExplorerAddressUrl, getExplorerTxUrl, isSupportedChain
- Community 54: 11 nodes · cohesion 0.18 · Date, GET, getPilotFunnelMetrics, globalMemoryAnalyticsSink.getEvents, successResponse, toISOString, @/features/analytics/funnel, @/features/analytics/sink
- Community 55: 11 nodes · cohesion 0.18 · authenticateOrganizer, getWorkspace, service.archive, service.publish, service.restoreVersion, service.saveDraft, String, @/lib/organizer-auth
- Community 56: 11 nodes · cohesion 0.18 · RELAY_STAGE_COPY.map, toUpperCase, getElapsedSeconds(), getRelayAnnouncement(), getRelayLearningCard(), getRelayMomentStages(), getRelayWaitState(), getTimelineStepStatus()
- Community 57: 11 nodes · cohesion 0.2 · getAlternativeChain, isSupportedChain, setIsOpen, setIsSwitching, SUPPORTED_CHAINS.map, switchChain, useSwitchActiveWalletChain, getBadgeStyle()
- Community 58: 11 nodes · cohesion 0.18 · address.toLowerCase, createEmptyPassportState, evaluatePassport, getGameplayTracker, loadPassportState, setState, trackPassportViewed, @/features/analytics
- Community 59: 11 nodes · cohesion 0.2 · existing.some, unique.has, unique.set, unique.values, appendTeamScoreEvent(), calculateTeamScore(), createTeamScoreEvent(), createTeamScoreEventIdentity()
- Community 60: 11 nodes · cohesion 0.22 · c.toUpperCase, code.trim, hoạt, inviteCode.trim, inviteCodes.some, này, readonly, SEASON_1_TEAMS.map
- Community 61: 11 nodes · cohesion 0.18 · attempts, createInitialLeaderboardState, idempotently, once, playerA.toLowerCase, playerB.toLowerCase, resolveTeamFromInviteCode, substring
- Community 62: 10 nodes · cohesion 0.2 · APR, deposit, calculateBalanceTier(), calculateCompassLevel(), calculateEnergyMax(), calculateExplorationScore(), calculatePowerLevel(), calculateStreakTier()
- Community 63: 10 nodes · cohesion 0.2 · chestTypes.get, createPerkClaim, evaluatePerkEligibility, isBadgeEligible, isPerkClaimExpired, identityOf(), makeEvidence(), makeProgress()
- Community 64: 9 nodes · cohesion 0.22 · Boolean, copyToken, requestClaim, setClaim, setCopied, setIsClaiming, toUpperCase, SponsorPerkClaimView()
- Community 65: 9 nodes · cohesion 0.25 · collection.filter, collection.map, createPassportShareSnapshot, join, split, ./PassportCollection.module.css, PassportCollection(), statusLabel()
- Community 66: 9 nodes · cohesion 0.22 · completedCheckpoints.filter, completedCheckpoints.map, newCompletions.at, newCompletions.map, previousIds.has, records.push, Set, createConfirmedTrailEvidence()
- Community 67: 9 nodes · cohesion 0.25 · checkpoints.map, confirmedIds.has, PENDING_ICM_STATES.has, @/components/cross-chain, applyConfirmedEvidence(), createTrailProgress(), deriveTrailProgressView(), findEvidenceCheckpointId()
- Community 68: 9 nodes · cohesion 0.0 · @/components/cross-chain, @/components/position, @/components/quest, @/components/wallet/ConnectWalletButton, @/components/wallet/GasBalance, @/components/wallet/NetworkSwitcher, @/features/gameplay/teams, @/features/gameplay/trails
- Community 69: 8 nodes · cohesion 0.25 · Chest, computeCampaignIdHash, issueClaimAuthorization, signSponsorProof, SponsorProof, verifySponsorQrPayload, window
- Community 70: 8 nodes · cohesion 0.29 · disconnect, setMenuOpen, useActiveWallet, useDisconnect, AddressBadge(), handleCopy(), handleDisconnect()
- Community 71: 8 nodes · cohesion 0.25 · chain, getChainById, isNaN, num.toFixed, refetch, useWalletBalance, GasBalance()
- Community 72: 8 nodes · cohesion 0.25 · formula, h3.latLngToCell, Math.sqrt, resolution, h3-js, computeH3Cell(), haversineDistanceMeters()
- Community 73: 8 nodes · cohesion 0.25 · authorizationHeader.slice, Buffer.from, crypto.timingSafeEqual, startsWith, node:crypto, authenticateOrganizer(), safeEqual()
- Community 74: 8 nodes · cohesion 0.25 · createTeamScoreEvent, limit, logEvidenceReconciliation, postReconcile, recoverTrailProgressFromStorage, rejectedRes.json, sanitizeCorrelationPayload
- Community 75: 8 nodes · cohesion 0.25 · every, getRelayAnnouncement, getRelayLearningCard, getRelayMomentStages, readFileSync, shouldCelebrateICM, node:fs
- Community 76: 8 nodes · cohesion 0.25 · checkpoint, dummyWallet.slice, dummyWallet.toUpperCase, e.includes, keys, some, trail
- Community 77: 7 nodes · cohesion 0.29 · DeFi, searchParams.get, store.getLeaderboard, store.recordEvidenceAndApplyScore, URL, @defi-trail/shared
- Community 78: 7 nodes · cohesion 0.33 · address, Balance, indicator, menu, options, WalletHeader()
- Community 79: 7 nodes · cohesion 0.29 · addr.startsWith, envKey.startsWith, getChestManagerAddress(), getFujiCChainId(), getGameL1ChainId(), getProofSignerPrivateKey()
- Community 80: 7 nodes · cohesion 0.29 · createWallet, darkTheme, inAppWallet, phụ, Wallet, thirdweb/react
- Community 81: 6 nodes · cohesion 0.33 · gameplayErrorResponse, gameplayResponse, getGameplayConfigRepository, repository.getActiveCampaigns, @/lib/gameplay/repository
- Community 82: 6 nodes · cohesion 0.33 · console.error, getEngagementStore, hạng, store.rebuildLeaderboard, @/lib/engagement-store
- Community 83: 6 nodes · cohesion 0.33 · player.startsWith, store.getMembership, store.getSeason, store.getTeams, store.joinOrSwitchTeam
- Community 84: 6 nodes · cohesion 0.33 · authenticateSponsorOperator, checkSponsorRedemptionRateLimit, recordSponsorRedemptionAttempt, redeem, @/lib/sponsor-operator-auth
- Community 85: 6 nodes · cohesion 0.33 · cdpSolanaAccountToSvmSigner(), fromCdpSmartWallet(), registerExactEvmScheme(), registerExactSvmScheme(), toClientEvmSigner()
- Community 86: 6 nodes · cohesion 0.33 · badges.filter, createConfirmedTrailEvidence, getBadgeProgress, stampId.startsWith, stamps.filter
- Community 87: 6 nodes · cohesion 0.33 · ./analytics, ./rules, ./schemas, ./scoring, ./types
- Community 88: 5 nodes · cohesion 0.4 · checkSponsorClaimRateLimit, claim, recordSponsorClaimAttempt, clientIp()
- Community 89: 5 nodes · cohesion 0.4 · calc, min, SponsorOperatorPage, @/components/sponsor
- Community 90: 5 nodes · cohesion 0.4 · localStorage, Messaging, RequestStatus, transactions
- Community 91: 5 nodes · cohesion 0.4 · component, rotate, translateY, VirtualCompass()
- Community 92: 5 nodes · cohesion 0.4 · console.debug, reloads, handleUnhandledRejection(), WalletProvider()
- Community 93: 5 nodes · cohesion 0.4 · deriveTrailProgressView, @defi-trail/shared, StateMessage(), TodayTrailCard()
- Community 94: 5 nodes · cohesion 0.4 · headers.set, GameplayConfigError, gameplayErrorResponse(), GameplayConfigError.super()
- Community 95: 4 nodes · cohesion 0.5 · getDemoCampusConfig, hour, status
- Community 96: 4 nodes · cohesion 0.5 · RootLayout, @/components/wallet/WalletHeader, @/components/wallet/WalletProvider
- Community 97: 4 nodes · cohesion 0.5 · OrganizerPage, @/components/organizer, next
- Community 98: 4 nodes · cohesion 0.5 · calculatePilotFunnel, sink.getEvents, getPilotFunnelMetrics()
- Community 99: 4 nodes · cohesion 0.67 · walletAddress.slice, createPassportShareSnapshot(), maskWalletForShare()
- Community 100: 4 nodes · cohesion 0.5 · createPassportShareSnapshot, not.toHaveProperty, toMatchInlineSnapshot
- Community 101: 4 nodes · cohesion 0.5 · tseslint.config, @eslint/js, typescript-eslint
- Community 102: 4 nodes · cohesion 0.5 · buildEip712Domain(), createLocationProofTypedData(), createSponsorProofTypedData()
- Community 103: 4 nodes · cohesion 0.5 · buildEip712Domain, createLocationProofTypedData, createSponsorProofTypedData
- Community 104: 4 nodes · cohesion 0.5 · appendTeamScoreEvent, calculateTeamScore, createTeamScoreEventIdentity
- Community 105: 4 nodes · cohesion 0.5 · calculateCompassLevel, calculateExplorationScore, getRarityAndApr
- Community 106: 3 nodes · cohesion 0.67 · PassportPage, @/features/gameplay/passport/PassportClient
- Community 107: 3 nodes · cohesion 0.67 · @/lib/thirdweb, ConnectWalletButton()
- Community 108: 3 nodes · cohesion 0.67 · @/lib/chains, @/lib/thirdweb
- Community 109: 3 nodes · cohesion 0.67 · @/lib/gameplay/config
- Community 110: 3 nodes · cohesion 0.67 · SPONSOR_PERK_CAMPAIGNS.find, getSponsorPerkCampaign()
- Community 111: 3 nodes · cohesion 0.67 · parseSafeJSON, @/app/api/map-config/route
- Community 112: 3 nodes · cohesion 0.67 · url.endsWith, getRelayerConfiguration()
- Community 113: 3 nodes · cohesion 0.0 · @/lib/chains, next/link, react
- Community 114: 3 nodes · cohesion 0.67 · handleRecenter(), handleResize(), InteractiveMap()
- Community 115: 2 nodes · cohesion 1.0 · next
- Community 116: 2 nodes · cohesion 1.0 · repository.getActiveSeason
- Community 117: 2 nodes · cohesion 1.0 · repository.getTodayTrail
- Community 118: 2 nodes · cohesion 1.0 · DemoLocationBanner()
- Community 119: 2 nodes · cohesion 1.0 · TestnetBanner()
- Community 120: 2 nodes · cohesion 1.0 · emit
- Community 121: 2 nodes · cohesion 1.0 · errorResponse()
- Community 122: 2 nodes · cohesion 1.0 · val.trim
- Community 123: 2 nodes · cohesion 1.0 · authenticateSponsorOperator()
- Community 124: 2 nodes · cohesion 1.0 · repeat
- Community 125: 2 nodes · cohesion 0.0 · copyToClipboard(), renderLatencyBadge()
- Community 126: 1 nodes · cohesion 1.0 · no non-file members
- Community 127: 1 nodes · cohesion 1.0 · no non-file members
- Community 128: 1 nodes · cohesion 1.0 · no non-file members
- Community 129: 1 nodes · cohesion 1.0 · no non-file members
- Community 130: 1 nodes · cohesion 1.0 · no non-file members
- Community 131: 1 nodes · cohesion 1.0 · no non-file members
- Community 132: 1 nodes · cohesion 1.0 · no non-file members
- Community 133: 1 nodes · cohesion 1.0 · no non-file members
- Community 134: 1 nodes · cohesion 1.0 · no non-file members
- Community 135: 1 nodes · cohesion 1.0 · no non-file members
- Community 136: 1 nodes · cohesion 1.0 · no non-file members
- Community 137: 1 nodes · cohesion 1.0 · no non-file members
- Community 138: 1 nodes · cohesion 1.0 · no non-file members
- Community 139: 1 nodes · cohesion 1.0 · no non-file members
- Community 140: 1 nodes · cohesion 1.0 · no non-file members
- Community 141: 1 nodes · cohesion 1.0 · no non-file members
- Community 142: 1 nodes · cohesion 1.0 · no non-file members
- Community 143: 1 nodes · cohesion 1.0 · no non-file members
- Community 144: 1 nodes · cohesion 1.0 · no non-file members
- Community 145: 1 nodes · cohesion 1.0 · no non-file members
- Community 146: 1 nodes · cohesion 1.0 · no non-file members
- Community 147: 1 nodes · cohesion 1.0 · no non-file members
- Community 148: 1 nodes · cohesion 1.0 · no non-file members
- Community 149: 1 nodes · cohesion 1.0 · no non-file members
- Community 150: 1 nodes · cohesion 1.0 · no non-file members
- Community 151: 1 nodes · cohesion 1.0 · no non-file members
- Community 152: 1 nodes · cohesion 1.0 · no non-file members
- Community 153: 1 nodes · cohesion 1.0 · @/lib/json

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
- Isolated grounded nodes: 1146
- Thin communities: 98, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 120, 122, 124, 125, 153
- Sample isolated nodes: `next`, `AdminHealthPage`, `AVAX`, `Bar`, `clearInterval`

## Suggested Questions
- **Why is `InteractiveMap()` central to the repository?**
  It has the highest grounded degree in community 114.
- **How does `loadEnvFile()` connect to `trim` across boundaries?**
  ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- **What responsibilities are grouped inside Community 0?**
  Representative nodes: argparse.ArgumentParser, bytes, ccs.sort.
- **What responsibilities are grouped inside Community 1?**
  Representative nodes: appendAudit, auditEvents.push, badgeIds.has.
- **What responsibilities are grouped inside Community 2?**
  Representative nodes: addTo, applyMapModeVisibility, Array.isArray.
