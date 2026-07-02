# Nutz.inc design library

The agency's shared component library. `/create` builds every client site from
it, and every project contributes generalized components back — the library is
meant to compound.

## Philosophy

- **Reinterpret, never clone.** Components exist to re-express a client's
  motifs (their office, their people, their numbers) in a distinctive way —
  not to reproduce their current site or a generic template.
- **Treatments as utilities.** Visual signatures (sketch, duotone, grain) are
  CSS classes + tiny components, so any image or section can adopt them.
- **Personalization is evidence-driven.** Which components a site uses follows
  from `clients/<domain>/FEEL.md`, not taste alone.
- **Zero dependencies.** React + Tailwind utilities + the CSS in this folder.
  No UI kits, no CSS-in-JS.
- **Blocks are structure, we are soul.** `/create` may pull conventional
  sections from shadcnblocks (`@shadcnblocks`), but the token bridge re-skins
  them into the client's system and every signature moment comes from here.

## Consuming (wired by /create)

Import via the `@library/*` alias — never copy files out of the library:

```tsx
import { Section } from "@library/components/Section";
```

```jsonc
// tsconfig.json → compilerOptions.paths
"@library/*": ["./design-library/*"]
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "../design-library/index.css";
```

If Tailwind ever misses classes used inside the library, add
`@source "../design-library";` to globals.css.

## Component index

| Component | What it does | Since |
|---|---|---|
| `Section` | Page-section wrapper: eyebrow/title/intro + width presets | seed |
| `Prose` | Long-form copy with readable measure (`.dl-prose`) | seed |
| `Marquee` | Infinite ticker for logo walls / client names, reduced-motion safe | seed |
| `StatBlock` | Oversized stat with count-up on scroll into view | seed |
| `SketchPortrait` | Photo → hand-drawn pencil sketch (SVG filter), rough frame | seed |
| `TreatedImage` | Photo → duotone/halftone in the project palette (`fill` = cover) | seed |
| `Video` | Self-playing muted background/inline video, reduced-motion → poster | 2026-07 |
| `Scrollytelling` | Sticky visual stepped by scroll progress, static fallback | 2026-07 |
| `Timeline` | Vertical dated sequence (CV, history) with accent dots on a rule | 2026-07 |
| `IndexList` | Numbered index (roman/arabic) for service/practice lists, ruled rows | 2026-07 |

Treatments (`treatments/*.css`): `.dl-sketch-frame`, `.dl-treated-duotone`,
`.dl-treated-halftone`, `.dl-treated-fill`, `.dl-grain`. Tokens:
`tokens/tokens.css` (`--dl-*`). Hooks (`hooks/*`): `usePrefersReducedMotion`,
`useScrollProgress`.

## shadcn token bridge

`shadcn-tokens.css` points shadcn's theme variables (`--primary`,
`--background`, `--radius`, …) at our `--dl-*` tokens. `/create` pastes it into
`app/globals.css` after our `index.css`, so any shadcnblocks block inherits the
client's palette, type, and radius with no per-block restyling. Set the client
values on `--dl-*` once; shadcn tokens follow.

## Contributing

See [docs/adding-components.md](docs/adding-components.md). Short version:
generalize (props + `--dl-*` vars, no client specifics), header comment with
origin, reduced-motion handled, one line added to the index above.
