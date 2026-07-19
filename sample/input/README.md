# sample/input — Example user scenario

This folder holds a minimal example of what a user brings to MOAB Stage 1.
Use this to verify that the skill's routing, register matching, and honesty
ladder produce a comparable quality output to `../output/`.

## File

- `scenario_daily_briefing.md` — a condensed user request (the "vibe-coder walks in" moment).

## How to use for testing

1. Feed `scenario_daily_briefing.md` to the MOAB skill.
2. Compare the generated PRD against `../output/Daily_Briefing_Bot_PROJECT_PRD.md`.
3. Check: honesty ladder walked? Comparison table present? Inferences tagged? Scope ≤7?

*v1.0.0 — 2026-07-18*
