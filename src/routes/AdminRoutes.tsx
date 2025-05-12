
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
const AIGovernancePage = lazy(() => import("@/pages/admin/ai-governance"));

// Export default function that returns a Route element
export default function AdminRoutes() {
  return (
    <Route path="admin">
      <Route path="" element={
        <ProtectedRoute adminOnly={true}>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
      <Route path="analytics" element={
        <ProtectedRoute adminOnly={true}>
          <AdminAnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="integrations" element={
        <ProtectedRoute adminOnly={true}>
          <AdminIntegrationsPage />
        </ProtectedRoute>
      } />
      <Route path="settings" element={
        <ProtectedRoute adminOnly={true}>
          <AdminSettingsPage />
        </ProtectedRoute>
      } />
      <Route path="users" element={
        <ProtectedRoute adminOnly={true}>
          <AdminUsersPage />
        </ProtectedRoute>
      } />
      <Route path="sandbox" element={
        <ProtectedRoute adminOnly={true}>
          <AdminSandboxPage />
        </ProtectedRoute>
      } />
      <Route path="sandbox/:id" element={
        <ProtectedRoute adminOnly={true}>
          <AdminSandboxDetailPage />
        </ProtectedRoute>
      } />
      <Route path="ai-governance" element={
        <ProtectedRoute adminOnly={true}>
          <AIGovernancePage />
        </ProtectedRoute>
      } />
    </Route>
  );
}

// Named export for backwards compatibility
export const AdminRoutes = AdminRoutes;

// Export ready to use routes element
export const adminRoutes = <AdminRoutes />;
