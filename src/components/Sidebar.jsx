import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ui";

/* ── Icons (heroicons-style, stroke-based to match the rest of the app) ────── */
const ic = "w-5 h-5 shrink-0";

function HomeIcon({ className = ic }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L22.5 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}
function UsersIcon({ className = ic }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
function BankIcon({ className = ic }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}
function BriefcaseIcon({ className = ic }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 5.694v-.293c0-.625-.292-1.198-.764-1.567M3 14.15a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}
function ScaleIcon({ className = ic }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  );
}

/**
 * Navigation tree. Datos fans out into topics (only Población exists today; more
 * are placeholders for the topic-first structure). Gobierno's branches live here
 * too — folded straight into the sidebar instead of a separate tab strip.
 */
const SECTIONS = [
  {
    label: "Datos",
    items: [{ to: "/datos/poblacion", label: "Población", icon: UsersIcon }],
  },
  {
    label: "Gobierno",
    items: [
      { to: "/gobierno/legislativo", label: "Legislativo", icon: BankIcon },
      { to: "/gobierno/ejecutivo", label: "Ejecutivo", icon: BriefcaseIcon },
      { to: "/gobierno/judicial", label: "Judicial", icon: ScaleIcon },
    ],
  },
];

function navItemClass(collapsed) {
  return ({ isActive }) =>
    [
      "flex items-center rounded-lg text-sm font-medium transition-colors",
      collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2",
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
    ].join(" ");
}

const iconBtn =
  "w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0";

/**
 * The app's primary navigation. Renders as a collapsible rail on desktop and,
 * with `mobile`, as the contents of the slide-over drawer (always expanded).
 *
 * - `collapsed`        icon-only rail (desktop)
 * - `onToggleCollapse` desktop collapse/expand control (omit to hide it)
 * - `onNavigate`       called on item click — used by the drawer to close itself
 * - `onClose`          mobile drawer close (renders an X in the header)
 */
export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onAbout,
  onNavigate,
  onClose,
  mobile = false,
}) {
  return (
    <nav className="flex flex-col h-full w-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Brand */}
      <div
        className={`flex items-center h-14 shrink-0 border-b border-slate-100 dark:border-slate-700 ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          {!collapsed && (
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none truncate">
              CO Demográfica
            </h1>
          )}
        </div>
        {mobile && onClose && (
          <button onClick={onClose} aria-label="Cerrar menú" className={iconBtn}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav tree */}
      <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col">
        <NavLink
          to="/"
          end
          onClick={onNavigate}
          title={collapsed ? "Inicio" : undefined}
          className={navItemClass(collapsed)}
        >
          <HomeIcon />
          {!collapsed && <span className="truncate">Inicio</span>}
        </NavLink>
        {SECTIONS.map((section, i) => (
          <div key={section.label} className="flex flex-col gap-1">
            {collapsed
              ? i > 0 && <div className="h-px bg-slate-100 dark:bg-slate-700 my-2 mx-1" />
              : (
                <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {section.label}
                </p>
              )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={navItemClass(collapsed)}
                >
                  <Icon />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div
        className={`shrink-0 border-t border-slate-100 dark:border-slate-700 p-2 flex gap-2 ${
          collapsed ? "flex-col items-center" : "items-center"
        }`}
      >
        <button onClick={onAbout} aria-label="Acerca de" title="Acerca de" className={iconBtn}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
          </svg>
        </button>
        <ThemeToggle />
        <a
          href="https://github.com/andresgobl98/colombia-demographics"
          target="_blank"
          rel="noreferrer"
          aria-label="Ver repositorio en GitHub"
          title="Ver repositorio en GitHub"
          className={iconBtn}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            title={collapsed ? "Expandir" : "Contraer"}
            className={`${iconBtn} ${collapsed ? "" : "ml-auto"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
