import { useState, useMemo } from "react";
import { HemicycleChart } from "../../components/charts";
import RepresentationMap from "../../components/RepresentationMap";
import { CHAMBERS, PARTY_META, partiesForChamber } from "../../data/congress";
import deptData from "../../data/departments.json";

const deptName = (code) => deptData.departments[code]?.name ?? code;

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
}

function chamberBtnClass(active) {
  return [
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
    active
      ? "bg-blue-600 text-white"
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
  ].join(" ");
}

export default function LegislativeView() {
  const [chamberId, setChamberId] = useState("camara");
  const [highlight, setHighlight] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  const chamber = CHAMBERS[chamberId];
  const orderedParties = useMemo(() => partiesForChamber(chamber), [chamber]);
  const withData = useMemo(
    () => new Set(chamber.members.map((m) => m.departmentCode).filter(Boolean)),
    [chamber]
  );

  const switchChamber = (id) => {
    setChamberId(id);
    setSelectedDept(null);
    setHighlight(null);
  };

  const roster =
    chamber.byDepartment && selectedDept
      ? chamber.members.filter((m) => m.departmentCode === selectedDept)
      : chamber.members;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header + chamber switcher */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{chamber.name}</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Periodo {chamber.period} · {chamber.totalSeats} curules
            <span className="ml-2 text-[11px] font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-full px-2 py-0.5">
              Datos ilustrativos
            </span>
          </p>
        </div>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-700/40 rounded-xl p-1">
          <button onClick={() => switchChamber("camara")} className={chamberBtnClass(chamberId === "camara")}>
            Cámara
          </button>
          <button onClick={() => switchChamber("senado")} className={chamberBtnClass(chamberId === "senado")}>
            Senado
          </button>
        </div>
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

      {/* Members — map + roster for the departmental Cámara; full list for the national Senado */}
      {chamber.byDepartment ? (
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
                <button onClick={() => setSelectedDept(null)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Ver todos
                </button>
              )}
            </div>
            <MemberList members={roster} emptyHint={`Sin representantes en los datos de muestra para ${deptName(selectedDept)}.`} />
          </Card>
        </div>
      ) : (
        <Card className="p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Senadores (muestra)</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
            El Senado se elige por circunscripción nacional, por lo que sus curules no se asignan por departamento.
          </p>
          <MemberList members={roster} />
        </Card>
      )}
    </div>
  );
}

function MemberList({ members, emptyHint }) {
  if (!members || members.length === 0) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">{emptyHint ?? "Sin datos."}</p>;
  }
  return (
    <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
      {members.map((m) => {
        const party = PARTY_META[m.partyId];
        return (
          <li key={m.id} className="flex items-center gap-3 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: party.color }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-800 dark:text-slate-100 truncate">{m.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                {party.name}{m.departmentCode ? ` · ${deptName(m.departmentCode)}` : ""}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
