> **Exemplar note:** A reference PRD showing what a good Stage 1 output looks like — locked scope, ranges with source tiers, tagged inferences, and a signed audit block.

# PROJECT_PRD.md — Daily Briefing Bot v1

**The One Thing:** Wake up to a proactive daily briefing pushed to me — no hunting across apps — so I know what today looks like before I even get out of bed.

---

## 1. Product Summary

Daily Briefing Bot: every morning at a fixed time, proactively push a daily briefing via Slack DM. Content draws from five sources — weather, news, calendar, to-do, email — with an AI judgment layer (priority ranking / email digest / gap suggestions).

---

## 2. Target User

- Single user (v1 does not support multi-user)
- Slack as primary IM
- Has a calendar + email + to-do workflow across multiple services
- `[inferred]` English-speaking, US timezone
- `[inferred]` Has access to OpenAI API or equivalent
- `[inferred]` Prefers passive "it comes to me" over actively checking dashboards

---

## 3. Chosen Approach

**n8n (self-hosted) + Slack bot + OpenAI API.** One-line rationale: n8n gives full control over workflow logic, self-hosting keeps costs near zero past the LLM calls, and the visual editor means modifications don't require a developer.

**Backup route (archived, not active):** Zapier + Slack webhook, no-AI version. If v1 runs and the AI layer doesn't add meaningful value, fall back to this.

**Honesty ladder footprint:**
- **T1 check (done):** Morning Brew / Reclaim / Motion / Sunsama — none satisfy "proactive push + custom sources + self-hosted + no subscription lock-in" together.
- **T3 check (done):** n8n without AI — viable, archived as backup route.
- **T5 (final):** n8n + OpenAI — the AI judgment layer is essential for the three features that can't be done with deterministic logic alone.

---

## 4. Platform

- **Build:** n8n (self-hosted, Docker)
- **Delivery:** Slack DM via bot token
- **Trigger:** n8n cron node; daily at 07:00 local time (US Eastern, UTC-5)
- **Deployment:** Docker on existing home server; no additional infra

---

## 5. Constraints

- **Cost ceiling:** $0–5/month `[S1 prior — actual pricing per provider's published rates]`
- **Accuracy:** AI judgment (priority / digest) tolerates 10–20% drift; data aggregation (calendar / weather / to-do) must be error-free
- **Timeliness:** Delivery within ±5 minutes of scheduled time; late = failure
- **Dependencies:** Slack bot token (user creates in Slack API console) + n8n instance + five data-source integrations (Google Calendar API, Google Tasks API, Gmail API, weather API, news API)

---

## 6. Feature Modules (5 items)

### 6.1 Scheduled Push
n8n cron → Slack DM; single time point (07:00 ET), expandable later.

### 6.2 Five-Source Aggregation
- Weather — OpenWeatherMap API (free tier)
- News — NewsAPI.org (free tier, 100 req/day)
- Calendar — **Google Calendar API**
- To-do — **Google Tasks API**
- Email — **Gmail API** (read-only scope)

**Slack message length handling:** if output exceeds 4000 chars, split into multiple messages (no Slack Block Kit cards for v1).

### 6.3 AI Priority Ranking
Input today's to-do list, output top 3–5 items. Judgment criteria: deadline proximity + urgency language + `[assumed]` user-defined "importance criteria" in system prompt.

**Draft system prompt:**
> "You are a personal assistant. Below is the user's to-do list for today. Rank by: deadline proximity > urgency language (words like 'must', 'today', 'deadline') > project importance. Pick the top 3–5, with one sentence explaining why each ranks where it does. Be concise, skip pleasantries."

### 6.4 AI Email Digest + Noise Filter
Past 24h unread emails; worth-reading ones get 1–2 sentence summary each, junk/irrelevant merged into "Skipped N emails" without expansion.

### 6.5 AI Gap Suggestion (read-only)
Input today's calendar gaps + unscheduled to-dos; output natural-language suggestion "Task X could fit in slot Y." **Does NOT write to calendar** — user acts on it manually. (Full "AI writes to calendar" is in the Fridge.)

---

## 7. Unresolved Risks (0 items)

All 6 risks resolved during brainstorm —

1. ~~Which specific services for the five sources~~ → **Google suite + OpenWeatherMap + NewsAPI**
2. ~~Timezone handling in cron~~ → **US Eastern 07:00, n8n server clock**
3. ~~AI prompt quality~~ → **v1's first 2 weeks = 2–3 iteration rounds** (this is normal shakedown, not extra scope)
4. ~~Slack message length limit~~ → **Split into multiple messages**
5. ~~Free-tier exhaustion fallback~~ → **Switch approach (not upgrade to paid)**
6. ~~Fridge review cadence~~ → **Every 7 days review the Fridge**

---

## 8. Prompt Iteration Plan

Not extra work — this is normal v1 shakedown.

- **At launch:** Three draft prompts (priority / email digest / gap suggestion), just get running
- **First 2–3 days:** Note each morning's output — wrong ranking? Important email skipped? Bad gap suggestion?
- **Every 3–7 days:** Feed collected issues back into prompt revisions
- **After 2–3 rounds:** Should stabilize; occasional drift → quick fix

---

## 9. The Fridge

**AI auto-scheduling: write tasks into calendar slots** (the full Reclaim.ai / Motion feature set) — v1.1 candidate.

**Fridge rationale:** Taken on its own, this is an entire product's core feature. It could consume 60–80% of v1 build effort, turning "daily briefing bot" into "mini Reclaim clone." Disproportionate.

**Review cadence:** After v1 launch, review every 7 days to decide whether to thaw.

---

## 10. Backup Route (archived)

**Zapier + Slack webhook, no-AI version** — buildable in 1 day, $0/month (free tier sufficient for 1 run/day), trade-off is no AI judgment layer. If v1's "AI priority ranking / email digest / gap suggestion" don't prove their value, fall back entirely to this route.

---

## 11. Hedging Audit (Art 4b)

Full-text scan complete — no unresolved "maybe / probably / perhaps / might" remaining. All uncertainty is surfaced as `[inferred]` / `[assumed]` / `[unresolved]` tags.

## 12. Inference Log (Art 3)

- 3× `[inferred]`: English-speaking, US timezone, passive-reception preference
- 1× `[assumed]`: user-defined "importance criteria" in system prompt

---

## Audit Block

```
─────────────────────────────
Sign-off
─────────────────────────────
Display name:      Alex Chen
System name:       alexChen
Verification code: R9KT2W
Sign date:         2026-07-18
Framework version: MOAB v1.0.0
─────────────────────────────
```

**Scope lock active.** Any additions to v1 from this point require a **scope change ceremony** (explicit acknowledgment: "I know I'm expanding scope"). Nothing sneaks in.

**Version:** v1.0-signed  |  **Date:** 2026-07-18  |  **Platform:** n8n + Slack  |  **Builder:** Alex Chen
