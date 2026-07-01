import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Copy, ExternalLink } from "../ui";
import { formatPct, formatVotes } from "./format";

/**
 * One candidate's row within an election results block: name (links out to
 * Wikipedia when known), party, vote share as both a number and a proportional
 * bar so margins read at a glance.
 *
 * @param {object} result     { candidateId, votes, pct, winner? }
 * @param {object} candidate  entry from data/elections2026 CANDIDATES
 * @param {number} maxPct     the largest pct in this result set (bar scaling reference)
 */
export default function ElectionCandidateBar({ result, candidate, maxPct }) {
  const width = `${Math.max((result.pct / maxPct) * 100, 3)}%`;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-x-3 gap-y-1 flex-wrap">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <Copy as="span" variant="strong">
            {candidate.wikipedia ? (
              <ExternalLink
                href={candidate.wikipedia}
                iconClassName="w-3.5 h-3.5"
                className="hover:text-blue-700 dark:hover:text-blue-300"
              >
                {candidate.name}
              </ExternalLink>
            ) : (
              candidate.name
            )}
          </Copy>
          {result.winner && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <CheckBadgeIcon className="w-3.5 h-3.5" aria-hidden="true" />
              Presidente electo
            </span>
          )}
        </div>
        <Copy as="span" variant="detail" className="font-mono tabular-nums shrink-0">
          {formatPct(result.pct)} · {formatVotes(result.votes)} votos
        </Copy>
      </div>
      <Copy as="span" variant="annotation">{candidate.party}</Copy>
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            result.winner ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-400 dark:bg-slate-500"
          }`}
          style={{ width }}
        />
      </div>
    </div>
  );
}
