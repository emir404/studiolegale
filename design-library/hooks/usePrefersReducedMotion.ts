"use client";

import { useSyncExternalStore } from "react";

/**
 * usePrefersReducedMotion — reactive `(prefers-reduced-motion: reduce)`.
 * SSR-safe: the server snapshot is `false` (assume motion is allowed) so
 * markup hydrates cleanly, then the client subscribes to the media query.
 * Read it during render and derive from it — never gate an effect's setState
 * on it (that trips Next 16's react-hooks rule). Origin: 2026-07 pipeline pass.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
