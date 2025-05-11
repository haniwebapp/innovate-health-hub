import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Loader2, 
  PlusCircle,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegulatoryFrameworkCard } from "../RegulatoryFrameworkCard";
import { SandboxApplicationList } from "../sandbox/SandboxApplicationList";
import { ComplianceRequirementCard } from "../ComplianceRequirementCard";

import { 
  fetchRegulatoryFrameworks, 
  fetchUserApplications, 
  RegulatoryFramework,
  SandboxApplication
} from "@/utils/regulatoryUtils";

export function RegulatoryDashboard() {
  const [frameworks, setFrameworks] = useState<RegulatoryFramework[]>([]);
  const [applications, setApplications] = useState<SandboxApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [frameworksData, applicationsData] = await Promise.all([
          fetchRegulatoryFrameworks(),
          fetchUserApplications()
        ]);
        
        setFrameworks(frameworksData);
        setApplications(applicationsData);
      } catch (err: any) {
        console.error("Error loading regulatory data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Calculate statistics for overview
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const inReviewApplications = applications.filter(app => app.status === 'in-review').length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-moh-darkGreen tracking-tight">
            Regulatory Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your regulatory applications and sandbox testing
          </p>
        </div>
        
        <Button 
          asChild
          className="bg-moh-green hover:bg-moh-darkGreen self-start"
        >
          <Link to="/dashboard/regulatory/apply">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
          <p>Loading regulatory data...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-amber-500" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{pendingApplications}</span>
                  <Badge variant="outline" className="text-amber-500 bg-amber-50 border-amber-200">
                    Needs Action
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  In Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{inReviewApplications}</span>
                  <Badge variant="outline" className="text-blue-500 bg-blue-50 border-blue-200">
                    Processing
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  Approved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{approvedApplications}</span>
                  <Badge variant="outline" className="text-green-500 bg-green-50 border-green-200">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {applications.length > 0 ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Your Recent Applications</CardTitle>
                      <CardDescription>
                        Your most recent regulatory sandbox applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SandboxApplicationList 
                        applications={applications.slice(0, 3)} 
                        showViewAll={applications.length > 3}
                        viewAllUrl="/dashboard/regulatory/applications"
                      />
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Frameworks</CardTitle>
                        <CardDescription>
                          Available regulatory frameworks
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {frameworks.slice(0, 2).map((framework) => (
                          <RegulatoryFrameworkCard 
                            key={framework.id}
                            framework={{
                              ...framework,
                              completedSteps: 0, // This would come from user progress data
                              steps: [] // This would come from framework steps data
                            }}
                            compact
                          />
                        ))}
                        
                        {frameworks.length > 2 && (
                          <div className="pt-2 text-center">
                            <Button 
                              variant="ghost" 
                              className="text-moh-green"
                              asChild
                            >
                              <Link to="/dashboard/regulatory/frameworks">
                                View all frameworks
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Resources</CardTitle>
                        <CardDescription>
                          Regulatory guidance and documentation
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {["Sandbox Application Guide", "Compliance Documentation", "Testing Guidelines"].map((resource, i) => (
                          <div key={i} className="flex items-center p-3 border rounded-lg">
                            <FileText className="h-5 w-5 text-moh-green mr-3" />
                            <div className="flex-1">
                              <h3 className="text-sm font-medium">{resource}</h3>
                              <p className="text-xs text-muted-foreground">
                                PDF • Updated {new Date().toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create your first regulatory sandbox application to test innovations in a controlled environment with reduced regulatory barriers.
                  </p>
                  <Button 
                    asChild
                    className="bg-moh-green hover:bg-moh-darkGreen"
                  >
                    <Link to="/dashboard/regulatory/apply">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Start Application
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Applications</CardTitle>
                  <CardDescription>
                    All your regulatory sandbox applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <SandboxApplicationList 
                      applications={applications} 
                      showViewAll={false}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        You haven't submitted any applications yet
                      </p>
                      <Button 
                        asChild
                        className="bg-moh-green hover:bg-moh-darkGreen"
                      >
                        <Link to="/dashboard/regulatory/apply">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New Application
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="frameworks">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Regulatory Frameworks</CardTitle>
                  <CardDescription>
                    Frameworks applicable to your healthcare innovations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {frameworks.map((framework) => (
                    <RegulatoryFrameworkCard 
                      key={framework.id}
                      framework={{
                        ...framework,
                        completedSteps: 0, // This would come from user progress data
                        steps: [] // This would come from framework steps data
                      }}
                    />
                  ))}
                  
                  {frameworks.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No frameworks available
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </motion.div>
  );
}
