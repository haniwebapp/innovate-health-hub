
import { Route } from 'react-router-dom';
import DashboardInnovationsPage from '@/pages/dashboard/innovations/index';
import DashboardInnovationDetailsPage from '@/pages/dashboard/innovations/[id]';
import DashboardActivityPage from '@/pages/dashboard/activity/index';

export const DashboardInnovationRoutes = (
  <>
    {/* User Portal Routes - Phase 1 */}
    <Route path="innovations" element={<DashboardInnovationsPage />} />
    <Route path="innovations/:id" element={<DashboardInnovationDetailsPage />} />
    <Route path="activity" element={<DashboardActivityPage />} />
  </>
);
