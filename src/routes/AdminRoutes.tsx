
import { Route } from 'react-router-dom';

import DashboardLayout from '@/components/layouts/DashboardLayout';
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

export const AdminRoutes = (
  <Route path="/dashboard/admin" element={<DashboardLayout />}>
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
  </Route>
);
