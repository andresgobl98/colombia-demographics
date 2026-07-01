import { FlagIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Copy, ExternalLink } from "../ui";
import ElectionSplitBar from "./ElectionSplitBar";
import ElectionCandidateBar from "./ElectionCandidateBar";
import { formatPct } from "./format";
import { ELECTION_META, CANDIDATES, RUNOFF, FIRST_ROUND } from "../../data/elections2026";

function TemporarySectionBadge() {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
      Sección temporal
    </span>
  );
}

/**
 * Results of the 2026 presidential election (first round + runoff), shown as
 * a headline callout at the top of the executive-branch page while the
 * elected government is still transitioning in. See data/elections2026.js
 * for the removal note.
 */
export default function ElectionResultsSection() {
  const firstRoundMaxPct = Math.max(...FIRST_ROUND.results.map((r) => r.pct));
  const [winner, runnerUp] = RUNOFF.results;

  return (
    <section className="w-full mb-10 pb-8 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 flex-wrap mb-2">
        <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-950/40">
          <FlagIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </span>
        <Copy as="h2" variant="title" className="text-2xl md:text-3xl">
          {ELECTION_META.label}
        </Copy>
        <TemporarySectionBadge />
      </div>
      <Copy as="p" variant="prose" className="mb-5">
        En la segunda vuelta del 21 jun. 2026, {CANDIDATES[winner.candidateId].name} fue
        elegido presidente sobre {CANDIDATES[runnerUp.candidateId].name}. Asume el
        cargo el 7 ago. 2026, en reemplazo de Gustavo Petro.
      </Copy>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 md:p-6 flex flex-col gap-5">
        <Copy as="p" variant="eyebrow">Segunda vuelta · 21 jun. 2026</Copy>
        <ElectionSplitBar results={RUNOFF.results} candidates={CANDIDATES} turnoutPct={RUNOFF.turnoutPct} />
      </div>

      <details className="group mt-4">
        <summary className="flex items-center gap-1.5 cursor-pointer list-none text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors select-none [&::-webkit-details-marker]:hidden">
          <ChevronDownIcon className="w-4 h-4 transition-transform duration-150 group-open:rotate-180" />
          Ver primera vuelta · 31 may. 2026
        </summary>
        <div className="mt-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 md:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1">
            <Copy as="p" variant="eyebrow">Primera vuelta</Copy>
            <Copy as="p" variant="annotation">Participación {formatPct(FIRST_ROUND.turnoutPct)}</Copy>
          </div>
          {FIRST_ROUND.results.map((r) => (
            <ElectionCandidateBar
              key={r.candidateId}
              result={r}
              candidate={CANDIDATES[r.candidateId]}
              maxPct={firstRoundMaxPct}
            />
          ))}
          <Copy as="p" variant="annotation" className="pt-1 border-t border-slate-100 dark:border-slate-700">
            Otros candidatos: {formatPct(FIRST_ROUND.othersPct)}
          </Copy>
        </div>
      </details>

      <Copy as="p" variant="detail" className="mt-4 text-center">
        Resultados verificados a jun. 2026 · Fuente{" "}
        <ExternalLink href={ELECTION_META.sourceUrl} className="hover:text-slate-800 dark:hover:text-slate-100">
          registraduria.gov.co
        </ExternalLink>{" "}
        ·{" "}
        <ExternalLink href={ELECTION_META.wikipediaUrl} className="hover:text-slate-800 dark:hover:text-slate-100">
          Wikipedia
        </ExternalLink>
      </Copy>
    </section>
  );
}
