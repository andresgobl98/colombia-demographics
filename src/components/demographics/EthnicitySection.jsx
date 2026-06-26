import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { BarBreakdown } from "../charts";
import { Copy } from "../ui";
import { useDemographics } from "../../state/demographicsStore";

const ETHNICITY_COLORS = {
  indigena: "#fbbf24",
  gitano_rrom: "#4ade80",
  raizal: "#60a5fa",
  palenquero: "#a78bfa",
  afro: "#f87171",
  ningun_grupo: "#cbd5e1",
  sin_informacion: "#f472b6",
};
const ETHNICITY_LABELS = {
  indigena: "Indígena",
  gitano_rrom: "Gitano / Rrom",
  raizal: "Raizal",
  palenquero: "Palenquero",
  afro: "Afrocolombiano",
  ningun_grupo: "Ningún grupo",
  sin_informacion: "Sin información",
};

/**
 * Ethnic self-recognition breakdown for the selected department (or national).
 * Unlike the rest of the page this comes from the 2018 census and does NOT vary
 * by year — the pill in the header makes that exception explicit.
 */
export default function EthnicitySection() {
  const { selectedDept, national } = useDemographics();
  const display = selectedDept ?? national;
  const name = selectedDept ? selectedDept.name : "Colombia";

  const data = Object.entries(display?.ethnicity ?? {})
    .map(([key, value]) => ({
      name: ETHNICITY_LABELS[key] ?? key,
      value,
      color: ETHNICITY_COLORS[key] ?? "#cbd5e1",
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <Copy as="p" variant="detail" className="font-semibold">
          Autorreconocimiento étnico · {name}
        </Copy>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/40 px-2.5 py-1 whitespace-nowrap shrink-0"
          title="El DANE no publica proyección étnica, así que esta cifra es la misma para todos los años."
        >
          <InformationCircleIcon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">Censo 2018 · no varía por año</span>
        </span>
      </div>

      <BarBreakdown data={data} />

      <Copy as="p" variant="annotation" className="leading-snug">
        Proporción de personas que se reconocen en cada grupo étnico, según el Censo Nacional 2018
        (CNPV). Es la cifra más reciente: el DANE no proyecta la composición étnica entre censos, por
        lo que no cambia al mover el año.
      </Copy>
    </div>
  );
}
