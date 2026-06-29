import * as icons from "lucide-react";
import { Circle, type LucideProps } from "lucide-react";

/**
 * Renders a lucide-react icon by its exact export name (e.g. "HandHeart"),
 * the same name shown on https://lucide.dev/icons. Falls back to a plain
 * circle outline if the name doesn't match a known icon.
 */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  return Icon ? <Icon {...props} /> : <Circle {...props} />;
}
