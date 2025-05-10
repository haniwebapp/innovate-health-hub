import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight, Shield, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import GeneratedLogo from "@/components/logos/GeneratedLogo";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";

// Helper to get page title from pathname
const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/').pop() || '';
  
  const titles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'submissions': 'My Submissions',
    'analytics': 'Analytics',
    'create-challenge': 'Create Challenge',
    'innovations': 'My Innovations',
    'investment': 'Investment Hub',
    'regulatory': 'Regulatory Sandbox',
    'knowledge': 'Knowledge Hub',
    'collaboration': 'Collaboration',
    'activity': 'Activity History',
  };
  
  // Handle special cases like submit/123
  if (pathname.includes('/submit/')) {
    return 'Challenge Submission';
  }
  
  return titles[path] || 'Dashboard';
};

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // Check if the screen is small (for responsive sidebar)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isSmallScreen]);
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

  // Get user initials for avatar
  const getInitials = () => {
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';
    
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    
    return user?.email ? user.email[0].toUpperCase() : 'U';
  };
  
  // Animation variants
  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DashboardSidebar isCollapsed={isCollapsed} onToggleCollapse={handleToggleCollapse} />
      
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "ml-[70px]" : "ml-64"
        }`}
      >
        {/* Top header bar with glass effect */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={slideIn}
          className="h-16 border-b border-slate-200 backdrop-blur-sm bg-white/80 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
        >
          <div className="flex items-center">
            {/* Mobile sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2 text-slate-600 hover:text-moh-green hover:bg-slate-100"
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="text-moh-green font-medium">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-slate-800">{getPageTitle(pathname)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="flex items-center gap-3">
            <NotificationBadge className="text-slate-600 hover:text-moh-green hover:bg-slate-100" />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-moh-green hover:bg-slate-100 hidden md:flex"
            >
              <Search size={18} />
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              {isAdmin && (
                <span className="bg-moh-lightGreen text-moh-green text-xs rounded-full px-2 py-0.5 font-medium flex items-center">
                  <Shield size={12} className="mr-1" /> Admin
                </span>
              )}
              <span className="text-sm font-medium mr-1 hidden lg:block text-slate-700">
                {user?.email?.split('@')[0]}
              </span>
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt="User Avatar" 
                  className="h-8 w-8 rounded-full border border-slate-200" 
                />
              ) : (
                <div className="relative overflow-hidden">
                  <GeneratedLogo 
                    name={getInitials()} 
                    size={32} 
                    primaryColor="#00814A" 
                    secondaryColor="#C3A86B"
                    shape="circle" 
                  />
                </div>
              )}
            </div>
          </div>
        </motion.header>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-white to-slate-100/50">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
