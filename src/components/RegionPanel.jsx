import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SEX_COLORS = { male: "#3b82f6", female: "#f43f5e" };
const SEX_LABELS  = { male: "Male", female: "Female" };

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
  indigena:        "Indigenous",
  gitano_rrom:     "Gitano / Rrom",
  raizal:          "Raizal",
  palenquero:      "Palenquero",
  afro:            "Afro-Colombian",
  ningun_grupo:    "None",
  sin_informacion: "Unknown",
};

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function DonutChart({ data, formatTooltip }) {
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={48}
            outerRadius={75}
            paddingAngle={2}
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

export default function RegionPanel({ department, national }) {
  const isNational = !department;
  const display    = isNational ? national : department;

  const sexData = Object.entries(display?.sex ?? {}).map(([key, value]) => ({
    name:  SEX_LABELS[key]  ?? key,
    value,
    color: SEX_COLORS[key] ?? "#cbd5e1",
  }));

  const ethnicityData = Object.entries(display?.ethnicity ?? {}).map(([key, value]) => ({
    name:  ETHNICITY_LABELS[key]  ?? key,
    value,
    color: ETHNICITY_COLORS[key] ?? "#cbd5e1",
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div>
        {isNational ? (
          <>
            <h2 className="text-xl font-bold text-slate-800">Colombia</h2>
            <p className="text-sm text-slate-400">National total · CNPV 2018</p>
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

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Population"
          value={display?.population?.toLocaleString("es-CO") ?? "N/A"}
        />
        <StatCard
          label="Area"
          value={display?.area_km2 ? `${display.area_km2.toLocaleString("es-CO")} km²` : "N/A"}
        />
        <StatCard
          label="Male"
          value={display?.sex?.male?.toLocaleString("es-CO") ?? "N/A"}
        />
        <StatCard
          label="Female"
          value={display?.sex?.female?.toLocaleString("es-CO") ?? "N/A"}
        />
        {isNational && (
          <StatCard label="Departments" value={national.departments} />
        )}
      </div>

      {/* Sex breakdown */}
      {sexData.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-1">Sex breakdown</p>
          <DonutChart
            data={sexData}
            formatTooltip={(v) => v.toLocaleString("es-CO")}
          />
        </div>
      )}

      {/* Ethnicity breakdown */}
      {ethnicityData.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-1">Ethnicity breakdown</p>
          <DonutChart
            data={ethnicityData}
            formatTooltip={(v) => `${v}%`}
          />
        </div>
      )}

      {isNational && (
        <p className="text-xs text-slate-400 text-center pt-2 border-t border-slate-100">
          Click a department on the map to see its details
        </p>
      )}
    </div>
  );
}
