# Graph Report - C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project (2026-11-06)

## Corpus Check
- 550 files scanned
- 73 code files contributed grounded graph fragments
- Verdict: graph analysis is available without LLM synthesis.

## Summary
- 1597 nodes · 4072 edges · 81 communities
- Warnings: 0 · Ambiguous edges: 3476 (85%)
- Top hubs: 10 · Surprises: 5 · Suggested questions: 5

## God Nodes
1. `InteractiveMap()` - degree 87 · community 49 · apps/web/src/components/map/InteractiveMap.tsx
2. `PositionView()` - degree 35 · community 7 · apps/web/src/components/position/PositionView.tsx
3. `CheatcodesPrinter` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py
4. `main()` - degree 30 · community 0 · packages/contracts-cchain/lib/forge-std/scripts/vm.py
5. `SponsorScannerModal()` - degree 23 · community 12 · apps/web/src/components/sponsor/SponsorScannerModal.tsx
6. `QuestTutorialModal()` - degree 22 · community 15 · apps/web/src/components/quest/QuestTutorialModal.tsx
7. `ICMProgressModalView()` - degree 21 · community 9 · apps/web/src/components/cross-chain/ICMProgressModal.tsx
8. `rgba` - degree 19 · community 3 · apps/web/src/app/admin/health/page.tsx
9. `react` - degree 18 · community 55 · apps/web/src/app/admin/health/page.tsx
10. `handleVerifyPayload()` - degree 16 · community 12 · apps/web/src/components/sponsor/SponsorScannerModal.tsx

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

## Communities (81 total)
- Community 0: 155 nodes · cohesion 0.02 · argparse.ArgumentParser, bytes, ccs.sort, cheats.insert, copy.deepcopy, decode, enumerate, f
- Community 1: 75 nodes · cohesion 0.0 · addTo, applyMapModeVisibility, Array.isArray, Banner, basemap, Button, calculateOpenRadius, Chests
- Community 2: 45 nodes · cohesion 0.04 · address.startsWith, budget, Budgets, console.error, console.log, content.split, createPublicClient, createWalletClient
- Community 3: 45 nodes · cohesion 0.0 · Active, AdminHealthPage, async, AVAX, Bar, Budget, clearInterval, clipboard.writeText
- Community 4: 41 nodes · cohesion 0.0 · clearSimulationTimers, clearTimeout, console.log, current.forEach, current.push, current.setConfirmed, current.setOnChainStatus, current.setPending
- Community 5: 39 nodes · cohesion 0.05 · async, cb, clearInterval, clearPendingRequest, getPendingRequest, getStepStatus, mapOnChainStatusToUIState, mount
- Community 6: 36 nodes · cohesion 0.06 · AbortController, balance, BigInt, clearTimeout, controller.abort, Date, Date.now, epoch
- Community 7: 36 nodes · cohesion 0.06 · accruedReward.toFixed, BigInt, Box, calculateBalanceTier, calculateEnergyMax, calculatePowerLevel, calculateStreakTier, Calculations
- Community 8: 35 nodes · cohesion 0.06 · assert.equal, assert.ok, async, content.includes, decimals, errors.map, fileURLToPath, filter
- Community 9: 29 nodes · cohesion 0.07 · blur, Chain, closeModal, e.stopPropagation, hash.slice, Math.floor, mins.toString, onSuccessDismiss
- Community 10: 29 nodes · cohesion 0.07 · applyMapModeVisibility, calculateBearing, Calculation, createGeodesicCircle, findNearestChest, Generation, getCartoLabelsTileUrl, getChestLandmark
- Community 11: 24 nodes · cohesion 0.08 · accuracy, beforeEach, code, Conformance, createSignedSponsorQrPayload, getMapConfig, NextRequest, postFaucetGas
- Community 12: 22 nodes · cohesion 0.1 · current.clear, current.stop, Date.now, html5Qr.start, Html5Qrcode, initCamera, JSON.stringify, manualCode.trim
- Community 13: 21 nodes · cohesion 0.1 · bearing, Center, coordinates.push, direction, Math.asin, Math.atan2, Math.cos, Math.round
- Community 14: 20 nodes · cohesion 0.1 · check, checkFaucetRateLimit, encodePacked, errorResponse, getCurrentEpoch, headers.get, keccak256, Math.floor
- Community 15: 20 nodes · cohesion 0.11 · BUỘC, chuẩn, nào, onApproveAndDeposit, onClaimBudget, onClose, onComplete, phỏng
- Community 16: 20 nodes · cohesion 0.13 · account.signTypedData, createThirdwebClient, crypto.createHmac, crypto.randomBytes, digest, expectedChestId.toLowerCase, getChestManagerAddress, getGameL1ChainId
- Community 17: 19 nodes · cohesion 0.11 · accuracyMeters.toFixed, clock, constraints, coordinates, DEMO, findSlotByChestId, generateNonce, GUARANTEE
- Community 18: 18 nodes · cohesion 0.12 · encodeURIComponent, Layer, map, map.addLayer, map.addSource, map.getLayer, map.getSource, map.isStyleLoaded
- Community 19: 18 nodes · cohesion 0.11 · afterEach, Hydration, not.toBeNull, not.toThrow, onRetryMock, reload, Structure, System
- Community 20: 17 nodes · cohesion 0.12 · describe, expect, it, mockImplementation, response.json, targets, Telemetry, toBe
- Community 21: 16 nodes · cohesion 0.12 · amountUsdc.toFixed, Badge, bezier, Card, cost, details, getChestLandmark, h3Cell.slice
- Community 22: 16 nodes · cohesion 0.12 · address.trim, app, baseUrl.replace, chain, defineChain, definition, format, trimmed.slice
- Community 23: 16 nodes · cohesion 0.12 · calculateBalanceTier, calculateEnergyMax, calculateOpenRadius, calculatePowerLevel, calculateStreakTier, Fallback, floor, Flow
- Community 24: 16 nodes · cohesion 0.12 · includes, int, min, publicEnvSchema.extend, publicEnvSchema.parse, refine, regex, serverEnvSchema.parse
- Community 25: 15 nodes · cohesion 0.13 · altChestId.toLowerCase, chestId, chestId.replace, chestId.toLowerCase, computeH3Cell, DEMO_CAMPUS_SLOTS.map, hours, Number
- Community 26: 14 nodes · cohesion 0.18 · console.warn, raw.startsWith, storage.getItem, storage.removeItem, storage.setItem, @/lib/json, clearPendingRequest(), getPendingRequest()
- Community 27: 13 nodes · cohesion 0.15 · chainKey.toLowerCase, faucetClaims.clear, faucetClaims.has, faucetClaims.set, ipFaucetCounts.clear, ipFaucetCounts.get, ipFaucetCounts.set, protection
- Community 28: 12 nodes · cohesion 0.17 · Definitions, formatShortAddress, Formatters, getAlternativeChain, getChainById, getExplorerAddressUrl, getExplorerTxUrl, isSupportedChain
- Community 29: 11 nodes · cohesion 0.2 · getAlternativeChain, isSupportedChain, setIsOpen, setIsSwitching, SUPPORTED_CHAINS.map, switchChain, useSwitchActiveWalletChain, getBadgeStyle()
- Community 30: 10 nodes · cohesion 0.22 · calc, disconnect, setCopied, setMenuOpen, useActiveWallet, useDisconnect, AddressBadge(), handleCopy()
- Community 31: 10 nodes · cohesion 0.2 · APR, deposit, calculateBalanceTier(), calculateCompassLevel(), calculateEnergyMax(), calculateExplorationScore(), calculatePowerLevel(), calculateStreakTier()
- Community 32: 9 nodes · cohesion 0.0 · @/components/cross-chain, @/components/map/InteractiveMap, @/components/position, @/components/quest, @/components/sponsor, @/components/wallet/ConnectWalletButton, @/components/wallet/GasBalance, @/components/wallet/NetworkSwitcher
- Community 33: 8 nodes · cohesion 0.25 · formula, h3.latLngToCell, Math.sqrt, resolution, h3-js, computeH3Cell(), haversineDistanceMeters()
- Community 34: 7 nodes · cohesion 0.29 · Chest, computeCampaignIdHash, signSponsorProof, SponsorProof, verifySponsorQrPayload, window
- Community 35: 7 nodes · cohesion 0.29 · getChainById, isNaN, num.toFixed, refetch, useWalletBalance, GasBalance()
- Community 36: 7 nodes · cohesion 0.33 · address, Balance, indicator, menu, options, WalletHeader()
- Community 37: 7 nodes · cohesion 0.29 · addr.startsWith, envKey.startsWith, getChestManagerAddress(), getFujiCChainId(), getGameL1ChainId(), getProofSignerPrivateKey()
- Community 38: 7 nodes · cohesion 0.29 · createWallet, darkTheme, inAppWallet, phụ, Wallet, thirdweb/react
- Community 39: 6 nodes · cohesion 0.33 · cdpSolanaAccountToSvmSigner(), fromCdpSmartWallet(), registerExactEvmScheme(), registerExactSvmScheme(), toClientEvmSigner()
- Community 40: 5 nodes · cohesion 0.4 · localStorage, Messaging, RequestStatus, transactions
- Community 41: 5 nodes · cohesion 0.4 · component, rotate, translateY, VirtualCompass()
- Community 42: 5 nodes · cohesion 0.4 · console.debug, reloads, handleUnhandledRejection(), WalletProvider()
- Community 43: 4 nodes · cohesion 0.5 · getDemoCampusConfig, hour, status
- Community 44: 4 nodes · cohesion 0.5 · RootLayout, @/components/wallet/WalletHeader, @/components/wallet/WalletProvider
- Community 45: 4 nodes · cohesion 0.5 · tseslint.config, @eslint/js, typescript-eslint
- Community 46: 4 nodes · cohesion 0.5 · buildEip712Domain(), createLocationProofTypedData(), createSponsorProofTypedData()
- Community 47: 4 nodes · cohesion 0.5 · buildEip712Domain, createLocationProofTypedData, createSponsorProofTypedData
- Community 48: 4 nodes · cohesion 0.5 · calculateCompassLevel, calculateExplorationScore, getRarityAndApr
- Community 49: 4 nodes · cohesion 0.5 · handleRecenter(), handleResize(), InteractiveMap(), selectChest()
- Community 50: 3 nodes · cohesion 0.67 · @/lib/thirdweb, ConnectWalletButton()
- Community 51: 3 nodes · cohesion 0.67 · @/lib/chains, @/lib/thirdweb
- Community 52: 3 nodes · cohesion 0.67 · JSON.parse, val.trim
- Community 53: 3 nodes · cohesion 0.67 · parseSafeJSON, @/app/api/map-config/route
- Community 54: 3 nodes · cohesion 0.67 · url.endsWith, getRelayerConfiguration()
- Community 55: 3 nodes · cohesion 0.0 · @/lib/chains, next/link, react
- Community 56: 2 nodes · cohesion 1.0 · next
- Community 57: 2 nodes · cohesion 1.0 · DemoLocationBanner()
- Community 58: 2 nodes · cohesion 1.0 · TestnetBanner()
- Community 59: 2 nodes · cohesion 1.0 · errorResponse()
- Community 60: 2 nodes · cohesion 0.0 · copyToClipboard(), renderLatencyBadge()
- Community 61: 1 nodes · cohesion 1.0 · no non-file members
- Community 62: 1 nodes · cohesion 1.0 · no non-file members
- Community 63: 1 nodes · cohesion 1.0 · no non-file members
- Community 64: 1 nodes · cohesion 1.0 · no non-file members
- Community 65: 1 nodes · cohesion 1.0 · no non-file members
- Community 66: 1 nodes · cohesion 1.0 · no non-file members
- Community 67: 1 nodes · cohesion 1.0 · no non-file members
- Community 68: 1 nodes · cohesion 1.0 · no non-file members
- Community 69: 1 nodes · cohesion 1.0 · no non-file members
- Community 70: 1 nodes · cohesion 1.0 · no non-file members
- Community 71: 1 nodes · cohesion 1.0 · no non-file members
- Community 72: 1 nodes · cohesion 1.0 · no non-file members
- Community 73: 1 nodes · cohesion 1.0 · no non-file members
- Community 74: 1 nodes · cohesion 1.0 · no non-file members
- Community 75: 1 nodes · cohesion 1.0 · no non-file members
- Community 76: 1 nodes · cohesion 1.0 · no non-file members
- Community 77: 1 nodes · cohesion 1.0 · no non-file members
- Community 78: 1 nodes · cohesion 1.0 · no non-file members
- Community 79: 1 nodes · cohesion 1.0 · no non-file members
- Community 80: 1 nodes · cohesion 1.0 · @/lib/json

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
- Isolated grounded nodes: 604
- Thin communities: 50, 51, 52, 53, 54, 56, 57, 60, 80
- Sample isolated nodes: `next`, `AdminHealthPage`, `AVAX`, `Bar`, `clearInterval`

## Suggested Questions
- **Why is `InteractiveMap()` central to the repository?**
  It has the highest grounded degree in community 49.
- **How does `loadEnvFile()` connect to `trim` across boundaries?**
  ambiguous relationship, cross-file link, cross-community bridge, cross-boundary directory hop
- **What responsibilities are grouped inside Community 0?**
  Representative nodes: argparse.ArgumentParser, bytes, ccs.sort.
- **What responsibilities are grouped inside Community 1?**
  Representative nodes: addTo, applyMapModeVisibility, Array.isArray.
- **What responsibilities are grouped inside Community 2?**
  Representative nodes: address.startsWith, budget, Budgets.
