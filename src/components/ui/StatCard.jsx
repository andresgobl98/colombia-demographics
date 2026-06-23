import Copy from "./Copy";

/**
 * Small labeled stat tile.
 *
 * @param {string} label
 * @param {React.ReactNode} value
 */
export default function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
      {/* slate-400 failed AA on the slate-50 tile; detail (slate-600/300) passes. */}
      <Copy as="p" variant="detail" className="mb-0.5">{label}</Copy>
      <Copy as="p" variant="strong" className="text-slate-800 dark:text-slate-100">{value}</Copy>
    </div>
  );
}
