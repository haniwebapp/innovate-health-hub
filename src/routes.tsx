
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Index from './pages/Index'; // Use the more complete landing page
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/index';
import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import CreateChallengePage from './pages/dashboard/CreateChallengePage';
import ChallengesPage from './pages/challenges/index';
import ChallengePage from './pages/challenges/[id]';
import AdminChallengeManagementPage from './pages/admin/challenges/index';
import ChallengeSubmissionsPage from './pages/admin/challenges/submissions/[id]';
import SubmitChallengePage from './pages/dashboard/submit/[challengeId]';
import SubmissionsPage from './pages/dashboard/submissions/index';

// Create router with all routes and proper nesting
const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  // Dashboard section with proper layout nesting
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'admin/users',
        element: <AdminUsersPage />
      },
      {
        path: 'create-challenge',
        element: <CreateChallengePage />
      },
      {
        path: 'submit/:challengeId',
        element: <SubmitChallengePage />
      },
      {
        path: 'submissions',
        element: <SubmissionsPage />
      }
    ]
  },
  // Admin routes
  {
    path: '/admin/challenges',
    element: <AdminChallengeManagementPage />
  },
  {
    path: '/admin/challenges/:id/submissions',
    element: <ChallengeSubmissionsPage />
  },
  // Public routes
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
