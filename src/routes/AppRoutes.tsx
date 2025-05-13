
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/index";
import DashboardPage from "@/pages/dashboard/index";
import MarketplacePage from "@/pages/marketplace/index";
import AboutPage from "@/pages/about/index";
import InnovationsPage from "@/pages/innovations/index";
import InnovationDetailPage from "@/pages/innovations/[id]";
import ChallengesPage from "@/pages/challenges/index";
import { DashboardRoutes } from "./DashboardRoutes";
import { DashboardInnovationRoutes } from "./DashboardInnovationRoutes";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/innovations" element={<InnovationsPage />} />
      <Route path="/innovations/:id" element={<InnovationDetailPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      
      {/* Added Marketplace route */}
      <Route path="/marketplace" element={<MarketplacePage />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        {DashboardRoutes}
        {DashboardInnovationRoutes}
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
