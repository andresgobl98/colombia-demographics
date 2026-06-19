import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ThemeToggle } from "../components/ui";
import AboutModal from "../components/AboutModal";

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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
