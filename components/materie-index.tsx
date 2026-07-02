import { IndexList } from "@library/components/IndexList";
import { materie } from "@/lib/content";

/**
 * The 14 practice areas as a dossier index (FEEL.md: the "dead list" made
 * navigable). Roman numerals fit the firm's legal register.
 */
export function MaterieIndex({ detailed = false }: { detailed?: boolean }) {
  return <IndexList items={materie} numerals="roman" detailed={detailed} />;
}
