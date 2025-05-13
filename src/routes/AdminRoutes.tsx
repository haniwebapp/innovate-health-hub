
import { Route } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/dashboard/AdminDashboardPage';
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
    <Route index element={<AdminDashboard />} />
    <Route path="settings" element={<AdminSettingsPage />} />
    <Route path="events" element={<AdminEventsPage />} />
    <Route path="reports" element={<AdminReportsPage />} />
    <Route path="users" element={<AdminUsersPage />} />
    <Route path="users/edit/:id" element={<AdminEditUserPage />} />
    <Route path="analytics" element={<AdminAnalyticsPage />} />
    <Route path="activity" element={<AdminActivityPage />} />
    <Route path="integrations" element={<AdminIntegrationsPage />} />
    <Route path="integrations/:id" element={<AdminIntegrationDetailsPage />} />
    <Route path="sandbox" element={<AdminSandboxPage />} />
    <Route path="sandbox/:id" element={<AdminSandboxDetailsPage />} />
    <Route path="innovations" element={<AdminInnovationsPage />} />
    <Route path="challenges" element={<AdminChallengesPage />} />
    <Route path="investment" element={<AdminInvestmentPage />} />
    <Route path="knowledge" element={<AdminKnowledgePage />} />
    <Route path="notifications" element={<AdminNotificationsPage />} />
    <Route path="cms" element={<AdminCMSPage />} />
    <Route path="cms/pages" element={<AdminCMSPagesPage />} />
    <Route path="cms/pages/new" element={<AdminCMSNewPage />} />
    <Route path="cms/pages/edit/:id" element={<AdminCMSEditPage />} />
  </Route>
);
