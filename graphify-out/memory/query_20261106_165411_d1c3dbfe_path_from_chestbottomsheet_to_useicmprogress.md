---
type: "path_query"
date: "2026-11-06T16:54:11.249558+00:00"
question: "Path from ChestBottomSheet to useICMProgress"
contributor: "graphify"
outcome: "dead_end"
source_nodes: ["ChestBottomSheet()", "useICMProgress()"]
---

# Q: Path from ChestBottomSheet to useICMProgress

## Answer

No directed path exists. The undirected four-hop route crosses file containers and React through ICMProgressModal, so ChestBottomSheet must remain independent of ICM progress; page-level composition is required.

## Outcome

- Signal: dead_end

## Source Nodes

- ChestBottomSheet()
- useICMProgress()