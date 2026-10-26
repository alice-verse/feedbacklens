# FeedbackLens AI
Turn customer feedback (CSV or Excel) into a ranked list of what to fix first.

**Live demo:** _add your Netlify link here_

## What is built
- CSV and Excel (.xlsx) upload, feedback-column picker, duplicate removal
- Rule-based sentiment and themes (keyword rules, **not** an AI model)
- Priority score 0-100 = 40% mentions + 35% share negative + 25% recent share (decision-support estimate)
- Search, filters, charts, CSV export
- "Ask your feedback": TF-IDF retrieval finds relevant reviews; a Netlify Function can send them to Claude (needs your key)
- **Cloud save with Supabase:** sign up / sign in, save datasets, reopen or delete them. Row Level Security keeps each user's data private (`supabase/migrations/001_init.sql`)
- **Playwright tests** (`tests/`) and a GitHub Actions workflow that runs them on every push

## Not built yet
Claude-based sentiment/theme classification, server-side rate limiting.

## Supabase setup (free tier)
1. supabase.com > New project.
2. SQL Editor > paste `supabase/migrations/001_init.sql` > Run.
3. Project Settings > API: copy the Project URL and the **anon** key into `config.js`. (The anon key is public by design; RLS protects the data. Never use the service_role key here.)
4. Authentication > URL Configuration: set Site URL to your Netlify link.
5. Optional for easy testing: Authentication > Providers > Email > turn off "Confirm email".

## Tests
`npm install`, then `npx playwright install chromium`, then `npm test`.
Tests cover upload, errors, search, export, retrieval and the not-configured cloud state. Live Supabase sign-in/save is **not** covered by automated tests; check it by hand and with two accounts to confirm isolation.

## Deploy
Static site on Netlify: no build command, publish directory `.`. Optional AI answers: set `ANTHROPIC_API_KEY` and `CLAUDE_MODEL` in Netlify environment variables.
