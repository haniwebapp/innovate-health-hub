
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { InnovationSubmissionRoutes } from './InnovationSubmissionRoutes';
import { DashboardMainRoutes } from './DashboardMainRoutes';
import { AdminRoutes } from './AdminRoutes';
import NotFound from '@/pages/NotFound';
import PolicyPage from '@/pages/policy/index';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes}
      
      {/* Auth Routes */}
      {AuthRoutes}
      
      {/* Innovation Submission Flow - Protected */}
      {InnovationSubmissionRoutes}
      
      {/* Main Dashboard with nested routes */}
      {DashboardMainRoutes}
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
