// Metric descriptors for the poverty & living-standards view — the single source
// of truth for how each indicator is labelled, coloured, formatted and explained.
// Mirrors the shape ColombiaMap/TopicRanking expect from `metrics.js` (`id`,
// `label`, `domain`, `colorRange`, `format`) and adds poverty-specific fields:
//   - `direction`: "lower" (less is better, e.g. poverty) | "higher" (more is
//     better, e.g. service coverage). Drives ranking order and comparison wording.
//   - `family`: data-shape category that drives page sections —
//       "nivel"       comparable poverty levels (%, lower=better) → map switcher
//       "desigualdad" inequality (Gini, 0–1 coefficient) → own section
//       "servicios"   service coverage (%, higher=better) → services section
//       "vivienda"    housing deficit → services section
//   - `tone`: "bad" | "warn" | "good" — semantic colour (a problem vs a good
//     thing). Drives the card accent/icon/number colour, NOT the value.
//   - `icon`: key into the icon map in NationalSummaryBand/PovertyPanel.
//   - `sentence`: { before, after } — a plain-language headline read as
//     `${before} <number> ${after}`, e.g. "El 26,8% de los hogares vive en…".
//     `sentenceNumber` overrides the number formatting for the sentence (e.g.
//     internet is a rate per 100, not a %).
//   - `description`: the plain-language definition shown on cards / captions.
//   - `source`/`sourceHref`/`group`: attribution (+ link to the publisher) and
//     (legacy) detail-panel grouping.
// Reference years are data-derived and live in poverty.json (`POVERTY_YEARS`).

const pct = (digits = 1) => (v) =>
  v == null ? "N/D" : `${v.toLocaleString("es-CO", { maximumFractionDigits: digits })}%`;

const fixed = (digits) => (v) =>
  v == null
    ? "N/D"
    : v.toLocaleString("es-CO", { minimumFractionDigits: digits, maximumFractionDigits: digits });

const whole = (v) => (v == null ? "N/D" : v.toLocaleString("es-CO", { maximumFractionDigits: 0 }));

export const POVERTY_METRICS = [
  // ── Pobreza y desigualdad ──────────────────────────────────────────────────
  {
    id: "pobreza_monetaria",
    family: "nivel",
    label: "Pobreza monetaria",
    group: "Pobreza y desigualdad",
    description: "Pobreza monetaria: ingreso por debajo de la línea de pobreza, el costo de una canasta básica de bienes y servicios.",
    sentence: { before: "El", after: "de las personas no gana lo suficiente para cubrir sus necesidades básicas." },
    tone: "bad",
    icon: "banknotes",
    source: "DANE · GEIH",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-monetaria",
    note: "Cobertura departamental de la GEIH: 24 departamentos.",
    direction: "lower",
    domain: [15, 70],
    colorRange: ["#fee2e2", "#991b1b"],
    format: pct(1),
  },
  {
    id: "pobreza_extrema",
    family: "nivel",
    label: "Pobreza monetaria extrema",
    group: "Pobreza y desigualdad",
    description: "Pobreza extrema: ingreso por debajo del costo de una canasta compuesta solo por alimentos.",
    sentence: { before: "El", after: "de las personas no tiene ingresos ni para alimentarse bien." },
    tone: "bad",
    icon: "banknotes",
    source: "DANE · GEIH",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-monetaria",
    note: "Cobertura departamental de la GEIH: 24 departamentos.",
    direction: "lower",
    domain: [0, 45],
    colorRange: ["#fef2f2", "#7f1d1d"],
    format: pct(1),
  },
  {
    id: "ipm",
    family: "nivel",
    label: "Pobreza multidimensional (IPM)",
    group: "Pobreza y desigualdad",
    description: "Índice de Pobreza Multidimensional: combina educación, niñez, salud, trabajo y vivienda. Es pobre quien sufre un tercio o más de esas privaciones a la vez.",
    sentence: { before: "El", after: "de las personas es pobre por varias carencias a la vez." },
    tone: "bad",
    icon: "squares",
    source: "DANE · ECV",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional",
    direction: "lower",
    domain: [0, 55],
    colorRange: ["#ffedd5", "#9a3412"],
    format: pct(1),
  },
  {
    id: "nbi",
    family: "nivel",
    label: "Necesidades básicas insatisfechas (NBI)",
    group: "Pobreza y desigualdad",
    description: "Necesidades Básicas Insatisfechas: hogares con vivienda inadecuada, hacinamiento, sin servicios, alta dependencia económica o niños sin escuela.",
    sentence: { before: "El", after: "de las personas tiene al menos una necesidad básica sin cubrir." },
    tone: "warn",
    icon: "clipboard",
    source: "DANE · Censo 2018",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/necesidades-basicas-insatisfechas-nbi",
    note: "Medida estructural; última cifra disponible del Censo 2018.",
    direction: "lower",
    domain: [0, 70],
    colorRange: ["#fef3c7", "#92400e"],
    format: pct(1),
  },
  {
    id: "gini",
    family: "desigualdad",
    label: "Coeficiente de Gini",
    group: "Pobreza y desigualdad",
    description: "Coeficiente de Gini: mide cómo se reparte el ingreso. 0 = todos ganan lo mismo, 1 = una sola persona concentra todo.",
    sentence: { before: "El ingreso se reparte de forma desigual:", after: "en una escala de 0 a 1." },
    tone: "warn",
    icon: "scale",
    source: "DANE · GEIH",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-monetaria",
    note: "Cobertura departamental de la GEIH: 24 departamentos.",
    direction: "lower",
    domain: [0.45, 0.6],
    colorRange: ["#f3e8ff", "#6b21a8"],
    format: fixed(2),
  },

  // ── Vivienda y servicios ───────────────────────────────────────────────────
  {
    id: "acueducto",
    family: "servicios",
    label: "Cobertura de acueducto",
    group: "Vivienda y servicios",
    description: "Cobertura de acueducto: viviendas con agua potable conectada por tubería.",
    sentence: { before: "El", after: "de las viviendas tiene agua potable por tubería." },
    tone: "good",
    icon: "water",
    source: "SSPD",
    sourceHref: "https://www.superservicios.gov.co/",
    direction: "higher",
    domain: [10, 100],
    colorRange: ["#dbeafe", "#1e40af"],
    format: pct(1),
  },
  {
    id: "alcantarillado",
    family: "servicios",
    label: "Cobertura de alcantarillado",
    group: "Vivienda y servicios",
    description: "Cobertura de alcantarillado: viviendas conectadas a la red que evacúa las aguas residuales.",
    sentence: { before: "El", after: "de las viviendas está conectado al alcantarillado." },
    tone: "good",
    icon: "water",
    source: "SSPD",
    sourceHref: "https://www.superservicios.gov.co/",
    direction: "higher",
    domain: [0, 100],
    colorRange: ["#d1fae5", "#065f46"],
    format: pct(1),
  },
  {
    id: "internet",
    family: "servicios",
    label: "Acceso a internet fijo",
    group: "Vivienda y servicios",
    description: "Acceso a internet fijo: conexiones por cada 100 habitantes (no es un porcentaje de personas).",
    sentence: { before: "Hay", after: "conexiones de internet fijo por cada 100 habitantes." },
    sentenceNumber: whole,
    tone: "good",
    icon: "wifi",
    source: "MinTIC",
    sourceHref: "https://www.mintic.gov.co/portal/inicio/",
    direction: "higher",
    domain: [0, 30],
    colorRange: ["#cffafe", "#155e75"],
    format: pct(1),
  },
  {
    id: "deficit_habitacional",
    family: "vivienda",
    label: "Déficit habitacional",
    group: "Vivienda y servicios",
    description: "Déficit habitacional: hogares cuya vivienda necesita mejoras (déficit cualitativo) o reemplazo (déficit cuantitativo).",
    sentence: { before: "El", after: "de los hogares vive en una vivienda inadecuada o con carencias." },
    tone: "bad",
    icon: "home",
    source: "DANE",
    sourceHref: "https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/deficit-habitacional",
    direction: "lower",
    domain: [0, 95],
    colorRange: ["#ffe4e6", "#9f1239"],
    format: pct(1),
  },
];

// Human-readable labels for the IPM dimension-contribution breakdown
// (ipm_contrib in poverty.json), shown as a per-department composition chart.
export const IPM_CONTRIB_DIMENSIONS = [
  { id: "educacion", label: "Educación", color: "#2563eb" },
  { id: "ninez", label: "Niñez y juventud", color: "#7c3aed" },
  { id: "salud", label: "Salud", color: "#059669" },
  { id: "trabajo", label: "Trabajo", color: "#d97706" },
  { id: "vivienda", label: "Vivienda y servicios", color: "#dc2626" },
];

export const POVERTY_METRIC_GROUPS = [...new Set(POVERTY_METRICS.map((m) => m.group))];

// Comparable poverty-level indicators (%, lower=better) — the only metrics that
// share an axis, so the only ones offered in the map's colour switcher. Gini,
// services and the IPM decomposition live in their own page sections.
export const POVERTY_LEVEL_METRICS = POVERTY_METRICS.filter((m) => m.family === "nivel");

export const metricsByFamily = (family) => POVERTY_METRICS.filter((m) => m.family === family);

export const getPovertyMetric = (id) =>
  POVERTY_METRICS.find((m) => m.id === id) ?? POVERTY_METRICS[0];

// Plain-language headline builder now lives in a shared module (used by the
// demographics view too); re-exported here so existing poverty imports keep working.
export { metricSentence } from "./metricStatement";
