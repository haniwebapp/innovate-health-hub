
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminDashboardPage from '@/pages/dashboard/AdminDashboardPage';
import AdminCmsPage from '@/pages/admin/cms/index';
import AdminReportsPage from '@/pages/admin/reports/index';
import AdminUserManagementPage from '@/pages/admin/users/index';
import AdminChallengeManagementPage from '@/pages/admin/challenges/index';
import AdminInnovationRegistryPage from '@/pages/admin/innovations/index';
import AdminInvestmentToolsPage from '@/pages/admin/investment/index';
import AdminSandboxPage from '@/pages/admin/sandbox/index';
import AdminKnowledgePage from '@/pages/admin/knowledge/index';
import AdminNotificationsPage from '@/pages/admin/notifications/index';
import AdminIntegrationsPage2 from '@/pages/admin/integrations/index';
import AdminSettingsPage2 from '@/pages/admin/SettingsPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
// New imports
import AdminClinicalPage from '@/pages/admin/clinical/index';
import AdminLogsPage from '@/pages/admin/logs/index';

export const AdminRoutes = (
  <>
    {/* Admin Routes within Dashboard */}
    <Route path="admin" element={
      <ProtectedRoute adminOnly={true}>
        <AdminDashboardPage />
      </ProtectedRoute>
    } />
    <Route path="admin/users" element={
      <ProtectedRoute adminOnly={true}>
        <AdminUserManagementPage />
      </ProtectedRoute>
    } />
    <Route path="admin/analytics" element={
      <ProtectedRoute adminOnly={true}>
        <AdminAnalyticsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/settings" element={
      <ProtectedRoute adminOnly={true}>
        <AdminSettingsPage2 />
      </ProtectedRoute>
    } />
    <Route path="admin/integrations" element={
      <ProtectedRoute adminOnly={true}>
        <AdminIntegrationsPage2 />
      </ProtectedRoute>
    } />
    <Route path="admin/cms" element={
      <ProtectedRoute adminOnly={true}>
        <AdminCmsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/reports" element={
      <ProtectedRoute adminOnly={true}>
        <AdminReportsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/challenges" element={
      <ProtectedRoute adminOnly={true}>
        <AdminChallengeManagementPage />
      </ProtectedRoute>
    } />
    <Route path="admin/innovations" element={
      <ProtectedRoute adminOnly={true}>
        <AdminInnovationRegistryPage />
      </ProtectedRoute>
    } />
    <Route path="admin/investment" element={
      <ProtectedRoute adminOnly={true}>
        <AdminInvestmentToolsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/sandbox" element={
      <ProtectedRoute adminOnly={true}>
        <AdminSandboxPage />
      </ProtectedRoute>
    } />
    <Route path="admin/knowledge" element={
      <ProtectedRoute adminOnly={true}>
        <AdminKnowledgePage />
      </ProtectedRoute>
    } />
    <Route path="admin/notifications" element={
      <ProtectedRoute adminOnly={true}>
        <AdminNotificationsPage />
      </ProtectedRoute>
    } />
    {/* New clinical and logs routes */}
    <Route path="admin/clinical" element={
      <ProtectedRoute adminOnly={true}>
        <AdminClinicalPage />
      </ProtectedRoute>
    } />
    <Route path="admin/logs" element={
      <ProtectedRoute adminOnly={true}>
        <AdminLogsPage />
      </ProtectedRoute>
    } />
  </>
);
