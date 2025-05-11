
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCheck, Clock, AlertTriangle, Upload, Plus, Download, FileText, Shield, CheckCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RegulatoryFrameworkList } from "@/components/regulatory/frameworks/RegulatoryFrameworkList";
import { ApplicationList } from "@/components/regulatory/applications/ApplicationList";
import { ComplianceRequirementList } from "@/components/regulatory/compliance/ComplianceRequirementList";
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";
import { 
  mockSandboxApplications, 
  mockRegulatoryFrameworks,
  mockComplianceRequirements 
} from "@/components/regulatory/mockData";

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
            {mockSandboxApplications.length > 0 ? (
              <ApplicationList applications={mockSandboxApplications} />
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
              <RegulatoryFrameworkList
                frameworks={mockRegulatoryFrameworks}
                selectedFramework={selectedFramework}
                onSelectFramework={setSelectedFramework}
              />
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
                <ComplianceRequirementList
                  requirements={mockComplianceRequirements}
                  onMarkComplete={handleMarkComplete}
                />
                
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
