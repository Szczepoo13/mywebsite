---
title: "Ethereum Event Indexer"
description: "A blockchain event indexing system split into an indexer service (consumes on-chain logs into Postgres) and a REST API service that exposes the indexed data with pagination and filtering."
date: 2024-01-01
repo: "https://github.com/Szczepoo13/Ethereum-Event-Indexer"
tags: ["typescript", "postgresql", "ethers.js", "docker"]
order: 2
---

## Overview

Originally a side repo exploring how to keep a Postgres mirror of on-chain events correct and
resumable, published since the resulting pipeline turned out clean enough to stand on its own: a
blockchain event indexing system split into two services and a database. An `indexerService`
consumes on-chain logs and writes decoded events into Postgres, and an `apiService` exposes the
indexed data over
REST.

## Problem

Querying an RPC node directly for historical or live contract events doesn't scale for
client-facing use. Every request pays the RPC round-trip, and there's no easy way to filter,
paginate, or sort. Indexing decouples "watching the chain" from "serving queries."

## Approach

- The indexer processes blocks in fixed-size batches (1,000 blocks at a time) and only indexes up
  to a "safe" block (chain tip minus a 5-block confirmation buffer) to reduce reorg risk, polling
  every 5s for new blocks.
- Progress is checkpointed in a Postgres `indexer_state` table (`lastProcessedBlock`), so the
  indexer resumes from where it left off after a crash or restart instead of re-scanning from
  genesis.
- Duplicate events are prevented at the database layer with a `UNIQUE(txHash, logIndex)`
  constraint and `ON CONFLICT DO NOTHING`, since retries, reorgs, or re-indexing can otherwise
  produce the same event twice.
- RPC calls are wrapped in a retry mechanism (10 attempts, 1s apart) to ride out transient
  provider errors, and a mock event generator lets the full pipeline be exercised without a live
  chain or funded testnet account:

  ```typescript
  export async function retryRpc<T>(
    fn: () => Promise<T>,
    retries = 10,
    delay = 1000
  ): Promise<T> {
    try {
      return await fn()
    } catch (err) {
      if (retries <= 0) throw err
      await new Promise(res => setTimeout(res, delay))
      return retryRpc(fn, retries - 1, delay)
    }
  }
  ```
- The API service reads the indexed table and exposes `GET /loans` with pagination and filtering
  by borrower address, sorted by block number.

## Findings

Working through this surfaced a few design tradeoffs worth calling out. Confirmation depth is a
direct latency/reorg-safety tradeoff (5 blocks means ~1 minute of lag on Sepolia before an event
is indexed, but fewer confirmations risk indexing data that later gets reorged out). Single-writer
batch indexing is simple but becomes the bottleneck at scale: sharding by block range or contract,
and putting a queue (Kafka/RabbitMQ) between the indexer and the database so a crashed indexer
can't drop in-flight events, would be the next steps for a production-scale version.

## Outcome

A working end-to-end pipeline (indexer + Postgres + API) with an integration test (Supertest +
Vitest) covering the `/loans` endpoint's response shape and status codes.
