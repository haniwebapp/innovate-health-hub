
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";
import AdminUsersPage from "@/pages/dashboard/AdminUsersPage";
import AdminSettingsPage from "@/pages/admin/SettingsPage";
import AdminIntegrationsPage from "@/pages/dashboard/AdminIntegrationsPage";
import AdminAnalyticsPage from "@/pages/dashboard/AdminAnalyticsPage";
import AiGovernancePage from "@/pages/admin/ai-governance/index";
import ClinicalAdminPage from "@/pages/admin/clinical/index";
import AdminLogsPage from "@/pages/admin/logs/index";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboardPage />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="integrations" element={<AdminIntegrationsPage />} />
      <Route path="logs" element={<AdminLogsPage />} />
      <Route path="ai-governance" element={<AiGovernancePage />} />
      <Route path="clinical" element={<ClinicalAdminPage />} />
    </Routes>
  );
};

export const adminRoutes = <Route path="admin/*" element={<AdminRoutes />} />;
