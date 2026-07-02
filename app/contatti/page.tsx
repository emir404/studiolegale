import type { Metadata } from "next";
import { Section } from "@library/components/Section";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Studio Legale Lo Munno: Via Santo Stefano 20, 40125 Bologna, primo piano. Telefono 051 239626, email avvlomunno@gmail.com.",
};

const rows = [
  { label: "Avvocato", value: contact.lawyer },
  {
    label: "Indirizzo",
    value: `${contact.street}, ${contact.floor}, ${contact.cap} ${contact.city}`,
  },
  { label: "Telefono", value: contact.tel, href: contact.telHref },
  { label: "Fax", value: contact.fax },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
];

export default function ContattiPage() {
  return (
    <Section width="default" className="bg-[var(--dl-paper)] pt-24">
      <div className="mx-auto max-w-2xl">
        <p className="targhetta">Contatti</p>
        <h1 className="mt-8 font-display text-5xl font-semibold leading-tight text-[var(--dl-ink)] sm:text-6xl">
          Lo studio riceve su appuntamento
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[var(--dl-ink-soft)]">
          La targa &egrave; al primo piano di Via Santo Stefano 20, nel centro
          di Bologna. Per fissare un appuntamento telefonate in orario
          d&rsquo;ufficio o scrivete una email.
        </p>

        <dl className="mt-12 divide-y divide-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] rounded-[var(--dl-radius-lg)] border border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[var(--dl-paper-soft)] px-8">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="targa-caps w-28 flex-none text-xs text-[var(--brass-deep)]">
                {row.label}
              </dt>
              <dd className="text-base text-[var(--dl-ink)]">
                {row.href ? (
                  <a
                    href={row.href}
                    className="underline underline-offset-4 hover:text-[var(--brass-deep)]"
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
          Lo Studio non effettua consulenze telefoniche gratuite. Per i
          colleghi: lo studio &egrave; disponibile per domiciliazioni e
          sostituzioni processuali presso gli uffici giudiziari di Bologna e
          Ferrara.
        </p>
      </div>
    </Section>
  );
}
