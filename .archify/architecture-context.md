# Architecture Context

## System

- Project: `Yield Go Project`
- Target Path: `C:\Users\Lenovo\Documents\3.1.Cuộc Thi\Cuộc Thi Avalance Build Web3\Yield Go Project`
- Dominant Directories: `apps`, `packages`, `scripts`, `services`
- Dependency Shape: 0 subsystem links, 0 ambiguous edges, 2 tagged entrypoints, 0 enriched docs
- Summary: Yield Go Project contains 7 subsystems, 0 cross-subsystem flows, 0 processed documents, and 1 external dependency derived from 8 extracted code nodes.

## Subsystem Inventory

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
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `apps/web/next-env.d.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/next-env.d.ts:apps/web/next-env.d.ts

### apps/web [MEDIUM]

- Kind: `module`
- Summary: apps/web is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `apps/web/src/app/layout.tsx`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/app/layout.tsx:apps/web/src/app/layout.tsx

### apps/web [MEDIUM]

- Kind: `ui`
- Summary: apps/web is a ui subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `apps/web/src/app/page.tsx`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: none
- Evidence: apps/web/src/app/page.tsx:apps/web/src/app/page.tsx

### packages/domain [MEDIUM]

- Kind: `module`
- Summary: packages/domain is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `packages/domain/src/index.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: packages/domain/src/index.ts:packages/domain/src/index.ts

### scripts [MEDIUM]

- Kind: `module`
- Summary: scripts is a module subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `scripts/main.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: scripts/main.ts:scripts/main.ts

### services/relayer [MEDIUM]

- Kind: `service`
- Summary: services/relayer is a service subsystem covering 1 paths and 0 symbols; strongest evidence: structure-only edges.
- Paths: `services/relayer/src/main.ts`
- Key Symbols: `none`
- Depends On: `none`
- Depended On By: `none`
- Responsibilities: Exposes 1 interface candidate.
- Evidence: services/relayer/src/main.ts:services/relayer/src/main.ts

## Interfaces

- `packages/domain/src/index.ts` [MEDIUM] in `subsystem-4-0-packages-domain` as `cli` from `packages/domain/src/index.ts`.
  Evidence: packages/domain/src/index.ts:packages/domain/src/index.ts
- `scripts/main.ts` [HIGH] in `subsystem-5-0-scripts` as `entrypoint` from `scripts/main.ts`.
  Evidence: scripts/main.ts:scripts/main.ts
- `services/relayer/src/main.ts` [HIGH] in `subsystem-6-0-services-relayer` as `entrypoint` from `services/relayer/src/main.ts`.
  Evidence: services/relayer/src/main.ts:services/relayer/src/main.ts

## Key Flows


## Cross-Cutting Concerns

- `config` [MEDIUM] touches `subsystem-0-0-apps-web`, `subsystem-1-0-apps-web`: config signals appear across 2 subsystems via 3 matched nodes. Evidence: apps/web/next.config.ts:apps/web/next.config.ts, apps/web/next-env.d.ts:apps/web/next-env.d.ts, apps/web/next.config.ts:next

## Entrypoints

- `scripts/main.ts` [HIGH] from `scripts/main.ts` in `subsystem-5-0-scripts`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 0. Evidence: scripts/main.ts:scripts/main.ts
- `services/relayer/src/main.ts` [HIGH] from `services/relayer/src/main.ts` in `subsystem-6-0-services-relayer`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 0. Evidence: services/relayer/src/main.ts:services/relayer/src/main.ts
- `packages/domain/src/index.ts` [MEDIUM] from `packages/domain/src/index.ts` in `subsystem-4-0-packages-domain`. Ranked as an entrypoint because it is tagged or named like a runtime root and has degree 0. Evidence: packages/domain/src/index.ts:packages/domain/src/index.ts

## External Dependencies

- `next` [LOW] used by `subsystem-0-0-apps-web` from `apps/web/next.config.ts`. Evidence: apps/web/next.config.ts:next, apps/web/next.config.ts:imports

## Open Questions

- LOW: What responsibilities are grouped inside Community 0? Why: Representative nodes: next. Evidence: apps/web/next.config.ts:next
- LOW: Why is `next` central to the repository? Why: It has the highest grounded degree in community 0. Evidence: apps/web/next.config.ts:next
