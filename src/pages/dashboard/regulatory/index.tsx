
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCheck, Clock, AlertTriangle, Upload, Plus, Download, FileText, Shield, CheckCircle, HelpCircle, Beaker, FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  RegulatoryFramework, 
  RegulatoryFrameworkCard 
} from "@/components/regulatory/RegulatoryFrameworkCard";
import { 
  ComplianceRequirement, 
  ComplianceRequirementCard 
} from "@/components/regulatory/ComplianceRequirementCard";
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";

// Mock data for sandbox applications
const sandboxApplications = [
  {
    id: "1",
    name: "Remote Patient Monitoring System",
    status: "in-review",
    submittedDate: "2025-04-28",
    framework: "Medical Devices Regulatory Framework",
    progress: 65,
  },
  {
    id: "2",
    name: "AI-Based Diagnostic Tool",
    status: "approved",
    submittedDate: "2025-03-15",
    framework: "Digital Health Software Framework",
    progress: 100,
    testingPeriod: "2025-05-01 to 2025-07-31",
  }
];

// Mock regulatory frameworks
const frameworks = [
  {
    id: "mdf",
    title: "Medical Devices Framework",
    icon: <Shield size={24} />,
    description: "For physical medical devices and equipment",
    completedSteps: 2,
    totalSteps: 5,
    steps: [
      "Complete device classification form",
      "Submit technical documentation",
      "Register for conformity assessment",
      "Perform safety testing",
      "Submit final approval request"
    ]
  },
  {
    id: "dhf",
    title: "Digital Health Software Framework",
    icon: <FileCode size={24} />,
    description: "For healthcare software and digital tools",
    completedSteps: 1,
    totalSteps: 4,
    steps: [
      "Complete software assessment form",
      "Submit security & privacy documentation",
      "Perform usability testing",
      "Submit final compliance report"
    ]
  },
  {
    id: "biof",
    title: "Biotechnology Framework",
    icon: <Beaker size={24} />,
    description: "For biotech and pharmaceutical innovations",
    completedSteps: 0,
    totalSteps: 6,
    steps: [
      "Submit product classification form",
      "Register R&D protocols",
      "Submit safety test results",
      "Complete clinical trial documentation",
      "Submit manufacturing protocols",
      "Apply for final approval"
    ]
  }
];

// Mock compliance requirements
const complianceRequirements = [
  {
    id: "1",
    title: "Data Privacy Impact Assessment",
    description: "Complete a detailed assessment of how patient data is collected, stored, and processed in your innovation.",
    status: "required",
    completed: true
  },
  {
    id: "2",
    title: "Security Testing Report",
    description: "Submit results from penetration testing and security vulnerability assessments performed on your solution.",
    status: "required",
    completed: false
  },
  {
    id: "3",
    title: "Clinical Validation Documentation",
    description: "Provide evidence of clinical testing and validation of your solution's effectiveness and safety.",
    status: "recommended",
    completed: false
  },
  {
    id: "4",
    title: "User Experience Analysis",
    description: "Submit findings from usability testing with healthcare professionals who would use your system.",
    status: "optional",
    completed: false
  }
];

export default function DashboardRegulatoryPage() {
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedFramework, setSelectedFramework] = useState<string | null>("mdf");
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="documents">Compliance Documents</TabsTrigger>
          <TabsTrigger value="feedback">MoH Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <div className="space-y-4">
            {sandboxApplications.length > 0 ? (
              <>
                {sandboxApplications.map(application => (
                  <Card key={application.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{application.name}</CardTitle>
                          <CardDescription>Framework: {application.framework}</CardDescription>
                        </div>
                        <div>
                          {application.status === "approved" ? (
                            <Badge className="bg-green-500">Approved</Badge>
                          ) : application.status === "in-review" ? (
                            <Badge className="bg-amber-500">In Review</Badge>
                          ) : application.status === "draft" ? (
                            <Badge variant="outline">Draft</Badge>
                          ) : (
                            <Badge variant="destructive">Rejected</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Submitted: {application.submittedDate}
                          </span>
                          <span className="font-medium">
                            {application.status === "approved" ? 
                              "Testing period: " + application.testingPeriod : 
                              "Application progress"}
                          </span>
                        </div>
                        
                        <Progress 
                          value={application.progress} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/regulatory/applications/${application.id}`}>
                            View Details
                          </Link>
                        </Button>
                        
                        {application.status === "approved" && (
                          <Button size="sm" asChild>
                            <Link to={`/dashboard/regulatory/testing/${application.id}`}>
                              <FileCheck className="w-4 h-4 mr-1" />
                              Submit Test Results
                            </Link>
                          </Button>
                        )}
                        
                        {application.status === "in-review" && (
                          <Button size="sm" asChild>
                            <Link to={`/dashboard/regulatory/applications/${application.id}/edit`}>
                              Edit Application
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-end">
                  <Button asChild>
                    <Link to="/dashboard/regulatory/applications/new">
                      <Plus className="w-4 h-4 mr-1" />
                      New Application
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Sandbox Applications</CardTitle>
                  <CardDescription>
                    Apply for regulatory testing environments
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-10">
                  <FileCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You don't have any sandbox applications yet. Start by applying for a regulatory testing environment.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/regulatory/applications/new">
                      <Plus className="w-4 h-4 mr-1" />
                      New Application
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Available Frameworks</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {frameworks.map((framework) => (
                  <RegulatoryFrameworkCard
                    key={framework.id}
                    framework={framework}
                    isSelected={selectedFramework === framework.id}
                    onSelect={setSelectedFramework}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="space-y-4">
            <AIComplianceAnalyzer
              innovationDescription={innovationDescription}
              innovationType={innovationType}
              isAnalyzingCompliance={isAnalyzingCompliance}
              onDescriptionChange={setInnovationDescription}
              onTypeChange={setInnovationType}
              onAnalyzeClick={handleAnalyzeCompliance}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance Requirements</CardTitle>
                <CardDescription>
                  Documents and assessments required for your innovation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceRequirements.map(requirement => (
                    <ComplianceRequirementCard
                      key={requirement.id}
                      requirement={requirement}
                      onMarkComplete={handleMarkComplete}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <HelpCircle className="inline h-4 w-4 mr-1" />
                    Need help with compliance? Contact our regulatory experts
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/regulatory/documents/upload">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Documents
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  Your uploaded compliance documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    You haven't uploaded any documents yet
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/dashboard/regulatory/documents/upload">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Documents
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Ministry Guidance</CardTitle>
              <CardDescription>
                Feedback and guidance from regulatory experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  To expedite your testing approval, please ensure you've completed the data privacy impact assessment.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-moh-green/10 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-moh-green" />
                    </div>
                    <div>
                      <h3 className="font-medium">Patient Safety Requirements</h3>
                      <p className="text-sm text-muted-foreground">
                        Updated guidance on patient safety requirements for medical software
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download Guidance
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-moh-green/10 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-moh-green" />
                    </div>
                    <div>
                      <h3 className="font-medium">Testing Timeline Expectations</h3>
                      <p className="text-sm text-muted-foreground">
                        Updated information about sandbox testing periods and milestone requirements
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download Guidance
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard/regulatory/guidance/schedule">
                    Schedule Consultation with Regulatory Expert
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
