
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ChartBar, 
  ChartPie, 
  Download, 
  Shield, 
  CheckSquare
} from "lucide-react";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment/Vision2030AlignmentChecker";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";

export default function PolicyPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Health Policy & Strategy</h1>
        <Button variant="outline" className="hidden md:flex">
          <Download className="mr-2 h-4 w-4" /> Export Policy Insights
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vision-2030">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Policy Documents
                </CardTitle>
                <CardDescription>Healthcare policy guides</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">No policy documents found</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ChartPie className="h-5 w-5 mr-2 text-green-500" />
                  Vision 2030 Alignment
                </CardTitle>
                <CardDescription>Alignment metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Vision 2030 alignment data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-amber-500" />
                  Compliance Status
                </CardTitle>
                <CardDescription>Policy compliance check</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Compliance status will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ChartBar className="h-5 w-5 mr-2 text-purple-500" />
                Strategy Gap Analysis
              </CardTitle>
              <CardDescription>Current strategy gaps and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Strategy gap analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision-2030">
          <Vision2030AlignmentChecker />
        </TabsContent>

        <TabsContent value="strategy">
          <div className="space-y-6">
            <StrategyAnalytics />
            <StrategyGapAnalyzer />
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
              <CardDescription>Monitor your innovation's compliance with healthcare regulations</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <CheckSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Compliance dashboard will be implemented in Phase 3.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
