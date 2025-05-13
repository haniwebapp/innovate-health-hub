
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardKnowledgePage from '@/pages/dashboard/knowledge/index';
import ResourceViewPage from '@/pages/dashboard/knowledge/resource';
import LearningPathPage from '@/pages/dashboard/knowledge/learning-path';
import SearchResultsPage from '@/pages/dashboard/knowledge/search';
import LearningHubPage from '@/pages/dashboard/knowledge/learning-hub/index';
import LearningModulePage from '@/pages/dashboard/knowledge/learning-hub/module';
import LearningPathDetailsPage from '@/pages/dashboard/knowledge/learning-hub/path';

export const DashboardKnowledgeRoutes = (
  <Route path="knowledge">
    <Route index element={
      <ProtectedRoute>
        <DashboardKnowledgePage />
      </ProtectedRoute>
    } />
    
    <Route path="resources/:id" element={
      <ProtectedRoute>
        <ResourceViewPage />
      </ProtectedRoute>
    } />
    
    <Route path="learning/:id" element={
      <ProtectedRoute>
        <LearningPathPage />
      </ProtectedRoute>
    } />
    
    <Route path="search" element={
      <ProtectedRoute>
        <SearchResultsPage />
      </ProtectedRoute>
    } />

    {/* Learning Hub Routes */}
    <Route path="learning-hub" element={
      <ProtectedRoute>
        <LearningHubPage />
      </ProtectedRoute>
    } />
    
    <Route path="learning-hub/path/:pathId" element={
      <ProtectedRoute>
        <LearningPathDetailsPage />
      </ProtectedRoute>
    } />
    
    <Route path="learning-hub/module/:moduleId" element={
      <ProtectedRoute>
        <LearningModulePage />
      </ProtectedRoute>
    } />
  </Route>
);
