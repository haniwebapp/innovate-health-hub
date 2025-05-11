
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { SandboxCallToAction } from "@/components/regulatory/dashboard/SandboxCallToAction";
import { DocumentsTabContent } from "@/components/regulatory/dashboard/DocumentsTabContent";
import { GuidanceTabContent } from "@/components/regulatory/dashboard/GuidanceTabContent";
import { mockComplianceRequirements } from "@/components/regulatory/mockData";

export default function DashboardRegulatoryPage() {
  const [activeTab, setActiveTab] = useState("documents");
  const { toast } = useToast();
  const [innovationDescription, setInnovationDescription] = useState("");
  const [innovationType, setInnovationType] = useState("digital health application");
  const [isAnalyzingCompliance, setIsAnalyzingCompliance] = useState(false);
  
  const handleMarkComplete = (id: string) => {
    toast({
      title: "Requirement updated",
      description: "Compliance requirement marked as completed",
    });
  };

  const handleAnalyzeCompliance = () => {
    if (!innovationDescription) {
      toast({
        title: "Description required",
        description: "Please provide a description of your innovation",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzingCompliance(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzingCompliance(false);
      toast({
        title: "Analysis complete",
        description: "Compliance requirements have been generated",
      });
      
      // Would normally set requirements from API response
      setActiveTab("documents");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Regulatory Sandbox" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Regulatory Sandbox</h1>
        <p className="text-muted-foreground">
          Test your innovations in a controlled regulatory environment
        </p>
      </div>

      {/* Apply for Sandbox Call-to-Action */}
      <SandboxCallToAction />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Compliance Documents</TabsTrigger>
          <TabsTrigger value="feedback">MoH Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          <DocumentsTabContent
            innovationDescription={innovationDescription}
            innovationType={innovationType}
            isAnalyzingCompliance={isAnalyzingCompliance}
            onDescriptionChange={setInnovationDescription}
            onTypeChange={setInnovationType}
            onAnalyzeClick={handleAnalyzeCompliance}
            onMarkComplete={handleMarkComplete}
            requirements={mockComplianceRequirements}
          />
        </TabsContent>
        
        <TabsContent value="feedback">
          <GuidanceTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
