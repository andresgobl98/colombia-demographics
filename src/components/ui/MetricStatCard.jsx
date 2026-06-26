import { metricSentence } from "../../data/metricStatement";
import { renderMetricIcon, toneFor } from "./metricVisuals";
import Copy from "./Copy";

const NUM_SIZE = {
  lg: "text-5xl sm:text-6xl",
  md: "text-3xl sm:text-4xl",
};

/**
 * Statement card for a single metric: the figure is the hero — large and
 * tone-coloured — with the sentence's trailing clause as its caption, an icon in
 * a tinted badge, and the metric's definition anchored at the bottom. Shared by
 * the poverty and demographics views; the metric descriptor supplies the icon,
 * tone, sentence and formatting.
 *
 * @param {Object} metric   metric descriptor (label, description, tone, icon, sentence, format)
 * @param {number|null} value
 * @param {"lg"|"md"} [size="md"]
 */
export default function MetricStatCard({ metric, value, size = "md" }) {
  const tone = toneFor(metric);
  // The big number is the statement; the sentence's trailing clause becomes its
  // caption, so any leading word ("El") is dropped on purpose.
  const { number, after } = metricSentence(metric, value);
  return (
    <div
      className={`flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-l-4 ${tone.border} shadow-sm p-5`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tone.badge}`}>
          {renderMetricIcon(metric, `w-5 h-5 ${tone.icon}`)}
        </span>
        <Copy as="p" variant="eyebrow">{metric.label}</Copy>
      </div>

      <div>
        {/* Bare element: a Copy variant would impose a slate colour that wins the
            Tailwind cascade over this semantic tone. */}
        <p className={`${NUM_SIZE[size] ?? NUM_SIZE.md} font-bold leading-none tracking-tight tabular-nums ${tone.num}`}>
          {number}
        </p>
        {after && <Copy as="p" variant="body" className="mt-2 leading-snug">{after}</Copy>}
      </div>

      {metric.description && (
        <Copy
          as="p"
          variant="annotation"
          className="leading-snug pt-3 mt-auto border-t border-slate-100 dark:border-slate-700"
        >
          {metric.description}
        </Copy>
      )}
    </div>
  );
}
