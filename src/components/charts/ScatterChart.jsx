import { scaleLinear } from "d3-scale";

const W = 640;
const H = 400;
const M = { top: 16, right: 18, bottom: 46, left: 54 };

/**
 * Two-metric scatter of departments — each point plots one metric on x against
 * another on y, revealing how the two relate (e.g. income poverty vs. multi-
 * dimensional deprivation). Points are clickable (→ onSelect) and the selected
 * one is highlighted and labelled, along with the two extremes so the chart is
 * informative before any interaction. SVG (no recharts) so it sizes cleanly.
 *
 * @param {Object} departments  keyed by code, each carrying both metric values
 * @param {Object} xMetric      descriptor (domain, format, label) for the x axis
 * @param {Object} yMetric      descriptor for the y axis
 * @param {string|null} [selectedCode]
 * @param {(code:string)=>void} [onSelect]
 */
export default function ScatterChart({ departments, xMetric, yMetric, selectedCode, onSelect }) {
  const data = Object.entries(departments)
    .map(([code, d]) => ({ code, name: d.name, x: d[xMetric.id], y: d[yMetric.id] }))
    .filter((d) => d.x != null && d.y != null);

  const x = scaleLinear().domain(xMetric.domain).range([M.left, W - M.right]).clamp(true);
  const y = scaleLinear().domain(yMetric.domain).range([H - M.bottom, M.top]).clamp(true);

  // Label the selected department plus the two storyline extremes (poorest on
  // both axes / least poor on both), normalised across each axis's domain.
  const norm = (m, v) => (v - m.domain[0]) / (m.domain[1] - m.domain[0]);
  const scored = data.map((d) => ({ ...d, score: norm(xMetric, d.x) + norm(yMetric, d.y) }));
  const bySum = [...scored].sort((a, b) => b.score - a.score);
  const labelled = new Set(
    [bySum[0]?.code, bySum[bySum.length - 1]?.code, selectedCode].filter(Boolean)
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Dispersión de ${xMetric.label} frente a ${yMetric.label} por departamento`}
    >
      {/* horizontal gridlines + y tick labels */}
      {y.ticks(5).map((t) => (
        <g key={`y${t}`}>
          <line
            x1={M.left}
            x2={W - M.right}
            y1={y(t)}
            y2={y(t)}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="12" className="fill-slate-500 dark:fill-slate-400">
            {yMetric.format(t)}
          </text>
        </g>
      ))}

      {/* x tick labels */}
      {x.ticks(5).map((t) => (
        <text key={`x${t}`} x={x(t)} y={H - M.bottom + 18} textAnchor="middle" fontSize="12" className="fill-slate-500 dark:fill-slate-400">
          {xMetric.format(t)}
        </text>
      ))}

      {/* axis titles */}
      <text x={(M.left + W - M.right) / 2} y={H - 6} textAnchor="middle" fontSize="13" className="fill-slate-600 dark:fill-slate-300">
        {xMetric.label} →
      </text>
      <text
        transform={`translate(15 ${(M.top + H - M.bottom) / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize="13"
        className="fill-slate-600 dark:fill-slate-300"
      >
        {yMetric.label} →
      </text>

      {/* points */}
      {data.map((d) => {
        const selected = d.code === selectedCode;
        return (
          <circle
            key={d.code}
            cx={x(d.x)}
            cy={y(d.y)}
            r={selected ? 8 : 5}
            strokeWidth={selected ? 2.5 : 1.5}
            className={
              selected
                ? "fill-blue-800 dark:fill-blue-200 stroke-white dark:stroke-slate-800"
                : "fill-blue-500 dark:fill-blue-400 hover:fill-blue-700 dark:hover:fill-blue-200 stroke-white dark:stroke-slate-800"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onSelect?.(d.code)}
          >
            <title>{`${d.name} — ${xMetric.label}: ${xMetric.format(d.x)}; ${yMetric.label}: ${yMetric.format(d.y)}`}</title>
          </circle>
        );
      })}

      {/* labels for selected + extremes */}
      {data
        .filter((d) => labelled.has(d.code))
        .map((d) => {
          const flip = x(d.x) > W - M.right - 80; // keep labels in frame on the right edge
          return (
            <text
              key={`l${d.code}`}
              x={flip ? x(d.x) - 9 : x(d.x) + 9}
              y={y(d.y)}
              dy="0.32em"
              textAnchor={flip ? "end" : "start"}
              fontSize="12"
              fontWeight="500"
              className={d.code === selectedCode ? "fill-blue-700 dark:fill-blue-300" : "fill-slate-600 dark:fill-slate-300"}
            >
              {d.name}
            </text>
          );
        })}
    </svg>
  );
}
