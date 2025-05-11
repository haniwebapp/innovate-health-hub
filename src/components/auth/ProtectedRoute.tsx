
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This is a simplified version of a protected route component
// In a real application, you would check for user authentication
const ProtectedRoute = () => {
  // For now, we'll always allow access
  // In a real app, you would check authentication state here
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
