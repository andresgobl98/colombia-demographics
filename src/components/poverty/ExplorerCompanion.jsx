import TopicRanking from "../TopicRanking";
import PovertyPanel from "./PovertyPanel";
import { usePoverty } from "../../state/povertyStore";

const TABS = [
  { id: "ranking", label: "Ranking" },
  { id: "detalle", label: "Detalle" },
];

/**
 * The map's companion column — one card with a segmented control that swaps
 * between the cross-department ranking and the detail profile of the selected (or
 * national) territory. Picking a department on the map flips the store's
 * companionTab to "detalle". Fills its parent's height; the page sets that.
 */
export default function ExplorerCompanion() {
  const { departments, metric, companionTab, setCompanionTab } = usePoverty();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div
        role="tablist"
        aria-label="Vista del indicador"
        className="flex gap-1 p-1.5 border-b border-slate-100 dark:border-slate-700 shrink-0"
      >
        {TABS.map((t) => {
          const active = companionTab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCompanionTab(t.id)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        {companionTab === "detalle" ? (
          <PovertyPanel />
        ) : (
          <TopicRanking departments={departments} metric={metric} bare />
        )}
      </div>
    </div>
  );
}
