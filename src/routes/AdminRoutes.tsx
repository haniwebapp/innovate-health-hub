
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboardPage from '@/pages/dashboard/AdminDashboardPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/dashboard/AdminSettingsPage';
import AdminUsersPage from '@/pages/dashboard/AdminUsersPage';
import AdminIntegrationsPage from '@/pages/dashboard/AdminIntegrationsPage';
import AdminLogsPage from '@/pages/admin/logs/AdminLogsPage';
import AIGovernancePage from '@/pages/admin/ai-governance/index';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboardPage />} />
      <Route path="/analytics" element={<AdminAnalyticsPage />} />
      <Route path="/settings" element={<AdminSettingsPage />} />
      <Route path="/users" element={<AdminUsersPage />} />
      <Route path="/integrations" element={<AdminIntegrationsPage />} />
      <Route path="/logs" element={<AdminLogsPage />} />
      <Route path="/ai-governance" element={<AIGovernancePage />} />
    </Routes>
  );
}
