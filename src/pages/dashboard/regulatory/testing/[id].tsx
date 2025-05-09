
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { BarChart3, CheckCircle, Upload, Calendar, Loader2 } from "lucide-react";

// Mock test details
const testDetails = {
  id: "1",
  name: "Remote Patient Monitoring System",
  testingPeriod: "2025-05-01 to 2025-07-31",
  daysLeft: 82,
  nextMilestone: "Mid-term report submission",
  nextMilestoneDate: "2025-06-15",
  metrics: [
    { name: "Patients enrolled", target: 50, current: 12 },
    { name: "Data points collected", target: 5000, current: 1280 },
    { name: "Clinical reviews completed", target: 10, current: 2 }
  ]
};

export default function SandboxTestingPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("metrics");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitResults = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Results submitted",
        description: "Your test results have been submitted successfully",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={`${testDetails.name} Testing`} 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{testDetails.name}</h1>
          <Badge className="bg-green-500">Testing Active</Badge>
        </div>
        <p className="text-muted-foreground">
          Testing period: {testDetails.testingPeriod} ({testDetails.daysLeft} days remaining)
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">{testDetails.nextMilestone}</p>
                <p className="text-sm text-muted-foreground">Due: {testDetails.nextMilestoneDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              {testDetails.metrics.map((metric, index) => {
                const percentage = Math.round((metric.current / metric.target) * 100);
                return (
                  <div key={index} className="flex-1">
                    <p className="text-sm font-medium">{metric.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.current}</span>
                      <span className="text-sm text-muted-foreground">/ {metric.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-moh-green h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Test Metrics</TabsTrigger>
          <TabsTrigger value="submit">Submit Results</TabsTrigger>
          <TabsTrigger value="guidance">Testing Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Testing Metrics</CardTitle>
              <CardDescription>Track the progress of your sandbox testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Detailed metrics visualization will be available once more data is collected
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/regulatory/testing/metrics/setup">
                      Configure Metrics
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle>Submit Test Results</CardTitle>
              <CardDescription>Report on the outcomes of your testing period</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitResults} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary of Findings</Label>
                  <Textarea 
                    id="summary" 
                    placeholder="Provide a summary of your key findings and observations..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="safetyEvents">Safety Events</Label>
                  <Textarea 
                    id="safetyEvents" 
                    placeholder="Describe any safety events or incidents that occurred during testing..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metrics">Performance Metrics</Label>
                  <Textarea 
                    id="metrics" 
                    placeholder="Provide quantitative metrics from your testing..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, XLS (max 10MB)
                    </p>
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      multiple
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="conclusion">Conclusion & Next Steps</Label>
                  <Textarea 
                    id="conclusion" 
                    placeholder="Summarize your conclusions and proposed next steps..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit Test Results
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidance">
          <Card>
            <CardHeader>
              <CardTitle>Testing Guidance</CardTitle>
              <CardDescription>Best practices for sandbox testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3>Testing Guidelines</h3>
                <p>
                  Your innovation has been approved for a controlled testing environment. 
                  Here are some guidelines to ensure your testing period is productive and safe:
                </p>
                
                <ol>
                  <li>
                    <strong>Safety First:</strong> Monitor for any adverse events and report them immediately
                    to the regulatory team.
                  </li>
                  <li>
                    <strong>Collect Comprehensive Data:</strong> Ensure you're collecting data points as outlined
                    in your approved testing protocol.
                  </li>
                  <li>
                    <strong>Regular Reporting:</strong> Submit progress reports at the prescribed milestones.
                  </li>
                  <li>
                    <strong>Stay Within Scope:</strong> Only test functionalities that were approved in your application.
                  </li>
                  <li>
                    <strong>Document Everything:</strong> Maintain detailed records of all testing activities and observations.
                  </li>
                </ol>
                
                <h3>Support Resources</h3>
                <p>
                  If you encounter any issues during your testing period, please contact the regulatory support team:
                </p>
                <ul>
                  <li>Email: regulatory-support@moh.gov.sa</li>
                  <li>Phone: +966 11 555 0000</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
