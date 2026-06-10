import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid, geoBounds } from "d3-geo";

const GEO_URL = "/colombia.geojson";

const DEFAULT_CENTER = [-74, 4];
const DEFAULT_ZOOM = 1;

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

// Derive a zoom level that frames a department from its geographic bounds.
function zoomForFeature(feature) {
  const [[x0, y0], [x1, y1]] = geoBounds(feature);
  const maxSpan = Math.max(x1 - x0, y1 - y0); // degrees
  // ~7° span → zoom 1.5, ~1° span → zoom 6, clamped
  return Math.max(2, Math.min(6, 7 / maxSpan));
}

export default function ColombiaMap({ data, metric, selectedId, onSelect }) {
  const [geographies, setGeographies] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  const animRef = useRef(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((fc) => setGeographies(fc.features ?? []))
      .catch(() => {});
  }, []);

  // Tween the view to a target { coordinates, zoom }. Reads the latest
  // position from a ref so callers don't need it as a dependency.
  const positionRef = useRef(position);
  positionRef.current = position;

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

    if (!selectedId) {
      animateTo({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
      return;
    }
    const feature = geographies.find((g) => getDeptCode(g) === selectedId);
    if (!feature) return;
    animateTo({ coordinates: geoCentroid(feature), zoom: zoomForFeature(feature) });

    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!dept) return "#e2e8f0";
    const val = dept[metric.id];
    return val != null ? colorScale(val) : "#e2e8f0";
  };

  const isEmpty = geographies.length === 0;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-3 text-slate-400 p-8 text-center">
          <svg className="w-16 h-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="font-medium text-slate-500">Sin datos GeoJSON</p>
          <p className="text-sm max-w-xs">
            Agrega los departamentos de Colombia en{" "}
            <code className="bg-slate-100 px-1 rounded text-xs">public/colombia.geojson</code>.
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
            onMoveEnd={setPosition}
          >
            <Geographies geography={{ type: "FeatureCollection", features: geographies }}>
              {({ geographies: geos }) =>
                geos.map((geo) => {
                  const code = getDeptCode(geo);
                  const dept = data[code];
                  const isSelected = code === selectedId;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFill(geo)}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: "none",
                          opacity: isSelected ? 1 : 0.85,
                          filter: isSelected ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
                        },
                        hover: { outline: "none", opacity: 1, cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onClick={() => onSelect(code === selectedId ? null : code)}
                      onMouseEnter={(e) => {
                        if (dept) {
                          setTooltip({
                            name: dept.name,
                            value: metric.format(dept[metric.id]),
                            x: e.clientX,
                            y: e.clientY,
                          });
                        }
                      }}
                      onMouseMove={(e) => {
                        if (tooltip) {
                          setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg"
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
          className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 hover:bg-white rounded-lg px-3 py-1.5 shadow text-xs font-medium text-slate-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z M12 8v4l2 2" />
          </svg>
          Centrar mapa
        </button>
      )}

      {/* Color legend */}
      {!isEmpty && (
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow text-xs">
          <p className="font-medium text-slate-600 mb-1">{metric.label}</p>
          <div
            className="h-2 w-32 rounded"
            style={{
              background: `linear-gradient(to right, ${metric.colorRange[0]}, ${metric.colorRange[1]})`,
            }}
          />
          <div className="flex justify-between text-slate-400 mt-0.5">
            <span>{metric.format(metric.domain[0])}</span>
            <span>{metric.format(metric.domain[1])}</span>
          </div>
        </div>
      )}
    </div>
  );
}
