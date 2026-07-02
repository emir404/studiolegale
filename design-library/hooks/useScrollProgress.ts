"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * useScrollProgress — 0→1 progress of the returned `ref` element travelling
 * through the viewport. 0 when its top reaches the viewport bottom, 1 when its
 * bottom passes the viewport top. Reads are passive and RAF-throttled (one
 * measurement per frame at most). Under prefers-reduced-motion it never
 * listens and stays at 0 — callers should branch to a static fallback.
 * Origin: 2026-07 pipeline pass.
 */

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduce = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // distance scrolled since the element's top entered the viewport bottom,
      // over the full travel (element height + one viewport).
      const travelled = vh - rect.top;
      const total = rect.height + vh;
      setProgress(Math.min(1, Math.max(0, travelled / total)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule(); // defer the first read to next frame — no setState in effect body
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return { ref, progress };
}
