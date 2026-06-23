import { useLayoutEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

/**
 * Donut/pie chart for proportions where slices are reasonably sized.
 *
 * @param {Array<{name:string, value:number, color:string}>} data
 * @param {(v:number)=>string} [formatTooltip]  formats the tooltip value
 * @param {number} [height]                      pixel height of the chart area
 */
export default function DonutChart({ data, formatTooltip, height = 230 }) {
  // We measure the container ourselves and pass explicit pixel dimensions to
  // PieChart instead of using ResponsiveContainer. ResponsiveContainer renders
  // once at width/height -1 before its own observer measures, which logs
  // "width(-1)/height(-1)" warnings and can spin into a "Maximum update depth
  // exceeded" loop while it lives in a display:none subtree (the desktop aside is
  // mounted-but-hidden at mobile widths) or mounts mid slide-in transition.
  // Gating on a real measured width avoids all of that. clientWidth is 0 while in
  // a display:none subtree; the observer re-fires when it becomes visible (e.g.
  // crossing the md breakpoint).
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ height }}>
      {width > 0 && (
        <PieChart width={width} height={height}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={48}
            outerRadius={75}
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          {formatTooltip ? <Tooltip formatter={formatTooltip} /> : <Tooltip />}
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
            // Recharts colors the label with the slice color (blue/rose-500),
            // which fails AA on white. Keep the colored dot, neutralize the text.
            formatter={(value) => (
              <span className="text-slate-600 dark:text-slate-300">{value}</span>
            )}
          />
        </PieChart>
      )}
    </div>
  );
}
