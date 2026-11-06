---
type: "query"
date: "2026-11-06T16:54:09.821714+00:00"
question: "ICM confirmed requestId storage status"
contributor: "graphify"
outcome: "useful"
source_nodes: ["useICMProgress()", "icm-storage.ts", "RequestStatus", "CONFIRMED"]
---

# Q: ICM confirmed requestId storage status

## Answer

Expanded via graph vocab: [icm, confirmed, request, requeststatus, storage, status, progress, terminal]. useICMProgress hydrates pending requestId/status from icm-storage; only RequestStatus.CONFIRMED maps to confirmed. GE-03 consumes that terminal signal without changing ICM semantics.

## Outcome

- Signal: useful

## Source Nodes

- useICMProgress()
- icm-storage.ts
- RequestStatus
- CONFIRMED