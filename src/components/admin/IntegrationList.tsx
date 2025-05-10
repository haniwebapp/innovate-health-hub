
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationItem from "./IntegrationItem";
import { useToast } from "@/hooks/use-toast";
import { fetchIntegrationsByType, Integration, toggleIntegration } from "@/utils/integrationUtils";

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      try {
        const data = await fetchIntegrationsByType(category);
        setIntegrations(data);
      } catch (error) {
        console.error("Error loading integrations:", error);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading integrations...</div>
        ) : integrations.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No integrations available for this category. Add a new integration to get started.
          </div>
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
