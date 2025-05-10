
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ApiIcon, Globe, Settings2, Webhook } from "lucide-react";

export function IntegrationSettingsTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("api");
  const [isLoading, setIsLoading] = useState(false);
  const [apiSettings, setApiSettings] = useState({
    rateLimit: "100",
    authMethod: "key",
    timeout: "30",
    enableCache: true
  });
  
  const [webhookSettings, setWebhookSettings] = useState({
    webhookUrl: "https://hooks.yourplatform.com/events",
    secretKey: "••••••••••••••••",
    sendEvents: true,
    retryFailed: true
  });
  
  const handleApiSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Settings saved",
        description: "API integration settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save API settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleWebhookSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Settings saved",
        description: "Webhook settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save webhook settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="border-moh-green/10 shadow-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings2 className="h-5 w-5 text-moh-green" />
          <CardTitle>Integration Settings</CardTitle>
        </div>
        <CardDescription>
          Configure how your platform integrates with external services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="api" className="flex items-center gap-2">
              <ApiIcon className="h-4 w-4" />
              API Settings
            </TabsTrigger>
            <TabsTrigger value="webhook" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4 pt-2">
            <div className="grid gap-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="text-sm font-medium mb-1">API Access Control</h3>
                  <p className="text-xs text-muted-foreground">Manage how external services can access your API</p>
                </div>
                <Badge variant="outline" className="text-moh-green border-moh-green/30">Active</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests per minute)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={apiSettings.rateLimit}
                    onChange={(e) => setApiSettings({...apiSettings, rateLimit: e.target.value})}
                    className="border-moh-green/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={apiSettings.timeout}
                    onChange={(e) => setApiSettings({...apiSettings, timeout: e.target.value})}
                    className="border-moh-green/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="authMethod">Authentication Method</Label>
                <Select 
                  value={apiSettings.authMethod} 
                  onValueChange={(value) => setApiSettings({...apiSettings, authMethod: value})}
                >
                  <SelectTrigger id="authMethod" className="border-moh-green/20">
                    <SelectValue placeholder="Select authentication method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="key">API Key</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    <SelectItem value="jwt">JWT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="enableCache" 
                  checked={apiSettings.enableCache}
                  onCheckedChange={(checked) => 
                    setApiSettings({...apiSettings, enableCache: checked as boolean})
                  }
                  className="data-[state=checked]:bg-moh-green data-[state=checked]:border-moh-green"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableCache" className="text-sm font-medium">
                    Enable Response Caching
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Cache API responses to improve performance
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="webhook" className="space-y-4 pt-2">
            <div className="grid gap-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="text-sm font-medium mb-1">Webhook Configuration</h3>
                  <p className="text-xs text-muted-foreground">Set up webhooks to notify external systems of events</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={webhookSettings.sendEvents ? "text-moh-green border-moh-green/30" : "text-gray-500 border-gray-300"}>
                    {webhookSettings.sendEvents ? "Active" : "Inactive"}
                  </Badge>
                  <Switch
                    checked={webhookSettings.sendEvents}
                    onCheckedChange={(checked) => setWebhookSettings({...webhookSettings, sendEvents: checked})}
                    className="data-[state=checked]:bg-moh-green"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhookUrl" className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  Webhook URL
                </Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-service.com/webhook"
                  value={webhookSettings.webhookUrl}
                  onChange={(e) => setWebhookSettings({...webhookSettings, webhookUrl: e.target.value})}
                  className="border-moh-green/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secretKey">Webhook Secret</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={webhookSettings.secretKey}
                  onChange={(e) => setWebhookSettings({...webhookSettings, secretKey: e.target.value})}
                  className="border-moh-green/20"
                />
                <p className="text-xs text-muted-foreground pt-1">
                  This secret is used to verify the webhook payload
                </p>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="retryFailed" 
                  checked={webhookSettings.retryFailed}
                  onCheckedChange={(checked) => 
                    setWebhookSettings({...webhookSettings, retryFailed: checked as boolean})
                  }
                  className="data-[state=checked]:bg-moh-green data-[state=checked]:border-moh-green"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="retryFailed" className="text-sm font-medium">
                    Retry Failed Webhook Deliveries
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retry when webhook delivery fails
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" disabled={isLoading}>Reset to Defaults</Button>
        <Button 
          onClick={activeTab === 'api' ? handleApiSave : handleWebhookSave}
          disabled={isLoading}
          className="bg-moh-green hover:bg-moh-darkGreen"
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
