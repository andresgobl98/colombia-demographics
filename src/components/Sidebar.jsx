import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  ScaleIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "./ui";

const ic = "w-5 h-5 shrink-0";

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
      { to: "/gobierno/legislativo", label: "Legislativo", icon: BuildingLibraryIcon },
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
            <XMarkIcon className="w-5 h-5" />
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
          <HomeIcon className={ic} />
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
                  <Icon className={ic} />
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
          <InformationCircleIcon className="w-5 h-5" />
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
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
