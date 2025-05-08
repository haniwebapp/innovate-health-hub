
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Shield, LogOut, User } from "lucide-react";
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

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 bg-white text-gray-800 hover:bg-gray-100 flex gap-2 items-center rounded-full px-6"
            >
              <User className="h-4 w-4" />
              {isAdmin ? "Admin" : "My Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white shadow-md border border-gray-100 rounded-md">
            <DropdownMenuLabel className="flex items-center">
              {isAdmin && (
                <span className="bg-gray-100 text-gray-700 text-xs rounded px-1.5 py-0.5 font-medium mr-2">
                  Admin
                </span>
              )}
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')} className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/submissions')} className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
              My Submissions
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500">Admin Functions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/dashboard/create-challenge')} className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                  Create Challenge
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/analytics')} className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                  Analytics Dashboard
                </DropdownMenuItem>
              </>
            )}
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
        <>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth/login')} 
            className="border-gray-300 bg-white text-gray-800 hover:bg-gray-100 flex gap-2 items-center rounded-full px-6"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')} 
            className="bg-gray-800 hover:bg-gray-700 text-white flex gap-2 items-center rounded-full px-6"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Button>
        </>
      )}
    </>
  );
}
