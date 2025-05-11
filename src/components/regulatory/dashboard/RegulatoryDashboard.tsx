
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BadgePlus, AlertCircle, ListFilter, ClipboardCheck, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { fetchUserSandboxApplications, SandboxApplication } from '@/utils/regulatoryUtils';
import { RegulatoryAIService, InnovationData, RegulatoryAnalysis } from '@/services/ai/RegulatoryAIService';

export function RegulatoryDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<SandboxApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [complianceResults, setComplianceResults] = useState<RegulatoryAnalysis | null>(null);
  
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const userApplications = await fetchUserSandboxApplications();
        setApplications(userApplications);
      } catch (error) {
        console.error('Error loading regulatory applications:', error);
        toast({
          variant: "destructive",
          title: "Error loading applications",
          description: "Failed to load your regulatory applications. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadApplications();
  }, [toast]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active Testing</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending Approval</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleQuickAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Example data for testing
      const mockInnovationData: InnovationData = {
        name: "HealthMonitor Pro",
        description: "A wearable device that continuously monitors vital signs and alerts healthcare providers about abnormalities in real-time.",
        type: "medical-device",
        sector: "remote-monitoring",
        stage: "prototype",
        medicalClaims: ["Continuous vital sign monitoring", "Early detection of health deterioration"],
        targetUsers: ["Chronic disease patients", "Elderly", "Post-operative recovery patients"],
        dataCollection: "Heart rate, blood pressure, oxygen saturation, body temperature",
        patientImpact: "Improved patient outcomes through early intervention and reduced hospital readmissions"
      };
      
      const analysis = await RegulatoryAIService.generateComplianceAnalysis(mockInnovationData);
      setComplianceResults(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Your quick compliance analysis has been generated.",
      });
    } catch (error) {
      console.error('Error generating compliance analysis:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to generate regulatory compliance analysis. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl text-moh-darkGreen">Regulatory Dashboard</CardTitle>
            <CardDescription>
              Manage your regulatory sandbox applications and compliance requirements
            </CardDescription>
          </div>
          <Button onClick={() => navigate('/dashboard/regulatory/applications/new')}>
            <BadgePlus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="quick-check">Quick Check</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moh-darkGreen"></div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-moh-green/10 p-3 rounded-full">
                    <ClipboardCheck className="h-6 w-6 text-moh-green" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  You haven't submitted any regulatory sandbox applications yet. 
                  Apply to get help with your innovation's regulatory journey.
                </p>
                <Button onClick={() => navigate('/dashboard/regulatory/applications/new')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Apply for Sandbox
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Your Applications</h3>
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="overflow-hidden">
                      <div className="border-l-4 border-moh-darkGreen">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold">{app.name}</h4>
                                {getStatusBadge(app.status)}
                              </div>
                              
                              <p className="text-sm text-gray-500 mb-3">{app.description}</p>
                              
                              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-gray-500">Submitted:</span>{' '}
                                  {new Date(app.submitted_at).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-500">Type:</span>{' '}
                                  {app.innovation_type.replace('-', ' ')}
                                </div>
                                {app.start_date && (
                                  <div>
                                    <span className="font-medium text-gray-500">Started:</span>{' '}
                                    {new Date(app.start_date).toLocaleDateString()}
                                  </div>
                                )}
                                {app.end_date && (
                                  <div>
                                    <span className="font-medium text-gray-500">Ends:</span>{' '}
                                    {new Date(app.end_date).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0">
                              <Button 
                                variant="outline" 
                                className="w-full md:w-auto mb-2 md:mb-0 md:mr-2"
                              >
                                View Application
                              </Button>
                            </div>
                          </div>
                          
                          {app.status === 'active' && (
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Testing Progress</span>
                                <span>{app.progress}%</span>
                              </div>
                              <Progress value={app.progress} className="h-2" />
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="compliance">
            <div className="text-center py-12 border border-dashed rounded-md">
              <div className="flex justify-center mb-4">
                <div className="bg-moh-green/10 p-3 rounded-full">
                  <ClipboardCheck className="h-6 w-6 text-moh-green" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Compliance Management</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Track your compliance requirements and documentation in one place.
                First, submit a sandbox application to get started.
              </p>
              <Button onClick={() => navigate('/dashboard/regulatory/applications/new')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="quick-check">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="md:w-1/2">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Compliance Check</CardTitle>
                  <CardDescription>
                    Get a quick AI-powered assessment of your regulatory requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-sm text-gray-600">
                    This tool provides a preliminary analysis of potential regulatory requirements
                    for a healthcare innovation. It's not a substitute for professional regulatory advice.
                  </p>
                  
                  <Button 
                    onClick={handleQuickAnalysis} 
                    disabled={isAnalyzing}
                    className="w-full bg-moh-darkGreen hover:bg-moh-darkGreen/90"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      "Run Quick Analysis"
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              {complianceResults && (
                <Card className="md:w-1/2 overflow-auto">
                  <CardHeader>
                    <CardTitle className="text-lg">Analysis Results</CardTitle>
                    <CardDescription>
                      Risk Level: <Badge>{complianceResults.riskLevel}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-80 overflow-y-auto">
                    <div className="mb-4">
                      <h4 className="font-medium mb-1">Summary</h4>
                      <p className="text-sm text-gray-600">{complianceResults.summary}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-1">Key Requirements</h4>
                      <ul className="space-y-2 text-sm">
                        {complianceResults.keyRequirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded mr-2 mt-0.5">
                              {req.complexity}
                            </span>
                            <div>
                              <div>{req.requirement}</div>
                              <div className="text-xs text-gray-500">Est: {req.estimatedTime}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Next Steps</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {complianceResults.nextSteps.slice(0, 3).map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Compliance Score</span>
                        <span className="font-medium">{complianceResults.complianceScore}%</span>
                      </div>
                      <Progress value={complianceResults.complianceScore} className="h-2 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
