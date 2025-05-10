
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUserStats from "@/components/admin/AdminUserStats";
import { UserProfile } from "@/types/admin";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  AlertTriangle, 
  Layers, 
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Shield,
  ChevronRight,
  Clock
} from "lucide-react";

// Demo data for the dashboard
const mockUsers: UserProfile[] = [
  {
    id: "1",
    email: "john@mohplatform.sa",
    firstName: "John",
    lastName: "Ahmed",
    userType: "Healthcare Provider",
    organization: "King Fahad Medical City",
    lastSignIn: "2025-05-09",
    status: "active"
  },
  {
    id: "2",
    email: "sarah@mohplatform.sa",
    firstName: "Sarah",
    lastName: "Al-Otaibi",
    userType: "Innovator",
    organization: "Saudi Health Council",
    lastSignIn: "2025-05-08",
    status: "active"
  },
  {
    id: "3",
    email: "admin@moh.gov.sa",
    firstName: "Mohammed",
    lastName: "Al-Faisal",
    userType: "Administrator",
    organization: "Ministry of Health",
    lastSignIn: "2025-05-10",
    status: "active"
  },
  {
    id: "4",
    email: "reem@healthcare.sa",
    firstName: "Reem",
    lastName: "Abdullah",
    userType: "Researcher",
    organization: "King Abdullah Medical Research Center",
    lastSignIn: "2025-05-01",
    status: "inactive"
  }
];

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
        <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
        <p className="text-red-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6">
      {/* Dashboard Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="bg-gradient-to-r from-moh-green to-moh-darkGreen bg-clip-text text-transparent">
              Admin Dashboard
            </span>
            <Badge className="ml-3 bg-moh-green/20 text-moh-darkGreen hover:bg-moh-green/30 px-3">Beta</Badge>
          </h1>
          <p className="text-gray-500 mt-1 max-w-2xl">
            Welcome to the administration panel. Manage platform settings, users, and review performance metrics.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link to="/dashboard/admin/settings">
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
          </Button>
          <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
            <Link to="/dashboard/admin/users">
              <Users size={16} className="mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-moh-green hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold">{mockUsers.length}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 12%</span> from last month
                  </p>
                </div>
                <div className="bg-moh-green/10 p-3 rounded-full">
                  <Users className="h-5 w-5 text-moh-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Challenges</p>
                  <h3 className="text-2xl font-bold">5</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-amber-500">2</span> ending soon
                  </p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-full">
                  <Layers className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submissions</p>
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 24%</span> this week
                  </p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Status</p>
                  <h3 className="text-2xl font-bold">Healthy</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    All systems operational
                  </p>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Dashboard Content Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted/30 p-1 overflow-x-auto flex flex-nowrap whitespace-nowrap max-w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Activity Chart */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  <span>Platform Activity</span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all <ChevronRight size={14} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[250px] w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-md">
                  <BarChart3 className="h-10 w-10 text-moh-green opacity-30" />
                  <p className="text-muted-foreground ml-4">Activity chart will display here</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: Users, text: "View User Analytics", link: "/dashboard/admin/users" },
                    { icon: FileText, text: "Manage Content", link: "/dashboard/admin/cms" },
                    { icon: BarChart3, text: "View Reports", link: "/dashboard/admin/reports" },
                    { icon: Calendar, text: "Scheduled Tasks", link: "#" }
                  ].map((item, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3 group" 
                      asChild
                    >
                      <Link to={item.link}>
                        <div className="bg-slate-100 p-2 rounded mr-3 group-hover:bg-moh-green/20 transition-colors">
                          <item.icon size={16} className="text-moh-green" />
                        </div>
                        {item.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Events and Health */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* System Events */}
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg font-semibold">Latest System Events</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { text: "User John Ahmed registered", time: "2 hours ago", type: "user" },
                    { text: "New innovation submission", time: "4 hours ago", type: "submission" },
                    { text: "Challenge closed", time: "1 day ago", type: "challenge" },
                    { text: "System backup completed", time: "2 days ago", type: "system" }
                  ].map((event, i) => (
                    <div key={i} className="p-4 flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        event.type === 'user' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'submission' ? 'bg-green-100 text-green-600' :
                        event.type === 'challenge' ? 'bg-purple-100 text-purple-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {event.type === 'user' && <Users size={14} />}
                        {event.type === 'submission' && <FileText size={14} />}
                        {event.type === 'challenge' && <Layers size={14} />}
                        {event.type === 'system' && <Settings size={14} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.text}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* System Health */}
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg font-semibold">System Health</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Database", status: "Operational", value: 96 },
                    { name: "API Services", status: "Operational", value: 99 },
                    { name: "Storage", status: "Operational", value: 92 },
                    { name: "Authentication", status: "Operational", value: 100 }
                  ].map((service, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{service.name}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          {service.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-moh-green h-2 rounded-full" 
                          style={{ width: `${service.value}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {service.value}% uptime
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Users Tab Content */}
        <TabsContent value="users">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>User Management</CardTitle>
                  <Button asChild>
                    <Link to="/dashboard/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      View All Users
                    </Link>
                  </Button>
                </div>
                <CardDescription>Overview of platform users and statistics</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <AdminUserStats users={mockUsers} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>Content Management</CardTitle>
                  <Button asChild>
                    <Link to="/dashboard/admin/cms">
                      <FileText className="mr-2 h-4 w-4" />
                      Content Manager
                    </Link>
                  </Button>
                </div>
                <CardDescription>Manage website content and pages</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {["Pages", "Blog Posts", "Media Library", "Events"].map((item) => (
                    <Card key={item} className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <CardContent className="p-4 text-center">
                        <FileText className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                        <h3 className="font-medium">{item}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Manage {item.toLowerCase()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <Button asChild>
                    <Link to="/dashboard/admin/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Full Analytics
                    </Link>
                  </Button>
                </div>
                <CardDescription>View platform metrics and performance data</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Detailed platform analytics and reporting tools will be available here.
                  View user engagement, challenge metrics, and system performance.
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard/admin/analytics">
                    View Analytics Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>System Settings</CardTitle>
                  <Button asChild>
                    <Link to="/dashboard/admin/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      All Settings
                    </Link>
                  </Button>
                </div>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Platform Configuration</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Manage system-wide settings, user permissions, notification preferences,
                  and customize the platform behavior.
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard/admin/settings">
                    Manage Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>System Integrations</CardTitle>
                  <Button asChild>
                    <Link to="/dashboard/admin/integrations">
                      <Shield className="mr-2 h-4 w-4" />
                      Manage Integrations
                    </Link>
                  </Button>
                </div>
                <CardDescription>Configure third-party services and APIs</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">External Integrations</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Connect and configure third-party services, APIs, and external systems.
                  Manage authentication keys and integration settings.
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard/admin/integrations">
                    Manage Integrations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
