"use client";

import type { ReactNode } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Scrollytelling — a tall scene that pins `sticky` in view while the reader
 * scrolls through `steps`; the active step advances with scroll progress and
 * inactive steps dim. `sticky` receives the active index so the pinned visual
 * can change per step. Under prefers-reduced-motion it degrades to the sticky
 * visual followed by every step stacked and fully visible — no pinning, no
 * fade. Client component. Origin: 2026-07 pipeline pass.
 */

type ScrollytellingProps = {
  /** the pinned visual (image, chart, map…); gets the active step index */
  sticky: (activeStep: number) => ReactNode;
  /** narrative steps, top to bottom */
  steps: ReactNode[];
  className?: string;
};

export function Scrollytelling({ sticky, steps, className = "" }: ScrollytellingProps) {
  const reduce = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const last = Math.max(0, steps.length - 1);
  const active = reduce ? last : Math.min(last, Math.floor(progress * steps.length));

  if (reduce) {
    return (
      <div className={className}>
        <div>{sticky(active)}</div>
        <div className="mt-8 space-y-8">
          {steps.map((step, i) => (
            <div key={i}>{step}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:self-start">
          {sticky(active)}
        </div>
        <div>
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex min-h-screen items-center transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0.25 }}
              aria-current={i === active ? "step" : undefined}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
