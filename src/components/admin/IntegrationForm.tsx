
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IntegrationFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function IntegrationForm({ onSave, onCancel }: IntegrationFormProps) {
  const [formTab, setFormTab] = useState("general");

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
                <Input id="integration-name" placeholder="e.g., FHIR API" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="integration-type">Integration Type</Label>
                <Select defaultValue="api">
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
                <Textarea id="integration-description" placeholder="Describe this integration's purpose" />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="integration-enabled" />
                <Label htmlFor="integration-enabled">Enable Integration</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auth-method">Authentication Method</Label>
                <Select defaultValue="api_key">
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
                <Input id="api-key" type="password" placeholder="Enter API key" />
                <p className="text-sm text-muted-foreground">
                  This will be stored securely and never displayed in plaintext.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input id="api-secret" type="password" placeholder="Enter API secret (if applicable)" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-url">Base URL</Label>
                <Input id="base-url" placeholder="https://api.example.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL (Callback)</Label>
                  <Input id="webhook-url" placeholder="https://yourdomain.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input id="webhook-secret" placeholder="Secret for webhook verification" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-version">API Version</Label>
                <Input id="api-version" placeholder="e.g., v1, v2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input id="retry-attempts" type="number" defaultValue="3" />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="logging-enabled" defaultChecked />
                <Label htmlFor="logging-enabled">Enable Request Logging</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="sandbox-mode" />
                <Label htmlFor="sandbox-mode">Sandbox Mode (Test Environment)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="health-checks" />
                <Label htmlFor="health-checks">Perform Health Checks</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Integration</Button>
      </CardFooter>
    </Card>
  );
}
