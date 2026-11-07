---
type: "explain"
date: "2026-11-07T01:37:11.989455+00:00"
question: "Explain GE-05 Passport badge engine"
contributor: "graphify"
outcome: "useful"
source_nodes: ["evaluatePassport()", "reconcileTrailProgressWithEvidence()"]
---

# Q: Explain GE-05 Passport badge engine

## Answer

evaluatePassport is the deterministic orchestration node: it merges idempotent evidence, delegates canonical filtering to shared badge rules, selects the next goal, and is called by storage and PassportClient. Confirmed trail reconciliation reaches it through the Passport evidence adapter; tests cover exact-once trail awards.

## Outcome

- Signal: useful

## Source Nodes

- evaluatePassport()
- reconcileTrailProgressWithEvidence()