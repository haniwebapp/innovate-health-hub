
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Building, 
  Clock, 
  Activity,
  X,
  CheckCheck,
  PenLine
} from 'lucide-react';
import { format } from 'date-fns';

// Mock application data
const mockApplication = {
  id: '1',
  name: 'Telemedicine Remote Diagnosis Platform',
  innovator: 'MediTech Solutions',
  innovationType: 'Digital Health',
  description: 'A platform that allows healthcare professionals to diagnose patients remotely using AI-assisted analysis of symptoms and vital signs collected through mobile devices. The platform aims to provide accurate preliminary diagnoses for common conditions, reducing the need for in-person visits for routine checks.',
  organization: {
    name: 'MediTech Solutions',
    type: 'Startup',
    website: 'https://meditechsolutions.example'
  },
  regulatoryChallenges: 'Our primary challenge is ensuring compliance with data privacy regulations while maintaining the diagnostic accuracy of AI algorithms. We also need clarity on the classification of our solution as a medical device vs. a wellness platform.',
  submittedAt: '2023-12-15T10:30:00Z',
  startDate: '2024-02-01T00:00:00Z',
  endDate: '2024-05-01T00:00:00Z',
  testingDuration: '3 months',
  status: 'approved',
  riskLevel: 'medium',
  requirements: [
    {
      id: '1',
      title: 'Data Privacy Assessment',
      description: 'Complete assessment of data privacy practices and GDPR/HIPAA compliance.',
      status: 'required',
      completed: true
    },
    {
      id: '2',
      title: 'Medical Device Classification',
      description: 'Determine if the software qualifies as a medical device and requires corresponding certification.',
      status: 'required',
      completed: true
    },
    {
      id: '3',
      title: 'AI Algorithm Validation',
      description: 'Validate the diagnostic accuracy of AI algorithms against established medical standards.',
      status: 'required',
      completed: false
    },
    {
      id: '4',
      title: 'User Testing Documentation',
      description: 'Provide results of usability testing with healthcare professionals.',
      status: 'recommended',
      completed: false
    }
  ],
  documents: [
    {
      id: '1',
      name: 'Technical Documentation.pdf',
      fileType: 'pdf',
      size: 2450000,
      uploadedAt: '2023-12-14T15:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Data Protection Impact Assessment.docx',
      fileType: 'docx',
      size: 1200000,
      uploadedAt: '2023-12-14T16:20:00Z',
      status: 'approved'
    },
    {
      id: '3',
      name: 'Clinical Validation Protocol.pdf',
      fileType: 'pdf',
      size: 3600000,
      uploadedAt: '2023-12-15T09:15:00Z',
      status: 'pending'
    }
  ],
  feedback: [
    {
      id: '1',
      message: 'The application demonstrates a clear understanding of regulatory challenges. Please provide more details on how patient data will be secured during transmission.',
      author: 'Dr. Sarah Johnson',
      authorRole: 'Regulatory Reviewer',
      createdAt: '2023-12-18T14:20:00Z',
      isOfficial: true
    },
    {
      id: '2',
      message: "We've updated our security protocol to include end-to-end encryption for all data transmission. Additional details provided in the updated technical documentation.",
      author: 'Thomas Chen',
      authorRole: 'MediTech Solutions',
      createdAt: '2023-12-19T10:45:00Z',
      isOfficial: false
    }
  ],
  testResults: [
    {
      id: '1',
      testName: 'Security Assessment',
      status: 'passed',
      score: 92,
      testDate: '2024-01-10T00:00:00Z',
      notes: 'Excellent implementation of security protocols. Minor recommendations provided for additional encryption.'
    },
    {
      id: '2',
      testName: 'Data Protection Compliance',
      status: 'passed',
      score: 88,
      testDate: '2024-01-12T00:00:00Z',
      notes: 'Meets all regulatory requirements for personal health information protection.'
    },
    {
      id: '3',
      testName: 'Diagnostic Accuracy Assessment',
      status: 'in-progress',
      testDate: '2024-01-15T00:00:00Z',
      notes: 'Initial results promising. Further testing required for less common conditions.'
    }
  ]
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    passed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    'in-progress': 'bg-blue-100 text-blue-800'
  };

  const style = statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  
  return (
    <Badge className={style} variant="outline">
      {status === 'in-review' ? 'In Review' : 
       status === 'in-progress' ? 'In Progress' : 
       status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function SandboxApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState('overview');
  
  // In a real implementation, you would fetch the application data based on the id
  const application = mockApplication; // This would be fetched from API
  
  const updateApplicationStatus = (status: string) => {
    // Implementation for updating status would go here
    console.log(`Updating application ${id} status to ${status}`);
  };
  
  const markRequirementComplete = (requirementId: string, completed: boolean) => {
    // Implementation for marking requirement as complete would go here
    console.log(`Marking requirement ${requirementId} as ${completed ? 'complete' : 'incomplete'}`);
  };

  return (
    <div className="space-y-6">
      {/* Application header with status and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-muted/40 p-4 rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold">{application.name}</h2>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <StatusBadge status={application.status} />
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {application.innovationType}
            </Badge>
            <Badge variant="outline" className={application.riskLevel === 'high' ? 'bg-red-50 text-red-700' : application.riskLevel === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}>
              {application.riskLevel.charAt(0).toUpperCase() + application.riskLevel.slice(1)} Risk
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {application.status === 'pending' && (
            <>
              <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50" onClick={() => updateApplicationStatus('approved')}>
                <CheckCheck className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50" onClick={() => updateApplicationStatus('rejected')}>
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
          {application.status === 'approved' && (
            <Button variant="outline" onClick={() => updateApplicationStatus('in-review')}>
              <PenLine className="h-4 w-4 mr-1" />
              Edit Assessment
            </Button>
          )}
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="bg-muted grid w-full grid-cols-4 h-11 items-stretch">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Application details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{application.description}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Submitted</h4>
                    <p className="text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {format(new Date(application.submittedAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Testing Duration</h4>
                    <p className="text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {application.testingDuration}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Start Date</h4>
                    <p className="text-sm">
                      {format(new Date(application.startDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">End Date</h4>
                    <p className="text-sm">
                      {format(new Date(application.endDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Regulatory Challenges</h4>
                  <p className="text-sm text-muted-foreground">{application.regulatoryChallenges}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Organization info and test results */}
            <div className="space-y-6">
              {/* Organization info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                    Organization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Name</h4>
                      <p className="text-sm">{application.organization.name}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Type</h4>
                      <p className="text-sm">{application.organization.type}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Website</h4>
                      <a 
                        href={application.organization.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {application.organization.website}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Test results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.testResults.map(test => (
                    <div key={test.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold">{test.testName}</h4>
                        <StatusBadge status={test.status} />
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {test.notes}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {format(new Date(test.testDate), 'MMM d, yyyy')}
                        </span>
                        {test.score && (
                          <span className="font-medium">
                            Score: {test.score}/100
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Requirements Tab */}
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.requirements.map(req => (
                <div key={req.id} className={`border rounded-md p-4 ${req.completed ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {req.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-base font-medium flex items-center">
                          {req.title}
                          <Badge 
                            variant="outline" 
                            className={req.status === 'required' ? 'ml-2 bg-red-50 text-red-700' : 'ml-2 bg-blue-50 text-blue-700'}
                          >
                            {req.status === 'required' ? 'Required' : 'Recommended'}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {req.description}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markRequirementComplete(req.id, !req.completed)}
                      className={req.completed ? 'text-green-700' : ''}
                    >
                      {req.completed ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Application Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{doc.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {(doc.size / 1000000).toFixed(1)} MB • {doc.fileType.toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded {format(new Date(doc.uploadedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <StatusBadge status={doc.status} />
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Communication & Feedback</CardTitle>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Add Comment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {application.feedback.map(item => (
                  <div key={item.id} className={`border rounded-md p-4 ${item.isOfficial ? 'border-blue-200 bg-blue-50/50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium flex items-center">
                          {item.author}
                          {item.isOfficial && (
                            <Badge className="ml-2 bg-blue-500" variant="secondary">
                              Official
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.authorRole}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    <p className="mt-3 text-sm">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
