import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ThemeToggle } from "../components/ui";
import AboutModal from "../components/AboutModal";
import DataSources from "../components/DataSources";

const COLLAPSE_KEY = "sidebar-collapsed";

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function AppLayout() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes (covers browser back/
  // forward, not just in-drawer clicks). Syncing UI to the URL is a valid
  // effect; the lint rule is overly strict for this case.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDrawerOpen(false), [location.pathname]);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        // ignore storage failures (private mode, etc.)
      }
      return next;
    });
  };

  return (
    <div className="flex h-svh bg-slate-50 dark:bg-slate-900">
      {/* Desktop sidebar (collapsible rail) */}
      <div
        className={`hidden md:block shrink-0 transition-[width] duration-200 ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
          onAbout={() => setAboutOpen(true)}
        />
      </div>

      {/* Content column */}
      <div className="relative flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between gap-3 shadow-sm shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none truncate">
              CO Demográfica
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </main>

        <DataSources />
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden fixed inset-0 z-40 ${drawerOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-slate-900/60 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-64 transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            mobile
            onClose={() => setDrawerOpen(false)}
            onNavigate={() => setDrawerOpen(false)}
            onAbout={() => {
              setDrawerOpen(false);
              setAboutOpen(true);
            }}
          />
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
