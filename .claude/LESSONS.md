# Pipeline lessons — enforced, not remembered

The rule (see CLAUDE.md): a **recurring** human correction becomes a skill/reference edit or a design-library fix, logged here with *where it's now enforced*. This is the institutional memory the next retro and `/create`'s closing step start from — so a lesson diagnosed once doesn't recur two builds later (which is exactly what happened before this file existed: em-dash copy-tells were diagnosed 2026-06-27 and recurred 2026-06-29 because the fix lived in a retro doc, not the skill).

How to use it:
- **Before a build**, skim the table — these are the known traps.
- **After a build**, if the user corrected something more than once, add a row here **and** make the enforcing edit in the same pass. A row with no "enforced in" target is a TODO, not a lesson learned.

## Seeded 2026-07-02 (from mining `prev-conversations/`)

Recurring misses across the gen-1 builds (gartnerei-stein/hamer, gut-stellmoor) and the first current-pipeline build (dirittoeconsulenza), each now folded into the tooling:

| # | Recurring lesson | Now enforced in |
|---|---|---|
| 1.1 | First-pass build reads "Claude-generated / templated" | `create` step 3 (first-pass AI-default test) + step 7 (self-critique gate before showing the user) |
| 1.2 | Hero chronically low-energy; users want it to "pop" | `create` step 3 ("the hero is the thesis") + `reinterpretation-playbook.md` ("make the hero pop") |
| 1.3 | Em-dashes / AI copy-tells (diagnosed 06-27, recurred 06-29) | `create` step 7 (copy authenticity) + `scripts/authenticity-lint.sh` gate in step 9 |
| 1.4 | Over-reaches for dark backgrounds; users pull them back | `create` step 3 (dark = deliberate accent, not a default) + Gotchas |
| 1.5 | Library unlayered CSS out-specifies Tailwind utilities | `design-library/treatments/*.css` (`@layer components`) + `index.css` order pin + `TreatedImage` `fill` + `adding-components.md` checklist |
| 1.6 | Dev server crashes/collides the user's machine (port 3000) | `create` step 9 (never auto-spawn `npm run dev`) + Gotchas + `allowed-tools` narrowed to `npm run build`/`lint` |
| 1.7 | Scaffold: dot-dir rejected by create-next-app@16; write-before-read 3× | `create` step 4 (`scaffold-tmp`, read-before-overwrite) + Gotchas |
| 1.8 | shadcnblocks near-zero value on signature sites; MCP add = `[object Promise]` | `create` step 6 + `blocks-workflow.md` (Mental model + Known issues) |
| 1.9 | genmedia image-gen existed in gen-1, dropped in gen-2, requested back 2× | `references/known-gaps.md` (documented gap + re-integration sketch; no code this pass) |
| 1.10 | `StatBlock` fails Next-16 lint (synchronous setState in effect) | `design-library/components/StatBlock.tsx` + `hooks/usePrefersReducedMotion.ts` |
| 1.11 | Static full-page screenshots miss scroll-triggered state (count-ups read 0) | `create` step 9 (scroll-state caveat) + Gotchas |
| 2.1 | Image ingestion dumb (20-cap, DOM order) → stock slips in, curation manual | `wiki` `download-images.sh` (value-ranking) + step 4 |
| 2.2 | SPA / 403 anti-bot routine; tokens hide in JS data-models | `wiki` `fetch-page.sh` (browser Accept headers) + step 6 + Edge cases |
| 2.3 | Real logo + social handles not reliably captured | `wiki` step 4 (logo first-class + socials) + step 7 (WIKI.md contact/socials) |
| 3.1 | `/feel`'s "copy first, then eyes" is the healthy step — protect it | `feel` step 2 (why it works) + Edge cases (degraded confidence, upstream-wiki dependency) |
| 4.1 | Retros don't propagate into skills — the meta-cause | CLAUDE.md convention + `create` step 8 closing step + this file |
| 4.3 | Scrollytelling / video patterns rebuilt from scratch each time | `design-library` `Video`, `Scrollytelling`, `useScrollProgress` |

**Not yet proven:** every `create`-side fix above is validated only as far as isolation allows (typecheck, lint fixtures, cascade reasoning) — the definitive test is the next real `/create` run. Confirm them there, then update this file.
