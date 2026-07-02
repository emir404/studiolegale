import type { Metadata } from "next";
import { Section } from "@library/components/Section";
import { Timeline } from "@library/components/Timeline";
import { TreatedImage } from "@library/components/TreatedImage";
import { attivitaCorrelate, formazione, manifesto } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lo Studio",
  description:
    "La storia dello Studio Legale Lo Munno: due generazioni di avvocati civilisti al Foro di Bologna dal 1969, e la formazione dell’Avv. Laura Lo Munno.",
};

export default function StudioPage() {
  return (
    <>
      <Section width="wide" className="bg-[var(--dl-paper)] pt-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="targhetta">Lo studio</p>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-tight text-[var(--dl-ink)] sm:text-6xl">
              Dal 1969, al primo piano di Via Santo Stefano
            </h1>
            <div className="mt-8 max-w-prose space-y-4 text-base leading-relaxed text-[var(--dl-ink-soft)]">
              <p>
                Lo Studio Legale Lo Munno del Foro di Bologna fornisce da due
                generazioni, precisamente dal 1969, consulenza e assistenza
                legale nei diversi ambiti del diritto civile: condominio,
                locazioni, tutela del consumatore e lavoro, compresi i settori
                del diritto di famiglia, con separazione consensuale e
                giudiziale, divorzio, affidamento, tutela dei minori,
                eredit&agrave; e donazioni, amministrazione di sostegno.
              </p>
              <p>
                Lo studio offre inoltre tutela, giudiziale e stragiudiziale, nel
                campo delle obbligazioni, dal recupero crediti alla
                contrattualistica, e della responsabilit&agrave; civile
                derivante da circolazione stradale, da custodia e da
                attivit&agrave; medica.
              </p>
              <p>
                L&rsquo;assistenza si fonda sui numerosi anni di attivit&agrave;
                dello studio e sulla collaborazione di professionisti di altri
                settori: medici legali, commercialisti, geometri.
              </p>
            </div>
          </div>

          <figure className="lg:sticky lg:top-24">
            <div className="aspect-[333/218] w-full">
              <TreatedImage
                src="/images/targa-studio.jpg"
                alt="La targa in ottone dello Studio Legale Lo Munno con i nomi di Avv. G. Lo Munno e Avv. L. Lo Munno"
                treatment="duotone"
                shadow="var(--dl-ink)"
                highlight="var(--brass-light)"
                fill
                className="rounded-[var(--dl-radius-md)] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_20px_40px_-20px_rgba(22,37,63,0.35)]"
              />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-widest text-[var(--dl-ink-soft)]">
              Due nomi, una targa: la prima e la seconda generazione
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section width="default" className="bg-[var(--dl-paper-soft)]">
        <div className="mx-auto max-w-3xl">
          <p className="targhetta">Figura professionale</p>
          <blockquote className="mt-8 font-display text-2xl font-medium leading-snug text-[var(--dl-ink)] sm:text-3xl">
            &ldquo;{manifesto}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
            &Egrave; il criterio con cui lo studio affronta ogni incarico: prima
            lo studio della questione, poi il parere.
          </p>
        </div>
      </Section>

      <Section
        width="default"
        eyebrow="Formazione"
        title="Avv. Laura Lo Munno"
        intro="Il percorso professionale, dall’Università di Bologna all’albo dei mediatori."
        className="bg-[var(--dl-paper)]"
      >
        <Timeline items={formazione} />

        <div className="mt-16 rounded-[var(--dl-radius-lg)] border border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[var(--dl-paper-soft)] p-8">
          <h3 className="targa-caps text-sm text-[var(--dl-ink)]">
            Attivit&agrave; correlate
          </h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
            {attivitaCorrelate.map((a) => (
              <li key={a} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-[var(--brass)]"
                />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
