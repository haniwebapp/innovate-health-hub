
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RefreshCw, Download } from "lucide-react";

export default function AIAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Analytics</h2>
          <p className="text-muted-foreground">Track AI service performance and usage</p>
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* AI Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,624</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">-12ms from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>AI services performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="usage">
            <TabsList className="mb-4">
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="latency">Latency</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Usage chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="latency" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Latency chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="errors" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Errors chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="costs" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Costs chart would appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Service-Specific Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service-Specific Analytics</CardTitle>
          <CardDescription>Performance metrics by AI service</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="investment">
            <TabsList className="mb-4">
              <TabsTrigger value="investment">Investment AI</TabsTrigger>
              <TabsTrigger value="regulatory">Regulatory AI</TabsTrigger>
              <TabsTrigger value="innovation">Innovation AI</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge AI</TabsTrigger>
              <TabsTrigger value="policy">Policy AI</TabsTrigger>
            </TabsList>
            
            <TabsContent value="investment" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">84,251 calls</div>
                    <p className="text-xs text-muted-foreground">+12.4% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">312ms</div>
                    <p className="text-xs text-muted-foreground">-8ms from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">99.2%</div>
                    <p className="text-xs text-muted-foreground">+0.1% from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="h-64 w-full bg-slate-50 rounded-md flex items-center justify-center">
                <p className="text-slate-400 text-center">Investment AI performance chart would appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="regulatory" className="h-96 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Regulatory AI analytics would appear here</p>
            </TabsContent>
            
            <TabsContent value="innovation" className="h-96 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Innovation AI analytics would appear here</p>
            </TabsContent>
            
            <TabsContent value="knowledge" className="h-96 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Knowledge AI analytics would appear here</p>
            </TabsContent>
            
            <TabsContent value="policy" className="h-96 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Policy AI analytics would appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
