---
type: "query"
date: "2026-11-06T16:10:43.800412+00:00"
question: "packages shared domain types progression exports"
contributor: "graphify"
outcome: "useful"
source_nodes: ["src/index.ts", "domain.ts", "progression.test.ts"]
---

# Q: packages shared domain types progression exports

## Answer

Expanded with graph vocabulary: packages, shared, domain, types, progression, exports, gameplay, schemas, index, test. The shared public barrel re-exports package modules; GE-01 extends it with gameplay. Existing progression tests import the domain types directly, so the new gameplay tests verify both pure functions and public exports.

## Outcome

- Signal: useful

## Source Nodes

- src/index.ts
- domain.ts
- progression.test.ts