
import { Routes, Route } from 'react-router-dom';
import AdminDashboardPage from '@/pages/dashboard/AdminDashboardPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/dashboard/AdminSettingsPage';
import AdminUsersPage from '@/pages/dashboard/AdminUsersPage';
import AdminIntegrationsPage from '@/pages/dashboard/AdminIntegrationsPage';
import AdminLogsPage from '@/pages/admin/logs';

export const AdminRoutes = (
  <Routes>
    <Route path="/admin" element={<AdminDashboardPage />} />
    <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
    <Route path="/admin/settings" element={<AdminSettingsPage />} />
    <Route path="/admin/users" element={<AdminUsersPage />} />
    <Route path="/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="/admin/logs" element={<AdminLogsPage />} />
  </Routes>
);
