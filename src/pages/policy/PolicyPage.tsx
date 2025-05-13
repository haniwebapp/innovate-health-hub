
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";

export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Policy Analysis Tools</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Vision 2030 Alignment</CardTitle>
          </CardHeader>
          <CardContent>
            <Vision2030AlignmentChecker />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Strategy Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <StrategyAnalytics />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Strategy Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <StrategyGapAnalyzer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
