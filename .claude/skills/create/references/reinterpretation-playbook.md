# Reinterpretation playbook

Concrete, code-achievable ways to take what a client keeps showing (per FEEL.md) and express it a completely different way. Each entry: the motif it reinterprets → the move → how to build it. Library components referenced as `@library/*` — prefer them; build new ones only when no technique fits, then contribute back.

Pick 2–4 per site. One loud move beats five quiet ones; every move must trace to a FEEL.md motif.

**Make the hero pop.** Wherever your loudest move lands, favour the hero — it's the thesis the visitor sees first and last (/create step 3). A signature treatment at hero scale (full-bleed duotone strip, giant outlined type, a background video, oversized stats) beats a centered eyebrow → title → intro stack every time.

## 1. Hand-drawn portraits — `SketchPortrait` (library)

**Reinterprets:** headshots everywhere (trust lives in people).
Their real photos rendered as pencil sketches in the browser — human and crafted, still *them*. Rough frame + slight alternating rotation for a pinned-to-the-wall feel.

```tsx
import { SketchPortrait } from "@library/components/SketchPortrait";
<SketchPortrait src="/images/team-ana.jpg" alt="Ana Ruiz, partner" intensity="light" />
```

Grid of them + real names/roles from WIKI.md. `intensity="strong"` for smaller crops. Works because the SVG filter (feTurbulence → feDisplacementMap → desaturate → posterize) runs on their actual photo — no generated faces.

## 2. Duotone / halftone photos — `TreatedImage` (library)

**Reinterprets:** office/space/factory photos (scale, "we're real").
Same photos, re-expressed in the project palette — instantly cohesive, unmistakably not their old site.

```tsx
import { TreatedImage } from "@library/components/TreatedImage";
<TreatedImage src="/images/office-wide.jpg" alt="The Rotterdam studio"
  treatment="duotone" shadow="var(--dl-ink)" highlight="var(--dl-accent)" />
```

Full-bleed duotone strip with one oversized caption beats a photo grid. `halftone` reads print-like — good for heritage/craft brands.

## 3. The office, shown completely differently

**Reinterprets:** the proud-office motif when it's a top-2 highlight.
Instead of photographs: a stylized **illustrated floor plan or isometric SVG** of their space — simple shapes, 2px `var(--dl-ink)` strokes, flat `var(--dl-accent)` fills, hand-labeled rooms ("where the espresso happens"). Draw it as inline SVG using their screenshots as reference. Content-heavy: only when the office is genuinely central. Cheaper variant: duotone office strip (#2) + StatBlock row (m², people, cities).

## 4. Marquee walls — `Marquee` (library)

**Reinterprets:** client-logo walls / partner lists (social proof).
A slow infinite ticker instead of a static grid. Distinctive variant: set **client names in display type** instead of logos — typographic, confident, no logo-soup.

```tsx
import { Marquee } from "@library/components/Marquee";
<Marquee speed={40}>{clients.map(c => <span key={c} className="text-2xl font-semibold whitespace-nowrap">{c}</span>)}</Marquee>
```

## 5. Oversized stats — `StatBlock` (library)

**Reinterprets:** scale/longevity claims buried in copy ("since 1998", "40 people", "12 countries").
Pull the numbers out of the paragraphs and make them the design: display-size count-ups in a band.

```tsx
import { StatBlock } from "@library/components/StatBlock";
<StatBlock value={27} label="years in business" />
```

Only numbers that exist in WIKI.md proof points.

## 6. Marker-highlighted key phrases

**Reinterprets:** copy tics — the words they repeat obsessively.
Highlight *their* recurring words in running text like someone marked them up:

```css
.marker { background: linear-gradient(120deg, transparent 0 4%, var(--dl-accent) 4% 96%, transparent 96%);
  background-size: 100% 0.55em; background-repeat: no-repeat; background-position: 0 78%; padding-inline: 0.1em; }
```

## 7. Taped/polaroid photos

**Reinterprets:** candid team photos (warmth, "we like each other").
White padding, slight rotation, a masking-tape pseudo-element top-center (`::before`, small rotated rectangle in `--dl-paper-soft` with low opacity border). Scatter 3–5 in an off-grid cluster, handwritten-style captions. Pairs with `.dl-grain`.

## 8. Giant outlined display type

**Reinterprets:** bold claims made timidly.
Their key claim at `--dl-text-display` size, outlined (`-webkit-text-stroke: 2px var(--dl-ink); color: transparent;`), filling on hover or scroll. Use once.

## 9. Pull-quote testimonials

**Reinterprets:** testimonial carousels.
Kill the carousel. One testimonial per band, set as display typography (quote in `--dl-text-xl`+, name and company in small caps under). Real quotes from WIKI.md only, verbatim.

## 10. Grain + paper texture — `.dl-grain` (library)

**Reinterprets:** sterile corporate gloss when FEEL.md calls for warmth/craft.
Add `.dl-grain` to heroes and photo sections; combine with `--dl-paper` backgrounds. Subtle — if you notice it immediately, it's too strong (`.dl-grain-strong` exists for deliberate cases).

## 11. Scroll-driven narrative — `Scrollytelling` (library)

**Reinterprets:** a linear process, timeline, or story the client tells as a flat list (how-it-works steps, company history, a product journey).
Pin one visual while the story advances beside it: as the reader scrolls, the sticky panel holds and each step takes focus in turn. Turns a numbered list into a guided sequence.

```tsx
import { Scrollytelling } from "@library/components/Scrollytelling";
<Scrollytelling
  sticky={(step) => <TreatedImage src={stages[step].img} alt={stages[step].alt} fill treatment="duotone" />}
  steps={stages.map((s) => <div key={s.title}><h3>{s.title}</h3><p>{s.body}</p></div>)}
/>
```

The `sticky` render fn gets the active step index, so the pinned visual changes per step (swap the treated photo, advance a diagram). Degrades to a plain stacked list under `prefers-reduced-motion` — content-first, safe for a key section. Reserve for a genuine sequence; don't pin a static hero with it.

## 12. Background-video hero — `Video` (library)

**Reinterprets:** a client whose work *is* motion (a workshop in action, a kitchen, a machine running, a place with atmosphere) but who only shows stills.
A muted, looped background video behind the hero headline says "this is alive" in a way a photo can't. Keep it decorative and quiet; the headline still carries the message.

```tsx
import { Video } from "@library/components/Video";
<section className="relative grid min-h-[80vh] place-items-center">
  <Video src="/video/workshop.mp4" poster="/images/workshop.jpg" className="absolute inset-0 -z-10" />
  <h1 className="relative">Made by hand, in Rotterdam</h1>
</section>
```

Autoplays muted/inline, loops, and — under `prefers-reduced-motion` — shows the `poster` still instead of playing. Always supply a `poster` (first paint + the reduced-motion fallback). Hold headline contrast with a scrim or a solid panel, not by darkening the whole site.

---

**Accessibility notes, all techniques:** treatments are decorative — alt text still describes the real subject; motion respects `prefers-reduced-motion` (library components handle it — match them in new ones); keep text contrast on treated backgrounds ≥ 4.5:1 (put copy on solid `--dl-paper`/`--dl-ink` panels, not over treated photos).
