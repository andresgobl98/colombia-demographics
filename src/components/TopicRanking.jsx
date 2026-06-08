export default function TopicRanking({ data, metric }) {
  const entries = Object.entries(data)
    .map(([code, dept]) => ({ code, name: dept.name, value: dept[metric.id] }))
    .filter((d) => d.value != null)
    .sort((a, b) => b.value - a.value);

  if (entries.length === 0) return null;

  const max = entries[0].value;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 max-h-64 overflow-y-auto">
      <p className="text-sm font-semibold text-slate-600 mb-3">
        Ranking — {metric.label}
      </p>
      <ol className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <li key={entry.code} className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-4 text-right">{i + 1}</span>
            <span className="text-xs text-slate-700 w-28 truncate">{entry.name}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(entry.value / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 w-16 text-right">
              {metric.format(entry.value)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
