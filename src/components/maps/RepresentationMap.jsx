import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import SanAndresInset from "./SanAndresInset";
import DepartmentGeography from "./DepartmentGeography";
import MapZoomControls from "./MapZoomControls";
import { useMapZoom } from "./useMapZoom";
import { useColombiaGeographies, getDeptCode, SAN_ANDRES_CODE } from "./geo";

// Default view — matches the projection below. Kept module-level so the
// reference stays stable across renders (see useMapZoom).
const DEFAULT_CENTER = [-74.3, 4.7];
const DEFAULT_ZOOM = 1;

/**
 * Department-selection map for the government section. Uniform fill, click to
 * select. Departments with representatives are tinted; the selected one is
 * accented. San Andrés is shown in a corner inset (same pattern as the main
 * choropleth map) so it remains visible and selectable.
 *
 * Wheel/drag/pinch zoom and the +/- controls come from the shared `useMapZoom`
 * hook + `MapZoomControls`, so this map pans and zooms exactly like the data
 * map — making the smaller departments easy to click.
 *
 * @param {Set<string>} withData  department codes that have representatives
 * @param {string|null} selectedId
 * @param {(code:string|null)=>void} onSelect
 */
export default function RepresentationMap({ withData, selectedId, onSelect }) {
  const { mainGeographies, sanAndres, isEmpty } = useColombiaGeographies();
  const { zoomIn, zoomOut, reset, isOffDefault, zoomableGroupProps } =
    useMapZoom({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  const fillFor = (code) => {
    if (code === selectedId) return "#2563eb";          // selected → accent
    if (withData?.has(code)) return "#93c5fd";           // has reps → tinted
    return "var(--map-nodata)";                          // theme-aware neutral
  };

  const resetView = () => {
    onSelect(null);
    reset();
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
        <ZoomableGroup {...zoomableGroupProps}>
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
        </ZoomableGroup>
      </ComposableMap>

      {sanAndres && (
        <SanAndresInset
          feature={sanAndres}
          fill={fillFor(SAN_ANDRES_CODE)}
          selected={selectedId === SAN_ANDRES_CODE}
          onClick={() => onSelect(selectedId === SAN_ANDRES_CODE ? null : SAN_ANDRES_CODE)}
        />
      )}

      <MapZoomControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetView}
        showReset={isOffDefault || !!selectedId}
      />
    </div>
  );
}
