import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { METRICS } from "../data/metrics";
import { getDepartments, getNational, DEFAULT_YEAR } from "../data/selectors";

/**
 * Global state for the demographics view. Holds the shared selection (metric,
 * year, department) plus the derived data slices, so components read what they
 * need via `useDemographics()` instead of receiving it through prop chains.
 */
const DemographicsContext = createContext(null);

export function DemographicsProvider({ children }) {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false); // mobile detail panel

  const metric = useMemo(
    () => METRICS.find((m) => m.id === selectedMetricId) ?? METRICS[0],
    [selectedMetricId]
  );
  const departments = useMemo(() => getDepartments(selectedYear), [selectedYear]);
  const national = useMemo(() => getNational(selectedYear), [selectedYear]);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  // Select a department from the map. On mobile this also surfaces the detail
  // panel; on desktop the panel isn't rendered, so opening it is a no-op.
  const selectDepartment = useCallback((code) => {
    setSelectedDeptCode(code);
    if (code) setPanelOpen(true);
  }, []);

  // Mobile "Ver más" → national detail in the slide-in panel.
  const openNationalPanel = useCallback(() => {
    setSelectedDeptCode(null);
    setPanelOpen(true);
  }, []);

  // Mobile "Volver al mapa" → close the panel and clear the selection.
  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setSelectedDeptCode(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedMetricId,
      setSelectedMetricId,
      selectedYear,
      setSelectedYear,
      selectedDeptCode,
      panelOpen,
      metric,
      departments,
      national,
      selectedDept,
      selectDepartment,
      openNationalPanel,
      closePanel,
    }),
    [
      selectedMetricId,
      selectedYear,
      selectedDeptCode,
      panelOpen,
      metric,
      departments,
      national,
      selectedDept,
      selectDepartment,
      openNationalPanel,
      closePanel,
    ]
  );

  return <DemographicsContext.Provider value={value}>{children}</DemographicsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemographics() {
  const ctx = useContext(DemographicsContext);
  if (!ctx) throw new Error("useDemographics must be used within a DemographicsProvider");
  return ctx;
}
