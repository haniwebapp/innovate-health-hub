
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  SandboxApplication, 
  SandboxComplianceRequirement,
  fetchApplicationById, 
  fetchApplicationCompliance,
  updateSandboxComplianceStatus
} from '@/utils/regulatoryUtils';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, CheckCircle, Clock, Tag, User } from 'lucide-react';

// We need to define this interface since we don't have it in regulatoryUtils yet
interface SandboxFeedback {
  id: string;
  application_id: string;
  message: string;
  author: string;
  author_role: string;
  is_official: boolean;
  created_at: string;
}

// Helper function to simulate fetching feedback
async function fetchSandboxFeedback(applicationId: string): Promise<SandboxFeedback[]> {
  // This would normally fetch from the database
  // For now, return mock data
  return [
    {
      id: '1',
      application_id: applicationId,
      message: 'Your application has been received and is under initial review.',
      author: 'Regulatory Admin',
      author_role: 'Admin',
      is_official: true,
      created_at: new Date().toISOString()
    }
  ];
}

// Helper function to simulate adding feedback
async function addSandboxFeedback(
  applicationId: string,
  message: string,
  author: string,
  authorRole: string,
  isOfficial: boolean
): Promise<void> {
  // This would normally add to the database
  console.log('Adding feedback:', { applicationId, message, author, authorRole, isOfficial });
  // For now, just log it
}

export default function SandboxApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [application, setApplication] = useState<SandboxApplication | null>(null);
  const [complianceRequirements, setComplianceRequirements] = useState<SandboxComplianceRequirement[]>([]);
  const [feedback, setFeedback] = useState<SandboxFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newFeedback, setNewFeedback] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const loadApplicationData = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch application details
      const appData = await fetchApplicationById(id);
      setApplication(appData);
      
      // Fetch compliance requirements
      const requirements = await fetchApplicationCompliance(id);
      setComplianceRequirements(requirements);
      
      // Fetch feedback history
      const feedbackData = await fetchSandboxFeedback(id);
      setFeedback(feedbackData);
      
    } catch (err) {
      console.error("Error loading application data:", err);
      setError("Failed to load application data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplicationData();
  }, [id]);

  const handleSendFeedback = async () => {
    if (!newFeedback.trim() || !application) return;
    
    setSendingFeedback(true);
    try {
      await addSandboxFeedback(
        application.id,
        newFeedback,
        "Administrator", // This should come from the user profile
        "Admin",
        true
      );
      
      // Refresh feedback
      const feedbackData = await fetchSandboxFeedback(application.id);
      setFeedback(feedbackData);
      
      // Clear input
      setNewFeedback("");
      
      toast({
        title: "Feedback sent",
        description: "Your feedback has been sent to the innovator.",
      });
    } catch (err) {
      console.error("Error sending feedback:", err);
      toast({
        title: "Failed to send feedback",
        description: "An error occurred while sending feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSendingFeedback(false);
    }
  };

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
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moh-darkGreen"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Error loading application</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!application) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-500">Application not found</h3>
            <p className="text-sm text-gray-400 mt-1">The requested application does not exist or you don't have permission to view it.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedRequirements = complianceRequirements.filter(req => req.completed).length;
  const totalRequirements = complianceRequirements.length;
  const completionPercentage = totalRequirements > 0 
    ? Math.round((completedRequirements / totalRequirements) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{application.name}</CardTitle>
              <CardDescription>Submitted by {application.user_id}</CardDescription>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(application.status)}
              {getRiskBadge(application.risk_level)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Submitted:</span>
              <span>{format(new Date(application.submitted_at), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Type:</span>
              <span>{application.innovation_type.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Organization:</span>
              <span>{application.organization_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Testing Duration:</span>
              <span>{application.testing_duration || "Not specified"}</span>
            </div>
          </div>
          
          {application.status === 'active' && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <div>Testing Progress ({application.progress}%)</div>
                <div>
                  {application.start_date && application.end_date ? (
                    <span>
                      {format(new Date(application.start_date), 'MMM d')} - {format(new Date(application.end_date), 'MMM d, yyyy')}
                    </span>
                  ) : (
                    <span>No dates set</span>
                  )}
                </div>
              </div>
              <Progress value={application.progress} className="h-2" />
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="compliance">
                Compliance 
                {totalRequirements > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {completedRequirements}/{totalRequirements}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="feedback">
                Feedback
                {feedback.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {feedback.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p>{application.description}</p>
                </div>
                
                {application.regulatory_challenges && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Regulatory Challenges</h3>
                    <p>{application.regulatory_challenges}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Compliance Requirements</h3>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      {completedRequirements} of {totalRequirements} completed ({completionPercentage}%)
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {complianceRequirements.length > 0 ? (
                    complianceRequirements.map(req => (
                      <div 
                        key={req.id} 
                        className={`p-4 border rounded-lg ${req.completed ? 'bg-green-50 border-green-100' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{req.title}</h4>
                            <p className="text-sm text-gray-600">{req.description}</p>
                          </div>
                          <Button 
                            size="sm"
                            variant={req.completed ? "outline" : "default"}
                            className={req.completed ? "text-green-600 border-green-600" : ""}
                            onClick={async () => {
                              try {
                                await updateSandboxComplianceStatus(req.id, !req.completed);
                                // Update local state
                                setComplianceRequirements(prev => 
                                  prev.map(item => item.id === req.id 
                                    ? { ...item, completed: !item.completed } 
                                    : item
                                  )
                                );
                              } catch (err) {
                                toast({
                                  title: "Failed to update status",
                                  description: "An error occurred while updating compliance status.",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            {req.completed ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completed
                              </>
                            ) : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No compliance requirements have been added for this application.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Send Feedback to Innovator</h3>
                  <Textarea 
                    placeholder="Enter feedback for the innovator..."
                    rows={3}
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={handleSendFeedback} 
                      disabled={!newFeedback.trim() || sendingFeedback}
                    >
                      {sendingFeedback ? "Sending..." : "Send Feedback"}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Feedback History</h3>
                  {feedback.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      No feedback has been provided yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {feedback.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">
                                  {item.author} ({item.author_role})
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {format(new Date(item.created_at), 'MMM d, yyyy h:mm a')}
                              </span>
                            </div>
                            <p className="text-sm">{item.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for compliance requirements list
const SandboxComplianceList = ({ requirements, onRequirementsChange }: {
  requirements: SandboxComplianceRequirement[];
  onRequirementsChange: () => void;
}) => {
  const { toast } = useToast();
  
  const handleToggleRequirement = async (requirementId: string, completed: boolean) => {
    try {
      await updateSandboxComplianceStatus(requirementId, completed);
      // Refresh the data
      onRequirementsChange();
      
      toast({
        title: completed ? "Requirement Completed" : "Requirement Reopened",
        description: "Compliance status updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Update Failed",
        description: "Failed to update compliance status. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-3">
      {requirements.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No compliance requirements found for this application.
        </div>
      ) : (
        requirements.map((req) => (
          <div 
            key={req.id} 
            className={`p-4 border rounded-lg ${req.completed ? "bg-green-50 border-green-100" : ""}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{req.title}</h4>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
              <Button 
                size="sm"
                variant={req.completed ? "outline" : "default"}
                className={req.completed ? "text-green-600 border-green-600" : ""}
                onClick={() => handleToggleRequirement(req.id, !req.completed)}
              >
                {req.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </>
                ) : "Mark Complete"}
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// We need to export this component for it to be used elsewhere
export { SandboxComplianceList };
