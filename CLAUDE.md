# build-template — Nutz.inc website pipeline

This repo rebuilds a client's website with a personalized feeling. Clone it per client, then run the pipeline:

1. `/wiki <website>` — ingest the client's current site into `clients/<domain>/`: crawled pages, downloaded images, full-page screenshots, their design system (`DESIGN.md`), and a synthesized knowledge base (`WIKI.md`).
2. `/feel` — read the copy and *look at* the visuals, then write `clients/<domain>/FEEL.md`: what the company is trying to achieve and highlight, with evidence, plus signature elements to reinterpret.
3. `/create` — build the new Next.js + Tailwind site at the repo root using `design-library/` + `WIKI.md` + `FEEL.md`, reinterpreting their motifs distinctively instead of copying their site.

Human checkpoints between steps: review WIKI.md/DESIGN.md after `/wiki`, review FEEL.md after `/feel`, confirm creative direction at the start of `/create`.

## Layout

| Path | What it is |
|---|---|
| `.claude/skills/{wiki,feel,create}/` | The three pipeline skills |
| `clients/<domain>/` | One folder per ingested client site (WIKI.md, DESIGN.md, FEEL.md, pages/, assets/, meta/) |
| `design-library/` | Nutz.inc's shared component library — grows with every project |
| `components.json`, `.mcp.json`, `.env.local` | shadcnblocks private registry (`@shadcnblocks`) + its MCP server + API key |
| `.claude/settings.json`, `.claude/scripts/` | Project hooks (e.g. conversation logging) and their scripts |
| `conversations/` | Raw transcript of every Claude session (auto-saved, gitignored) |
| `app/`, `public/`, ... | The client's new Next.js site, scaffolded at repo root by `/create` |

## Conventions

- **Domain slug**: final URL after redirects → strip scheme, `www.`, and path → `clients/acme.com/`.
- **Client-folder resolution** (used by `/feel` and `/create` when no argument is given): exactly one folder under `clients/` → use it; multiple → match the argument or ask; none → run `/wiki <site>` first.
- **Design library**: import via the `@library/*` alias — never copy files out of it. New reusable components built during `/create` get generalized and contributed back into `design-library/` (see `design-library/docs/adding-components.md`).
- **Lessons feed back into skills, not retro files**: a *recurring* human correction (seen more than once) becomes a skill/reference edit or a design-library fix, logged in `.claude/LESSONS.md` with where it's now enforced — never left in a session transcript or a throwaway retro doc. That closed loop is why the pipeline compounds instead of repeating the same misses; `/create`'s closing step and the next retro both start from `LESSONS.md`.
- **shadcnblocks**: `/create` can pull page blocks from the `@shadcnblocks` private registry via the `shadcn` MCP server. Blocks are structure only — the token bridge (`design-library/shadcn-tokens.css`) re-skins them into the client's design system, and signature moments stay in the design library. The API key lives in `.env.local` (gitignored); the registry is declared in `components.json`. See `.claude/skills/create/references/blocks-workflow.md`.
- **Design-skill layer**: `/create` leans on four installed design skills — `frontend-design` (direction), `ui-ux-pro-max` (queryable UX + stack rules), `make-interfaces-feel-better` (exact polish values), `web-design-guidelines` (compliance audit) — one lane each. They govern *how well we build*, never *what the client is*: DESIGN.md/FEEL.md always win over any palette or style a skill suggests. Installed under `.agents/skills/` (symlinked into `.claude/skills/`), hash-locked in `skills-lock.json`. See `.claude/skills/create/references/design-skills.md`.
- **Evidence rule**: claims about a client in FEEL.md cite paths (`pages/about.md`, `assets/screenshots/home.png`). No unbacked adjectives.
- **Brand rule for the built site**: keep the client's name, logo, true facts, and real copy substance; the layout, typography, and imagery treatment are ours, driven by FEEL.md.
- **Stack**: Next.js (App Router, TypeScript) + Tailwind v4 + shadcn/ui. Structure can come from shadcnblocks; the feeling comes from `design-library/` and hand-rolled code. No CSS-in-JS.
- **Conversation logging**: `Stop` and `SessionEnd` hooks in `.claude/settings.json` run `.claude/scripts/save-conversation.py`, which writes each session's full transcript to `conversations/<date>_<session-id>.md` (regenerated every turn). Feed one back into a new session for continuity. Transcripts are gitignored — they can contain secrets verbatim.
