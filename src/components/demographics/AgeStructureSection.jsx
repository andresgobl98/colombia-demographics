import { useState, useEffect } from "react";
import { PopulationPyramid } from "../charts";
import { Copy } from "../ui";
import { getAgePyramid } from "../../data/selectors";
import { useDemographics } from "../../state/demographicsStore";

/**
 * Full-width age-by-sex pyramid for the selected department (or the national
 * aggregate). Follows the same selection as the map, and the same year as the
 * sticky control. The pyramid data (age.json) is code-split and fetched on first
 * use, then cached, so year-scrubbing animates instead of flashing a loader.
 */
export default function AgeStructureSection() {
  const { selectedDept, selectedDeptCode: code, selectedYear: year } = useDemographics();
  const name = selectedDept ? selectedDept.name : "Colombia";

  const [pyramid, setPyramid] = useState(null);
  useEffect(() => {
    let active = true;
    getAgePyramid(code ?? null, year).then((p) => {
      if (active) setPyramid(p);
    });
    return () => {
      active = false;
    };
  }, [code, year]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col gap-3">
      <Copy as="p" variant="detail" className="font-semibold">
        Pirámide de {name} · {year}
      </Copy>
      {pyramid ? (
        <div className="max-w-3xl w-full mx-auto">
          <PopulationPyramid
            ageGroups={pyramid.ageGroups}
            male={pyramid.male}
            female={pyramid.female}
          />
        </div>
      ) : (
        <Copy as="p" variant="annotation">Cargando…</Copy>
      )}
      <Copy as="p" variant="annotation" className="leading-snug">
        Cada barra es un grupo de edad: hombres a la izquierda, mujeres a la derecha. Una base ancha
        indica una población joven; una cima más poblada, una población que envejece. Mueve el año
        para ver cómo cambia la estructura. Toca un departamento en el mapa para ver el suyo.
      </Copy>
    </div>
  );
}
