import { useEffect, useState } from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Copy, ExternalLink } from "../../components/ui";
import { SeniorCard, MinistryCard, ElectionResultsSection } from "../../components/government";
import { PRESIDENTE, VICEPRESIDENTE, MINISTRIES } from "../../data/executive";

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
      <Copy as="span" variant="eyebrow" className="tracking-wider whitespace-nowrap">
        Consejo de Ministros · {count} carteras
      </Copy>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function ExecutiveView() {
  const columns = useColumnCount();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col">
      <header className="mb-8 w-full">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <Copy as="h2" variant="title">Rama Ejecutiva</Copy>
        </div>
        <Copy as="p" variant="prose" className="mt-1">
          Dirige el Estado, define las políticas públicas y administra los asuntos
          de la Nación. La encabeza el Presidente de la República, junto al
          Vicepresidente y el Consejo de Ministros. · Gobierno Petro 2022–2026
        </Copy>
      </header>

      <div className="flex flex-col items-center">
        <ElectionResultsSection />

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

        <Copy as="p" variant="detail" className="mt-6 text-center">
          Titulares actualizados a jun. 2026 · Verificar en{" "}
          <ExternalLink
            href="https://www.presidencia.gov.co"
            className="hover:text-slate-800 dark:hover:text-slate-100"
          >
            presidencia.gov.co
          </ExternalLink>
        </Copy>
      </div>
    </div>
  );
}
