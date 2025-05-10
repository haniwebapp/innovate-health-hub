
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUserStats from "@/components/admin/AdminUserStats";
import { SidebarAdminNav } from "@/components/sidebar/SidebarAdminNav";
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
  Clock,
  Bell,
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

import { UserProfile } from "@/types/admin";

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

export function AdminDashboard() {
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user registration", time: "2 hours ago", type: "user", read: false },
    { id: 2, text: "System update completed", time: "5 hours ago", type: "system", read: false },
    { id: 3, text: "New challenge submission", time: "1 day ago", type: "challenge", read: true }
  ]);

  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
        <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
        <p className="text-red-600 text-center">You don't have permission to view this page.</p>
        <p className="text-red-600 text-center mt-1">Please contact an administrator if you need access.</p>
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  // Format date to relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read.",
    });
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
          <h1 className="text-3xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-moh-green to-moh-darkGreen bg-clip-text text-transparent">
              Admin Dashboard
            </span>
            <Badge className="ml-3 bg-moh-green/20 text-moh-darkGreen hover:bg-moh-green/30 px-3">Beta</Badge>
          </h1>
          <p className="text-gray-500 mt-1 max-w-2xl">
            Welcome to the administration panel. Manage platform settings, users, and review performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Notifications Dropdown */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              <Bell size={18} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
          </div>

          {/* Admin Avatar & Info */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Avatar className="h-9 w-9 border border-muted">
              <AvatarImage src={user?.avatar_url || undefined} alt="Admin" />
              <AvatarFallback className="bg-moh-green/10 text-moh-darkGreen">
                {user?.first_name?.[0]}{user?.last_name?.[0] || ''}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Cards */}
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
                  <p className="text-sm font-medium text-muted-foreground">Innovations</p>
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
              <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Platform Activity</CardTitle>
                  <CardDescription>User engagement and system activity metrics</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowUpRight size={14} />
                </Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Total visits</span>
                      <span className="text-2xl font-bold">1,240</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-medium">Conversion rate</span>
                      <span className="text-2xl font-bold">4.7%</span>
                    </div>
                  </div>
                </div>
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
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: Users, text: "Manage Users", link: "/dashboard/admin/users", highlight: true },
                    { icon: Layers, text: "Review Challenges", link: "/dashboard/admin/challenges" },
                    { icon: BarChart3, text: "View Reports", link: "/dashboard/admin/reports" },
                    { icon: Settings, text: "Platform Settings", link: "/dashboard/admin/settings" }
                  ].map((item, i) => (
                    <Button 
                      key={i} 
                      variant={item.highlight ? "default" : "outline"} 
                      className={`w-full justify-start text-left h-auto py-3 group ${
                        item.highlight ? "bg-moh-green hover:bg-moh-green/90" : ""
                      }`} 
                      asChild
                    >
                      <Link to={item.link}>
                        <div className={`p-2 rounded mr-3 ${
                          item.highlight 
                            ? "bg-white/20" 
                            : "bg-slate-100 group-hover:bg-moh-green/20 transition-colors"
                        }`}>
                          <item.icon size={16} className={item.highlight ? "text-white" : "text-moh-green"} />
                        </div>
                        {item.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities and System Health */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Recent Activities */}
            <Card>
              <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                  <CardDescription>Latest platform events</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { text: "New user John Ahmed registered", time: "2 hours ago", type: "user" },
                    { text: "Challenge 'Healthcare AI' published", time: "4 hours ago", type: "challenge" },
                    { text: "System backup completed", time: "Yesterday", type: "system" },
                    { text: "7 new innovation submissions", time: "2 days ago", type: "submission" }
                  ].map((event, i) => (
                    <div key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50/60">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
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
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{event.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t bg-slate-50/50">
                  <Button variant="ghost" size="sm" className="w-full text-moh-green" asChild>
                    <Link to="/dashboard/admin/activity">
                      View all activity history
                      <ArrowUpRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* System Health */}
            <Card>
              <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold">System Health</CardTitle>
                  <CardDescription>Current system status</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" /> Healthy
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "API Services", status: "Operational", value: 99 },
                    { name: "Database", status: "Operational", value: 96 },
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
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Uptime</span>
                        <span>{service.value}%</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Last system check: <span className="font-medium">10 May 2025, 02:15 AM</span>
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/dashboard/admin/system">
                        <Shield className="mr-2 h-4 w-4" />
                        Run diagnostics
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Scheduled Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
                <CardDescription>Scheduled events and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { title: "System Maintenance", date: "May 15, 2025", time: "03:00 - 04:00 AM", type: "maintenance" },
                    { title: "Challenge Submission Deadline", date: "May 20, 2025", time: "11:59 PM", type: "deadline" },
                    { title: "User Verification Audit", date: "May 22, 2025", time: "10:00 AM", type: "audit" }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50/60">
                      <div className="bg-moh-green/10 p-3 rounded-full">
                        <Calendar size={18} className="text-moh-green" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {task.date} • {task.time}
                        </p>
                      </div>
                      <Badge variant="outline" className={
                        task.type === 'maintenance' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        task.type === 'deadline' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-purple-50 text-purple-700 border-purple-200'
                      }>
                        {task.type === 'maintenance' ? 'Maintenance' : 
                         task.type === 'deadline' ? 'Deadline' : 'Audit'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t bg-slate-50/50 text-center">
                  <Button variant="ghost" size="sm" className="text-moh-green" asChild>
                    <Link to="/dashboard/admin/calendar">
                      <Calendar className="mr-2 h-4 w-4" />
                      View full calendar
                    </Link>
                  </Button>
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
                  <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage website content and publications</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/admin/cms">
                      <FileText className="mr-2 h-4 w-4" />
                      Content Manager
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Pages", count: 16, icon: FileText },
                    { title: "Blog Posts", count: 24, icon: FileText },
                    { title: "Media Library", count: 87, icon: FileText },
                    { title: "Events", count: 5, icon: Calendar }
                  ].map((item, i) => (
                    <Card key={i} className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <CardContent className="p-4 text-center">
                        <item.icon className="h-8 w-8 mx-auto text-moh-green/80 mb-2" />
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.count} items</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 p-3 border-b">
                    <h3 className="font-medium">Recent Content Updates</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      { title: "Homepage Hero Section", author: "Sara A.", time: "2 hours ago" },
                      { title: "About Us Page", author: "Mohammed F.", time: "Yesterday" },
                      { title: "New Blog Post: Innovation Trends", author: "Ahmed K.", time: "3 days ago" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Updated by {item.author}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <div>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>Platform performance metrics and insights</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/admin/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Full Analytics
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-slate-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">User Engagement</h3>
                        <Badge className="bg-green-100 text-green-700">↑ 8.2%</Badge>
                      </div>
                      <p className="text-3xl font-bold mt-2">87%</p>
                      <p className="text-xs text-muted-foreground mt-1">Based on active sessions</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Avg. Session</h3>
                        <Badge className="bg-amber-100 text-amber-700">↑ 2.3%</Badge>
                      </div>
                      <p className="text-3xl font-bold mt-2">12m 48s</p>
                      <p className="text-xs text-muted-foreground mt-1">Time spent on platform</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Conversion Rate</h3>
                        <Badge className="bg-green-100 text-green-700">↑ 5.7%</Badge>
                      </div>
                      <p className="text-3xl font-bold mt-2">4.2%</p>
                      <p className="text-xs text-muted-foreground mt-1">Visitors to registrations</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="h-[300px] border rounded-lg flex items-center justify-center bg-slate-50">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      View detailed usage statistics, traffic sources, and user behavior metrics.
                    </p>
                    <Button asChild>
                      <Link to="/dashboard/admin/analytics">
                        Open Full Analytics Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
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
                  <div>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure platform settings and preferences</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/admin/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      All Settings
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-moh-darkGreen flex items-center">
                        <Users className="h-5 w-5 mr-2 text-moh-green" />
                        User Settings
                      </h3>
                      <div className="border rounded-md divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Allow new registrations</p>
                            <p className="text-xs text-muted-foreground">Enable user sign-ups on the platform</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Email verification</p>
                            <p className="text-xs text-muted-foreground">Require email verification for new accounts</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-moh-darkGreen flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-moh-green" />
                        Notification Settings
                      </h3>
                      <div className="border rounded-md divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">System notifications</p>
                            <p className="text-xs text-muted-foreground">Alerts for system events and updates</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Email notifications</p>
                            <p className="text-xs text-muted-foreground">Configure email templates and triggers</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-moh-darkGreen flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-moh-green" />
                        Challenge Settings
                      </h3>
                      <div className="border rounded-md divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Approval workflow</p>
                            <p className="text-xs text-muted-foreground">Configure challenge approval process</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Submission settings</p>
                            <p className="text-xs text-muted-foreground">Configure submission rules and limits</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-moh-darkGreen flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-moh-green" />
                        Security Settings
                      </h3>
                      <div className="border rounded-md divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Password policies</p>
                            <p className="text-xs text-muted-foreground">Set password requirements and expiration</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-sm">Two-factor authentication</p>
                            <p className="text-xs text-muted-foreground">Configure 2FA requirements for users</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/settings">
                              Edit
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t flex justify-end">
                <Button asChild>
                  <Link to="/dashboard/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    View All Settings
                  </Link>
                </Button>
              </CardFooter>
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
                  <div>
                    <CardTitle>System Integrations</CardTitle>
                    <CardDescription>Configure third-party services and APIs</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/admin/integrations">
                      <Shield className="mr-2 h-4 w-4" />
                      Manage Integrations
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Email Service", status: "Connected", lastSync: "2 hours ago" },
                    { name: "Payment Gateway", status: "Connected", lastSync: "1 day ago" },
                    { name: "Analytics", status: "Connected", lastSync: "30 minutes ago" },
                    { name: "AI Services", status: "Configuration Required", lastSync: "Never" },
                    { name: "SMS Notifications", status: "Connected", lastSync: "3 hours ago" },
                    { name: "Storage Provider", status: "Connected", lastSync: "12 hours ago" }
                  ].map((integration, i) => (
                    <Card key={i} className={`bg-slate-50/50 border-l-4 ${
                      integration.status === "Connected" ? "border-l-green-500" : "border-l-amber-500"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            <Badge className={integration.status === "Connected" ? 
                              "bg-green-100 text-green-700 mt-1" : 
                              "bg-amber-100 text-amber-700 mt-1"}>
                              {integration.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-2">
                              Last sync: {integration.lastSync}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/admin/integrations">
                              Configure
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 p-4 border rounded-lg bg-blue-50/50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <AlertTriangle size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700">Integration Security Check</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        A security audit for connected services is recommended. 
                        Last security check was performed 45 days ago.
                      </p>
                      <Button size="sm" variant="outline" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                        Run Security Check
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
