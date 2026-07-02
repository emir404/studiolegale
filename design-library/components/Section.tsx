import type { ReactNode } from "react";

/**
 * Section — page-section wrapper with consistent rhythm and width presets.
 * Server component. Origin: library seed.
 */

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  width?: "prose" | "default" | "wide" | "full";
  className?: string;
  children?: ReactNode;
};

const widths: Record<NonNullable<SectionProps["width"]>, string> = {
  prose: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  width = "default",
  className = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 sm:py-24 ${className}`}>
      <div className={`mx-auto ${widths[width]}`}>
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--dl-accent)]">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
        )}
        {intro && (
          <p className="mt-4 max-w-prose text-lg text-[var(--dl-ink-soft)]">{intro}</p>
        )}
        {children && <div className={title || intro ? "mt-10" : ""}>{children}</div>}
      </div>
    </section>
  );
}
