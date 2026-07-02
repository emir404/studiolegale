import Link from "next/link";
import { contact } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[var(--dl-paper-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="targa-caps text-sm text-[var(--dl-ink)]">
            Studio Legale <span className="text-[var(--brass-deep)]">Lo Munno</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--dl-ink-soft)]">
            Foro di Bologna. Consulenza e assistenza legale nel diritto civile,
            da due generazioni, dal 1969.
          </p>
        </div>

        <div className="text-sm leading-relaxed text-[var(--dl-ink-soft)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--dl-ink)]">
            Lo studio
          </p>
          <address className="not-italic">
            {contact.lawyer}
            <br />
            {contact.street}, {contact.floor}
            <br />
            {contact.cap} {contact.city}
          </address>
        </div>

        <div className="text-sm leading-relaxed text-[var(--dl-ink-soft)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--dl-ink)]">
            Contatti
          </p>
          <p>
            Tel:{" "}
            <a
              href={contact.telHref}
              className="underline underline-offset-4 hover:text-[var(--dl-ink)]"
            >
              {contact.tel}
            </a>
            <br />
            Fax: {contact.fax}
            <br />
            <a
              href={`mailto:${contact.email}`}
              className="underline underline-offset-4 hover:text-[var(--dl-ink)]"
            >
              {contact.email}
            </a>
          </p>
          <p className="mt-3 text-xs">
            Lo Studio non effettua consulenze telefoniche gratuite.
          </p>
        </div>
      </div>

      <div className="border-t border-[color-mix(in_oklab,var(--dl-ink)_8%,transparent)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-xs text-[var(--dl-ink-soft)]">
          <p>
            &copy; {new Date().getFullYear()} Studio Legale Lo Munno, Bologna
          </p>
          <p>
            <Link href="/contatti" className="underline underline-offset-4 hover:text-[var(--dl-ink)]">
              Come raggiungerci
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
