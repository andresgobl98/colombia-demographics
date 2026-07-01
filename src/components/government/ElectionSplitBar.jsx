import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Copy, ExternalLink } from "../ui";
import { formatPct, formatVotes } from "./format";

const NUM_TONE = [
  "text-blue-600 dark:text-blue-400",
  "text-slate-500 dark:text-slate-400",
];
const BAR_TONE = [
  "bg-blue-600 dark:bg-blue-500",
  "bg-slate-400 dark:bg-slate-500",
];

/**
 * Head-to-head "scoreboard" for a two-candidate runoff: a big vote-share
 * figure per candidate plus one proportional split bar (candidate A /
 * candidate B / blank-null remainder) so the margin reads at a glance,
 * instead of two separate progress bars.
 *
 * @param {Array} results      exactly two result rows (winner first), see elections2026.js
 * @param {object} candidates  CANDIDATES lookup from elections2026.js
 * @param {number} turnoutPct
 */
export default function ElectionSplitBar({ results, candidates, turnoutPct }) {
  const [a, b] = results;
  const remainderPct = Math.max(100 - a.pct - b.pct, 0);
  const marginPct = Math.abs(a.pct - b.pct);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {[a, b].map((r, i) => {
          const candidate = candidates[r.candidateId];
          return (
            <div
              key={r.candidateId}
              className={`flex flex-col gap-1 min-w-0 ${i === 1 ? "items-end text-right" : "items-start text-left"}`}
            >
              {/* Always reserve the badge's row, even for the non-winner, so both
                  percentage figures sit on the same baseline instead of the
                  winner's number being pushed down by the pill above it. */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border ${
                  r.winner
                    ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
                    : "invisible"
                }`}
              >
                <CheckBadgeIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Presidente electo
              </span>
              <p
                className={`text-4xl sm:text-6xl font-bold leading-none tracking-tight tabular-nums ${NUM_TONE[i]}`}
              >
                {formatPct(r.pct)}
              </p>
              <Copy as="p" variant="strong" className="mt-1">
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
              <Copy as="p" variant="annotation">{candidate.party}</Copy>
              <Copy as="p" variant="detail" className="font-mono tabular-nums">
                {formatVotes(r.votes)} votos
              </Copy>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="h-4 rounded-full overflow-hidden flex w-full bg-slate-100 dark:bg-slate-700">
          <div className={BAR_TONE[0]} style={{ width: `${a.pct}%` }} />
          <div className={BAR_TONE[1]} style={{ width: `${b.pct}%` }} />
          {remainderPct > 0 && (
            <div className="bg-slate-200 dark:bg-slate-600" style={{ width: `${remainderPct}%` }} />
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1">
          <Copy as="p" variant="detail">Margen de victoria: {formatPct(marginPct)}</Copy>
          <Copy as="p" variant="annotation">Participación {formatPct(turnoutPct)}</Copy>
        </div>
      </div>
    </div>
  );
}
