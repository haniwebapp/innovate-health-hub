
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardRegulatoryPage from '@/pages/dashboard/regulatory/index';
import NewRegulatoryApplicationPage from '@/pages/dashboard/regulatory/applications/new';
import ComplianceAnalysisPage from '@/pages/dashboard/regulatory/compliance-analysis';
import EthicsAssessmentPage from '@/pages/dashboard/regulatory/ethics-assessment';
import ComplianceStandardsPage from '@/pages/dashboard/regulatory/compliance-standards';

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
    <Route path="compliance-analysis" element={
      <ProtectedRoute>
        <ComplianceAnalysisPage />
      </ProtectedRoute>
    } />
    <Route path="ethics-assessment" element={
      <ProtectedRoute>
        <EthicsAssessmentPage />
      </ProtectedRoute>
    } />
    <Route path="compliance-standards" element={
      <ProtectedRoute>
        <ComplianceStandardsPage />
      </ProtectedRoute>
    } />
  </Route>
);
