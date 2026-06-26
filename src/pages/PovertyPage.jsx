import { ColombiaMap } from "../components/maps";
import { ScatterChart, LollipopChart } from "../components/charts";
import {
  PovertyControlBar,
  NationalSummaryBand,
  ExplorerCompanion,
  ServicesSection,
} from "../components/poverty";
import { Section, Copy, CoveragePill } from "../components/ui";
import { getPovertyMetric } from "../data/povertyMetrics";
import { usePoverty } from "../state/povertyStore";

// The two faces of poverty compared in the scatter section (static descriptors).
const INCOME_METRIC = getPovertyMetric("pobreza_monetaria");
const IPM_METRIC = getPovertyMetric("ipm");
const GINI_METRIC = getPovertyMetric("gini");

export default function PovertyPage() {
  const { departments, national, metric, selectedDeptCode, selectDepartment } = usePoverty();

  // GEIH income data (monetary poverty + Gini) only covers some departments, so
  // the scatter and Gini views drop the rest — flag that in their headers.
  const allDepts = Object.values(departments);
  const incomeCovered = allDepts.filter((d) => d.pobreza_monetaria != null && d.ipm != null).length;
  const giniCovered = allDepts.filter((d) => d.gini != null).length;

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
      <div className="max-w-6xl mx-auto flex flex-col gap-10 p-4 md:p-6">
        {/* 1 · National panorama ─────────────────────────────────────────────── */}
        <Section
          eyebrow="Panorama nacional"
          title="Pobreza y condiciones de vida"
          description="Una mirada por departamento a los ingresos, las privaciones y el acceso a servicios en Colombia, con datos del DANE, la SSPD y el MinTIC vía DNP TerriData."
        >
          <NationalSummaryBand national={national} />
        </Section>

        {/* 2 · Map explorer ──────────────────────────────────────────────────── */}
        <Section
          eyebrow="Explorador"
          title="El mapa por departamento"
          description="Elige un nivel de pobreza para colorear el mapa y haz clic en un departamento para ver su detalle."
        >
          <PovertyControlBar />

          {/* Desktop: map + tabbed companion side by side */}
          <div className="hidden md:flex gap-4 h-[64vh] min-h-[460px]">
            <div className="relative flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {map}
            </div>
            <div className="w-80 shrink-0">
              <ExplorerCompanion />
            </div>
          </div>

          {/* Mobile: map stacked above the tabbed companion */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="relative h-[55vh] min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {map}
            </div>
            <div className="h-[65vh]">
              <ExplorerCompanion />
            </div>
          </div>
        </Section>

        {/* 3 · Income vs. deprivation scatter ─────────────────────────────────── */}
        <Section
          eyebrow="Comparar"
          title="¿Pobreza de ingresos o de condiciones?"
          description="Un departamento puede ser pobre por falta de dinero, por falta de condiciones de vida (educación, salud, servicios) o por ambas. No siempre coinciden."
          headerRight={
            <CoveragePill
              covered={incomeCovered}
              note="La GEIH mide ingresos solo en estos departamentos; los demás no aparecen en este gráfico."
            />
          }
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-4">
            <div className="w-full max-w-2xl mx-auto">
              <ScatterChart
                departments={departments}
                xMetric={INCOME_METRIC}
                yMetric={IPM_METRIC}
                selectedCode={selectedDeptCode}
                onSelect={selectDepartment}
              />
            </div>
            <Copy as="p" variant="annotation" className="leading-snug max-w-2xl mx-auto text-center">
              Cada punto es un departamento. Hacia la derecha hay más pobreza por ingresos; hacia
              arriba, más pobreza por carencias. Arriba a la derecha están los pobres por ambas;
              abajo a la derecha, los que tienen ingresos bajos pero mejores condiciones de vida.
              Toca un punto para ver su detalle.
            </Copy>
          </div>
        </Section>

        {/* 4 · Living conditions: housing & services ─────────────────────────── */}
        <Section
          eyebrow="Condiciones de vida"
          title="Agua, saneamiento e internet"
          description="El alcantarillado casi siempre va por detrás del acueducto: esa brecha es el principal reto de saneamiento. El internet fijo y la calidad de la vivienda completan el panorama."
        >
          <ServicesSection />
        </Section>

        {/* 5 · Inequality (Gini) ─────────────────────────────────────────────── */}
        <Section
          eyebrow="Desigualdad"
          title="Qué tan desigual es el ingreso"
          description="El coeficiente de Gini mide cómo se reparte el ingreso: 0 si todos ganaran lo mismo, 1 si una sola persona lo concentrara todo. Del más al menos desigual."
          headerRight={
            <CoveragePill
              covered={giniCovered}
              note="El Gini se calcula con la GEIH, disponible solo en estos departamentos."
            />
          }
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-3">
            <LollipopChart
              departments={departments}
              metric={GINI_METRIC}
              color="bg-violet-500"
              selectedCode={selectedDeptCode}
              onSelect={selectDepartment}
            />
            <Copy as="p" variant="annotation" className="leading-snug">
              Más a la derecha, mayor desigualdad. Toca un departamento para ver su detalle.
            </Copy>
          </div>
        </Section>
      </div>
    </div>
  );
}
