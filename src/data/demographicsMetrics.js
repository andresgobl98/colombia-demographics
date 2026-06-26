// Statement-card descriptors for the demographics view — the plain-language
// headline figures shown at the top of the page (and per department in the map
// companion). They share the metric-descriptor shape consumed by MetricStatCard
// (label, description, tone, icon, sentence, format) but, unlike the poverty
// metrics, most carry no valence: a population isn't "good" or "bad", so they use
// the neutral `info` tone. Sex uses the conventional male/female accents that
// echo the sex donut.

const millions = (v) =>
  v == null ? "N/D" : (v / 1e6).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const pct1 = (v) =>
  v == null ? "N/D" : `${v.toLocaleString("es-CO", { maximumFractionDigits: 1 })}%`;

const whole = (v) => (v == null ? "N/D" : v.toLocaleString("es-CO", { maximumFractionDigits: 0 }));

const POBLACION = {
  id: "population",
  label: "Población",
  tone: "info",
  icon: "users",
  sentence: { before: "En Colombia hay", after: "millones de personas." },
  format: millions,
  description: "Proyección de población del DANE (PPED), basada en el Censo 2018 y actualizada cada año.",
};

const MUJERES = {
  id: "mujeres",
  label: "Mujeres",
  tone: "female",
  icon: "person",
  sentence: { before: "El", after: "de la población son mujeres." },
  format: pct1,
  description: "Proporción de mujeres en la proyección de población por sexo.",
};

const HOMBRES = {
  id: "hombres",
  label: "Hombres",
  tone: "male",
  icon: "person",
  sentence: { before: "El", after: "de la población son hombres." },
  format: pct1,
  description: "Proporción de hombres en la proyección de población por sexo.",
};

const DENSIDAD = {
  id: "densidad",
  label: "Densidad de población",
  tone: "info",
  icon: "map",
  sentence: { before: "Hay", after: "habitantes por kilómetro cuadrado, en promedio." },
  format: whole,
  description: "Población dividida por la superficie del territorio.",
};

/**
 * Build the four headline figures for an entity (the national aggregate or a
 * department), each as a `{ metric, value }` pair ready for MetricStatCard.
 * Works for either because both expose `population`, `sex` and `area_km2`.
 */
export function statementFigures(entity) {
  const male = entity?.sex?.male ?? 0;
  const female = entity?.sex?.female ?? 0;
  const total = male + female || entity?.population || 0;
  const density =
    entity?.population != null && entity?.area_km2 ? entity.population / entity.area_km2 : null;
  return [
    { metric: POBLACION, value: entity?.population ?? null },
    { metric: MUJERES, value: total ? (female / total) * 100 : null },
    { metric: HOMBRES, value: total ? (male / total) * 100 : null },
    { metric: DENSIDAD, value: density },
  ];
}
