import { BarBreakdown } from "./charts";
import { Copy } from "./ui";

const RANK_COLOR = "#3b82f6"; // blue-500

/**
 * Department ranking for the active metric. Presentational — takes its data and
 * metric through props so any page can reuse it.
 *
 * Ordering follows the metric's `direction`: when higher is better (e.g. service
 * coverage) the lowest values rank first; otherwise the highest rank first. This
 * keeps "rank 1" meaning the most notable end for whatever is being shown
 * (largest population, but also worst poverty / lowest coverage).
 */
export default function TopicRanking({ departments: data, metric, bare = false }) {
  const lowFirst = metric.direction === "higher";
  const entries = Object.entries(data)
    .map(([, dept]) => ({ name: dept.name, value: dept[metric.id], color: RANK_COLOR }))
    .filter((d) => d.value != null)
    .sort((a, b) => (lowFirst ? a.value - b.value : b.value - a.value));

  if (entries.length === 0) return null;

  const content = (
    <>
      <Copy as="p" variant="detail" className="font-semibold mb-3">
        Ranking — {metric.label}
      </Copy>
      <BarBreakdown data={entries} showRank formatValue={metric.format} />
    </>
  );

  if (bare) return <div className="p-4">{content}</div>;

  return (
    <div className="shrink-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 max-h-[70vh] md:max-h-64 overflow-y-auto">
      {content}
    </div>
  );
}
