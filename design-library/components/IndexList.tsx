/**
 * IndexList — a client's service/practice/offer list set as a scannable,
 * numbered index (a dossier's rubrica) instead of an inert bullet dump.
 * Numbering is information here: it says "this is the complete index".
 * Use `numerals="roman"` for institutional/legal registers, `"arabic"` for
 * modern ones, `"none"` for a plain ruled list. Server component.
 * Origin: studiolegalelomunno.it, 2026-07.
 */

type IndexListItem = {
  title: string;
  detail?: string;
};

type IndexListProps = {
  items: IndexListItem[];
  numerals?: "roman" | "arabic" | "none";
  /** show each item's detail line (when present) */
  detailed?: boolean;
  /** grid columns at the sm breakpoint */
  columns?: 1 | 2;
  className?: string;
};

function toRoman(n: number): string {
  const table: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [value, glyph] of table) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}

export function IndexList({
  items,
  numerals = "roman",
  detailed = false,
  columns = 2,
  className = "",
}: IndexListProps) {
  return (
    <ol
      className={`grid gap-x-10 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          className="flex items-baseline gap-5 border-b border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] py-5"
        >
          {numerals !== "none" && (
            <span
              aria-hidden="true"
              className="w-9 flex-none text-right text-sm uppercase tracking-[0.14em] text-[var(--dl-accent)] [font-family:var(--dl-font-display)]"
            >
              {numerals === "roman" ? toRoman(i + 1) : String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div>
            <h3 className="text-lg font-semibold leading-snug text-[var(--dl-ink)] sm:text-xl [font-family:var(--dl-font-display)]">
              {item.title}
            </h3>
            {detailed && item.detail && (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--dl-ink-soft)]">
                {item.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
