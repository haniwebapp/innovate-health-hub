
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import IntegrationItem from "./IntegrationItem";
import { MOCK_INTEGRATIONS } from "@/utils/integrationConstants";

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(
    MOCK_INTEGRATIONS[category as keyof typeof MOCK_INTEGRATIONS] || []
  );

  const handleToggle = (id: string, newStatus: boolean) => {
    setIntegrations(integrations.map((integration) => {
      if (integration.id === id) {
        toast({
          title: `Integration ${newStatus ? 'Enabled' : 'Disabled'}`,
          description: `${integration.name} has been ${newStatus ? 'enabled' : 'disabled'}.`,
        });
        return { ...integration, connected: newStatus };
      }
      return integration;
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title} Integrations</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {integrations.map((integration) => (
              <IntegrationItem 
                key={integration.id} 
                integration={integration} 
                onToggle={handleToggle} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
