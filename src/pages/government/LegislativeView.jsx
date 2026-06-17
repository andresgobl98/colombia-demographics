import { useState, useMemo } from "react";
import { HemicycleChart } from "../../components/charts";
import RepresentationMap from "../../components/RepresentationMap";
import { CHAMBER, PARTIES, REPRESENTATIVES, partyById } from "../../data/congress";
import deptData from "../../data/departments.json";

const deptName = (code) => deptData.departments[code]?.name ?? code;

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
}

export default function LegislativeView() {
  const [highlight, setHighlight] = useState(null);   // party id
  const [selectedDept, setSelectedDept] = useState(null);

  const withData = useMemo(
    () => new Set(REPRESENTATIVES.map((r) => r.departmentCode)),
    []
  );

  // High → low representation: legend reads top-to-bottom, hemicycle left-to-right.
  const orderedParties = useMemo(
    () => [...PARTIES].sort((a, b) => b.seats - a.seats),
    []
  );

  const roster = selectedDept
    ? REPRESENTATIVES.filter((r) => r.departmentCode === selectedDept)
    : REPRESENTATIVES;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <header>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{CHAMBER.name}</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Periodo {CHAMBER.period} · {CHAMBER.totalSeats} curules
          <span className="ml-2 text-[11px] font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-full px-2 py-0.5">
            Datos ilustrativos
          </span>
        </p>
      </header>

      {/* Composition: hemicycle + party legend */}
      <Card className="p-4 md:p-6">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Distribución de curules</p>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <HemicycleChart parties={orderedParties} highlightId={highlight} onHighlight={setHighlight} />
          <ul className="flex flex-col gap-1.5">
            {orderedParties.map((p) => (
              <li
                key={p.id}
                onMouseEnter={() => setHighlight(p.id)}
                onMouseLeave={() => setHighlight(null)}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-default transition-colors ${
                  highlight === p.id ? "bg-slate-100 dark:bg-slate-700/60" : ""
                }`}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{p.name}</span>
                <span className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">{p.seats}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Representation by department: map + roster */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-3">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 px-1">
            Representación por departamento
          </p>
          <div className="h-[460px]">
            <RepresentationMap withData={withData} selectedId={selectedDept} onSelect={setSelectedDept} />
          </div>
        </Card>

        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {selectedDept ? `Representantes · ${deptName(selectedDept)}` : "Representantes (muestra)"}
            </p>
            {selectedDept && (
              <button
                onClick={() => setSelectedDept(null)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver todos
              </button>
            )}
          </div>

          {roster.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Sin representantes en los datos de muestra para {deptName(selectedDept)}.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
              {roster.map((r) => {
                const party = partyById[r.partyId];
                return (
                  <li key={r.id} className="flex items-center gap-3 py-2.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: party.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-800 dark:text-slate-100 truncate">{r.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                        {party.name} · {deptName(r.departmentCode)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
