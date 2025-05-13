
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarHeader } from "@/components/sidebar/SidebarHeader";
import { SidebarMainNav } from "@/components/sidebar/SidebarMainNav";
import { SidebarInnovationNav } from "@/components/sidebar/SidebarInnovationNav";
import { SidebarPlatformNav } from "@/components/sidebar/SidebarPlatformNav";
import { SidebarAdminNav } from "@/components/sidebar/SidebarAdminNav";
import { SidebarFooter } from "@/components/sidebar/SidebarFooter";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DashboardSidebar({ 
  isCollapsed, 
  onToggleCollapse 
}: DashboardSidebarProps) {
  const { isAdmin } = useAuth();
  
  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "h-screen fixed left-0 top-0 z-40 flex flex-col transition-all duration-300",
          "bg-white",
          "border-r border-slate-200/80",
          isCollapsed ? "w-[68px]" : "w-64"
        )}
      >
        {/* Header with Logo and collapse button */}
        <SidebarHeader isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
        
        {/* Navigation Menu - with improved scrolling */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent py-2 px-2 space-y-1">
          {/* Main Navigation */}
          <SidebarMainNav isCollapsed={isCollapsed} />
          
          {/* Innovation Navigation */}
          <SidebarInnovationNav isCollapsed={isCollapsed} />
          
          {/* Platform Navigation */}
          <SidebarPlatformNav isCollapsed={isCollapsed} />
          
          {/* Admin Navigation - Only show for admin users */}
          {isAdmin && <SidebarAdminNav isCollapsed={isCollapsed} />}
        </div>
        
        {/* Footer with settings and logout */}
        <SidebarFooter isCollapsed={isCollapsed} />
      </motion.div>
    </TooltipProvider>
  );
}
