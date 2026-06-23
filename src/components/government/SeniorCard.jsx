import { Copy } from "../ui";
import { formatSince } from "./format";

/**
 * Senior executive position card (Presidente / Vicepresidente).
 *
 * @param {object} position  entry from data/executive (PRESIDENTE | VICEPRESIDENTE)
 */
export default function SeniorCard({ position }) {
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
      {/* flex-wrap + a shrinkable, wrapping pill keep the long tierLabel and the
          constitutional reference inside the card on narrow (mobile) widths
          instead of overflowing the rounded edge. */}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 mb-4">
        <span
          className={[
            "text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 min-w-0 max-w-full break-words",
            isPresident
              ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800"
              : "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600",
          ].join(" ")}
        >
          {position.tierLabel}
        </span>
        <Copy as="span" variant="annotation" className="font-mono shrink-0 mt-0.5">
          {position.constitutionalBasis}
        </Copy>
      </div>

      <Copy as="h3" variant="title" className="mb-0.5">{position.holder}</Copy>
      <Copy as="p" variant="prose" className="mb-3">{position.title}</Copy>

      <Copy as="div" variant="annotation" className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-4">
        <span>{position.party}</span>
        <span aria-hidden="true">·</span>
        <span>Posesión: {formatSince(position.since)}</span>
        <span aria-hidden="true">·</span>
        <span>Período {position.term}</span>
      </Copy>

      <Copy as="p" variant="prose" className="border-t border-slate-100 dark:border-slate-700 pt-3">
        {position.description}
      </Copy>
    </div>
  );
}
