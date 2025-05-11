
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Search, Plus, Plug2 } from "lucide-react";
import IntegrationAIAssistant from "@/components/ai/IntegrationAIAssistant";

export default function AIIntegrationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Mock AI integrations data
  const integrations = [
    { id: 1, name: "OpenAI GPT-4", type: "Language Model", status: "Connected", lastSync: "2 hours ago", usageCount: 1245 },
    { id: 2, name: "HuggingFace", type: "Model Hub", status: "Connected", lastSync: "1 day ago", usageCount: 429 },
    { id: 3, name: "AWS SageMaker", type: "Model Hosting", status: "Not Connected", lastSync: "Never", usageCount: 0 },
    { id: 4, name: "Azure Cognitive Services", type: "AI Services", status: "Connected", lastSync: "4 hours ago", usageCount: 892 },
    { id: 5, name: "Google Vertex AI", type: "AI Platform", status: "Connected", lastSync: "12 hours ago", usageCount: 673 },
    { id: 6, name: "Anthropic Claude", type: "Language Model", status: "Not Connected", lastSync: "Never", usageCount: 0 },
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.type.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'connected') return matchesSearch && integration.status === 'Connected';
    if (activeTab === 'not-connected') return matchesSearch && integration.status === 'Not Connected';
    
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Integrations</h2>
          <p className="text-muted-foreground">Connect and manage external AI services</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
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

      {/* AI Assistant */}
      {showAIAssistant && <IntegrationAIAssistant />}

      {/* Search Bar and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Integrations</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="not-connected">Not Connected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Integrations List */}
      <Card>
        <CardHeader>
          <CardTitle>AI Service Integrations</CardTitle>
          <CardDescription>External AI services and APIs connected to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Synced</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIntegrations.map(integration => (
                  <tr key={integration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Plug2 className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{integration.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <IntegrationStatusBadge status={integration.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{integration.lastSync}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{integration.usageCount.toLocaleString()} calls</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {integration.status === "Connected" ? (
                        <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                      ) : (
                        <Button variant="outline" size="sm" className="mr-2">Connect</Button>
                      )}
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IntegrationStatusBadge({ status }: { status: string }) {
  let className;
  
  switch (status) {
    case 'Connected':
      className = "bg-green-100 text-green-800";
      break;
    case 'Not Connected':
      className = "bg-gray-100 text-gray-800";
      break;
    case 'Error':
      className = "bg-red-100 text-red-800";
      break;
    default:
      className = "bg-gray-100 text-gray-800";
  }
  
  return (
    <Badge variant="outline" className={`${className} font-medium`}>
      {status}
    </Badge>
  );
}
