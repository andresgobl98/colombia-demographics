import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import SanAndresInset from "./SanAndresInset";

const GEO_URL = "/colombia.geojson";
const SAN_ANDRES_CODE = "88";

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
 * one is accented. San Andrés is shown in a corner inset (same pattern as the
 * main choropleth map) so it remains visible and selectable.
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

  const sanAndres = geographies.find((g) => getDeptCode(g) === SAN_ANDRES_CODE);
  const mainGeographies = geographies.filter((g) => getDeptCode(g) !== SAN_ANDRES_CODE);

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-74.3, 4.7], scale: 1950 }}
        width={520}
        height={620}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Geographies geography={{ type: "FeatureCollection", features: mainGeographies }}>
          {({ geographies: geos }) =>
            geos.map((geo) => {
              const code = getDeptCode(geo);
              const isSelected = code === selectedId;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillFor(code)}
                  stroke="var(--map-stroke)"
                  strokeWidth={0.5}
                  onClick={() => onSelect(code === selectedId ? null : code)}
                  style={{
                    default: {
                      outline: "none",
                      opacity: isSelected ? 1 : 0.85,
                      filter: isSelected ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
                    },
                    hover: { outline: "none", cursor: "pointer", opacity: 1 },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {sanAndres && (
        <SanAndresInset
          feature={sanAndres}
          fill={fillFor(SAN_ANDRES_CODE)}
          selected={selectedId === SAN_ANDRES_CODE}
          onClick={() => onSelect(selectedId === SAN_ANDRES_CODE ? null : SAN_ANDRES_CODE)}
        />
      )}
    </div>
  );
}
