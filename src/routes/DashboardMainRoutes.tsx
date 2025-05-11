
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
import DashboardChallengesPage from '@/pages/dashboard/challenges/index';
import { DashboardInnovationRoutes } from './DashboardInnovationRoutes';
import { DashboardInvestmentRoutes } from './DashboardInvestmentRoutes';
import { DashboardRegulatoryRoutes } from './DashboardRegulatoryRoutes';
import { DashboardKnowledgeRoutes } from './DashboardKnowledgeRoutes';
import { DashboardCollaborationRoutes } from './DashboardCollaborationRoutes';
import { AdminRoutes } from './AdminRoutes';

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
    
    {/* Nested route groups */}
    {DashboardInnovationRoutes}
    {DashboardInvestmentRoutes}
    {DashboardRegulatoryRoutes}
    {DashboardKnowledgeRoutes}
    {DashboardCollaborationRoutes}
    {AdminRoutes}
  </Route>
);
