/*
 * DIRECTION RECORD (confirmed at /create step 3)
 *
 * Concept — The site becomes the firm’s plaque, at architectural scale.
 * Everything the old site told in dense justified Arial gets shown: the
 * two-generation lineage engraved in the hero, prudence set as a manifesto,
 * the 14 practice areas as a navigable index. Calm, cool, institutional:
 * pale ice-blue paper, deep navy ink, one warm material (brass).
 *
 * Keep — "Studio Legale LO MUNNO" wordmark; the brass plaque photo (only
 * brand image); the quiet blue palette; Laura Lo Munno’s real CV; all copy
 * facts; "no free phone consultations"; Bologna and Ferrara.
 *
 * Change — Drop the fixed-1000px text dump, justified 13px Arial, the
 * say-show gap. Navy is used once, deliberately (the hero plaque); the rest
 * of the site stays in the client’s true light palette.
 *
 * Signature moves —
 *  1. Targa monumentale hero (the Signature): brass frame, corner screws,
 *     engraved letterspaced serif caps, both generations named. targa-hero.tsx
 *  2. Manifesto: "diffida dai facili risultati" as a typographic band. Below.
 *  3. Indice delle materie: 14 areas as a dossier index. materie-index.tsx
 *  4. Lineage + numbers: G. -> L. narrative, StatBlock band, FORMAZIONE
 *     timeline on /studio.
 *
 * Hero — one bold move: the door plaque reinterpreted as a full-viewport
 * engraved monument, the site’s single dark anchor.
 *
 * Fonts: Cormorant Garamond (engraved display caps) + Libre Franklin (body).
 * Note: brass as a text color is used at #8A6B26 (not the plaque’s lighter
 * #C0A054) to hold AA contrast on the pale paper.
 */

import Link from "next/link";
import { TargaHero } from "@/components/targa-hero";
import { MaterieIndex } from "@/components/materie-index";
import { Section } from "@library/components/Section";
import { StatBlock } from "@library/components/StatBlock";
import { TreatedImage } from "@library/components/TreatedImage";
import { contact } from "@/lib/content";

export default function Home() {
  return (
    <>
      <TargaHero />

      {/* Manifesto — their most ownable idea, promoted from body text */}
      <Section width="default" className="bg-[var(--dl-paper)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="targhetta">Figura professionale</p>
          <blockquote className="mt-10 font-display text-2xl font-medium leading-snug text-[var(--dl-ink)] sm:text-4xl">
            &ldquo;L&rsquo;avvocato &egrave; colui che{" "}
            <em className="marker-brass not-italic">
              diffida dai facili risultati
            </em>{" "}
            ed evita di promettere immediate soluzioni; &egrave; colui che,
            nonostante anni di attivit&agrave;,{" "}
            <em className="marker-brass not-italic">
              studia, approfondisce e riflette
            </em>{" "}
            prima di emettere un parere, consapevole della responsabilit&agrave;
            che si assume nei confronti del cliente.&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* Storia — the lineage, finally told */}
      <Section width="wide" className="bg-[var(--dl-paper-soft)]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="targhetta">Storia</p>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-tight text-[var(--dl-ink)] sm:text-5xl">
              Due generazioni,
              <br />
              una targa sola.
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-[var(--dl-ink-soft)]">
              <p>
                Sulla targa di Via Santo Stefano 20 ci sono due nomi: Avv. G. Lo
                Munno, che apre lo studio nel 1969, e Avv. Laura Lo Munno, che
                oggi ne prosegue il lavoro al Foro di Bologna.
              </p>
              <p>
                Da allora lo studio fornisce consulenza e assistenza legale nei
                diversi ambiti del diritto civile: condominio, locazioni, tutela
                del consumatore, lavoro, famiglia, obbligazioni e
                responsabilit&agrave; civile. L&rsquo;assistenza si avvale anche
                della collaborazione di professionisti di altri settori: medici
                legali, commercialisti, geometri.
              </p>
            </div>
            <Link
              href="/studio"
              className="mt-8 inline-block text-sm font-semibold text-[var(--brass-deep)] underline underline-offset-4 transition-colors duration-150 hover:text-[var(--dl-ink)]"
            >
              La storia e la formazione dell&rsquo;avvocato
            </Link>
          </div>

          <figure className="relative">
            <div className="aspect-[333/218] w-full">
              <TreatedImage
                src="/images/targa-studio.jpg"
                alt="La targa in ottone dello Studio Legale Lo Munno: Avv. G. Lo Munno e Avv. L. Lo Munno, primo piano"
                treatment="duotone"
                shadow="var(--dl-ink)"
                highlight="var(--brass-light)"
                fill
                loading="lazy"
                className="rounded-[var(--dl-radius-md)] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_20px_40px_-20px_rgba(22,37,63,0.35)]"
              />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-widest text-[var(--dl-ink-soft)]">
              La targa dello studio, Via Santo Stefano 20, Bologna
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 grid gap-12 border-t border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] pt-14 sm:grid-cols-3">
          <StatBlock value={1969} label="L’anno di fondazione" />
          <StatBlock value={2} label="Generazioni di avvocati" />
          <StatBlock value={14} label="Materie trattate" />
        </div>
      </Section>

      {/* Come lavora lo studio — from the STORIA paragraphs on consulenza */}
      <Section
        width="wide"
        eyebrow="La consulenza"
        title="Spesso la tutela arriva prima della causa"
        intro="Molte questioni si risolvono senza affrontare un giudizio. La consulenza dello studio comincia dagli strumenti più semplici e arriva in aula solo quando serve davvero."
        className="bg-[var(--dl-paper)]"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Lettere, diffide e solleciti",
              body: "Atti stragiudiziali che spesso raggiungono lo scopo di tutelare il cliente, senza dover affrontare una causa giudiziale.",
            },
            {
              title: "Pareri legali",
              body: "Un parere aiuta a decidere la strategia migliore e a valutare l’opportunità e la convenienza di iniziare un procedimento davanti al giudice.",
            },
            {
              title: "Accordi e documenti",
              body: "La consulenza si concretizza anche nella stesura di accordi tra le parti o di documenti in genere.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-[var(--dl-radius-lg)] border border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[var(--dl-paper)] p-8 shadow-[0_1px_2px_rgba(22,37,63,0.06)]"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--dl-ink)]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Indice delle materie */}
      <Section
        width="wide"
        eyebrow="Materie trattate"
        title="Un solo studio, quattordici materie"
        intro="Dal diritto di famiglia al recupero crediti: l’indice completo delle materie in cui lo studio presta consulenza e assistenza."
        className="bg-[var(--dl-paper-soft)]"
      >
        <MaterieIndex />
        <div className="mt-10">
          <Link
            href="/materie"
            className="text-sm font-semibold text-[var(--brass-deep)] underline underline-offset-4 transition-colors duration-150 hover:text-[var(--dl-ink)]"
          >
            Tutte le materie e le domiciliazioni
          </Link>
        </div>
      </Section>

      {/* Contact band */}
      <Section width="default" className="bg-[var(--dl-paper)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="targhetta">Contatti</p>
          <h2 className="mt-8 font-display text-3xl font-semibold text-[var(--dl-ink)] sm:text-4xl">
            Lo studio riceve in Via Santo Stefano 20, Bologna
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--dl-ink-soft)]">
            Telefono {contact.tel}, fax {contact.fax}. Per fissare un
            appuntamento scrivete a{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline underline-offset-4 hover:text-[var(--dl-ink)]"
            >
              {contact.email}
            </a>
            . Lo studio non effettua consulenze telefoniche gratuite.
          </p>
          <Link
            href="/contatti"
            className="targa-caps mt-8 inline-block rounded-[var(--dl-radius-sm)] bg-[linear-gradient(165deg,var(--brass-light),var(--brass)_55%,var(--brass-deep))] px-6 py-3 text-xs text-[var(--brass-engrave)] shadow-[inset_0_1px_0_rgba(255,248,224,0.55),0_2px_6px_rgba(22,37,63,0.2)] transition-transform duration-150 hover:brightness-105 active:scale-[0.96]"
          >
            Come raggiungerci
          </Link>
        </div>
      </Section>
    </>
  );
}
