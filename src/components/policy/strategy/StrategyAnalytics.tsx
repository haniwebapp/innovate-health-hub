
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, PieChart, Activity } from "lucide-react";

export const StrategyAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            Healthcare Strategy Analytics
          </CardTitle>
          <CardDescription>
            Strategic insights and metrics for healthcare policy planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Strategic Focus Areas</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span>Primary Care Enhancement</span>
                  <Badge className="bg-green-500">High Priority</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Digital Transformation</span>
                  <Badge className="bg-green-500">High Priority</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Healthcare Workforce Development</span>
                  <Badge className="bg-amber-500">Medium Priority</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Specialized Care Accessibility</span>
                  <Badge className="bg-amber-500">Medium Priority</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Preventative Medicine</span>
                  <Badge className="bg-green-500">High Priority</Badge>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-48 h-48 bg-muted/20 rounded-full">
                <PieChart className="h-24 w-24 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Strategic priorities allocation
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Key Performance Indicators</h3>
            <div className="h-64 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <BarChart className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Healthcare strategy KPIs by region and focus area
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
