
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, FileSpreadsheet, BarChart, Calendar, UserRound, Activity } from 'lucide-react';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const handleGenerateReport = (reportType: string) => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: `${reportType} report has been generated successfully.`,
      });
    }, 2000);
  };
  
  return (
    <AdminLayout
      title="Reports Dashboard"
      description="Generate and manage system reports"
    >
      <Tabs defaultValue="analytics" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Reports</TabsTrigger>
          <TabsTrigger value="innovations">Innovation Reports</TabsTrigger>
          <TabsTrigger value="system">System Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard
              title="Usage Analytics"
              description="Comprehensive platform usage statistics"
              icon={<BarChart className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Usage Analytics")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="Monthly Performance"
              description="Performance metrics for the current month"
              icon={<Activity className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Monthly Performance")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="Quarterly Statistics"
              description="Key statistics for the current quarter"
              icon={<FileSpreadsheet className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Quarterly Statistics")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="Yearly Summary"
              description="Annual report summarizing all platform activities"
              icon={<Calendar className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Yearly Summary")}
              isGenerating={isGenerating}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard
              title="User Activity"
              description="Detailed user activity and engagement report"
              icon={<UserRound className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("User Activity")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="New Registrations"
              description="Report on new user registrations and onboarding"
              icon={<UserRound className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("New Registrations")}
              isGenerating={isGenerating}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="innovations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard
              title="Innovation Submissions"
              description="Report on new innovation submissions"
              icon={<FileSpreadsheet className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Innovation Submissions")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="Innovation Performance"
              description="Performance metrics for innovations"
              icon={<BarChart className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Innovation Performance")}
              isGenerating={isGenerating}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard
              title="Error Logs"
              description="System error logs and exceptions"
              icon={<FileSpreadsheet className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Error Logs")}
              isGenerating={isGenerating}
            />
            
            <ReportCard
              title="Performance Metrics"
              description="System performance and resource utilization"
              icon={<Activity className="h-5 w-5" />}
              onGenerate={() => handleGenerateReport("Performance Metrics")}
              isGenerating={isGenerating}
            />
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onGenerate: () => void;
  isGenerating: boolean;
}

function ReportCard({ title, description, icon, onGenerate, isGenerating }: ReportCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-moh-green/10">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Last generated: <span className="font-medium">Never</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            <Download className="h-4 w-4" />
            <span>Generate</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
