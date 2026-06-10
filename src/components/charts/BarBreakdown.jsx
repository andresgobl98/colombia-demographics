/**
 * Labeled horizontal bars — every group stays visible regardless of size.
 * Bar width reflects true proportion; the value label always carries the exact
 * figure, so tiny groups never get erased (unlike a pie/donut).
 *
 * @param {Array<{name:string, value:number, color:string}>} data
 * @param {(v:number)=>string} [formatValue]  formats the trailing value label
 * @param {number} [labelWidth]               px width reserved for the name column
 */
export default function BarBreakdown({
  data,
  formatValue = (v) => `${v}%`,
  labelWidth = 112,
}) {
  const max = Math.max(...data.map((d) => d.value), 0);

  return (
    <ul className="flex flex-col gap-2">
      {data.map((entry) => {
        const pct = max > 0 ? (entry.value / max) * 100 : 0;
        return (
          <li key={entry.name} className="flex items-center gap-2">
            <span
              className="text-xs text-slate-600 shrink-0 truncate"
              style={{ width: labelWidth }}
            >
              {entry.name}
            </span>
            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  // floor non-zero groups at 2px so they never vanish
                  width: entry.value > 0 ? `max(2px, ${pct}%)` : 0,
                  backgroundColor: entry.color,
                }}
              />
            </div>
            <span className="text-xs font-medium text-slate-700 w-12 text-right tabular-nums">
              {formatValue(entry.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
