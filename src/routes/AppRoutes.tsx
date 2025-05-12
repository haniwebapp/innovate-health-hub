
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { InnovationSubmissionRoutes } from './InnovationSubmissionRoutes';
import { DashboardMainRoutes } from './DashboardMainRoutes';
import { AdminRoutes } from './AdminRoutes';
import { Loader2 } from 'lucide-react';

// Lazily load page components for better performance
const NotFound = lazy(() => import('@/pages/NotFound'));
const PolicyPage = lazy(() => import('@/pages/policy/index'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center w-full min-h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes}
      
      {/* Auth Routes */}
      {AuthRoutes}
      
      {/* Innovation Submission Flow - Protected */}
      {InnovationSubmissionRoutes}
      
      {/* Main Dashboard with nested routes */}
      {DashboardMainRoutes}
      
      {/* Admin Routes */}
      {AdminRoutes}
      
      {/* Policy Page */}
      <Route path="/policy" element={
        <Suspense fallback={<PageLoader />}>
          <PolicyPage />
        </Suspense>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={
        <Suspense fallback={<PageLoader />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
}
