# Philosophy & Design Rationale

## What is MOAB?

MOAB is a framework for preventing unnecessary complexity while making necessary complexity reliable.

This maps directly to MOAB's architecture: **Stage 1 (Brainstorm)** prevents unnecessary complexity by asking whether a bot is needed at all. **Stages 2-4 (Build / Verify / Package)** make the complexity that survives Stage 1 reliable enough to trust in production.

MOAB is a **meta-tool for building bots**. Not a bot itself — a system that helps a human decide *whether* to build a bot, *what kind* to build, *at what cost*, and produces the spec needed to hand off to a builder. (v1 stops at the spec; later stages will generate the artifacts.)

Positioning: **decision-support tool, not code generator.** The code is downstream. The value is in the *choice architecture* MOAB presents.

---

## The Honesty Ladder

MOAB's first question is: **"Do you even need a bot?"**

The Honesty Ladder walks users through cheaper, more reliable alternatives before ever recommending "let's build":

| Tier | Alternative | Example |
|---|---|---|
| T0 | Ask someone in your network | "My colleague already solved this with a shared spreadsheet" |
| T1 | Use an existing service | "Notion + Zapier already does this" |
| T2 | One-shot AI conversation | "Just ask ChatGPT once, no bot needed" |
| T3 | Non-AI automation | "A cron job + shell script handles this" |
| T4 | Manual process | "Doing this by hand takes 5 min/day — is that actually a problem?" |
| T5 | AI-powered bot | "Okay, you genuinely need a bot. Let's build it right." |

The AI-powered bot is the **last resort**, not the default. A tool that talks you *out* of using AI when you don't need it is more trustworthy than one that always says yes.

---

## What MOAB optimizes for

MOAB optimizes for **reliability over speed**. Specifically:

- It does not compete on "fastest bot built" or "most impressive demo."
- It does not compete on novelty — it's fine being the second framework to solve something, as long as its version is the one you trust at 2am on a Friday.
- It's not trying to be everyone's default; it's trying to be *some* people's exact right tool.

The priority order is: **reliable > correct > fast > elegant.** When two goals conflict, pick the more reliable path. That's the Polar Star.

---

## What MOAB offloads from you

MOAB's job is memory and bookkeeping so the user can be a better decision-maker.

MOAB doesn't think *for* you — it handles the parts of decision-making that shouldn't consume your attention so your focus stays on what actually matters. MOAB handles:

| Mechanism | What it offloads |
|---|---|
| **The Fridge** | "Which tempting ideas did I set aside, and why?" |
| **Sign-off codes** | "How do I prove this decision was made deliberately?" |
| **Open Questions** | "Which loose ends are still open?" |
| **Updates log** | "What changed between versions, and why?" |

The user offloads memory work to MOAB so their finite cognition stays on prioritization and consistency.

**Failure mode to watch:** MOAB starts absorbing *decisions* instead of *bookkeeping*. The offload is memory + procedure; decisions stay with the user, always.

---

## What MOAB is NOT

- Not a "let me write code for you" tool
- Not a chatbot wrapper
- Not a replacement for engineering judgment — an aid to it
- Not a marketplace, plugin store, or automation platform
- Not tied to a single LLM provider
- Not a one-shot generator — iteration is part of the product

---

*v1.0.0 — 2026-07-18*
