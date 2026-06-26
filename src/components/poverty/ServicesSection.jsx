import { DumbbellChart } from "../charts";
import { Copy } from "../ui";
import { getPovertyMetric } from "../../data/povertyMetrics";
import { usePoverty } from "../../state/povertyStore";
import MetricStatCard from "./MetricStatCard";

const ACUEDUCTO = getPovertyMetric("acueducto");
const ALCANTARILLADO = getPovertyMetric("alcantarillado");
const INTERNET = getPovertyMetric("internet");
const DEFICIT = getPovertyMetric("deficit_habitacional");

const DOT_A = "bg-blue-500";
const DOT_B = "bg-emerald-500";

function LegendItem({ dot, label, definition }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`w-3 h-3 rounded-full shrink-0 mt-1 ${dot}`} />
      <Copy as="p" variant="detail" className="leading-snug">
        <span className="font-semibold text-slate-800 dark:text-slate-100">{label}:</span> {definition}
      </Copy>
    </div>
  );
}

/**
 * Living-conditions section content: the acueducto↔alcantarillado dumbbell (the
 * sanitation gap) with a definition legend, plus internet and housing-deficit
 * statement cards. Reads selection from the poverty store so its rows tie into the
 * same map/ranking selection.
 */
export default function ServicesSection() {
  const { departments, national, selectedDeptCode, selectDepartment } = usePoverty();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2">
          <LegendItem dot={DOT_A} label="Acueducto" definition="viviendas con agua potable por tubería." />
          <LegendItem
            dot={DOT_B}
            label="Alcantarillado"
            definition="viviendas conectadas a la red de aguas residuales."
          />
        </div>

        <DumbbellChart
          departments={departments}
          metricA={ACUEDUCTO}
          metricB={ALCANTARILLADO}
          colorA={DOT_A}
          colorB={DOT_B}
          selectedCode={selectedDeptCode}
          onSelect={selectDepartment}
        />

        <Copy as="p" variant="annotation" className="leading-snug">
          Ordenado por la brecha entre agua y saneamiento: arriba, los departamentos donde el
          alcantarillado va más rezagado frente al acueducto. Toca una fila para ver su detalle.
        </Copy>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricStatCard metric={INTERNET} value={national?.internet} size="md" />
        <MetricStatCard metric={DEFICIT} value={national?.deficit_habitacional} size="md" />
      </div>
    </div>
  );
}
