import { Link } from "react-router-dom";
import { SOURCE_GROUPS } from "../data/sources";

/* ── Section icons (match the sidebar's stroke style) ──────────────────────── */
const ic = "w-6 h-6";

function UsersIcon() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
function BankIcon() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 5.694v-.293c0-.625-.292-1.198-.764-1.567M3 14.15a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  );
}

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
    icon: BankIcon,
  },
  {
    title: "Ejecutivo",
    desc: "Presidencia, ministerios y la rama ejecutiva del Estado colombiano.",
    icon: BriefcaseIcon,
    soon: true,
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
          <Icon />
        </span>
        {section.soon ? (
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 rounded-full px-2 py-0.5">
            Próximamente
          </span>
        ) : (
          <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
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
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
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
