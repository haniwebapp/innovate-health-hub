
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SandboxCallToAction } from "@/components/regulatory/dashboard/SandboxCallToAction";
import { DocumentsTabContent } from "@/components/regulatory/dashboard/DocumentsTabContent";
import { GuidanceTabContent } from "@/components/regulatory/dashboard/GuidanceTabContent";
import { useAuth } from "@/contexts/AuthContext";
import { analyzeRegulatoryCompliance } from "@/utils/aiUtils";
import { fetchUserSandboxApplications } from "@/utils/regulatoryUtils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function RegulatoryDashboardPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("documents");
  const [innovationDescription, setInnovationDescription] = useState("");
  const [innovationType, setInnovationType] = useState("");
  const [isAnalyzingCompliance, setIsAnalyzingCompliance] = useState(false);
  const [hasActiveApplication, setHasActiveApplication] = useState(false);
  const [requirements, setRequirements] = useState<any[]>([
    {
      id: "req1",
      title: "Quality Management System Documentation",
      description: "Implement a QMS that meets ISO 13485 standards for medical devices.",
      status: "required",
      completed: false
    },
    {
      id: "req2",
      title: "Risk Management File",
      description: "Document risk analysis and mitigation strategies in compliance with ISO 14971.",
      status: "required",
      completed: false
    },
    {
      id: "req3",
      title: "Clinical Evaluation Report",
      description: "Prepare documentation with relevant clinical data supporting your claims.",
      status: "required",
      completed: false
    },
    {
      id: "req4",
      title: "Technical Documentation",
      description: "Comprehensive documentation of design specifications and verification results.",
      status: "required",
      completed: false
    }
  ]);

  useEffect(() => {
    // Check if the user has any active sandbox applications
    const checkForActiveApplications = async () => {
      try {
        if (user?.id) {
          const applications = await fetchUserSandboxApplications();
          setHasActiveApplication(applications.length > 0);
        }
      } catch (error) {
        console.error("Error checking for active applications:", error);
      }
    };
    
    checkForActiveApplications();
  }, [user]);

  const analyzeCompliance = async () => {
    if (!innovationDescription || !innovationType) {
      toast({
        title: "Missing information",
        description: "Please describe your innovation and select its type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzingCompliance(true);
    
    try {
      const response = await analyzeRegulatoryCompliance({ 
        description: innovationDescription, 
        type: innovationType 
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // In a real implementation, we would parse the AI response
      // For now, we'll just show a success message
      toast({
        title: "Compliance Analysis Complete",
        description: "Review your regulatory pathway and requirements.",
      });
    } catch (error: any) {
      console.error("Error analyzing compliance:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete compliance analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzingCompliance(false);
    }
  };
  
  const markRequirementComplete = (id: string) => {
    setRequirements(prevRequirements => 
      prevRequirements.map(req => 
        req.id === id ? { ...req, completed: !req.completed } : req
      )
    );
    
    toast({
      title: "Requirement Updated",
      description: "Your compliance progress has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <CardTitle className="text-xl font-bold text-moh-darkGreen">
                Regulatory Dashboard
              </CardTitle>
              <Badge variant="outline" className="bg-moh-green/10 text-moh-darkGreen border-moh-green/30">
                Sandbox Program
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Navigate healthcare regulations efficiently with AI-driven compliance analysis and expert guidance.
            </p>
            
            {!hasActiveApplication && <SandboxCallToAction />}
          </CardContent>
        </Card>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid sm:grid-cols-3 grid-cols-2">
          <TabsTrigger value="documents">Documents & Compliance</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="guidance">Expert Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="space-y-6">
          <DocumentsTabContent
            innovationDescription={innovationDescription}
            innovationType={innovationType}
            isAnalyzingCompliance={isAnalyzingCompliance}
            onDescriptionChange={setInnovationDescription}
            onTypeChange={setInnovationType}
            onAnalyzeClick={analyzeCompliance}
            onMarkComplete={markRequirementComplete}
            requirements={requirements}
          />
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          {hasActiveApplication ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <h2 className="text-lg font-medium">Your Application is Under Review</h2>
                  <p className="text-muted-foreground mt-2">
                    Your sandbox application is currently being reviewed by our team. 
                    You'll receive notifications about updates to your application status.
                  </p>
                  <Button className="mt-4 bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to="/dashboard/regulatory/applications/active">
                      View Application Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <SandboxCallToAction />
          )}
        </TabsContent>
        
        <TabsContent value="guidance">
          <GuidanceTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
