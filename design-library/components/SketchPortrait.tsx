import type { CSSProperties } from "react";

/**
 * SketchPortrait — renders a photo (headshots especially) as a hand-drawn
 * pencil sketch, entirely in the browser: SVG displacement roughens the
 * edges, desaturation + posterization flatten it to "pencil levels".
 * The client's real photo stays the source — nothing is generated.
 *
 * Frame styles live in treatments/sketch.css. Server component; plain <img>
 * by design (treatments need a real img element — swap for next/image only
 * if you keep the className). Origin: library seed.
 *
 * Multiple instances with the same `intensity` share one filter id — that
 * duplicate-id is intentional and harmless (the defs are identical).
 */

type SketchPortraitProps = {
  src: string;
  alt: string;
  intensity?: "light" | "strong";
  frame?: "rough" | "none";
  className?: string;
};

const params = {
  light: { baseFrequency: 0.012, scale: 5, levels: "0 0.25 0.5 0.75 1" },
  strong: { baseFrequency: 0.02, scale: 9, levels: "0 0.34 0.67 1" },
} as const;

export function SketchPortrait({
  src,
  alt,
  intensity = "light",
  frame = "rough",
  className = "",
}: SketchPortraitProps) {
  const p = params[intensity];
  const filterId = `dl-sketch-${intensity}`;
  return (
    <span
      className={`dl-sketch ${frame === "rough" ? "dl-sketch-frame" : ""} ${className}`}
    >
      <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={p.baseFrequency}
            numOctaves={3}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={p.scale} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues={p.levels} />
            <feFuncG type="discrete" tableValues={p.levels} />
            <feFuncB type="discrete" tableValues={p.levels} />
          </feComponentTransfer>
        </filter>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="dl-sketch-img"
        style={{ filter: `url(#${filterId}) contrast(1.35) brightness(1.08)` } as CSSProperties}
      />
    </span>
  );
}
