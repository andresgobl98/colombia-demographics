import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid, geoBounds } from "d3-geo";
import SanAndresInset from "./SanAndresInset";
import DepartmentGeography from "./DepartmentGeography";
import { useColombiaGeographies, getDeptCode, SAN_ANDRES_CODE } from "./geo";
import { useDemographics } from "../../state/demographicsStore";

// Let single-finger touch scroll the page instead of panning the map; still
// allow pinch-zoom (2+ touches) and desktop wheel/drag. Maps to d3-zoom .filter().
function filterZoomEvent(event) {
  if (event.type && event.type.startsWith("touch")) {
    return event.touches && event.touches.length > 1;
  }
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}

const DEFAULT_CENTER = [-74, 4];
const DEFAULT_ZOOM = 1;

// Derive a zoom level that frames a department from its geographic bounds.
function zoomForFeature(feature) {
  const [[x0, y0], [x1, y1]] = geoBounds(feature);
  const maxSpan = Math.max(x1 - x0, y1 - y0); // degrees
  // ~7° span → zoom 1.5, ~1° span → zoom 6, clamped
  return Math.max(2, Math.min(6, 7 / maxSpan));
}

export default function ColombiaMap() {
  const {
    departments: data,
    metric,
    selectedDeptCode: selectedId,
    selectDepartment: onSelect,
  } = useDemographics();
  const { geographies, mainGeographies, sanAndres, isEmpty } = useColombiaGeographies();
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  const animRef = useRef(null);

  // Tween the view to a target { coordinates, zoom }. Reads the latest
  // position from a ref so callers don't need it as a dependency.
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const animateTo = (target) => {
    cancelAnimationFrame(animRef.current);
    const start = positionRef.current;
    const startTime = performance.now();
    const duration = 600;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const k = ease(t);
      setPosition({
        coordinates: [
          start.coordinates[0] + (target.coordinates[0] - start.coordinates[0]) * k,
          start.coordinates[1] + (target.coordinates[1] - start.coordinates[1]) * k,
        ],
        zoom: start.zoom + (target.zoom - start.zoom) * k,
      });
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const resetView = () => {
    onSelect(null);
    animateTo({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
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

    return () => cancelAnimationFrame(animRef.current);
  }, [selectedId, geographies]);

  // True when the map is panned/zoomed away from the national default view.
  const isOffDefault =
    !!selectedId ||
    Math.abs(position.zoom - DEFAULT_ZOOM) > 0.01 ||
    Math.abs(position.coordinates[0] - DEFAULT_CENTER[0]) > 0.05 ||
    Math.abs(position.coordinates[1] - DEFAULT_CENTER[1]) > 0.05;

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
        <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500 p-8 text-center">
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
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={1}
            maxZoom={8}
            filterZoomEvent={filterZoomEvent}
            onMoveEnd={setPosition}
          >
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

      {/* Reset button — visible on any non-default view (selection or manual pan/zoom) */}
      {!isEmpty && isOffDefault && (
        <button
          onClick={resetView}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg px-3 py-1.5 shadow-md text-xs font-medium text-slate-700 dark:text-slate-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z M12 8v4l2 2" />
          </svg>
          Centrar mapa
        </button>
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
