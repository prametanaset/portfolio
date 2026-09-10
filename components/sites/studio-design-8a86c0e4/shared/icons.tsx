// Icon glyphs on studio.design are ligature text, not SVG (the page contains zero inline SVG).
// Material Symbols Outlined comes from the Google stylesheet linked in app/layout.tsx;
// Material Icons (the carousel controls) is self-hosted via app/studio-base.css.
import { cn } from "@/lib/utils";

type GlyphProps = {
  /** Ligature name, e.g. "arrow_forward". */
  name: string;
  className?: string;
};

export function MaterialSymbol({ name, className }: GlyphProps) {
  return (
    <span className={cn("icon", "material-symbols-outlined", className)} aria-hidden="true">
      {name}
    </span>
  );
}

export function MaterialIcon({ name, className }: GlyphProps) {
  return (
    <span className={cn("icon", "material-icons", className)} aria-hidden="true">
      {name}
    </span>
  );
}
