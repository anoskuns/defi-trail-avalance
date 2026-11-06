---
type: "query"
date: "2026-11-06T16:27:30.634102+00:00"
question: "map-config route campus slots validation API response"
contributor: "graphify"
outcome: "useful"
source_nodes: ["map-config/route.ts", "getDemoCampusConfig", "DEMO_CAMPUS_SLOTS", "errorResponse"]
---

# Q: map-config route campus slots validation API response

## Answer

The existing map-config route builds its public response through getDemoCampusConfig, uses the shared API error envelope, and exposes only approved campus slots. Gameplay config should reference slots and resolve epoch-specific chest IDs instead of copying coordinates.

## Outcome

- Signal: useful

## Source Nodes

- map-config/route.ts
- getDemoCampusConfig
- DEMO_CAMPUS_SLOTS
- errorResponse