
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <AdminLayout
      title="Analytics & Reports"
      description="View and generate platform analytics reports"
    >
      <div className="flex justify-end mb-6">
        <Button variant="outline" className="mr-2">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button>Generate Report</Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Analytics charts will be implemented in Phase 3</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                  Monthly Innovations
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Analytics charts will be implemented in Phase 3</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-amber-500" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Analytics charts will be implemented in Phase 3</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                  Challenge Submissions
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Analytics charts will be implemented in Phase 3</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed user growth and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">User analytics will be implemented in Phase 3.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Platform usage and interaction data</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Engagement metrics will be implemented in Phase 3.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="innovations">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Analytics</CardTitle>
              <CardDescription>Track innovation submissions and trends</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Innovation analytics will be implemented in Phase 3.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
