---
title: "High TPS Generator"
description: "Stress-testing setup for a local zkSync chain using Uniswap V2 token swaps. Simulated multiple IP sources and parallel WebSocket clients to maximize throughput and avoid HTTP overhead, benchmarking 74 TPS."
date: 2024-11-01
repo: "https://github.com/Szczepoo13/zkSync-TPS-Benchmark"
tags: ["python"]
---

## Overview

A stress-testing tool written in Python for benchmarking a local zkSync chain under load, using
Uniswap V2 token swaps as the transaction workload.

## Problem

<!-- TODO: what question was this meant to answer — e.g. how does a locally deployed zkSync rollup's throughput compare to mainnet Ethereum? -->

## Approach

Simulated multiple IP sources and parallel WebSocket clients to maximize transactions per second
while avoiding HTTP overhead, generating sustained load against the local rollup.

## Findings

<!-- TODO: any interesting bottlenecks or tuning discoveries while pushing throughput up? -->

## Outcome

Benchmarked the locally deployed zkSync rollup instance at 74 TPS, compared to roughly 15–20 TPS
on mainnet Ethereum.
