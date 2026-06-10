/**
 * Small labeled stat tile.
 *
 * @param {string} label
 * @param {React.ReactNode} value
 */
export default function StatCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}
