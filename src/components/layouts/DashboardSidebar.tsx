
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { LucideIcon, Home, User, Info, Lightbulb, Award, BookOpen, BarChart3, PanelLeft, LogOut, Plus, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  description?: string;
};

const navItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and summary"
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Manage your account"
  },
  {
    title: "My Submissions",
    href: "/dashboard/submissions",
    icon: FileText,
    description: "Your challenge submissions"
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    description: "About the platform"
  },
  {
    title: "Challenges",
    href: "/challenges",
    icon: Award,
    description: "Browse open challenges"
  },
  {
    title: "Innovations",
    href: "/innovations",
    icon: Lightbulb,
    description: "Explore innovations"
  },
  {
    title: "Knowledge Hub",
    href: "/knowledge-hub",
    icon: BookOpen,
    description: "Resources and articles"
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    adminOnly: true,
    description: "Platform insights"
  },
];

export default function DashboardSidebar({
  isCollapsed = false,
  onToggleCollapse,
}: {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Filter items based on user role (simple implementation)
  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly) {
      // This is a simple check - in a real app you'd check user.role or similar
      return user?.email?.endsWith('@moh.gov.sa');
    }
    return true;
  });
  
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      className={cn(
        "fixed h-screen z-30 bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
          {!isCollapsed ? (
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className="h-8 w-auto"
              />
              <span className="font-medium text-sm">Innovation Platform</span>
            </Link>
          ) : (
            <Link to="/" className="mx-auto">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className="h-8 w-auto"
              />
            </Link>
          )}
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            <TooltipProvider delayDuration={300}>
              <nav className="grid gap-1">
                {filteredNavItems.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
                
                {user?.email?.endsWith('@moh.gov.sa') && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/create-challenge"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors mt-4 bg-moh-lightGreen text-moh-green",
                          pathname === "/dashboard/create-challenge" ? "bg-moh-green text-white" : ""
                        )}
                      >
                        <Plus className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
                        {!isCollapsed && <span>Create Challenge</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>Create Challenge</p>
                        <p className="text-xs text-muted-foreground">Add a new challenge</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </nav>
            </TooltipProvider>
          </div>
        </ScrollArea>
        
        <div className="p-2 mt-auto border-t border-sidebar-border">
          <TooltipProvider delayDuration={300}>
            <nav className="grid gap-1">
              {onToggleCollapse && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onToggleCollapse} 
                      className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <PanelLeft className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
                      {!isCollapsed && <span>{isCollapsed ? "Expand" : "Collapse"}</span>}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-b-transparent mx-auto" />
                        {!isCollapsed && <span className="ml-2">Signing Out...</span>}
                      </>
                    ) : (
                      <>
                        <LogOut className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
                        {!isCollapsed && <span>Sign Out</span>}
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && !isLoading && (
                  <TooltipContent side="right">
                    <p>Sign Out</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </nav>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}
