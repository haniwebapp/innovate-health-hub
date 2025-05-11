
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AdminAnalyticsDashboard() {
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-analytics');
      
      if (error) throw error;
      
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        variant: "destructive",
        title: "Error loading analytics",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-moh-green h-12 w-12"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Format system health data for display
  const healthStatusData = analyticsData?.systemHealth || [];
  
  // Create dummy data for demonstration if needed
  const sampleUserActivityData = [
    { month: 'Jan', users: 42 },
    { month: 'Feb', users: 53 },
    { month: 'Mar', users: 69 },
    { month: 'Apr', users: 78 },
    { month: 'May', users: 92 },
    { month: 'Jun', users: 85 },
  ];
  
  const sampleEngagementData = [
    { name: 'Dashboard Views', value: 45 },
    { name: 'Challenge Submissions', value: 23 },
    { name: 'Resources Accessed', value: 38 },
    { name: 'Success Stories Read', value: 17 },
    { name: 'Event Registrations', value: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-moh-green" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthStatusData.length > 0 ? (
                healthStatusData.map((service: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {service.status === 'operational' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : service.status === 'degraded' ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="text-sm">{service.service}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status === 'operational' ? 'Operational' :
                       service.status === 'degraded' ? 'Degraded' : 'Down'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-4">
                  <span className="text-muted-foreground text-sm">No health data available</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-moh-green" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData?.userActivity ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Average Logins</p>
                  <p className="text-2xl font-bold">{analyticsData.userActivity.averageLogins.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Submissions</p>
                  <p className="text-2xl font-bold">{analyticsData.userActivity.averageSubmissions.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Resource Views</p>
                  <p className="text-2xl font-bold">{analyticsData.userActivity.averageResourceViews.toFixed(1)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <span className="text-muted-foreground text-sm">No activity data available</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Platform Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Users</p>
                  <p className="text-xl font-bold">132</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Submissions</p>
                  <p className="text-xl font-bold">287</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Success Stories</p>
                  <p className="text-xl font-bold">24</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Active Events</p>
                  <p className="text-xl font-bold">7</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Data</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleUserActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Distribution of users by type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Healthcare Providers', value: 45 },
                      { name: 'Researchers', value: 25 },
                      { name: 'Administrators', value: 15 },
                      { name: 'Innovators', value: 35 },
                      { name: 'Others', value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sampleEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Platform Engagement</CardTitle>
              <CardDescription>Activity breakdown by feature</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Clinical Tab */}
        <TabsContent value="clinical" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Clinical Records Distribution</CardTitle>
              <CardDescription>Distribution by record type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Clinical data analytics will be available in future update
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
