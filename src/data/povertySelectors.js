import poverty from "./poverty.json";
import staticData from "./departments.json";

// Poverty.json is a single latest-year snapshot (no year slider), so these are
// plain reads — unlike the demographics selectors there's no year to resolve.
// Department values are keyed by 2-digit DANE code and merged with the canonical
// name/capital from departments.json (poverty.json carries only codes + values).

export const POVERTY_YEARS = poverty.years; // { metricId: referenceYear }
export const POVERTY_META = poverty.meta;

// All departments keyed by code: { name, capital, ...metricValues, ipm_contrib }.
// Missing metrics (e.g. monetary poverty outside the 24 GEIH departments) are
// simply absent on the object, which the map/ranking treat as "sin dato".
export function getPovertyDepartments() {
  const out = {};
  for (const [code, values] of Object.entries(poverty.departments)) {
    const s = staticData.departments[code];
    out[code] = { name: s?.name ?? code, capital: s?.capital, ...values };
  }
  return out;
}

// National aggregate. Some indicators have no national figure in the source
// (GEIH monetary poverty), in which case the value is null.
export function getPovertyNational() {
  return { name: staticData.national.name, ...poverty.national };
}

// Reference year for a metric, for "(2024)"-style labelling in the UI.
export const yearFor = (metricId) => POVERTY_YEARS[metricId];
