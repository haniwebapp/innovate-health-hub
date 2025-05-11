
import {
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SystemHealthPage from "@/pages/dashboard/SystemHealthPage";
import AdminIntegrationsPage from "@/pages/dashboard/AdminIntegrationsPage";
import AdminSettingsPage from "@/pages/dashboard/AdminSettingsPage";
import AdminUsersPage from "@/pages/dashboard/AdminUsersPage";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";

// Create routes without the RouterProvider wrapper
export const routes = createRoutesFromElements(
  <>
    {/* Admin Routes */}
    <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
    <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
    <Route path="/dashboard/admin/system-health" element={<SystemHealthPage />} />
    <Route path="/dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
    
    {/* Platform Routes */}
    <Route path="/dashboard/platform" element={<Navigate to="/dashboard/platform/overview" replace />} />
    <Route path="/dashboard/platform/overview" element={<PlatformOverviewPage />} />
    <Route path="/dashboard/platform/users" element={<PlatformUsersPage />} />
    <Route path="/dashboard/platform/analytics" element={<PlatformAnalyticsPage />} />
    <Route path="/dashboard/platform/settings" element={<PlatformSettingsPage />} />
    
    {/* AI Routes */}
    <Route path="/dashboard/ai" element={<Navigate to="/dashboard/ai/overview" replace />} />
    <Route path="/dashboard/ai/overview" element={<AIOverviewPage />} />
    <Route path="/dashboard/ai/models" element={<AIModelsPage />} />
    <Route path="/dashboard/ai/integrations" element={<AIIntegrationsPage />} />
    <Route path="/dashboard/ai/analytics" element={<AIAnalyticsPage />} />
    
    {/* Default route */}
    <Route path="*" element={<DashboardLayout />} />
  </>
);

// New Phase Pages
import PlatformOverviewPage from "@/pages/dashboard/platform/PlatformOverviewPage";
import PlatformUsersPage from "@/pages/dashboard/platform/PlatformUsersPage";
import PlatformAnalyticsPage from "@/pages/dashboard/platform/PlatformAnalyticsPage";
import PlatformSettingsPage from "@/pages/dashboard/platform/PlatformSettingsPage";
import AIOverviewPage from "@/pages/dashboard/ai/AIOverviewPage";
import AIModelsPage from "@/pages/dashboard/ai/AIModelsPage";
import AIIntegrationsPage from "@/pages/dashboard/ai/AIIntegrationsPage";
import AIAnalyticsPage from "@/pages/dashboard/ai/AIAnalyticsPage";
