import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SEX_COLORS = { male: "#3b82f6", female: "#f43f5e" };
const SEX_LABELS  = { male: "Male", female: "Female" };

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function SexPieChart({ sex }) {
  const data = Object.entries(sex ?? {}).map(([key, value]) => ({
    name: SEX_LABELS[key] ?? key,
    value,
    color: SEX_COLORS[key] ?? "#cbd5e1",
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={48}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => v.toLocaleString("es-CO")} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Aggregate all departments into a national total
function buildNational(departments) {
  const totals = { population: 0, sex: { male: 0, female: 0 }, area_km2: 0 };
  Object.values(departments).forEach((d) => {
    totals.population   += d.population  ?? 0;
    totals.sex.male     += d.sex?.male   ?? 0;
    totals.sex.female   += d.sex?.female ?? 0;
    totals.area_km2     += d.area_km2    ?? 0;
  });
  totals.masculinityIndex = parseFloat(
    ((totals.sex.male / totals.sex.female) * 100).toFixed(1)
  );
  return totals;
}

export default function RegionPanel({ department, allDepartments }) {
  const isNational = !department;
  const national   = isNational ? buildNational(allDepartments) : null;
  const display    = isNational ? national : department;

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
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
          value={display.population?.toLocaleString("es-CO") ?? "N/A"}
        />
        <StatCard
          label="Area"
          value={display.area_km2 ? `${display.area_km2.toLocaleString("es-CO")} km²` : "N/A"}
        />
        <StatCard
          label="Male"
          value={display.sex?.male?.toLocaleString("es-CO") ?? "N/A"}
        />
        <StatCard
          label="Female"
          value={display.sex?.female?.toLocaleString("es-CO") ?? "N/A"}
        />
        <StatCard
          label="Masculinity Index"
          value={display.masculinityIndex?.toFixed(1) ?? "N/A"}
        />
        {!isNational && (
          <StatCard label="Departments" value="—" />
        )}
        {isNational && (
          <StatCard label="Departments" value="33" />
        )}
      </div>

      {/* Sex breakdown chart */}
      <div>
        <p className="text-sm font-semibold text-slate-600 mb-2">Sex breakdown</p>
        <SexPieChart sex={display.sex} />
      </div>

      {/* Hint when no department selected */}
      {isNational && (
        <p className="text-xs text-slate-400 text-center mt-auto pt-2 border-t border-slate-100">
          Click a department on the map to see its details
        </p>
      )}
    </div>
  );
}
