"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Video — self-playing background/inline footage that stays out of the way:
 * muted, looped, inline, no controls. Under prefers-reduced-motion it does NOT
 * play — it shows the `poster` still instead. Decorative by default
 * (aria-hidden); pass `label` when the footage carries meaning. Give the
 * parent a size when `cover`. Client component. Origin: 2026-07 pipeline pass.
 */

type VideoProps = {
  src: string;
  /** still frame — shown before load and in place of playback under reduced motion */
  poster?: string;
  /** fill the parent (object-fit: cover); default true, for background use */
  cover?: boolean;
  /** loop playback; default true */
  loop?: boolean;
  /** describe the footage if it's meaningful; omit for decorative backgrounds */
  label?: string;
  className?: string;
};

export function Video({
  src,
  poster,
  cover = true,
  loop = true,
  label,
  className = "",
}: VideoProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);

  // Belt-and-suspenders: browsers only autoplay muted video, and React has
  // historically not reflected the `muted` attribute reliably.
  useEffect(() => {
    if (ref.current) ref.current.muted = true;
  }, []);

  const fit: CSSProperties = cover
    ? { width: "100%", height: "100%", objectFit: "cover" }
    : { width: "100%", height: "auto" };
  const decorative = !label;

  if (reduce && poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt={label ?? ""}
        aria-hidden={decorative || undefined}
        className={className}
        style={fit}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      style={fit}
      poster={poster}
      autoPlay={!reduce}
      loop={loop}
      muted
      playsInline
      preload={reduce ? "metadata" : "auto"}
      controls={reduce}
      aria-hidden={decorative || undefined}
      aria-label={label}
    >
      <source src={src} />
    </video>
  );
}
