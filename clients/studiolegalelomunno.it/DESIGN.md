# Studio Legale Lo Munno — design system   (source: inferred, 2026-07-02)

The site is a single static HTML page built with **CoffeeCup HTML Editor** (created Nov 2014, © 2017), styled by one 726-byte stylesheet (`meta/css/stili.css`). No published brand or style guide exists; every token below is inferred from that CSS, the page HTML, and screenshots. Treat this as a *period artifact* — a `/create` rebuild should preserve the brand facts (name, plaque, the calm blue), not this dated execution.

## Logo
No logo file. The brand mark is the **wordmark** `Studio Legale LO MUNNO` (an `<h1>`, plain bold Arial, "LO MUNNO" in caps) paired with a photograph of the studio's **brass door plaque** — `assets/images/Targa_Studio.jpg` (JPEG, 333×218). No favicon (site returns a 404 for `/favicon.ico`). No SVG or icon set.

## Colors
| role | value | evidence |
|---|---|---|
| page background | `#F0F9FC` | `stili.css` → `body { background-color }` (pale ice-blue) |
| container background | `#DBF3F3` | `stili.css` → `#container { background-color }` (pale cyan/teal) |
| accent (footer + intended border) | `#244ECC` | `stili.css` → `#crediti { color }`, plus a commented-out `#container` border in the same blue |
| body text | `#000000` (browser default) | no `color` set on `body`/`#corpo` |
| plaque brass/gold | ~warm gold on near-black frame | `Targa_Studio.jpg` (imagery only — not a CSS token) |

Palette is two washes of pale blue + one saturated royal-blue accent + black text. Cool, quiet, institutional.

## Typography
- **One family: Arial**, declared once (`body { font-family:arial; }`) and inherited everywhere. No web fonts, no `@font-face`, no Google Fonts link.
- **Section headings** — bold Arial via `<b>` tags (STORIA, MATERIE TRATTATE, …), rendered uppercase in the copy.
- **Page title** — `<h1>` "Studio Legale LO MUNNO", bold, browser-default size.
- **Contact block** — italic (`<i>`) for lawyer name / address / tel / fax.
- **Body** — 13px, `text-align:justify`.
- **Footer credit** — 12px, centered, blue `#244ECC`.

## Spacing & shape
- Fixed **1000px** container, centered via `margin-left/right:auto`. **No responsive rules** — the layout does not reflow on mobile.
- Inner gutters of **50px** left/right on the header (`#titolo`) and body (`#corpo`).
- Header is **300px** tall; two **450px** columns floated left (plaque) and right (contact), each pushed down `margin-top:50px`.
- Footer: `margin-top:30px`, `padding-bottom:15px`.
- **No border-radius anywhere** — hard rectangles. Flat fills, no shadows, no gradients.

## Imagery style
A single **real photograph**: the studio's engraved **brass door plaque** reading `STUDIO LEGALE / Avv. G. LO MUNNO / Avv. L. LO MUNNO / 1° PIANO`, screw-mounted in a dark frame. Warm gold tones against the cool page. No illustration, no stock, no team/office photography, no icons. The plaque quietly encodes the firm's "two generations" story (G. = founding generation, L. = Laura Lo Munno).

## Components observed
- **Header block** — plaque image (left) + name & contact details (right). Not a nav bar; no links.
- **Body** — one long justified text column with bold uppercase section labels and `-`-prefixed practice-area lists.
- **Footer** — single centered blue copyright line.
- **No** buttons, nav menu, cards, forms, or interactive elements of any kind. Zero JavaScript.

## Brand anchors
The non-negotiables a rebuild must respect:
- **Name**: *Studio Legale Lo Munno* — with "LO MUNNO" styled in caps in the wordmark.
- **The brass plaque** — the only brand image; the tangible symbol of the firm and its two-generation lineage.
- **Named professional**: *Avv. Laura Lo Munno* (the founding generation, *Avv. G. Lo Munno*, appears only on the plaque).
- **Quiet blue palette** — pale blue/teal grounds with a single royal-blue (`#244ECC`) accent.
- **Bologna, since 1969** — the firm's place and heritage.
