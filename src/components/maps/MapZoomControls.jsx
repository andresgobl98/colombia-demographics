import { PlusIcon, MinusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

// Shared zoom UI for the department maps: a stacked +/- control, plus an
// optional "Centrar mapa" reset that only appears when the view has moved off
// its default. Pinned bottom-right so it clears the bottom-left legend.

const stepBtn =
  "w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-700 " +
  "text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors";

export default function MapZoomControls({ onZoomIn, onZoomOut, onReset, showReset }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 z-20">
      {showReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg px-3 py-1.5 shadow-md text-xs font-medium text-slate-700 dark:text-slate-100 transition-colors"
        >
          <ArrowPathIcon className="w-3.5 h-3.5" />
          Centrar mapa
        </button>
      )}
      <div className="flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 shadow-md divide-y divide-slate-200 dark:divide-slate-600">
        <button onClick={onZoomIn} aria-label="Acercar" title="Acercar" className={stepBtn}>
          <PlusIcon className="w-4 h-4" />
        </button>
        <button onClick={onZoomOut} aria-label="Alejar" title="Alejar" className={stepBtn}>
          <MinusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
