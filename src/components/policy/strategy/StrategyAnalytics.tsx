
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  implementationProgress: {
    overall: number;
    sectors: { name: string; progress: number }[];
  };
  resourceAllocation: {
    sectors: { name: string; percentage: number; color: string }[];
  };
  risks: {
    items: { title: string; description: string; impact: string; level: string }[];
    mitigationRate: number;
  };
}

// Sample analytics data
const sampleData: AnalyticsData = {
  implementationProgress: {
    overall: 78,
    sectors: [
      { name: "Digital Health", progress: 92 },
      { name: "Telehealth", progress: 85 },
      { name: "Rural Healthcare", progress: 64 },
    ]
  },
  resourceAllocation: {
    sectors: [
      { name: "Digital Transformation", percentage: 42, color: "bg-moh-green" },
      { name: "Healthcare Access", percentage: 28, color: "bg-amber-500" },
      { name: "Medical Research", percentage: 18, color: "bg-blue-500" },
      { name: "Workforce Development", percentage: 12, color: "bg-rose-500" },
    ]
  },
  risks: {
    items: [
      { title: "Resource Allocation Gap", description: "Rural healthcare initiatives underfunded", impact: "Medium", level: "amber" },
      { title: "Implementation Timeline", description: "Telehealth regulation delays", impact: "High", level: "rose" },
      { title: "Stakeholder Alignment", description: "Private sector engagement improving", impact: "Positive", level: "green" },
    ],
    mitigationRate: 72
  }
};

export const StrategyAnalytics = () => {
  const [timeframe, setTimeframe] = useState("quarterly");
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      // In a real app, you would fetch data from an API
      try {
        // Simulating API call with timeout
        setTimeout(() => {
          setAnalyticsData(sampleData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast({
          title: "Error Loading Analytics",
          description: "Failed to load strategy analytics data. Please try again later.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeframe, toast]);

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your analytics report is being generated and will be available shortly.",
    });
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-moh-darkGreen flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-moh-green" />
            Healthcare Strategy Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 text-moh-green animate-spin mb-4" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-moh-darkGreen flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-moh-green" />
            Healthcare Strategy Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-8 w-8 text-amber-500 mb-4" />
          <p className="text-muted-foreground">No analytics data available</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>Retry Loading Data</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-moh-darkGreen flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-moh-green" />
          Healthcare Strategy Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="border-moh-green/10 bg-moh-lightGreen/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">Implementation Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-moh-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-moh-darkGreen">{analyticsData.implementationProgress.overall}%</div>
              <p className="text-xs text-muted-foreground">+12% from previous period</p>
              
              <div className="mt-4 space-y-2">
                {analyticsData.implementationProgress.sectors.map((sector, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{sector.name}</span>
                      <span className="font-medium">{sector.progress}%</span>
                    </div>
                    <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                      <div className="bg-moh-green h-2 rounded-full" style={{ width: `${sector.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-moh-green/10 bg-moh-lightGreen/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
                <PieChart className="h-4 w-4 text-moh-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full flex items-center justify-center text-sm text-muted-foreground">
                <p>Resource allocation chart placeholder</p>
              </div>
              
              <div className="mt-2 space-y-2">
                {analyticsData.resourceAllocation.sectors.map((sector, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                    <span className="text-xs">{sector.name}: {sector.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-moh-green/10 bg-moh-lightGreen/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">Strategic Risk Analysis</CardTitle>
                <AlertCircle className="h-4 w-4 text-moh-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.risks.items.map((risk, index) => (
                  <div 
                    key={index} 
                    className={`p-2 ${
                      risk.level === 'amber' ? 'bg-amber-50 border border-amber-200' :
                      risk.level === 'rose' ? 'bg-rose-50 border border-rose-200' :
                      'bg-moh-lightGreen/50 border border-moh-green/20'
                    } rounded-md`}
                  >
                    <p className={`text-sm font-medium ${
                      risk.level === 'amber' ? 'text-amber-800' :
                      risk.level === 'rose' ? 'text-rose-800' :
                      'text-moh-darkGreen'
                    }`}>{risk.title}</p>
                    <p className="text-xs text-muted-foreground">{risk.description}</p>
                    <p className={`text-xs font-medium mt-1 ${
                      risk.level === 'amber' ? 'text-amber-800' :
                      risk.level === 'rose' ? 'text-rose-800' :
                      'text-moh-darkGreen'
                    }`}>Impact: {risk.impact}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Risk mitigation rate</span>
                <span className="text-xs font-medium">{analyticsData.risks.mitigationRate}%</span>
              </div>
              <div className="w-full bg-moh-lightGreen/30 rounded-full h-1.5 mt-1">
                <div className="bg-moh-green h-1.5 rounded-full" style={{ width: `${analyticsData.risks.mitigationRate}%` }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <TabsContent value="monthly" className="mt-0">
          <div className="h-60 w-full bg-moh-lightGreen/10 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Monthly analytics chart placeholder</p>
          </div>
        </TabsContent>
        
        <TabsContent value="quarterly" className="mt-0">
          <div className="h-60 w-full bg-moh-lightGreen/10 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Quarterly analytics chart placeholder</p>
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="mt-0">
          <div className="h-60 w-full bg-moh-lightGreen/10 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Yearly analytics chart placeholder</p>
          </div>
        </TabsContent>
        
        <Button className="w-full" onClick={handleGenerateReport}>Generate Full Analytics Report</Button>
      </CardContent>
    </Card>
  );
};
