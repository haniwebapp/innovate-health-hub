
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  AlertCircle, 
  ExternalLink, 
  Key, 
  Loader2, 
  CheckCircle2, 
  Copy, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IntegrationLogs from "./IntegrationLogs";
import { Integration, logIntegrationEvent } from "@/utils/integrationUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IntegrationItemProps {
  integration: Integration;
  onToggle: (id: string, newStatus: boolean) => void;
}

export default function IntegrationItem({ integration, onToggle }: IntegrationItemProps) {
  const { toast } = useToast();
  const [showLogs, setShowLogs] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showKeysModal, setShowKeysModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showKey, setShowKey] = useState(false);
  
  // Sample API key for demo purposes - in real app this would be from integration.config
  const apiKey = integration.config?.api_key || "sk_test_51O2JGtCx0vN9YKmE9TZN2mQeYzg1ZFPSkIiMoHqi";

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
        variant: "default",
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
    setShowKeysModal(true);
  };

  const handleManageSettings = () => {
    setShowSettingsModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-base">{integration.name}</span>
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
            className="relative"
          >
            {isTesting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            )}
            Test Connection
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

      {/* API Keys Dialog */}
      <Dialog open={showKeysModal} onOpenChange={setShowKeysModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Keys for {integration.name}</DialogTitle>
            <DialogDescription>
              View and manage API keys for this integration. Keep these secure.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <div className="flex items-center">
                    <Input
                      id="api-key"
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowKey(!showKey)}
                      className="ml-2"
                    >
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showKey ? "Hide" : "Show"} API key</span>
                    </Button>
                  </div>
                </div>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="outline"
                  onClick={() => copyToClipboard(apiKey)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy API key</span>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="secondary" onClick={() => setShowKeysModal(false)}>Close</Button>
            <Button type="button">Regenerate API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{integration.name} Settings</DialogTitle>
            <DialogDescription>
              Configure settings for this integration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="endpoint">Endpoint URL</Label>
              <Input
                id="endpoint"
                defaultValue={integration.endpoint || ''}
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={integration.description || ''}
                placeholder="Description of this integration"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowSettingsModal(false)}>Cancel</Button>
            <Button type="button">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
