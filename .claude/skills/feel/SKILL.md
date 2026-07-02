---
name: feel
description: Read an ingested client's copy and actually look at their images and screenshots to articulate what the company is trying to achieve and highlight — then write clients/<domain>/FEEL.md with evidence-backed findings and signature elements to reinterpret. Use after /wiki, when the user says "feel", or asks what a client is going for / signaling / emphasizing. Step 2 of the wiki → feel → create pipeline.
argument-hint: [domain]
allowed-tools: Read, Glob, Grep, Write
---

# /feel — get what they're trying to say

The job: after this, **we get it**. Not a content summary (WIKI.md already is one) — an articulation of what the company wants visitors to *feel* and what they keep pushing forward, whether or not they'd say it that way themselves.

## 1. Resolve the client

`$ARGUMENTS` may name a domain. Otherwise: exactly one folder under `clients/` → use it (say which); several → ask; none, or no WIKI.md inside → stop and point to `/wiki <site>`. If FEEL.md already exists, confirm before overwriting (git has the old one).

## 2. Ingest — copy first, then eyes

Read in this order, so the visual pass tests hypotheses instead of forming them:

1. `WIKI.md`, then `DESIGN.md`
2. every `pages/*.md`
3. **every file in `assets/screenshots/`, then `assets/images/`** — Read them; actually look. Prioritize by the WIKI.md asset-inventory subject column (hero, team, office, product) if there are more than ~24 files.

**Protect this ordering — it's the healthy discipline.** Form the thesis from copy, *then* look. On the real build to date, the copy-first read produced a hypothesis that actually looking at the screenshots corrected; had the visuals framed the read first, the wrong one would have stuck. The visual pass earns its keep only when it comes second — testing the read, not setting it.

No images or screenshots at all → do a copy-only analysis and mark FEEL.md `confidence: degraded (no visuals)`.

## 3. What to look for

Weigh evidence by these signals:

- **Repetition** — whatever appears on 3+ pages is what they care about. Office photos everywhere → they're proud of the space and want you to know they're *real* and *at scale*. Headshots everywhere → they're selling people and accountability, not product.
- **Prominence** — what's above the fold on the homepage (check `home-fold.png`), what gets the biggest type, what the first `<h1>` says. First position = what they lead with.
- **Photography choices** — real photos vs stock; who gets a headshot and who doesn't; what they bothered to photograph at all (the office? the team offsite? the product UI? the factory floor?). Stock everywhere is itself a finding: an aspiration they haven't shown yet.
- **Copy tics** — recurring words and phrases (count them), the claims they repeat (scale / longevity / speed / craft / locality), the numbers they brag about, we-vs-you sentence subjects.
- **The say–show gap** — what the copy claims vs what the visuals actually demonstrate. The gap is /create's biggest opportunity.

Common motif → meaning mappings (starting points, not conclusions): big office/building shots → stability, scale, "we're real" · wall of partner/team headshots → human trust, accountability · client-logo walls → enterprise social proof · awards/badges → external validation · product screenshots → product confidence · founder photo + story → personal craft.

**Anti-generic rule**: every claim cites evidence — a page file, an image file, or a screenshot region ("`home.png`, second section"). No horoscope adjectives ("modern, clean, professional") without pointing at what shows it. When unsure, say so and mark the confidence.

## 4. Write FEEL.md

`clients/<domain>/FEEL.md`:

```markdown
# <Company> — what they're going for   (by /feel, <date>; confidence: full | degraded)

## The essence
One sentence: "<Company> wants you to feel ____ so that you ____."

## What they're trying to achieve
A short paragraph — the business goal behind the site, as the evidence shows it.

## What they highlight (ranked)
1. <highlight> — evidence: pages/about.md ("<quote>"), assets/images/office-2.jpg, home.png hero
2. ...            (3–6 items; rank by repetition × prominence)

## Visual motif inventory
| motif | count / where | inferred intent |

## Tone of voice
Axes (formal↔casual, technical↔plain, bold↔modest, warm↔corporate) + 2–3 quoted phrases that nail it.

## The say–show gap
What they claim but don't show, or show but don't claim. Frame each as an opening for the rebuild.

## Signature elements to reinterpret   ← feeds /create directly
| their motif | what it means | reinterpretation direction |
e.g. | partner headshots on every page | trust lives in people | hand-drawn portraits (SketchPortrait) — human, crafted, still *them* |
e.g. | office photos everywhere | proud of the space, signals scale | show the office a completely different way: duotone mural strip or illustrated floor-plan hero |
```

Phrase reinterpretation directions so they map to real techniques — the design library (`design-library/README.md`) and /create's playbook use: SketchPortrait, TreatedImage (duotone/halftone), Marquee, StatBlock, grain, illustrated heroes. Suggest, don't prescribe — /create makes the final call with the user.

## 5. Report

Give the user: the essence line, the top 3 highlights with their evidence, and the path to FEEL.md. Suggest reviewing/editing it, then `/create`.

## Edge cases

- **Degraded confidence** — no or thin visuals → copy-only analysis; mark `confidence: degraded (no visuals)` and label which findings are copy-only inferences. Don't assert a visual claim you couldn't actually see.
- **Wiki under-captured the signature images** — if the asset inventory is thin, or missing the very motifs the copy keeps implying (all about the space or the people, yet no office/team shots), the gap is upstream, not a real say–show gap. Say so and suggest re-running `/wiki` (its value-ranked image pass + manual signature-grab) rather than inventing a motif you can't see. FEEL.md's reinterpretation table is only as good as the assets it can point at.
