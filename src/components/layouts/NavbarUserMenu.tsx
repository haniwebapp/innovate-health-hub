
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface NavbarUserMenuProps {
  user: any; // Using any for now, should be properly typed based on user context
  navigate: NavigateFunction;
}

export function NavbarUserMenu({ user, navigate }: NavbarUserMenuProps) {
  return (
    <>
      {user ? (
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')} 
          className="border-moh-green text-moh-green hover:bg-moh-lightGreen flex gap-2 items-center"
        >
          <User className="h-4 w-4" />
          Dashboard
        </Button>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth/login')} 
            className="border-moh-green text-moh-green hover:bg-moh-lightGreen"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')} 
            className="bg-moh-green hover:bg-moh-darkGreen text-white"
          >
            Register
          </Button>
        </>
      )}
    </>
  );
}
