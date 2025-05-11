
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Search, Plus } from "lucide-react";

export default function AIModelsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Mock AI models data
  const models = [
    { id: 1, name: "Investment Matcher", category: "Investment", status: "Active", version: "1.2.4", accuracy: 92, lastUpdated: "2023-10-12" },
    { id: 2, name: "Regulatory Compliance", category: "Regulatory", status: "Active", version: "2.0.1", accuracy: 96, lastUpdated: "2023-11-05" },
    { id: 3, name: "Innovation Scorer", category: "Innovation", status: "Training", version: "0.9.8", accuracy: 88, lastUpdated: "2023-11-20" },
    { id: 4, name: "Knowledge Extractor", category: "Knowledge", status: "Active", version: "1.5.2", accuracy: 94, lastUpdated: "2023-10-28" },
    { id: 5, name: "Policy Impact Simulator", category: "Policy", status: "Active", version: "1.3.7", accuracy: 91, lastUpdated: "2023-11-15" },
    { id: 6, name: "Market Trend Analyzer", category: "Investment", status: "Testing", version: "0.8.5", accuracy: 85, lastUpdated: "2023-11-22" },
  ];

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.version.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && model.status === 'Active';
    if (activeTab === 'training') return matchesSearch && model.status === 'Training';
    if (activeTab === 'testing') return matchesSearch && model.status === 'Testing';
    
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
          <p className="text-muted-foreground">Manage and monitor AI models</p>
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
            Add Model
          </Button>
        </div>
      </div>

      {/* Search Bar and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search models..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Models List */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models</CardTitle>
          <CardDescription>Current models and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModels.map(model => (
                  <tr key={model.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ModelStatusBadge status={model.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.version}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Progress value={model.accuracy} className="w-24" />
                        <span className="text-sm">{model.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm" className="mr-2">Train</Button>
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

function ModelStatusBadge({ status }: { status: string }) {
  let className;
  
  switch (status) {
    case 'Active':
      className = "bg-green-100 text-green-800";
      break;
    case 'Training':
      className = "bg-blue-100 text-blue-800";
      break;
    case 'Testing':
      className = "bg-yellow-100 text-yellow-800";
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
