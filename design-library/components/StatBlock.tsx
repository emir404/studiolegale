"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * StatBlock — oversized stat with count-up on scroll into view.
 * Use for the numbers a client brags about (from WIKI.md proof points).
 * Respects prefers-reduced-motion (renders the final value immediately).
 * Client component. Origin: library seed.
 */

type StatBlockProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** count-up duration in ms */
  duration?: number;
  className?: string;
};

export function StatBlock({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 1400,
  className = "",
}: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [counted, setCounted] = useState(0);
  // Derived, not stored: reduced motion shows the final value with no in-effect
  // setState (which Next 16's react-hooks rule flags).
  const display = reduce ? value : counted;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setCounted(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce]);

  return (
    <div ref={ref} className={className}>
      <div className="text-5xl font-semibold tracking-tight tabular-nums sm:text-7xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest text-[var(--dl-ink-soft)]">
        {label}
      </div>
    </div>
  );
}
