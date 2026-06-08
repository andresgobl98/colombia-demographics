import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { METRICS } from "./data/metrics";
import demographicsData from "./data/demographics.json";
import { Analytics } from "@vercel/analytics/react"

const { departments, national } = demographicsData;

export default function App() {
  const [selectedMetricId, setSelectedMetricId] = useState(METRICS[0].id);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);

  const metric       = METRICS.find((m) => m.id === selectedMetricId);
  const selectedDept = selectedDeptCode ? departments[selectedDeptCode] : null;

  const state = {
    metrics: METRICS,
    metric,
    selectedDeptCode,
    selectedDept,
    departments,
    national,
  };

  const actions = {
    setSelectedMetricId,
    setSelectedDeptCode,
  };

  return (
    <>
      <Analytics />
      <Dashboard state={state} actions={actions} />
    </>
  );
}
