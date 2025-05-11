
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationItem from "./IntegrationItem";
import { useToast } from "@/hooks/use-toast";
import { fetchIntegrationsByType, Integration, toggleIntegration } from "@/utils/integrationUtils";
import { AdminLoading, AdminError, AdminEmpty } from "@/components/admin/ui/AdminPageState";

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      setError(null);
      setErrorDetails(null);
      
      try {
        console.log(`Fetching integrations for category: ${category}`);
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
        
        // Check for specific error types
        let detailedError = "Unknown error occurred";
        
        if (errorMessage.includes("recursion")) {
          detailedError = "Database recursion error detected. This is likely due to a Row Level Security policy issue.";
        } else if (errorMessage.includes("permission denied")) {
          detailedError = "Permission denied. Please verify you have admin access and are properly authenticated.";
        } else if (errorMessage.includes("violates row-level security")) {
          detailedError = "Row Level Security violation. Your user account doesn't have permission to access this data.";
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

    loadIntegrations();
  }, [category, toast]);

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
          : "There was a problem updating the integration status",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    // Simple retry function
    setIntegrations([]);
    setError(null);
    setErrorDetails(null);
    setLoading(true);
    
    console.log("Retrying integration fetch...");
    
    fetchIntegrationsByType(category)
      .then(data => {
        console.log("Retry successful:", data);
        setIntegrations(data);
        setLoading(false);
      })
      .catch(err => {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Retry failed:", errorMessage);
        
        setError(err instanceof Error ? err : new Error("Failed to load integrations"));
        setErrorDetails(errorMessage.includes("recursion") 
          ? "Persistence of database permission issues. Please verify RLS policies." 
          : "Failed to reload integrations");
        
        setLoading(false);
        toast({
          title: "Error reloading integrations",
          description: "Failed to reload integrations. Please try again later.",
          variant: "destructive",
        });
      });
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
