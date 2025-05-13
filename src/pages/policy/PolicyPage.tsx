
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";
import { PolicyAnnotator } from "@/components/policy/PolicyAnnotator";
import { PolicyImpactSimulator } from "@/components/policy/PolicyImpactSimulator";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Policy Analysis Center</h1>
        <p className="text-muted-foreground">
          Tools for health policy analysis, vision alignment, and strategy development
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vision">Vision 2030</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vision 2030 Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Check how healthcare innovations align with Saudi Arabia's Vision 2030 goals and healthcare transformation objectives.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Strategy Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Analyze gaps in current healthcare strategy implementation and identify areas for improvement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Policy Impact Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Simulate the potential impact of policy changes on healthcare outcomes and stakeholders.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Assess healthcare innovations against current regulatory frameworks and compliance requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vision 2030 Tab */}
        <TabsContent value="vision">
          <Vision2030AlignmentChecker />
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy">
          <div className="space-y-8">
            <StrategyAnalytics />
            <StrategyGapAnalyzer />
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis">
          <div className="space-y-8">
            <PolicyImpactSimulator />
            <PolicyAnnotator />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
