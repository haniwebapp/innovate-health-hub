
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";

// Sample data - in a real application, this would come from your API
const challengeData = [
  { name: "Jan", count: 4 },
  { name: "Feb", count: 6 },
  { name: "Mar", count: 8 },
  { name: "Apr", count: 12 },
  { name: "May", count: 9 },
  { name: "Jun", count: 14 },
];

const submissionData = [
  { name: "Jan", submissions: 12 },
  { name: "Feb", submissions: 19 },
  { name: "Mar", submissions: 25 },
  { name: "Apr", submissions: 34 },
  { name: "May", submissions: 30 },
  { name: "Jun", submissions: 42 },
];

const userData = [
  { name: "Jan", users: 20 },
  { name: "Feb", users: 35 },
  { name: "Mar", users: 48 },
  { name: "Apr", users: 67 },
  { name: "May", users: 78 },
  { name: "Jun", users: 95 },
];

const categoryData = [
  { name: "Healthcare Innovation", value: 35 },
  { name: "Patient Care", value: 25 },
  { name: "Digital Health", value: 20 },
  { name: "Medical Devices", value: 15 },
  { name: "Public Health", value: 5 },
];

const COLORS = ['#9b87f5', '#10B981', '#8B5CF6', '#F97316', '#0EA5E9'];

const AdminAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [chartData, setChartData] = useState({
    challenges: challengeData,
    submissions: submissionData,
    users: userData,
    categories: categoryData,
  });

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-md p-2 shadow-sm">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout 
      title="Analytics Dashboard"
      description="View and analyze platform metrics and data"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +32% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 mt-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution</CardTitle>
                <CardDescription>
                  Platform activity by category
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.categories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <RechartsTooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>
                  Overall platform growth metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={submissionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#9b87f5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Summary</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">User Types</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Healthcare</span>
                      <span className="text-xs font-medium">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary rounded-full h-1.5" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Research</span>
                      <span className="text-xs font-medium">31%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary rounded-full h-1.5" style={{ width: '31%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Administration</span>
                      <span className="text-xs font-medium">16%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary rounded-full h-1.5" style={{ width: '16%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Challenge Status</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-green-500">14</Badge>
                      <span className="text-xs">Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-amber-500">3</Badge>
                      <span className="text-xs">Draft</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-blue-500">7</Badge>
                      <span className="text-xs">Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Submission Status</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-amber-500">28</Badge>
                      <span className="text-xs">Pending</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-green-500">87</Badge>
                      <span className="text-xs">Approved</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-red-500">27</Badge>
                      <span className="text-xs">Rejected</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">User Activity</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-green-500">68</Badge>
                      <span className="text-xs">Last 7 days</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-blue-500">82</Badge>
                      <span className="text-xs">Last 30 days</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-slate-500">13</Badge>
                      <span className="text-xs">Inactive (30+ days)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Analytics</CardTitle>
              <CardDescription>
                Number of challenges created over time
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData.challenges}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Updated today at 2:30 PM
              </p>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active</span>
                    <Badge className="bg-green-500">14</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draft</span>
                    <Badge className="bg-amber-500">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <Badge className="bg-blue-500">7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Healthcare Innovation</span>
                    <Badge>8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Patient Care</span>
                    <Badge>6</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Digital Health</span>
                    <Badge>5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medical Devices</span>
                    <Badge>3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Analytics</CardTitle>
              <CardDescription>
                Number of submissions over time
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData.submissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="submissions" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Updated today at 2:30 PM
              </p>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Review</span>
                    <Badge className="bg-amber-500">28</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Approved</span>
                    <Badge className="bg-green-500">87</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rejected</span>
                    <Badge className="bg-red-500">27</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">King Fahad Medical City</span>
                    <Badge>23</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">King Faisal Specialist Hospital</span>
                    <Badge>19</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Saudi Health Council</span>
                    <Badge>15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Individual Contributors</span>
                    <Badge>12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Number of users registered over time
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData.users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Updated today at 2:30 PM
              </p>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Healthcare Professionals</span>
                    <Badge>42</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Researchers</span>
                    <Badge>31</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hospital Administrators</span>
                    <Badge>16</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <Badge>6</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active in last 7 days</span>
                    <Badge className="bg-green-500">68</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active in last 30 days</span>
                    <Badge className="bg-blue-500">82</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inactive (30+ days)</span>
                    <Badge className="bg-slate-500">13</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
