import { getPovertyMetric } from "../../data/povertyMetrics";
import MetricStatCard from "./MetricStatCard";

// Headline indicators that have a national figure (the GEIH monetary trio does
// not), one per data family, shown as statement cards.
const FEATURED = ["ipm", "nbi", "deficit_habitacional", "acueducto"];

/**
 * National summary band: a grid of statement cards, one per headline indicator.
 *
 * @param {{ [metricId: string]: number|null }} national
 */
export default function NationalSummaryBand({ national }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {FEATURED.map((id) => {
        const m = getPovertyMetric(id);
        return <MetricStatCard key={id} metric={m} value={national?.[id]} size="lg" />;
      })}
    </div>
  );
}
