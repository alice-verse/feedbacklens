# FeedbackLens AI
Upload customer feedback (CSV) and get a ranked list of what to fix first, with search, charts, export, and a "Ask your feedback" retrieval (RAG) assistant.

**Live demo:** _add your Netlify link here_

## What works today
- CSV upload with quoted-field parsing, column detection, duplicate removal
- Rule-based sentiment and theme tagging (keyword rules, **not** an AI model)
- Priority score 0–100 = 40% mentions + 35% share negative + 25% recent share (decision-support estimate)
- Search, filters, CSV export, charts
- Retrieval: TF-IDF search finds the most relevant reviews for a question
- Generation: a Netlify Function sends only those reviews to Claude (needs your API key; without it the app shows retrieval only)

## Planned (not built yet)
Supabase login and saved datasets, Claude-based sentiment/theme classification, Playwright tests, GitHub Actions.

## Run / deploy
Static site, no build step. Publish directory `.`; functions in `netlify/functions`.
Optional AI answers: in Netlify, Site configuration > Environment variables, add `ANTHROPIC_API_KEY` and `CLAUDE_MODEL`. Never commit keys.
