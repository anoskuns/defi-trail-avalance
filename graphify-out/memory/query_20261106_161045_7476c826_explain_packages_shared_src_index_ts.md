---
type: "explain"
date: "2026-11-06T16:10:45.168220+00:00"
question: "Explain packages/shared/src/index.ts"
contributor: "graphify"
outcome: "useful"
source_nodes: ["src/index.ts"]
---

# Q: Explain packages/shared/src/index.ts

## Answer

The shared package index is the public barrel. It re-exports types, constants, math, EIP-712, env, and now gameplay; consumers import shared APIs through this boundary.

## Outcome

- Signal: useful

## Source Nodes

- src/index.ts