
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-200 rounded-md">
        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
        <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
        <p className="text-red-600">You don't have permission to view this page.</p>
        <Badge className="mt-4 bg-red-100 text-red-700 hover:bg-red-200">Admin access required</Badge>
      </div>
    );
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
