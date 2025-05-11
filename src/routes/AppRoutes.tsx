import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AdminLayout from '@/components/layouts/AdminLayout';

// Landing and Auth
import Landing from '@/pages/landing';
import Login from '@/pages/login';
import Register from '@/pages/register';

// Dashboard Pages
import Overview from '@/pages/dashboard/overview';
import Settings from '@/pages/dashboard/settings';

// Regulatory
import RegulatoryDashboardPage from '@/pages/dashboard/regulatory';
import ApplicationDetailPage from '@/pages/dashboard/regulatory/applications/[id]';
import NewRegulatoryApplicationPage from '@/pages/dashboard/regulatory/applications/new';
import RegulatoryPage from '@/pages/regulatory';

// Admin
import AdminOverview from '@/pages/admin';
import AdminUsers from '@/pages/admin/users';
import AdminSettings from '@/pages/admin/settings';
import AdminSandboxPage from '@/pages/admin/sandbox';

// Other
import NotFound from '@/pages/not-found';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/regulatory" element={<RegulatoryPage />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Regulatory routes */}
        <Route path="regulatory" element={<RegulatoryDashboardPage />} />
        <Route path="regulatory/applications/:id" element={<ApplicationDetailPage />} />
        <Route path="regulatory/applications/new" element={<NewRegulatoryApplicationPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="sandbox" element={<AdminSandboxPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
