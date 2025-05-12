
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboardPage from '@/pages/dashboard/AdminDashboardPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/dashboard/AdminSettingsPage';
import AdminUsersPage from '@/pages/dashboard/AdminUsersPage';
import AdminIntegrationsPage from '@/pages/dashboard/AdminIntegrationsPage';
import AIGovernancePage from '@/pages/admin/ai-governance/index';
import AdminClinicalPage from '@/pages/admin/clinical/index';

// Create an array of admin routes instead of a component
export const adminRoutes = (
  <>
    <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
    <Route path="/dashboard/admin/analytics" element={<AdminAnalyticsPage />} />
    <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
    <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
    <Route path="/dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="/dashboard/admin/ai-governance" element={<AIGovernancePage />} />
    <Route path="/dashboard/admin/clinical" element={<AdminClinicalPage />} />
  </>
);
