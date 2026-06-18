import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AppLayout from "./layouts/AppLayout";
import DemographicsPage from "./pages/DemographicsPage";
import GovernmentPage from "./pages/GovernmentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/datos" replace />} />
          <Route path="/datos" element={<DemographicsPage />} />
          <Route path="/gobierno" element={<Navigate to="/gobierno/legislativo" replace />} />
          <Route path="/gobierno/:branch" element={<GovernmentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
