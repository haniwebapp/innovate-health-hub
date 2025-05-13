
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment';
import { StrategyAnalytics, StrategyGapAnalyzer } from '@/components/policy/strategy';

export default function PolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Policy & Strategy</h1>
        <p className="text-muted-foreground">
          Analyze policies, check Vision 2030 alignment, and identify strategic gaps
        </p>
      </div>

      <Tabs defaultValue="vision-alignment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vision-alignment">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="strategy-analytics">Strategy Analytics</TabsTrigger>
          <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="vision-alignment">
          <Card>
            <CardHeader>
              <CardTitle>Vision 2030 Alignment Checker</CardTitle>
            </CardHeader>
            <CardContent>
              <Vision2030AlignmentChecker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy-analytics">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <StrategyAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gap-analysis">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <StrategyGapAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
