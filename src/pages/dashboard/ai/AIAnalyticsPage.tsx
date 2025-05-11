
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function AIAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("usage");

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Mock data for usage chart
  const usageData = [
    { date: "11/20", calls: 1200, processing: 720, errors: 80 },
    { date: "11/21", calls: 1800, processing: 940, errors: 65 },
    { date: "11/22", calls: 1600, processing: 890, errors: 45 },
    { date: "11/23", calls: 2400, processing: 1100, errors: 90 },
    { date: "11/24", calls: 2200, processing: 1050, errors: 70 },
    { date: "11/25", calls: 1900, processing: 980, errors: 55 },
    { date: "11/26", calls: 2800, processing: 1300, errors: 100 },
  ];

  // Mock data for model usage chart
  const modelUsageData = [
    { name: "GPT-4", value: 4200 },
    { name: "Claude", value: 3100 },
    { name: "Custom ML", value: 2400 },
    { name: "Vision AI", value: 1800 },
    { name: "Other", value: 950 },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Mock data for accuracy chart
  const accuracyData = [
    { name: "Investment", initial: 80, current: 92 },
    { name: "Regulatory", initial: 75, current: 96 },
    { name: "Innovation", initial: 72, current: 88 },
    { name: "Knowledge", initial: 82, current: 94 },
    { name: "Policy", initial: 78, current: 91 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Analytics</h2>
          <p className="text-muted-foreground">Performance metrics and usage statistics for AI services</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={dateRange === "7d" ? "default" : "ghost"} 
              className="rounded-none"
              onClick={() => setDateRange("7d")}
            >
              7D
            </Button>
            <Button
              variant={dateRange === "30d" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setDateRange("30d")}
            >
              30D
            </Button>
            <Button
              variant={dateRange === "90d" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setDateRange("90d")}
            >
              90D
            </Button>
          </div>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="models">Model Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI API Calls Over Time</CardTitle>
              <CardDescription>Total API calls, processing time, and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={usageData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calls" stroke="#8884d8" strokeWidth={2} name="API Calls" />
                    <Line type="monotone" dataKey="processing" stroke="#82ca9d" strokeWidth={2} name="Processing Time (ms)" />
                    <Line type="monotone" dataKey="errors" stroke="#ff7300" strokeWidth={2} name="Errors" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Usage Distribution</CardTitle>
                <CardDescription>API calls by model type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modelUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {modelUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Usage Statistics</CardTitle>
                <CardDescription>Top AI services by usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total API Calls</span>
                    <span className="text-sm font-medium">12,452</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-sm font-medium">213ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tokens Processed</span>
                    <span className="text-sm font-medium">1.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Unique Users</span>
                    <span className="text-sm font-medium">246</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Accuracy Improvement</CardTitle>
              <CardDescription>Initial vs current model accuracy for each service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={accuracyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="initial" name="Initial Accuracy (%)" fill="#8884d8" />
                    <Bar dataKey="current" name="Current Accuracy (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for AI services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Performance metrics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Analytics</CardTitle>
              <CardDescription>Detailed performance metrics for individual models</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Model analytics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Insights derived from AI usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">AI insights will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
