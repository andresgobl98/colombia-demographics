import { YEARS } from "../data/selectors";
import { useDemographics } from "../state/demographicsStore";

/**
 * Year scrubber for the population timeline (DANE PPED 2018–2050).
 *
 * @param {boolean} embedded  drop the standalone card chrome so the slider can
 *                            sit inside a shared container (e.g. the ControlBar)
 */
export default function TimelineSlider({ embedded = false }) {
  const { selectedYear, setSelectedYear } = useDemographics();
  const index = YEARS.indexOf(selectedYear);
  const max = YEARS.length - 1;

  const wrapper = embedded
    ? "flex items-center gap-3 w-full"
    : "bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 px-4 py-2 flex items-center gap-3 w-full pointer-events-auto";

  return (
    <div className={wrapper}>
      <div className="shrink-0 text-center w-12">
        <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tabular-nums leading-none">{selectedYear}</span>
      </div>
      <div className="flex-1 flex flex-col">
        <input
          type="range"
          min={0}
          max={max}
          value={index === -1 ? 0 : index}
          onChange={(e) => setSelectedYear(YEARS[Number(e.target.value)])}
          className="w-full accent-blue-600 cursor-pointer"
          aria-label="Año"
        />
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 -mt-0.5 px-0.5">
          <span>{YEARS[0]}</span>
          <span>{YEARS[max]}</span>
        </div>
      </div>
    </div>
  );
}
