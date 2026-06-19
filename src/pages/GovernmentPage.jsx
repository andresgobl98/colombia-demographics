import { useParams, Navigate } from "react-router-dom";
import LegislativeView from "./government/LegislativeView";

// Branch switching now lives in the sidebar; this list only validates the
// :branch param and labels the "coming soon" placeholder.
const BRANCHES = [
  { id: "legislativo", label: "Legislativo" },
  { id: "ejecutivo", label: "Ejecutivo" },
  { id: "judicial", label: "Judicial" },
];

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
    <div className="flex-1 overflow-y-auto">
      {branch === "legislativo" ? (
        <LegislativeView />
      ) : (
        <ComingSoon label={BRANCHES.find((b) => b.id === branch).label} />
      )}
    </div>
  );
}
