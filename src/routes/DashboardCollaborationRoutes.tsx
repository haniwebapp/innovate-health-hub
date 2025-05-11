
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardCollaborationPage from '@/pages/dashboard/collaboration/index';
import MessagesPage from '@/pages/dashboard/collaboration/messages/index';
import ForumsPage from '@/pages/dashboard/collaboration/forums/index';
import EventsPage from '@/pages/dashboard/collaboration/events/index';
import ConnectionsPage from '@/pages/dashboard/collaboration/connections/index';
import MeetingsPage from '@/pages/dashboard/collaboration/meetings/index';
import DigitalHealthForumPage from '@/pages/dashboard/collaboration/forums/digital-health';
import RegulatoryForumPage from '@/pages/dashboard/collaboration/forums/regulatory';
import InvestmentForumPage from '@/pages/dashboard/collaboration/forums/investment';
import AIHealthcareEventPage from '@/pages/dashboard/collaboration/events/ai-healthcare';

export const DashboardCollaborationRoutes = (
  <Route path="collaboration">
    <Route index element={<ProtectedRoute><DashboardCollaborationPage /></ProtectedRoute>} />
    <Route path="messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
    <Route path="forums" element={<ProtectedRoute><ForumsPage /></ProtectedRoute>} />
    <Route path="events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
    <Route path="connections" element={<ProtectedRoute><ConnectionsPage /></ProtectedRoute>} />
    <Route path="meetings" element={<ProtectedRoute><MeetingsPage /></ProtectedRoute>} />
    <Route path="forums/digital-health" element={<ProtectedRoute><DigitalHealthForumPage /></ProtectedRoute>} />
    <Route path="forums/regulatory" element={<ProtectedRoute><RegulatoryForumPage /></ProtectedRoute>} />
    <Route path="forums/investment" element={<ProtectedRoute><InvestmentForumPage /></ProtectedRoute>} />
    <Route path="events/ai-healthcare" element={<ProtectedRoute><AIHealthcareEventPage /></ProtectedRoute>} />
  </Route>
);
