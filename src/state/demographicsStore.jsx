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
  // Which face the map's companion shows: the cross-department ranking or the
  // selected territory's detail. Picking a department flips it to "detalle".
  const [companionTab, setCompanionTab] = useState("ranking");

  const metric = useMemo(
    () => METRICS.find((m) => m.id === selectedMetricId) ?? METRICS[0],
    [selectedMetricId]
  );
  const departments = useMemo(() => getDepartments(selectedYear), [selectedYear]);
  const national = useMemo(() => getNational(selectedYear), [selectedYear]);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  // Select a department (or clear with null). Selecting one surfaces its detail
  // in the companion, mirroring the poverty explorer.
  const selectDepartment = useCallback((code) => {
    setSelectedDeptCode(code);
    if (code) setCompanionTab("detalle");
  }, []);

  const value = useMemo(
    () => ({
      selectedMetricId,
      setSelectedMetricId,
      selectedYear,
      setSelectedYear,
      selectedDeptCode,
      companionTab,
      setCompanionTab,
      metric,
      departments,
      national,
      selectedDept,
      selectDepartment,
    }),
    [
      selectedMetricId,
      selectedYear,
      selectedDeptCode,
      companionTab,
      metric,
      departments,
      national,
      selectedDept,
      selectDepartment,
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
