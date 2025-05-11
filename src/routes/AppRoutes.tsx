
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";
import AdminIntegrationsPage from "@/pages/dashboard/AdminIntegrationsPage";
import HomePage from "@/pages/home/HomePage";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AICapabilitiesPage from "@/pages/ai/AICapabilitiesPage";
import AIOverviewPage from "@/pages/dashboard/ai/overview";
import AIRecommendationsPage from "@/pages/dashboard/ai/recommendations";
import AIAnalyticsPage from "@/pages/dashboard/ai/analytics";
import AIInsightsPage from "@/pages/dashboard/ai/insights";
import AdminPhasesPage from "@/pages/admin/phases/AdminPhasesPage";
import PlatformPhasesPage from "@/pages/platform/phases/PlatformPhasesPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* AI Public Routes */}
      <Route path="/ai/capabilities" element={<AICapabilitiesPage />} />
      <Route path="/platform/phases" element={<PlatformPhasesPage />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* AI Routes */}
          <Route path="/dashboard/ai/overview" element={<AIOverviewPage />} />
          <Route path="/dashboard/ai/recommendations" element={<AIRecommendationsPage />} />
          <Route path="/dashboard/ai/analytics" element={<AIAnalyticsPage />} />
          <Route path="/dashboard/ai/insights" element={<AIInsightsPage />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="/dashboard/admin/phases" element={<AdminPhasesPage />} />
          <Route path="/dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
