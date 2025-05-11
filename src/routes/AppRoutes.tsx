
import {
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SystemHealthPage from "@/pages/dashboard/SystemHealthPage";
import AdminIntegrationsPage from "@/pages/dashboard/AdminIntegrationsPage";

// Create routes without the RouterProvider wrapper
export const routes = createRoutesFromElements(
  <>
    <Route path="/dashboard/admin/system-health" element={<SystemHealthPage />} />
    <Route path="/dashboard/admin/integrations" element={<AdminIntegrationsPage />} />
    <Route path="*" element={<DashboardLayout />} />
  </>
);
