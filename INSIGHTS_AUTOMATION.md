# Daily Insights automation

A scheduled task publishes one new article to /insights/ every day, without anyone touching the repo. Each run is a fresh Claude session that follows the steps below. If any step fails, nothing is published that day.

## What a run does

1. **Pick a topic.** Choose one practical question an African founder or product team would search for, in one of the allowed topics (Product strategy, Product design, Fundraising, Engineering, Fintech, Growth, Research, Business). Skip anything already covered in `src/content/insights.mjs`.
2. **Research.** Read at least two current, reputable sources (regulators, official docs, established publications). Any number, percentage, law or regulator named in the article must come from one of these sources.
3. **Write.** Add the article to the top of `ARTICLES` in `src/content/insights.mjs` with today's date, a `seoTitle` if the title is long, and a `sources` array of `[title, https URL]`. Plain, specific writing; no em dashes; no invented clients, quotes or results.
4. **Fact-check.** A second, independent pass re-reads every claim against the cited sources and removes or fixes anything that is not supported.
5. **Build and gate.**
   ```
   node scripts/make-covers.mjs      # cover art for the new article
   node build.mjs
   node scripts/check-insights.mjs   # the quality gate; must pass
   node scripts/make-og.mjs          # social preview image
   ```
6. **Publish.** Commit on a branch `insight/<date>-<slug>`, open a PR, merge it into `main`, and confirm the article URL returns 200 on lynexa.co after Netlify deploys.
7. **Moderate comments.** Read the last day's comments from `/api/comments-moderate` and hide spam or abuse. The key is the `STATS_KEY` Netlify environment variable, sent as the `x-stats-key` header. It is never written to the repo or to logs.

## The quality gate (`scripts/check-insights.mjs`)

Fails the run if an article has: a bad or duplicate slug, a title or search title that is too long, a description outside 70 to 165 characters, an unknown topic, fewer than 280 words, no `<h2>`, banned filler text or em dashes, scripts or inline handlers, statistics or legal claims without sources, non-https links, broken internal links, a missing cover, or articles out of date order.

## Engagement

- **Likes**: `/api/likes` (one anonymous record per like, rate limited).
- **Comments**: `/api/comments`. Name and comment only, no email. Links are rejected, a word list holds comments for review, and a honeypot plus a minimum fill time stop bots.
- **Moderation**: `/api/comments-moderate` (GET to list, POST `{key, status}` to hide or show), protected by `STATS_KEY`.
- **Sharing**: native share sheet where supported, plus LinkedIn, X, WhatsApp and copy link.

## Turning it off

Pause or delete the "Lynexa daily insight" scheduled task in Claude. Published articles stay up; remove one by deleting its entry from `src/content/insights.mjs`.
