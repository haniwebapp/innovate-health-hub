
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, CheckCircle, Clock, FileText, Loader2, MessageSquare, AlertTriangle, Building } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  fetchSandboxApplicationById, 
  fetchSandboxComplianceRequirements,
  fetchSandboxFeedback,
  SandboxApplication,
  SandboxComplianceRequirement,
  SandboxFeedback
} from '@/utils/regulatoryUtils';
import { SandboxComplianceList } from '@/components/regulatory/sandbox/SandboxComplianceList';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [application, setApplication] = useState<SandboxApplication | null>(null);
  const [requirements, setRequirements] = useState<SandboxComplianceRequirement[]>([]);
  const [feedback, setFeedback] = useState<SandboxFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Load application details
        const appData = await fetchSandboxApplicationById(id);
        setApplication(appData);
        
        // Load compliance requirements
        const reqData = await fetchSandboxComplianceRequirements(id);
        setRequirements(reqData);
        
        // Load feedback
        const feedbackData = await fetchSandboxFeedback(id);
        setFeedback(feedbackData);
      } catch (err) {
        console.error('Error loading application data:', err);
        setError('Failed to load application details. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load application data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, toast]);
  
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
  
  const refreshRequirements = async () => {
    if (!id) return;
    
    try {
      const reqData = await fetchSandboxComplianceRequirements(id);
      setRequirements(reqData);
      
      // Also refresh application to get updated progress
      const appData = await fetchSandboxApplicationById(id);
      setApplication(appData);
      
      toast({
        title: "Data refreshed",
        description: "The latest compliance data has been loaded",
      });
    } catch (err) {
      console.error('Error refreshing data:', err);
      toast({
        title: "Refresh failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Application</h2>
        <p className="text-muted-foreground mb-4">{error || "Application not found"}</p>
        <Button onClick={() => navigate('/dashboard/regulatory')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Application Details" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/regulatory')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold mt-2">{application.name}</h1>
        </div>
        {getStatusBadge(application.status)}
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">
            Compliance Requirements ({requirements.length})
          </TabsTrigger>
          <TabsTrigger value="feedback">
            Feedback ({feedback.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{application.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Innovation Type</h3>
                    <p className="mt-1">{application.innovation_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Organization Type</h3>
                    <p className="mt-1">{application.organization_type}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Submission Date</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(application.submitted_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Testing Duration</h3>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {application.testing_duration}
                    </div>
                  </div>
                </div>
                
                {application.regulatory_challenges && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Regulatory Challenges</h3>
                    <p className="mt-1">{application.regulatory_challenges}</p>
                  </div>
                )}
                
                {application.status === 'active' && (
                  <div className="pt-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Testing Progress</h3>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className="bg-moh-green h-2.5 rounded-full" 
                        style={{ width: `${application.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{application.progress}% complete</span>
                      {application.start_date && application.end_date && (
                        <span>
                          {new Date(application.start_date).toLocaleDateString()} - 
                          {new Date(application.end_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                {application.status === 'pending' && (
                  <div className="space-y-2">
                    <div className="flex items-center text-amber-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <p>Your application is currently under review.</p>
                    </div>
                    <p className="text-muted-foreground">
                      The review process typically takes 5-10 business days. You will be notified once a decision has been made.
                    </p>
                  </div>
                )}
                
                {application.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <p>Your application is approved for sandbox testing.</p>
                    </div>
                    <p className="text-muted-foreground">
                      Please complete all required compliance items and submit test results regularly.
                    </p>
                    <div className="pt-2">
                      <Button onClick={() => setActiveTab('requirements')}>
                        View Compliance Requirements
                      </Button>
                    </div>
                  </div>
                )}
                
                {application.status === 'rejected' && (
                  <div className="space-y-2">
                    <div className="flex items-center text-rose-600">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <p>Your application was not approved for the sandbox.</p>
                    </div>
                    <p className="text-muted-foreground">
                      Please review the feedback provided and consider submitting a revised application.
                    </p>
                  </div>
                )}
                
                {application.status === 'completed' && (
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <p>Your sandbox testing period is complete.</p>
                    </div>
                    <p className="text-muted-foreground">
                      You may now proceed with the formal regulatory submission process.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Compliance Requirements</CardTitle>
              <Button variant="outline" onClick={refreshRequirements}>
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <SandboxComplianceList 
                requirements={requirements}
                onRequirementsChange={refreshRequirements}
                readOnly={application.status !== 'active'}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Regulator Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-500">No feedback yet</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Feedback from regulatory experts will appear here once provided
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {item.is_official ? (
                            <Badge className="bg-blue-600 mr-2">Official</Badge>
                          ) : (
                            <Badge variant="outline" className="mr-2">Comment</Badge>
                          )}
                          <span className="font-medium">{item.author}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({item.author_role})
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{item.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
