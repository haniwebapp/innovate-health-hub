
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { NavItem } from "./SidebarNavItem";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { signOut, isAdmin } = useAuth();
  
  return (
    <div className="border-t border-slate-700/30 p-3 pt-4 space-y-2 bg-gradient-to-b from-transparent to-slate-900/50">
      {isAdmin && !isCollapsed && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2 px-2 py-1.5 bg-blue-900/30 rounded-md flex items-center"
        >
          <Shield size={14} className="text-blue-300 mr-2" />
          <span className="text-xs font-medium text-blue-300">Admin Access</span>
        </motion.div>
      )}
      
      <NavItem
        to="/dashboard/settings"
        icon={<Settings size={20} />}
        text="Settings"
        isCollapsed={isCollapsed}
        className={cn(
          "w-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors",
          "border border-slate-700/30 shadow-sm"
        )}
      />
      
      <Button 
        variant="ghost" 
        size={isCollapsed ? "icon" : "default"}
        className={cn(
          "w-full justify-start text-slate-300 hover:text-red-400 hover:bg-slate-800/80 transition-colors",
          "bg-slate-800/50 border border-slate-700/30 shadow-sm",
          isCollapsed ? "h-10 w-10" : ""
        )}
        onClick={signOut}
      >
        <LogOut size={20} className={cn(isCollapsed ? "" : "mr-2")} />
        {!isCollapsed && <span>Logout</span>}
      </Button>
    </div>
  );
}
