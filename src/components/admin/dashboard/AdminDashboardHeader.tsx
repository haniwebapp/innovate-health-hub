
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function AdminDashboardHeader() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.first_name || 'Administrator'}. Here's what's happening with your platform.
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <Button variant="outline" size="sm">
          Generate Report
        </Button>
        <Button size="sm">
          System Settings
        </Button>
      </div>
    </div>
  );
}
