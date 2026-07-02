# Known gaps — capabilities the pipeline doesn't have yet

Deliberately-unbuilt capabilities, documented so they're a *choice*, not a surprise. No code here; each entry is enough to re-scope the work when we decide to close it.

## Generated / illustrated imagery (genmedia)

**Status:** existed in gen-1, dropped in the current pipeline, requested back more than once. Not built this pass (scope decision) — documented for re-integration.

**What gen-1 did** (reconstructed from `prev-conversations/`): an image-generation step used **fal.ai** to produce on-brand imagery when a client's real photos were weak, stock, or missing:
- **Palette-locked prompts** — generation prompts carried the client's DESIGN.md colours, so output sat inside the brand system instead of fighting it.
- **On-brand hero / showcase images** — generated backgrounds and section art for heroes and feature bands.
- **Logo background-clipping** — compositing the client's real logo over generated backdrops.

**Why gen-2 dropped it:** the rebuilt pipeline centres on *reinterpreting the client's own assets* (duotone/sketch/marquee/stat treatments) rather than synthesising new ones — plus the extra dependency, API key, and non-determinism didn't fit the "their content, our craft" spine. The gap only bites when a client genuinely has no usable imagery.

**Re-integration sketch (when we decide to close it):**
1. **A `/create` image step** (between step 5 tokens and step 7 build): find sections FEEL.md wants imagery for that have no usable client asset (the say–show gap + a thin wiki asset inventory flag these), generate only those, write to `public/images/generated/`, and record provenance in the direction block.
2. **A design-library path** — a `GeneratedHero` / illustrated-hero component (sibling to `TreatedImage`), `--dl-*`-driven so generated art re-skins per client like everything else; reduced-motion + alt-text handled per `adding-components.md`.
3. **Prompt discipline** — lock prompts to DESIGN.md tokens (palette, mood; subject from WIKI.md); never generate people who imply real team members (the accountability/authenticity rule); treat generated imagery as decorative — real copy still carries the facts.
4. **Key handling** — provider key in `.env.local` (gitignored) alongside `SHADCNBLOCKS_API_KEY`; skip gracefully with a logged `[skip]` when absent, exactly like the shadcnblocks fallback, so a build never *depends* on generation being reachable.

Until then: prefer reinterpreting real assets (reinterpretation playbook), and where a client truly lacks imagery, lean on the type-forward and illustrated-SVG moves (playbook #3 illustrated floor-plan, #8 giant outlined type) that need no generation.
