
import { Route } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/index';
import AdminSettingsPage from '@/pages/admin/settings/index';
import AdminEventsPage from '@/pages/admin/events/index';
import AdminReportsPage from '@/pages/admin/reports/index';
import AdminUsersPage from '@/pages/admin/users/index';
import AdminEditUserPage from '@/pages/admin/users/edit';
import AdminAnalyticsPage from '@/pages/admin/analytics/index';
import AdminActivityPage from '@/pages/admin/activity/index';
import AdminIntegrationsPage from '@/pages/admin/integrations/index';
import AdminIntegrationDetailsPage from '@/pages/admin/integrations/details';
import AdminSandboxPage from '@/pages/admin/sandbox/index';
import AdminSandboxDetailsPage from '@/pages/admin/sandbox/[id]';
import AdminInnovationsPage from '@/pages/admin/innovations/index';
import AdminChallengesPage from '@/pages/admin/challenges/index';
import AdminInvestmentPage from '@/pages/admin/investment/index';
import AdminKnowledgePage from '@/pages/admin/knowledge/index';
import AdminNotificationsPage from '@/pages/admin/notifications/index';
import AdminCMSPage from '@/pages/admin/cms/index';
import AdminCMSPagesPage from '@/pages/admin/cms/pages/index';
import AdminCMSNewPage from '@/pages/admin/cms/pages/new';
import AdminCMSEditPage from '@/pages/admin/cms/pages/edit';

export const AdminRoutes = (
  <Route element={<AdminLayout />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/settings" element={<AdminSettingsPage />} />
    <Route path="/admin/events" element={<AdminEventsPage />} />
    <Route path="/admin/reports" element={<AdminReportsPage />} />
    <Route path="/admin/users" element={<AdminUsersPage />} />
    <Route path="/admin/users/edit/:id" element={<AdminEditUserPage />} />
    <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
    <Route path="/admin/activity" element={<AdminActivityPage />} />
    <Route path="/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="/admin/integrations/:id" element={<AdminIntegrationDetailsPage />} />
    <Route path="/admin/sandbox" element={<AdminSandboxPage />} />
    <Route path="/admin/sandbox/:id" element={<AdminSandboxDetailsPage />} />
    <Route path="/admin/innovations" element={<AdminInnovationsPage />} />
    <Route path="/admin/challenges" element={<AdminChallengesPage />} />
    <Route path="/admin/investment" element={<AdminInvestmentPage />} />
    <Route path="/admin/knowledge" element={<AdminKnowledgePage />} />
    <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
    <Route path="/admin/cms" element={<AdminCMSPage />} />
    <Route path="/admin/cms/pages" element={<AdminCMSPagesPage />} />
    <Route path="/admin/cms/pages/new" element={<AdminCMSNewPage />} />
    <Route path="/admin/cms/pages/edit/:id" element={<AdminCMSEditPage />} />
  </Route>
);
