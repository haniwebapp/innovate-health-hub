
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function AccessDeniedSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="p-4 rounded-full bg-red-50 mb-4">
        <Shield className="h-12 w-12 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-center text-muted-foreground mb-6 max-w-md">
        You don't have permission to access this area. 
        This section is restricted to administrators only.
      </p>
      <Alert variant="destructive" className="mb-6 max-w-md">
        <AlertTitle>Admin privileges required</AlertTitle>
        <AlertDescription>
          If you believe you should have access, please contact your system administrator.
        </AlertDescription>
      </Alert>
      <Button asChild>
        <Link to="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
