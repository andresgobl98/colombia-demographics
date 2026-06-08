import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ETHNICITY_COLORS = {
  mestizo: "#6366f1",
  white: "#f59e0b",
  afro: "#10b981",
  indigenous: "#ef4444",
  other: "#94a3b8",
};

const ETHNICITY_LABELS = {
  mestizo: "Mestizo",
  white: "White",
  afro: "Afro-Colombian",
  indigenous: "Indigenous",
  other: "Other",
};

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function RegionPanel({ department, metrics }) {
  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 p-6 text-center">
        <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
        <p className="text-sm">Click a department on the map to see its demographics.</p>
      </div>
    );
  }

  const ethnicityData = Object.entries(department.ethnicity ?? {}).map(([key, value]) => ({
    name: ETHNICITY_LABELS[key] ?? key,
    value,
    color: ETHNICITY_COLORS[key] ?? "#cbd5e1",
  }));

  const sexData = Object.entries(department.sex ?? {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: key === "male" ? "#3b82f6" : "#f43f5e",
  }));

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{department.name}</h2>
        <p className="text-sm text-slate-400">Capital: {department.capital}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <StatCard
            key={m.id}
            label={m.label}
            value={
              m.id === "population"
                ? (department[m.id] ?? 0).toLocaleString("es-CO")
                : m.format(department[m.id])
            }
          />
        ))}
        <StatCard label="Area" value={`${(department.area_km2 ?? 0).toLocaleString()} km²`} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-600 mb-2">Ethnicity breakdown</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={ethnicityData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {ethnicityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-600 mb-2">Sex breakdown</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={sexData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {sexData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
