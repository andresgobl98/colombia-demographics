import { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoMercator } from "d3-geo";

const W = 112; // inset map width (px)
const H = 92;  // inset map height (px)

// The archipelago's islands are ~90 km apart, so fitting the whole feature
// leaves them as tiny dots. Fit to the largest polygon (San Andrés island)
// so the main landmass fills the box; the smaller island clips out the top.
function mainIslandFeature(feature) {
  const g = feature.geometry;
  if (!g || g.type !== "MultiPolygon") return feature;

  let best = null;
  let bestArea = -Infinity;
  for (const poly of g.coordinates) {
    const ring = poly[0];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of ring) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const area = (maxX - minX) * (maxY - minY);
    if (area > bestArea) {
      bestArea = area;
      best = poly;
    }
  }
  return { type: "Feature", properties: feature.properties, geometry: { type: "Polygon", coordinates: best } };
}

/**
 * Locator-box inset for the San Andrés y Providencia archipelago (code 88).
 * The island is ~700 km offshore and renders as a speck on the mainland-fit
 * map, so it gets its own auto-fitted mini-map pinned in a corner.
 *
 * Coloring, selection and tooltip behaviour mirror the main map — the parent
 * passes the same fill and handlers, keyed by department code.
 */
export default function SanAndresInset({
  feature,
  fill,
  selected,
  onClick,
  onEnter,
  onMove,
  onLeave,
}) {
  // Fit the projection to the main island so it fills the box.
  const projection = useMemo(
    () => geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], mainIslandFeature(feature)),
    [feature]
  );

  return (
    <div className="absolute top-3 left-3 z-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/95 dark:bg-slate-900/70 backdrop-blur shadow-sm overflow-hidden">
      {/* Smaller on mobile so it covers less of the mainland; SVG scales to fit */}
      <div className="w-[76px] h-[62px] md:w-28 md:h-[92px]">
        <ComposableMap
          projection={projection}
          width={W}
          height={H}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          {/* Geographies computes the svgPath for the feature using our projection */}
          <Geographies geography={{ type: "FeatureCollection", features: [feature] }}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="var(--map-stroke)"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                      opacity: selected ? 1 : 0.9,
                      filter: selected ? "drop-shadow(0 0 3px rgba(0,0,0,0.35))" : "none",
                    },
                    hover: { outline: "none", opacity: 1, cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                  onClick={onClick}
                  onMouseEnter={onEnter}
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      <p className="text-[9px] text-center text-slate-500 dark:text-slate-400 px-1 pb-0.5 leading-tight">
        San Andrés y Prov.
      </p>
    </div>
  );
}
