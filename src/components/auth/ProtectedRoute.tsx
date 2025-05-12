
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, adminOnly = false, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-moh-green animate-spin" />
        <span className="ml-2 text-moh-green font-medium">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If this is an admin-only route and the user is not an admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check for role-based access if allowedRoles is provided
  if (allowedRoles && allowedRoles.length > 0) {
    // Assume user.role exists or implement your own role checking logic
    const userRole = user?.role || '';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
