import { useState } from "react";
import { ScaleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { JUDICIAL_CATEGORIES, orgsForCategory } from "../../data/judicial";

const MONTHS_ES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.",
                   "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

function formatSince(iso, approx = false) {
  const [y, m, d] = iso.split("-").map(Number);
  const mon = MONTHS_ES[m - 1];
  return approx ? `~${mon} ${y}` : `${d} ${mon} ${y}`;
}

function CategoryDivider({ label, blurb }) {
  return (
    <div className="w-full mb-5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{blurb}</p>
    </div>
  );
}

// One leader row: role on the left, person + provenance on the right.
function LeaderRow({ leader }) {
  return (
    <li className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-700/60 last:border-b-0">
      <span className="text-sm text-slate-400 dark:text-slate-500 shrink-0">
        {leader.role}
      </span>
      <span className="text-right min-w-0">
        <span className="block text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug">
          {leader.name}
        </span>
        <span className="block text-sm text-slate-400 dark:text-slate-500">
          {[
            leader.chamber,
            leader.term
              ? `Período ${leader.term}`
              : leader.since
                ? `Desde ${formatSince(leader.since, leader.sinceApprox)}`
                : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </span>
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
        className="group flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
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
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1.5">
                    {group.label}
                  </p>
                )}
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                  {group.members.map((name) => {
                    const role = leadByName.get(name);
                    return (
                      <li
                        key={name}
                        className="flex items-baseline gap-2 text-sm text-slate-700 dark:text-slate-200"
                      >
                        <span className="text-slate-300 dark:text-slate-600 shrink-0">·</span>
                        <span className="min-w-0">
                          {name}
                          {role && (
                            <span className="ml-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                              {role}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {org.benchNote && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                {org.benchNote}
              </p>
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          {org.name}
        </h3>
        <span className="text-sm text-slate-400 dark:text-slate-500 font-mono shrink-0 mt-1">
          {org.constitutionalBasis}
        </span>
      </div>

      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {org.description}
      </p>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
        <div>
          <dt className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
            Composición
          </dt>
          <dd className="text-slate-600 dark:text-slate-300">{org.composition}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
            Cómo se eligen
          </dt>
          <dd className="text-slate-600 dark:text-slate-300">{org.selection}</dd>
        </div>
      </dl>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            Quién la dirige
          </p>
          {org.rotates && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Presidencia rotativa (anual)
            </span>
          )}
        </div>
        <ul>
          {org.leaders.map((leader) => (
            <LeaderRow key={leader.role} leader={leader} />
          ))}
        </ul>
      </div>

      {org.benchGroups && <Bench org={org} leadByName={leadByName} />}

      <a
        href={org.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
      >
        Sitio oficial
      </a>
    </div>
  );
}

export default function JudicialView() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto flex flex-col">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <ScaleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Rama Judicial</h2>
        </div>
        <p className="text-base text-slate-400 dark:text-slate-500 mt-1">
          Administra justicia de forma autónoma e independiente. No tiene una sola
          cabeza: la integran varias corporaciones y organismos, cada uno con su
          propia función y dirección.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {JUDICIAL_CATEGORIES.map((cat) => (
          <section key={cat.id}>
            <CategoryDivider label={cat.label} blurb={cat.blurb} />
            <div className="flex flex-col gap-4">
              {orgsForCategory(cat.id).map((org) => (
                <OrgCard key={org.id} org={org} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-400 dark:text-slate-600 text-center">
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
      </p>
    </div>
  );
}
