---
type: "query"
date: "2026-11-06T16:27:31.316992+00:00"
question: "server-env api-response rate-limiter"
contributor: "graphify"
outcome: "useful"
source_nodes: ["server-env.ts", "api-response.ts", "rate-limiter.ts"]
---

# Q: server-env api-response rate-limiter

## Answer

server-env contains private signer access and must not be imported by read-only gameplay routes. Reuse api-response conventions; rate-limiter is faucet-specific and is not needed for static read configuration.

## Outcome

- Signal: useful

## Source Nodes

- server-env.ts
- api-response.ts
- rate-limiter.ts