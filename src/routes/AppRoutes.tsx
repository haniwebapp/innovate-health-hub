
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { InnovationSubmissionRoutes } from './InnovationSubmissionRoutes';
import { DashboardMainRoutes } from './DashboardMainRoutes';
import AdminRoutesComponent from './AdminRoutes'; // Import the default export
import NotFound from '@/pages/NotFound';
import PolicyPage from '@/pages/policy/index';

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
      
      {/* Admin Routes */}
      <AdminRoutesComponent />
      
      {/* Policy Page */}
      <Route path="/policy" element={<PolicyPage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
