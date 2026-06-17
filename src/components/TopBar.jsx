import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ui";

function navClass({ isActive }) {
  return [
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
  ].join(" ");
}

export default function TopBar({ onAbout }) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 py-3 flex items-center justify-between gap-3 shadow-sm shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none truncate">
          CO Demográfica
        </h1>
      </div>

      {/* Section navigation */}
      <nav className="flex items-center gap-1">
        <NavLink to="/" end className={navClass}>Datos</NavLink>
        <NavLink to="/gobierno" className={navClass}>Gobierno</NavLink>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={onAbout}
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
  );
}
