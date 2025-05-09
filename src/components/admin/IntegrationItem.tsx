
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, AlertCircle, ExternalLink, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IntegrationLogs from "./IntegrationLogs";
import { Integration } from "@/utils/integrationConstants";

interface IntegrationItemProps {
  integration: Integration;
  onToggle: (id: string, newStatus: boolean) => void;
}

export default function IntegrationItem({ integration, onToggle }: IntegrationItemProps) {
  const { toast } = useToast();
  const [showLogs, setShowLogs] = useState(false);

  const handleTestConnection = () => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });
    
    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${integration.name}.`,
      });
    }, 1500);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{integration.name}</span>
            <Badge variant={integration.connected ? "default" : "outline"}>
              {integration.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            {integration.endpoint}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            checked={integration.connected} 
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
        <IntegrationLogs integrationName={integration.name} />
      )}
    </div>
  );
}
