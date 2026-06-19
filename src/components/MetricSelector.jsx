import { METRICS } from "../data/metrics";
import { useDemographics } from "../state/demographicsStore";

export default function MetricSelector() {
  const { selectedMetricId, setSelectedMetricId } = useDemographics();
  return (
    <div className="flex items-center gap-3 shrink-0">
      <label className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
        Colorear mapa por
      </label>
      <select
        value={selectedMetricId}
        onChange={(e) => setSelectedMetricId(e.target.value)}
        className="appearance-none text-sm border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-9 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-no-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.6rem center",
          backgroundSize: "1rem",
        }}
      >
        {METRICS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
