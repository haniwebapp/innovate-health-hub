
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AccessDenied } from "@/components/common/AccessDenied";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export default function AdminLayout({ 
  children, 
  title = "Admin Dashboard", 
  description = "Manage platform settings and users",
  actions
}: AdminLayoutProps) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();

  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-moh-green"></div>
        <span className="ml-2 text-moh-green font-medium">Loading...</span>
      </div>
    );
  }
  
  // Show access denied component if user is not admin
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
