
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Download, FileText, Flag, Check } from "lucide-react";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("policies");
  
  // Mock data for policies
  const policies = [
    {
      id: "p1",
      title: "Digital Health National Strategy",
      category: "Healthcare Digital Transformation",
      status: "active",
      lastUpdated: "2023-10-15",
      description: "National strategy for digital health transformation across Saudi healthcare facilities."
    },
    {
      id: "p2",
      title: "Medical Devices Innovation Framework",
      category: "Medical Innovation",
      status: "active",
      lastUpdated: "2023-09-22",
      description: "Framework for development and regulation of innovative medical devices in Saudi Arabia."
    },
    {
      id: "p3",
      title: "Healthcare Data Privacy Guidelines",
      category: "Data Governance",
      status: "pending review",
      lastUpdated: "2023-11-05",
      description: "Guidelines for handling patient data and ensuring privacy in digital health solutions."
    }
  ];
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Policy Center</h2>
        <p className="text-muted-foreground">
          Browse healthcare policies and assess your innovation's alignment
        </p>
      </div>
      
      <Tabs defaultValue="policies" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="policies">Healthcare Policies</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Analysis</TabsTrigger>
          <TabsTrigger value="alignment">Vision 2030 Alignment</TabsTrigger>
        </TabsList>
        
        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          {policies.map((policy) => (
            <Card key={policy.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{policy.title}</CardTitle>
                    <CardDescription>Category: {policy.category}</CardDescription>
                  </div>
                  <Badge variant={policy.status === "active" ? "default" : "outline"}>
                    {policy.status === "active" ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Active
                      </>
                    ) : (
                      policy.status
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{policy.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4 mr-1" />
                  <span>Last updated: {policy.lastUpdated}</span>
                </div>
              </CardContent>
              <CardContent className="flex justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Read Full Policy</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Strategy Analysis Tab */}
        <TabsContent value="strategy">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Policy Analysis</CardTitle>
              <CardDescription>
                Analyze your innovation against current health strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <StrategyAnalytics />
                </div>
                <div>
                  <StrategyGapAnalyzer />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vision 2030 Alignment Tab */}
        <TabsContent value="alignment">
          <Card>
            <CardHeader>
              <CardTitle>Vision 2030 Alignment</CardTitle>
              <CardDescription>
                Evaluate how your innovation aligns with Saudi Vision 2030 healthcare goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Vision2030AlignmentChecker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
