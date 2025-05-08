
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus, Shield } from "lucide-react";
import { NavigateFunction } from "react-router-dom";
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
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-moh-green text-moh-green hover:bg-moh-lightGreen flex gap-2 items-center"
            >
              {isAdmin ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
              {isAdmin ? "Admin" : "My Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center">
              {isAdmin && (
                <span className="bg-moh-lightGreen text-moh-darkGreen text-xs rounded px-1.5 py-0.5 font-medium mr-2">
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
              className="text-red-600 focus:text-red-600"
              onClick={() => {
                // Handle logout logic here
                // For now we just redirect to login page
                navigate('/auth/login');
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth/login')} 
            className="border-moh-green text-moh-green hover:bg-moh-lightGreen flex gap-2 items-center"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')} 
            className="bg-moh-green hover:bg-moh-darkGreen text-white flex gap-2 items-center"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Button>
        </>
      )}
    </>
  );
}
