import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import Copy from "./Copy";

/**
 * Small "this is interactive" affordance — a pointer icon + short instruction,
 * used to tell the reader that an element responds to clicks/taps (e.g. the
 * clickable departments on a map). Keep the text imperative and short
 * ("Toca un departamento…").
 *
 * Two layouts:
 *   • inline  (default) — a quiet line that sits under a section header.
 *   • pill   — a translucent, self-contained badge for overlaying on a map.
 *
 * Uses `annotation` tone (AA on white/slate-800 cards). For the pill the
 * backdrop keeps it legible over the map fills.
 *
 * @param {"inline"|"pill"} [variant="inline"]
 */
export default function InteractiveHint({ children, variant = "inline", className = "" }) {
  const base = "inline-flex items-center gap-1.5";
  const styles =
    variant === "pill"
      ? "rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 px-3 py-1 shadow-sm"
      : "";

  return (
    <Copy as="span" variant="annotation" className={[base, styles, className].filter(Boolean).join(" ")}>
      <CursorArrowRaysIcon className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
      {children}
    </Copy>
  );
}
