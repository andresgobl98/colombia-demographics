import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import DemographicsPage from "./pages/DemographicsPage";
import PovertyPage from "./pages/PovertyPage";
import GovernmentPage from "./pages/GovernmentPage";
import { DemographicsProvider } from "./state/demographicsStore";
import { PovertyProvider } from "./state/povertyStore";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/datos" element={<Navigate to="/datos/poblacion" replace />} />
          <Route
            path="/datos/poblacion"
            element={
              <DemographicsProvider>
                <DemographicsPage />
              </DemographicsProvider>
            }
          />
          <Route
            path="/datos/pobreza"
            element={
              <PovertyProvider>
                <PovertyPage />
              </PovertyProvider>
            }
          />
          <Route path="/gobierno" element={<Navigate to="/gobierno/legislativo" replace />} />
          <Route path="/gobierno/:branch" element={<GovernmentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
