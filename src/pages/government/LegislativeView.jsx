import { useState, useMemo } from "react";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { Copy, InteractiveHint } from "../../components/ui";
import { HemicycleChart } from "../../components/charts";
import { RepresentationMap } from "../../components/maps";
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

  const fullRoster = true;
  const roster =
    chamber.byDepartment && selectedDept
      ? chamber.members.filter((m) => m.departmentCode === selectedDept)
      : chamber.members;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Branch-level intro — mirrors the Ejecutiva / Judicial headers */}
      <div>
        <div className="flex items-center gap-2">
          <BuildingLibraryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <Copy as="h2" variant="title">Rama Legislativa</Copy>
        </div>
        <Copy as="p" variant="prose" className="mt-1">
          Hace las leyes y ejerce el control político sobre el Gobierno. La
          conforma el Congreso de la República, bicameral: el Senado, elegido por
          circunscripción nacional, y la Cámara de Representantes, por departamentos.
        </Copy>
      </div>

      {/* Chamber title + chamber switcher */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Copy as="h3" variant="title" className="text-lg">{chamber.name}</Copy>
          <Copy as="div" variant="detail" className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              Periodo {chamber.period} · {chamber.totalSeats} curules
              {fullRoster && chamber.members.length < chamber.totalSeats && (
                <> · {chamber.members.length} en ejercicio</>
              )}
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-full px-2 py-0.5">
              {chamberId === "camara" ? "Directorio camara.gov.co" : "Directorio senado.gov.co"}
            </span>
          </Copy>
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
        <Copy as="p" variant="detail" className="font-semibold mb-3">Distribución de curules</Copy>
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
                <Copy as="span" variant="detail" className="flex-1 truncate">{p.name}</Copy>
                <Copy as="span" variant="annotation" className="font-semibold tabular-nums">{p.seats}</Copy>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Members — map + roster for the departmental Cámara; full list for the national Senado */}
      {chamber.byDepartment ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-3 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-2 px-1">
              <Copy as="p" variant="detail" className="font-semibold">
                Representación por departamento
              </Copy>
              <InteractiveHint>Toca un departamento para filtrar la lista</InteractiveHint>
            </div>
            <div className="h-[50vh] min-h-[320px] md:h-[460px]">
              <RepresentationMap withData={withData} selectedId={selectedDept} onSelect={setSelectedDept} />
            </div>
          </Card>

          <Card className="p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <Copy as="p" variant="detail" className="font-semibold">
                {selectedDept ? `Representantes · ${deptName(selectedDept)}` : "Representantes"}
                <Copy as="span" variant="annotation" className="ml-1.5">({roster.length})</Copy>
              </Copy>
              {selectedDept && (
                <button onClick={() => setSelectedDept(null)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Ver todos
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-[45vh] md:max-h-[420px] pr-3">
              <MemberList members={roster} emptyHint={`No hay representantes de ${deptName(selectedDept)} en el directorio.`} />
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-4 flex flex-col">
          <Copy as="p" variant="detail" className="font-semibold mb-1">Senadores</Copy>
          <Copy as="p" variant="detail" className="mb-3">
            El Senado se elige por circunscripción nacional, por lo que sus curules no se asignan por departamento.
          </Copy>
          <MemberList members={roster} />
        </Card>
      )}
    </div>
  );
}

function MemberList({ members, emptyHint }) {
  if (!members || members.length === 0) {
    return <Copy variant="annotation">{emptyHint ?? "Sin datos."}</Copy>;
  }
  return (
    <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
      {members.map((m) => {
        const party = PARTY_META[m.partyId];
        return (
          <li key={m.id} className="flex items-start gap-3 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: party.color }} />
            <div className="min-w-0 flex-1">
              <Copy as="p" variant="detail" className="truncate text-slate-800 dark:text-slate-100">{m.name}</Copy>
              <Copy as="p" variant="annotation" className="truncate">
                {party.name}{m.departmentCode ? ` · ${deptName(m.departmentCode)}` : ""}
              </Copy>
              {m.commission && (
                <Copy as="p" variant="annotation" className="truncate" title={m.commission}>
                  {shortCommission(m.commission)}
                </Copy>
              )}
            </div>
            <div className="shrink-0 flex flex-col items-end gap-1">
              {SPECIAL_CONSTITUENCIES.has(m.constituency) && (
                <span
                  title={CONSTITUENCY_META[m.constituency]}
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600/50 rounded-full px-2 py-0.5"
                >
                  {SPECIAL_LABEL[m.constituency]}
                </span>
              )}
              {m.email && (
                <a
                  href={`mailto:${m.email}`}
                  title={m.email}
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
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
