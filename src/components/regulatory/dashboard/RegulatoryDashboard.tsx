
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCircle, Clock, FileText, Shield, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function RegulatoryDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sandbox Status</CardTitle>
            <CardDescription>Your regulatory sandbox progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="flex flex-col items-center">
                <Badge className="bg-green-500 mb-2">Active</Badge>
                <span className="text-3xl font-bold">Stage 2</span>
                <span className="text-sm text-muted-foreground">of 4 stages</span>
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>50%</span>
              </div>
              <Progress value={50} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/dashboard/regulatory/sandbox">
                <ShieldCheck className="mr-2 h-4 w-4" />
                View Sandbox
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>Patient Data</span>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>Clinical Validation</span>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                <span>Security Standards</span>
              </div>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-slate-300 mr-2"></div>
                <span>Device Registration</span>
              </div>
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/dashboard/regulatory/compliance">
                <Shield className="mr-2 h-4 w-4" />
                Compliance Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Required Actions</CardTitle>
            <CardDescription>Complete these actions to proceed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm line-through text-muted-foreground">Submit pilot data</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm line-through text-muted-foreground">Complete risk assessment</span>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Update security documentation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 border rounded-full"></div>
              <span className="text-sm">Schedule final review</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="default" asChild>
              <Link to="/dashboard/regulatory/tasks">
                <FileText className="mr-2 h-4 w-4" />
                View All Tasks
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
              <CardDescription>Your current regulatory applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Medical Device Classification</h3>
                    <p className="text-sm text-muted-foreground">Artificial Intelligence Diagnostic Tool</p>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Application #SFD-2025-0342
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Clinical Trial Approval</h3>
                    <p className="text-sm text-muted-foreground">Remote Patient Monitoring System</p>
                  </div>
                  <Badge variant="outline">Under Review</Badge>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Application #SFD-2025-0189
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/dashboard/regulatory/new-application">
                  New Application
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="requirements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Requirements</CardTitle>
              <CardDescription>Key requirements for your innovation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-moh-green pl-4 py-1">
                  <h3 className="font-medium">Data Protection & Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Requirements for handling sensitive patient data in compliance with Saudi laws.
                  </p>
                  <Button variant="link" size="sm" className="pl-0">
                    View Details
                  </Button>
                </div>
                <div className="border-l-4 border-moh-green pl-4 py-1">
                  <h3 className="font-medium">Clinical Validation Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Required testing and validation for medical innovations in Saudi healthcare system.
                  </p>
                  <Button variant="link" size="sm" className="pl-0">
                    View Details
                  </Button>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <h3 className="font-medium">Security & Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">
                    Technical security requirements for health technology in Saudi Arabia.
                  </p>
                  <Button variant="link" size="sm" className="pl-0">
                    View Details
                  </Button>
                </div>
                <div className="border-l-4 border-slate-300 pl-4 py-1">
                  <h3 className="font-medium">Medical Device Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Process and requirements for registering medical devices in the Kingdom.
                  </p>
                  <Button variant="link" size="sm" className="pl-0">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Timeline</CardTitle>
              <CardDescription>Key dates and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-slate-200 pl-8 ml-4 space-y-10">
                {/* Timeline Item 1 */}
                <div className="relative">
                  <div className="absolute -left-[39px] h-5 w-5 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Apr 15, 2025</p>
                    <h3 className="font-medium">Application Submitted</h3>
                    <p className="text-sm">Initial application for regulatory sandbox accepted</p>
                  </div>
                </div>
                
                {/* Timeline Item 2 */}
                <div className="relative">
                  <div className="absolute -left-[39px] h-5 w-5 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Apr 28, 2025</p>
                    <h3 className="font-medium">Initial Review Completed</h3>
                    <p className="text-sm">Passed preliminary assessment and moved to Stage 2</p>
                  </div>
                </div>
                
                {/* Timeline Item 3 */}
                <div className="relative">
                  <div className="absolute -left-[39px] h-5 w-5 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">May 20, 2025</p>
                    <h3 className="font-medium">Security Review</h3>
                    <p className="text-sm">In progress - Technical security assessment</p>
                  </div>
                </div>
                
                {/* Timeline Item 4 */}
                <div className="relative">
                  <div className="absolute -left-[39px] h-5 w-5 rounded-full bg-slate-100 border-2 border-slate-300">
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jun 15, 2025</p>
                    <h3 className="font-medium text-slate-500">Final Assessment</h3>
                    <p className="text-sm text-slate-500">Scheduled - Complete regulatory review</p>
                  </div>
                </div>
                
                {/* Timeline Item 5 */}
                <div className="relative">
                  <div className="absolute -left-[39px] h-5 w-5 rounded-full bg-slate-100 border-2 border-slate-300">
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jul 1, 2025</p>
                    <h3 className="font-medium text-slate-500">Approval Decision</h3>
                    <p className="text-sm text-slate-500">Pending - Final regulatory decision</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
