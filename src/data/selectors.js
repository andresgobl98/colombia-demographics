import staticData from "./departments.json";
import seriesData from "./timeseries.json";

export const YEARS = seriesData.years;
export const BASE_YEAR = 2018;

// Index of a given year in the series arrays.
export function yearIndex(year) {
  const i = YEARS.indexOf(year);
  return i === -1 ? YEARS.length - 1 : i;
}

// Ethnicity is census-only (2018). Attach it only when viewing that year.
function ethnicityFor(year, staticEntry) {
  return year === BASE_YEAR ? staticEntry.ethnicity2018 : undefined;
}

// Merge static + time-series into the flat shape the UI components expect,
// for one department at a given year.
function assembleDept(code, year) {
  const s = staticData.departments[code];
  const t = seriesData.departments[code];
  const i = yearIndex(year);
  return {
    name:      s.name,
    capital:   s.capital,
    area_km2:  s.area_km2,
    population: t.population[i],
    sex:       { male: t.male[i], female: t.female[i] },
    ethnicity: ethnicityFor(year, s),
  };
}

// All departments keyed by code, for a given year.
export function getDepartments(year) {
  const out = {};
  for (const code of Object.keys(staticData.departments)) {
    out[code] = assembleDept(code, year);
  }
  return out;
}

// National aggregate for a given year.
export function getNational(year) {
  const s = staticData.national;
  const t = seriesData.national;
  const i = yearIndex(year);
  return {
    name:        s.name,
    departments: s.departments,
    area_km2:    s.area_km2,
    population:  t.population[i],
    sex:         { male: t.male[i], female: t.female[i] },
    ethnicity:   ethnicityFor(year, s),
  };
}
