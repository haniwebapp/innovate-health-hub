
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    loadReportData('overview');
  }, []);

  const loadReportData = (reportType: string) => {
    setIsLoading(true);
    
    // Simulate API call to fetch report data
    const loadPromise = new Promise<void>((resolve) => {
      // In a real implementation, this would be an API call
      setTimeout(() => {
        const mockData = generateMockData(reportType);
        setReportData(mockData);
        resolve();
      }, 1500);
    });

    toast.promise(loadPromise, {
      loading: 'Loading report data...',
      success: 'Report data loaded!',
      error: 'Failed to load report data',
    });
    
    // Handle loading state separately
    loadPromise.then(() => {
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    loadReportData(value);
  };

  const generateMockData = (reportType: string) => {
    switch (reportType) {
      case 'overview':
        return {
          title: 'Platform Overview Report',
          metrics: {
            totalUsers: 1245,
            activeUsers: 892,
            totalInnovations: 87,
            activeChallenges: 12,
          },
        };
      case 'user':
        return {
          title: 'User Activity Report',
          metrics: {
            newUsers: 85,
            returningUsers: 420,
            averageSessionTime: '12m 30s',
            topUserLocations: ['Riyadh', 'Jeddah', 'Dammam'],
          },
        };
      case 'innovation':
        return {
          title: 'Innovation Metrics Report',
          metrics: {
            submissionRate: '23%',
            approvalRate: '68%',
            averageProcessingTime: '8 days',
            topCategories: ['Digital Health', 'Medical Devices', 'Healthcare AI'],
          },
        };
      default:
        return null;
    }
  };

  const generateDownloadReport = () => {
    toast({
      title: "Report generation started",
      description: "Your report will be ready for download shortly.",
    });
    // In a real implementation, this would generate and download a PDF or Excel file
  };

  return (
    <AdminLayout
      title="Reports & Analytics"
      description="Generate and view platform reports"
      actions={
        <Button onClick={generateDownloadReport} disabled={isLoading}>
          Export to Excel
        </Button>
      }
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            Platform Overview
          </TabsTrigger>
          <TabsTrigger value="user">
            <LineChart className="h-4 w-4 mr-2" />
            User Activity
          </TabsTrigger>
          <TabsTrigger value="innovation">
            <PieChart className="h-4 w-4 mr-2" />
            Innovation Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              </CardContent>
            </Card>
          ) : reportData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{reportData.title}</CardTitle>
                  <CardDescription>
                    Summary of key platform metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary">{reportData.metrics.totalUsers}</h3>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary">{reportData.metrics.activeUsers}</h3>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary">{reportData.metrics.totalInnovations}</h3>
                      <p className="text-sm text-muted-foreground">Total Innovations</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary">{reportData.metrics.activeChallenges}</h3>
                      <p className="text-sm text-muted-foreground">Active Challenges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted text-muted-foreground">
                      Chart visualization placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted text-muted-foreground">
                      Chart visualization placeholder
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="user" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              </CardContent>
            </Card>
          ) : reportData && (
            <Card>
              <CardHeader>
                <CardTitle>{reportData.title}</CardTitle>
                <CardDescription>User engagement and activity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.newUsers}</h3>
                    <p className="text-sm text-muted-foreground">New Users</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.returningUsers}</h3>
                    <p className="text-sm text-muted-foreground">Returning Users</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.averageSessionTime}</h3>
                    <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.topUserLocations[0]}</h3>
                    <p className="text-sm text-muted-foreground">Top Location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="innovation" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              </CardContent>
            </Card>
          ) : reportData && (
            <Card>
              <CardHeader>
                <CardTitle>{reportData.title}</CardTitle>
                <CardDescription>Innovation submission and processing metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.submissionRate}</h3>
                    <p className="text-sm text-muted-foreground">Submission Rate</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.approvalRate}</h3>
                    <p className="text-sm text-muted-foreground">Approval Rate</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.averageProcessingTime}</h3>
                    <p className="text-sm text-muted-foreground">Processing Time</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary">{reportData.metrics.topCategories.length}</h3>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
