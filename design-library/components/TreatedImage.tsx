import type { CSSProperties } from "react";

/**
 * TreatedImage — a photo re-expressed in the project's palette instead of
 * shown raw: duotone (shadow/highlight tint) or halftone (print dots).
 * The go-to for "show their office/space in a completely different way".
 * Styles in treatments/duotone.css. Server component; plain <img> by design.
 * Origin: library seed.
 */

type TreatedImageProps = {
  src: string;
  alt: string;
  treatment?: "duotone" | "halftone" | "none";
  /** dark end of the duotone — defaults to var(--dl-ink) */
  shadow?: string;
  /** light end of the duotone — defaults to var(--dl-accent) */
  highlight?: string;
  /**
   * Cover the parent instead of sizing to the image's intrinsic ratio — for
   * fixed-height cards/cells. The container and img fill 100% with object-fit:
   * cover (see .dl-treated-fill in treatments/duotone.css). Give the parent
   * a height. Default false keeps the intrinsic-ratio inline-block behaviour.
   */
  fill?: boolean;
  className?: string;
};

export function TreatedImage({
  src,
  alt,
  treatment = "duotone",
  shadow,
  highlight,
  fill = false,
  className = "",
}: TreatedImageProps) {
  const style = {
    ...(shadow ? { "--dl-duo-shadow": shadow } : {}),
    ...(highlight ? { "--dl-duo-highlight": highlight } : {}),
  } as CSSProperties;
  return (
    <span
      className={`dl-treated dl-treated-${treatment}${fill ? " dl-treated-fill" : ""} ${className}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </span>
  );
}
