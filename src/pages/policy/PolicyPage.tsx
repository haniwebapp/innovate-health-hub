
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, FileCheck, LineChart, ArrowRight } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("vision2030");
  
  return (
    <>
      <Navbar />
      <main className="py-8 px-4 container mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-moh-darkGreen mb-2">Healthcare Policy & Strategy</h1>
              <p className="text-muted-foreground max-w-3xl">
                Leverage AI-powered tools to analyze healthcare policies, identify strategic gaps, and ensure alignment with Saudi Vision 2030 goals.
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="bg-gradient-to-r from-moh-green/10 to-moh-lightGreen/20 text-moh-darkGreen border-moh-green/20"
            >
              <Brain className="h-4 w-4 mr-2 text-moh-gold" />
              AI-Powered Analysis
            </Badge>
          </div>
          
          <Card className="bg-gradient-to-r from-moh-lightGreen to-moh-green p-0.5">
            <CardContent className="bg-white rounded-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-moh-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Vision 2030 Alignment</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    Check how well your policies align with Saudi Vision 2030 healthcare goals and objectives.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-auto" 
                    size="sm"
                    onClick={() => setActiveTab("vision2030")}
                  >
                    Check Alignment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-moh-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Strategy Gap Analysis</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    Identify strategic gaps in your healthcare policies and receive AI-powered recommendations.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-auto" 
                    size="sm"
                    onClick={() => setActiveTab("strategy")}
                  >
                    Analyze Gaps
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-moh-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Strategic Analytics</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    Get advanced analytics and visualizations for healthcare strategy planning and execution.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-auto" 
                    size="sm"
                    onClick={() => setActiveTab("analytics")}
                  >
                    View Analytics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="vision2030" className="px-4">Vision 2030 Alignment</TabsTrigger>
            <TabsTrigger value="strategy" className="px-4">Strategy Gap Analysis</TabsTrigger>
            <TabsTrigger value="analytics" className="px-4">Strategy Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vision2030" className="space-y-6">
            <Vision2030AlignmentChecker />
          </TabsContent>
          
          <TabsContent value="strategy" className="space-y-6">
            <StrategyGapAnalyzer />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <StrategyAnalytics />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
