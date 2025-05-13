
import { Route } from 'react-router-dom';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import AdminUsersList from '@/pages/admin/users/index';
import AdminUsersEdit from '@/pages/admin/users/edit';
import AdminAnalytics from '@/pages/admin/analytics/index';
import AdminSettings from '@/pages/admin/settings/index';
import AdminActivityLog from '@/pages/admin/activity/index';
import AdminIntegrations from '@/pages/admin/integrations/index';
import AdminIntegrationDetails from '@/pages/admin/integrations/details';
import AdminCmsPage from '@/pages/admin/cms/index';
import PagesListPage from '@/pages/admin/cms/pages/index';
import EditPagePage from '@/pages/admin/cms/pages/edit';
import NewPagePage from '@/pages/admin/cms/pages/new';
import AdminInnovationRegistryPage from '@/pages/admin/innovations/index';
import AdminChallengeManagementPage from '@/pages/admin/challenges/index';
import AdminInvestmentToolsPage from '@/pages/admin/investment/index';
import AdminKnowledgePage from '@/pages/admin/knowledge/index';
import AdminNotificationsPage from '@/pages/admin/notifications/index';
import AdminReportsPage from '@/pages/admin/reports/index';

// Export routes without wrapping them in a layout
// The layout will be provided by DashboardMainRoutes
export const AdminRoutes = (
  <>
    <Route index element={<AdminDashboard />} />
    
    {/* Users Management */}
    <Route path="users">
      <Route index element={<AdminUsersList />} />
      <Route path=":id" element={<AdminUsersEdit />} />
    </Route>
    
    {/* Analytics */}
    <Route path="analytics" element={<AdminAnalytics />} />
    
    {/* Activity Log */}
    <Route path="activity" element={<AdminActivityLog />} />
    
    {/* Settings */}
    <Route path="settings" element={<AdminSettings />} />
    
    {/* Integrations */}
    <Route path="integrations">
      <Route index element={<AdminIntegrations />} />
      <Route path=":id" element={<AdminIntegrationDetails />} />
    </Route>
    
    {/* CMS */}
    <Route path="cms">
      <Route index element={<AdminCmsPage />} />
      <Route path="pages">
        <Route index element={<PagesListPage />} />
        <Route path="new" element={<NewPagePage />} />
        <Route path="edit/:id" element={<EditPagePage />} />
      </Route>
    </Route>
    
    {/* Innovations Management */}
    <Route path="innovations" element={<AdminInnovationRegistryPage />} />
    
    {/* NEWLY ADDED ROUTES */}
    
    {/* Challenges Management */}
    <Route path="challenges" element={<AdminChallengeManagementPage />} />
    
    {/* Investment Tools */}
    <Route path="investment" element={<AdminInvestmentToolsPage />} />
    
    {/* Regulatory Sandbox - Using 'sandbox' path as per the sidebar navigation */}
    <Route path="sandbox" element={<AdminAnalytics />} /> {/* Placeholder until sandbox page is created */}
    
    {/* Knowledge Repository */}
    <Route path="knowledge" element={<AdminKnowledgePage />} />
    
    {/* Notifications & Communications */}
    <Route path="notifications" element={<AdminNotificationsPage />} />
    
    {/* Reports */}
    <Route path="reports" element={<AdminReportsPage />} />
  </>
);
