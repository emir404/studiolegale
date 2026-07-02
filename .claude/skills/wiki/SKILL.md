---
name: wiki
description: Ingest a client website into clients/<domain>/ — crawl the key pages, save raw content, download images, take full-page screenshots, extract their design system into DESIGN.md, and synthesize a WIKI.md knowledge base. Use when the user says "wiki <site>" or asks to ingest, scrape, or study a client's website. Step 1 of the wiki → feel → create pipeline.
argument-hint: [website]
allowed-tools: WebFetch, Bash(curl *), Bash(bash ${CLAUDE_PROJECT_DIR}/.claude/skills/wiki/scripts/*), Bash(chmod +x ${CLAUDE_PROJECT_DIR}/.claude/skills/wiki/scripts/*), Bash(mkdir *), Bash(sleep *), Bash(npx -y playwright *)
---

# /wiki — ingest a client website

Build the knowledge base for `$ARGUMENTS`. Everything lands in `clients/<domain>/`. Work through the steps in order; scripts live in `${CLAUDE_SKILL_DIR}/scripts/` (run `chmod +x` on them once if needed). Scripts never abort the run — they print `[skip]`/`[info]` lines; read them and adapt.

**Politeness**: `sleep 1` between page fetches. Never hammer a site.

## 1. Resolve the target

- No argument → ask for the website URL.
- Normalize to an origin (`https://` + host). Fetch the homepage first:
  `bash ${CLAUDE_SKILL_DIR}/scripts/fetch-page.sh <origin> <tmp>/home.html`
- On failure, try the `www.`/non-`www.` variant and `http://` before giving up with the exact error.
- The script prints `FINAL_URL` — compute the **domain slug** from it (strip scheme, `www.`, path → e.g. `clients/acme.com/`). If a redirect changed the domain, say so.
- `clients/<slug>/` already exists → this is a **refresh**: overwrite `pages/`, `assets/`, `meta/`, `WIKI.md`, `DESIGN.md`, but **never touch FEEL.md**.
- Create the layout: `clients/<slug>/{pages,assets/images,assets/screenshots,meta}` and move the homepage HTML to `meta/home.html`.

## 2. Discover and select pages

```
bash ${CLAUDE_SKILL_DIR}/scripts/discover-pages.sh <origin> clients/<slug>/meta/home.html
```

The script merges a **validated** sitemap.xml (soft-404s to homepage HTML are discarded), homepage links, and — only when discovery is thin — probed common paths.

From the candidates select **up to 12 pages**. Priority: home → about/company → team/people → services/products/solutions → pricing → work/portfolio/case-studies → contact → careers → blog **index only** (never individual posts). Sanity-check the list against the homepage nav you can see in the HTML; add obvious missing key pages by hand. Tell the user which pages you selected and what you dropped, then proceed.

## 3. Fetch pages and distill content

For each selected page (`sleep 1` between):

```
bash ${CLAUDE_SKILL_DIR}/scripts/fetch-page.sh <url> clients/<slug>/meta/<page-slug>.html
```

Page slug = URL path with `/`→`-` (`/services/web` → `services-web`; homepage → `home`).

Then **you** distill each HTML into `pages/<page-slug>.md` (raw curl output is the source of truth — read it with offset/limit if huge):

```markdown
---
url: <final url>
title: <title tag>
description: <meta description>
fetched: <YYYY-MM-DD>
---
# <h1>
<body copy as markdown: headings, paragraphs, list items — keep claims,
numbers, names, and testimonials VERBATIM>

## Images on this page
- <src> — alt: "<alt>" — <where it sits: hero / team grid / inline / footer>
```

**SPA fallback**: if a page's HTML has under ~200 words of visible text, fetch it with WebFetch (prompt: "return the full readable page content") and note `source: webfetch` in its frontmatter.

## 4. Download images

```
bash ${CLAUDE_SKILL_DIR}/scripts/download-images.sh clients/<slug>/assets/images <origin> clients/<slug>/meta/*.html
```

Caps: 20 files / 2MB each. The script **value-ranks** candidates (og/twitter, hero/team/office keywords, and larger declared dimensions rank up; thumb/icon/avatar/stock/logo down; favicon/sprite/pixel dropped) so a run keeps signature photos, not the first 20 in DOM order. Non-images and tiny files are auto-dropped. Then, by hand:
- **Logo (first-class — don't skip).** It's a brand anchor `/create` must keep. Work down until you have a clean file at `assets/images/logo.<ext>`: a header `<img>`/inline `<svg>` whose filename/alt/class says "logo" (often an SVG the ranker sinks) → `<link rel="icon">`/`apple-touch-icon` → `og:image` → `site.webmanifest` icons. Prefer SVG or a large PNG.
- **Socials.** From the footer/header markup, collect the client's social links (Instagram, LinkedIn, X, Facebook, YouTube…) as **full profile URLs** and record them in WIKI.md — resolve each to a live account, don't trust a bare `@handle` in body copy.
- **Signature gaps.** If the ranked set missed images that pages/*.md flag as important (hero, team, office), curl those specific URLs by hand — the cap is a budget, not a ceiling on what matters.

## 5. Screenshots (best-effort)

```
bash ${CLAUDE_SKILL_DIR}/scripts/screenshot.sh <origin> clients/<slug>/assets/screenshots/home-fold.png 1440,900 --fold
bash ${CLAUDE_SKILL_DIR}/scripts/screenshot.sh <origin> clients/<slug>/assets/screenshots/home.png
bash ${CLAUDE_SKILL_DIR}/scripts/screenshot.sh <url> clients/<slug>/assets/screenshots/<page-slug>.png   # 3–4 key pages
bash ${CLAUDE_SKILL_DIR}/scripts/screenshot.sh <origin> clients/<slug>/assets/screenshots/home-mobile.png 390,844 --fold
```

The script self-installs Chromium once if missing. If screenshots still fail, continue without them and record the degradation in WIKI.md — never abort for this.

## 6. Extract their design system → DESIGN.md

1. **Published guidelines?** Grep all fetched HTML for links matching `brand|styleguide|style-guide|design-system|press|media-kit|storybook`. Probe `<origin>/{brand,styleguide,design,press}` with fetch-page.sh. If found: fetch it — it is the authoritative source; mark DESIGN.md `source: published (<url>)`.
2. Otherwise **infer**: download up to 5 linked same-site stylesheets to `meta/css/`, then extract signals — CSS custom properties, `font-family` stacks, `@font-face`/Google Fonts links, hex/rgb colors by frequency (`grep -oE` + `sort | uniq -c | sort -rn`), border-radius values. If stylesheets are sparse (client-rendered SPA), also grep the HTML and inline `<script>`/JSON for an embedded theme data-model (`__NEXT_DATA__`, `window.__…`, keys like `colors`/`colori`, `fonts`/`caratteri`) — tokens frequently live there rather than in CSS. Cross-check against the screenshots you took. Mark `source: inferred`.

Write `clients/<slug>/DESIGN.md`:

```markdown
# <Company> — design system   (source: published <url> | inferred, <date>)
## Logo            <file in assets/images/, formats seen>
## Colors          | role (bg/ink/accent/...) | value | evidence |
## Typography      families + weights + where loaded from (Google Fonts URL, @font-face)
## Spacing & shape spacing rhythm, border-radius habits, container widths
## Imagery style   photography vs illustration, subjects, color grading, stock vs real
## Components observed   buttons, cards, nav pattern — one line each
## Brand anchors   the non-negotiables a rebuild must respect: logo, exact brand colors, name styling
```

## 7. Synthesize WIKI.md

Write `clients/<slug>/WIKI.md` — the knowledge base index, everything sourced from `pages/`:

```markdown
# <Company> — wiki   (crawled <date>, <n> pages)
## Company overview      what they do, for whom, since when, where
## Offerings             | name | one-liner | source page |
## People & team         names, roles, who gets a photo
## Proof points          clients, numbers, awards, testimonials (verbatim quotes)
## Contact, locations & socials   social handles resolved to live-account URLs, not bare @handles from copy
## Voice notes           3–5 observations with quoted phrases (depth is /feel's job)
## Crawl map             | page | pages/*.md | meta/*.html | screenshot |
## Asset inventory       | image file | source page | subject (team/office/product/logo...) | alt |
## Degradations          anything skipped or failed (no sitemap, no screenshots, SPA fallback...)
```

The **Asset inventory subject column matters** — /feel ranks visual motifs from it.

## 8. Report

Summarize for the user: pages captured (n of selected), images (n), screenshots (n or why not), DESIGN.md source (published/inferred), 2–3 notable findings, and point to `clients/<slug>/WIKI.md`. Suggest `/feel` as the next step.

## Edge cases

- **Unreachable site** → stop with the exact curl error after trying variants.
- **Huge sitemap** (blogs/shops) → selection cap handles it; note what classes of pages were dropped.
- **Auth-walled/429 pages** → `[skip]` lines; back off (sleep 5) once on 429, then move on.
- **JS-shell SPA everywhere** → WebFetch fallback per page + screenshots carry the visual load; note it.
- **CSS client-rendered / tokens in JS** → sparse stylesheets (SPA): design tokens often sit in an embedded JS/JSON data-model (`__NEXT_DATA__`, `window.__THEME__`, a theme object keyed `colors`/`colori`, `fonts`/`caratteri`). Grep the HTML + inline scripts for hex colors and font names before leaning on screenshots alone.
- **Re-run** → refresh in place; FEEL.md is preserved.
