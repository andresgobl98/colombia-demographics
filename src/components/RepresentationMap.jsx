import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "/colombia.geojson";

function getDeptCode(geo) {
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
 * Barebones department-selection map for the government section. Uniform fill,
 * click to select. Departments with representatives are tinted; the selected
 * one is accented. (Zoom/inset intentionally omitted for this first pass.)
 *
 * @param {Set<string>} withData  department codes that have representatives
 * @param {string|null} selectedId
 * @param {(code:string|null)=>void} onSelect
 */
export default function RepresentationMap({ withData, selectedId, onSelect }) {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((fc) => setGeographies(fc.features ?? []))
      .catch(() => {});
  }, []);

  const fillFor = (code) => {
    if (code === selectedId) return "#2563eb";          // selected → accent
    if (withData?.has(code)) return "#93c5fd";           // has reps → tinted
    return "var(--map-nodata)";                          // theme-aware neutral
  };

  if (geographies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] text-sm text-slate-400 dark:text-slate-500">
        Cargando mapa…
      </div>
    );
  }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [-74, 4], scale: 2200 }}
      width={520}
      height={620}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Geographies geography={{ type: "FeatureCollection", features: geographies }}>
        {({ geographies: geos }) =>
          geos.map((geo) => {
            const code = getDeptCode(geo);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fillFor(code)}
                stroke="var(--map-stroke)"
                strokeWidth={0.5}
                onClick={() => onSelect(code === selectedId ? null : code)}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", cursor: "pointer", opacity: 0.85 },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
