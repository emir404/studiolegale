import type { ReactNode } from "react";

/**
 * Timeline — a vertical, dated sequence (a CV, a company history, a process
 * with real dates). Use when the client's story is already sequential; the
 * line and dots make the order legible without decorating it.
 * Colors follow --dl-accent / --dl-paper. Server component.
 * Origin: studiolegalelomunno.it, 2026-07.
 */

type TimelineItem = {
  /** the date or range, shown as a small label */
  date: string;
  title: string;
  body?: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <ol
      className={`relative ml-3 border-l border-[color-mix(in_oklab,var(--dl-accent)_45%,transparent)] ${className}`}
    >
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className="relative pb-10 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--dl-accent)] shadow-[0_0_0_3px_var(--dl-paper)]"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dl-accent)]">
            {item.date}
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-[var(--dl-ink)] [font-family:var(--dl-font-display)]">
            {item.title}
          </h3>
          {item.body && (
            <p className="mt-1 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
              {item.body}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
