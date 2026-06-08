import { useState } from "react";
import ColombiaMap from "./components/ColombiaMap";
import RegionPanel from "./components/RegionPanel";
import MetricSelector from "./components/MetricSelector";
import TopicRanking from "./components/TopicRanking";
import { METRICS } from "./data/metrics";
import demographicsData from "./data/demographics.json";

const { departments, national } = demographicsData;

export default function App() {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);

  const metric      = METRICS.find((m) => m.id === selectedMetricId);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-none">Colombia en Datos</h1>
            <p className="text-xs text-slate-400 mt-0.5">CNPV 2018 · Explorador departamental</p>
          </div>
        </div>
        <MetricSelector
          metrics={METRICS}
          selected={selectedMetricId}
          onChange={setSelectedMetricId}
        />
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map + ranking */}
        <main className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <ColombiaMap
              data={departments}
              metric={metric}
              selectedId={selectedDeptCode}
              onSelect={setSelectedDeptCode}
            />
          </div>
          <TopicRanking data={departments} metric={metric} />
        </main>

        {/* Side panel */}
        <aside className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <RegionPanel
            department={selectedDept}
            national={national}
          />
        </aside>
      </div>

      <footer className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
        <span>Datos: DANE · CNPV 2018</span>
        <span>
          Desarrollado por{" "}
          <a
            href="https://github.com/andresgobl98"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Andrés González
          </a>
          {" · "}
          <a
            href="https://github.com/andresgobl98/colombia-demographics"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Ver repositorio
          </a>
        </span>
      </footer>
    </div>
  );
}
