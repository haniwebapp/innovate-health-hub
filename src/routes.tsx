
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
import InnovationSubmitPage from './pages/innovations/submit';
import BasicInfoPage from './pages/innovations/submit/basic-info';
import DetailsPage from './pages/innovations/submit/details';
import ContactInformationPage from './pages/innovations/submit/contact';
import MediaPage from './pages/innovations/submit/media';
import RegulatoryPage from './pages/innovations/submit/regulatory';
import TechnicalPage from './pages/innovations/submit/technical';
import ReviewPage from './pages/innovations/submit/review';

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
    path: '/innovations',
    element: <InnovationDetailPage />
  },
  {
    path: '/innovations/:id',
    element: <InnovationDetailPage />
  },
  
  // Innovation submit flow with nested routes
  {
    path: '/innovations/submit',
    element: <InnovationSubmitPage />,
    children: [
      {
        path: 'basic-info',
        element: <BasicInfoPage />
      },
      {
        path: 'details',
        element: <DetailsPage />
      },
      {
        path: 'media',
        element: <MediaPage />
      },
      {
        path: 'technical',
        element: <TechnicalPage />
      },
      {
        path: 'regulatory',
        element: <RegulatoryPage />
      },
      {
        path: 'contact',
        element: <ContactInformationPage />
      },
      {
        path: 'review',
        element: <ReviewPage />
      }
    ]
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
