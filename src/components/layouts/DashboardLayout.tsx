
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";

// Helper to get page title from pathname
const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/').pop() || '';
  
  const titles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'submissions': 'My Submissions',
    'analytics': 'Analytics',
    'create-challenge': 'Create Challenge',
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
  const { user } = useAuth();
  
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
    }
  }, [isSmallScreen]);
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar isCollapsed={isCollapsed} onToggleCollapse={handleToggleCollapse} />
      
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top header bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            {/* Mobile sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle(pathname)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="hidden md:flex items-center">
              <span className="text-sm font-medium mr-2">
                {user?.email?.split('@')[0]}
              </span>
              <div className="h-8 w-8 rounded-full bg-moh-green text-white flex items-center justify-center text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
