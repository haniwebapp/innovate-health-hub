
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { user, signOut } = useAuth();
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return "U";
    
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    
    return "U";
  };
  
  return (
    <div className="sticky bottom-0 z-20 mt-auto flex flex-col gap-2 bg-slate-900/80 backdrop-blur-sm p-3 pt-4 border-t border-slate-800/50">
      {!isCollapsed ? (
        <>
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-slate-700/50">
              <AvatarImage src={user?.avatar_url || undefined} alt={user?.first_name || user?.email || 'User'} />
              <AvatarFallback className="bg-slate-800 text-moh-gold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="truncate text-sm font-medium text-slate-200">
                {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email?.split('@')[0]}
              </span>
              <span className="truncate text-xs text-slate-400">
                {user?.email}
              </span>
            </motion.div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
              asChild
            >
              <Link to="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-9 w-9 border border-slate-700/50 cursor-pointer">
                <AvatarImage src={user?.avatar_url || undefined} alt={user?.first_name || user?.email || 'User'} />
                <AvatarFallback className="bg-slate-800 text-moh-gold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{user?.email}</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700"
                  asChild
                >
                  <Link to="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
