import { useEffect } from "react";
import { SOURCE_GROUPS } from "../data/sources";

export default function AboutModal({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="about-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          CO Demográfica
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">
          Mapa demográfico de Colombia por departamento
        </p>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Fuentes de datos</h3>
            <div className="space-y-3">
              {SOURCE_GROUPS.map((group) => (
                <div key={group.prefix}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                    {group.label}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {group.sources.map((s) => (
                      <li key={s.label}>
                        <strong className="font-medium text-slate-700 dark:text-slate-200">{s.label}</strong>:{" "}
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
                          s.detail
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Notas sobre los datos</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Las cifras de población corresponden a las proyecciones del DANE, que incorporan el
                ajuste por omisión censal; por eso difieren del conteo directo del censo.
              </li>
              <li>
                El DANE no publica proyección étnica, por lo que el desglose por etnia proviene del
                Censo 2018 y no varía entre años.
              </li>
              <li>
                San Andrés y Providencia se muestra en un recuadro aparte por estar a ~700 km de la
                costa continental.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Créditos y licencia</h3>
            <p>
              Desarrollado por{" "}
              <a
                href="https://github.com/andresgobl98"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Andrés González
              </a>
              . El{" "}
              <a
                href="https://github.com/andresgobl98/colombia-demographics"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                código
              </a>{" "}
              se comparte públicamente con fines de referencia. Los datos del DANE son de acceso
              libre y están sujetos a sus condiciones de uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
