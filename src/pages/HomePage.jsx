import { Link } from "react-router-dom";
import {
  UsersIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  ScaleIcon,
  ChevronRightIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { SOURCE_GROUPS } from "../data/sources";
import { Copy } from "../components/ui";

const ic = "w-6 h-6";

// Quick links grouped by section. Each group renders under its own label.
const GROUPS = [
  {
    id: "datos",
    label: "Datos",
    sections: [
      {
        to: "/datos/poblacion",
        title: "Población",
        desc: "Población total, distribución por sexo y autorreconocimiento étnico de los 33 departamentos, con una línea de tiempo de 2018 a 2050.",
        icon: UsersIcon,
      },
      {
        to: "/datos/pobreza",
        title: "Pobreza y calidad de vida",
        desc: "Pobreza monetaria, pobreza multidimensional y calidad de vida en los 33 departamentos.",
        icon: BanknotesIcon,
      },
    ],
  },
  {
    id: "gobierno",
    label: "Gobierno",
    sections: [
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
        to: "/gobierno/judicial",
        title: "Judicial",
        desc: "Altas cortes, Fiscalía y los organismos que administran justicia en Colombia.",
        icon: ScaleIcon,
      },
    ],
  },
];

function SectionCard({ section }) {
  const Icon = section.icon;
  const inner = (
    <>
      {/* Icon (left) + the affordance (right), aligned on the top row. A labeled
          "Explorar" CTA + accent chevron reads as interactive far better than the
          old faint corner chevron (which also failed the actionable-icon contrast
          bar). `items-center` keeps the CTA vertically centered on the icon. */}
      <div className="flex items-center justify-between">
        <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Icon className={ic} />
        </span>
        {section.soon ? (
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 rounded-full px-2 py-0.5">
            Próximamente
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
            Explorar
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        )}
      </div>
      <Copy as="h3" variant="title" className="mt-4 text-lg">{section.title}</Copy>
      <Copy as="p" variant="annotation" className="mt-1 leading-snug">{section.desc}</Copy>
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
          <Copy as="h1" variant="title" className="mt-4 text-3xl md:text-4xl leading-tight">
            Colombia, en datos que cualquiera puede explorar
          </Copy>
          {/* prose (slate-600) — slate-500 failed AA on the slate-100 page bg. */}
          <Copy as="p" variant="prose" className="mt-4 text-base md:text-lg">
            <strong className="font-semibold text-slate-700 dark:text-slate-200">CO Demográfica</strong> reúne la
            demografía y la estructura del Estado colombiano en mapas y visualizaciones interactivas,
            departamento por departamento. Una herramienta gratuita, construida sobre datos públicos
            de fuentes oficiales.
          </Copy>
        </header>

        {/* Section cards, grouped by category */}
        <div className="mt-10 space-y-8">
          {GROUPS.map((group) => (
            <section key={group.id}>
              <Copy as="h2" variant="eyebrow" className="mb-3">
                {group.label}
              </Copy>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.sections.map((s) => (
                  <SectionCard key={s.title} section={s} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Sources / credibility */}
        <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <Copy as="h2" variant="eyebrow">
            Fuentes oficiales
          </Copy>
          <Copy as="p" variant="detail" className="mt-2 leading-relaxed">
            Cada cifra proviene de una fuente pública y verificable. Hoy trabajamos con varias, y
            seguimos sumando:
          </Copy>
          <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {SOURCE_GROUPS.map((group) => (
              <div key={group.prefix}>
                <Copy as="p" variant="eyebrow" className="mb-1.5">
                  {group.label}
                </Copy>
                <ul className="space-y-1.5">
                  {group.sources.map((s) => (
                    <Copy as="li" key={s.label} variant="detail" className="leading-snug">
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
                    </Copy>
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
