import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Beaker, Edit, Eye, FileCode, FileText, Shield, Table2 } from 'lucide-react';
import { ApplicationCard } from '@/components/regulatory/applications/ApplicationCard';
import { Application } from '@/components/regulatory/applications/types';
import { fetchUserApplications, SandboxApplication, updateSandboxApplicationStatus } from '@/utils/regulatoryUtils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';

export default function AdminSandboxPage() {
  const [activeTab, setActiveTab] = useState('projects');
  const [sandboxProjects, setSandboxProjects] = useState<SandboxApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<SandboxApplication | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadSandboxApplications = async () => {
      try {
        setLoading(true);
        const applications = await fetchUserApplications(); // Using the existing function instead of fetchAllSandboxApplications
        
        // Add innovator field to match the component expectations
        const appsWithInnovator = applications.map(app => ({
          ...app,
          innovator: `User ${app.user_id.slice(0, 8)}` // Simplified for now
        }));
        
        setSandboxProjects(appsWithInnovator);
      } catch (err) {
        console.error("Failed to load sandbox applications:", err);
        setError("Failed to load sandbox applications. Please try again later.");
        // Fallback to mock data if there's an error
        setSandboxProjects([
          {
            id: '1',
            name: 'AI Diagnostic Algorithm',
            innovator: 'Health Tech Solutions',
            status: 'active',
            start_date: '2023-04-01',
            end_date: '2023-07-01',
            risk_level: 'Medium',
            progress: 65,
            innovation_type: 'digital-health',
            description: 'An AI algorithm that helps diagnose skin conditions from images',
            regulatory_challenges: 'Medical device classification concerns',
            testing_duration: '3-months',
            organization_type: 'startup',
            user_id: '1',
            framework_id: null,
            submitted_at: '2023-03-15',
            created_at: '2023-03-15',
            updated_at: '2023-04-01'
          },
          {
            id: '2',
            name: 'Remote Patient Monitoring Device',
            innovator: 'MedTech Innovations',
            status: 'pending',
            start_date: null,
            end_date: null,
            risk_level: 'High',
            progress: 30,
            innovation_type: 'medical-device',
            description: 'A wearable device that continuously monitors vital signs',
            regulatory_challenges: 'Data security and privacy concerns',
            testing_duration: '6-months',
            organization_type: 'sme',
            user_id: '2',
            framework_id: null,
            submitted_at: '2023-05-20',
            created_at: '2023-05-20',
            updated_at: '2023-05-20'
          },
          {
            id: '3',
            name: 'Medication Management App',
            innovator: 'Digital Health Inc',
            status: 'completed',
            start_date: '2023-01-15',
            end_date: '2023-03-15',
            risk_level: 'Low',
            progress: 100,
            innovation_type: 'digital-health',
            description: 'Mobile app for medication adherence and management',
            regulatory_challenges: 'Integration with healthcare systems',
            testing_duration: '3-months',
            organization_type: 'startup',
            user_id: '3',
            framework_id: null,
            submitted_at: '2022-12-10',
            created_at: '2022-12-10',
            updated_at: '2023-03-15'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSandboxApplications();
  }, []);

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

  const getRiskBadge = (level: string | null) => {
    switch (level) {
      case 'High':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{level || 'Unknown'}</Badge>;
    }
  };

  const handleViewDetails = (application: SandboxApplication) => {
    setSelectedApplication(application);
    // In a real implementation, this would navigate to a details view or open a modal
    toast({
      title: "View Details",
      description: `Viewing details for ${application.name}`,
    });
  };

  const handleUpdateStatus = (application: SandboxApplication) => {
    setSelectedApplication(application);
    setShowStatusDialog(true);
  };

  const updateStatus = async (status: string) => {
    if (!selectedApplication) return;
    
    setProcessingAction(true);
    try {
      let startDate = null;
      let endDate = null;
      
      if (status === 'active') {
        startDate = new Date().toISOString();
        // Set end date 3 months from now as default
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
        endDate = threeMonthsLater.toISOString();
      }
      
      await updateSandboxApplicationStatus(selectedApplication.id, status, startDate, endDate);
      
      // Update the local state
      setSandboxProjects(prev => prev.map(app => 
        app.id === selectedApplication.id ? { 
          ...app, 
          status, 
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate })
        } : app
      ));
      
      toast({
        title: "Status Updated",
        description: `Application status updated to ${status}`,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      toast({
        title: "Update Failed",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(false);
      setShowStatusDialog(false);
    }
  };

  // Convert sandbox projects to application format for reusing application card
  const convertedProjects: Application[] = sandboxProjects.map(project => ({
    id: project.id,
    name: project.name,
    // Map the status values to match the Application type union
    status: project.status === 'active' ? 'approved' : 
            project.status === 'pending' ? 'in-review' : 
            project.status === 'completed' ? 'draft' : 'rejected',
    submittedDate: project.submitted_at,
    framework: project.innovation_type,
    progress: project.progress,
    testingPeriod: project.start_date && project.end_date ? 
      `${format(new Date(project.start_date), 'yyyy-MM-dd')} to ${format(new Date(project.end_date), 'yyyy-MM-dd')}` : 
      undefined,
    // Optional fields that might be useful
    description: project.innovator ? `Developed by ${project.innovator}` : undefined,
    innovationType: project.innovation_type,
    riskLevel: project.risk_level || undefined
  }));

  return (
    <AdminLayout
      title="Regulatory Sandbox"
      description="Monitor and manage regulatory sandbox activities"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Sandbox Projects</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Templates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moh-darkGreen"></div>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Error loading sandbox applications</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : sandboxProjects.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium text-gray-500">No sandbox applications found</h3>
                  <p className="text-sm text-gray-400 mt-1">There are no applications in the regulatory sandbox yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sandboxProjects.map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="border-l-4 border-moh-darkGreen">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Innovator: {project.innovator || 'Unknown'}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getStatusBadge(project.status)}
                            {getRiskBadge(project.risk_level)}
                          </div>
                          
                          <p className="text-sm mt-2">{project.description}</p>
                          
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-500">Submitted:</span>{' '}
                              {format(new Date(project.submitted_at), 'MMM d, yyyy')}
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Type:</span>{' '}
                              {project.innovation_type.replace('-', ' ')}
                            </div>
                            {project.start_date && (
                              <div>
                                <span className="font-medium text-gray-500">Started:</span>{' '}
                                {format(new Date(project.start_date), 'MMM d, yyyy')}
                              </div>
                            )}
                            {project.end_date && (
                              <div>
                                <span className="font-medium text-gray-500">Ends:</span>{' '}
                                {format(new Date(project.end_date), 'MMM d, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleViewDetails(project)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button 
                            size="sm" 
                            variant={project.status === 'pending' ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleUpdateStatus(project)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Status
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      {project.status === 'active' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Testing Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-moh-green h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Policies</CardTitle>
              <CardDescription>Manage testing policies and guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Data Privacy Policy", "Patient Safety Guidelines", "Testing Protocol", "Evaluation Criteria"].map((policy) => (
                  <Card key={policy} className="bg-muted">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span>{policy}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <FileCode className="h-4 w-4 mr-1" />
                Create New Policy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Templates</CardTitle>
              <CardDescription>Standardized forms for regulatory compliance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Table2 className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Compliance templates will be implemented in Phase 3.</p>
              <Button>View Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Sandbox Reports</CardTitle>
              <CardDescription>Analytics and outcomes from sandbox testing</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Beaker className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Sandbox reporting will be implemented in Phase 3.</p>
              <Button>View Reports</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Update the status of <span className="font-medium">{selectedApplication?.name}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              onClick={() => updateStatus('pending')}
              disabled={selectedApplication?.status === 'pending' || processingAction}
            >
              Mark as Pending
            </Button>
            <Button
              onClick={() => updateStatus('active')}
              disabled={selectedApplication?.status === 'active' || processingAction}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve & Start Testing
            </Button>
            <Button
              onClick={() => updateStatus('completed')}
              disabled={selectedApplication?.status === 'completed' || processingAction}
              variant="outline"
            >
              Mark as Completed
            </Button>
            <Button
              onClick={() => updateStatus('rejected')}
              disabled={selectedApplication?.status === 'rejected' || processingAction}
              variant="destructive"
            >
              Reject Application
            </Button>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)} disabled={processingAction}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
