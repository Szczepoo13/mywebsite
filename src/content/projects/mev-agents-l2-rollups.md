---
title: "AI Agents for MEV Extraction on L2 Rollups"
description: "MEV platform for EVM rollups: live mainnet liquidity-pool scanner, profitability/risk/price-impact benchmarks, and a multi-agent system (Eliza OS) orchestrating strategy execution and market analysis. Presented at BCK25, Mumbai."
date: 2026-04-01
repo: "https://gitlab.com/szczepan.gurgul1/aiagentsproject"
tags: ["typescript", "ethers.js", "eliza-os", "docker"]
---

## Overview

An MEV platform for EVM rollups, built around a live mainnet liquidity-pool scanner and a
multi-agent system (Eliza OS) that orchestrates strategy execution and market analysis.

## Problem

<!-- TODO: what motivated this project — what gap or opportunity in L2 MEV extraction was it built to address? -->

## Approach

Implemented and compared MEV strategies — cross-DEX arbitrage, sequencer spamming, sandwich
attacks — under L2 constraints such as sequencer-controlled ordering and low-latency execution.
The multi-agent system orchestrates the MEV bot and gathers market insights about MEV
opportunities, with automated experiment logging and reproducible reporting (metrics collection
plus plots/tables) to support research-grade benchmarking.

## Findings

<!-- TODO: what did the benchmarking actually show? PnL, execution costs, risk figures, comparisons between strategies. -->

## Outcome

Quantified on-chain MEV strategy performance with systematic benchmarking of PnL, execution
costs, and risk under realistic constraints (fees, price impact, ordering). Presented at BCK25,
Mumbai.
