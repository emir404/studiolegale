"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Lo Studio" },
  { href: "/materie", label: "Materie" },
  { href: "/contatti", label: "Contatti" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--dl-paper)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="targa-caps text-base leading-none text-[var(--dl-ink)]"
          onClick={() => setOpen(false)}
        >
          Studio Legale{" "}
          <span className="text-[var(--brass-deep)]">Lo Munno</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm tracking-wide transition-colors duration-150",
                pathname === item.href
                  ? "font-semibold text-[var(--dl-ink)]"
                  : "text-[var(--dl-ink-soft)] hover:text-[var(--dl-ink)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--dl-ink)] sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principale mobile"
          className="border-t border-[color-mix(in_oklab,var(--dl-ink)_10%,transparent)] bg-[var(--dl-paper)] px-6 py-4 sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-base",
                    pathname === item.href
                      ? "bg-[var(--dl-paper-soft)] font-semibold text-[var(--dl-ink)]"
                      : "text-[var(--dl-ink-soft)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
