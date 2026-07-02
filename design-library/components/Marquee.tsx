import type { CSSProperties, ReactNode } from "react";

/**
 * Marquee — infinite horizontal ticker for logo walls, client names, or
 * repeated phrases. Pure CSS animation (styles in tokens/tokens.css),
 * pauses on hover, degrades to a scrollable row under prefers-reduced-motion.
 * Server component. Origin: library seed.
 *
 * Children are rendered twice for the seamless loop — keep them
 * presentational (logos, spans), not interactive.
 */

type MarqueeProps = {
  /** seconds per loop — lower is faster */
  speed?: number;
  gap?: string;
  className?: string;
  children: ReactNode;
};

export function Marquee({ speed = 30, gap = "3rem", className = "", children }: MarqueeProps) {
  const style = {
    "--dl-marquee-duration": `${speed}s`,
    "--dl-marquee-gap": gap,
  } as CSSProperties;
  return (
    <div className={`dl-marquee ${className}`} style={style}>
      <div className="dl-marquee-track">{children}</div>
      <div className="dl-marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
