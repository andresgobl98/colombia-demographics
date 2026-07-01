import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TimelineSlider from "../TimelineSlider";
import { Copy } from "../ui";

/**
 * Sticky global year control for the vertical layout. The year drives every
 * time-varying section (population, sex, age structure) so it stays pinned at the
 * top of the scroll; ethnicity is the one exception and says so in its own header.
 */
export default function YearBar() {
  return (
    <div className="sticky top-0 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-2.5 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <Copy as="span" variant="eyebrow" className="hidden sm:flex items-center gap-1.5 shrink-0">
          <CalendarDaysIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          Año
        </Copy>
        <div className="flex-1 min-w-0">
          <TimelineSlider embedded />
        </div>
      </div>
    </div>
  );
}
