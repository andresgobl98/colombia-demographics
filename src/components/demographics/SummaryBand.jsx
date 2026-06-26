import { MetricStatCard } from "../ui";
import { statementFigures } from "../../data/demographicsMetrics";

/**
 * National panorama: the headline demographic figures as statement cards
 * (population, sex split, density), read as plain sentences. Tracks the selected
 * year through `national`, so the figures update as the year is scrubbed.
 *
 * @param {Object} national  national aggregate for the selected year
 */
export default function SummaryBand({ national }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {statementFigures(national).map(({ metric, value }) => (
        <MetricStatCard key={metric.id} metric={metric} value={value} size="lg" />
      ))}
    </div>
  );
}
