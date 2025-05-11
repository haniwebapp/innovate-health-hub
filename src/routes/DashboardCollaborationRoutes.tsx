
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardCollaborationPage from '@/pages/dashboard/collaboration/index';

export const DashboardCollaborationRoutes = (
  <Route path="collaboration">
    <Route index element={
      <ProtectedRoute>
        <DashboardCollaborationPage />
      </ProtectedRoute>
    } />
  </Route>
);
