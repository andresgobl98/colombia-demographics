import { useParams, Navigate, NavLink } from "react-router-dom";
import LegislativeView from "./government/LegislativeView";

const BRANCHES = [
  { id: "legislativo", label: "Legislativo" },
  { id: "ejecutivo", label: "Ejecutivo" },
  { id: "judicial", label: "Judicial" },
];

function branchTabClass({ isActive }) {
  return [
    "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
    isActive
      ? "border-blue-600 text-blue-600 dark:text-blue-400"
      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200",
  ].join(" ");
}

function ComingSoon({ label }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 gap-3 text-slate-400 dark:text-slate-500">
      <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
      <p className="font-medium text-slate-500 dark:text-slate-400">Rama {label}</p>
      <p className="text-sm max-w-xs">Esta sección está en construcción. Próximamente.</p>
    </div>
  );
}

export default function GovernmentPage() {
  const { branch } = useParams();
  if (!BRANCHES.some((b) => b.id === branch)) {
    return <Navigate to="/gobierno/legislativo" replace />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Branch switcher */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 flex gap-1 shrink-0 overflow-x-auto">
        {BRANCHES.map((b) => (
          <NavLink key={b.id} to={`/gobierno/${b.id}`} className={branchTabClass}>
            {b.label}
          </NavLink>
        ))}
      </div>

      {/* Branch content */}
      <div className="flex-1 overflow-y-auto">
        {branch === "legislativo" ? (
          <LegislativeView />
        ) : (
          <ComingSoon label={BRANCHES.find((b) => b.id === branch).label} />
        )}
      </div>
    </div>
  );
}
