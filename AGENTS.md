# Elemental Trail — active repository rules

## Three authoritative documents
Read in order:
1. docs/ELEMENTAL_TRAIL_PRD.md — product scope, Accepted/Open, UX and product decisions.
2. docs/ELEMENTAL_TRAIL_ARCHITECTURE.md — target technical design, data responsibilities,
   invariants, asset contract, evidence and architectural decisions.
3. docs/ELEMENTAL_TRAIL_VIBE_CODING.md — v0.0–v0.12 prompts, dependencies, tests,
   proposed commit names and execution workflow.

PRD decides WHAT/WHY; Architecture describes HOW and evidence; Vibe Coding defines delivery order.
Do not silently change product rules to fit implementation.
IMPLEMENTATION_STATUS.md is execution evidence, not a competing specification.
ELEMENTAL_TRAIL_MASTER.md, docs/mvp and old DeFi PRDs are superseded/reference materials.
Keep creative prompt libraries and code-navigation artifacts as resources, not gameplay authority.

## Graphify and Archify
This repository uses both tools. Follow skills and the executable R3–R5 runbook
in docs/ELEMENTAL_TRAIL_VIBE_CODING.md.
Installed CLI uses graphify update . for code, not graphify . --update.
The chat skill /graphify . --update supports incremental semantic workflow.
Do not claim PRD/Markdown coverage from code-only update.
Report graph structural health, changed-source coverage, semantic pending state,
and Archify knowledgeStale/designPacketStale fields separately.
Run Graphify queries/updates before the final Archify analyze/generate snapshot;
query cache timestamps can otherwise trigger stale status.
Do not fake freshness by editing timestamps/manifests or run unbounded refresh loops.
Before source-code audit/edit:
- Check Archify status for the relevant doc type.
- When fresh/ready, read packet.json first, guide.json second, then referenced artifacts.
- Query the existing Graphify graph for the actual module question; path/explain as useful.
- Verify cited files/symbols in current source; distinguish confirmed/inferred/open.
- Refresh stale analysis/packet according to skill instructions and session authorization.
  Do not claim a stale graph confirms current code. Do not silently install global tools.
After structural source changes and relevant tests, update affected indexes incrementally
and report status. Do not rebuild all knowledge for every typo/color change.
Documentation organization can proceed with explicit freshness limitations.
archify.md remains the root tool-managed output; do not redirect its generation
to ELEMENTAL_TRAIL_ARCHITECTURE.md or overwrite it as part of document splitting.
Preserve .archify/, graphify-out/, config files and generated evidence.

## Workspace
The user chose this existing Yield Go repository for Elemental Trail.
Do not clone again or work on the incomplete copy under Elements Pets.
Preserve user changes, source history/license, lockfile and deployment data.
Never reset/discard the working tree or overwrite unrelated files.
Read applicable nested AGENTS.md; apps/web/AGENTS.md requires installed Next.js docs before app changes.
Architecture indexes can guide navigation; verify freshness and source facts.
Stale indexes do not block documentation-only work.

## Scope
Use v0.0–v0.12 from docs/ELEMENTAL_TRAIL_VIBE_CODING.md, one bounded version at a time.
Use its START prompt and executable R0–R7 runbook. Setup v0.0 is a required baseline,
not a generic instruction to "refer to the repo". Run commands yourself when authorized.
Check each native exit code, test counts, browser behavior and evidence.
The elemental test paths in the runbook are planned outputs; create meaningful tests
before running them. Zero tests or skipped checks are not PASS.
Accepted: persistent collection, regular online play, events as additional content,
free collection progress, consumption of selected pet copies with discovery preserved,
Ember Sprite→Flare Fox evolution, utility awarded separately through ICM.
Open decisions stay Open. Do not reuse old event economy or 16-pet scope as default.
Ask only decisions needed for dependent work; continue independent authorized work.
Routine implementation within approved scope does not require repeated confirmation.
Record significant architecture decisions including migration/rollback in docs/ELEMENTAL_TRAIL_ARCHITECTURE.md;
preserve existing historical ADRs and never reuse their identifiers.

## Authority and safety
Verify economic/progress evidence; client CONFIRMED is not proof.
Keep world ownership separate from campaign progress.
ERC-1155 fungible copies do not imply unique individual histories.
Never rename a USDC vault into pet custody without implementing correct semantics.
Duplicate/retry must be idempotent. Delayed ACK is not business rejection.
Never fake success, balances, receipts, test results or deployment.
Keep local/mock, testnet and event/live distinct.
Do not log secrets/raw GPS/QR redemption secrets/OTP or expose personal data.
Never import server secrets into client bundles.
Only deploy to a specifically requested environment.

## Assets
Use asset source pet/ as source; preserve originals.
docs/ELEMENTAL_TRAIL_ARCHITECTURE.md contains the species/asset table, dimensions and source→runtime naming guidance.
Export derivatives separately to the app's actual public directory.
Keep labels/counts/rates separate from art; raster reference is not SVG.
Do not invent collaboration art, scarcity or sponsor branding.

## Validation and Git
Run checks appropriate to changed behavior; report actual commands/results and limitations.
Document-only changes need document verification, not unrelated app test runs.
Update execution status with evidence and outstanding blockers.
Commit names in Vibe Coding are proposals, not authorization to commit/push/tag.
If explicitly asked to commit, stage only relevant files, check for secrets,
use the suggested name when applicable and report actual hash.
Do not amend others' commits, include unrelated changes, or claim a suggested commit exists.
No file deletion is authorized by the Vibe Coding cleanup recommendations alone.
