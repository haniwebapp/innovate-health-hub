
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "lucide-react";
import { TestingMetricsPanel } from "@/components/regulatory/testing/TestingMetricsPanel";
import { TestResultsForm } from "@/components/regulatory/testing/TestResultsForm";
import { TestingGuidance } from "@/components/regulatory/testing/TestingGuidance";
import { mockTestDetails } from "@/components/regulatory/mockData";

export default function SandboxTestingPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("metrics");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitResults = async (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          title: "Results submitted",
          description: "Your test results have been submitted successfully",
        });
        setIsSubmitting(false);
        resolve();
      }, 1500);
    });
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={`${mockTestDetails.name} Testing`} 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{mockTestDetails.name}</h1>
          <Badge className="bg-green-500">Testing Active</Badge>
        </div>
        <p className="text-muted-foreground">
          Testing period: {mockTestDetails.testingPeriod} ({mockTestDetails.daysLeft} days remaining)
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">{mockTestDetails.nextMilestone}</p>
                <p className="text-sm text-muted-foreground">Due: {mockTestDetails.nextMilestoneDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              {mockTestDetails.metrics.map((metric, index) => {
                const percentage = Math.round((metric.current / metric.target) * 100);
                return (
                  <div key={index} className="flex-1">
                    <p className="text-sm font-medium">{metric.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.current}</span>
                      <span className="text-sm text-muted-foreground">/ {metric.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-moh-green h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Test Metrics</TabsTrigger>
          <TabsTrigger value="submit">Submit Results</TabsTrigger>
          <TabsTrigger value="guidance">Testing Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <TestingMetricsPanel metrics={mockTestDetails.metrics} />
        </TabsContent>
        
        <TabsContent value="submit">
          <TestResultsForm 
            onSubmit={handleSubmitResults}
            isSubmitting={isSubmitting}
          />
        </TabsContent>
        
        <TabsContent value="guidance">
          <TestingGuidance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
