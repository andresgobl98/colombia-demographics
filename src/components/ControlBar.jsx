import MetricSelector from "./MetricSelector";
import TimelineSlider from "./TimelineSlider";

/**
 * Unified control bar: the metric dropdown and the year slider share one
 * container. The year always matters — even when the map is colored by a static
 * metric like area, the detail panel still shows year-dependent demographics —
 * so the slider is always present.
 *
 * Stacks vertically on mobile (dropdown over slider, split by a horizontal
 * rule) and sits in a single row on desktop (split by a vertical rule).
 */
export default function ControlBar() {
  return (
    <div className="shrink-0 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-4 py-2.5">
      <MetricSelector />
      <div className="w-full h-px md:w-px md:h-8 bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 min-w-0">
        <TimelineSlider embedded />
      </div>
    </div>
  );
}
