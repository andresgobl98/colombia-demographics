export default function MetricSelector({ metrics, selected, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="hidden sm:block text-sm font-medium text-slate-600 whitespace-nowrap">
        Colorear mapa por
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {metrics.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
