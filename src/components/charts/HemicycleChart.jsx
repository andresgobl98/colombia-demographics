/**
 * Parliament / hemicycle seat diagram.
 *
 * Seats are arranged in concentric rows within a semicircle; each party fills a
 * contiguous wedge (spectrum order). Algorithm:
 *   1. rows ≈ ceil(√(total/3))
 *   2. seats per row ∝ row radius
 *   3. place each row's seats evenly along angle π→0
 *   4. sort all seats by angle, then assign parties in order
 *
 * @param {Array<{id,name,color,seats}>} parties  ordered left → right
 * @param {string|null} highlightId  optional party to emphasise (others dim)
 * @param {(id:string|null)=>void} [onHighlight]
 */
export default function HemicycleChart({ parties, highlightId = null, onHighlight }) {
  const total = parties.reduce((a, p) => a + p.seats, 0);
  if (total === 0) return null;

  const W = 480;
  const H = 252;
  const margin = 12;
  const cx = W / 2;
  const baseY = H - margin;
  const Rout = W / 2 - margin; // outer radius in px

  const rows = Math.max(3, Math.ceil(Math.sqrt(total / 3)));
  const innerFrac = 0.46; // smaller hole → rings spread out, less cramped
  const radii = Array.from({ length: rows }, (_, i) =>
    innerFrac + (1 - innerFrac) * (rows === 1 ? 1 : i / (rows - 1))
  );
  const wSum = radii.reduce((a, b) => a + b, 0);

  // Seats per row ∝ radius, then fix rounding so the total matches exactly.
  const counts = radii.map((r) => Math.max(1, Math.round((total * r) / wSum)));
  let assigned = counts.reduce((a, b) => a + b, 0);
  let i = rows - 1;
  let guard = 0;
  while (assigned !== total && guard++ < 1000) {
    if (assigned < total) { counts[i]++; assigned++; }
    else if (counts[i] > 1) { counts[i]--; assigned--; }
    i = (i - 1 + rows) % rows;
  }

  // Build seat positions.
  const seats = [];
  radii.forEach((rFrac, ri) => {
    const n = counts[ri];
    const r = rFrac * Rout;
    for (let k = 0; k < n; k++) {
      const t = n === 1 ? 0.5 : k / (n - 1);
      const angle = Math.PI * (1 - t); // π (left) → 0 (right)
      seats.push({
        angle,
        x: cx + r * Math.cos(angle),
        y: baseY - r * Math.sin(angle),
      });
    }
  });
  seats.sort((a, b) => b.angle - a.angle); // left → right

  // Seat radius from outer-row spacing and row gap.
  const arcOuter = (Math.PI * Rout) / counts[rows - 1];
  const rowGap = ((1 - innerFrac) * Rout) / Math.max(1, rows - 1);
  const seatR = Math.max(3.5, Math.min(arcOuter * 0.48, rowGap * 0.46));

  // Assign parties in order to the angle-sorted seats.
  const expanded = parties.flatMap((p) => Array(p.seats).fill(p));
  seats.forEach((s, idx) => { s.party = expanded[idx]; });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Distribución de curules">
      {seats.map((s, idx) => {
        const dim = highlightId && s.party.id !== highlightId ? 0.25 : 1;
        return (
          <circle
            key={idx}
            cx={s.x}
            cy={s.y}
            r={seatR}
            fill={s.party.color}
            opacity={dim}
            onMouseEnter={() => onHighlight?.(s.party.id)}
            onMouseLeave={() => onHighlight?.(null)}
            style={{ transition: "opacity 150ms" }}
          >
            <title>{s.party.name}</title>
          </circle>
        );
      })}
      <text x={cx} y={baseY - 8} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" style={{ fontSize: 32, fontWeight: 700 }}>
        {total}
      </text>
      <text x={cx} y={baseY + 9} textAnchor="middle" className="fill-slate-400 dark:fill-slate-500" style={{ fontSize: 12 }}>
        curules
      </text>
    </svg>
  );
}
