# MOAB

**Mother of All Bots** — a reliability-first framework for turning fuzzy bot ideas into locked, honest, ready-to-build specs.

Despite the name, MOAB's first question is usually: **"Are you sure you need a bot?"**

---

## The Problem

Today's default is "throw GPT at everything" and see what sticks. Most bot projects fail not because the code was bad, but because the *decision* to build was never properly interrogated. Scope creeps. Requirements drift. Nobody asked if a spreadsheet would've worked.

## The Approach

MOAB walks you through the **Honesty Ladder** before a single line of code is written:

1. Could someone in your network already solve this? (a colleague, a shared spreadsheet)
2. Does this already exist as a service?
3. Can a one-shot AI conversation handle it?
4. Would non-AI automation (script, macro, cron job) suffice?
5. Is a manual process actually fine?
6. Do you genuinely need an AI-powered bot — and if so, what kind?

The AI-powered bot is the **last resort**, not the default. A framework for scoping bots has a stronger obligation than any single bot to ensure the bot was the right call.

## What v1.0.0 Does

**Stage 1: Brainstorm** (thinking it through)

- Asks a few key questions (The One Thing — the single most important job the bot must do — plus the Honesty Ladder and target user)
- Discusses 3-4 possible approaches, **always including a no-AI option**
- Outputs a `PROJECT_PRD.md` (Product Requirements Document) — a locked spec you can hand off to whoever builds it

v1 does NOT write code, deploy, or test. Those are future stages.

---

## Install

**Prerequisites:** Git. Optionally Node.js if you want to run the engine tests.

MOAB is built as a [QoderWork](https://qoder.com) skill (QoderWork is an AI agent workspace), but the content is portable — it's just structured markdown telling an agent how to behave.

**QoderWork (native):**

```bash
# Clone and install as a skill
git clone https://github.com/glxylin/moab.git
cp -r moab/moab-skill/ ~/.qoderwork/skills/moab
```

**Claude Code, Cursor, or any agent that reads markdown instructions:**

```bash
# Clone the repo
git clone https://github.com/glxylin/moab.git

# Claude Code — add to your project context
cat moab/moab-skill/SKILL.md >> .claude/CLAUDE.md

# Cursor — add as a rule file, or just tell the agent:
# "Read moab/moab-skill/*.md at session start"
```

Once loaded, just describe what you want to build:

> "I want to build a bot that sends me a daily briefing every morning"

MOAB will activate and guide you through Stage 1.

---

## The Constitution

MOAB follows 7 hard rules that shape how it behaves. These aren't suggestions — the framework is built around them.

**Polar Star:** *Reliability above all. When any two goals conflict, choose the more reliable path.*

| # | Title | What it means |
|---|---|---|
| 1 | No silent drift | Every change leaves a trail |
| 2 | Consistency | Same input, same output shape |
| 3 | No silent trust | Every autonomy is user-granted, never assumed |
| 4 | No silent vagueness | Estimates are ranges; hedging resolves to specifics |
| 5 | No silent scope creep | Every scope change announced and signed |
| 6 | No silent attention-cost inflation | Complexity can't grow without consent |
| 7 | No silent preference | MOAB maps terrain, user picks path |

Full rationale: [`docs/constitution.md`](docs/constitution.md)

---

## Philosophy

MOAB prioritizes **reliability over speed**. The framework is designed so that the same input produces the same output shape, every decision leaves a trail, and scope never drifts without consent.

MOAB doesn't think *for* you — it handles the bookkeeping that erodes decision quality over time (deferred ideas, open questions, scope tracking, version history) so your attention stays on *deciding what matters*.

The user still makes the decision, still owns the outcome. MOAB just keeps the runway clear.

Read more: [`docs/philosophy.md`](docs/philosophy.md)

---

## Sample

See [`sample/`](sample/) for a complete Stage 1 walkthrough:
- **Input:** a user scenario ("I want a daily briefing bot")
- **Output:** the resulting `PROJECT_PRD.md` spec

---

## Roadmap

- [x] Stage 1: Brainstorm (v1.0.0)
- [ ] Stage 2: Build
- [ ] Stage 3: Verify
- [ ] Stage 4: Package
- [ ] Native integrations for non-QoderWork agents (Claude Code plugin, Cursor rules, etc.)
- [ ] zh-CN locale (internal version exists, public release TBD)

---

## Contributing

This is early. Feedback > code right now. If you try MOAB and have thoughts on:
- The Stage 1 flow (too many questions? too few? wrong ones?)
- The Constitution (too strict? too vague? missing something?)
- The Honesty Ladder (does it actually work for your use case?)

Any thoughts or running into issues? Open an issue — feedback welcome.

---

## License

[MIT](LICENSE)

---

*v1.0.0 — shipped 2026-07-18. Built in 10 days by a guy who misread a Claude response and his AI co-founder.*
