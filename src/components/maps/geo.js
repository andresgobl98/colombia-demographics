import { useEffect, useState } from "react";

// Shared geo plumbing for the department maps (main choropleth + government
// representation map). Both load the same DANE GeoJSON and split San Andrés
// into a corner inset, so that logic lives here instead of in each map.

export const GEO_URL = "/colombia.geojson";
export const SAN_ANDRES_CODE = "88";

// DANE department codes are 2-digit strings ("05", "11"). The GeoJSON in the
// wild stores them under several property names, so try each in turn.
export function getDeptCode(geo) {
  return (
    geo.properties?.DPTO ||
    geo.properties?.DPTO_CCDGO ||
    geo.properties?.code ||
    geo.properties?.id ||
    geo.properties?.DANE ||
    null
  );
}

/**
 * Fetch the department GeoJSON once and pre-split it for rendering:
 *
 * - `geographies`     every feature (empty array until loaded)
 * - `mainGeographies` mainland features (San Andrés removed — it lives in the inset)
 * - `sanAndres`       the San Andrés feature, or undefined
 * - `isEmpty`         true before the fetch resolves / on failure
 */
export function useColombiaGeographies() {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((fc) => setGeographies(fc.features ?? []))
      .catch(() => {});
  }, []);

  const sanAndres = geographies.find((g) => getDeptCode(g) === SAN_ANDRES_CODE);
  const mainGeographies = geographies.filter(
    (g) => getDeptCode(g) !== SAN_ANDRES_CODE
  );

  return { geographies, mainGeographies, sanAndres, isEmpty: geographies.length === 0 };
}
