
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronRight, 
  FileText, 
  Check, 
  AlertTriangle, 
  X, 
  ArrowRight, 
  FileSearch, 
  BookOpen, 
  BarChart2 
} from "lucide-react";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment/Vision2030AlignmentChecker";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold text-moh-darkGreen">Health Policy & Strategy</h1>
          <p className="text-muted-foreground mt-2">
            Explore policy frameworks, assess strategy alignment, and analyze regulatory impacts.
          </p>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full lg:w-2/3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
            <TabsTrigger value="alignment">Vision 2030 Alignment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-moh-darkGreen flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-moh-green" />
                    Policy Frameworks
                  </CardTitle>
                  <CardDescription>
                    Health sector guidance and regulatory frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">National Health Transformation Plan</p>
                        <p className="text-sm text-muted-foreground">Ministry of Health</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">Healthcare Investor Guidelines</p>
                        <p className="text-sm text-muted-foreground">Ministry of Investment</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Digital Health Policy 2023</p>
                        <p className="text-sm text-muted-foreground">Health Technology Authority</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                  </ul>
                  <div className="mt-4 pt-2">
                    <Button variant="outline" className="w-full text-moh-green border-moh-green/50 hover:bg-moh-lightGreen">
                      View All Policy Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-moh-darkGreen flex items-center">
                    <FileSearch className="h-5 w-5 mr-2 text-moh-green" />
                    Recent Assessments
                  </CardTitle>
                  <CardDescription>
                    Latest policy impact and alignment assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">Telehealth Expansion Impact</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            High Alignment
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">3 days ago</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">AI Diagnostic Tools Framework</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Medium Alignment
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">1 week ago</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Medical Device Certification Policy</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Pending Re-assessment
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">2 weeks ago</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-moh-green">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                  </ul>
                  <div className="mt-4 pt-2">
                    <Button variant="outline" className="w-full text-moh-green border-moh-green/50 hover:bg-moh-lightGreen">
                      View All Assessments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-moh-darkGreen flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-moh-green" />
                  Healthcare Policy Tools
                </CardTitle>
                <CardDescription>
                  Tools to help you navigate and align with healthcare policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-moh-lightGreen/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Vision 2030 Alignment</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        Check how your innovation aligns with Vision 2030 healthcare goals
                      </p>
                      <Button className="w-full text-white bg-moh-green hover:bg-moh-darkGreen">
                        Start Assessment <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Policy Impact Simulator</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        Simulate how policy changes might impact the healthcare ecosystem
                      </p>
                      <Button className="w-full text-white bg-amber-600 hover:bg-amber-700">
                        Run Simulation <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Strategy Gap Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        Identify strategic gaps in implementation and policy alignment
                      </p>
                      <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                        Analyze Gaps <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-moh-darkGreen">Upcoming Policy Changes</CardTitle>
                <CardDescription>
                  Stay informed about upcoming changes to healthcare policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-3 rounded-lg bg-moh-lightGreen/10 border border-moh-green/10">
                    <div className="mr-4 mt-1 bg-moh-green/10 p-2 rounded-full">
                      <Check className="h-5 w-5 text-moh-green" />
                    </div>
                    <div>
                      <h4 className="font-medium text-moh-darkGreen">Digital Health Security Framework</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        New security framework for digital health platforms coming into effect on June 1, 2025.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-moh-lightGreen/50 text-moh-darkGreen border-moh-green/30">Compliance Required</Badge>
                        <Badge className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">High Impact</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-amber-50 border border-amber-200/30">
                    <div className="mr-4 mt-1 bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800">Medical Device Regulation Update</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Revised regulations for medical device certification, effective August 15, 2025.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200">Review Recommended</Badge>
                        <Badge className="ml-2 bg-amber-50 text-amber-700 border-amber-200">Medium Impact</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-blue-50 border border-blue-200/30">
                    <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Telehealth Practice Guidelines</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        New clinical practice guidelines for telehealth providers, draft open for public consultation.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">Public Consultation</Badge>
                        <Badge className="ml-2 bg-blue-50 text-blue-700 border-blue-200">Draft Status</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-rose-50 border border-rose-200/30">
                    <div className="mr-4 mt-1 bg-rose-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-rose-800">Health Data Privacy Framework</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enhanced data privacy requirements for healthcare applications, with 6-month compliance period.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-rose-50 text-rose-700 border-rose-200">Mandatory Compliance</Badge>
                        <Badge className="ml-2 bg-rose-50 text-rose-700 border-rose-200">Critical Impact</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-moh-darkGreen flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-moh-green" />
                      Policy Analytics Dashboard
                    </CardTitle>
                    <CardDescription>
                      Insights and metrics on healthcare policy implementation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full bg-moh-lightGreen/10 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Interactive Policy Analytics Dashboard Coming Soon</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-moh-lightGreen/20 p-4 rounded-lg">
                        <h4 className="font-medium text-moh-darkGreen">Vision 2030 Alignment</h4>
                        <div className="text-3xl font-bold text-moh-green mt-2">78%</div>
                        <p className="text-sm text-muted-foreground mt-1">Average alignment score</p>
                      </div>
                      
                      <div className="bg-moh-lightGreen/20 p-4 rounded-lg">
                        <h4 className="font-medium text-moh-darkGreen">Implementation Rate</h4>
                        <div className="text-3xl font-bold text-moh-green mt-2">62%</div>
                        <p className="text-sm text-muted-foreground mt-1">Policy adoption across sectors</p>
                      </div>
                      
                      <div className="bg-moh-lightGreen/20 p-4 rounded-lg">
                        <h4 className="font-medium text-moh-darkGreen">Regulatory Coverage</h4>
                        <div className="text-3xl font-bold text-moh-green mt-2">86%</div>
                        <p className="text-sm text-muted-foreground mt-1">Digital health regulatory coverage</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start border-b pb-3">
                        <FileText className="h-5 w-5 mr-3 text-moh-green mt-0.5" />
                        <div>
                          <p className="font-medium">Healthcare Digital Transformation Q1 2025</p>
                          <p className="text-xs text-muted-foreground">Published May 5, 2025</p>
                        </div>
                      </li>
                      <li className="flex items-start border-b pb-3">
                        <FileText className="h-5 w-5 mr-3 text-moh-green mt-0.5" />
                        <div>
                          <p className="font-medium">Vision 2030 Health Sector Progress</p>
                          <p className="text-xs text-muted-foreground">Published April 22, 2025</p>
                        </div>
                      </li>
                      <li className="flex items-start border-b pb-3">
                        <FileText className="h-5 w-5 mr-3 text-moh-green mt-0.5" />
                        <div>
                          <p className="font-medium">Healthcare Regulatory Landscape 2025</p>
                          <p className="text-xs text-muted-foreground">Published March 18, 2025</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-3 text-moh-green mt-0.5" />
                        <div>
                          <p className="font-medium">AI in Healthcare Policy Framework</p>
                          <p className="text-xs text-muted-foreground">Published February 10, 2025</p>
                        </div>
                      </li>
                    </ul>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full text-moh-green border-moh-green/50 hover:bg-moh-lightGreen">
                        View All Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Strategy Gap Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Digital Health Integration</span>
                        <span className="text-sm text-moh-green">87%</span>
                      </div>
                      <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                        <div className="bg-moh-green h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Rural Healthcare Access</span>
                        <span className="text-sm text-amber-600">62%</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Preventive Healthcare</span>
                        <span className="text-sm text-rose-600">43%</span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: "43%" }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Health Workforce Development</span>
                        <span className="text-sm text-blue-600">71%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "71%" }}></div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <Button className="w-full bg-moh-green hover:bg-moh-darkGreen">
                      Generate Full Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alignment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-moh-darkGreen">Vision 2030 Alignment Checker</CardTitle>
                <CardDescription>
                  Assess how well your innovation, policy, or strategy aligns with Vision 2030 healthcare goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Vision2030AlignmentChecker />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
