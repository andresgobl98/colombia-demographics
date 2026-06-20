import { useEffect, useState } from "react";
import { ChevronDownIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { PRESIDENTE, VICEPRESIDENTE, MINISTRIES } from "../../data/executive";

const MONTHS_ES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.",
                   "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

// Column count mirrors the Tailwind breakpoints we used before (1 < sm, 2 sm–lg,
// 3 ≥ lg). We resolve it in JS so cards can be split into *explicit* columns:
// each column owns a fixed slice of the list, so expanding a card only reflows
// its own column and never makes a card hop to another column (the CSS
// multi-column tradeoff we're replacing).
function useColumnCount() {
  const compute = () => {
    if (typeof window === "undefined") return 1;
    if (window.matchMedia("(min-width: 1024px)").matches) return 3;
    if (window.matchMedia("(min-width: 640px)").matches) return 2;
    return 1;
  };
  const [cols, setCols] = useState(compute);
  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 640px)"),
      window.matchMedia("(min-width: 1024px)"),
    ];
    const onChange = () => setCols(compute());
    queries.forEach((q) => q.addEventListener("change", onChange));
    return () => queries.forEach((q) => q.removeEventListener("change", onChange));
  }, []);
  return cols;
}

// Split a list into `cols` sequential, near-equal chunks (column-first order:
// the first column holds the lowest-numbered items).
function splitColumns(items, cols) {
  const out = Array.from({ length: cols }, () => []);
  const base = Math.floor(items.length / cols);
  const extra = items.length % cols; // first `extra` columns get one more
  let idx = 0;
  for (let c = 0; c < cols; c++) {
    const size = base + (c < extra ? 1 : 0);
    out[c] = items.slice(idx, idx + size);
    idx += size;
  }
  return out;
}

function formatSince(iso, approx = false) {
  const [y, m, d] = iso.split("-").map(Number);
  const mon = MONTHS_ES[m - 1];
  return approx ? `~${mon} ${y}` : `${d} ${mon} ${y}`;
}

function Connector() {
  return (
    <div className="flex justify-center">
      <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />
    </div>
  );
}

function CabinetDivider({ count }) {
  return (
    <div className="flex items-center gap-3 w-full my-1">
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">
        Consejo de Ministros · {count} carteras
      </span>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

function SeniorCard({ position }) {
  const isPresident = position.tier === 1;
  return (
    <div
      className={[
        "w-full max-w-xl",
        "bg-white dark:bg-slate-800 rounded-2xl shadow-sm",
        "border border-slate-200 dark:border-slate-700",
        isPresident
          ? "border-t-2 border-t-blue-600"
          : "border-t-2 border-t-slate-400 dark:border-t-slate-500",
        "p-5 md:p-6",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={[
            "text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 whitespace-nowrap",
            isPresident
              ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800"
              : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600",
          ].join(" ")}
        >
          {position.tierLabel}
        </span>
        <span className="text-sm text-slate-400 dark:text-slate-500 font-mono shrink-0 mt-0.5">
          {position.constitutionalBasis}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-0.5">
        {position.holder}
      </h3>
      <p className="text-base text-slate-500 dark:text-slate-400 mb-3">{position.title}</p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-slate-400 dark:text-slate-500 mb-4">
        <span>{position.party}</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <span>Posesión: {formatSince(position.since)}</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <span>Período {position.term}</span>
      </div>

      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
        {position.description}
      </p>
    </div>
  );
}

function MinistryCard({ ministry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className="group text-left w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex flex-col hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug uppercase tracking-wide">
          {ministry.shortTitle}
        </p>
        <span className="text-sm text-slate-300 dark:text-slate-600 font-mono shrink-0 tabular-nums">
          {String(ministry.order).padStart(2, "0")}
        </span>
      </div>

      <p className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug">
        {ministry.holder}
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
        {formatSince(ministry.since, ministry.sinceApprox)}
      </p>

      {/* Expandable description — animated height via the grid-rows 0fr→1fr
          technique; the inner wrapper clips overflow during the transition. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-1.5">
              {ministry.description}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 italic">
              {ministry.title}
            </p>
          </div>
        </div>
      </div>

      <span className="mt-3 flex items-center gap-1 text-sm text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
        />
        {expanded ? "Ocultar" : "Ver descripción"}
      </span>
    </button>
  );
}

export default function ExecutiveView() {
  const columns = useColumnCount();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col">
      <header className="mb-8 w-full">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Rama Ejecutiva</h2>
        </div>
        <p className="text-base text-slate-400 dark:text-slate-500 mt-1">
          Dirige el Estado, define las políticas públicas y administra los asuntos
          de la Nación. La encabeza el Presidente de la República, junto al
          Vicepresidente y el Consejo de Ministros. · Gobierno Petro 2022–2026
        </p>
      </header>

      <div className="flex flex-col items-center">
        <SeniorCard position={PRESIDENTE} />
        <Connector />
        <SeniorCard position={VICEPRESIDENTE} />
        <Connector />
        <CabinetDivider count={MINISTRIES.length} />

        {/* Explicit columns (not CSS grid/multi-column): each column is an
            independent flex stack, so expanding a card only pushes the cards
            below it in the same column — no row-stretch, no column-hopping. */}
        <div className="flex items-start gap-3 w-full mt-1">
          {splitColumns(MINISTRIES, columns).map((col, i) => (
            <div key={i} className="flex-1 min-w-0 flex flex-col gap-3">
              {col.map((m) => (
                <MinistryCard key={m.id} ministry={m} />
              ))}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-400 dark:text-slate-600 text-center">
          Titulares aproximados a ago. 2025 · Verificar en{" "}
          <a
            href="https://www.presidencia.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            presidencia.gov.co
          </a>
        </p>
      </div>
    </div>
  );
}
