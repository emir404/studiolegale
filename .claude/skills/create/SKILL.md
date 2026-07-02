---
name: create
description: Build the client's new website (Next.js App Router + TypeScript + Tailwind v4) at the repo root, using our design-library + shadcnblocks blocks + the client's WIKI.md + FEEL.md — reinterpreting their signature motifs with a personalized feeling instead of copying their site. Use after /feel, when the user says "create", or asks to build/rebuild the client's site. Step 3 of the wiki → feel → create pipeline.
argument-hint: [domain]
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx create-next-app *), Bash(npx shadcn *), Bash(npm install *), Bash(npm i *), Bash(npm run build), Bash(npm run lint), Bash(mv *), Bash(mkdir *), Bash(cp *), Bash(python3 .claude/skills/ui-ux-pro-max/scripts/search.py *), Bash(bash .claude/skills/create/scripts/*), Bash(npx -y playwright *), WebFetch
---

# /create — build the site they should have

Their content, our craft. The result must be visibly *theirs* (name, logo, true facts, real copy substance) and visibly *not their old site* (our layout, typography, and treatments, driven by FEEL.md).

## 1. Resolve and require

Resolve the client folder (same rule as /feel: `$ARGUMENTS`, else the single `clients/<domain>/`, else ask). Hard requirements:
- `WIKI.md` + `DESIGN.md` missing → stop: run `/wiki <site>` first.
- `FEEL.md` missing → stop: run `/feel` first. Never improvise the feeling.

If a Next.js app already exists at the repo root (`app/` + `package.json`), this is an **iteration**: skip scaffolding, apply changes incrementally, and confirm with the user before anything destructive.

## 2. Ingest

Read `FEEL.md` (the brief), `DESIGN.md` (brand anchors), `WIKI.md`, the `pages/*.md` you need for content, `design-library/README.md` (component index), and 2–3 screenshots — as the thing to **diverge from**, not copy.

## 3. Creative direction (checkpoint)

First sharpen the direction with our craft skills — mechanics + the guardrails that keep each in its lane are in [references/design-skills.md](references/design-skills.md):

- **`/frontend-design`** — brainstorm a token system + one **Signature**, then critique it against the brief. Run its three "AI-default looks" test **on the first pass, now** — not after the user complains. Every generated first build so far has read templated until forced otherwise; assume yours does too and disprove it. If the concept resembles a default (generic SaaS, centered-hero-on-gradient, bento-of-cards, stock-photo grids), change it before showing anyone. It sharpens *execution*; FEEL.md still owns the motifs, DESIGN.md the palette.
- **`ui-ux-pro-max`** — mine UX rules and structure, never palette: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<sector> layout ux" --domain ux` and `--stack nextjs`. Ignore its colors/fonts — DESIGN.md wins.

**The hero is the thesis.** It's the first and last thing they see — spend your boldest move here: one arresting idea (a signature treatment at scale, a striking type moment, real imagery reinterpreted), *not* a centered eyebrow → title → intro → button stack. If the hero doesn't make *you* pause, it won't make them. Carry the frontend-design Signature here or in the first scroll. See [references/reinterpretation-playbook.md](references/reinterpretation-playbook.md) → "make the hero pop".

**Dark backgrounds are an accent, not a default.** Reach for dark only where DESIGN.md/FEEL.md actually point (a deliberate anchor moment for gravitas). Don't paint sections dark to manufacture contrast on a client whose real palette is light/warm — respect their true system and find contrast in scale, type, and treatment instead. Over-reaching for dark is a repeat correction.

Then draft and show the user before writing code:

- **Concept** — one paragraph: the feeling the new site delivers and how.
- **Keep** — brand anchors from DESIGN.md: logo, name, true brand colors, real copy facts.
- **Change** — what we deliberately drop or invert from their current site (per the say–show gap).
- **Signature moves** — 2–4 reinterpretations chosen from FEEL.md's table, each mapped to a concrete technique from [references/reinterpretation-playbook.md](references/reinterpretation-playbook.md). One carries the frontend-design **Signature**; none should read as a templated default.
- **Hero** — name the one bold move the hero makes.
- **Pages** — home + 2–4 more (from WIKI.md's structure; less is fine).

Adjust to feedback, then record the final version — concept, keep/change, signature moves, hero — as a comment block at the top of `app/page.tsx` or in the report. Don't proceed while the user objects.

## 4. Scaffold (fresh builds only)

The repo root already has files, and `create-next-app` refuses non-empty dirs — scaffold into a temp dir and move. Name it **`scaffold-tmp`** (no leading dot — create-next-app@16 rejects a dot-directory target):

```bash
npx create-next-app@latest scaffold-tmp --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

Then from `scaffold-tmp/`: **discard** its `README.md`; **merge** its `.gitignore` lines into ours; `mv` everything else (including dotfiles) to the repo root; remove `scaffold-tmp`. Set the package.json `name` to the client slug (dots/invalid chars → dashes). If the scaffold fails (offline/registry), say so and stop rather than hand-rolling a broken app.

**Read before you overwrite.** You rewrite `app/globals.css`, `app/layout.tsx`, and `app/page.tsx` below — `Read` each once before the first `Edit`/`Write`. Edit refuses an unread file, and skipping this has cost a retry on all three, every build.

The template already ships `components.json`, `.mcp.json`, and `.env.local` (the shadcnblocks registry + key) at the repo root — **keep them**; the scaffold's `mv` must not clobber them. Then wire the library:
- `tsconfig.json` → `compilerOptions.paths`: add `"@library/*": ["./design-library/*"]`.

## 5. Design system: tokens + shadcn bridge

This step is what makes both our components **and** every shadcnblocks block render in the client's design system.

1. Install the shadcn runtime (so blocks and their `ui/*` primitives compile): `npm i class-variance-authority clsx tailwind-merge lucide-react tw-animate-css`. Write `lib/utils.ts` with the standard `cn()` helper (`clsx` + `tailwind-merge`).
2. Rebuild `app/globals.css` in this order:
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "../design-library/index.css";   /* --dl-* tokens + treatments */
   /* ...paste design-library/shadcn-tokens.css here (the bridge)... */
   ```
   Keep `tailwindcss` **first** — the library pins its treatment rules into the `components` layer so per-instance utilities override them, which only holds when Tailwind's layers are declared ahead of `index.css`. Then set the client's real values on the `--dl-*` tokens (in a `:root` override): `--dl-ink`, `--dl-paper`, `--dl-paper-soft`, `--dl-ink-soft`, `--dl-accent`, `--dl-radius-md`, `--dl-font-body`, `--dl-font-display` — all from DESIGN.md brand anchors + direction. The bridge feeds those into shadcn's `--primary`/`--background`/`--radius`/etc., so blocks follow automatically. If a brand color fails contrast, adjust and note the divergence in the direction record.
3. Fonts via `next/font` (Google families from DESIGN.md, else a close stack); assign their CSS vars to `--dl-font-body` / `--dl-font-display`.
4. Copy **only the images the direction uses** from `clients/<domain>/assets/images/` into `public/images/`, logo included. Never hotlink the client's live site.

## 6. Blocks (shadcnblocks) for structure

Use blocks to move fast on conventional sections; keep the signature moments ours. Full guide: [references/blocks-workflow.md](references/blocks-workflow.md).

**Expect little on signature-heavy sites.** When FEEL.md's motifs carry the site, blocks deliver near-zero value — hand-roll the branded shell and pull blocks only for genuinely conventional parts (contact, pricing, FAQ, footer, form/UI primitives). Don't force a block where a library composition belongs.

- **Discover** via the `shadcn` MCP server (`mcp__shadcn__*`, natural language scoped to `@shadcnblocks`) or `npx shadcn@latest view @shadcnblocks/<id>`.
- **Add**: `npx shadcn@latest add @shadcnblocks/<id>` (reads `.env.local` for auth; vendors the block + its `ui/*` primitives into `components/`). The MCP add-command helper often returns the literal string `[object Promise]` instead of a command — ignore it and run `npx shadcn@latest add` yourself.
- **Re-skin audit** every added block: grep for hardcoded colors/fonts (`bg-white`, `text-gray-*`, `#hex`, `bg-blue-*`, hardcoded font families) and swap to token utilities (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `border-border`). The bridge handles well-built blocks automatically — this catches the rest.
- **Never** ship a stock block for a section FEEL.md marks signature. Blocks carry layout; our library components carry the feeling (swap a block's avatar row for `SketchPortrait`, its photo grid for `TreatedImage`, its logo grid for `Marquee`, its stat row for `StatBlock`).

## 7. Build

Order: layout shell → home, section by section → secondary pages → polish.

- `app/layout.tsx`: metadata from WIKI.md (title, description, OG), header with logo + nav, footer with real contact data.
- Each section is either a **re-skinned block** (conventional structure) or a **library composition** (signature moments) — both draw the same tokens, so the page reads as one system. Copy substance comes from `pages/*.md`, tightened in their tone (FEEL.md) — never invent facts, clients, or numbers.
- **Copy authenticity** — write like a person, not a model. No em/en dashes (`—`/`–`) in client-facing copy: use commas, periods, or rewrite. Avoid AI-tell phrasing ("whether you're", "elevate your", "seamless", "in today's", "look no further", "nestled", "trusted partner", "peace of mind", "cutting-edge", "testament to"…). Step 9's `authenticity-lint.sh` enforces this — but write clean the first time.
- **Self-critique before you show the user.** Reread the built sections against FEEL.md and frontend-design's three AI-default looks. Reads like their old site restyled? Redo the section, not the palette. Reads like a generated template? Change the structure. Surface the build only once it passes your own critique — this is the top quality gap, so don't skip it.
- **Feel** — apply our exact polish values per section ([references/design-skills.md](references/design-skills.md) → make-interfaces-feel-better): concentric radius (`outer = inner + padding`), press `scale-0.96`, image outlines `rgba(0,0,0,.1)` / `rgba(255,255,255,.1)`, `text-wrap: balance` headings + `pretty` body, `tabular-nums` on `StatBlock` count-ups, stagger ~100ms with exit faster than enter, never `transition: all`. Need a framework pattern? `ui-ux-pro-max --stack nextjs`/`shadcn`.
- Polish: responsive at 390/768/1440, real alt text from the wiki, `prefers-reduced-motion` respected (library components already do).

## 8. Contribute back

Pick 1–3 genuinely reusable new components, generalize them per `design-library/docs/adding-components.md` (props + `--dl-*` vars, origin comment), move them into `design-library/components/`, import via `@library/*`, and add index lines to `design-library/README.md`. This is how the library grows — don't skip it. (Re-skinned shadcnblocks blocks stay in the app; only your own generalized pieces go back to the library.)

**Feed lessons back, not into a retro file.** If the user corrected something this build that you've seen corrected before — a recurring miss, not a one-off taste call — it belongs in the skill or a library fix, not a throwaway note. Add it to `.claude/LESSONS.md` and, where the fix is clear, make the skill/reference/library edit in the same pass. That is how the pipeline stops repeating itself (see CLAUDE.md).

## 9. Verify and report

- **Build is the gate.** `npm run build` must exit 0 — fix until it does.
- **Copy authenticity**: `bash .claude/skills/create/scripts/authenticity-lint.sh app components` — fails on em/en dashes in JSX, warns on AI-tell phrases with `file:line`. Resolve every failure before reporting.
- **Never auto-spawn `npm run dev`.** It has crashed/lagged the user's machine and collided on port 3000 — this skill is not permitted to start it. For visual QA, **ask the user to start the server and tell you the port** (they type `! npm run dev`), then — against that user-owned server — screenshot with Playwright the way `/wiki` does (`npx -y playwright ...`, full-page at 390/768/1440). Never start a second server yourself.
  - **Scroll-state caveat**: a static full-page screenshot captures the page *at rest* — `StatBlock` count-ups and any `IntersectionObserver`-gated UI show their initial `0`/hidden state. That's not a bug; scroll before shooting, or note it.
- Run `/web-design-guidelines app/**/*.tsx components/**/*.tsx` — the automated web-standards / a11y compliance pass (Vercel WIG, `file:line`; needs internet). Fix what it flags.
- Then suggest `/rams` for the broad human accessibility/design review. These two are the pair (automated standards + judgment) — don't stack every overlapping checklist; see [references/design-skills.md](references/design-skills.md).

Report: the concept recap · pages built · each signature move (FEEL.md motif → technique → file) · shadcnblocks blocks used (and re-skinned) · library components used and contributed · design skills applied (direction · polish · audit + any WIG fixes) · authenticity-lint result · build status · **the `npm run dev` command for the user to run and view it themselves**.

## Gotchas

Hard-won, all confirmed on real builds — check these before you hit them again:

- **Never auto-start `npm run dev`.** It has crashed the user's machine and collided on port 3000; the skill isn't permitted to. Build is the gate — the user runs the server (step 9).
- **`scaffold-tmp`, not `.scaffold-tmp`.** create-next-app@16 rejects a leading-dot target dir (step 4).
- **Read before overwrite.** `Read` `app/globals.css` / `layout.tsx` / `page.tsx` before the first Edit/Write — Edit refuses unread files (step 4).
- **Treatments live in `@layer components`.** A per-instance Tailwind utility (`h-full`, `object-cover`, `absolute`) overrides a `.dl-*` default — but only if `app/globals.css` imports `tailwindcss` *before* `design-library/index.css` (step 5). Need cover on a `TreatedImage`? Use its `fill` prop, don't fight the cascade.
- **shadcn MCP `[object Promise]`.** The add-command field comes back unresolved — ignore it, run `npx shadcn@latest add @shadcnblocks/<id>` yourself (step 6).
- **Static screenshots miss scroll state.** Count-ups / IntersectionObserver UI read `0`/hidden at rest (step 9).
- **Contrast divergence.** If a real brand color fails contrast, adjust and note it in the direction record — don't silently swap the palette, and don't go dark to dodge it (steps 3, 5).

## Known gaps

Generated/illustrated imagery (genmedia) is a **documented gap, not a capability** this pipeline has — see [references/known-gaps.md](references/known-gaps.md) before promising a client generated hero art. Until it's built, reinterpret real assets (playbook) or use type-forward / illustrated-SVG moves. Recurring corrections belong in `.claude/LESSONS.md` (see step 8).
