
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { InnovationSubmissionRoutes } from './InnovationSubmissionRoutes';
import { DashboardMainRoutes } from './DashboardMainRoutes';
import NotFound from '@/pages/NotFound';
import PolicyPage from '@/pages/policy/index';
import AIEnhancedPage from '@/pages/ai-enhanced/index';
import EventsPage from '@/pages/events/index';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes}
      
      {/* Auth Routes */}
      {AuthRoutes}
      
      {/* Innovation Submission Flow - Protected */}
      {InnovationSubmissionRoutes}
      
      {/* Main Dashboard with nested routes (including admin routes) */}
      {DashboardMainRoutes}
      
      {/* Policy Page */}
      <Route path="/policy" element={<PolicyPage />} />
      
      {/* Events Page */}
      <Route path="/events" element={<EventsPage />} />
      
      {/* AI Enhanced Features Page */}
      <Route path="/ai-enhanced" element={<AIEnhancedPage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
