import { useState, useMemo } from "react";
import Dashboard from "./pages/Dashboard";
import { METRICS } from "./data/metrics";
import { getDepartments, getNational, BASE_YEAR, YEARS } from "./data/selectors";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(BASE_YEAR);

  // Rebuild the year's view only when the year changes.
  const departments = useMemo(() => getDepartments(selectedYear), [selectedYear]);
  const national    = useMemo(() => getNational(selectedYear), [selectedYear]);

  const metric       = METRICS.find((m) => m.id === selectedMetricId);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  const state = {
    metrics: METRICS,
    metric,
    selectedDeptCode,
    selectedDept,
    selectedYear,
    years: YEARS,
    departments,
    national,
  };

  const actions = {
    setSelectedMetricId,
    setSelectedDeptCode,
    setSelectedYear,
  };

  return (
    <>
      <Analytics />
      <Dashboard state={state} actions={actions} />
    </>
  );
}
