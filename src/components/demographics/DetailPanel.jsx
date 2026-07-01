import { BarBreakdown } from "../charts";
import { StatCard, Copy } from "../ui";
import { useDemographics } from "../../state/demographicsStore";

const SEX_COLORS = { male: "#3b82f6", female: "#f43f5e" };
const SEX_LABELS = { male: "Hombres", female: "Mujeres" };

/**
 * The map companion's "Detalle" face: a quick profile of the selected department
 * (or the national aggregate when nothing is selected) — key figures plus the
 * sex split. The age pyramid and ethnicity breakdown live in their own full-width
 * sections below, so they're intentionally not repeated here.
 */
export default function DetailPanel() {
  const { selectedDept: department, national, selectedYear: year } = useDemographics();
  const isNational = !department;
  const display = isNational ? national : department;

  const sexData = Object.entries(display?.sex ?? {}).map(([key, value]) => ({
    name: SEX_LABELS[key] ?? key,
    value,
    color: SEX_COLORS[key] ?? "#cbd5e1",
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Copy as="h2" variant="title">{isNational ? "Colombia" : department.name}</Copy>
        <Copy as="p" variant="annotation">
          {isNational
            ? `Total nacional · ${year}`
            : `${department.capital ? `Capital: ${department.capital} · ` : ""}${year}`}
        </Copy>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Población" value={display?.population?.toLocaleString("es-CO") ?? "N/D"} />
        <StatCard
          label="Superficie"
          value={display?.area_km2 ? `${display.area_km2.toLocaleString("es-CO")} km²` : "N/D"}
        />
        <StatCard label="Hombres" value={display?.sex?.male?.toLocaleString("es-CO") ?? "N/D"} />
        <StatCard label="Mujeres" value={display?.sex?.female?.toLocaleString("es-CO") ?? "N/D"} />
      </div>

      {sexData.length > 0 && (
        <div>
          <Copy as="p" variant="detail" className="font-semibold mb-1">Distribución por sexo</Copy>
          <BarBreakdown data={sexData} formatValue={(v) => v.toLocaleString("es-CO")} />
        </div>
      )}

      {isNational && (
        <Copy as="p" variant="annotation" className="text-center pt-2 border-t border-slate-100 dark:border-slate-700">
          Haz clic en un departamento para ver su detalle
        </Copy>
      )}
    </div>
  );
}
