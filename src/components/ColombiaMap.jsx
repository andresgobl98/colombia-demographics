import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const GEO_URL = "/colombia.geojson";

// Maps a GeoJSON feature's department code to our data key.
// Adjust this once real GeoJSON is loaded — depends on which property stores the DANE code.
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

export default function ColombiaMap({ data, metric, selectedId, onSelect }) {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((fc) => setGeographies(fc.features ?? []))
      .catch(() => {});
  }, []);

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
    <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-3 text-slate-400 p-8 text-center">
          <svg className="w-16 h-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="font-medium text-slate-500">No GeoJSON data loaded</p>
          <p className="text-sm max-w-xs">
            Add Colombia department features to{" "}
            <code className="bg-slate-100 px-1 rounded text-xs">public/colombia.geojson</code>.
            A good source is{" "}
            <a
              href="https://github.com/marcovega/colombia-json"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              marcovega/colombia-json
            </a>{" "}
            or DANE's official shapefiles converted with mapshaper.
          </p>
        </div>
      ) : (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-74, 4], scale: 2400 }}
          className="w-full h-full"
        >
          <Geographies geography={{ type: "FeatureCollection", features: geographies }}>
            {({ geographies: geos }) =>
              geos.map((geo) => {
                const code = getDeptCode(geo);
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
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
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
