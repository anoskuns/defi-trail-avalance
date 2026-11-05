# Archify

## System Prompt

You are an architecture-writing assistant producing a grounded, upload-ready architecture prompt pack for this repository.
Treat `.archify` artifacts as the primary source of confirmed facts. Keep confirmed findings separate from inferred architecture and preserve uncertainty when evidence is weak.
Read the synthesis artifacts in the documented order before relying on any additional repository context.

## User Prompt

Use the grounded repository context below to produce the architecture artifact the user asks for.
Start by asking which architecture artifact the user wants from the supported options, then ask which visual style they want before generating any final architecture or diagram output.
Wait for those answers before finalizing the architecture response. If image generation is unavailable, return a render-ready diagram specification instead of pretending an image was created.

## Grounded Repository Context

Target path: `C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project`
Scan root: `.`

System summary: Yield Go Project contains 7 subsystems, 0 cross-subsystem flows, 0 processed documents, and 1 external dependency derived from 8 extracted code nodes.

Grounded artifacts to read in order:

- `.archify/docs/archify/packet.json`
- `.archify/docs/archify/guide.json`
- `.archify/docs/archify/packet.json`
- `.archify/architecture-context.json`
- `.archify/facts.json`
- `.archify/modules.json`
- `.archify/services.json`
- `.archify/dependencies.json`
- `.archify/routes.json`
- `.archify/database.json`
- `.archify/docs-summary.json`

Repository summary snapshots:

- Graph summary: {"communityCount": 7, "edgeCount": 1, "hyperedgeCount": 0, "nodeCount": 8, "warningCount": 0}
- Facts summary: {"ambiguousEdgeCount": 0, "confirmedCount": 10, "edgeCount": 1, "entrypointCount": 3, "extractedFileCount": 7, "inferredCount": 2, "nodeCount": 8, "subsystemCount": 7}
- Services summary: {}
- Routes summary: {}
- Database summary: {"boundaryCount": 0, "migrationCount": 0, "tableCount": 0}
- Dependencies summary: {}
- Docs summary: {"alignedDocumentCount": 0, "detectedDocumentCount": 1, "processedDocumentCount": 0, "skippedDocumentCount": 0, "themeCount": 0, "unresolvedDocumentCount": 0}

Supporting docs discovered by Archify:

- No supporting README or optional architecture docs were recorded.

## Confirmed From Codebase

### System Overview

Yield Go Project contains 7 subsystems, 0 cross-subsystem flows, 0 processed documents, and 1 external dependency derived from 8 extracted code nodes.

No grounded items were available for this section.

Evidence: artifact:.archify/architecture-context.json, artifact:.archify/facts.json

### Subsystems

Detected 7 subsystem(s) and 7 service surface(s).

- **apps/web**
  apps/web is a infrastructure subsystem covering 1 paths and 1 symbols; strongest evidence: imports x1.
  Kind: infrastructure
  Source paths: apps/web/next.config.ts
- **apps/web**
  apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: module
  Source paths: apps/web/next-env.d.ts
- **apps/web**
  apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: module
  Source paths: apps/web/src/app/layout.tsx
- **apps/web**
  apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: ui
  Source paths: apps/web/src/app/page.tsx
- **packages/domain**
  packages/domain is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: module
  Source paths: packages/domain/src/index.ts
- **scripts**
  scripts is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: module
  Source paths: scripts/main.ts
- **services/relayer**
  services/relayer is a service subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
  Kind: service
  Source paths: services/relayer/src/main.ts

### Entrypoints And Interfaces

Detected 3 entrypoint candidate(s), 3 confirmed route(s), and 0 table(s).

- **scripts/main.ts**
  Kind: entrypoint
  Source path: scripts/main.ts
  Subsystem: subsystem-5-0-scripts
  Evidence: file_scripts_main_ts
- **services/relayer/src/main.ts**
  Kind: entrypoint
  Source path: services/relayer/src/main.ts
  Subsystem: subsystem-6-0-services-relayer
  Evidence: file_services_relayer_src_main_ts
- **packages/domain/src/index.ts**
  Kind: cli
  Source path: packages/domain/src/index.ts
  Subsystem: subsystem-4-0-packages-domain
  Evidence: file_packages_domain_src_index_ts

Evidence: file_packages_domain_src_index_ts, file_scripts_main_ts, file_services_relayer_src_main_ts

## Inferred Architecture

### Cross-Subsystem Flows

Inferred summary: Detected 0 inferred cross-subsystem flow(s).

No grounded items were available for this section.

### Documentation Alignments

Inferred summary: Detected 0 architecture theme(s) from repository docs.

No grounded items were available for this section.

## Questions Before Architecture Generation

Ask these before finalizing the architecture deliverable:

- What kind of architecture output do you want next: a high-level diagram, a deployment view, a sequence flow, or a deeper written architecture?
- Which user journeys, business workflows, or API flows matter most for this architecture pass?
- What operational constraints should shape the design, such as scale, latency, reliability, compliance, tenancy, or geographic requirements?
- Which external systems, third-party integrations, or data providers are in scope and which are intentionally out of scope?
- Are there planned changes, migrations, or target-state boundaries that differ from the current codebase structure?
- Which inferred components, names, or boundaries should be treated as tentative until you confirm them?

## Diagram / Image Generation Instructions

- Ask artifact type first: True
- Supported artifact options: high-level architecture, low-level architecture, component breakdown, user flow diagram, sequence / interaction view, custom request
- Ask visual style first: True
- Supported visual style options: clean architecture diagram, swimlane flow, sequence view, annotated component map, presentation-ready infographic, custom style
- Must wait for answers before final output: True
- Generate image when supported: True
- Fallback to render-ready diagram spec when image generation is unavailable: True

## Open Questions / Uncertainty

### Open Questions

- Inferred: **What responsibilities are grouped inside Community 0?**
  Confidence: low
  Related subsystems: subsystem-0-0-apps-web
  Evidence: ref_apps_web_next_config_ts_import_next
- Inferred: **Why is `next` central to the repository?**
  Confidence: low
  Related subsystems: subsystem-0-0-apps-web
  Evidence: ref_apps_web_next_config_ts_import_next

### Coverage Gaps

- Inferred: **0 document(s) remain unresolved against subsystem evidence.**
  Evidence: artifact:.archify/docs-summary.json
- Inferred: **0 ambiguous edge(s) remain in the graph.**
  Evidence: artifact:.archify/facts.json

