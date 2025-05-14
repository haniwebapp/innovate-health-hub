
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { InnovationSubmissionRoutes } from './InnovationSubmissionRoutes';
import { DashboardMainRoutes } from './DashboardMainRoutes';
import NotFound from '@/pages/NotFound';
import PolicyPage from '@/pages/policy/index';
import AIEnhancedPage from '@/pages/ai-enhanced/index';
import EventsPage from '@/pages/events/index';
import EventsArchivePage from '@/pages/events/archive';
import EventDetailsPage from '@/pages/events/details/[id]';
import TeamManagementPage from '@/pages/dashboard/team/index';
import Index from '@/pages/Index';

export function AppRoutes() {
  return (
    <Routes>
      {/* Root Route */}
      <Route path="/" element={<Index />} />
      
      {/* Public Routes */}
      {PublicRoutes}
      
      {/* Auth Routes */}
      {AuthRoutes}
      
      {/* Innovation Submission Flow - Protected */}
      {InnovationSubmissionRoutes}
      
      {/* Main Dashboard with nested routes (including admin routes) */}
      {DashboardMainRoutes}
      
      {/* Team Management */}
      <Route path="/dashboard/team" element={<TeamManagementPage />} />
      
      {/* Policy Page */}
      <Route path="/policy" element={<PolicyPage />} />
      
      {/* Events Pages */}
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/archive" element={<EventsArchivePage />} />
      <Route path="/events/details/:id" element={<EventDetailsPage />} />
      
      {/* AI Enhanced Features Page */}
      <Route path="/ai-enhanced" element={<AIEnhancedPage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
