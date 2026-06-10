import staticData from "./departments.json";
import seriesData from "./timeseries.json";

export const YEARS = seriesData.years;

// Ethnicity comes from the 2018 census (CNPV); there is no projection for it.
// It is shown for every year, flagged in the UI as census-sourced.
export const CENSUS_YEAR = 2018;

// Default the view to the current calendar year, clamped to the available range.
export const DEFAULT_YEAR = (() => {
  const now = new Date().getFullYear();
  return Math.min(YEARS[YEARS.length - 1], Math.max(YEARS[0], now));
})();

// Index of a given year in the series arrays.
export function yearIndex(year) {
  const i = YEARS.indexOf(year);
  return i === -1 ? YEARS.length - 1 : i;
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
    ethnicity: s.ethnicity2018, // census 2018, shown for all years
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
    ethnicity:   s.ethnicity2018, // census 2018, shown for all years
  };
}
