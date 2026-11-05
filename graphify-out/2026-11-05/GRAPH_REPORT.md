# Graph Report - Yield Go Project  (2026-11-05)

## Corpus Check
- Corpus is ~17,343 words - fits in a single context window. You may not need a graph.

## Summary
- 389 nodes · 546 edges · 32 communities (24 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- File Inventory Metadata
- Extraction Metadata
- Archify Analysis Manifest
- Web App Dependencies
- DeFi Contracts and Flows
- Monorepo Root Configuration
- System Architecture Concepts
- Incremental Analysis State
- Semantic Analysis Metadata
- Shared TypeScript Configuration
- Web TypeScript Configuration
- Architecture Prompt Artifacts
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

## God Nodes (most connected - your core abstractions)
1. `files` - 19 edges
2. `language` - 18 edges
3. `status` - 18 edges
4. `nodeCount` - 18 edges
5. `edgeCount` - 18 edges
6. `warning` - 18 edges
7. `status` - 18 edges
8. `reason` - 18 edges
9. `backend` - 18 edges
10. `providerStatus` - 18 edges

## Surprising Connections (you probably didn't know these)
- `apps/web Subsystem` --semantically_similar_to--> `Walk-to-DeFi PWA`  [INFERRED] [semantically similar]
  .archify/architecture-context.md → DeFi-Trail-PRD.md
- `services/relayer Subsystem` --semantically_similar_to--> `Self-Hosted ICM Relayer`  [INFERRED] [semantically similar]
  .archify/architecture-context.md → DeFi-Trail-PRD.md
- `Grounded Architecture Synthesis` --semantically_similar_to--> `Confirmed Repository Context`  [INFERRED] [semantically similar]
  .archify/docs/archify/brief.md → docs/ARCHITECTURE_AI.md
- `Archify Fact Policy` --semantically_similar_to--> `Confirmed Repository Context`  [INFERRED] [semantically similar]
  .archify/docs/archify/guide.md → docs/ARCHITECTURE_AI.md
- `apps/web Subsystem` --references--> `Next.js Graph Hub`  [EXTRACTED]
  .archify/architecture-context.md → .archify/GRAPH_REPORT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cross-Chain Position Lifecycle** — defi_trail_prd_chest_manager, defi_trail_prd_game_icm_gateway, defi_trail_prd_c_chain_icm_gateway, defi_trail_prd_yield_vault, defi_trail_prd_position_snapshot, defi_trail_prd_player_state [EXTRACTED 1.00]
- **Three Chest Flows** — defi_trail_prd_yield_chest, defi_trail_prd_quest_chest, defi_trail_prd_sponsor_chest [EXTRACTED 1.00]
- **Grounded Architecture Prompt Pipeline** — _archify_docs_archify_brief_grounded_architecture, _archify_docs_archify_guide_fact_policy, docs_architecture_ai_architecture_prompt_pack [INFERRED 0.85]

## Communities (32 total, 8 thin omitted)

### Community 0 - "File Inventory Metadata"
Cohesion: 0.05
Nodes (59): architectureTags, fileType, hash, mtime, semantic, sizeBytes, semantic, architectureTags (+51 more)

### Community 1 - "Extraction Metadata"
Cohesion: 0.06
Nodes (55): extraction, architectureTags, extraction, fileType, hash, mtime, sizeBytes, extraction (+47 more)

### Community 2 - "Archify Analysis Manifest"
Cohesion: 0.04
Nodes (46): analysisSummary, ambiguousEdgeCount, godNodeCount, suggestedQuestionCount, surprisingConnectionCount, architectureContextSummary, crossCuttingConcernCount, dataFlowCount (+38 more)

### Community 3 - "Web App Dependencies"
Cohesion: 0.08
Nodes (29): nextConfig, dependencies, @defi-trail/domain@0.1.0, h3-js@4.5.0, maplibre-gl@6.16.0, next@16.4.5, react@19.3.1, react-dom@19.3.1 (+21 more)

### Community 4 - "DeFi Contracts and Flows"
Cohesion: 0.15
Nodes (18): CChainICMGateway, ChestManager, DepositRequest, GameICMGateway, LocationProof, MockUSDC, PlayerState, PositionSnapshot (+10 more)

### Community 5 - "Monorepo Root Configuration"
Cohesion: 0.12
Nodes (17): devDependencies, @types/node@26.6.6, typescript@7.0.2, engines, node, npm, name, private (+9 more)

### Community 6 - "System Architecture Concepts"
Cohesion: 0.18
Nodes (12): apps/web Subsystem, Configuration Cross-Cutting Concern, services/relayer Subsystem, Next.js Graph Hub, Initial Repository Knowledge Graph, DeFi Trail, Fuji C-Chain, Avalanche Game L1 (+4 more)

### Community 7 - "Incremental Analysis State"
Cohesion: 0.14
Nodes (14): incremental, changed_code_files, changed_semantic_files, changedFileCount, deleted_files, deletedFileCount, fallbackReason, incrementalEligible (+6 more)

### Community 8 - "Semantic Analysis Metadata"
Cohesion: 0.17
Nodes (12): semanticSummary, backend, edgeCount, enabled, hyperedgeCount, mode, nodeCount, processedDocumentCount (+4 more)

### Community 9 - "Shared TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, resolveJsonModule (+3 more)

### Community 10 - "Web TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, jsx, paths, plugins, exclude, extends, include, ../../tsconfig.base.json

### Community 11 - "Architecture Prompt Artifacts"
Cohesion: 0.25
Nodes (5): Guided Architecture Generation, Required Architecture Prompt Sections, Architecture AI Prompt Pack, Confirmed Repository Context, Open Architecture Uncertainty

### Community 12 - "Next Type Environment"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, apps/web/next-env.d.ts

### Community 13 - "Web Package Metadata"
Cohesion: 0.25
Nodes (8): architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes, apps/web/package.json

### Community 14 - "Domain Config Metadata"
Cohesion: 0.25
Nodes (8): packages/domain/tsconfig.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 15 - "Relayer Package Metadata"
Cohesion: 0.25
Nodes (8): services/relayer/package.json, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 16 - "Relayer Entrypoint Metadata"
Cohesion: 0.25
Nodes (8): services/relayer/src/main.ts, architectureTags, extraction, fileType, hash, mtime, semantic, sizeBytes

### Community 17 - "Module Analysis Artifact"
Cohesion: 0.25
Nodes (7): artifact, dependencies, modules, phase, scanRoot, status, targetPath

### Community 18 - "Domain Package Configuration"
Cohesion: 0.25
Nodes (7): exports, name, private, scripts, typecheck, type, version

### Community 19 - "Relayer Package Configuration"
Cohesion: 0.29
Nodes (6): name, private, scripts, typecheck, type, version

### Community 20 - "Fuji Contract Package"
Cohesion: 0.40
Nodes (4): name, private, scripts, version

### Community 21 - "Game L1 Contract Package"
Cohesion: 0.40
Nodes (4): name, private, scripts, version

### Community 22 - "Domain TypeScript Configuration"
Cohesion: 0.50
Nodes (3): extends, include, ../../tsconfig.base.json

### Community 23 - "Relayer TypeScript Configuration"
Cohesion: 0.50
Nodes (3): extends, include, ../../tsconfig.base.json

## Knowledge Gaps
- **10 isolated node(s):** `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json`, `packages/domain Subsystem`, `scripts Subsystem` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 241 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `files` connect `File Inventory Metadata` to `Extraction Metadata`, `Archify Analysis Manifest`, `Next Type Environment`, `Web Package Metadata`, `Domain Config Metadata`, `Relayer Package Metadata`, `Relayer Entrypoint Metadata`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **What connects `../../tsconfig.base.json`, `../../tsconfig.base.json`, `../../tsconfig.base.json` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `File Inventory Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.053185271770894216 - nodes in this community are weakly interconnected._
- **Why does `incremental` connect `Incremental Analysis State` to `Archify Analysis Manifest`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `Extraction Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.0632996632996633 - nodes in this community are weakly interconnected._
- **Why does `semanticSummary` connect `Semantic Analysis Metadata` to `Archify Analysis Manifest`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `Archify Analysis Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._