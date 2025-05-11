
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { FileCheck, Upload, Download, MessageSquare, Clock, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { ComplianceRequirement, ComplianceRequirementCard } from "@/components/regulatory/ComplianceRequirementCard";

// Mock application details
const applicationDetails = {
  id: "1",
  name: "Remote Patient Monitoring System",
  status: "in-review",
  submittedDate: "2025-04-28",
  framework: "Medical Devices Regulatory Framework",
  description: "A wearable IoT-based system that continuously monitors vital signs of patients and transmits the data to healthcare providers in real-time. The system includes sensors for heart rate, blood pressure, temperature, and oxygen saturation levels.",
  progress: 65,
  requirements: [
    {
      id: "1",
      title: "Medical Device Classification",
      description: "Confirm the classification of your device according to risk level and intended use.",
      status: "required" as "required",
      completed: true
    },
    {
      id: "2",
      title: "Data Privacy Assessment",
      description: "Complete assessment of how patient data is processed, stored, and protected.",
      status: "required" as "required", 
      completed: true
    },
    {
      id: "3",
      title: "Clinical Validation Plan",
      description: "Submit a plan for clinical testing and validation of the monitoring system's accuracy.",
      status: "required" as "required",
      completed: false
    },
    {
      id: "4",
      title: "Security Testing Results",
      description: "Provide results from security vulnerability assessments performed on your solution.",
      status: "required" as "required",
      completed: false
    }
  ],
  timeline: [
    {
      date: "2025-04-28",
      status: "Application submitted",
      completed: true
    },
    {
      date: "2025-05-02",
      status: "Initial review completed",
      completed: true
    },
    {
      date: "2025-05-10",
      status: "Technical assessment",
      completed: false
    },
    {
      date: "2025-05-25",
      status: "Compliance verification",
      completed: false
    },
    {
      date: "2025-06-10",
      status: "Final approval",
      completed: false
    }
  ],
  feedback: [
    {
      id: "1",
      date: "2025-05-02",
      author: "Dr. Mohammed Al-Sayed",
      role: "Regulatory Specialist",
      message: "Your device appears to meet the basic requirements for a Class II medical device. Please provide more detailed specifications about the sensors being used and their accuracy ranges.",
      isOfficial: true
    }
  ]
};

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleMarkComplete = (id: string) => {
    toast({
      title: "Requirement updated",
      description: "Compliance requirement marked as completed",
    });
  };
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage) return;
    
    toast({
      title: "Feedback submitted",
      description: "Your message has been sent to the regulatory team",
    });
    setFeedbackMessage("");
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={applicationDetails.name} 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
          { label: "Applications", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{applicationDetails.name}</h1>
            {applicationDetails.status === "approved" ? (
              <Badge className="bg-green-500">Approved</Badge>
            ) : applicationDetails.status === "in-review" ? (
              <Badge className="bg-amber-500">In Review</Badge>
            ) : applicationDetails.status === "draft" ? (
              <Badge variant="outline">Draft</Badge>
            ) : (
              <Badge variant="destructive">Rejected</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Framework: {applicationDetails.framework}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Submitted: {applicationDetails.submittedDate}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium mb-1">Application progress</p>
          <div className="w-full md:w-64">
            <Progress value={applicationDetails.progress} className="h-2" />
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>{applicationDetails.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
                <CardDescription>Current status and next steps</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {applicationDetails.timeline.map((item, index) => (
                    <li key={index} className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        item.completed 
                          ? "bg-green-100 ring-8 ring-white" 
                          : "bg-gray-100 ring-8 ring-white"
                      }`}>
                        {item.completed ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Clock className="w-3 h-3 text-gray-500" />
                        )}
                      </span>
                      <h3 className={`flex items-center mb-1 text-sm font-semibold ${
                        item.completed ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {item.status}
                        {index === 0 && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                            Latest
                          </span>
                        )}
                      </h3>
                      <time className="block mb-2 text-xs font-normal leading-none text-gray-400">
                        {item.completed ? "Completed on " : "Expected by "}{item.date}
                      </time>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>Documents and assessments required for your innovation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationDetails.requirements.map(requirement => (
                  <ComplianceRequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    onMarkComplete={handleMarkComplete}
                  />
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t flex justify-end">
                <Button asChild>
                  <Link to="/dashboard/regulatory/documents/upload">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload Documents
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Required and submitted documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
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
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Feedback</CardTitle>
              <CardDescription>Communication from regulatory experts</CardDescription>
            </CardHeader>
            <CardContent>
              {applicationDetails.feedback.length > 0 ? (
                <div className="space-y-6">
                  {applicationDetails.feedback.map(item => (
                    <div key={item.id} className={`border rounded-md p-4 ${item.isOfficial ? 'border-blue-200 bg-blue-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{item.author}</p>
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.date}
                          {item.isOfficial && <Badge className="ml-2 bg-blue-500">Official</Badge>}
                        </div>
                      </div>
                      <p className="mt-3">{item.message}</p>
                    </div>
                  ))}
                  
                  <form onSubmit={handleSubmitFeedback} className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Send Message</h3>
                    <Textarea 
                      placeholder="Type your message or question for the regulatory team..."
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end mt-3">
                      <Button type="submit" disabled={!feedbackMessage}>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No feedback has been provided for this application yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
