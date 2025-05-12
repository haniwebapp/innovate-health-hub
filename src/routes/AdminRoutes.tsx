import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboardPage from '@/pages/dashboard/AdminDashboardPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/dashboard/AdminSettingsPage';
import AdminUsersPage from '@/pages/dashboard/AdminUsersPage';
import AdminIntegrationsPage from '@/pages/dashboard/AdminIntegrationsPage';
import AIGovernancePage from '@/pages/admin/ai-governance/index';
import AdminClinicalPage from '@/pages/admin/clinical/index';
import AdminLogsPage from '@/pages/admin/logs/AdminLogsPage';

// Create admin routes component to be used in DashboardMainRoutes
export const AdminRoutes = () => (
  <>
    <Route index element={<AdminDashboardPage />} />
    <Route path="analytics" element={<AdminAnalyticsPage />} />
    <Route path="settings" element={<AdminSettingsPage />} />
    <Route path="users" element={<AdminUsersPage />} />
    <Route path="integrations" element={<AdminIntegrationsPage />} />
    <Route path="ai-governance" element={<AIGovernancePage />} />
    <Route path="clinical" element={<AdminClinicalPage />} />
    <Route path="logs" element={<AdminLogsPage />} />
  </>
);

// Also keep the existing array export for AppRoutes.tsx
export const adminRoutes = (
  <>
    <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
    <Route path="/dashboard/admin/analytics" element={<AdminAnalyticsPage />} />
    <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
    <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
    <Route path="/dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="/dashboard/admin/ai-governance" element={<AIGovernancePage />} />
    <Route path="/dashboard/admin/clinical" element={<AdminClinicalPage />} />
    <Route path="/dashboard/admin/logs" element={<AdminLogsPage />} />
  </>
);
