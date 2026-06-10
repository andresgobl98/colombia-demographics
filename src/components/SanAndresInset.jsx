import { useMemo } from "react";
import { ComposableMap, Geography } from "react-simple-maps";
import { geoMercator } from "d3-geo";

const W = 112; // inset map width (px)
const H = 92;  // inset map height (px)

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
  // Fit the archipelago into the box with a little padding.
  const projection = useMemo(
    () => geoMercator().fitExtent([[8, 8], [W - 8, H - 8]], feature),
    [feature]
  );

  return (
    <div className="absolute top-3 left-3 z-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/95 dark:bg-slate-900/70 backdrop-blur shadow-sm overflow-hidden">
      <div style={{ width: W, height: H }}>
        <ComposableMap
          projection={projection}
          width={W}
          height={H}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <Geography
            geography={feature}
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
        </ComposableMap>
      </div>
      <p className="text-[9px] text-center text-slate-500 dark:text-slate-400 px-1 pb-0.5 leading-tight">
        San Andrés y Prov.
      </p>
    </div>
  );
}
