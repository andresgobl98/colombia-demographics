import { useState, useEffect } from "react";
import { DonutChart, BarBreakdown, PopulationPyramid } from "./charts";
import { StatCard } from "./ui";
import TimelineSlider from "./TimelineSlider";
import { getAgePyramid } from "../data/selectors";
import { useDemographics } from "../state/demographicsStore";

const SEX_COLORS = { male: "#3b82f6", female: "#f43f5e" };
const SEX_LABELS  = { male: "Hombres", female: "Mujeres" };

const ETHNICITY_COLORS = {
  indigena:        "#fbbf24",
  gitano_rrom:     "#4ade80",
  raizal:          "#60a5fa",
  palenquero:      "#a78bfa",
  afro:            "#f87171",
  ningun_grupo:    "#cbd5e1",
  sin_informacion: "#f472b6",
};
const ETHNICITY_LABELS = {
  indigena:        "Indígena",
  gitano_rrom:     "Gitano / Rrom",
  raizal:          "Raizal",
  palenquero:      "Palenquero",
  afro:            "Afrocolombiano",
  ningun_grupo:    "Ningún grupo",
  sin_informacion: "Sin información",
};

export default function RegionPanel({ mobile = false }) {
  const {
    selectedDept: department,
    national,
    selectedDeptCode: code,
    selectedYear: year,
    closePanel,
  } = useDemographics();
  const isNational = !department;
  const display    = isNational ? national : department;

  // Age pyramid is lazy-loaded (age.json is fetched on first use, then cached).
  // We don't clear it between updates so year-scrubbing animates instead of
  // flashing a loading state (the cached data resolves near-instantly).
  const [pyramid, setPyramid] = useState(null);
  useEffect(() => {
    let active = true;
    getAgePyramid(code ?? null, year).then((p) => {
      if (active) setPyramid(p);
    });
    return () => { active = false; };
  }, [code, year]);

  const sexData = Object.entries(display?.sex ?? {}).map(([key, value]) => ({
    name:  SEX_LABELS[key]  ?? key,
    value,
    color: SEX_COLORS[key] ?? "#cbd5e1",
  }));

  const ethnicityData = Object.entries(display?.ethnicity ?? {})
    .map(([key, value]) => ({
      name:  ETHNICITY_LABELS[key]  ?? key,
      value,
      color: ETHNICITY_COLORS[key] ?? "#cbd5e1",
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Botón de regreso (solo móvil) */}
      {mobile && (
        <button
          onClick={closePanel}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors -mb-1 self-start"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al mapa
        </button>
      )}

      {/* Encabezado */}
      <div>
        {isNational ? (
          <>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Colombia</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">Total nacional · {year}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{department.name}</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {department.capital ? `Capital: ${department.capital}` : ""}
              {department.capital ? " · " : ""}{year}
            </p>
          </>
        )}
      </div>

      {/* Control de año (solo móvil — el escritorio lo muestra en la barra superior).
          El panel siempre muestra datos por año, así que el control va siempre. */}
      {mobile && (
        <div>
          <TimelineSlider />
        </div>
      )}

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Población"
          value={display?.population?.toLocaleString("es-CO") ?? "N/D"}
        />
        <StatCard
          label="Superficie"
          value={display?.area_km2 ? `${display.area_km2.toLocaleString("es-CO")} km²` : "N/D"}
        />
        <StatCard
          label="Hombres"
          value={display?.sex?.male?.toLocaleString("es-CO") ?? "N/D"}
        />
        <StatCard
          label="Mujeres"
          value={display?.sex?.female?.toLocaleString("es-CO") ?? "N/D"}
        />
        {isNational && (
          <StatCard label="Departamentos" value={national.departments} />
        )}
      </div>

      {/* Gráfica por sexo */}
      {sexData.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Distribución por sexo</p>
          <DonutChart
            data={sexData}
            formatTooltip={(v) => v.toLocaleString("es-CO")}
          />
        </div>
      )}

      {/* Pirámide poblacional por edad y sexo */}
      <div>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
          Pirámide poblacional
        </p>
        {pyramid ? (
          <PopulationPyramid
            ageGroups={pyramid.ageGroups}
            male={pyramid.male}
            female={pyramid.female}
          />
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500">Cargando…</p>
        )}
      </div>

      {/* Desglose por etnia */}
      {ethnicityData.length > 0 && (
        <div>
          <div className="flex items-baseline justify-between mb-2 gap-2">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Autorreconocimiento étnico</p>
            <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-full px-2 py-0.5 shrink-0">
              Censo 2018
            </span>
          </div>
          <BarBreakdown data={ethnicityData} />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-snug">
            Composición étnica del Censo Nacional 2018 (CNPV). El DANE no publica
            proyección étnica, por lo que este desglose no varía entre años.
          </p>
        </div>
      )}

      {isNational && (
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center pt-2 border-t border-slate-100 dark:border-slate-700">
          Haz clic en un departamento para ver su detalle
        </p>
      )}
    </div>
  );
}
