
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
    <div className="border-t border-slate-700/30 p-2 space-y-2 bg-gradient-to-b from-transparent to-slate-900/50">
      {isAdmin && !isCollapsed && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2 px-2 py-1.5 bg-moh-gold/10 rounded-md flex items-center"
        >
          <Shield size={14} className="text-moh-gold mr-2" />
          <span className="text-xs font-medium text-moh-gold">Admin Access</span>
        </motion.div>
      )}
      
      <div className="grid grid-cols-2 gap-1">
        <NavItem
          to="/dashboard/settings"
          icon={<Settings size={18} />}
          text="Settings"
          isCollapsed={isCollapsed}
          className={cn(
            "w-full bg-moh-green/5 hover:bg-moh-green/10 transition-colors",
            "border border-moh-green/10 shadow-sm"
          )}
        />
        
        <Button 
          variant="ghost" 
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "flex flex-col items-center w-full justify-center text-slate-600 hover:text-moh-gold hover:bg-slate-800/80 transition-colors",
            "bg-slate-800/30 border border-slate-700/30 shadow-sm px-2 py-3",
            "text-xs"
          )}
          onClick={signOut}
        >
          <LogOut size={18} className="mb-1" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
