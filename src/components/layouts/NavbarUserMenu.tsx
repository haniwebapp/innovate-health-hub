
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Shield, LogOut, User, Settings, FileText, LayoutDashboard } from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserMenuProps {
  user: any; // Using any for now, should be properly typed based on user context
  navigate: NavigateFunction;
  isAdmin?: boolean;
}

export function NavbarUserMenu({ user, navigate, isAdmin = false }: NavbarUserMenuProps) {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", admin: false },
    { label: "Profile Settings", icon: Settings, path: "/dashboard/profile", admin: false },
    { label: "My Submissions", icon: FileText, path: "/dashboard/submissions", admin: false },
    { label: "Create Challenge", icon: Shield, path: "/dashboard/create-challenge", admin: true },
    { label: "Analytics Dashboard", icon: Shield, path: "/dashboard/analytics", admin: true },
  ];

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-moh-green bg-white text-moh-green hover:bg-gray-50 flex gap-2 items-center rounded-full px-6 btn-hover"
            >
              <User className="h-4 w-4" />
              {isAdmin ? "Admin" : "My Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-gray-100 rounded-md animate-in slide-in-from-top-1 zoom-in-95">
            <DropdownMenuLabel className="flex items-center">
              {isAdmin && (
                <span className="bg-gray-50 text-moh-darkGreen text-xs rounded px-1.5 py-0.5 font-medium mr-2">
                  Admin
                </span>
              )}
              <span className="font-medium">My Account</span>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            {menuItems
              .filter(item => !item.admin || isAdmin)
              .map((item, idx) => (
                <DropdownMenuItem 
                  key={idx}
                  onClick={() => navigate(item.path)} 
                  className="hover:bg-gray-50 hover:text-moh-green cursor-pointer flex items-center"
                >
                  <item.icon className="h-4 w-4 mr-2 opacity-70" />
                  {item.label}
                </DropdownMenuItem>
              ))
            }
            
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 hover:bg-red-50 flex items-center cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth/login')} 
              className="border-moh-green bg-white text-moh-green hover:bg-gray-50 flex gap-2 items-center rounded-full px-6"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => navigate('/auth/register')} 
              className="bg-moh-green hover:bg-moh-darkGreen text-white flex gap-2 items-center rounded-full px-6"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
}
