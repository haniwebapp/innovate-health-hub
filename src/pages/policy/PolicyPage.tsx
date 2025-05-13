
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";
import { PolicyAnnotator } from "@/components/policy/PolicyAnnotator";
import { PolicyImpactSimulator } from "@/components/policy/PolicyImpactSimulator";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Healthcare Policy Center</h1>
        <p className="text-muted-foreground">
          Analyze, align, and implement healthcare policies that support innovation and improve outcomes
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vision-alignment">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="strategy-tools">Strategy Tools</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Policy Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  The Healthcare Innovation Platform's policy tools are designed to support policy makers,
                  healthcare leaders, and innovators in aligning initiatives with national health priorities
                  and Vision 2030 objectives.
                </p>
                <Button variant="outline">View Policy Guidelines</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Jun 15, 2025:</span> Updated Digital Health Initiative guidelines
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">May 28, 2025:</span> New regulatory framework for AI in healthcare
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Apr 10, 2025:</span> Policy changes for remote patient monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>How to Use These Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 list-decimal pl-4">
                  <li className="text-muted-foreground">
                    <span className="font-medium text-foreground">Vision 2030 Alignment:</span> Evaluate how your innovation 
                    or policy aligns with Saudi Vision 2030 healthcare goals
                  </li>
                  <li className="text-muted-foreground">
                    <span className="font-medium text-foreground">Strategy Tools:</span> Analyze gaps in current strategies 
                    and identify opportunities for improvement
                  </li>
                  <li className="text-muted-foreground">
                    <span className="font-medium text-foreground">Analysis:</span> Simulate policy impacts and get detailed 
                    annotations for policy documents
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vision Alignment Tab */}
        <TabsContent value="vision-alignment">
          <Vision2030AlignmentChecker />
        </TabsContent>
        
        {/* Strategy Tools Tab */}
        <TabsContent value="strategy-tools">
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
