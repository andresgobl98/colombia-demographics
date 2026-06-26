/**
 * Lollipop chart — a single metric ranked across departments, each a dot placed on
 * the metric's own domain (good for tightly-ranged measures like the Gini
 * coefficient, where bars-from-zero would all look the same). Sorted worst-first
 * per the metric's direction; rows are clickable (→ onSelect) and the selected one
 * is highlighted. HTML/CSS (responsive).
 *
 * @param {Object} departments  keyed by code, each carrying the metric value
 * @param {Object} metric       descriptor (id, label, domain, format, direction)
 * @param {string} [color]      Tailwind bg-* class for the dot
 * @param {string|null} [selectedCode]
 * @param {(code:string)=>void} [onSelect]
 */
export default function LollipopChart({ departments, metric, color = "bg-violet-500", selectedCode, onSelect }) {
  const [lo, hi] = metric.domain;
  const span = hi - lo || 1;
  const pos = (v) => `${((Math.min(Math.max(v, lo), hi) - lo) / span) * 100}%`;

  const worstFirst = metric.direction === "higher"; // higher=better → lowest is worst
  const rows = Object.entries(departments)
    .map(([code, d]) => ({ code, name: d.name, v: d[metric.id] }))
    .filter((r) => r.v != null)
    .sort((a, b) => (worstFirst ? a.v - b.v : b.v - a.v));

  return (
    <div className="flex flex-col gap-1">
      {/* axis */}
      <div className="flex items-center gap-2 pb-1">
        <span className="w-28 shrink-0" aria-hidden="true" />
        <div className="relative flex-1 h-4">
          {[lo, (lo + hi) / 2, hi].map((t, i) => (
            <span
              key={i}
              className="absolute top-0 -translate-x-1/2 text-xs text-slate-400 dark:text-slate-500 tabular-nums"
              style={{ left: pos(t) }}
            >
              {metric.format(t)}
            </span>
          ))}
        </div>
        <span className="w-12 shrink-0" aria-hidden="true" />
      </div>

      {rows.map((r) => {
        const sel = r.code === selectedCode;
        return (
          <button
            key={r.code}
            type="button"
            onClick={() => onSelect?.(r.code)}
            title={`${r.name}: ${metric.format(r.v)}`}
            className={`flex items-center gap-2 rounded-lg px-1 py-1 text-left transition-colors ${
              sel ? "bg-blue-50 dark:bg-blue-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-700/40"
            }`}
          >
            <span
              className={`w-28 shrink-0 text-right text-sm leading-tight ${
                sel ? "font-semibold text-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {r.name}
            </span>
            <div className="relative flex-1 h-4">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-100 dark:bg-slate-700" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-slate-200 dark:bg-slate-600"
                style={{ width: pos(r.v) }}
              />
              <span
                className={`absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white dark:ring-slate-800 ${
                  sel ? "bg-blue-600" : color
                }`}
                style={{ left: pos(r.v) }}
              />
            </div>
            <span className="w-12 shrink-0 text-right text-sm tabular-nums text-slate-700 dark:text-slate-200">
              {metric.format(r.v)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
