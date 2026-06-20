import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Copy } from "../ui";
import { formatSince } from "./format";

/**
 * Tappable ministry card with an expandable description.
 *
 * @param {object} ministry  entry from data/executive MINISTRIES
 */
export default function MinistryCard({ ministry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className="group text-left w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex flex-col hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Copy as="p" variant="annotation" className="font-semibold leading-snug uppercase tracking-wide">
          {ministry.shortTitle}
        </Copy>
        <Copy as="span" variant="annotation" className="font-mono shrink-0 tabular-nums">
          {String(ministry.order).padStart(2, "0")}
        </Copy>
      </div>

      <Copy as="p" variant="strong" className="leading-snug">{ministry.holder}</Copy>
      <Copy as="p" variant="annotation" className="mt-0.5">
        {formatSince(ministry.since, ministry.sinceApprox)}
      </Copy>

      {/* Expandable description — animated height via the grid-rows 0fr→1fr
          technique; the inner wrapper clips overflow during the transition. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <Copy as="p" variant="detail" className="leading-relaxed mb-1.5">
              {ministry.description}
            </Copy>
            <Copy as="p" variant="annotation" className="italic">
              {ministry.title}
            </Copy>
          </div>
        </div>
      </div>

      <span className="mt-3 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
        />
        {expanded ? "Ocultar" : "Ver descripción"}
      </span>
    </button>
  );
}
