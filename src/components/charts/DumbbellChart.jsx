/**
 * Dumbbell chart — for each department, two related metrics (e.g. acueducto vs.
 * alcantarillado coverage) plotted as two dots on a shared 0–100 track, joined by
 * a segment whose length is the gap between them. Sorted by that gap (largest
 * first) so the disparity is the story. Rows are clickable (→ onSelect) and the
 * selected one is highlighted. HTML/CSS (responsive, no viewBox scaling).
 *
 * @param {Object} departments  keyed by code, each carrying both metric values
 * @param {Object} metricA      descriptor for the first dot (id, label, format)
 * @param {Object} metricB      descriptor for the second dot
 * @param {string} [colorA]     Tailwind bg-* class for dot A
 * @param {string} [colorB]     Tailwind bg-* class for dot B
 * @param {[number,number]} [domain]
 * @param {string|null} [selectedCode]
 * @param {(code:string)=>void} [onSelect]
 */
export default function DumbbellChart({
  departments,
  metricA,
  metricB,
  colorA = "bg-blue-500",
  colorB = "bg-emerald-500",
  domain = [0, 100],
  selectedCode,
  onSelect,
}) {
  const [lo, hi] = domain;
  const span = hi - lo || 1;
  const pos = (v) => `${((v - lo) / span) * 100}%`;

  const rows = Object.entries(departments)
    .map(([code, d]) => ({ code, name: d.name, a: d[metricA.id], b: d[metricB.id] }))
    .filter((r) => r.a != null && r.b != null)
    .sort((x, y) => y.a - y.b - (x.a - x.b));

  return (
    <div className="flex flex-col gap-1">
      {/* axis */}
      <div className="flex items-center gap-2 pb-1">
        <span className="w-28 shrink-0" aria-hidden="true" />
        <div className="relative flex-1 h-4">
          {[0, 50, 100].map((t) => (
            <span
              key={t}
              className="absolute top-0 -translate-x-1/2 text-xs text-slate-400 dark:text-slate-500 tabular-nums"
              style={{ left: `${t}%` }}
            >
              {t}%
            </span>
          ))}
        </div>
      </div>

      {rows.map((r) => {
        const sel = r.code === selectedCode;
        const mn = Math.min(r.a, r.b);
        const mx = Math.max(r.a, r.b);
        return (
          <button
            key={r.code}
            type="button"
            onClick={() => onSelect?.(r.code)}
            title={`${r.name} — ${metricA.label}: ${metricA.format(r.a)}; ${metricB.label}: ${metricB.format(r.b)}`}
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
                className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                style={{ left: pos(mn), width: `${((mx - mn) / span) * 100}%` }}
              />
              <span
                className={`absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white dark:ring-slate-800 ${colorA}`}
                style={{ left: pos(r.a) }}
              />
              <span
                className={`absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white dark:ring-slate-800 ${colorB}`}
                style={{ left: pos(r.b) }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
