import { useEffect, useState } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid, geoBounds } from "d3-geo";
import SanAndresInset from "./SanAndresInset";
import DepartmentGeography from "./DepartmentGeography";
import MapZoomControls from "./MapZoomControls";
import { useMapZoom } from "./useMapZoom";
import { useColombiaGeographies, getDeptCode, SAN_ANDRES_CODE } from "./geo";
import { InteractiveHint } from "../ui";

const DEFAULT_CENTER = [-74, 4];
const DEFAULT_ZOOM = 1;

// Derive a zoom level that frames a department from its geographic bounds.
function zoomForFeature(feature) {
  const [[x0, y0], [x1, y1]] = geoBounds(feature);
  const maxSpan = Math.max(x1 - x0, y1 - y0); // degrees
  // ~7° span → zoom 1.5, ~1° span → zoom 6, clamped
  return Math.max(2, Math.min(6, 7 / maxSpan));
}

/**
 * Presentational choropleth of Colombia's departments. Domain-agnostic — it takes
 * its data and selection through props, so both the demographics and poverty pages
 * drive it from their own stores:
 *
 *   departments  { [deptCode]: { name, [metric.id]: value, ... } }
 *   metric       descriptor with { id, label, domain, colorRange, format }
 *   selectedCode currently-selected department code (or null)
 *   onSelect     (code | null) => void
 */
export default function ColombiaMap({ departments: data, metric, selectedCode: selectedId, onSelect }) {
  const { geographies, mainGeographies, sanAndres, isEmpty } = useColombiaGeographies();
  const [tooltip, setTooltip] = useState(null);

  const { animateTo, zoomIn, zoomOut, reset, isOffDefault, zoomableGroupProps } =
    useMapZoom({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  const resetView = () => {
    onSelect(null);
    reset();
  };

  // Animate to the selected department whenever the selection changes.
  useEffect(() => {
    if (geographies.length === 0) return;

    // No selection, or San Andrés (lives in the inset, not the mainland map):
    // show the whole country while the inset carries the highlight.
    if (!selectedId || selectedId === SAN_ANDRES_CODE) {
      animateTo({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
      return;
    }
    const feature = geographies.find((g) => getDeptCode(g) === selectedId);
    if (!feature) return;
    animateTo({ coordinates: geoCentroid(feature), zoom: zoomForFeature(feature) });
  }, [selectedId, geographies, animateTo]);

  // Show the reset control on any non-default view, including a San Andrés
  // selection (which keeps the mainland centered, so isOffDefault stays false).
  const showReset = isOffDefault || !!selectedId;

  const colorScale = scaleLinear()
    .domain(metric.domain)
    .range(metric.colorRange)
    .clamp(true);

  const getFill = (geo) => {
    const code = getDeptCode(geo);
    const dept = data[code];
    if (!dept) return "var(--map-nodata)";
    const val = dept[metric.id];
    return val != null ? colorScale(val) : "var(--map-nodata)";
  };

  // Shared tooltip handlers (used by the main map and the San Andrés inset).
  const showTooltip = (dept) => (e) => {
    if (dept) {
      setTooltip({
        name: dept.name,
        value: metric.format(dept[metric.id]),
        x: e.clientX,
        y: e.clientY,
      });
    }
  };
  const moveTooltip = (e) =>
    setTooltip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
  const hideTooltip = () => setTooltip(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 p-8 text-center">
          <svg className="w-16 h-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="font-medium text-slate-500 dark:text-slate-400">Sin datos GeoJSON</p>
          <p className="text-sm max-w-xs">
            Agrega los departamentos de Colombia en{" "}
            <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-xs">public/colombia.geojson</code>.
          </p>
        </div>
      ) : (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-74, 4], scale: 2400 }}
          width={600}
          height={900}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <ZoomableGroup {...zoomableGroupProps}>
            <Geographies geography={{ type: "FeatureCollection", features: mainGeographies }}>
              {({ geographies: geos }) =>
                geos.map((geo) => {
                  const code = getDeptCode(geo);
                  const dept = data[code];
                  return (
                    <DepartmentGeography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFill(geo)}
                      selected={code === selectedId}
                      onClick={() => onSelect(code === selectedId ? null : code)}
                      onMouseEnter={showTooltip(dept)}
                      onMouseMove={moveTooltip}
                      onMouseLeave={hideTooltip}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}

      {/* "Map is clickable" nudge — pinned top-center, offset clear of the
          top-left San Andrés inset (whose reach varies by breakpoint), then
          centered in the remaining width. Fades out once the reader has
          selected a department.
          `inset-x-0` + `flex justify-center` (not `left-1/2 -translate-x-1/2`)
          because an auto-width absolutely-positioned box with only `left` set
          has its shrink-to-fit width computed against the space from `left`
          to the container's edge, not the true available width — on narrow
          viewports that mis-sizes the pill and forces the text to wrap. */}
      {!isEmpty && !selectedId && (
        <div className="absolute top-3 inset-x-0 z-20 flex justify-center pl-[72px] sm:pl-[92px] md:pl-[134px] pr-2 pointer-events-none">
          <InteractiveHint variant="pill" className="whitespace-nowrap">
            Toca un departamento
          </InteractiveHint>
        </div>
      )}

      {/* San Andrés y Providencia inset (top-left, clear of the centered slider) */}
      {!isEmpty && sanAndres && (
        <SanAndresInset
          feature={sanAndres}
          fill={getFill(sanAndres)}
          selected={selectedId === SAN_ANDRES_CODE}
          onClick={() =>
            onSelect(selectedId === SAN_ANDRES_CODE ? null : SAN_ANDRES_CODE)
          }
          onEnter={showTooltip(data[SAN_ANDRES_CODE])}
          onMove={moveTooltip}
          onLeave={hideTooltip}
        />
      )}

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="hidden md:block fixed z-50 pointer-events-none bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 36 }}
        >
          <p className="font-semibold">{tooltip.name}</p>
          <p className="text-slate-300">{metric.label}: {tooltip.value}</p>
        </div>
      )}

      {/* Zoom controls + reset (reset shows on any non-default view) */}
      {!isEmpty && (
        <MapZoomControls
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetView}
          showReset={showReset}
        />
      )}

      {/* Color legend */}
      {!isEmpty && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 shadow-md text-xs">
          <p className="font-semibold text-slate-700 dark:text-slate-100 mb-1">{metric.label}</p>
          <div
            className="h-2 w-32 rounded"
            style={{
              background: `linear-gradient(to right, ${metric.colorRange[0]}, ${metric.colorRange[1]})`,
            }}
          />
          <div className="flex justify-between text-slate-600 dark:text-slate-300 mt-0.5">
            <span>{metric.format(metric.domain[0])}</span>
            <span>{metric.format(metric.domain[1])}</span>
          </div>
        </div>
      )}
    </div>
  );
}
