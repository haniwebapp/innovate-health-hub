
import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/home/index';
import DashboardPage from './pages/dashboard/index';
import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import CreateChallengePage from './pages/dashboard/CreateChallengePage';
import ChallengesPage from './pages/challenges/index';
import ChallengePage from './pages/challenges/[id]';
import AdminChallengeManagementPage from './pages/admin/challenges/index';
import ChallengeSubmissionsPage from './pages/admin/challenges/submissions/[id]';
import SubmitChallengePage from './pages/dashboard/submit/[challengeId]';
import SubmissionsPage from './pages/dashboard/submissions/index';

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/dashboard/admin/users',
    element: <AdminUsersPage />
  },
  {
    path: '/dashboard/create-challenge',
    element: <CreateChallengePage />
  },
  {
    path: '/dashboard/submit/:challengeId',
    element: <SubmitChallengePage />
  },
  {
    path: '/dashboard/submissions',
    element: <SubmissionsPage />
  },
  {
    path: '/admin/challenges',
    element: <AdminChallengeManagementPage />
  },
  {
    path: '/admin/challenges/:id/submissions',
    element: <ChallengeSubmissionsPage />
  },
  {
    path: '/challenges',
    element: <ChallengesPage />
  },
  {
    path: '/challenges/:id',
    element: <ChallengePage />
  }
]);

export default router;
