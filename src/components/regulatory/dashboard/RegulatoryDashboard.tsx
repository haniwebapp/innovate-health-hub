
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, FileCheck, FileText, HelpCircle, MessageSquare, Settings, Shield } from "lucide-react";
import { DocumentsTabContent } from "./DocumentsTabContent";
import { SandboxCallToAction } from "./SandboxCallToAction";
import { ComplianceTracker } from "../ComplianceTracker";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Mock data - in a real app, this would come from an API
const mockRequirements = [
  {
    id: "req1",
    title: "Quality Management System (ISO 13485)",
    description: "Implement a medical device quality management system that meets ISO 13485 standards.",
    status: "required" as const,
    completed: false,
    dueDate: "2025-07-30"
  },
  {
    id: "req2",
    title: "Risk Management (ISO 14971)",
    description: "Conduct and document a comprehensive risk analysis.",
    status: "required" as const,
    completed: true,
    dueDate: "2025-06-15"
  },
  {
    id: "req3",
    title: "Clinical Evaluation",
    description: "Prepare clinical evaluation documentation with relevant clinical data.",
    status: "required" as const,
    completed: false,
    dueDate: "2025-08-10"
  },
  {
    id: "req4",
    title: "Usability Engineering (IEC 62366)",
    description: "Conduct usability testing and document results.",
    status: "recommended" as const,
    completed: false
  },
  {
    id: "req5",
    title: "Cybersecurity Documentation",
    description: "Document cybersecurity measures and risk mitigation strategies.",
    status: "recommended" as const,
    completed: true
  },
  {
    id: "req6",
    title: "Environmental Impact Assessment",
    description: "Evaluate and document the environmental impact of your innovation.",
    status: "optional" as const,
    completed: false
  }
];

export function RegulatoryDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [requirements, setRequirements] = useState(mockRequirements);
  const [innovationDescription, setInnovationDescription] = useState("");
  const [innovationType, setInnovationType] = useState("");
  const [isAnalyzingCompliance, setIsAnalyzingCompliance] = useState(false);
  
  const handleMarkComplete = (id: string) => {
    setRequirements(prev => 
      prev.map(req => 
        req.id === id ? { ...req, completed: !req.completed } : req
      )
    );
  };
  
  const handleAnalyzeCompliance = () => {
    if (!innovationDescription || !innovationType) {
      toast({
        title: "Missing information",
        description: "Please describe your innovation and select its type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzingCompliance(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Analysis Complete",
        description: "Your regulatory requirements have been analyzed.",
      });
      setIsAnalyzingCompliance(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Regulatory Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your regulatory compliance and sandbox applications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard/regulatory/documents/upload">
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </Link>
          </Button>
          <Button variant="default" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
            <Link to="/dashboard/regulatory/applications/new">
              <Shield className="h-4 w-4 mr-2" />
              New Application
            </Link>
          </Button>
        </div>
      </motion.div>
      
      <SandboxCallToAction />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="guidance">Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ComplianceTracker
                requirements={requirements}
                onMarkComplete={handleMarkComplete}
              />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Support</CardTitle>
                  <CardDescription>Get assistance with your regulatory journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Regulatory Advisor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Request Compliance Review
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Notification Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Helpful guides and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-moh-green mr-2" />
                      <span className="text-sm">Medical Device Classification Guide</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-moh-green mr-2" />
                      <span className="text-sm">Risk Assessment Template</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-moh-green mr-2" />
                      <span className="text-sm">Regulatory Submission Checklist</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsTabContent 
            innovationDescription={innovationDescription}
            innovationType={innovationType}
            isAnalyzingCompliance={isAnalyzingCompliance}
            onDescriptionChange={setInnovationDescription}
            onTypeChange={setInnovationType}
            onAnalyzeClick={handleAnalyzeCompliance}
            onMarkComplete={handleMarkComplete}
            requirements={requirements}
          />
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Applications</CardTitle>
              <CardDescription>View and manage your regulatory submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any regulatory applications yet
                </p>
                <Button asChild>
                  <Link to="/dashboard/regulatory/applications/new">
                    Start New Application
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidance">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Guidance</CardTitle>
              <CardDescription>Expert advice and resources for your compliance journey</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <p className="text-muted-foreground">
                Guidance content will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
