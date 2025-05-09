
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Users, Settings, BarChart3, 
  MessageSquare, FilePlus, Box, FileText, LogOut, PlusCircle, Plug
} from "lucide-react";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DashboardSidebar({ 
  isCollapsed, 
  onToggleCollapse 
}: DashboardSidebarProps) {
  const { logout, isAdmin } = useAuth();
  
  return (
    <div
      className={cn(
        "h-screen border-r bg-background fixed left-0 top-0 z-40 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse button */}
      <div className={cn(
        "flex h-14 items-center border-b px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="font-semibold text-moh-green text-lg">MoH Platform</div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {/* Navigation links */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {/* Regular user links */}
          <NavItem 
            to="/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            text="Dashboard" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/profile" 
            icon={<Users size={18} />} 
            text="Profile" 
            isCollapsed={isCollapsed} 
          />
          <NavItem 
            to="/dashboard/submissions" 
            icon={<FileText size={18} />} 
            text="My Submissions" 
            isCollapsed={isCollapsed}
          />
          
          {/* Admin only links */}
          {isAdmin && (
            <>
              <div className={cn(
                "my-2 border-t",
                isCollapsed ? "mx-2" : "mx-4"
              )}></div>
              <div className={cn(
                "mb-2 px-4 text-xs uppercase text-muted-foreground",
                isCollapsed && "sr-only"
              )}>
                Administration
              </div>
              <NavItem 
                to="/dashboard/admin/users" 
                icon={<Users size={18} />} 
                text="Users" 
                isCollapsed={isCollapsed}
                badge="Admin"
              />
              <NavItem 
                to="/dashboard/admin/analytics" 
                icon={<BarChart3 size={18} />} 
                text="Analytics" 
                isCollapsed={isCollapsed}
                badge="Admin"
              />
              <NavItem 
                to="/dashboard/admin/settings" 
                icon={<Settings size={18} />} 
                text="Settings" 
                isCollapsed={isCollapsed}
                badge="Admin"
              />
              <NavItem 
                to="/dashboard/admin/integrations" 
                icon={<Plug size={18} />} 
                text="Integrations" 
                isCollapsed={isCollapsed}
                badge="Admin"
              />
            </>
          )}
          
          <div className={cn(
            "my-2 border-t",
            isCollapsed ? "mx-2" : "mx-4"
          )}></div>
          
          {/* Quick actions */}
          <NavItem 
            to="/dashboard/create-challenge" 
            icon={<PlusCircle size={18} />} 
            text="Create Challenge" 
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
      
      {/* Logout button */}
      <div className="border-t p-4">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "h-9 w-9"
              )}
              onClick={logout}
            >
              <LogOut size={18} className={cn(isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  badge?: string;
}

function NavItem({ to, icon, text, isCollapsed, badge }: NavItemProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
            isActive
              ? "bg-moh-green text-white"
              : "text-muted-foreground hover:bg-muted",
            isCollapsed && "justify-center px-0"
          )}
          end={to === "/dashboard"}
        >
          {icon}
          {!isCollapsed && <span>{text}</span>}
          {!isCollapsed && badge && (
            <span className="ml-auto text-xs bg-secondary text-secondary-foreground rounded px-1">
              {badge}
            </span>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}
