
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Globe, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarMainLinks } from "./NavbarMainLinks";
import { NavbarUserMenu } from "./NavbarUserMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Check if route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#E8F6EF]/95 backdrop-blur-md shadow-md py-2' : 'bg-[#E8F6EF] py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`} 
              />
            </Link>
          </div>
          
          <NavbarMainLinks isRouteActive={isRouteActive} />
          
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-[#D9F0E6] hover:text-moh-green rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-[#D9F0E6] hover:text-moh-green rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            
            <NavbarUserMenu user={user} navigate={navigate} />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center rounded-md p-2 text-moh-darkGreen" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <span className="material-symbols-outlined">close</span>
              ) : (
                <span className="material-symbols-outlined">menu</span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <NavbarMobileMenu 
          isRouteActive={isRouteActive} 
          setMobileMenuOpen={setMobileMenuOpen} 
          user={user} 
          navigate={navigate} 
        />
      )}
    </header>
  );
}
