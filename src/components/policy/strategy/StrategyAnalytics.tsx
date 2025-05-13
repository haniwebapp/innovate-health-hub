
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart, TrendingUp, AlertCircle } from "lucide-react";
import { Separator } from '@/components/ui/separator';

export const StrategyAnalytics = () => {
  const [timeframe, setTimeframe] = useState("quarterly");
  
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
              <div className="text-2xl font-bold text-moh-darkGreen">78%</div>
              <p className="text-xs text-muted-foreground">+12% from previous period</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Digital Health</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                  <div className="bg-moh-green h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Telehealth</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                  <div className="bg-moh-green h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Rural Healthcare</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                  <div className="bg-moh-green h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-moh-green"></div>
                  <span className="text-xs">Digital Transformation: 42%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Healthcare Access: 28%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Medical Research: 18%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-xs">Workforce Development: 12%</span>
                </div>
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
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm font-medium text-amber-800">Resource Allocation Gap</p>
                  <p className="text-xs text-muted-foreground">Rural healthcare initiatives underfunded</p>
                  <p className="text-xs font-medium text-amber-800 mt-1">Impact: Medium</p>
                </div>
                
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-md">
                  <p className="text-sm font-medium text-rose-800">Implementation Timeline</p>
                  <p className="text-xs text-muted-foreground">Telehealth regulation delays</p>
                  <p className="text-xs font-medium text-rose-800 mt-1">Impact: High</p>
                </div>
                
                <div className="p-2 bg-moh-lightGreen/50 border border-moh-green/20 rounded-md">
                  <p className="text-sm font-medium text-moh-darkGreen">Stakeholder Alignment</p>
                  <p className="text-xs text-muted-foreground">Private sector engagement improving</p>
                  <p className="text-xs font-medium text-moh-darkGreen mt-1">Impact: Positive</p>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Risk mitigation rate</span>
                <span className="text-xs font-medium">72%</span>
              </div>
              <div className="w-full bg-moh-lightGreen/30 rounded-full h-1.5 mt-1">
                <div className="bg-moh-green h-1.5 rounded-full" style={{ width: "72%" }}></div>
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
        
        <Button className="w-full">Generate Full Analytics Report</Button>
      </CardContent>
    </Card>
  );
};
