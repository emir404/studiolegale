import Link from "next/link";

/**
 * The Signature: the firm's brass door plaque, reinterpreted at architectural
 * scale. One deliberate dark anchor on an otherwise light site (FEEL.md:
 * "deep ink ground, warm brass accent"). Engraved serif caps, double brass
 * rule, corner screws — the targa as the whole first impression.
 */
export function TargaHero() {
  return (
    <section
      aria-label="Studio Legale Lo Munno, dal 1969"
      className="dl-grain relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-[var(--dl-ink)] px-6 py-24"
    >
      {/* soft vignette so the brass reads as lit metal */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(217,189,125,0.10),transparent_62%)]"
      />

      <div aria-hidden="true" className="brass-frame">
        <span className="screw" style={{ top: "-5px", left: "-5px" }} />
        <span className="screw" style={{ top: "-5px", right: "-5px" }} />
        <span className="screw" style={{ bottom: "-5px", left: "-5px" }} />
        <span className="screw" style={{ bottom: "-5px", right: "-5px" }} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="rise targa-caps text-sm text-[var(--brass)] sm:text-base">
          Studio Legale
        </p>

        <h1 className="rise rise-2 targa-caps engraved-brass mt-4 whitespace-nowrap text-[clamp(3.25rem,9.5vw,8.25rem)] leading-none">
          Lo Munno
        </h1>

        <div
          aria-hidden="true"
          className="rise rise-3 mx-auto mt-8 h-px w-24 bg-[color-mix(in_oklab,var(--brass)_60%,transparent)]"
        />

        <p className="rise rise-3 targa-caps mt-8 text-xs tracking-[0.22em] text-[color-mix(in_oklab,var(--brass-light)_80%,white)] sm:text-sm">
          Avv. G. Lo Munno <span className="mx-2 text-[var(--brass)]">&middot;</span>{" "}
          Avv. L. Lo Munno
        </p>

        <p className="rise rise-4 mt-6 text-balance text-base leading-relaxed text-[color-mix(in_oklab,var(--dl-paper)_82%,var(--dl-ink))] sm:text-lg">
          Due generazioni di avvocati civilisti al Foro di Bologna, dal 1969.
          <br className="hidden sm:block" /> Via Santo Stefano 20, primo piano.
        </p>

        <div className="rise rise-5 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/materie"
            className="targa-caps rounded-[var(--dl-radius-sm)] bg-[linear-gradient(165deg,var(--brass-light),var(--brass)_55%,var(--brass-deep))] px-6 py-3 text-xs text-[var(--brass-engrave)] shadow-[inset_0_1px_0_rgba(255,248,224,0.55),0_2px_6px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:brightness-105 active:scale-[0.96]"
          >
            Le materie trattate
          </Link>
          <Link
            href="/contatti"
            className="targa-caps rounded-[var(--dl-radius-sm)] border border-[color-mix(in_oklab,var(--brass)_50%,transparent)] px-6 py-3 text-xs text-[var(--brass-light)] transition-colors duration-150 hover:border-[var(--brass)] hover:text-[color-mix(in_oklab,var(--brass-light)_80%,white)] active:scale-[0.96]"
          >
            Contatti
          </Link>
        </div>
      </div>
    </section>
  );
}
