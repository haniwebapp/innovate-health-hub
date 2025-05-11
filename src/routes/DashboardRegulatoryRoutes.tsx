
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardRegulatoryPage from '@/pages/dashboard/regulatory/index';
import NewRegulatoryApplicationPage from '@/pages/dashboard/regulatory/applications/new';

export const DashboardRegulatoryRoutes = (
  <Route path="regulatory">
    <Route index element={
      <ProtectedRoute>
        <DashboardRegulatoryPage />
      </ProtectedRoute>
    } />
    <Route path="applications/new" element={
      <ProtectedRoute>
        <NewRegulatoryApplicationPage />
      </ProtectedRoute>
    } />
  </Route>
);
