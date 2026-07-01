import { LineChart } from "../charts";
import { Copy } from "../ui";
import { getPopulationSeries, DEFAULT_YEAR } from "../../data/selectors";
import { useDemographics } from "../../state/demographicsStore";

const fullFmt = (v) => v.toLocaleString("es-CO");

/**
 * Population trend across the full projected range (2018–2050) for the
 * selected department, or the national aggregate. Follows the same selection
 * as the map; the point previewed by default is the year picker's current
 * year, so this section and the summary band above always agree. The line
 * lightens from DEFAULT_YEAR (today) onward as a visual "still to come" cue.
 */
export default function PopulationTrendSection() {
  const { selectedDept, selectedDeptCode: code, selectedYear: year } = useDemographics();
  const name = selectedDept ? selectedDept.name : "Colombia";
  const data = getPopulationSeries(code);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-3">
      <Copy as="p" variant="detail" className="font-semibold">
        Tendencia de población · {name}
      </Copy>
      <LineChart data={data} activeX={year} splitX={DEFAULT_YEAR} formatY={fullFmt} />
      <Copy as="p" variant="annotation" className="leading-snug">
        Proyección del DANE (PPED). El tramo claro, desde {DEFAULT_YEAR}, es lo que aún está por venir.
      </Copy>
    </div>
  );
}
