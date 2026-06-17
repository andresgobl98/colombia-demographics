import { useState, useMemo } from "react";
import ColombiaMap from "../components/ColombiaMap";
import RegionPanel from "../components/RegionPanel";
import MetricSelector from "../components/MetricSelector";
import TopicRanking from "../components/TopicRanking";
import TimelineSlider from "../components/TimelineSlider";
import { METRICS } from "../data/metrics";
import { getDepartments, getNational, DEFAULT_YEAR, YEARS } from "../data/selectors";

export default function DemographicsPage() {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [panelOpen, setPanelOpen] = useState(false); // mobile detail panel

  const departments = useMemo(() => getDepartments(selectedYear), [selectedYear]);
  const national = useMemo(() => getNational(selectedYear), [selectedYear]);
  const metric = METRICS.find((m) => m.id === selectedMetricId);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  const handleMobileSelect = (code) => {
    setSelectedDeptCode(code);
    if (code) setPanelOpen(true);
  };

  const slider = (
    <TimelineSlider years={YEARS} value={selectedYear} onChange={setSelectedYear} />
  );

  const metricControl = (
    <div className="flex justify-end shrink-0">
      <MetricSelector metrics={METRICS} selected={metric.id} onChange={setSelectedMetricId} />
    </div>
  );

  const timelineOverlay = (
    <div className="absolute top-3 inset-x-0 z-30 flex justify-center px-3 pointer-events-none">
      <div className="w-full max-w-[360px]">{slider}</div>
    </div>
  );

  return (
    <>
      {/* ── Desktop layout (md+) ────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          {metricControl}
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
          <RegionPanel department={selectedDept} national={national} code={selectedDeptCode} year={selectedYear} />
        </aside>
      </div>

      {/* ── Mobile layout (<md) ─────────────────────────────────────────────── */}
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {metricControl}
        <div className="shrink-0">{slider}</div>
        <div className="relative h-[55vh] min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
          <ColombiaMap
            data={departments}
            metric={metric}
            selectedId={selectedDeptCode}
            onSelect={handleMobileSelect}
          />
        </div>
        <button
          onClick={() => { setSelectedDeptCode(null); setPanelOpen(true); }}
          className="shrink-0 flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ver más
          </span>
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <TopicRanking data={departments} metric={metric} />
      </div>

      {/* ── Mobile slide-in panel ───────────────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-slate-900 overflow-y-auto transition-transform duration-300 ease-out ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {panelOpen && (
          <RegionPanel
            department={selectedDept}
            national={national}
            code={selectedDeptCode}
            year={selectedYear}
            onBack={() => { setPanelOpen(false); setSelectedDeptCode(null); }}
            yearControl={slider}
          />
        )}
      </div>
    </>
  );
}
