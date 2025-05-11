
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, AlertCircle, ExternalLink, Key, Loader2 } from "lucide-react";
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
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    } catch (error) {
      console.error("Error during connection test:", error);
      
      // Log the error event
      await logIntegrationEvent(
        integration.id,
        'connection_test',
        'error',
        { 
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      );
      
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${integration.name}.`,
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleManageKeys = () => {
    toast({
      title: "API Keys",
      description: `Manage API keys for ${integration.name}`,
    });
  };

  const handleManageSettings = () => {
    toast({
      title: "Settings",
      description: `Configure settings for ${integration.name}`,
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{integration.name}</span>
            <Badge variant={integration.is_active ? "default" : "outline"} className="ml-1">
              {integration.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate max-w-md">
              {integration.endpoint || 'No endpoint configured'}
            </span>
          </div>
          {integration.description && (
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              {integration.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
          <Switch 
            checked={integration.is_active} 
            onCheckedChange={(checked) => onToggle(integration.id, checked)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleTestConnection}
            disabled={isTesting}
          >
            {isTesting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : null}
            Test
          </Button>
          <Button 
            variant="outline" 
            size={showLogs ? "sm" : "icon"}
            onClick={() => setShowLogs(!showLogs)}
          >
            <AlertCircle className="h-4 w-4" />
            {showLogs ? <span className="ml-2">Hide Logs</span> : null}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleManageKeys}
          >
            <Key className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleManageSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showLogs && (
        <div className="border-t bg-muted/30 p-4">
          <IntegrationLogs integrationId={integration.id} />
        </div>
      )}
    </div>
  );
}
