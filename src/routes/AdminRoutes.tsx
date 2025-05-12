
import { lazy, ReactNode } from "react";
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

// Define the AdminRoutes as a collection of routes
const AdminRoutes: ReactNode = (
  <>
    <Route path="admin" element={
      <ProtectedRoute adminOnly={true}>
        <AdminDashboardPage />
      </ProtectedRoute>
    } />
    <Route path="admin/analytics" element={
      <ProtectedRoute adminOnly={true}>
        <AdminAnalyticsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/integrations" element={
      <ProtectedRoute adminOnly={true}>
        <AdminIntegrationsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/settings" element={
      <ProtectedRoute adminOnly={true}>
        <AdminSettingsPage />
      </ProtectedRoute>
    } />
    <Route path="admin/users" element={
      <ProtectedRoute adminOnly={true}>
        <AdminUsersPage />
      </ProtectedRoute>
    } />
    <Route path="admin/sandbox" element={
      <ProtectedRoute adminOnly={true}>
        <AdminSandboxPage />
      </ProtectedRoute>
    } />
    <Route path="admin/sandbox/:id" element={
      <ProtectedRoute adminOnly={true}>
        <AdminSandboxDetailPage />
      </ProtectedRoute>
    } />
    <Route path="admin/ai-governance" element={
      <ProtectedRoute adminOnly={true}>
        <AIGovernancePage />
      </ProtectedRoute>
    } />
  </>
);

export default AdminRoutes;
