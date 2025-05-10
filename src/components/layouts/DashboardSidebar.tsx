
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Users, Settings, BarChart3, 
  MessageSquare, PlusCircle, Plug, LightbulbIcon, BookOpen, DollarSign, 
  FileCheck, Clock, Shield, LogOut
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
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "h-screen fixed left-0 top-0 z-40 flex flex-col transition-all duration-300",
          "bg-gradient-to-b from-white to-slate-50 backdrop-blur-lg",
          "border-r border-moh-green/10 shadow-lg shadow-moh-green/5",
          isCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        {/* Logo and collapse button */}
        <div className={cn(
          "flex h-16 items-center px-3 py-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-2 overflow-hidden">
            <motion.div 
              className="relative overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <GeneratedLogo 
                name="MOH" 
                shape="hexagon" 
                style="gradient" 
                size={isCollapsed ? 36 : 40} 
                primaryColor="#00814A" 
                secondaryColor="#C3A86B"
                className={cn(
                  "transition-all duration-300",
                  isCollapsed ? "" : "mr-2"
                )}
              />
            </motion.div>
            
            {!isCollapsed && (
              <motion.div 
                className="font-semibold text-moh-darkGreen flex flex-col"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-lg leading-none">MOH</span>
                <span className="block text-xs text-moh-gold font-light">Innovation Platform</span>
              </motion.div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleCollapse}
            className="text-moh-darkGreen hover:text-moh-green hover:bg-moh-lightGreen/50 rounded-full"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        {/* Navigation Menu - with improved scrolling */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-moh-green/20 scrollbar-track-transparent py-2 px-3">
          {/* Main Navigation */}
          <NavSection 
            title="Main" 
            isCollapsed={isCollapsed} 
            items={[
              { to: "/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard" },
              { to: "/dashboard/profile", icon: <Users size={20} />, text: "Profile" }
            ]}
          />
          
          {/* Innovation Navigation */}
          <NavSection 
            title="Innovation" 
            isCollapsed={isCollapsed} 
            items={[
              { to: "/dashboard/submissions", icon: <FileCheck size={20} />, text: "My Challenges" },
              { to: "/dashboard/innovations", icon: <LightbulbIcon size={20} />, text: "My Innovations" },
              { to: "/dashboard/create-challenge", icon: <PlusCircle size={20} />, text: "Create Challenge" }
            ]}
          />
          
          {/* Platform Navigation */}
          <NavSection 
            title="Platform" 
            isCollapsed={isCollapsed} 
            items={[
              { to: "/dashboard/investment", icon: <DollarSign size={20} />, text: "Investment Hub" },
              { to: "/dashboard/regulatory", icon: <BookOpen size={20} />, text: "Regulatory Sandbox" },
              { to: "/dashboard/knowledge", icon: <BookOpen size={20} />, text: "Knowledge Hub" },
              { to: "/dashboard/collaboration", icon: <MessageSquare size={20} />, text: "Collaboration" },
              { to: "/dashboard/activity", icon: <Clock size={20} />, text: "Activity History" }
            ]}
          />
          
          {/* Admin Navigation */}
          {isAdmin && (
            <NavSection 
              title="Administration" 
              isCollapsed={isCollapsed} 
              items={[
                { 
                  to: "/dashboard/admin/users", 
                  icon: <Users size={20} />, 
                  text: "Users",
                  badge: "Admin"
                },
                { 
                  to: "/dashboard/admin/analytics", 
                  icon: <BarChart3 size={20} />, 
                  text: "Analytics",
                  badge: "Admin"
                },
                { 
                  to: "/dashboard/admin/settings", 
                  icon: <Settings size={20} />, 
                  text: "Settings",
                  badge: "Admin"
                },
                { 
                  to: "/dashboard/admin/integrations", 
                  icon: <Plug size={20} />, 
                  text: "Integrations",
                  badge: "Admin"
                }
              ]}
            />
          )}
        </div>
        
        {/* Footer with settings and logout */}
        <div className="border-t border-moh-green/10 p-3 pt-4 space-y-2 bg-gradient-to-b from-transparent to-moh-lightGreen/30">
          {isAdmin && !isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2 px-2 py-1.5 bg-moh-gold/10 rounded-md flex items-center"
            >
              <Shield size={14} className="text-moh-darkGold mr-2" />
              <span className="text-xs font-medium text-moh-darkGold">Admin Access</span>
            </motion.div>
          )}
          
          <NavItem
            to="/dashboard/settings"
            icon={<Settings size={20} />}
            text="Settings"
            isCollapsed={isCollapsed}
            className={cn(
              "w-full bg-white/50 hover:bg-white transition-colors",
              "border border-moh-green/5 shadow-sm"
            )}
          />
          
          <Button 
            variant="ghost" 
            size={isCollapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start text-moh-darkGreen hover:text-red-600 hover:bg-red-50 transition-colors",
              "bg-white/50 border border-moh-green/5 shadow-sm",
              isCollapsed ? "h-10 w-10" : ""
            )}
            onClick={signOut}
          >
            <LogOut size={20} className={cn(isCollapsed ? "" : "mr-2")} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

// Helper Components
type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  badge?: string;
  className?: string;
};

function NavItem({ to, icon, text, isCollapsed, badge, className }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
            "overflow-hidden whitespace-nowrap",
            isActive
              ? "bg-gradient-to-r from-moh-green to-moh-darkGreen text-white font-medium shadow-sm"
              : "text-slate-700 hover:bg-moh-lightGreen hover:text-moh-darkGreen",
            isCollapsed && "justify-center p-2",
            className
          )}
          end={to === "/dashboard"}
        >
          <div className="flex min-w-[24px] items-center justify-center">
            {icon}
          </div>
          
          {!isCollapsed && (
            <>
              <span className="truncate">{text}</span>
              {badge && (
                <span className="ml-auto text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-sm font-medium">
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-medium">
        {text}
        {badge && <span className="ml-2 text-[10px] bg-moh-gold/20 text-moh-darkGold px-1.5 py-0.5 rounded-md">{badge}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

type NavSectionProps = {
  title: string;
  isCollapsed: boolean;
  items: Array<{
    to: string;
    icon: React.ReactNode;
    text: string;
    badge?: string;
  }>;
};

function NavSection({ title, isCollapsed, items }: NavSectionProps) {
  return (
    <div className="py-2">
      {!isCollapsed && (
        <h3 className="px-3 mb-2 text-xs uppercase text-moh-darkGreen/50 font-medium tracking-wider">
          {title}
        </h3>
      )}
      <nav className="space-y-1.5">
        {items.map(item => (
          <NavItem
            key={item.text}
            to={item.to}
            icon={item.icon}
            text={item.text}
            isCollapsed={isCollapsed}
            badge={item.badge}
          />
        ))}
      </nav>
    </div>
  );
}
