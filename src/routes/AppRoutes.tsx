
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SystemHealthPage from "@/pages/dashboard/SystemHealthPage";

// Create the router
export const appRoutes = (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: "/dashboard/admin/system-health",
        element: <SystemHealthPage />
      },
      {
        path: "*",
        element: <DashboardLayout />
      }
    ])}
  />
);
