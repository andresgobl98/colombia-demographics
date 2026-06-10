import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * Donut/pie chart for proportions where slices are reasonably sized.
 *
 * @param {Array<{name:string, value:number, color:string}>} data
 * @param {(v:number)=>string} [formatTooltip]  formats the tooltip value
 * @param {number} [height]                      pixel height of the chart area
 */
export default function DonutChart({ data, formatTooltip, height = 230 }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
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
            wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
