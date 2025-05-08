
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Shield, LogOut } from "lucide-react";
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
              className="border-moh-green bg-white text-moh-green hover:bg-[#D9F0E6] flex gap-2 items-center rounded-full px-6"
            >
              {isAdmin ? <Shield className="h-4 w-4" /> : null}
              {isAdmin ? "Admin" : "My Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center">
              {isAdmin && (
                <span className="bg-[#E8F6EF] text-moh-darkGreen text-xs rounded px-1.5 py-0.5 font-medium mr-2">
                  Admin
                </span>
              )}
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/submissions')}>
              My Submissions
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500">Admin Functions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/dashboard/create-challenge')}>
                  Create Challenge
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/analytics')}>
                  Analytics Dashboard
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 flex items-center"
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
            className="border-moh-green bg-white text-moh-green hover:bg-[#D9F0E6] flex gap-2 items-center rounded-full px-6"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')} 
            className="bg-moh-green hover:bg-moh-darkGreen text-white flex gap-2 items-center rounded-full px-6"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Button>
        </>
      )}
    </>
  );
}
