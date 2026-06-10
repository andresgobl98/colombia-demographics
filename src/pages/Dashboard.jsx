import ColombiaMap from "../components/ColombiaMap";
import RegionPanel from "../components/RegionPanel";
import MetricSelector from "../components/MetricSelector";
import TopicRanking from "../components/TopicRanking";
import TimelineSlider from "../components/TimelineSlider";
import { ThemeToggle } from "../components/ui";

export default function Dashboard({ state, actions }) {
  const { metric, metrics, selectedDept, selectedDeptCode, national, departments, years, selectedYear } = state;
  const { setSelectedMetricId, setSelectedDeptCode, setSelectedYear } = actions;

  const slider = (
    <TimelineSlider years={years} value={selectedYear} onChange={setSelectedYear} />
  );

  // Desktop: float the slider over the top of the map (plenty of room there).
  const timelineOverlay = (
    <div className="absolute top-3 inset-x-0 z-30 flex justify-center px-3 pointer-events-none">
      {slider}
    </div>
  );

  return (
    <div className="flex flex-col h-svh bg-slate-50 dark:bg-slate-900">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none">Colombia en Datos</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">DANE · Censo 2018 y proyecciones 2018–2050</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MetricSelector
            metrics={metrics}
            selected={metric.id}
            onChange={setSelectedMetricId}
          />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Desktop layout (md+) ────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          <div className="relative flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {timelineOverlay}
            <ColombiaMap
              data={departments}
              metric={metric}
              selectedId={selectedDeptCode}
              onSelect={setSelectedDeptCode}
            />
          </div>
          <TopicRanking data={departments} metric={metric} />
        </main>
        <aside className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-y-auto">
          <RegionPanel department={selectedDept} national={national} year={selectedYear} />
        </aside>
      </div>

      {/* ── Mobile layout (<md) ─────────────────────────────────────────────── */}
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {/* Year slider sits above the map in normal flow (no overlap) */}
        <div className="flex justify-center shrink-0">{slider}</div>
        {/* Map */}
        <div className="relative h-[55vh] min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
          <ColombiaMap
            data={departments}
            metric={metric}
            selectedId={selectedDeptCode}
            onSelect={setSelectedDeptCode}
          />
        </div>
        {/* National ranking lives with the map */}
        <TopicRanking data={departments} metric={metric} />
      </div>

      {/* ── Mobile slide-in panel ───────────────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-slate-900 overflow-y-auto transition-transform duration-300 ease-out ${
          selectedDept ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedDept && (
          <RegionPanel
            department={selectedDept}
            national={national}
            year={selectedYear}
            onBack={() => setSelectedDeptCode(null)}
          />
        )}
      </div>

      {/* ── Footer (desktop only) ───────────────────────────────────────────── */}
      <footer className="hidden md:flex bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-3 items-center justify-between text-xs text-slate-400 dark:text-slate-500 shrink-0">
        <span>Datos: DANE · Censo 2018 y proyecciones PPED 2018–2050</span>
        <span>
          Desarrollado por{" "}
          <a href="https://github.com/andresgobl98" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Andrés González
          </a>
          {" · "}
          <a href="https://github.com/andresgobl98/colombia-demographics" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Ver repositorio
          </a>
        </span>
      </footer>

    </div>
  );
}
