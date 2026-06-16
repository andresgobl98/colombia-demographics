const MALE_COLOR = "#3b82f6";   // blue-500
const FEMALE_COLOR = "#f43f5e"; // rose-500

/**
 * Diverging age-by-sex population pyramid. Males extend left, females right,
 * around a centered age-group label. Bar widths are relative to the largest
 * single bar so both sides share one scale. Animates with the year slider.
 *
 * @param {string[]} ageGroups  group labels, youngest → oldest
 * @param {number[]} male       count per group (aligned to ageGroups)
 * @param {number[]} female     count per group
 */
export default function PopulationPyramid({ ageGroups, male, female }) {
  const max = Math.max(...male, ...female, 0);
  const fmt = (v) => v.toLocaleString("es-CO");
  const width = (v) => (max > 0 && v > 0 ? `${(v / max) * 100}%` : 0);

  // Oldest group on top, youngest at the base — standard pyramid orientation.
  const rows = ageGroups
    .map((g, i) => ({ group: g, m: male[i], f: female[i] }))
    .reverse();

  return (
    <div>
      <div className="flex text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1">
        <span className="flex-1 text-right pr-1" style={{ color: MALE_COLOR }}>Hombres</span>
        <span className="w-12 shrink-0" />
        <span className="flex-1 text-left pl-1" style={{ color: FEMALE_COLOR }}>Mujeres</span>
      </div>
      <ul className="flex flex-col gap-[2px]">
        {rows.map(({ group, m, f }) => (
          <li key={group} className="flex items-center">
            <div className="flex-1 flex justify-end">
              <div
                title={`Hombres ${group}: ${fmt(m)}`}
                className="h-3 rounded-l-sm transition-all duration-500"
                style={{ width: width(m), backgroundColor: MALE_COLOR }}
              />
            </div>
            <span className="w-12 shrink-0 text-center text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
              {group}
            </span>
            <div className="flex-1 flex justify-start">
              <div
                title={`Mujeres ${group}: ${fmt(f)}`}
                className="h-3 rounded-r-sm transition-all duration-500"
                style={{ width: width(f), backgroundColor: FEMALE_COLOR }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
