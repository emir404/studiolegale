import type { Metadata } from "next";
import { Section } from "@library/components/Section";
import { MaterieIndex } from "@/components/materie-index";
import { domiciliazioni } from "@/lib/content";

export const metadata: Metadata = {
  title: "Materie trattate",
  description:
    "Le quattordici materie in cui lo Studio Legale Lo Munno presta consulenza e assistenza, e le domiciliazioni presso gli uffici giudiziari di Bologna e Ferrara.",
};

export default function MateriePage() {
  return (
    <>
      <Section width="wide" className="bg-[var(--dl-paper)] pt-24">
        <p className="targhetta">Materie trattate</p>
        <h1 className="mt-8 max-w-3xl font-display text-5xl font-semibold leading-tight text-[var(--dl-ink)] sm:text-6xl">
          L&rsquo;indice delle competenze
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-[var(--dl-ink-soft)]">
          Quattordici materie del diritto civile, seguite in sede giudiziale e
          stragiudiziale. La consulenza pu&ograve; consistere anche nella
          redazione di lettere, diffide e solleciti di pagamento, nella stesura
          di pareri legali o di accordi tra le parti.
        </p>
        <div className="mt-12">
          <MaterieIndex detailed />
        </div>
      </Section>

      <Section
        width="default"
        eyebrow="Per i colleghi"
        title="Domiciliazioni e sostituzioni processuali"
        intro="Lo studio mette a disposizione la propria professionalità per domiciliazioni legali e sostituzioni processuali presso gli uffici giudiziari di Bologna e Ferrara."
        className="bg-[var(--dl-paper-soft)]"
      >
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {domiciliazioni.map((d) => (
            <li
              key={d}
              className="flex items-baseline gap-3 text-base text-[var(--dl-ink)]"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 flex-none translate-y-[-2px] rounded-full bg-[var(--brass)]"
              />
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-prose text-sm leading-relaxed text-[var(--dl-ink-soft)]">
          I colleghi possono contare su una comprovata esperienza,
          seriet&agrave; e affidabilit&agrave; nello svolgimento puntuale degli
          incarichi conferiti in qualit&agrave; di domiciliatario, con
          aggiornamenti tempestivi sullo stato di avanzamento delle cause.
        </p>
      </Section>
    </>
  );
}
