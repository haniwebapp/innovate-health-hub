
import { Route } from 'react-router-dom';
import DashboardRegulatoryPage from '@/pages/dashboard/regulatory/index';
import NewRegulatoryApplicationPage from '@/pages/dashboard/regulatory/applications/new';
import ApplicationDetailsPage from '@/pages/dashboard/regulatory/applications/[id]';
import SandboxTestingPage from '@/pages/dashboard/regulatory/testing/[id]';
import DocumentUploadPage from '@/pages/dashboard/regulatory/documents/upload';
import DashboardKnowledgePage from '@/pages/dashboard/knowledge/index';
import DashboardCollaborationPage from '@/pages/dashboard/collaboration/index';

export const DashboardRegulatoryRoutes = (
  <>
    {/* User Portal Routes - Regulatory and Knowledge */}
    <Route path="regulatory" element={<DashboardRegulatoryPage />} />
    <Route path="regulatory/applications/new" element={<NewRegulatoryApplicationPage />} />
    <Route path="regulatory/applications/:id" element={<ApplicationDetailsPage />} />
    <Route path="regulatory/testing/:id" element={<SandboxTestingPage />} />
    <Route path="regulatory/documents/upload" element={<DocumentUploadPage />} />
    <Route path="knowledge" element={<DashboardKnowledgePage />} />
    <Route path="collaboration" element={<DashboardCollaborationPage />} />
  </>
);
