import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { sourcesForPath } from "../data/sources";

/**
 * Floating, route-aware data-sources control. Renders a small icon button in the
 * bottom-right of the content area; clicking it opens a popover that lists the
 * sources behind the current page. Hides itself on pages that declare none.
 */
export default function DataSources() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const sources = sourcesForPath(pathname);

  // Collapse the popover when navigating to another page.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape or click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!sources) return null;

  return (
    <div ref={rootRef} className="absolute bottom-4 right-4 z-30">
      {open && (
        <div
          role="dialog"
          aria-label="Fuentes de datos"
          className="absolute bottom-12 right-0 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
            Fuentes de datos
          </h3>
          <ul className="space-y-2.5">
            {sources.map((s) => (
              <li key={s.label} className="text-sm leading-snug">
                <p className="font-medium text-slate-700 dark:text-slate-200">{s.label}</p>
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {s.detail}
                  </a>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">{s.detail}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Fuentes de datos"
        aria-expanded={open}
        title="Fuentes de datos"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <ellipse cx="12" cy="6" rx="7.5" ry="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
        </svg>
      </button>
    </div>
  );
}
