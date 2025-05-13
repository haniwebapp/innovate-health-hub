
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, AlertTriangle, CheckCircle, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Mock data - in a real app, this would come from an API
const performanceData = [
  { name: "Admin Assistant", avgResponseTime: 850, successRate: 96, callVolume: 1245 },
  { name: "Compliance Matcher", avgResponseTime: 420, successRate: 98, callVolume: 890 },
  { name: "Regulatory Analysis", avgResponseTime: 1200, successRate: 94, callVolume: 560 },
  { name: "Ethics Assessment", avgResponseTime: 680, successRate: 97, callVolume: 720 },
  { name: "Market Analysis", avgResponseTime: 950, successRate: 95, callVolume: 450 },
];

const usageData = [
  { month: "Jan", apiCalls: 4500, uniqueUsers: 320 },
  { month: "Feb", apiCalls: 5200, uniqueUsers: 350 },
  { month: "Mar", apiCalls: 6800, uniqueUsers: 410 },
  { month: "Apr", apiCalls: 7400, uniqueUsers: 480 },
  { month: "May", apiCalls: 9200, uniqueUsers: 520 },
  { month: "Jun", apiCalls: 8700, uniqueUsers: 490 },
];

export default function ReportsPage() {
  const [timeFrame, setTimeFrame] = useState("30days");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDownloadReport = () => {
    setIsLoading(true);
    
    // Fix: Create a promise first, then use toast.promise, then handle completion separately
    const downloadPromise = new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.promise(downloadPromise, {
      loading: "Generating report...",
      success: "Report downloaded successfully",
      error: "Failed to generate report",
    });
    
    // Handle the loading state separately
    downloadPromise.then(() => {
      setIsLoading(false);
    });
  };

  return (
    <AdminLayout 
      title="AI Performance Reports" 
      description="Monitor and analyze AI service performance metrics"
      actions={
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleDownloadReport}
          disabled={isLoading}
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xl font-medium">AI Services Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Performance metrics across all AI services and edge functions
            </p>
          </div>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">API Calls</CardTitle>
              <CardDescription>Total API calls across all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-moh-green">42,680</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">↑ 18.2%</span> compared to previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Success Rate</CardTitle>
              <CardDescription>Average success rate across all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-moh-green">96.4%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">↑ 1.2%</span> compared to previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg Response Time</CardTitle>
              <CardDescription>Average response time in milliseconds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-moh-green">820ms</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">↓ 15.3%</span> compared to previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Service Performance</CardTitle>
                <CardDescription>
                  Response time and success rate by service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="avgResponseTime" name="Avg Response Time (ms)" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="successRate" name="Success Rate (%)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Usage Trends</CardTitle>
                <CardDescription>
                  API calls and unique users by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="apiCalls" name="API Calls" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="uniqueUsers" name="Unique Users" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="errors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Analysis</CardTitle>
                <CardDescription>
                  Top errors and their frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      error: "Rate limit exceeded",
                      count: 215,
                      service: "Admin Assistant",
                      impact: "Medium"
                    },
                    {
                      error: "Context length exceeded",
                      count: 187,
                      service: "Regulatory Analysis",
                      impact: "High"
                    },
                    {
                      error: "Timeout during processing",
                      count: 142,
                      service: "Market Analysis",
                      impact: "Medium"
                    },
                    {
                      error: "Invalid input format",
                      count: 98,
                      service: "Ethics Assessment",
                      impact: "Low"
                    },
                    {
                      error: "Service temporarily unavailable",
                      count: 76,
                      service: "Multiple services",
                      impact: "High"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                          item.impact === "High" ? "text-red-500" : 
                          item.impact === "Medium" ? "text-amber-500" : "text-blue-500"
                        }`} />
                        <div>
                          <p className="font-medium">{item.error}</p>
                          <p className="text-sm text-muted-foreground">
                            Service: {item.service} • Impact: {item.impact}
                          </p>
                        </div>
                      </div>
                      <div className="text-xl font-bold">{item.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
