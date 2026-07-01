import { BarBreakdown } from "../charts";
import { Copy } from "../ui";
import {
  POVERTY_METRICS,
  POVERTY_METRIC_GROUPS,
  IPM_CONTRIB_DIMENSIONS,
  metricSentence,
} from "../../data/povertyMetrics";
import { renderMetricIcon, toneFor } from "../ui/metricVisuals";
import { usePoverty } from "../../state/povertyStore";

// Compact tile labels (the full metric labels are too long for a 2-col grid).
const SHORT = {
  pobreza_monetaria: "Pobreza monetaria",
  pobreza_extrema: "Pobreza extrema",
  ipm: "Multidimensional (IPM)",
  nbi: "NBI (Censo 2018)",
  gini: "Gini",
  acueducto: "Acueducto",
  alcantarillado: "Alcantarillado",
  internet: "Internet fijo",
  deficit_habitacional: "Déficit habitacional",
};

// One plain-language line under each group header, so a reader who doesn't know
// the terms still gets the gist.
const GROUP_INTRO = {
  "Pobreza y desigualdad":
    "Distintas formas de medir quién vive en pobreza y qué tan desigual es el ingreso.",
  "Vivienda y servicios": "Acceso a servicios básicos y calidad de la vivienda.",
};

const ipmPct = (v) => (v == null ? "N/D" : `${v.toLocaleString("es-CO", { maximumFractionDigits: 1 })}%`);

// How a department's value compares to the national figure, phrased plainly.
// Colour encodes good/bad (via the metric's direction); the words describe the
// raw position so it reads on its own.
function comparison(metric, value, nationalValue) {
  if (value == null || nationalValue == null) return null;
  const diff = +(value - nationalValue).toFixed(1);
  if (diff === 0) return { text: "en el promedio nacional", cls: "text-slate-500 dark:text-slate-400" };
  const better = metric.direction === "lower" ? diff < 0 : diff > 0;
  const mag = Math.abs(diff).toLocaleString("es-CO", { maximumFractionDigits: 1 });
  return {
    text: `${mag} pts ${diff > 0 ? "sobre" : "bajo"} el promedio`,
    cls: better ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400",
  };
}

function Tile({ metric, value, nationalValue, isNational }) {
  const cmp = isNational ? null : comparison(metric, value, nationalValue);
  const tone = toneFor(metric);
  return (
    // Full-width row: icon + name on the left, value on the right (so values line
    // up in a scannable column), comparison beneath. The wide row gives long
    // names room to sit on one line instead of overflowing a cramped tile.
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2.5 flex flex-col gap-1" title={metric.description}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {renderMetricIcon(metric, `w-4 h-4 shrink-0 ${tone.icon}`)}
          {/* slate-400 failed AA on the slate-50 tile; detail (slate-600/300) passes. */}
          <Copy as="p" variant="detail" className="leading-snug">{SHORT[metric.id] ?? metric.label}</Copy>
        </div>
        <Copy as="p" variant="strong" className="text-slate-800 dark:text-slate-100 shrink-0">
          {metric.format(value)}
        </Copy>
      </div>
      {cmp && (
        // Bare element on purpose: Copy's annotation variant hard-codes a slate
        // text colour that would win the Tailwind cascade over this semantic colour.
        <p className={`text-sm leading-snug ${cmp.cls}`}>{cmp.text}</p>
      )}
    </div>
  );
}

function MetricGroup({ group, display, national, isNational }) {
  const metrics = POVERTY_METRICS.filter((m) => m.group === group);
  return (
    <div>
      <Copy as="p" variant="detail" className="font-semibold">{group}</Copy>
      {GROUP_INTRO[group] && (
        <Copy as="p" variant="annotation" className="mb-2 leading-snug">{GROUP_INTRO[group]}</Copy>
      )}
      <div className="flex flex-col gap-2">
        {metrics.map((m) => (
          <Tile
            key={m.id}
            metric={m}
            value={display?.[m.id]}
            nationalValue={national?.[m.id]}
            isNational={isNational}
          />
        ))}
      </div>
    </div>
  );
}

export default function PovertyPanel() {
  const { selectedDept: department, national, metric } = usePoverty();
  const isNational = !department;
  const display = isNational ? national : department;

  // Lead sentence: the metric currently colouring the map, told in plain language
  // for this territory. Only when there's a value (e.g. national monetary is N/D).
  const leadValue = display?.[metric.id];
  const lead = leadValue != null ? metricSentence(metric, leadValue) : null;
  const leadTone = toneFor(metric);

  const contrib = display?.ipm_contrib;
  const contribData = contrib
    ? IPM_CONTRIB_DIMENSIONS.map((d) => ({ name: d.label, value: contrib[d.id] ?? 0, color: d.color }))
        .sort((a, b) => b.value - a.value)
    : [];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div>
        {isNational ? (
          <>
            <Copy as="h2" variant="title">Colombia</Copy>
            <Copy as="p" variant="annotation">Total nacional</Copy>
          </>
        ) : (
          <>
            <Copy as="h2" variant="title">{department.name}</Copy>
            <Copy as="p" variant="annotation">
              {department.capital ? `Capital: ${department.capital}` : "Departamento"}
            </Copy>
          </>
        )}
      </div>

      {/* Lead sentence for the metric being explored */}
      {lead && (
        <div className={`rounded-xl border-l-4 ${leadTone.border} bg-slate-50 dark:bg-slate-700/50 p-3 flex flex-col gap-1`}>
          <Copy as="p" variant="body" className="leading-snug">
            {lead.before} <span className={`font-semibold ${leadTone.num}`}>{lead.number}</span> {lead.after}
          </Copy>
          <Copy as="p" variant="annotation" className="leading-snug">{metric.description}</Copy>
        </div>
      )}

      {/* Poverty & inequality stat tiles */}
      <MetricGroup
        group={POVERTY_METRIC_GROUPS[0]}
        display={display}
        national={national}
        isNational={isNational}
      />

      {/* IPM dimension contributions (department-level; no national figure published) */}
      {contribData.length > 0 && (
        <div>
          <Copy as="p" variant="detail" className="font-semibold">
            ¿Qué impulsa la pobreza multidimensional?
          </Copy>
          <Copy as="p" variant="annotation" className="mb-2 leading-snug">
            Cuánto aporta cada carencia a la pobreza multidimensional del territorio.
          </Copy>
          <BarBreakdown data={contribData} formatValue={ipmPct} labelWidth={128} />
          <Copy as="p" variant="annotation" className="mt-2 leading-snug">
            <a
              href="https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              DANE
            </a>
            , 2025.
          </Copy>
        </div>
      )}

      {/* Housing & services stat tiles */}
      <MetricGroup
        group={POVERTY_METRIC_GROUPS[1]}
        display={display}
        national={national}
        isNational={isNational}
      />

      {/* Sources */}
      <Copy
        as="p"
        variant="annotation"
        className="leading-snug pt-3 border-t border-slate-100 dark:border-slate-700"
      >
        Fuentes:{" "}
        <a
          href="https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-monetaria"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          DANE
        </a>{" "}
        (pobreza monetaria 2024 · IPM 2025 · NBI Censo 2018 · déficit habitacional 2024),{" "}
        <a
          href="https://www.superservicios.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          SSPD
        </a>{" "}
        (acueducto y alcantarillado 2023),{" "}
        <a
          href="https://www.mintic.gov.co/portal/inicio/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          MinTIC
        </a>{" "}
        (internet 2024). Vía{" "}
        <a
          href="https://terridata.dnp.gov.co"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          DNP TerriData
        </a>
        .
        {isNational && " La pobreza monetaria y el Gini no tienen agregado nacional en esta fuente."}
      </Copy>

      {isNational && (
        <Copy as="p" variant="annotation" className="text-center">
          Haz clic en un departamento para ver su detalle
        </Copy>
      )}
    </div>
  );
}
