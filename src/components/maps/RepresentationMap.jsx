import { ComposableMap, Geographies } from "react-simple-maps";
import SanAndresInset from "./SanAndresInset";
import DepartmentGeography from "./DepartmentGeography";
import { useColombiaGeographies, getDeptCode, SAN_ANDRES_CODE } from "./geo";

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
  const { mainGeographies, sanAndres, isEmpty } = useColombiaGeographies();

  const fillFor = (code) => {
    if (code === selectedId) return "#2563eb";          // selected → accent
    if (withData?.has(code)) return "#93c5fd";           // has reps → tinted
    return "var(--map-nodata)";                          // theme-aware neutral
  };

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] text-sm text-slate-400 dark:text-slate-500">
        Cargando mapa…
      </div>
    );
  }

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
              return (
                <DepartmentGeography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillFor(code)}
                  selected={code === selectedId}
                  onClick={() => onSelect(code === selectedId ? null : code)}
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
