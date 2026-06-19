import { Link } from "react-router-dom";
import {
  UsersIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  ScaleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { SOURCE_GROUPS } from "../data/sources";

const ic = "w-6 h-6";

const SECTIONS = [
  {
    to: "/datos/poblacion",
    title: "Población",
    desc: "Población total, distribución por sexo y autorreconocimiento étnico de los 33 departamentos, con una línea de tiempo de 2018 a 2050.",
    icon: UsersIcon,
  },
  {
    to: "/gobierno/legislativo",
    title: "Legislativo",
    desc: "Cámara y Senado: composición por partido, curules y el directorio completo de representantes y senadores en ejercicio.",
    icon: BuildingLibraryIcon,
  },
  {
    to: "/gobierno/ejecutivo",
    title: "Ejecutivo",
    desc: "Presidencia, ministerios y la rama ejecutiva del Estado colombiano.",
    icon: BriefcaseIcon,
  },
  {
    title: "Judicial",
    desc: "Altas cortes y la organización de la rama judicial.",
    icon: ScaleIcon,
    soon: true,
  },
];

function SectionCard({ section }) {
  const Icon = section.icon;
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Icon className={ic} />
        </span>
        {section.soon ? (
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 rounded-full px-2 py-0.5">
            Próximamente
          </span>
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-100">{section.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-snug">{section.desc}</p>
    </>
  );

  const base =
    "block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5";

  if (section.soon) {
    return <div className={`${base} opacity-60`}>{inner}</div>;
  }
  return (
    <Link
      to={section.to}
      className={`group ${base} shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/50 transition`}
    >
      {inner}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
        {/* Hero */}
        <header className="max-w-2xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-full px-3 py-1">
            Gratuito · Datos abiertos
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
            Colombia, en datos que cualquiera puede explorar
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-200">CO Demográfica</strong> reúne la
            demografía y la estructura del Estado colombiano en mapas y visualizaciones interactivas,
            departamento por departamento. Una herramienta gratuita, construida sobre datos públicos
            de fuentes oficiales.
          </p>
        </header>

        {/* Section cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <SectionCard key={s.title} section={s} />
          ))}
        </div>

        {/* Sources / credibility */}
        <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Fuentes oficiales
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cada cifra proviene de una fuente pública y verificable. Hoy trabajamos con varias, y
            seguimos sumando:
          </p>
          <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {SOURCE_GROUPS.map((group) => (
              <div key={group.prefix}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
                  {group.label}
                </p>
                <ul className="space-y-1.5">
                  {group.sources.map((s) => (
                    <li key={s.label} className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                      {s.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
