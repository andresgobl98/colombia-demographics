import { POVERTY_LEVEL_METRICS } from "../../data/povertyMetrics";
import { POVERTY_YEARS } from "../../data/povertySelectors";
import { usePoverty } from "../../state/povertyStore";
import { Copy } from "../ui";

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

/**
 * Poverty-page control bar: picks which comparable poverty-level indicator
 * colours the map (only the four `nivel`-family metrics, which share a common
 * "% of people" axis). Inequality, services and the IPM breakdown have their own
 * sections, so they are intentionally absent here. A live caption states what the
 * active indicator means and its source/reference year (there is no year slider —
 * the data is a single latest-year snapshot per indicator).
 */
export default function PovertyControlBar() {
  const { selectedMetricId, setSelectedMetricId, metric } = usePoverty();
  const year = POVERTY_YEARS[metric.id];

  return (
    <div className="shrink-0 flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-4 py-2.5">
      {/* Selector row */}
      <div className="flex items-center gap-3">
        <Copy as="label" variant="detail" className="hidden sm:block font-medium whitespace-nowrap">
          Colorear mapa por
        </Copy>
        <select
          value={selectedMetricId}
          onChange={(e) => setSelectedMetricId(e.target.value)}
          className="appearance-none text-sm border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-9 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-no-repeat flex-1 min-w-0 sm:flex-none sm:w-72"
          style={{ backgroundImage: CHEVRON, backgroundPosition: "right 0.6rem center", backgroundSize: "1rem" }}
        >
          {POVERTY_LEVEL_METRICS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Full-width caption: what the active metric means + source/year/coverage */}
      <div>
        <Copy as="p" variant="detail" className="leading-snug">
          {metric.description}
        </Copy>
        <Copy as="p" variant="annotation" className="leading-snug">
          {metric.sourceHref ? (
            <a
              href={metric.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {metric.source}
            </a>
          ) : (
            metric.source
          )}
          {year ? ` · ${year}` : ""}
          {metric.note ? ` · ${metric.note}` : ""}
        </Copy>
      </div>
    </div>
  );
}
