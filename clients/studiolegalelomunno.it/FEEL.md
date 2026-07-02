# Studio Legale Lo Munno — what they're going for   (by /feel, 2026-07-02; confidence: full)

## The essence
Studio Legale Lo Munno wants you to feel that your problem is in **careful, proven, multi-generational hands** — so that you trust judgment and lineage over a flashier firm that promises quick wins.

## What they're trying to achieve
A small, single-lawyer civil-law practice in Bologna is competing on **trust, heritage, and breadth of competence** — not on marketing. The whole site is one page whose job is to say: *we've done this since 1969, across two generations; we handle nearly every civil matter you might face; and we're the kind of lawyer who won't blow smoke at you.* The business goal is credibility for a high-consideration, referral-driven purchase (you don't pick a family lawyer on a whim), so the copy front-loads history, a full CV, and an unusually candid statement of professional ethics. What it is **not** trying to do is convert quickly, look current, or work on a phone — there are no CTAs, no forms, no responsive layout, and an explicit *"no free phone consultations."*

## What they highlight (ranked)
1. **Heritage & lineage — "two generations, since 1969."** Evidence: `pages/home.md` STORIA opens with *"da due generazioni (precisamente dal 1969)"*; the very first section above the fold is **STORIA** (`home-fold.png`); the hero image is the brass plaque naming **both** *Avv. G. Lo Munno* and *Avv. L. Lo Munno* (`assets/images/Targa_Studio.jpg`) — the lineage made physical.
2. **Breadth of civil-law competence.** Evidence: the **MATERIE TRATTATE** list runs 14 items (`home.png`, mid-page) — Diritto Civile, Famiglia, Condominiale, Ereditario, Lavoro, Sanitario, Infortunistica, Recupero Crediti… — plus a second DOMICILIAZIONI list. They want to be the one office that can take almost anything.
3. **Prudence & professional ethics as a selling point.** Evidence: the **FIGURA PROFESSIONALE** section — *"L'avvocato è colui che diffida dai facili risultati ed evita di promettere immediate soluzioni… studia, approfondisce e riflette prima di emettere un parere"* (`pages/home.md`). A rare, deliberate anti-hype pitch.
4. **Individual credentials — Avv. Laura Lo Munno's CV.** Evidence: the dated **FORMAZIONE** timeline 1997→2011 (law degree → apprenticeship → bar → mediator), plus *Comitato pari opportunità* and *AMI* memberships. The named person carries the current-generation trust.
5. **Rootedness in Bologna (and Ferrara).** Evidence: Via Santo Stefano address, `051` phone/fax, court coverage for *domiciliazioni* in Bologna & Ferrara — local, reachable, embedded in the local bar.

## Visual motif inventory
| motif | count / where | inferred intent |
|---|---|---|
| Brass engraved door plaque | 1 image — the **only** photo; top-left hero on desktop (`home-fold.png`), fills the entire mobile fold (`home-mobile.png`) | "We're real, physical, established." Lineage (G. + L.) engraved literally in brass; the tangible symbol of the firm. |
| Pale-blue washes (`#F0F9FC` / `#DBF3F3`) | site-wide background | Calm, cool, institutional, unassertive — a waiting-room quiet. |
| Royal-blue accent (`#244ECC`) | footer credit line; intended (commented-out) container border | The single spark of color; sober, official. |
| Bold uppercase section labels | every section — STORIA, FIGURA PROFESSIONALE, MATERIE TRATTATE… (`home.png`) | Dossier/document structure; legalistic order and thoroughness. |
| Dense justified body text | entire page body | Formality and seriousness; "we have a great deal of substance to convey." |
| **Absent: people, office, icons, product** | no headshot of Laura, no office photo, no illustration | The say–show gap — everything is *told*, almost nothing is *shown*. |

## Tone of voice
- **Formal ↔ casual:** firmly **formal** — Latinate legal register (*stragiudiziale, obbligazioni, domiciliazioni, amministrazione di sostegno*).
- **Technical ↔ plain:** **technical/legalistic**, dense, precise; assumes a serious reader.
- **Bold ↔ modest:** pointedly **modest** — it brags about restraint, not results. Confidence comes from heritage, not superlatives.
- **Warm ↔ corporate:** **institutional** on the surface, but with a human/family undercurrent (a named lawyer, a two-generation family name, a photographed doorplate).

Phrases that nail it:
- *"L'avvocato è colui che diffida dai facili risultati ed evita di promettere immediate soluzioni."*
- *"…studia, approfondisce e riflette prima di emettere un parere, consapevole della responsabilità che si assume nei confronti del cliente."*
- *"Lo Studio non effettua consulenze telefoniche gratuite."*
- *"da due generazioni (precisamente dal 1969)."*

## The say–show gap
- **They claim deep heritage and "assistenza di alto profilo" — but show one small photo and a broken layout.** The substance (50+ years, two generations, 14 practice areas, a real ethics stance) is genuinely strong; the execution is a dated CoffeeCup text dump that doesn't even reflow on mobile (`home-mobile.png` — text clipped off the right edge). **This is the rebuild's single biggest opportunity: the story is already worth telling; it has never been *shown*.**
- **They lead with prudence and honesty — a rare, ownable position — but bury it as plain paragraph text.** *"Diffida dai facili risultati"* deserves to be a headline, not a mid-page aside.
- **They list 14 practice areas — but as an inert bulleted dump**, not a navigable, confidence-building index of "we can handle your specific problem."
- **They name two generations on the plaque — but never tell the lineage story in copy.** *Avv. G. Lo Munno* appears only in engraved brass. The founder-to-Laura arc is latent and unwritten.
- **No portrait of Laura Lo Munno.** A single-lawyer practice selling personal judgment shows no person. *(Note: this is a real content gap, not just a wiki miss — the source site has exactly one image; a portrait would need to be commissioned/sourced with the client.)*

## Signature elements to reinterpret   ← feeds /create directly
| their motif | what it means | reinterpretation direction |
|---|---|---|
| **The brass engraved plaque** (only brand artifact) | heritage, permanence, lineage made physical; the "targa" that marks a real office | Make the *engraved nameplate* the design language: an embossed/engraved typographic wordmark; a grain- or duotone-treated hero of the plaque itself (`TreatedImage` + `grain`); recurring section headers styled as small engraved "targhe." Tell the **G. → L.** two-generation story explicitly. |
| **"Due generazioni, dal 1969"** | longevity as proof | `StatBlock` — *1969*, *2 generazioni*, *50+ anni*, *14 materie*. A vertical **timeline** for the FORMAZIONE CV (1997→2011), which is already dated and sequential. |
| **14 practice areas as a dead list** | breadth of competence | Turn the dump into a structured, scannable **index/grid** of practice areas, or a slow `Marquee` of *materie* — the firm's real product surface, made navigable and reassuring. |
| **"Diffida dai facili risultati"** (anti-hype ethics) | the most ownable, distinctive idea they have | Lead with it. A large, quiet, confident **typographic manifesto / pull-quote** — let restraint *be* the design's confidence, rather than hiding it in body text. |
| **Pale blue + brass, Arial** | cool institutional calm + one warm real material | Refine into an intentional palette — deep ink/navy ground, **warm brass/gold accent**, off-white paper — with a serious editorial serif for authority. Keep the *calm*; lose the *washed-out*. |

---
*Next: review/adjust this file, then run `/create`. The core creative bet — leading the rebuild with the brass-plaque/engraving motif, the two-generation lineage, and the "diffida dai facili risultati" manifesto — is `/create`'s to confirm with you.*
