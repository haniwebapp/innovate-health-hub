
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationItem from "./IntegrationItem";
import { useToast } from "@/hooks/use-toast";
import { fetchIntegrationsByType, Integration, toggleIntegration } from "@/utils/integrationUtils";
import { AdminLoading, AdminError, AdminEmpty } from "@/components/admin/ui/AdminPageState";
import { useAuth } from "@/contexts/AuthContext"; // Import auth context

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated } = useAuth(); // Get auth state
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    loadIntegrations();
  }, [category, isAdmin, isAuthenticated]); // Reload when auth state changes

  const loadIntegrations = async () => {
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    
    // Check if user is authenticated and admin before loading
    if (!isAuthenticated) {
      setError(new Error("Authentication required"));
      setErrorDetails("You must be logged in to view integrations.");
      setLoading(false);
      return;
    }
    
    if (!isAdmin) {
      setError(new Error("Access denied"));
      setErrorDetails("You must have admin privileges to view integrations.");
      setLoading(false);
      return;
    }
    
    try {
      console.log(`Fetching integrations for category: ${category} (isAdmin: ${isAdmin})`);
      const data = await fetchIntegrationsByType(category);
      console.log(`Received integrations:`, data);
      setIntegrations(data);
    } catch (error) {
      console.error("Error loading integrations:", error);
      
      // Enhanced error logging
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error && error.stack ? error.stack : "";
      
      console.error(`Detailed error info: ${errorMessage}`);
      console.error(`Stack: ${stack}`);
      
      // Provide user-friendly error message
      let detailedError = "Failed to load integrations.";
      
      if (errorMessage.includes("recursion")) {
        detailedError = "A database policy issue was detected. This is likely due to a permissions configuration issue.";
      } else if (errorMessage.includes("permission")) {
        detailedError = "Access denied. Please verify you have admin access and are properly authenticated.";
      } else if (errorMessage.includes("Database access error")) {
        detailedError = errorMessage;
      }
      
      setError(error instanceof Error ? error : new Error(errorMessage));
      setErrorDetails(detailedError);
      
      toast({
        title: "Error loading integrations",
        description: detailedError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIntegration = async (id: string, isActive: boolean) => {
    try {
      console.log(`Toggling integration ${id} to ${isActive}`);
      const updatedIntegration = await toggleIntegration(id, isActive);
      
      // Update the integration in the state
      setIntegrations(currentIntegrations => 
        currentIntegrations.map(integration => 
          integration.id === id ? updatedIntegration : integration
        )
      );
      
      toast({
        title: `Integration ${isActive ? 'enabled' : 'disabled'}`,
        description: `The integration has been ${isActive ? 'enabled' : 'disabled'} successfully.`,
      });
    } catch (error) {
      console.error("Error toggling integration:", error);
      
      // Enhanced error handling
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      toast({
        title: "Error updating integration",
        description: errorMessage.includes("recursion") 
          ? "Database permission error. Please contact the administrator." 
          : `There was a problem updating the integration status: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    loadIntegrations();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <AdminLoading message="Loading integrations..." />
        ) : error ? (
          <AdminError 
            title="Failed to load integrations" 
            description={errorDetails || error.message}
            onRetry={handleRetry}
          />
        ) : integrations.length === 0 ? (
          <AdminEmpty message={`No integrations available for ${category}. Add a new integration to get started.`} />
        ) : (
          integrations.map(integration => (
            <IntegrationItem 
              key={integration.id} 
              integration={integration}
              onToggle={handleToggleIntegration}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
