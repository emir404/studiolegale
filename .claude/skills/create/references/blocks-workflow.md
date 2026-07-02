# Blocks workflow — shadcnblocks, on our terms

We have a shadcnblocks.com membership wired in as a private registry
(`@shadcnblocks`) that `/create` can pull from via the shadcn CLI and its MCP
server. Blocks are a **speed tool for conventional structure**, never a
substitute for the personalized feeling.

## Mental model

- **Blocks = structure.** Navbars, footers, pricing tables, FAQ accordions,
  logo clouds, CTA bands, feature grids — the plumbing every site needs and
  nobody should hand-roll.
- **Token bridge = skin.** `design-library/shadcn-tokens.css` points shadcn's
  theme variables at our `--dl-*` tokens (carrying the client palette from
  DESIGN.md). Once `/create` writes it into `app/globals.css`, every block
  inherits our colors, type, and radius automatically. This is why a pulled
  block looks like ours, not like stock shadcn.
- **Design library + FEEL.md = soul.** The signature moments (hand-drawn
  portraits, duotone office, marquee, oversized stats) come from
  `design-library/` and the reinterpretation playbook. A block never carries a
  signature moment unreinterpreted.

Rule of thumb: if FEEL.md's "signature elements to reinterpret" table names it,
**you build it** from the design library. Everything else is fair game for a
block — re-skinned by the token bridge and trimmed to the client's real copy.

**Set expectations low on signature-heavy sites.** When FEEL.md's motifs carry
the site, blocks earn their keep only at the edges: hand-roll the branded shell
(hero, the signature sections, the overall rhythm) and pull blocks for the
genuinely conventional parts — contact, pricing, FAQ, footer, logo clouds,
form/UI primitives. On the one real build so far, blocks added near-zero value
against a custom design system. If you're re-skinning a block so heavily it's
unrecognizable, you wanted a library composition, not a block.

## Setup state (already in the template)

- `.mcp.json` runs `npx shadcn@latest mcp` — the server auto-discovers
  `@shadcnblocks` from `components.json`.
- `components.json` declares the registry + Bearer auth via
  `${SHADCNBLOCKS_API_KEY}`.
- `.env.local` holds the key (gitignored). The shadcn CLI **and** the MCP
  server read it from the project root.

If MCP browse calls fail with an auth error, confirm `.env.local` exists at the
repo root with `SHADCNBLOCKS_API_KEY=...`.

## Discover

Prefer the MCP server (tools are namespaced `mcp__shadcn__*`) — ask it in
natural language, scoped to our registry:

- "Search @shadcnblocks for pricing sections with a comparison table"
- "Show me navbar blocks from @shadcnblocks"
- "View @shadcnblocks/hero125"

Or from the CLI:

```bash
npx shadcn@latest view @shadcnblocks/hero125   # inspect before adding
```

Block ids are `@shadcnblocks/<name><n>` — e.g. `hero125`, `pricing3`,
`features8`, `navbar1`, `footer7`. Browse the catalog at shadcnblocks.com.

## Add

```bash
npx shadcn@latest add @shadcnblocks/pricing3
```

This reads `.env.local` for auth, drops the block into `components/` (pulling
any `components/ui/*` primitives and npm deps it needs), and wires imports to
our aliases. Requires the scaffold + `lib/utils.ts` + runtime deps to exist
(see /create step 4) — run adds only after that.

## Known issues

- **MCP add-command returns `[object Promise]`.** The `shadcn` MCP server's
  "add command" convenience field sometimes serializes an unresolved promise
  instead of the command string. Ignore that field and run the add yourself:
  `npx shadcn@latest add @shadcnblocks/<id>`. Discovery/search/view via MCP are
  fine — it's only that one field that's unreliable.

## Re-skin audit (do this to every block you add)

The token bridge handles the common case (well-built blocks use only token
utilities like `bg-background`, `text-muted-foreground`, `rounded-lg`). Some
blocks still hardcode — real shadcnblocks blocks mix token utilities with stray
`bg-black/5`, `text-black/40`, and white/black gradient fades in arbitrary
values. After adding, grep the block and fix every hit:

```bash
grep -nE 'bg-(white|black|gray-|zinc-|slate-|neutral-|blue-|indigo-)|text-(white|black|gray-|zinc-|slate-)|(stroke|fill)-black|(stroke|fill)-white|#[0-9a-fA-F]{3,6}|--color-(white|black)|(from|via|to)-(white|black|[a-z]+-[0-9])|-\[[^]]*(white|black|#)' components/<block>.tsx
```

The `-\[...\]` and `--color-(white|black)` clauses catch arbitrary values like
`after:bg-[linear-gradient(var(--color-transparent),var(--color-white))]` — a
fade-to-white that should fade to `var(--color-background)` so it tracks the
client's paper color instead of hard white.

Replace with token utilities so the client palette drives everything:

| hardcoded | use |
|---|---|
| `bg-white`, `bg-gray-50` | `bg-background`, `bg-muted`, `bg-card` |
| `text-black`, `text-gray-900` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `bg-blue-600` (a brand accent) | `bg-primary` + `text-primary-foreground` |
| `bg-black/5`, `stroke-black/40` | `bg-foreground/5`, `stroke-foreground/40` |
| `border-gray-200` | `border-border` |
| `...to var(--color-white)` gradient | `...to var(--color-background)` |
| `rounded-[10px]` | `rounded-lg` (tracks our `--radius`) |
| a hardcoded font family | remove it — inherits `--font-sans` from the bridge |

Also swap the block's external placeholder images (e.g. `cloudfront.net/...
placeholder-1.svg`) for the client's assets from `public/images/`, treated per
FEEL.md where they carry meaning.

Also: strip the block's placeholder copy and swap in the client's real content
from `clients/<domain>/pages/*.md`; replace stock/lorem images with the
client's assets (treated per FEEL.md where they carry meaning).

## Personalize (don't ship a stock block for a signature moment)

A block gives you a correct, on-palette skeleton. For any section FEEL.md flags
as signature, replace the block's generic treatment with ours:

- Block's plain avatar row for a team → swap in `SketchPortrait` from the library.
- Block's photo grid for the office → `TreatedImage` (duotone) or an
  illustrated hero per the reinterpretation playbook.
- Block's logo grid → `Marquee` with client names in display type.
- Block's stat row → `StatBlock` count-ups.

The block handles layout and responsiveness; our components carry the feeling.

## Fallback

No membership / registry down / offline → skip blocks entirely and compose the
page from `design-library/` primitives by hand. The site must never depend on a
block being reachable at build time (blocks are copied into the repo on add, so
once added they're vendored and safe).
