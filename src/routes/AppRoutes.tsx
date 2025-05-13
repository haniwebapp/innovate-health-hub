
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import MarketplacePage from "@/pages/marketplace/index";
import AboutPage from "@/pages/about/index";
import InnovationsPage from "@/pages/innovations/index";
import InnovationDetailPage from "@/pages/innovations/[id]";
import ChallengesPage from "@/pages/challenges/index";
import { DashboardInnovationRoutes } from "./DashboardInnovationRoutes";
import { DashboardRegulatoryRoutes } from "./DashboardRegulatoryRoutes";
import { DashboardMainRoutes } from "./DashboardMainRoutes";
import { DashboardInvestmentRoutes } from "./DashboardInvestmentRoutes";
import { DashboardKnowledgeRoutes } from "./DashboardKnowledgeRoutes";
import { DashboardCollaborationRoutes } from "./DashboardCollaborationRoutes";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PolicyPage from "@/pages/policy/index";
import RegulatoryPage from "@/pages/regulatory/index";
import InternationalRegulationsPage from "@/components/regulatory/international/InternationalRegulationsPage";
import CrossBorderCollaborationPage from "@/components/collaboration/international/CrossBorderCollaborationPage";
import KnowledgeHubPage from "@/pages/knowledge-hub/index";
import ReportsPage from "@/pages/admin/reports/ReportsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/innovations" element={<InnovationsPage />} />
      <Route path="/innovations/:id" element={<InnovationDetailPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/regulatory" element={<RegulatoryPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
      
      {/* Global Expansion New Routes */}
      <Route path="/regulatory/international" element={<InternationalRegulationsPage />} />
      <Route path="/collaboration/international" element={<CrossBorderCollaborationPage />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        {DashboardInnovationRoutes}
        {DashboardInvestmentRoutes}
        {DashboardRegulatoryRoutes}
        {DashboardKnowledgeRoutes}
        {DashboardCollaborationRoutes}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
