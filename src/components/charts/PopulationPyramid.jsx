import { useState } from "react";

const MALE_COLOR = "#3b82f6";   // blue-500 — bar fill
const FEMALE_COLOR = "#f43f5e"; // rose-500 — bar fill
// Header labels use a darker shade of the same hue so the text clears WCAG AA on
// white (blue/rose-500 only hit ~3.7); the bars keep the lighter fill.
const MALE_LABEL = "#2563eb";   // blue-600
const FEMALE_LABEL = "#e11d48"; // rose-600

const fullFmt = (v) => v.toLocaleString("es-CO");
const compactFmt = (v) =>
  new Intl.NumberFormat("es-CO", { notation: "compact", maximumFractionDigits: 1 }).format(v);

// Round up to a "nice" axis maximum (1, 2, 2.5, 5 × 10ⁿ) so ticks read cleanly.
function niceCeil(x) {
  if (x <= 0) return 1;
  const base = Math.pow(10, Math.floor(Math.log10(x)));
  const f = x / base;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * base;
}

/**
 * Diverging age-by-sex population pyramid with a scale axis and an
 * interactive detail card (hover on desktop, tap on mobile).
 *
 * @param {string[]} ageGroups  group labels, youngest → oldest
 * @param {number[]} male       count per group (aligned to ageGroups)
 * @param {number[]} female     count per group
 */
export default function PopulationPyramid({ ageGroups, male, female }) {
  const [active, setActive] = useState(null);

  const rawMax = Math.max(...male, ...female, 0);
  const max = niceCeil(rawMax);
  const total =
    male.reduce((a, b) => a + b, 0) + female.reduce((a, b) => a + b, 0);
  const width = (v) => (v > 0 ? `${(v / max) * 100}%` : 0);

  // Oldest group on top, youngest at the base.
  const rows = ageGroups
    .map((g, i) => ({ group: g, m: male[i], f: female[i], i }))
    .reverse();

  const detail =
    active != null
      ? (() => {
          const m = male[active];
          const f = female[active];
          const t = m + f;
          return { group: ageGroups[active], m, f, t, pct: total > 0 ? (t / total) * 100 : 0 };
        })()
      : null;

  return (
    <div>
      {/* Detail card — fixed height to avoid layout shift */}
      <div className="h-11 mb-1 flex flex-col justify-center">
        {detail ? (
          <>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              {detail.group} años · {detail.pct.toFixed(1)}% de la población
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums leading-tight">
              H {fullFmt(detail.m)} · M {fullFmt(detail.f)} · Total {fullFmt(detail.t)}
            </p>
          </>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
            Pasa el cursor o toca un grupo de edad para ver el detalle.
          </p>
        )}
      </div>

      {/* Sex headers */}
      <div className="flex text-xs font-medium mb-1">
        <span className="flex-1 text-right pr-1 dark:!text-blue-400" style={{ color: MALE_LABEL }}>Hombres</span>
        <span className="w-12 shrink-0" />
        <span className="flex-1 text-left pl-1 dark:!text-rose-400" style={{ color: FEMALE_LABEL }}>Mujeres</span>
      </div>

      {/* Bars */}
      <ul className="flex flex-col gap-[2px]">
        {rows.map(({ group, m, f, i }) => {
          const isActive = active === i;
          const dim = active != null && !isActive ? 0.5 : 1;
          return (
            <li
              key={group}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((a) => (a === i ? null : a))}
              onClick={() => setActive(i)}
              className={`flex items-center rounded cursor-pointer ${
                isActive ? "bg-slate-100 dark:bg-slate-700/50" : ""
              }`}
            >
              <div className="flex-1 flex justify-end">
                <div
                  className="h-3 rounded-l-sm transition-all duration-500"
                  style={{ width: width(m), backgroundColor: MALE_COLOR, opacity: dim }}
                />
              </div>
              <span className="w-12 shrink-0 text-center text-xs tabular-nums text-slate-500 dark:text-slate-400">
                {group}
              </span>
              <div className="flex-1 flex justify-start">
                <div
                  className="h-3 rounded-r-sm transition-all duration-500"
                  style={{ width: width(f), backgroundColor: FEMALE_COLOR, opacity: dim }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Scale axis (labels only, no gridlines) */}
      <div className="flex mt-1 text-xs tabular-nums text-slate-500 dark:text-slate-400">
        <div className="flex-1 flex justify-between">
          <span>{compactFmt(max)}</span>
          <span>{compactFmt(max / 2)}</span>
          <span>0</span>
        </div>
        <span className="w-12 shrink-0" />
        <div className="flex-1 flex justify-between">
          <span>0</span>
          <span>{compactFmt(max / 2)}</span>
          <span>{compactFmt(max)}</span>
        </div>
      </div>
    </div>
  );
}
