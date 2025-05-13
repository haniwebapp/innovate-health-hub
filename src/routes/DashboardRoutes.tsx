
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import DashboardSettingsPage from '@/pages/dashboard/settings/index';
import NotificationsPage from '@/pages/dashboard/notifications';
import SubmissionsList from '@/pages/dashboard/submissions/index';
import SubmitChallengePage from '@/pages/dashboard/submit/[challengeId]';
import CreateChallengePage from '@/pages/dashboard/CreateChallengePage';

export const DashboardRoutes = (
  <>
    <Route path="profile" element={<ProfilePage />} />
    <Route path="settings" element={<DashboardSettingsPage />} />
    <Route path="notifications" element={<NotificationsPage />} />
    <Route path="submissions" element={<SubmissionsList />} />
    <Route path="submit/:challengeId" element={<SubmitChallengePage />} />
    <Route path="create-challenge" element={<CreateChallengePage />} />
  </>
);
