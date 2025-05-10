
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

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

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/auth/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src={user.avatar_url || undefined} alt={`${user.first_name || user.email}`} />
            <AvatarFallback className="bg-moh-lightGreen text-moh-darkGreen">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
