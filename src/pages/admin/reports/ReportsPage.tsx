import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Download,
  Users,
  Activity,
  Lightbulb,
  FileText,
  Calendar,
  Globe
} from 'lucide-react';

// Moved from index.tsx
const mockUserGrowth = [
  { month: 'Jan', users: 124 },
  { month: 'Feb', users: 156 },
  { month: 'Mar', users: 193 },
  { month: 'Apr', users: 247 },
  { month: 'May', users: 305 },
  { month: 'Jun', users: 389 }
];

const mockInnovationsByMonth = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 18 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 25 },
  { month: 'May', count: 22 },
  { month: 'Jun', count: 30 }
];

const mockUserDistribution = [
  { type: 'Innovators', count: 453 },
  { type: 'Healthcare Providers', count: 287 },
  { type: 'Investors', count: 124 },
  { type: 'Researchers', count: 198 },
  { type: 'Administrators', count: 56 }
];

const mockChallengeSubmissions = [
  { challenge: 'Remote Patient Monitoring', submissions: 34 },
  { challenge: 'AI Diagnostics', submissions: 29 },
  { challenge: 'Supply Chain Optimization', submissions: 17 },
  { challenge: 'Mental Health Platform', submissions: 42 },
  { challenge: 'Elderly Care', submissions: 21 }
];

export default function AdminReportsPage() {
  return (
    <AdminLayout
      title="Analytics & Reports"
      description="View and generate platform analytics reports"
    >
      <div className="flex justify-end mb-6">
        <Button variant="outline" className="mr-2">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button>Generate Report</Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="flex items-end h-[200px] w-[80%] justify-between mt-4">
                    {mockUserGrowth.map((item, index) => (
                      <div key={index} className="flex flex-col items-center w-12">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm" 
                          style={{ height: `${item.users / 4}px`, width: '20px' }}
                        ></div>
                        <span className="text-xs mt-1 text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-xs mt-4">
                    Chart visualization will be enhanced in the next phase
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                  Monthly Innovations
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="flex items-end h-[200px] w-[80%] justify-between mt-4">
                    {mockInnovationsByMonth.map((item, index) => (
                      <div key={index} className="flex flex-col items-center w-12">
                        <div 
                          className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm" 
                          style={{ height: `${item.count * 5}px`, width: '20px' }}
                        ></div>
                        <span className="text-xs mt-1 text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-xs mt-4">
                    Chart visualization will be enhanced in the next phase
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-amber-500" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <div className="w-full h-full flex flex-col p-4">
                  <div className="flex flex-col space-y-2">
                    {mockUserDistribution.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 bg-${['blue', 'green', 'amber', 'purple', 'pink'][index]}-${index % 2 ? '400' : '500'}`}></div>
                        <span className="text-sm">{item.type}</span>
                        <span className="ml-auto text-sm font-medium">{item.count}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-muted-foreground text-xs">
                      Pie chart visualization will be implemented in the next phase
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                  Challenge Submissions
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50">
                <div className="w-full h-full flex flex-col p-4">
                  <div className="flex-1">
                    {mockChallengeSubmissions.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="truncate max-w-[80%]">{item.challenge}</span>
                          <span>{item.submissions}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div 
                            className="h-full rounded-full bg-purple-500" 
                            style={{ width: `${(item.submissions / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-xs text-center mt-2">
                    Bar chart visualization will be enhanced in the next phase
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">1,118</div>
                    <div className="text-xs text-muted-foreground">+243 this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">792</div>
                    <div className="text-xs text-muted-foreground">71% of total users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-amber-500 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">23.4 min</div>
                    <div className="text-xs text-muted-foreground">Avg. session time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>User distribution across regions</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex flex-col items-center justify-center">
              <Globe className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="space-y-4 max-w-md text-center">
                <h3 className="text-lg font-medium">Geographic Distribution</h3>
                <p className="text-muted-foreground">Map visualization will be implemented in the next phase</p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="font-medium">Riyadh Region</div>
                    <div className="text-2xl font-bold text-moh-green">42%</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="font-medium">Makkah Region</div>
                    <div className="text-2xl font-bold text-moh-gold">28%</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="font-medium">Eastern Province</div>
                    <div className="text-2xl font-bold text-blue-500">17%</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="font-medium">Other Regions</div>
                    <div className="text-2xl font-bold text-amber-500">13%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="space-y-4 text-center">
                  <Activity className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium">User Activity</h3>
                  <p className="text-muted-foreground">
                    Engagement metrics visualization will be implemented in the next phase
                  </p>
                  <div className="pt-4 grid grid-cols-3 gap-2 max-w-md mx-auto">
                    <div className="bg-muted/30 p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Daily Active</div>
                      <div className="text-lg font-bold">437</div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Weekly Active</div>
                      <div className="text-lg font-bold">792</div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Monthly Active</div>
                      <div className="text-lg font-bold">1,021</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>Most used platform features</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Innovations</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Challenges</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Knowledge Hub</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Investment</span>
                      <span className="font-medium">54%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Regulatory</span>
                      <span className="font-medium">41%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-pink-500 rounded-full" style={{ width: '41%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Content Popularity</CardTitle>
                <CardDescription>Most viewed resources and pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Most Viewed Resources</h4>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-sm">Digital Health Strategy Guide</span>
                          <span className="ml-auto text-xs font-medium">3,217 views</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <FileText className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Healthcare AI Implementation</span>
                          <span className="ml-auto text-xs font-medium">2,945 views</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <FileText className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-sm">Medical Device Regulations</span>
                          <span className="ml-auto text-xs font-medium">2,124 views</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Most Active Challenges</h4>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <Lightbulb className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-sm">Remote Patient Monitoring</span>
                          <span className="ml-auto text-xs font-medium">47 participants</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <Lightbulb className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Mental Health Platform</span>
                          <span className="ml-auto text-xs font-medium">42 participants</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/20 rounded-md">
                          <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-sm">AI for Disease Detection</span>
                          <span className="ml-auto text-xs font-medium">32 participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="innovations">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Analytics</CardTitle>
              <CardDescription>Track innovation submissions and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/20 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Innovations</h3>
                  <div className="text-2xl font-bold">327</div>
                  <div className="text-xs text-green-600 mt-1">+24% from last quarter</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Implementation Rate</h3>
                  <div className="text-2xl font-bold">42%</div>
                  <div className="text-xs text-amber-600 mt-1">+5% from last quarter</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Development Time</h3>
                  <div className="text-2xl font-bold">7.3 months</div>
                  <div className="text-xs text-green-600 mt-1">-1.2 months from last year</div>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Innovation Categories Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
                    {[
                      { category: "Digital Health", count: 103, color: "bg-blue-100 text-blue-800" },
                      { category: "MedTech", count: 84, color: "bg-green-100 text-green-800" },
                      { category: "AI & ML", count: 76, color: "bg-amber-100 text-amber-800" },
                      { category: "Telehealth", count: 42, color: "bg-purple-100 text-purple-800" },
                      { category: "Health Data", count: 22, color: "bg-pink-100 text-pink-800" }
                    ].map((item, i) => (
                      <div key={i} className={`p-3 rounded-md ${item.color}`}>
                        <div className="text-xs">{item.category}</div>
                        <div className="text-lg font-bold mt-1">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Innovation Funding Status</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Detailed funding charts will be implemented in Phase 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
