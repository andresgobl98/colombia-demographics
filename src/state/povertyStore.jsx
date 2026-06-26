import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { POVERTY_METRICS } from "../data/povertyMetrics";
import { getPovertyDepartments, getPovertyNational } from "../data/povertySelectors";

/**
 * Global state for the poverty & living-standards view. Mirrors the demographics
 * store's selection shape ({ departments, metric, selectedDeptCode, selectDepartment })
 * so the shared ColombiaMap / TopicRanking work unchanged — but there is no year
 * axis here (poverty.json is a single latest-year snapshot), so no year state.
 */
const PovertyContext = createContext(null);

// Department/national values are static (one snapshot), so derive them once.
const DEPARTMENTS = getPovertyDepartments();
const NATIONAL = getPovertyNational();

export function PovertyProvider({ children }) {
  const [selectedMetricId, setSelectedMetricId] = useState(POVERTY_METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  // Which tab the explorer companion shows. Lives here (not local to the
  // companion) so selecting a department on the map can flip it to "detalle"
  // without an effect — the same "open detail on select" role panelOpen played.
  const [companionTab, setCompanionTab] = useState("ranking");

  const metric = useMemo(
    () => POVERTY_METRICS.find((m) => m.id === selectedMetricId) ?? POVERTY_METRICS[0],
    [selectedMetricId]
  );
  const selectedDept = selectedDeptCode ? DEPARTMENTS[selectedDeptCode] : null;

  const selectDepartment = useCallback((code) => {
    setSelectedDeptCode(code);
    if (code) setCompanionTab("detalle");
  }, []);

  const value = useMemo(
    () => ({
      selectedMetricId,
      setSelectedMetricId,
      selectedDeptCode,
      companionTab,
      setCompanionTab,
      metric,
      departments: DEPARTMENTS,
      national: NATIONAL,
      selectedDept,
      selectDepartment,
    }),
    [selectedMetricId, selectedDeptCode, companionTab, metric, selectedDept, selectDepartment]
  );

  return <PovertyContext.Provider value={value}>{children}</PovertyContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePoverty() {
  const ctx = useContext(PovertyContext);
  if (!ctx) throw new Error("usePoverty must be used within a PovertyProvider");
  return ctx;
}
