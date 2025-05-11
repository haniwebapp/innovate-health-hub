
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Database, ChevronRight } from "lucide-react";

export default function AIModelsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  // Mock models data
  const models = [
    { id: 1, name: "Healthcare Diagnosis Assistant", type: "NLP", version: "1.2", status: "Active", accuracy: "94.5%" },
    { id: 2, name: "Medical Image Analyzer", type: "Computer Vision", version: "2.1", status: "Active", accuracy: "96.8%" },
    { id: 3, name: "Patient Risk Assessment", type: "Predictive", version: "0.9", status: "Beta", accuracy: "88.2%" },
    { id: 4, name: "Healthcare Data Anonymizer", type: "NLP", version: "3.0", status: "Active", accuracy: "99.1%" },
    { id: 5, name: "Treatment Recommendation Engine", type: "Decision Support", version: "1.5", status: "Active", accuracy: "91.7%" },
  ];
  
  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
            <Database className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative w-full max-w-sm mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search models..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* AI Models List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredModels.map(model => (
          <Card key={model.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50 pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>Version {model.version}</CardDescription>
                </div>
                <Badge variant={model.status === "Active" ? "default" : "secondary"}>
                  {model.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Model Type</p>
                  <p className="font-medium">{model.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                  <p className="font-medium">{model.accuracy}</p>
                </div>
                <div className="flex justify-end items-center">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Model Efficiency</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
