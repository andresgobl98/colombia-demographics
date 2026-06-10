import { useState } from "react";
import ColombiaMap from "../components/ColombiaMap";
import RegionPanel from "../components/RegionPanel";
import MetricSelector from "../components/MetricSelector";
import TopicRanking from "../components/TopicRanking";
import TimelineSlider from "../components/TimelineSlider";
import AboutModal from "../components/AboutModal";
import { ThemeToggle } from "../components/ui";

export default function Dashboard({ state, actions }) {
  const { metric, metrics, selectedDept, selectedDeptCode, national, departments, years, selectedYear } = state;
  const { setSelectedMetricId, setSelectedDeptCode, setSelectedYear } = actions;

  const [aboutOpen, setAboutOpen] = useState(false);

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
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none">CO Demográfica</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">DANE · Censo 2018 y proyecciones 2018–2050</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MetricSelector
            metrics={metrics}
            selected={metric.id}
            onChange={setSelectedMetricId}
          />
          <button
            onClick={() => setAboutOpen(true)}
            aria-label="Acerca de"
            title="Acerca de"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
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
        <span>
          Datos: DANE · Censo 2018 y proyecciones PPED 2018–2050
          {" · "}
          <button
            onClick={() => setAboutOpen(true)}
            className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Acerca de
          </button>
        </span>
        <span className="flex items-center gap-1.5">
          Desarrollado por{" "}
          <a href="https://github.com/andresgobl98" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Andrés González
          </a>
          <a
            href="https://github.com/andresgobl98/colombia-demographics"
            target="_blank"
            rel="noreferrer"
            aria-label="Ver repositorio en GitHub"
            title="Ver repositorio en GitHub"
            className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </span>
      </footer>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
