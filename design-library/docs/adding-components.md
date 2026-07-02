# Contributing components back to the library

`/create` builds client-specific sections freely. When a piece turns out to be
genuinely reusable, it gets generalized into the library — that is how the
library grows. One to three contributions per project is the healthy rate.

## Qualifies

- Solves a **recurring shape** (a proof wall, a team grid, a photo treatment),
  not a one-off layout for this client.
- Works with **any** palette/typeface via `--dl-*` custom properties — no
  hardcoded client colors, copy, or asset paths.
- Zero dependencies beyond React + Tailwind utilities + library CSS.

## Checklist

1. Strip client specifics: copy → props, colors → `var(--dl-*)`, images → `src` props.
2. Add the header comment: what it is, when to use it, `Origin: <client-domain>, <year-month>`.
3. `'use client'` only if it truly needs state/effects.
4. Handle `prefers-reduced-motion` if it animates — read
   `hooks/usePrefersReducedMotion` during render (never gate an effect's
   `setState` on the media query; Next 16's react-hooks rule flags synchronous
   `setState` inside an effect).
5. Any CSS goes in `treatments/*.css` (prefixed `.dl-`) and gets imported in
   `index.css`. **Wrap element-targeting rules (`display`, `position`,
   `height`, `object-fit`, `max-width`…) in `@layer components { … }`** so a
   per-instance Tailwind utility on the element always overrides the library
   default — an unlayered rule silently out-specifies every utility. Colour
   recipes and `::after` overlays that nothing would override may stay layered
   too; keep the whole file in the one layer for consistency.
6. Add one line to the component index in `design-library/README.md`.

## Naming

Components describe **what they do, not who they were built for**:
`SketchPortrait`, not `AcmeTeamPhoto`.
