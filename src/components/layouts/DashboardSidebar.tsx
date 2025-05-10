
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
  MessageSquare, FilePlus, Box, FileText, LogOut, PlusCircle, Plug,
  LightbulbIcon, BookOpen, DollarSign, FileCheck, Clock, Folder, Shield
} from "lucide-react";
import GeneratedLogo from "@/components/logos/GeneratedLogo";
import { motion } from "framer-motion";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DashboardSidebar({ 
  isCollapsed, 
  onToggleCollapse 
}: DashboardSidebarProps) {
  const { signOut, isAdmin, user } = useAuth();
  
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-screen border-r bg-gradient-to-b from-white to-moh-lightGreen/20 fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 shadow-md",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse button */}
      <div className={cn(
        "flex h-16 items-center border-b border-moh-green/10 px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="relative overflow-hidden size-8">
              <GeneratedLogo 
                name="MOH" 
                shape="hexagon" 
                style="gradient" 
                size={32} 
                primaryColor="#00814A" 
                secondaryColor="#C3A86B"
              />
            </div>
            <div className="font-semibold text-moh-darkGreen text-lg leading-none">
              MOH
              <span className="block text-xs text-moh-gold font-light">Innovation Platform</span>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden size-8">
            <GeneratedLogo 
              name="MOH" 
              shape="hexagon" 
              style="gradient" 
              size={32} 
              primaryColor="#00814A" 
              secondaryColor="#C3A86B"
            />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="text-moh-darkGreen hover:text-moh-green hover:bg-moh-lightGreen"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {/* Navigation links - using scroll area for long menus */}
      <div className="flex-1 overflow-auto py-4 scrollbar-thin">
        <nav className="grid gap-1 px-2">
          {/* Main section */}
          <div className={cn(
            "mb-2 px-4 text-xs uppercase text-muted-foreground",
            isCollapsed && "sr-only"
          )}>
            Main
          </div>
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
          
          {/* Challenge & Innovation section */}
          <div className={cn(
            "my-2 border-t border-moh-green/10",
            isCollapsed ? "mx-2" : "mx-4"
          )}></div>
          <div className={cn(
            "mb-2 px-4 text-xs uppercase text-muted-foreground",
            isCollapsed && "sr-only"
          )}>
            Innovation
          </div>
          <NavItem 
            to="/dashboard/submissions" 
            icon={<FileCheck size={18} />} 
            text="My Challenges" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/innovations" 
            icon={<LightbulbIcon size={18} />} 
            text="My Innovations" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/create-challenge" 
            icon={<PlusCircle size={18} />} 
            text="Create Challenge" 
            isCollapsed={isCollapsed}
          />
          
          {/* Platform Features */}
          <div className={cn(
            "my-2 border-t border-moh-green/10",
            isCollapsed ? "mx-2" : "mx-4"
          )}></div>
          <div className={cn(
            "mb-2 px-4 text-xs uppercase text-muted-foreground",
            isCollapsed && "sr-only"
          )}>
            Platform
          </div>
          <NavItem 
            to="/dashboard/investment" 
            icon={<DollarSign size={18} />} 
            text="Investment Hub" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/regulatory" 
            icon={<FileText size={18} />} 
            text="Regulatory Sandbox" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/knowledge" 
            icon={<BookOpen size={18} />} 
            text="Knowledge Hub" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/collaboration" 
            icon={<MessageSquare size={18} />} 
            text="Collaboration" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/dashboard/activity" 
            icon={<Clock size={18} />} 
            text="Activity History" 
            isCollapsed={isCollapsed}
          />
          
          {/* Admin only links */}
          {isAdmin && (
            <>
              <div className={cn(
                "my-2 border-t border-moh-green/10",
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
                badge={<span className="bg-moh-gold/20 text-moh-darkGold text-[10px] rounded-sm px-1">Admin</span>}
              />
              <NavItem 
                to="/dashboard/admin/analytics" 
                icon={<BarChart3 size={18} />} 
                text="Analytics" 
                isCollapsed={isCollapsed}
                badge={<span className="bg-moh-gold/20 text-moh-darkGold text-[10px] rounded-sm px-1">Admin</span>}
              />
              <NavItem 
                to="/dashboard/admin/settings" 
                icon={<Settings size={18} />} 
                text="Settings" 
                isCollapsed={isCollapsed}
                badge={<span className="bg-moh-gold/20 text-moh-darkGold text-[10px] rounded-sm px-1">Admin</span>}
              />
              <NavItem 
                to="/dashboard/admin/integrations" 
                icon={<Plug size={18} />} 
                text="Integrations" 
                isCollapsed={isCollapsed}
                badge={<span className="bg-moh-gold/20 text-moh-darkGold text-[10px] rounded-sm px-1">Admin</span>}
              />
            </>
          )}
        </nav>
      </div>
      
      {/* Settings and Logout buttons */}
      <div className="border-t border-moh-green/10 p-4 bg-gradient-to-b from-transparent to-moh-lightGreen/30">
        {isAdmin && !isCollapsed && (
          <div className="mb-4 px-2 py-2 bg-moh-gold/10 rounded-md flex items-center">
            <Shield size={14} className="text-moh-darkGold mr-2" />
            <span className="text-xs font-medium text-moh-darkGold">Admin Access</span>
          </div>
        )}
        
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "w-full justify-start mb-2 text-moh-darkGreen hover:text-moh-green hover:bg-moh-lightGreen",
                isCollapsed && "h-9 w-9"
              )}
              asChild
            >
              <NavLink to="/dashboard/settings">
                <Settings size={18} className={cn(isCollapsed ? "" : "mr-2")} />
                {!isCollapsed && <span>Settings</span>}
              </NavLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "w-full justify-start text-moh-darkGreen hover:text-moh-green hover:bg-moh-lightGreen",
                isCollapsed && "h-9 w-9"
              )}
              onClick={signOut}
            >
              <LogOut size={18} className={cn(isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  badge?: React.ReactNode;
}

function NavItem({ to, icon, text, isCollapsed, badge }: NavItemProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
            isActive
              ? "bg-gradient-to-r from-moh-green to-moh-darkGreen text-white font-medium shadow-sm"
              : "text-muted-foreground hover:bg-moh-lightGreen hover:text-moh-darkGreen",
            isCollapsed && "justify-center px-0"
          )}
          end={to === "/dashboard"}
        >
          <div className={cn(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-moh-darkGreen/70"
          )}>
            {icon}
          </div>
          {!isCollapsed && <span>{text}</span>}
          {!isCollapsed && badge && (
            <span className="ml-auto">
              {badge}
            </span>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}
