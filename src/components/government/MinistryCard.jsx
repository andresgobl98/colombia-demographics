import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Copy, ExternalLink } from "../ui";
import { formatSince } from "./format";

/**
 * Tappable ministry card with an expandable description.
 *
 * The card is a div[role=button] rather than a real <button> so the holder's
 * name can be a genuine nested <a> to Wikipedia (a real <a> can't validly nest
 * inside a <button>). The link stops propagation so opening it doesn't also
 * toggle the card's expand state.
 *
 * @param {object} ministry  entry from data/executive MINISTRIES
 */
export default function MinistryCard({ ministry }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((v) => !v);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
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

      <Copy as="p" variant="strong" className="leading-snug">
        {ministry.wikipedia ? (
          <ExternalLink
            href={ministry.wikipedia}
            iconClassName="w-3.5 h-3.5"
            className="hover:text-blue-700 dark:hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            {ministry.holder}
          </ExternalLink>
        ) : (
          ministry.holder
        )}
      </Copy>
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

      {/* Action aligned bottom-right (executive-view convention); the pill +
          accent make the expand/collapse affordance read as a control. */}
      <span className="mt-3 self-end inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
        {expanded ? "Ocultar" : "Ver descripción"}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
        />
      </span>
    </div>
  );
}
