
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import DashboardSettingsPage from '@/pages/dashboard/settings/index';
import NotificationsPage from '@/pages/dashboard/notifications';
import SubmissionsList from '@/pages/dashboard/submissions/index';
import SubmitChallengePage from '@/pages/dashboard/submit/[challengeId]';
import CreateChallengePage from '@/pages/dashboard/CreateChallengePage';
import PolicyPage from '@/pages/policy/index';
import StrategyDashboard from '@/pages/dashboard/strategy/index';
import DashboardChallengesPage from '@/pages/dashboard/challenges/index';
import SupportPage from '@/pages/dashboard/support/index';
import { DashboardInnovationRoutes } from './DashboardInnovationRoutes';
import { DashboardInvestmentRoutes } from './DashboardInvestmentRoutes';
import { DashboardRegulatoryRoutes } from './DashboardRegulatoryRoutes';
import { DashboardKnowledgeRoutes } from './DashboardKnowledgeRoutes';
import { DashboardCollaborationRoutes } from './DashboardCollaborationRoutes';
import { AdminRoutes } from './AdminRoutes';
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

export const DashboardMainRoutes = (
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }>
    <Route index element={<DashboardPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="settings" element={<DashboardSettingsPage />} />
    <Route path="notifications" element={<NotificationsPage />} />
    <Route path="submissions" element={<SubmissionsList />} />
    <Route path="submit/:challengeId" element={<SubmitChallengePage />} />
    <Route path="create-challenge" element={<CreateChallengePage />} />
    <Route path="challenges" element={<DashboardChallengesPage />} />
    <Route path="policy" element={<PolicyPage />} />
    <Route path="strategy" element={<StrategyDashboard />} />
    <Route path="support" element={<SupportPage />} />
    
    {/* Nested route groups */}
    {DashboardInnovationRoutes}
    {DashboardInvestmentRoutes}
    {DashboardRegulatoryRoutes}
    {DashboardKnowledgeRoutes}
    {DashboardCollaborationRoutes}
    
    {/* Admin routes with fixed children prop */}
    <Route path="admin">
      <Route index element={<AdminLayout title="Admin Dashboard" description="Manage platform settings and users">{<AdminDashboard />}</AdminLayout>} />
      <Route path="settings" element={<AdminLayout title="Admin Settings" description="Configure platform settings">{<AdminSettingsPage />}</AdminLayout>} />
      <Route path="events" element={<AdminLayout title="Event Management" description="Manage platform events">{<AdminEventsPage />}</AdminLayout>} />
      <Route path="reports" element={<AdminLayout title="Reports" description="View and generate reports">{<AdminReportsPage />}</AdminLayout>} />
      <Route path="users" element={<AdminLayout title="User Management" description="Manage platform users">{<AdminUsersPage />}</AdminLayout>} />
      <Route path="users/edit/:id" element={<AdminLayout title="Edit User" description="Edit user details">{<AdminEditUserPage />}</AdminLayout>} />
      <Route path="analytics" element={<AdminLayout title="Analytics" description="Platform analytics and insights">{<AdminAnalyticsPage />}</AdminLayout>} />
      <Route path="activity" element={<AdminLayout title="Activity Log" description="View platform activity logs">{<AdminActivityPage />}</AdminLayout>} />
      <Route path="integrations" element={<AdminLayout title="Integrations" description="Manage platform integrations">{<AdminIntegrationsPage />}</AdminLayout>} />
      <Route path="integrations/:id" element={<AdminLayout title="Integration Details" description="View integration details">{<AdminIntegrationDetailsPage />}</AdminLayout>} />
      <Route path="sandbox" element={<AdminLayout title="Sandbox" description="Test and experiment with features">{<AdminSandboxPage />}</AdminLayout>} />
      <Route path="sandbox/:id" element={<AdminLayout title="Sandbox Details" description="View sandbox details">{<AdminSandboxDetailsPage />}</AdminLayout>} />
      <Route path="innovations" element={<AdminLayout title="Innovations" description="Manage platform innovations">{<AdminInnovationsPage />}</AdminLayout>} />
      <Route path="challenges" element={<AdminLayout title="Challenges" description="Manage platform challenges">{<AdminChallengesPage />}</AdminLayout>} />
      <Route path="investment" element={<AdminLayout title="Investment" description="Manage investment opportunities">{<AdminInvestmentPage />}</AdminLayout>} />
      <Route path="knowledge" element={<AdminLayout title="Knowledge Hub" description="Manage knowledge resources">{<AdminKnowledgePage />}</AdminLayout>} />
      <Route path="notifications" element={<AdminLayout title="Notifications" description="Manage system notifications">{<AdminNotificationsPage />}</AdminLayout>} />
      <Route path="cms" element={<AdminLayout title="Content Management" description="Manage platform content">{<AdminCMSPage />}</AdminLayout>} />
      <Route path="cms/pages" element={<AdminLayout title="CMS Pages" description="Manage CMS pages">{<AdminCMSPagesPage />}</AdminLayout>} />
      <Route path="cms/pages/new" element={<AdminLayout title="Create CMS Page" description="Create a new CMS page">{<AdminCMSNewPage />}</AdminLayout>} />
      <Route path="cms/pages/edit/:id" element={<AdminLayout title="Edit CMS Page" description="Edit CMS page content">{<AdminCMSEditPage />}</AdminLayout>} />
    </Route>
  </Route>
);
