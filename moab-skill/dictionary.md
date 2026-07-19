# MOAB Framework Dictionary

> **Type:** framework-level vocabulary (fallback when no project dictionary exists)
> **Location:** alongside SKILL.md in the skill folder
> **Locale:** en
> **Gloss rule:** entries with `gloss: true` fire the first-use gloss reflex (one-clause inline, once per session)

---

## Constitution & Structure

| Term | Gloss | Definition |
|---|---|---|
| Polar Star | true | The Constitution's tiebreaker — "Reliability above all. When any two goals conflict, choose the more reliable path." |
| Constitution | true | MOAB's 7 hard rules that shape how the framework behaves |
| Article (1–7) | false | Individual Constitutional rule (cite as "Art N" in prose) |
| Amendment | true | Post-v1.0.0 addition to the Constitution; must pass the Constitutional audit criteria |

## Ceremonies & Mechanisms

| Term | Gloss | Definition |
|---|---|---|
| The Fridge | true | Out-of-scope deferred list; verb form "fridge X" |
| Stash | true | In-scope paused work; no ceremony, no version bump |
| Open Questions | true | In-scope unanswered design decisions |
| Sign-off | true | 3-way handshake ceremony (code + name + date) that locks scope |
| Scope-lock | true | The moment MVP boundaries harden after Stage 1 |
| MVP-lock | false | The feature set agreed at scope-lock (3–5 flex, cap 7) |
| MOAB-adds | true | MOAB proposing something the user didn't ask for; two flavors: backward (defense) / forward (exploration) |
| Handshake tier | false | 1-way (silent) / 2-way (flag+ack) / 3-way (flag+ack+code) — ceremony weight classification |

## Source Tiers & Estimation

| Term | Gloss | Definition |
|---|---|---|
| S0 (human) | true | Estimate sourced from a human expert; highest signal |
| S1 (prior) | true | Estimate from bundled benchmarks/pricing tables; ±50% precision |
| S2 (portfolio) | true | Estimate from user's own past projects; ±20% precision |
| S3 (sample) | true | Estimate from benchmark run on user's own data; ±5% precision |
| Source tier | false | The precision label attached to every range in a comparison table |

## Honesty Ladder

| Term | Gloss | Definition |
|---|---|---|
| Honesty ladder | true | 6-tier check (T0–T5) that MOAB walks before recommending an AI bot |
| T0–T5 (ladder) | false | The six approaches from "ask a human" to "build an AI bot" |

## Engagement & Flow

| Term | Gloss | Definition |
|---|---|---|
| Turn-cap | false | Default 3 decision items per turn; does not apply to dumps |
| Cap-composition | false | Algorithm that determines which U/W items ship this turn |
| Wind-down | false | Optional time-based mode-shift that defers irreversible writes |
| Session-end mirror | true | Three-question reflection ceremony at scope-lock |
| Progress done-list | false | ≤4 items done + 1 cliffhanger; shown at session end |

## Stages

| Term | Gloss | Definition |
|---|---|---|
| Stage 1 / Brainstorm | true | Turn fuzzy idea into locked spec (v1.0.0 scope) |
| Stage 2 / Build | false | Construct the bot from the spec (v2+) |
| Stage 3 / Verify | false | Test against spec and edge cases (v2+) |
| Stage 4 / Package | false | Clean, version, ship (v2+) |

## File Artifacts

| Term | Gloss | Definition |
|---|---|---|
| PROJECT_PRD.md | true | Stage 1 output file — the signed, versioned spec |
| Draft file | false | `PROJECT_PRD.draft.md` — pre-signing breadcrumb |
| Version file | false | `PROJECT_PRD.v<N>.md` — frozen signed scope |
| Project slug | true | User-provided folder name; asked at Turn 1, never inferred |
| Dictionary | false | Per-project vocabulary file with gloss flags |

## Property Labels

| Term | Gloss | Definition |
|---|---|---|
| [SPEED-FIRST] | false | Tag: this option optimizes for time |
| [COST-FIRST] | false | Tag: this option optimizes for cost |
| [RELIABILITY-FIRST] | false | Tag: this option optimizes for reliability |
| [SIMPLICITY-FIRST] | false | Tag: this option optimizes for simplicity |
| [HYBRID] | false | Tag: balanced trade-off |
| [NO-AI] | false | Tag: no AI required; always shown for transparency |

## Meta

| Term | Gloss | Definition |
|---|---|---|
| Scenario-Based Modularity | false | MOAB's file architecture — router loads sub-files per detected scenario |
| Guiding files | false | All .md files MOAB references at runtime |
| L1 (public) | false | Files that ship to users (what + how) |
| L2 (development) | false | Files for the dev team only (why) |

---

*v1.0.0 — 2026-07-18. 40 entries, 16 with gloss enabled.*
