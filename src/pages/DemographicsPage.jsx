import { ColombiaMap } from "../components/maps";
import MetricSelector from "../components/MetricSelector";
import {
  SummaryBand,
  YearBar,
  DemographicsCompanion,
  PopulationTrendSection,
  AgeStructureSection,
  EthnicitySection,
} from "../components/demographics";
import { Section, Copy } from "../components/ui";
import { useDemographics } from "../state/demographicsStore";

export default function DemographicsPage() {
  const { departments, national, metric, selectedDeptCode, selectDepartment } = useDemographics();

  const map = (
    <ColombiaMap
      departments={departments}
      metric={metric}
      selectedCode={selectedDeptCode}
      onSelect={selectDepartment}
    />
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 px-4 md:px-6 pb-6">
        {/* Sticky year control — drives every time-varying section below */}
        <YearBar />

        {/* 1 · National panorama ─────────────────────────────────────────────── */}
        <Section
          eyebrow="Panorama nacional"
          title="¿Cuántos somos y cómo estamos repartidos?"
          description="Las cifras de población de Colombia para el año seleccionado, con proyecciones del DANE basadas en el Censo 2018. Mueve el control de año para verlas cambiar."
        >
          <SummaryBand national={national} />
        </Section>

        {/* 2 · Map explorer ──────────────────────────────────────────────────── */}
        <Section
          eyebrow="Explorador"
          title="El mapa por departamento"
          description="Elige qué colorea el mapa y haz clic en un departamento para ver su detalle frente al resto del país."
          headerRight={<MetricSelector />}
        >
          {/* Desktop: map + tabbed companion side by side */}
          <div className="hidden md:flex gap-4 h-[64vh] min-h-[460px]">
            <div className="relative flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {map}
            </div>
            <div className="w-80 shrink-0">
              <DemographicsCompanion />
            </div>
          </div>

          {/* Mobile: map stacked above the tabbed companion */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="relative h-[55vh] min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {map}
            </div>
            <div className="h-[65vh]">
              <DemographicsCompanion />
            </div>
          </div>
        </Section>

        {/* 3 · Population trend ──────────────────────────────────────────────── */}
        <Section
          eyebrow="Tendencia"
          title="¿Cómo cambia la población en el tiempo?"
          description="La línea muestra la proyección completa entre 2018 y 2050. Sigue al departamento que elijas en el mapa; el punto activo sigue el año del control superior."
        >
          <PopulationTrendSection />
        </Section>

        {/* 4 · Age structure ─────────────────────────────────────────────────── */}
        <Section
          eyebrow="Estructura por edad"
          title="¿Una población joven o que envejece?"
          description="La pirámide reparte a la población por edad y sexo. Sigue al departamento que elijas en el mapa y al año del control superior."
        >
          <AgeStructureSection />
        </Section>

        {/* 5 · Ethnic self-recognition ───────────────────────────────────────── */}
        <Section
          eyebrow="Diversidad"
          title="Quiénes se reconocen en cada grupo étnico"
          description="La composición étnica que las personas declararon en el Censo 2018. Es un retrato puntual, no una proyección, por lo que no cambia al mover el año."
        >
          <EthnicitySection />
        </Section>

        <Copy as="p" variant="annotation" className="text-center">
          Fuentes: DANE —{" "}
          <a
            href="https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Proyecciones de población (PPED)
          </a>{" "}
          y{" "}
          <a
            href="https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/censo-nacional-de-poblacion-y-vivenda-2018"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Censo Nacional de Población y Vivienda 2018
          </a>
          .
        </Copy>
      </div>
    </div>
  );
}
