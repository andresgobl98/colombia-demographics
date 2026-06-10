/**
 * Year scrubber for the population timeline (DANE PPED 2018–2050).
 *
 * @param {number[]} years   ascending list of available years
 * @param {number} value     currently selected year
 * @param {(year:number)=>void} onChange
 */
export default function TimelineSlider({ years, value, onChange }) {
  const index = years.indexOf(value);
  const max = years.length - 1;

  return (
    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 px-4 py-2 flex items-center gap-3 w-[min(92%,360px)] pointer-events-auto">
      <div className="shrink-0 text-center w-12">
        <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tabular-nums leading-none">{value}</span>
      </div>
      <div className="flex-1 flex flex-col">
        <input
          type="range"
          min={0}
          max={max}
          value={index === -1 ? 0 : index}
          onChange={(e) => onChange(years[Number(e.target.value)])}
          className="w-full accent-blue-600 cursor-pointer"
          aria-label="Año"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 -mt-0.5 px-0.5">
          <span>{years[0]}</span>
          <span>{years[max]}</span>
        </div>
      </div>
    </div>
  );
}
