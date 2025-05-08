
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Globe, User } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  user: any; // Using any for now, should be properly typed based on user context
  navigate: NavigateFunction;
}

export function NavbarMobileMenu({ 
  isRouteActive, 
  setMobileMenuOpen, 
  user, 
  navigate 
}: NavbarMobileMenuProps) {
  const mainLinks = [
    { path: "/about", label: "About" },
    { path: "/challenges", label: "Challenges" },
    { path: "/innovations", label: "Innovations" },
    { path: "/knowledge-hub", label: "Knowledge Hub" }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden bg-white shadow-lg animate-fade-in">
      <div className="px-4 pt-4 pb-6 space-y-3">
        {mainLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 rounded-md text-base font-medium ${
              isRouteActive(link.path) 
                ? 'text-moh-green bg-moh-lightGreen' 
                : 'text-moh-darkGreen hover:bg-moh-lightGreen'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        
        <div className="flex items-center justify-between pt-3 pb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green"
          >
            <Globe className="h-4 w-4 mr-2" />
            Language
          </Button>
        </div>
        
        <div className="flex flex-col space-y-3 pt-2">
          {user ? (
            <Button 
              onClick={() => handleNavigate('/dashboard')} 
              className="w-full bg-moh-green hover:bg-moh-darkGreen text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => handleNavigate('/auth/login')} 
                className="w-full border-moh-green text-moh-green hover:bg-moh-lightGreen"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => handleNavigate('/auth/register')} 
                className="w-full bg-moh-green hover:bg-moh-darkGreen text-white"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
