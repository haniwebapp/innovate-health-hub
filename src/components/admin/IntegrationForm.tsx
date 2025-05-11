
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { createIntegration } from "@/utils/integrationUtils";

interface IntegrationFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function IntegrationForm({ onSave, onCancel }: IntegrationFormProps) {
  const { toast } = useToast();
  const [formTab, setFormTab] = useState("general");
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("api");
  const [authMethod, setAuthMethod] = useState("api_key");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [apiVersion, setApiVersion] = useState("");
  const [timeout, setTimeout] = useState("30");
  const [retryAttempts, setRetryAttempts] = useState("3");
  const [isEnabled, setIsEnabled] = useState(true);
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(false);
  const [healthChecks, setHealthChecks] = useState(false);

  const handleSave = async () => {
    if (!name || !type) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Build the configuration object based on form data
      const config = {
        auth: {
          method: authMethod,
          apiKey,
          apiSecret,
        },
        endpoints: {
          baseUrl,
          webhook: webhookUrl,
          webhookSecret,
          version: apiVersion,
        },
        options: {
          timeout: parseInt(timeout),
          retryAttempts: parseInt(retryAttempts),
          loggingEnabled,
          sandboxMode,
          healthChecks,
        },
      };

      await createIntegration({
        name,
        description,
        type,
        endpoint: baseUrl,
        is_active: isEnabled,
        config,
      });

      toast({
        title: "Integration created",
        description: "The integration has been created successfully",
      });
      onSave();
    } catch (error) {
      console.error("Error creating integration:", error);
      toast({
        title: "Error creating integration",
        description: "There was a problem creating the integration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Integration</CardTitle>
        <CardDescription>
          Configure a new third-party service integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={formTab} onValueChange={setFormTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="integration-name">Integration Name</Label>
                <Input 
                  id="integration-name" 
                  placeholder="e.g., FHIR API" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="integration-type">Integration Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="integration-type">
                    <SelectValue placeholder="Select integration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API (FHIR, HL7, REST)</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="storage">Storage & Files</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="ai">AI & NLP</SelectItem>
                    <SelectItem value="meetings">Meetings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="integration-description">Description</Label>
                <Textarea 
                  id="integration-description" 
                  placeholder="Describe this integration's purpose" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="integration-enabled" 
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                />
                <Label htmlFor="integration-enabled">Enable Integration</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auth-method">Authentication Method</Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger id="auth-method">
                    <SelectValue placeholder="Select auth method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api_key">API Key</SelectItem>
                    <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                    <SelectItem value="jwt">JWT</SelectItem>
                    <SelectItem value="none">No Authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This will be stored securely and never displayed in plaintext.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input 
                  id="api-secret" 
                  type="password" 
                  placeholder="Enter API secret (if applicable)"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-url">Base URL</Label>
                <Input 
                  id="base-url" 
                  placeholder="https://api.example.com"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL (Callback)</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://yourdomain.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input 
                    id="webhook-secret" 
                    placeholder="Secret for webhook verification"
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-version">API Version</Label>
                <Input 
                  id="api-version" 
                  placeholder="e.g., v1, v2"
                  value={apiVersion}
                  onChange={(e) => setApiVersion(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input 
                  id="timeout" 
                  type="number" 
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input 
                  id="retry-attempts" 
                  type="number" 
                  value={retryAttempts}
                  onChange={(e) => setRetryAttempts(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="logging-enabled" 
                  checked={loggingEnabled}
                  onCheckedChange={setLoggingEnabled}
                />
                <Label htmlFor="logging-enabled">Enable Request Logging</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sandbox-mode"
                  checked={sandboxMode}
                  onCheckedChange={setSandboxMode}
                />
                <Label htmlFor="sandbox-mode">Sandbox Mode (Test Environment)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="health-checks"
                  checked={healthChecks}
                  onCheckedChange={setHealthChecks}
                />
                <Label htmlFor="health-checks">Perform Health Checks</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Integration"}
        </Button>
      </CardFooter>
    </Card>
  );
}
