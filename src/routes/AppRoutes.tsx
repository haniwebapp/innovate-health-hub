import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import InvestmentHubPage from "@/pages/InvestmentHubPage";
import RegulatorySandboxPage from "@/pages/RegulatorySandboxPage";
import KnowledgeHubPage from "@/pages/KnowledgeHubPage";
import CollaborationPage from "@/pages/CollaborationPage";
import ProfilePage from "@/pages/ProfilePage";
import AdminIndexPage from "@/pages/admin";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";
import AdminUsersPage from "@/pages/dashboard/AdminUsersPage";
import AdminSettingsPage from "@/pages/dashboard/AdminSettingsPage";
import AdminAddUserPage from "@/pages/dashboard/AdminAddUserPage";
import AdminEditUserPage from "@/pages/dashboard/AdminEditUserPage";
import AdminIntegrationsPage from "@/pages/dashboard/AdminIntegrationsPage";
import MarketAnalysisPage from "@/pages/MarketAnalysisPage";
import InvestmentPortfolioPage from "@/pages/InvestmentPortfolioPage";
import InvestmentTrendsPage from "@/pages/InvestmentTrendsPage";
import RegulatoryFrameworksPage from "@/pages/RegulatoryFrameworksPage";
import RegulatoryApplicationsPage from "@/pages/RegulatoryApplicationsPage";
import RegulatoryApplicationDetailsPage from "@/pages/RegulatoryApplicationDetailsPage";
import InnovationSubmitPage from "@/pages/innovations/submit";
import RegulatoryPage from "@/pages/innovations/submit/regulatory";
import ContactPage from "@/pages/innovations/submit/contact";
import ReviewPage from "@/pages/innovations/submit/review";
import SystemHealthPage from "@/pages/dashboard/SystemHealthPage";

export const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="dashboard/investment" element={<InvestmentHubPage />} />
        <Route path="dashboard/regulatory" element={<RegulatorySandboxPage />} />
        <Route path="dashboard/knowledge" element={<KnowledgeHubPage />} />
        <Route path="dashboard/collaboration" element={<CollaborationPage />} />
        <Route path="dashboard/investment/market-analysis" element={<MarketAnalysisPage />} />
        <Route path="dashboard/investment/portfolio" element={<InvestmentPortfolioPage />} />
        <Route path="dashboard/investment/trends" element={<InvestmentTrendsPage />} />
        <Route path="dashboard/regulatory" element={<RegulatorySandboxPage />} />
        <Route path="dashboard/regulatory/frameworks" element={<RegulatoryFrameworksPage />} />
        <Route path="dashboard/regulatory/applications" element={<RegulatoryApplicationsPage />} />
        <Route path="dashboard/regulatory/applications/:applicationId" element={<RegulatoryApplicationDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        <Route path="innovations/submit" element={<InnovationSubmitPage />} />
        <Route path="innovations/submit/regulatory" element={<RegulatoryPage />} />
        <Route path="innovations/submit/contact" element={<ContactPage />} />
        <Route path="innovations/submit/review" element={<ReviewPage />} />

        {/* Admin Routes */}
        <Route path="dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="dashboard/admin/users" element={<AdminUsersPage />} />
        <Route path="dashboard/admin/users/add" element={<AdminAddUserPage />} />
        <Route path="dashboard/admin/users/edit/:userId" element={<AdminEditUserPage />} />
        <Route path="dashboard/admin/settings" element={<AdminSettingsPage />} />
        <Route path="dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
        <Route path="/dashboard/admin/system-health" element={<SystemHealthPage />} />,
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Catch-all route for invalid URLs */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);
