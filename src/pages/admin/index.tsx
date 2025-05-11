
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AdminIndexPage() {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the admin dashboard within the main dashboard layout
    if (isAuthenticated && isAdmin && !isLoading) {
      navigate("/dashboard/admin");
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-moh-green animate-spin" />
        <span className="ml-2 text-moh-green font-medium">Loading...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: "/dashboard/admin" }} replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // This will only show briefly before the redirect happens
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-10 h-10 text-moh-green animate-spin" />
      <span className="ml-2 text-moh-green font-medium">Redirecting to admin dashboard...</span>
    </div>
  );
}
