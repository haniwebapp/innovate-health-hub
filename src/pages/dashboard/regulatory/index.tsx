
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Loader2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSandboxApplications } from '@/hooks/useSandboxApplications';
import { fetchSandboxComplianceRequirements } from '@/utils/regulatoryUtils';
import { SandboxComplianceList } from '@/components/regulatory/sandbox/SandboxComplianceList';
import { supabase } from '@/integrations/supabase/client';

export default function RegulatoryDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [complianceRequirements, setComplianceRequirements] = useState([]);
  const [loadingRequirements, setLoadingRequirements] = useState(false);
  
  const { 
    applications, 
    loading, 
    error, 
    user,
    updateStatus,
    filterApplications,
    refreshApplications
  } = useSandboxApplications(isAdmin);
  
  // Check if user is admin
  useEffect(() => {
    const checkIfAdmin = async () => {
      // In a real implementation, we would check if the user has admin role
      // For demo purposes, we'll use a user metadata field
      const { data } = await supabase.auth.getUser();
      if (data?.user?.user_metadata?.role === 'admin') {
        setIsAdmin(true);
      }
    };
    
    checkIfAdmin();
  }, []);
  
  // Load compliance requirements when an application is selected
  useEffect(() => {
    const loadRequirements = async () => {
      if (!selectedApplicationId) return;
      
      setLoadingRequirements(true);
      try {
        const requirements = await fetchSandboxComplianceRequirements(selectedApplicationId);
        setComplianceRequirements(requirements);
      } catch (err) {
        console.error("Error loading compliance requirements:", err);
      } finally {
        setLoadingRequirements(false);
      }
    };
    
    loadRequirements();
  }, [selectedApplicationId]);
  
  const handleApplicationClick = (id: string) => {
    // Toggle selection
    if (selectedApplicationId === id) {
      setSelectedApplicationId(null);
    } else {
      setSelectedApplicationId(id);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">Pending Review</Badge>;
      case 'active':
        return <Badge className="bg-green-600">Active Testing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const filteredApplications = filterApplications(selectedStatus);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Regulatory Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your regulatory sandbox applications
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/regulatory/applications/new')}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Application
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="requirements">Compliance Requirements</TabsTrigger>
          <TabsTrigger value="testing">Testing Results</TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="applications" className="space-y-4">
          <div className="flex mb-4 space-x-2">
            <Button 
              variant={!selectedStatus ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus(null)}
            >
              All
            </Button>
            <Button 
              variant={selectedStatus === 'pending' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={selectedStatus === 'active' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button 
              variant={selectedStatus === 'completed' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus('completed')}
            >
              Completed
            </Button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-1">Error Loading Applications</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button variant="outline" className="mt-4" onClick={() => refreshApplications()}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-1">No Applications Found</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedStatus 
                      ? `You don't have any ${selectedStatus} applications` 
                      : "You haven't submitted any sandbox applications yet"}
                  </p>
                  <Button className="mt-4" onClick={() => navigate('/dashboard/regulatory/applications/new')}>
                    Submit New Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredApplications.map(application => (
                <Card 
                  key={application.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedApplicationId === application.id ? "border-moh-green" : ""
                  }`}
                  onClick={() => handleApplicationClick(application.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{application.name}</h3>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 max-w-2xl">
                          {application.description.slice(0, 150)}
                          {application.description.length > 150 ? "..." : ""}
                        </p>
                        
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Submitted: {new Date(application.submitted_at).toLocaleDateString()}
                          </div>
                          
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            Type: {application.innovation_type}
                          </div>
                          
                          {application.progress > 0 && (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Progress: {application.progress}%
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/regulatory/applications/${application.id}`);
                        }}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requirements">
          {selectedApplicationId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Compliance Requirements
                </h2>
                <Button variant="outline" onClick={() => setSelectedApplicationId(null)}>
                  Back to Applications
                </Button>
              </div>
              
              {loadingRequirements ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <SandboxComplianceList 
                  requirements={complianceRequirements}
                  onRequirementsChange={() => {
                    // Refresh requirements
                    fetchSandboxComplianceRequirements(selectedApplicationId)
                      .then(setComplianceRequirements);
                    
                    // Also refresh applications to update progress
                    refreshApplications();
                  }}
                />
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-1">No Application Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Select an application to view its compliance requirements
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setActiveTab('applications')}
                  >
                    View Applications
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>Testing Dashboard</CardTitle>
              <CardDescription>Manage and submit test results for your sandbox applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Testing Module Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This feature is currently under development and will be available in the next release.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage sandbox applications and regulatory frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Button onClick={() => navigate('/admin/sandbox')}>
                    Go to Admin Sandbox Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
