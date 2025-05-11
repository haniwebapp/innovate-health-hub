
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

  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchIntegrationsByType(category);
        setIntegrations(data);
      } catch (error) {
        console.error("Error loading integrations:", error);
        setError(error instanceof Error ? error : new Error("Failed to load integrations"));
        toast({
          title: "Error loading integrations",
          description: "There was a problem loading the integration list",
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
      toast({
        title: "Error updating integration",
        description: "There was a problem updating the integration status",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    // Simple retry function
    setIntegrations([]);
    setError(null);
    setLoading(true);
    fetchIntegrationsByType(category)
      .then(data => {
        setIntegrations(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err : new Error("Failed to load integrations"));
        setLoading(false);
        toast({
          title: "Error loading integrations",
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
            description={error.message}
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
