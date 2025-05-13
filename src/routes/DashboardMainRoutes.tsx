
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
    
    {/* Admin routes nested inside the DashboardLayout */}
    <Route path="admin" element={<AdminLayout title="Admin Dashboard" description="Manage platform settings and users" />}>
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
  </Route>
);
