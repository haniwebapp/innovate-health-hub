
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, FileText, RefreshCw } from "lucide-react";
import AdminLayout from '@/components/layouts/AdminLayout';

const ReportsPage = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AdminLayout title="Reports" description="Generate and view system reports">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Reports Dashboard</h2>
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileBarChart className="mr-2 h-4 w-4" />
                Generate New Report
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList>
            <TabsTrigger value="analytics">Analytics Reports</TabsTrigger>
            <TabsTrigger value="usage">Usage Reports</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
            <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="User Activity Report" 
                description="User engagement and activity statistics"
                date="Generated May 2, 2025"
              />
              <ReportCard 
                title="Innovation Metrics" 
                description="Track innovation submissions and approvals"
                date="Generated May 1, 2025"
              />
              <ReportCard 
                title="Challenge Performance" 
                description="Challenge participation and completion stats"
                date="Generated April 28, 2025"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Platform Usage" 
                description="Daily and monthly active users"
                date="Generated May 2, 2025"
              />
              <ReportCard 
                title="Resource Downloads" 
                description="Knowledge resource utilization"
                date="Generated May 1, 2025"
              />
              <ReportCard 
                title="Feature Adoption" 
                description="Feature usage across user segments"
                date="Generated April 29, 2025"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Regulatory Compliance" 
                description="Regulatory compliance status"
                date="Generated May 1, 2025"
              />
              <ReportCard 
                title="Data Privacy Audit" 
                description="GDPR and data protection compliance"
                date="Generated April 25, 2025"
              />
              <ReportCard 
                title="Security Posture" 
                description="Platform security assessment"
                date="Generated April 20, 2025"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Investment Overview" 
                description="Investment allocation and performance"
                date="Generated May 2, 2025"
              />
              <ReportCard 
                title="Budget Utilization" 
                description="Program budget tracking"
                date="Generated May 1, 2025"
              />
              <ReportCard 
                title="ROI Analysis" 
                description="Return on innovation investments"
                date="Generated April 27, 2025"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  date: string;
}

const ReportCard = ({ title, description, date }: ReportCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">{date}</div>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="flex gap-1">
            <FileText className="h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsPage;
