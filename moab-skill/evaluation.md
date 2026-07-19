# evaluation.md — Comparison & Recommendation Format

> **Reader:** the agent running MOAB.
> **Load condition:** a recommendation or comparison is needed during brainstorm.

---

## 6-Tier Honesty Ladder

Check ALL tiers before recommending T5. Not every tier applies, but the framework forces the check:

| Tier | Approach | Prompt |
|---|---|---|
| T0 | Ask a human in your network | "Is there anyone around you who's already done something like this?" |
| T1 | Use an existing service | "Is there an off-the-shelf tool that already solves this?" |
| T2 | One-shot AI (single prompt) | "Could a single AI prompt handle this well enough?" |
| T3 | Non-AI automation (script/cron/webhook) | "Is the logic deterministic enough for a script?" |
| T4 | Manual workflow (checklist/template) | "Is the frequency low enough that doing it by hand is fine?" |
| T5 | AI-powered bot (MOAB's default output) | Only if T0–T4 fail |

T0 is first because it's often highest-signal, lowest-cost. MOAB can't query a human network directly — but it prompts the user to.

T0 settings toggle: `ask_human_network: on | off | prompt-once` (default: prompt-once per project).

---

## Knowledge Model (4 Sources)

| Source | Speed | Use |
|---|---|---|
| Human network (T0) | Instant (one prompt to user) | "Your senior already solved this" |
| Curated seed pack | Instant | Well-known patterns, prevents cold-start |
| Portfolio-derived | Instant | "What worked for you before" — reads existing projects |
| Discovery | Slow (seconds) | Novel domains, emerging tools; labelled "unconfirmed" until user validates |

Stale entries (past `stale_after_days`): flag + offer freshness probe.

---

## Cost Estimation Tiers

| Tier | Source | Precision | Label |
|---|---|---|---|
| Prior-based | Bundled pricing + benchmarks | ±50% | 🔴 |
| Portfolio-based | User's own past bots | ±20% | 🟡 |
| Sample-based | Benchmark on user's data | ±5% | 🟢 |

Source tier tag on EVERY range. No naked numbers.

---

## Comparison Table Format

**Rules (all mandatory):**

1. Always show ≥3 approaches + the NO-AI row (even if N/A — state why)
2. Every cell is a **range** (min–max), never a point estimate (Art 4a)
3. Every range carries a **source tier tag**: `(S0 human / S1 prior / S2 portfolio / S3 sample)`
4. Reliability expressed as **scenario table** where relevant — standard case + edge case
5. **Property labels, not preference (Art 7):** use labels from speech.md (always loaded)
6. Deploy-env question asked early (see scaffold.md for packaging strategies per environment)

**Example format:**

| Approach | ETA (range) | Cost (range) | Reliability | Source |
|---|---|---|---|---|
| `[SPEED-FIRST]` | 1–2d (S1) | $35–55 (S1) | 94–99% standard; 70–80% edge (S3) | mixed |
| `[COST-FIRST]` | 3–5d (S1) | $12–20 (S3) | 90–96% standard; 65–75% edge (S1) | prior |
| `[SIMPLICITY-FIRST]` | 0.5–1d (S1) | $0 (compute) | 85–95% standard; N/A edge (S1) | prior |
| `[NO-AI]` | 5–10d (S0) | $200+ labor (S0) | 100% (human) | human |

**Source tier legend:**
- S0 (human-verified) / S3 (sample-tested) — high confidence
- S2 (portfolio-based, ±20%) — medium confidence
- S1 (prior/benchmark, ±50%) — low confidence, always available as fallback

**Anti-flooding:** per stage1_scoping.md Step 6 (always loaded when Stage 1 active).

---

## Model-Tier Matching

When recommending an AI approach, include model-tier guidance:

| Skill Complexity | Minimum Tier | Note |
|---|---|---|
| Basic (file ops, simple transforms) | Standard | Sufficient for deterministic logic |
| Medium (multi-step, structured output) | Advanced | Needs stronger reasoning |
| High-demand (orchestration, multi-tool) | Premium | Lower tiers may fail entirely, not just degrade |

Surface explicitly: "This skill is medium complexity — I'd recommend at least an Advanced-tier model. Standard saves ~40%, but accuracy drops from 92–98% to 75–85%."

---

## Optional Benchmark

Offer during brainstorm when sample data is available:

> "Want me to run a quick benchmark? I can test this approach against your sample data for accuracy, latency, and token cost. Estimated cost: ~$0.50. Shall I go ahead?"

Result feeds back into comparison table as 🟢 sample-tested.
