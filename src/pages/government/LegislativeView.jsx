import { useState, useMemo } from "react";
import { HemicycleChart } from "../../components/charts";
import RepresentationMap from "../../components/RepresentationMap";
import { CHAMBERS, PARTY_META, CONSTITUENCY_META, partiesForChamber } from "../../data/congress";
import deptData from "../../data/departments.json";

const deptName = (code) => deptData.departments[code]?.name ?? code;

// Condense the official committee string, e.g.
// "Comisión Séptima Constitucional Permanente (Constitucional) | Comisión …"
// → "Comisión Séptima  (+1)".
function shortCommission(raw) {
  const parts = raw.split("|").map((s) => s.trim()).filter(Boolean);
  const first = parts[0]
    .replace("Constitucional Permanente", "")
    .replace(/\s*\([^)]*\)\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return parts.length > 1 ? `${first} (+${parts.length - 1})` : first;
}

// Tags worth flagging in the roster (territorial / national are the norm).
const SPECIAL_CONSTITUENCIES = new Set(["indigena", "afro", "citrep", "comunes", "internacional", "runnerup"]);
const SPECIAL_LABEL = {
  indigena: "Indígena", afro: "Afro", citrep: "CITREP",
  comunes: "Paz", internacional: "Exterior", runnerup: "Oposición",
};

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

  // The Cámara carries its complete roster; the Senado carries a verified sample.
  const fullRoster = chamberId === "camara";
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
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400 dark:text-slate-500">
            <span>
              Periodo {chamber.period} · {chamber.totalSeats} curules
              {fullRoster && chamber.members.length < chamber.totalSeats && (
                <> · {chamber.members.length} en ejercicio</>
              )}
            </span>
            <span className="whitespace-nowrap text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-full px-2 py-0.5">
              {fullRoster ? "Directorio camara.gov.co" : "Directorio senado.gov.co"}
            </span>
          </div>
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
                {selectedDept ? `Representantes · ${deptName(selectedDept)}` : "Representantes"}
                <span className="ml-1.5 font-normal text-slate-400 dark:text-slate-500">({roster.length})</span>
              </p>
              {selectedDept && (
                <button onClick={() => setSelectedDept(null)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Ver todos
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-[420px] pr-3">
              <MemberList members={roster} emptyHint={`No hay representantes de ${deptName(selectedDept)} en el directorio.`} />
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Senadores (muestra)</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
            El Senado se elige por circunscripción nacional, por lo que sus curules no se asignan por departamento.
          </p>
          <MemberList members={roster} />
          <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
            El conteo de curules es completo; el listado de nombres es una selección verificada.
          </p>
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
          <li key={m.id} className="flex items-start gap-3 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: party.color }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-800 dark:text-slate-100 truncate">{m.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                {party.name}{m.departmentCode ? ` · ${deptName(m.departmentCode)}` : ""}
              </p>
              {m.commission && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate" title={m.commission}>
                  {shortCommission(m.commission)}
                </p>
              )}
            </div>
            <div className="shrink-0 flex flex-col items-end gap-1">
              {SPECIAL_CONSTITUENCIES.has(m.constituency) && (
                <span
                  title={CONSTITUENCY_META[m.constituency]}
                  className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600/50 rounded-full px-2 py-0.5"
                >
                  {SPECIAL_LABEL[m.constituency]}
                </span>
              )}
              {m.email && (
                <a
                  href={`mailto:${m.email}`}
                  title={m.email}
                  className="text-slate-300 hover:text-blue-600 dark:text-slate-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Escribir a ${m.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
                  </svg>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
