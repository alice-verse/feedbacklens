
# FeedbackLens

A customer feedback synthesis and prioritization tool built to demonstrate core product management workflows: collecting unstructured feedback, categorizing it by theme/sentiment, and ranking it using the **RICE prioritization framework** (Reach × Impact × Confidence ÷ Effort).

🔗 **Live Demo(#)** 

## Why this project

As a PM, the hardest part of "listening to customers" isn't collecting feedback — it's turning hundreds of messy comments into a defensible, ranked roadmap. FeedbackLens simulates that pipeline:

1. **Ingest** raw feedback (sample SaaS dataset included)
2. **Auto-categorize** each item by theme (Bug, Feature Request, UX Issue, Performance) and sentiment, with a confidence score
3. **Score & rank** every item using an interactive RICE matrix — edit Reach, Impact, Confidence, or Effort and watch the roadmap re-rank live

## Skills demonstrated

- Feedback synthesis & thematic categorization
- RICE / ICE prioritization frameworks
- Translating qualitative input into quantitative prioritization
- Building lightweight internal tools for stakeholder alignment
- Basic frontend development (React)

## Tech stack

- React 18 (via CDN, no build step)
- Vanilla CSS
- Single HTML file — runs anywhere

## Run locally

Just open `index.html` in a browser. No installation needed.

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your live demo will be at `https://<username>.github.io/<repo-name>/`

## Possible extensions

- Connect to a real LLM API for classification instead of the mock classifier
- Import feedback via CSV upload (Zendesk, Intercom, App Store reviews)
- Persist RICE scores and export prioritized roadmap to CSV/PDF
- Add a "theme trends over time" chart

---

*Built as a portfolio project to demonstrate product management thinking through a working tool.*
