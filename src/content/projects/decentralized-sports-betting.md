---
title: "Decentralized Sports Betting Platform"
description: "dApp with a Node.js backend for API handling and database management. Integrated Chainlink Oracles for real-time odds and outcomes, with end-to-end flow testing. Won the BCOLN Challenge Award for Best Distributed dApp, 2024."
date: 2024-06-01
repo: "https://github.com/Szczepoo13/Decentralized-Sports-Betting"
tags: ["javascript", "node.js", "solidity", "chainlink"]
order: 1
---

## Overview

TODO
<!-- A blockchain event indexing system split into two services and a database: an `indexerService`
that consumes on-chain logs and writes decoded events into Postgres, and an `apiService` that
exposes the indexed data over REST. -->

## Problem

TODO
<!-- Querying an RPC node directly for historical or live contract events doesn't scale for
client-facing use — every request pays the RPC round-trip, and there's no easy way to filter,
paginate, or sort. Indexing decouples "watching the chain" from "serving queries." -->

## Approach

TODO
<!-- The indexer processes blocks in fixed-size batches (1000 blocks at a time) and only indexes up to
a "safe" block — the chain tip minus a confirmation buffer — to reduce reorg risk. Progress is
checkpointed in a Postgres `indexer_state` table (`lastProcessedBlock`), so the indexer resumes
safely after a crash or restart instead of re-scanning from genesis. Duplicate events are
prevented at the database layer with a `UNIQUE(txHash, logIndex)` constraint and
`ON CONFLICT DO NOTHING`. RPC calls are wrapped in a retry mechanism, and a mock event generator
lets the full pipeline be exercised without a live chain. The API service reads the indexed table
and exposes `GET /loans` with pagination and filtering by borrower address, sorted by block number. -->

## Findings

TODO
<!-- TODO: any concrete numbers or issues hit while building/running this — indexing throughput, RPC rate limits, reorg frequency on testnet, etc.? -->

<!-- Working through this surfaced a few design tradeoffs worth calling out: safe-block confirmation
depth is a direct latency/reorg-safety tradeoff, and single-writer batch indexing is simple but
becomes the bottleneck at scale — sharding by block range or contract, and putting a queue
(Kafka/RabbitMQ) between the indexer and the database, would be the next steps for a
production-scale version. -->

## Outcome

TODO
<!-- A working end-to-end pipeline (indexer + Postgres + API) with an integration test (Supertest +
Vitest) covering the `/loans` endpoint's response shape and status codes. -->