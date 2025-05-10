
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Index from './pages/Index'; 
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/index';
import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import AdminAnalyticsPage from './pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from './pages/dashboard/AdminSettingsPage';
import AdminIntegrationsPage from './pages/dashboard/AdminIntegrationsPage';
import CreateChallengePage from './pages/dashboard/CreateChallengePage';
import ChallengesPage from './pages/challenges/index';
import ChallengePage from './pages/challenges/[id]';
import AdminChallengeManagementPage from './pages/admin/challenges/index';
import ChallengeSubmissionsPage from './pages/admin/challenges/submissions/[id]';
import SubmitChallengePage from './pages/dashboard/submit/[challengeId]';
import SubmissionsPage from './pages/dashboard/submissions/index';
import AboutPage from './pages/about/index';
import NotFound from './pages/NotFound';
import InnovationDetailPage from './pages/innovations/[id]';
import DashboardInnovationDetailsPage from './pages/dashboard/innovations/[id]';

// Create router with all routes and proper nesting
const router = createBrowserRouter([
  // Public pages
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/challenges',
    element: <ChallengesPage />
  },
  {
    path: '/challenges/:id',
    element: <ChallengePage />
  },
  {
    path: '/innovations/:id',
    element: <InnovationDetailPage />
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
      // Admin routes within dashboard
      {
        path: 'admin/users',
        element: <AdminUsersPage />
      },
      {
        path: 'admin/analytics',
        element: <AdminAnalyticsPage />
      },
      {
        path: 'admin/settings',
        element: <AdminSettingsPage />
      },
      {
        path: 'admin/integrations',
        element: <AdminIntegrationsPage />
      },
      // User-focused dashboard routes
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
      },
      {
        path: 'innovations/:id',
        element: <DashboardInnovationDetailsPage />
      }
    ]
  },
  
  // Admin standalone pages
  {
    path: '/admin/challenges',
    element: <AdminChallengeManagementPage />
  },
  {
    path: '/admin/challenges/:id/submissions',
    element: <ChallengeSubmissionsPage />
  },
  
  // Redirect /home to root for legacy URLs
  {
    path: '/home',
    element: <Navigate to="/" replace />
  },
  
  // 404 route for all unmatched routes
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
