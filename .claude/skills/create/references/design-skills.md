# Design skills — our craft layer, on our terms

Four installed design skills sharpen *how well we build*. They never decide
*what the client is* — that stays with `DESIGN.md` (brand anchors) and `FEEL.md`
(the feeling). Like shadcnblocks, they're a means: structure and craft in,
personalized feeling still ours.

They're hash-locked from upstream in `skills-lock.json` — **read or invoke them,
never copy their text into our skills** (it silently drifts on the next re-sync).

## The one rule that resolves every conflict

Authority is layered; the most-specific wins:

1. **`FEEL.md`** — the feeling and the signature motifs. Owns *direction*.
2. **`DESIGN.md`** — brand anchors: logo, exact colors, type, name styling.
3. **`design-library/` + reinterpretation-playbook** — our signature techniques
   and the `--dl-*` token system.
4. **then** the design skills — execution quality *within* that frame.

So `ui-ux-pro-max` may hand back a pink+lavender spa palette — **take its UX
rules, ignore its palette.** `frontend-design` may propose a Signature — keep it
only if it serves a FEEL.md motif. The design skills raise the floor; they never
override the brief.

## Lane map — one job each, no turf overlap

| /create step | Skill | Use it for | Never for |
|---|---|---|---|
| 3 · direction | **frontend-design** | Token-system + Signature brainstorm, then critique vs its "AI-default" looks | Replacing FEEL.md's motifs |
| 3 · direction | **ui-ux-pro-max** | `--domain ux` rules, `--stack` patterns, structure ideas | Palette / fonts / tokens; **no `--persist`** |
| 7 · build | **make-interfaces-feel-better** | Exact polish numbers (radius, press, outlines, stagger, `tabular-nums`) | — (it's the source of truth for these) |
| 9 · verify | **web-design-guidelines** | Automated web-standards / a11y audit (`file:line`) | Being the *only* review — `/rams` is the human pass |

---

## frontend-design — design direction (step 3)

Prose discipline, no scripts. Invoke `/frontend-design`, or read
`.agents/skills/frontend-design/SKILL.md`. Run its two passes **before** you
draft the direction:

1. **Brainstorm a compact token system** — 4–6 named colors, 2+ type roles
   (characterful display + body + utility), layout in one-sentence prose +
   ASCII, and **one Signature**: the single element the page is remembered by.
2. **Critique it against the brief** and against its three "AI-default" clusters
   — (a) cream ~`#F4F1EA` + high-contrast serif + terracotta; (b) near-black +
   one acid-green/vermilion accent; (c) broadsheet hairlines, zero radius, dense
   columns. If our concept lands on one, spend the free axis elsewhere.

Fold the *output* in, not the *colors*: colors come from DESIGN.md; the value
here is the structure, the Signature, and the critique. Keep its quality floor
(responsive to mobile, visible keyboard focus, reduced-motion) and its restraint
doctrine — "spend your boldness in one place," which already echoes the
playbook's "one loud move beats five quiet ones."

## ui-ux-pro-max — queryable UX + stack rules (steps 3 & 7)

A Python BM25 search over CSV data. **Correct path for this repo** — the skill's
own docs say `skills/ui-ux-pro-max/...`, which fails here; use:

```bash
# UX guidelines (reduced-motion, contrast, touch targets, spacing)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<sector> landing layout ux" --domain ux -n 3
# framework-specific patterns
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "navigation performance images" --stack nextjs
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form card dialog" --stack shadcn
```

- **Use:** `--domain ux` (99 guidelines), `--stack nextjs|react|shadcn`, and
  structure/pattern ideas. Read-only — the queries above write nothing.
- **Never** `--design-system` for palette/tokens/fonts (it returns a
  *conventional default* that fights DESIGN.md and everything frontend-design is
  built to push past), and **never `--persist`** — that writes a competing
  `design-system/<slug>/MASTER.md` token contract that collides with our
  `--dl-*` system.
- **Scope:** its "Pre-Delivery Checklist" and "Common Rules" are labeled *App UI
  (iOS/Android/RN/Flutter)* — partially out of scope for a Next.js website. Lean
  on `ux` + `--stack` + Quick-Reference §1–3; skip the mobile-only items.
- Where its numbers disagree with make-interfaces-feel-better (press scale,
  stagger timing), **MIFB wins** (below).

## make-interfaces-feel-better — exact polish values (step 7)

Read `.agents/skills/make-interfaces-feel-better/SKILL.md` + its topic files
(`typography.md`, `surfaces.md`, `animations.md`, `performance.md`), or invoke
`/make-interfaces-feel-better`. **Single source of truth for web polish
numbers.** Apply per section as you build:

- **Concentric radius:** `outer = inner + padding` — the #1 thing that reads
  "off." Padding > 24px → treat layers as separate surfaces.
- **Press:** `scale 0.96` (never < 0.95). Icon swap: `scale 0.25→1`,
  `opacity 0→1`, `blur 4→0`; spring `{duration:0.3, bounce:0}` if a motion lib
  is present, else `cubic-bezier(0.2,0,0,1)`.
- **Image outlines:** `rgba(0,0,0,.1)` light / `rgba(255,255,255,.1)` dark —
  never a tinted near-black (reads as dirt on the edge). Matters for
  `TreatedImage` and hero photos.
- **Shadows over borders:** layered ring + lift + ambient — but *not* on dividers.
- **Type rendering:** `text-wrap: balance` on headings, `pretty` on body,
  `-webkit-font-smoothing: antialiased` at root, `tabular-nums` on any
  updating/animated number — including `StatBlock` count-ups.
- **Enter/exit:** stagger ~100ms (title words ~80ms); exit faster than enter
  (~150ms vs 300ms) with a small `translateY(-12px)`.
- **Perf:** never `transition: all` (name the properties); `will-change` only
  for transform/opacity/filter, only on observed first-frame stutter.

Our library components already respect reduced-motion — match them in anything
new. Its Before/After table format is a handy self-review if a section feels off.

## web-design-guidelines — compliance audit (step 9)

Invoke `/web-design-guidelines app/**/*.tsx components/**/*.tsx`. It WebFetches
Vercel's live Web Interface Guidelines and reports `file:line`. Needs internet +
WebFetch (granted in /create's `allowed-tools`); the first run may prompt once.

- **Lane: automated web-standards / a11y compliance.** Run it once at verify;
  fix what it flags.
- Then `/rams` for the broad *human* accessibility + visual review. These two
  are the pair — automated standards + judgment. Don't also stack MIFB's
  checklist and ui-ux-pro-max's pre-delivery list as separate passes; that's the
  same a11y basics re-checked four times.
- Offline / WebFetch blocked → say so and lean on MIFB's checklist + `/rams`.

## Permissions

`/create`'s frontmatter grants `Bash(python3 .claude/skills/ui-ux-pro-max/scripts/search.py *)`
and `WebFetch`. If a python3 search is blocked, check that you're calling the
exact `.claude/skills/...` path above (the permission is scoped to it).
