import { useState } from "react";
import { ScaleIcon, ChevronDownIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Copy } from "../../components/ui";
import { formatSince } from "../../components/government/format";
import { JUDICIAL_CATEGORIES, orgsForCategory } from "../../data/judicial";

function CategoryDivider({ label, blurb }) {
  return (
    <div className="w-full mb-5">
      <div className="flex items-center gap-3">
        <Copy as="span" variant="eyebrow" className="tracking-wider whitespace-nowrap">
          {label}
        </Copy>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>
      <Copy as="p" variant="detail" className="mt-1">{blurb}</Copy>
    </div>
  );
}

// One leader row: role on the left, person + provenance on the right.
function LeaderRow({ leader }) {
  const meta = [
    leader.chamber,
    leader.term
      ? `Período ${leader.term}`
      : leader.since
        ? `Desde ${formatSince(leader.since, leader.sinceApprox)}`
        : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-700/60 last:border-b-0">
      <Copy as="span" variant="annotation" className="shrink-0">{leader.role}</Copy>
      <span className="text-right min-w-0">
        <Copy as="span" variant="strong" className="block leading-snug">{leader.name}</Copy>
        {meta && <Copy as="span" variant="annotation" className="block">{meta}</Copy>}
      </span>
    </li>
  );
}

// The full bench, revealed on demand. Names that also lead the corporation get a
// small role tag so the reader can connect the roster to "quién la dirige".
function Bench({ org, leadByName }) {
  const total = org.benchGroups.reduce((n, g) => n + g.members.length, 0);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-slate-100 dark:border-slate-700 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
      >
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
        {open ? "Ocultar magistrados" : `Ver los ${total} magistrados`}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3 flex flex-col gap-3">
            {org.benchGroups.map((group, i) => (
              <div key={group.label ?? i}>
                {group.label && (
                  <Copy as="p" variant="eyebrow" className="mb-1.5">{group.label}</Copy>
                )}
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                  {group.members.map((name) => {
                    const role = leadByName.get(name);
                    return (
                      <li key={name} className="flex items-baseline gap-2">
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600 shrink-0">·</span>
                        <Copy as="span" variant="detail" className="min-w-0">
                          {name}
                          {role && (
                            <span className="ml-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                              {role}
                            </span>
                          )}
                        </Copy>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {org.benchNote && (
              <Copy as="p" variant="annotation" className="italic">{org.benchNote}</Copy>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Short role labels used to tag leaders inside the bench list.
const SHORT_ROLE = { Presidente: "Pdte.", Presidenta: "Pdta.", Vicepresidente: "Vpte.", Vicepresidenta: "Vpta." };

function OrgCard({ org }) {
  const leadByName = new Map(
    org.leaders.map((l) => [l.name, SHORT_ROLE[l.role] ?? l.role])
  );

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 border-t-2 border-t-amber-600 p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-2">
        <Copy as="h3" variant="title">{org.name}</Copy>
        <Copy as="span" variant="annotation" className="font-mono shrink-0 mt-1">
          {org.constitutionalBasis}
        </Copy>
      </div>

      <Copy as="p" variant="prose" className="mb-4">{org.description}</Copy>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <div>
          <Copy as="dt" variant="eyebrow" className="mb-0.5">Composición</Copy>
          <Copy as="dd" variant="detail">{org.composition}</Copy>
        </div>
        <div>
          <Copy as="dt" variant="eyebrow" className="mb-0.5">Cómo se eligen</Copy>
          <Copy as="dd" variant="detail">{org.selection}</Copy>
        </div>
      </dl>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
        <div className="flex items-center justify-between mb-1">
          <Copy as="p" variant="eyebrow">Quién la dirige</Copy>
          {org.rotates && (
            <Copy as="span" variant="annotation">Presidencia rotativa (anual)</Copy>
          )}
        </div>
        <ul>
          {org.leaders.map((leader) => (
            <LeaderRow key={leader.role} leader={leader} />
          ))}
        </ul>
      </div>

      {org.benchGroups && <Bench org={org} leadByName={leadByName} />}

      {/* Primary card action pinned bottom-right (matches executive-view convention). */}
      <div className="mt-4 flex justify-end">
        <a
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
        >
          Sitio oficial
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function JudicialView() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <ScaleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
          <Copy as="h2" variant="title">Rama Judicial</Copy>
        </div>
        <Copy as="p" variant="prose" className="mt-1">
          Administra justicia de forma autónoma e independiente. No tiene una sola
          cabeza: la integran varias corporaciones y organismos, cada uno con su
          propia función y dirección.
        </Copy>
      </header>

      <div className="flex flex-col gap-12">
        {JUDICIAL_CATEGORIES.map((cat) => {
          const orgs = orgsForCategory(cat.id);
          // Multi-org categories pack into 2 columns on desktop (items-start so an
          // expanded bench grows only its own cell, not its row neighbour). Lone
          // orgs keep the full width rather than sit half-empty.
          const single = orgs.length === 1;
          return (
            <section key={cat.id}>
              <CategoryDivider label={cat.label} blurb={cat.blurb} />
              <div className={single ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"}>
                {orgs.map((org) => (
                  <OrgCard key={org.id} org={org} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Copy as="p" variant="detail" className="mt-10 text-center">
        Titulares y magistrados verificados a jun. 2026. Las presidencias de las
        altas cortes se renuevan cada año · Consultar{" "}
        <a
          href="https://www.ramajudicial.gov.co"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          ramajudicial.gov.co
        </a>
      </Copy>
    </div>
  );
}
