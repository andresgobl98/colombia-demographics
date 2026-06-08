import { useState, useEffect } from "react";
import ColombiaMap from "./components/ColombiaMap";
import RegionPanel from "./components/RegionPanel";
import MetricSelector from "./components/MetricSelector";
import TopicRanking from "./components/TopicRanking";
import { METRICS } from "./data/metrics";
import demographicsData from "./data/demographics.json";

const { departments, national } = demographicsData;

// ── Icons ─────────────────────────────────────────────────────────────────────

function MapIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-blue-600" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function StatsIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-blue-600" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  const [activeTab, setActiveTab] = useState("mapa");
  const [toast, setToast] = useState(false);

  const metric       = METRICS.find((m) => m.id === selectedMetricId);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  // When a department is selected on the map tab, nudge the user toward stats
  const handleSelect = (code) => {
    setSelectedDeptCode(code);
    if (code && activeTab === "mapa") {
      setToast(true);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="flex flex-col h-svh bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-none">Colombia en Datos</h1>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">CNPV 2018 · Explorador departamental</p>
          </div>
        </div>
        {/* Metric selector — always visible but compact on mobile */}
        <MetricSelector
          metrics={METRICS}
          selected={selectedMetricId}
          onChange={setSelectedMetricId}
        />
      </header>

      {/* ── Desktop layout (md+) ────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
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
        <aside className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <RegionPanel department={selectedDept} national={national} />
        </aside>
      </div>

      {/* ── Mobile layout (<md) ─────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-1 overflow-hidden flex-col">

        {/* Mapa tab */}
        {activeTab === "mapa" && (
          <div className="flex-1 overflow-hidden">
            <ColombiaMap
              data={departments}
              metric={metric}
              selectedId={selectedDeptCode}
              onSelect={handleSelect}
            />
          </div>
        )}

        {/* Estadísticas tab */}
        {activeTab === "estadisticas" && (
          <div className="flex-1 overflow-y-auto">
            <RegionPanel department={selectedDept} national={national} />
            <div className="px-4 pb-4">
              <TopicRanking data={departments} metric={metric} />
            </div>
          </div>
        )}
      </div>

      {/* ── Toast (mobile only) ─────────────────────────────────────────────── */}
      {toast && (
        <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => { setActiveTab("estadisticas"); setToast(false); }}
            className="flex items-center gap-2 bg-slate-800 text-white text-sm rounded-full px-4 py-2.5 shadow-lg"
          >
            <span>{selectedDept?.name} seleccionado</span>
            <span className="text-blue-300 font-medium">Ver estadísticas →</span>
          </button>
        </div>
      )}

      {/* ── Bottom nav (mobile only) ────────────────────────────────────────── */}
      <nav className="md:hidden bg-white border-t border-slate-200 flex shrink-0">
        <button
          onClick={() => setActiveTab("mapa")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${activeTab === "mapa" ? "text-blue-600" : "text-slate-400"}`}
        >
          <MapIcon active={activeTab === "mapa"} />
          Mapa
        </button>
        <button
          onClick={() => setActiveTab("estadisticas")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${activeTab === "estadisticas" ? "text-blue-600" : "text-slate-400"}`}
        >
          <StatsIcon active={activeTab === "estadisticas"} />
          Estadísticas
          {selectedDept && (
            <span className="absolute mt-0 w-2 h-2 bg-blue-500 rounded-full translate-x-4 -translate-y-5" />
          )}
        </button>
      </nav>

      {/* ── Footer (desktop only) ───────────────────────────────────────────── */}
      <footer className="hidden md:flex bg-white border-t border-slate-200 px-6 py-3 items-center justify-between text-xs text-slate-400 shrink-0">
        <span>Datos: DANE · CNPV 2018</span>
        <span>
          Desarrollado por{" "}
          <a href="https://github.com/andresgobl98" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
            Andrés González
          </a>
          {" · "}
          <a href="https://github.com/andresgobl98/colombia-demographics" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
            Ver repositorio
          </a>
        </span>
      </footer>

    </div>
  );
}
