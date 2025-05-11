
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, RefreshCw, ExternalLink, Code, Plug } from "lucide-react";

export default function AIIntegrationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  const integrations = [
    { id: 1, name: "OpenAI", type: "API", status: "Connected", description: "Natural language processing and generation" },
    { id: 2, name: "Google Cloud AI", type: "Cloud Service", status: "Connected", description: "Suite of machine learning tools and APIs" },
    { id: 3, name: "Hugging Face", type: "Library", status: "Available", description: "Open-source models and inference APIs" },
    { id: 4, name: "AWS Comprehend", type: "API", status: "Connected", description: "Natural language processing service" },
    { id: 5, name: "TensorFlow", type: "Framework", status: "Available", description: "Open source machine learning framework" },
  ];
  
  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Integrations</h2>
          <p className="text-muted-foreground">Connect and manage AI service integrations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="installed">
        <TabsList>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="custom">Custom Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="installed" className="space-y-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-sm mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search integrations..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIntegrations.map(integration => (
              <Card key={integration.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{integration.name}</CardTitle>
                    <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                      {integration.status}
                    </Badge>
                  </div>
                  <CardDescription>{integration.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    API Docs
                  </Button>
                  <Button size="sm">
                    {integration.status === "Connected" ? "Configure" : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available">
          <div className="rounded-lg border bg-card">
            <div className="p-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Plug className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Discover AI Integrations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse the marketplace for available AI integrations and services.
              </p>
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Marketplace
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom AI Integration</CardTitle>
              <CardDescription>
                Create a custom integration with your AI service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Integration Name</label>
                <Input placeholder="Enter integration name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Endpoint</label>
                <Input placeholder="https://api.example.com/v1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Authentication Type</label>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">API Key</Button>
                  <Button variant="outline" className="flex-1">OAuth</Button>
                  <Button variant="outline" className="flex-1">No Auth</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Create Integration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
