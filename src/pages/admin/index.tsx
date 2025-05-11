
import React from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AdminIndexPage() {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-moh-green animate-spin" />
        <span className="ml-2 text-moh-green font-medium">Loading...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: "/admin" }} replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AdminDashboard />;
}
