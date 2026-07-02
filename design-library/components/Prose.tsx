import type { ReactNode } from "react";

/**
 * Prose — long-form copy with readable measure and vertical rhythm
 * (styles in tokens/tokens.css → .dl-prose). Server component.
 * Origin: library seed.
 */

type ProseProps = {
  className?: string;
  children: ReactNode;
};

export function Prose({ className = "", children }: ProseProps) {
  return <div className={`dl-prose ${className}`}>{children}</div>;
}
