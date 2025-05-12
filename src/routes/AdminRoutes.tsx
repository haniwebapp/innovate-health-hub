
import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Lazy loaded pages
const AdminDashboardPage = lazy(() => import("@/pages/dashboard/AdminDashboardPage"));
const AdminAnalyticsPage = lazy(() => import("@/pages/dashboard/AdminAnalyticsPage"));
const AdminIntegrationsPage = lazy(() => import("@/pages/dashboard/AdminIntegrationsPage"));
const AdminSettingsPage = lazy(() => import("@/pages/dashboard/AdminSettingsPage"));
const AdminUsersPage = lazy(() => import("@/pages/dashboard/AdminUsersPage"));
const AdminSandboxPage = lazy(() => import("@/pages/admin/sandbox"));
const AdminSandboxDetailPage = lazy(() => import("@/pages/admin/sandbox/[id]"));

// We're fixing the import path here - removing the reference to the non-existent logs page
// const AdminLogsPage = lazy(() => import("@/pages/admin/logs/index"));

// Export as both default and named export for compatibility
export default function AdminRoutes() {
  return (
    <Route path="admin" element={<ProtectedRoute adminOnly={true} />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="integrations" element={<AdminIntegrationsPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="sandbox" element={<AdminSandboxPage />} />
      <Route path="sandbox/:id" element={<AdminSandboxDetailPage />} />
      {/* Removing the logs route until we implement it
      <Route path="logs" element={<AdminLogsPage />} /> */}
    </Route>
  );
}

// Named export for files importing as { AdminRoutes }
export { AdminRoutes };
export const adminRoutes = <AdminRoutes />;
