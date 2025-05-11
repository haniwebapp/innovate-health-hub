
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment/Vision2030AlignmentChecker';
import { PolicyImpactSimulator } from '@/components/policy/PolicyImpactSimulator';
import { StrategyAnalytics } from '@/components/policy/strategy/StrategyAnalytics';
import { BarChart3, BookOpen, LucideFolder, Settings, ShieldCheck } from 'lucide-react';

export default function StrategyDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview");
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Strategy Dashboard" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">MoH Strategy Dashboard</h1>
        <p className="text-muted-foreground">
          Strategic planning and policy alignment tools for healthcare innovation
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alignment">Vision 2030</TabsTrigger>
          <TabsTrigger value="simulation">Impact Simulation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategy Overview</CardTitle>
                <CardDescription>
                  Key strategic initiatives and tools for healthcare innovation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Strategy Dashboard provides tools and resources to align healthcare innovations 
                  with Saudi Arabia's Vision 2030 objectives and simulate their potential impact.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2"
                    onClick={() => setActiveTab("alignment")}
                  >
                    <ShieldCheck className="h-4 w-4" /> Vision 2030 Alignment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2"
                    onClick={() => setActiveTab("simulation")}
                  >
                    <BarChart3 className="h-4 w-4" /> Impact Simulation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <Settings className="h-4 w-4" /> Strategy Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2"
                    onClick={() => setActiveTab("resources")}
                  >
                    <BookOpen className="h-4 w-4" /> Policy Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Strategic Priorities</CardTitle>
                <CardDescription>
                  Ministry of Health strategic focus areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-moh-green"></div>
                    <span>Digital transformation of healthcare services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-moh-green"></div>
                    <span>Expanding preventive healthcare initiatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-moh-green"></div>
                    <span>Improving healthcare access in underserved regions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-moh-green"></div>
                    <span>Developing healthcare workforce capabilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-moh-green"></div>
                    <span>Enhancing healthcare system efficiency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Vision 2030 Healthcare Transformation Program</CardTitle>
              <CardDescription>
                Key performance indicators and strategic goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-moh-green">260+</div>
                  <div className="text-sm text-muted-foreground">Primary Healthcare Centers</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-moh-green">30%</div>
                  <div className="text-sm text-muted-foreground">Reduction in Waiting Times</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-moh-green">88%</div>
                  <div className="text-sm text-muted-foreground">Patient Satisfaction Target</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-moh-green">2.2x</div>
                  <div className="text-sm text-muted-foreground">Private Sector Contribution</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Transformation Goals</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Improve access to healthcare services</li>
                  <li>• Enhance quality and efficiency of healthcare</li>
                  <li>• Promote prevention against health risks</li>
                  <li>• Improve healthcare governance</li>
                  <li>• Promote e-health innovations and digital transformation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alignment">
          <Vision2030AlignmentChecker />
        </TabsContent>
        
        <TabsContent value="simulation">
          <PolicyImpactSimulator />
        </TabsContent>
        
        <TabsContent value="analytics">
          <StrategyAnalytics />
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Policy Resources
              </CardTitle>
              <CardDescription>
                Strategic documents and resources for healthcare policy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Vision 2030 Healthcare Documents</h3>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between items-center text-sm">
                      <span>Healthcare Transformation Strategy</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Digital Health Strategy</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Healthcare Workforce Development</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Policy Development Guides</h3>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between items-center text-sm">
                      <span>Policy Creation Framework</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Impact Assessment Methodology</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Strategic Planning Toolkit</span>
                      <Button size="sm" variant="ghost">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Recent Policy Updates</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium">Healthcare Data Protection Policy</p>
                    <p className="text-muted-foreground">Updated guidelines on handling patient data in compliance with national regulations.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Telehealth Services Framework</p>
                    <p className="text-muted-foreground">New regulatory framework for telehealth service providers.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Private Sector Participation</p>
                    <p className="text-muted-foreground">Updated guidelines for public-private partnerships in healthcare delivery.</p>
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
