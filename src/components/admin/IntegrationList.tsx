
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
    // Only load integrations if the component is mounted
    const controller = new AbortController();
    loadIntegrations(controller.signal);
    
    return () => {
      controller.abort();
    };
  }, [category, isAdmin, isAuthenticated]); // Reload when auth state changes

  const loadIntegrations = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    
    try {
      // Debug authentication state
      console.log(`Auth state: isAuthenticated=${isAuthenticated}, isAdmin=${isAdmin}`);
      
      // Check for authentication before proceeding
      if (!isAuthenticated) {
        console.warn("User is not authenticated");
        setError(new Error("Authentication required"));
        setErrorDetails("You must be logged in to view integrations.");
        setLoading(false);
        return;
      }
      
      // Check for admin privileges
      if (!isAdmin) {
        console.warn("User is not an admin");
        setError(new Error("Access denied"));
        setErrorDetails("You must have admin privileges to view integrations.");
        setLoading(false);
        return;
      }
      
      console.log(`Fetching integrations for category: ${category}`);
      const data = await fetchIntegrationsByType(category, signal);
      console.log(`Received ${data.length} integrations for ${category}`);
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
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  const handleToggleIntegration = async (id: string, isActive: boolean) => {
    try {
      console.log(`Toggling integration ${id} to ${isActive ? 'active' : 'inactive'}`);
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
