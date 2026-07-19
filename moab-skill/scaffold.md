# scaffold.md — Child-Bot File Templates

> **Reader:** the agent running MOAB.
> **Load condition:** building or discussing a child bot's file structure.
> **Note:** Stage 2 (Build) is deferred to v2+. This file provides the reference architecture so Stage 1's PRD can describe what will be built.

---

## Standard Bot Folder Structure

Every MOAB-generated bot ships with:

```
<bot-name>/
├── README.md              # User-facing: setup + chat UX guide
├── SKILL.md               # Agent-facing: auto-loaded trigger + procedure
├── RULES.md               # Reference: full spec (agent on-demand)
├── ALIGNMENT.md           # Scope: what it does, what it doesn't
├── outputs/               # Where the bot writes results (empty on ship)
├── sample/
│   ├── input/             # Realistic small dataset
│   └── output/            # Expected output from running on sample/input
└── engine/                # Optional — only when code is needed
    ├── src/
    ├── test/
    ├── package.json
    └── node_modules/      # Bundled if no-terminal deploy
```

---

## File Rules

1. **README opens with setup** — first ~10 lines answer "what do I do right now?"
2. **SKILL.md description drives auto-loading** — include trigger terms
3. **RULES.md is the living spec** — agent reads on-demand, humans read when curious
4. **sample/input + sample/output always present** — doubles as demo and regression fixture
5. **Only add `engine/` if code is needed** — pure-chat skills skip it
6. **Every file declares its primary reader** (human or AI) — style follows reader
7. **No file without a stated role** — prevents doc sprawl

---

## Reader-Aware Styling

| Reader | Style | Example |
|---|---|---|
| Human-facing | Clear structure, examples, tone, formatting matters | README.md, error messages |
| AI-facing | Token-efficient, unambiguous, triggers front-loaded | SKILL.md, structured RULES.md |

Wrong-reader-styled files are an audit issue.

---

## ALIGNMENT.md Template (for child bots)

```markdown
# Pre-build alignment — <bot-name>
Status: awaiting sign-off / approved (v1)

## 1. What we're building
<one paragraph — plain-language identity>

## 2. What it should do  ← EXPECTED OUTCOMES, not capabilities
<Direction, not instruction. Outcome-level.>

## 3. What it should NOT do  ← MORAL COMPASS, negative space
<Non-goals. Anti-scope-creep line.>

## 4. Chosen approach + rejected alternatives
- Chosen: <approach> — because <reason>
- Rejected: <alt> — because <reason>

## 5. Expected accuracy / cost / timeline
<Ranges with source tiers, per Art 4a>

## 6. Success criteria (observable)

## 7. Sign-off
Verification code: ______
Signed: ______ Date: ______
```

---

## Deploy-Env Packaging

Ask early (during Stage 1 brainstorm):

| Environment | Packaging Strategy |
|---|---|
| Terminal available | Standard; deps via `npm install` |
| No terminal | Bundle `node_modules/` in zip |
| Cloud runtime | Containerize |
| Air-gapped | Pre-fetch everything; no runtime downloads |

---

## README Tiered Structure

One README, multiple audiences:

```
README.md
├── Quick Start                   ← service user, 60 seconds
├── Chat Guide                    ← service user, first interaction
├── FAQ                           ← service user, self-serve
├── How It Works                  ← engineer
├── Customization                 ← engineer
├── Accuracy                      ← both (transparency)
└── Changelog                     ← both
```

Rule: a reader can stop at their section and still have gotten full value.
