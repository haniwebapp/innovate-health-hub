
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vision2030AlignmentChecker } from "@/components/policy/Vision2030AlignmentChecker";
import { PolicyImpactSimulator } from "@/components/policy/PolicyImpactSimulator"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, FileText, PenSquare, Bell } from "lucide-react";
import { PolicyAnnotator } from "@/components/policy/PolicyAnnotator";
import { DocumentChangeNotifier } from "@/components/policy/DocumentChangeNotifier";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("alignment");
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Policy Tools" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Policy & Strategy Tools</h1>
        <p className="text-muted-foreground">
          AI-powered tools for policy analysis and Vision 2030 alignment
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="alignment">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="impact">Impact Simulation</TabsTrigger>
          <TabsTrigger value="annotations">Policy Analyzer</TabsTrigger>
          <TabsTrigger value="notifications">Change Notifications</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alignment">
          <Vision2030AlignmentChecker />
        </TabsContent>
        
        <TabsContent value="impact">
          <PolicyImpactSimulator />
        </TabsContent>
        
        <TabsContent value="annotations">
          <PolicyAnnotator />
        </TabsContent>
        
        <TabsContent value="notifications">
          <DocumentChangeNotifier />
        </TabsContent>
        
        <TabsContent value="strategy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-moh-green" />
                Strategy Gap Analyzer
              </CardTitle>
              <CardDescription>
                Identify gaps in healthcare strategy compared to global and regional benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Coming soon in the next implementation phase
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
