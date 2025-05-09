
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

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

const AdminAnalyticsPage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("challenges");

  useEffect(() => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to view this page.",
      });
    }
  }, [isAdmin, toast]);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-200 rounded-md">
        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
        <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
        <p className="text-red-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          View and analyze platform metrics and data.
        </p>
      </div>
      
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
        </TabsList>
        
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
                <BarChart data={challengeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
                <LineChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
                <LineChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
    </div>
  );
};

export default AdminAnalyticsPage;
