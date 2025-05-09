
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, AlertCircle, ExternalLink, Key } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import IntegrationLogs from "./IntegrationLogs";

// Mock data for integrations
const MOCK_INTEGRATIONS = {
  api: [
    { id: "fhir", name: "FHIR API", connected: true, endpoint: "https://fhir.example.org/api/v1" },
    { id: "hl7", name: "HL7 Interface", connected: false, endpoint: "https://hl7.example.org" },
    { id: "rest", name: "Custom REST API", connected: true, endpoint: "https://api.example.org/v2" },
  ],
  communication: [
    { id: "twilio", name: "Twilio SMS", connected: true, endpoint: "https://api.twilio.com" },
    { id: "whatsapp", name: "WhatsApp Business", connected: false, endpoint: "https://graph.facebook.com" },
    { id: "email", name: "Email Service", connected: true, endpoint: "https://api.sendgrid.com" },
  ],
  payment: [
    { id: "stripe", name: "Stripe", connected: true, endpoint: "https://api.stripe.com" },
    { id: "paypal", name: "PayPal", connected: false, endpoint: "https://api.paypal.com" },
    { id: "sadad", name: "SADAD", connected: true, endpoint: "https://api.sadad.com" },
  ],
  auth: [
    { id: "oauth", name: "OAuth2 Provider", connected: true, endpoint: "https://auth.example.org" },
    { id: "sso", name: "Single Sign-On", connected: false, endpoint: "https://sso.example.org" },
    { id: "nationalid", name: "National ID (Absher)", connected: true, endpoint: "https://api.absher.sa" },
  ],
  storage: [
    { id: "supabase", name: "Supabase Storage", connected: true, endpoint: "https://supabase.co" },
    { id: "s3", name: "AWS S3", connected: false, endpoint: "https://s3.amazonaws.com" },
    { id: "dropbox", name: "Dropbox", connected: true, endpoint: "https://api.dropbox.com" },
  ],
  analytics: [
    { id: "redash", name: "Redash", connected: true, endpoint: "https://redash.example.org" },
    { id: "metabase", name: "Metabase", connected: false, endpoint: "https://metabase.example.org" },
    { id: "ga", name: "Google Analytics", connected: true, endpoint: "https://analytics.google.com" },
  ],
  ai: [
    { id: "openai", name: "OpenAI", connected: true, endpoint: "https://api.openai.com" },
    { id: "huggingface", name: "Hugging Face", connected: false, endpoint: "https://api.huggingface.co" },
    { id: "customai", name: "Custom AI Model", connected: true, endpoint: "https://ai.example.org" },
  ],
  meetings: [
    { id: "zoom", name: "Zoom", connected: true, endpoint: "https://api.zoom.us" },
    { id: "teams", name: "Microsoft Teams", connected: false, endpoint: "https://graph.microsoft.com" },
    { id: "jitsi", name: "Jitsi Meet", connected: true, endpoint: "https://meet.jit.si" },
  ],
};

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(MOCK_INTEGRATIONS[category as keyof typeof MOCK_INTEGRATIONS] || []);
  const [showLogsFor, setShowLogsFor] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setIntegrations(integrations.map((integration) => {
      if (integration.id === id) {
        const newStatus = !integration.id;
        toast({
          title: `Integration ${newStatus ? 'Enabled' : 'Disabled'}`,
          description: `${integration.name} has been ${newStatus ? 'enabled' : 'disabled'}.`,
        });
        return { ...integration, connected: !integration.connected };
      }
      return integration;
    }));
  };

  const handleTestConnection = (id: string, name: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${name}...`,
    });
    
    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${name}.`,
      });
    }, 1500);
  };

  const handleViewLogs = (id: string) => {
    setShowLogsFor(id === showLogsFor ? null : id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title} Integrations</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id}>
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
                      onCheckedChange={() => handleToggle(integration.id)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleTestConnection(integration.id, integration.name)}
                    >
                      Test
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleViewLogs(integration.id)}
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
                
                {showLogsFor === integration.id && (
                  <IntegrationLogs integrationName={integration.name} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
