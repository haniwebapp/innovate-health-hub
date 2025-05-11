
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function PlatformAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("7d");

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Mock data for charts
  const usageData = [
    { name: "Mon", users: 400, pageViews: 2400, apiCalls: 1800 },
    { name: "Tue", users: 300, pageViews: 1398, apiCalls: 2800 },
    { name: "Wed", users: 500, pageViews: 9800, apiCalls: 3200 },
    { name: "Thu", users: 450, pageViews: 3908, apiCalls: 2900 },
    { name: "Fri", users: 370, pageViews: 4800, apiCalls: 2300 },
    { name: "Sat", users: 200, pageViews: 3800, apiCalls: 1500 },
    { name: "Sun", users: 180, pageViews: 4300, apiCalls: 1400 },
  ];

  const featureUsageData = [
    { name: "Authentication", value: 4000 },
    { name: "Dashboard", value: 3000 },
    { name: "Forms", value: 2000 },
    { name: "Reports", value: 2780 },
    { name: "Admin", value: 1890 },
    { name: "Settings", value: 2390 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Analytics</h2>
          <p className="text-muted-foreground">Track platform performance and usage metrics</p>
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
      
      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Trends</CardTitle>
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="apiCalls" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureUsageData}
                    margin={{
                      top: 5,
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
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Performance metrics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">User analytics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
