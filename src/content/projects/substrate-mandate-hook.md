---
title: "Substrate Mandate Hook"
description: "Uniswap v4 hook that checks every LP rebalance against a mandate set by the token project, and blocks moves that break it or happen at a manipulated price, before they execute. Work in progress in the Uniswap Hook Incubator (UHI11)."
date: 2026-11-01
competition: "Uniswap Hook Incubator (UHI11), Atrium Academy × Uniswap Foundation"
status: "in-development"
tags: ["solidity", "foundry", "uniswap v4", "hooks", "typescript"]
order: 1
---

## Overview

On-chain guardrails for rebalancing liquidity positions on Uniswap v4. A token project hands its
tokens to a market maker, a bot or an AI agent to manage liquidity in a Uniswap pool, and today it
simply has to trust them. Substrate is a hook that sits in front of that pool: every rebalance is
checked against rules the project set (the mandate), and bad moves are rejected before they
execute.

Part of UHI11, the Uniswap Hook Incubator by Atrium Academy and the Uniswap Foundation, in the
Active Management & Curation track. **Work in progress**: the repository will be published once
the first version is ready.

## Problem

- With concentrated liquidity, a position only earns while the price stays inside its range, so
  someone has to keep rebalancing it: market makers, ALMs, bots and, increasingly, AI agents.
- The pool has no say in this. A buggy range, a rebalance at a price pushed by a flash loan or a
  sandwich, or an AI agent acting on a fake headline all go through.
- The token project gets KPI reports from its market maker that it can't verify.

## How it works

The curator / allocator model from Morpho, applied to Uniswap v4 liquidity:

| Role | Who | What it does |
|---|---|---|
| Curator | token project or DAO | Creates the pool with the hook, writes the mandate, approves allocators |
| Allocator | market maker, bot, AI agent | Proposes rebalances (new tick ranges) |
| Hook | this contract | Checks every add and remove of liquidity against the mandate, then lets it through or reverts |
| Owner | whoever owns the tokens | Deposits and withdraws; the only one who can take tokens out, at any time |

The algorithm decides what to do; the hook decides whether it's allowed.

- **Mandate:** a band around the token's fair value (NAV), limits on how far the price may drift
  from the hook's own price memory, a cap on the active position size, and a cooldown.
- **Price memory:** on every swap the hook updates its own EMA and last-block price, so a rebalance
  right after someone pushed the price gets blocked. Swaps themselves are never blocked.
- **Shadow pool:** a twin pool runs the same moves without enforcement, so the difference shows in
  dollars how much the hook prevented. Every allocator's results can be recomputed from on-chain
  events.
- **Invariants:** Foundry fuzzing checks that only the owner can withdraw, withdrawals always work,
  swaps are never blocked, and every accepted rebalance respects the mandate.

## Status

Work in progress. Right now: the hook and its price memory, the vault and factory, and invariant
tests. Next: a testnet deployment on Unichain Sepolia with Reactive Network automation, and a
recorded demo.
