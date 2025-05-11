
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardKnowledgePage from '@/pages/dashboard/knowledge/index';

export const DashboardKnowledgeRoutes = (
  <Route path="knowledge">
    <Route index element={
      <ProtectedRoute>
        <DashboardKnowledgePage />
      </ProtectedRoute>
    } />
  </Route>
);
