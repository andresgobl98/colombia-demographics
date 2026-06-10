import { BarBreakdown } from "./charts";

const RANK_COLOR = "#3b82f6"; // blue-500

export default function TopicRanking({ data, metric }) {
  const entries = Object.entries(data)
    .map(([code, dept]) => ({ name: dept.name, value: dept[metric.id], color: RANK_COLOR }))
    .filter((d) => d.value != null)
    .sort((a, b) => b.value - a.value);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 max-h-64 overflow-y-auto">
      <p className="text-sm font-semibold text-slate-600 mb-3">
        Ranking — {metric.label}
      </p>
      <BarBreakdown data={entries} showRank formatValue={metric.format} />
    </div>
  );
}
