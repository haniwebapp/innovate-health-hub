
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, FileText, Bell, HelpCircle } from "lucide-react";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";

export default function NavbarUserMenu() {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  
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

  const getDisplayName = () => {
    if (!user) return "Welcome";
    
    if (user.first_name || user.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    
    return user.email ? user.email.split('@')[0] : 'Welcome back!';
  };

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-moh-green/20 text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green rounded-full"
            asChild
          >
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            size="sm" 
            className="bg-moh-green hover:bg-moh-darkGreen rounded-full"
            asChild
          >
            <Link to="/auth/register">Register</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-transparent hover:border-moh-green/30 transition-all"
        >
          <Avatar className="h-full w-full">
            <AvatarImage src={user.avatar_url || undefined} alt={getDisplayName()} />
            <AvatarFallback className="bg-gradient-to-br from-moh-lightGreen to-moh-green text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="flex items-center p-3 bg-moh-lightGreen/20 rounded-lg mb-2">
          <Avatar className="h-10 w-10 border border-moh-green/20">
            <AvatarImage src={user.avatar_url || undefined} alt={getDisplayName()} />
            <AvatarFallback className="bg-gradient-to-br from-moh-lightGreen to-moh-green text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          
          <div className="ml-3">
            <p className="font-medium text-moh-darkGreen">
              {getDisplayName()}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <DropdownMenuItem asChild className="py-2 focus:bg-moh-lightGreen/50 focus:text-moh-darkGreen">
          <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
            <Settings className="h-4 w-4 text-moh-green" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="py-2 focus:bg-moh-lightGreen/50 focus:text-moh-darkGreen">
          <Link to="/dashboard/profile" className="cursor-pointer flex items-center gap-2">
            <User className="h-4 w-4 text-moh-green" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="py-2 focus:bg-moh-lightGreen/50 focus:text-moh-darkGreen">
          <Link to="/dashboard/submissions" className="cursor-pointer flex items-center gap-2">
            <FileText className="h-4 w-4 text-moh-green" />
            <span>My Submissions</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="py-2 focus:bg-moh-lightGreen/50 focus:text-moh-darkGreen">
          <Link to="/dashboard/notifications" className="cursor-pointer flex items-center gap-2">
            <Bell className="h-4 w-4 text-moh-green" />
            <span>Notifications</span>
            <NotificationBadge className="ml-auto !p-0 !h-auto !w-auto !bg-transparent hover:!bg-transparent" />
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem asChild className="py-2 focus:bg-moh-lightGreen/50 focus:text-moh-darkGreen">
          <Link to="/help" className="cursor-pointer flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-moh-green" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem 
          onClick={signOut}
          className="py-2 text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
