---
title: "Fuzz & Property-Based Testing in Java"
description: "Systematic software testing exercises in Java following Effective Software Testing (Aniche): specification-based tests, structural coverage (JaCoCo), mutation testing (PIT), property-based testing with jqwik, and a Python blackbox/greybox mutation fuzzer evaluated with statistical tests."
date: 2026-07-15
repo: "https://github.com/Szczepoo13/FuzzTesting"
tags: ["java", "python", "junit", "mutation testing", "property-based testing"]
order: 3
---

## Overview

Coursework repo built while working through *Effective Software Testing*: systematic test
design for about 20 small Java programs, plus a separate fuzzing part in Python that builds
blackbox and greybox mutation fuzzers from scratch and compares them statistically.

## Problem

"Write good tests" is vague on its own. The goal here was to apply each technique from the book
deliberately (specification-based design, structural coverage, mutation testing, property-based
testing, fuzzing) rather than just writing tests until it feels like enough.

## Approach

- Part 1 (12 exercises): specification-based test design (input partitioning, boundary analysis),
  JUnit 5 suites, JaCoCo for line/branch coverage, and PIT for mutation testing.
- Part 2 (10 exercises): moved to design-by-contract (pre-conditions, post-conditions, invariants)
  plus jqwik property-based tests that generate random inputs and check those contracts hold.
- Compared fuzzer configurations (seed count, mutation complexity, blackbox vs. greybox) over 30
  independent runs each, using the Mann-Whitney U test to check whether coverage differences were
  statistically significant rather than noise.

## Findings

- Example bug (ArrayElementSwapper): the spec called for a `NullPointerException` on invalid input,
  but the code silently returned instead. The missing exception only surfaced once mutation testing
  showed which mutants survived.
- Typical suites hit 96%+ line and 100% branch coverage, with mutation kill scores in the 80s (81%
  on ArrayElementSwapper: 21/26 mutants killed).
- Greybox fuzzing beat blackbox fuzzing with statistical significance (p < 0.05) on coverage
  achieved.
- Neither more starting seeds (1 vs. 10) nor more sophisticated mutation operators (byte flips,
  block duplication, splicing) produced a statistically significant coverage improvement over the
  simple baseline. Only greybox feedback (keeping inputs that hit new paths) did.

## Outcome

About 20 Java programs with specification-based, structural, mutation, and property-based test
suites plus documented bugs and fixes, and a working blackbox/greybox/boosted-greybox fuzzer
harness with statistically validated comparisons between them.
