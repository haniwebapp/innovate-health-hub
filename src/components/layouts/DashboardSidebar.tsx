
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { LucideIcon, Home, User, Info, Lightbulb, Award, BookOpen, BarChart3, PanelLeft, LogOut } from "lucide-react";

type SidebarNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

const navItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
  {
    title: "Challenges",
    href: "/challenges",
    icon: Award,
  },
  {
    title: "Innovations",
    href: "/innovations",
    icon: Lightbulb,
  },
  {
    title: "Knowledge Hub",
    href: "/knowledge-hub",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    adminOnly: true,
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
            <nav className="grid gap-1">
              {filteredNavItems.map((item, index) => (
                <Link
                  key={index}
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
              ))}
            </nav>
          </div>
        </ScrollArea>
        
        <div className="p-2 mt-auto border-t border-sidebar-border">
          <nav className="grid gap-1">
            {onToggleCollapse && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleCollapse} 
                className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <PanelLeft className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
                {!isCollapsed && <span>Collapse</span>}
              </Button>
            )}
            
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
          </nav>
        </div>
      </div>
    </aside>
  );
}
