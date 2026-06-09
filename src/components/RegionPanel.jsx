import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

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

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

// Labeled horizontal bars — every group stays visible regardless of size.
// Bar width reflects true proportion; the value label always carries the exact figure.
function BarBreakdown({ data }) {
  const max = Math.max(...data.map((d) => d.value), 0);
  return (
    <ul className="flex flex-col gap-2">
      {data.map((entry) => {
        const pct = max > 0 ? (entry.value / max) * 100 : 0;
        return (
          <li key={entry.name} className="flex items-center gap-2">
            <span className="text-xs text-slate-600 w-28 shrink-0 truncate">{entry.name}</span>
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
              {entry.value}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function DonutChart({ data, formatTooltip }) {
  return (
    <div style={{ height: 230 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={48}
            outerRadius={75}
            paddingAngle={0.1}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function RegionPanel({ department, national, onBack }) {
  const isNational = !department;
  const display    = isNational ? national : department;

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
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors -mb-1 self-start"
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
            <h2 className="text-xl font-bold text-slate-800">Colombia</h2>
            <p className="text-sm text-slate-400">Total nacional · CNPV 2018</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-800">{department.name}</h2>
            {department.capital && (
              <p className="text-sm text-slate-400">Capital: {department.capital}</p>
            )}
          </>
        )}
      </div>

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
          <p className="text-sm font-semibold text-slate-600 mb-1">Distribución por sexo</p>
          <DonutChart
            data={sexData}
            formatTooltip={(v) => v.toLocaleString("es-CO")}
          />
        </div>
      )}

      {/* Desglose por etnia */}
      {ethnicityData.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-2">Autorreconocimiento étnico</p>
          <BarBreakdown data={ethnicityData} />
        </div>
      )}

      {isNational && (
        <p className="text-xs text-slate-400 text-center pt-2 border-t border-slate-100">
          Haz clic en un departamento para ver su detalle
        </p>
      )}
    </div>
  );
}
