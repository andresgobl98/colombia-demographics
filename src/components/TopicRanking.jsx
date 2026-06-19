import { BarBreakdown } from "./charts";
import { useDemographics } from "../state/demographicsStore";

const RANK_COLOR = "#3b82f6"; // blue-500

export default function TopicRanking() {
  const { departments: data, metric } = useDemographics();
  const entries = Object.entries(data)
    .map(([, dept]) => ({ name: dept.name, value: dept[metric.id], color: RANK_COLOR }))
    .filter((d) => d.value != null)
    .sort((a, b) => b.value - a.value);

  if (entries.length === 0) return null;

  return (
    <div className="shrink-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 max-h-[70vh] md:max-h-64 overflow-y-auto">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
        Ranking — {metric.label}
      </p>
      <BarBreakdown data={entries} showRank formatValue={metric.format} />
    </div>
  );
}
