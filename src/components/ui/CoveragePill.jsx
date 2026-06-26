import { InformationCircleIcon } from "@heroicons/react/24/outline";

/**
 * Small amber pill that flags partial territorial coverage — e.g. GEIH income
 * data exists for only 24 of Colombia's 33 departments, so the scatter and Gini
 * views silently drop 9. Renders nothing when coverage is complete.
 *
 * @param {number} covered  territories with data
 * @param {number} [total=33]
 * @param {string} [label="departamentos"]
 * @param {string} [note]   optional tooltip explaining the gap
 */
export default function CoveragePill({ covered, total = 33, label = "departamentos", note }) {
  if (covered == null || covered >= total) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/40 px-2.5 py-1 whitespace-nowrap"
      title={note}
    >
      <InformationCircleIcon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      {/* Bare element: a Copy variant would impose a slate colour that wins the
          Tailwind cascade over this amber. */}
      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
        {covered} de {total} {label}
      </span>
    </span>
  );
}
