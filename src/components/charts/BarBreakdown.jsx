/**
 * Labeled horizontal bars — every group stays visible regardless of size.
 * Bar width reflects true proportion; the value label always carries the exact
 * figure, so tiny groups never get erased (unlike a pie/donut).
 *
 * Also powers ranked lists via `showRank` (rankings are just ordered bars).
 *
 * @param {Array<{name:string, value:number, color:string}>} data
 * @param {(v:number)=>string} [formatValue]  formats the trailing value label
 * @param {number} [labelWidth]               px width reserved for the name column
 * @param {boolean} [showRank]                prefix each row with its 1-based position
 */
export default function BarBreakdown({
  data,
  formatValue = (v) => `${v}%`,
  labelWidth = 112,
  showRank = false,
}) {
  const max = Math.max(...data.map((d) => d.value), 0);

  return (
    <ul className="flex flex-col gap-2">
      {data.map((entry, i) => {
        const pct = max > 0 ? (entry.value / max) * 100 : 0;
        return (
          <li key={entry.name} className="flex items-center gap-2">
            {showRank && (
              <span className="text-xs text-slate-500 dark:text-slate-400 w-4 text-right shrink-0 tabular-nums">
                {i + 1}
              </span>
            )}
            <span
              className="text-xs text-slate-600 dark:text-slate-300 shrink-0 truncate"
              style={{ width: labelWidth }}
            >
              {entry.name}
            </span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  // floor non-zero groups at 2px so they never vanish
                  width: entry.value > 0 ? `max(2px, ${pct}%)` : 0,
                  backgroundColor: entry.color,
                }}
              />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 w-16 text-right tabular-nums">
              {formatValue(entry.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
