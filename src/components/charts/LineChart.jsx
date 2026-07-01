import { useId, useLayoutEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";

const W = 640;
const H = 260;
const M = { top: 16, right: 16, bottom: 28, left: 54 };

const compactFmt = (v) =>
  new Intl.NumberFormat("es-CO", { notation: "compact", maximumFractionDigits: 1 }).format(v);

/**
 * Single-series time line (e.g. population across years). Hover on desktop or
 * tap on mobile previews any point in a fixed-height detail row above the
 * chart, defaulting to `activeX` so a value is always shown. Passing `splitX`
 * (e.g. the current calendar year) recolors everything from that point
 * onward with `futureColor`, so a projection reads visually as "what's still
 * ahead" vs. "up to now." SVG + d3-scale, no recharts, sized via viewBox like
 * the other charts here (ScatterChart, DumbbellChart) so it scales cleanly
 * without a ResizeObserver.
 *
 * @param {Array<{x:number, y:number}>} data  ascending by x
 * @param {number} [activeX]                   x to preview by default (e.g. the year picker's current year); falls back to the last point
 * @param {number} [splitX]                    x from which the line switches to `futureColor` (e.g. the real current year)
 * @param {string} [color]                     line/area color up to `splitX` (hex)
 * @param {string} [futureColor]               line/area color from `splitX` onward (hex)
 * @param {(v:number)=>string} [formatX]
 * @param {(v:number)=>string} [formatY]
 */
export default function LineChart({
  data,
  activeX,
  splitX,
  color = "#3b82f6",
  futureColor = "#93c5fd",
  formatX = (v) => `${v}`,
  formatY = (v) => v.toLocaleString(),
}) {
  const gradientId = useId();
  const svgRef = useRef(null);
  const pastPathRef = useRef(null);
  const futurePathRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pastLength, setPastLength] = useState(0);
  const [futureLength, setFutureLength] = useState(0);
  const [drawn, setDrawn] = useState(false);

  const xs = data.map((p) => p.x);
  const ys = data.map((p) => p.y);
  const yLo = Math.min(...ys);
  const yHi = Math.max(...ys);
  const pad = (yHi - yLo) * 0.12 || yHi * 0.05 || 1;

  const x = scaleLinear().domain([xs[0], xs[xs.length - 1]]).range([M.left, W - M.right]);
  const y = scaleLinear().domain([yLo - pad, yHi + pad]).range([H - M.bottom, M.top]);

  // splitX lands exactly on a data point (years are consecutive integers), so
  // slicing at its index and sharing that point between both halves keeps the
  // line visually continuous.
  const splitIdx = splitX == null ? -1 : xs.indexOf(splitX);
  const hasSplit = splitIdx > 0 && splitIdx < data.length - 1;
  const pastData = hasSplit ? data.slice(0, splitIdx + 1) : data;
  const futureData = hasSplit ? data.slice(splitIdx) : [];

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.x)},${y(p.y)}`).join(" ");
  const toAreaPath = (pts) =>
    pts.length === 0
      ? ""
      : `${toPath(pts)} L${x(pts[pts.length - 1].x)},${H - M.bottom} L${x(pts[0].x)},${H - M.bottom} Z`;

  const pastLine = toPath(pastData);
  const futureLine = toPath(futureData);
  const pastArea = toAreaPath(pastData);
  const futureArea = toAreaPath(futureData);

  // Replays whenever either segment's shape changes (new dataset), not on hover.
  useLayoutEffect(() => {
    setPastLength(pastPathRef.current?.getTotalLength() ?? 0);
    setFutureLength(futurePathRef.current?.getTotalLength() ?? 0);
    setDrawn(false);
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, [pastLine, futureLine]);

  const defaultIndex = activeX == null ? data.length - 1 : Math.max(0, xs.indexOf(activeX));
  const activeIndex = hoverIndex ?? defaultIndex;
  const active = data[activeIndex];
  const activeColor = hasSplit && activeIndex >= splitIdx ? futureColor : color;

  function indexFromClientX(clientX) {
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const idx = Math.round(x.invert(px) - xs[0]);
    return Math.min(data.length - 1, Math.max(0, idx));
  }

  if (data.length === 0) return null;

  return (
    <div>
      {/* Detail row — fixed height so hover/tap never shifts layout */}
      <div className="h-9 mb-1 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
          {formatX(active.x)}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">
          {formatY(active.y)}
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto cursor-crosshair"
        role="img"
        aria-label={`Tendencia de ${formatX(xs[0])} a ${formatX(xs[xs.length - 1])}`}
        onMouseMove={(e) => setHoverIndex(indexFromClientX(e.clientX))}
        onMouseLeave={() => setHoverIndex(null)}
        onClick={(e) => setHoverIndex(indexFromClientX(e.clientX))}
      >
        <defs>
          <linearGradient id={`${gradientId}-past`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${gradientId}-future`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={futureColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={futureColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines + y tick labels */}
        {y.ticks(4).map((t) => (
          <g key={t}>
            <line
              x1={M.left}
              x2={W - M.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-slate-100 dark:stroke-slate-700"
              strokeWidth="1"
            />
            <text
              x={M.left - 8}
              y={y(t)}
              dy="0.32em"
              textAnchor="end"
              fontSize="12"
              className="fill-slate-500 dark:fill-slate-400"
            >
              {compactFmt(t)}
            </text>
          </g>
        ))}

        {/* x tick labels */}
        {x.ticks(Math.min(7, data.length)).map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - M.bottom + 18}
            textAnchor="middle"
            fontSize="12"
            className="fill-slate-500 dark:fill-slate-400"
          >
            {formatX(Math.round(t))}
          </text>
        ))}

        <path d={pastArea} fill={`url(#${gradientId}-past)`} stroke="none" />
        {hasSplit && <path d={futureArea} fill={`url(#${gradientId}-future)`} stroke="none" />}

        <path
          ref={pastPathRef}
          d={pastLine}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pastLength,
            strokeDashoffset: drawn ? 0 : pastLength,
            transition: pastLength ? "stroke-dashoffset 900ms ease-out" : "none",
          }}
        />
        {hasSplit && (
          <path
            ref={futurePathRef}
            d={futureLine}
            fill="none"
            stroke={futureColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: futureLength,
              strokeDashoffset: drawn ? 0 : futureLength,
              transition: futureLength ? "stroke-dashoffset 900ms ease-out" : "none",
            }}
          />
        )}

        <g>
          <line
            x1={x(active.x)}
            x2={x(active.x)}
            y1={M.top}
            y2={H - M.bottom}
            className="stroke-slate-300 dark:stroke-slate-600"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={x(active.x)}
            cy={y(active.y)}
            r="5"
            fill={activeColor}
            className="stroke-white dark:stroke-slate-800"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
