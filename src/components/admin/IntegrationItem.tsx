
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, AlertCircle, ExternalLink, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IntegrationLogs from "./IntegrationLogs";
import { Integration, logIntegrationEvent } from "@/utils/integrationUtils";

interface IntegrationItemProps {
  integration: Integration;
  onToggle: (id: string, newStatus: boolean) => void;
}

export default function IntegrationItem({ integration, onToggle }: IntegrationItemProps) {
  const { toast } = useToast();
  const [showLogs, setShowLogs] = useState(false);

  const handleTestConnection = async () => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });
    
    try {
      // Log the test event
      await logIntegrationEvent(
        integration.id,
        'connection_test',
        'pending',
        { timestamp: new Date().toISOString() }
      );
      
      // Simulate an API call
      setTimeout(async () => {
        // Update the test event status
        await logIntegrationEvent(
          integration.id,
          'connection_test',
          'success',
          { 
            timestamp: new Date().toISOString(),
            message: 'Connection successful'
          }
        );
        
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${integration.name}.`,
        });
      }, 1500);
    } catch (error) {
      console.error("Error during connection test:", error);
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${integration.name}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{integration.name}</span>
            <Badge variant={integration.is_active ? "default" : "outline"}>
              {integration.is_active ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            {integration.endpoint || 'No endpoint configured'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            checked={integration.is_active} 
            onCheckedChange={(checked) => onToggle(integration.id, checked)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleTestConnection}
          >
            Test
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowLogs(!showLogs)}
          >
            <AlertCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => toast({
              title: "API Keys",
              description: `Manage API keys for ${integration.name}`,
            })}
          >
            <Key className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => toast({
              title: "Settings",
              description: `Configure settings for ${integration.name}`,
            })}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showLogs && (
        <IntegrationLogs integrationId={integration.id} />
      )}
    </div>
  );
}
