
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { signOut, isAdmin, user } = useAuth();
  
  // Get user initials for avatar
  const getInitials = () => {
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';
    
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    
    return user?.email ? user.email[0].toUpperCase() : 'U';
  };
  
  return (
    <div className="border-t border-slate-700/30 p-4 space-y-4 bg-gradient-to-b from-transparent to-slate-900/50">
      {!isCollapsed && (
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8 border border-slate-700/50">
            {user?.avatar_url ? (
              <AvatarImage src={user.avatar_url} alt="User Avatar" />
            ) : (
              <AvatarFallback className="bg-moh-green/20 text-white">
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">
              {user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
          {isAdmin && (
            <span className="px-1.5 py-0.5 text-[10px] bg-moh-gold/20 text-moh-gold rounded-sm font-medium">
              Admin
            </span>
          )}
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <Button 
          variant="ghost" 
          size={isCollapsed ? "icon" : "sm"}
          className={cn(
            "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50",
            isCollapsed && "justify-center p-2"
          )}
          asChild
        >
          <a href="/dashboard/settings">
            <Settings size={18} className={isCollapsed ? "" : "mr-2"} />
            {!isCollapsed && <span>Settings</span>}
          </a>
        </Button>
        
        <Button 
          variant="ghost" 
          size={isCollapsed ? "icon" : "sm"}
          className={cn(
            "w-full justify-start text-slate-300 hover:text-red-400 hover:bg-slate-700/50",
            isCollapsed && "justify-center p-2"
          )}
          onClick={signOut}
        >
          <LogOut size={18} className={isCollapsed ? "" : "mr-2"} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
