import { ColombiaMap } from "../components/maps";
import RegionPanel from "../components/RegionPanel";
import ControlBar from "../components/ControlBar";
import TopicRanking from "../components/TopicRanking";
import { Copy } from "../components/ui";
import { useDemographics } from "../state/demographicsStore";

export default function DemographicsPage() {
  const { panelOpen, openNationalPanel, departments, metric, selectedDeptCode, selectDepartment } =
    useDemographics();

  const map = (
    <ColombiaMap
      departments={departments}
      metric={metric}
      selectedCode={selectedDeptCode}
      onSelect={selectDepartment}
    />
  );
  const ranking = <TopicRanking departments={departments} metric={metric} />;

  return (
    <>
      {/* ── Desktop layout (md+) ────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          <ControlBar />
          <div className="relative flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {map}
          </div>
          {ranking}
        </main>
        <aside className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-y-auto">
          <RegionPanel />
        </aside>
      </div>

      {/* ── Mobile layout (<md) ─────────────────────────────────────────────── */}
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        <ControlBar />
        <div className="relative h-[55vh] min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
          {map}
        </div>
        <button
          onClick={openNationalPanel}
          className="shrink-0 flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 shadow-sm"
        >
          <Copy as="span" variant="detail" className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ver más
          </Copy>
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {ranking}
      </div>

      {/* ── Mobile slide-in panel ───────────────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-slate-900 overflow-y-auto transition-transform duration-300 ease-out ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {panelOpen && <RegionPanel mobile />}
      </div>
    </>
  );
}
