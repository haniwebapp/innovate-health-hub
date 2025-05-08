
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Globe, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MegaMenu } from "@/components/navigation/MegaMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const challengesMenuRef = useRef<HTMLDivElement>(null);

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
  
  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (challengesMenuRef.current && !challengesMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    
    if (megaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [megaMenuOpen]);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
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
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className={`transition-colors flex items-center ${isRouteActive('/about') ? 'text-moh-green font-medium' : 'text-moh-darkGreen hover:text-moh-green'}`}
            >
              About
            </Link>
            <div ref={challengesMenuRef} className="relative">
              <button 
                className={`transition-colors flex items-center gap-1 ${isRouteActive('/challenges') ? 'text-moh-green font-medium' : 'text-moh-darkGreen hover:text-moh-green'}`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
              >
                Challenges
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <MegaMenu 
                isOpen={megaMenuOpen} 
                onClose={() => setMegaMenuOpen(false)}
                className="mt-2"
              />
            </div>
            <Link 
              to="/innovations" 
              className={`transition-colors ${isRouteActive('/innovations') ? 'text-moh-green font-medium' : 'text-moh-darkGreen hover:text-moh-green'}`}
            >
              Innovations
            </Link>
            <Link 
              to="/knowledge-hub" 
              className={`transition-colors ${isRouteActive('/knowledge-hub') ? 'text-moh-green font-medium' : 'text-moh-darkGreen hover:text-moh-green'}`}
            >
              Knowledge Hub
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            
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
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link 
              to="/about" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${isRouteActive('/about') ? 'text-moh-green bg-moh-lightGreen' : 'text-moh-darkGreen hover:bg-moh-lightGreen'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="block px-4 py-2 rounded-md text-base font-medium">
              <button 
                className={`flex items-center justify-between w-full ${isRouteActive('/challenges') ? 'text-moh-green' : 'text-moh-darkGreen'}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/challenges');
                  setMobileMenuOpen(false);
                }}
              >
                <span>Challenges</span>
              </button>
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-moh-lightGreen">
                <Link
                  to="/challenges?category=Digital%20Health"
                  className="block py-1 text-sm text-moh-darkGreen hover:text-moh-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Digital Health
                </Link>
                <Link
                  to="/challenges?category=Artificial%20Intelligence"
                  className="block py-1 text-sm text-moh-darkGreen hover:text-moh-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Artificial Intelligence
                </Link>
                <Link
                  to="/challenges?category=Operations"
                  className="block py-1 text-sm text-moh-darkGreen hover:text-moh-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Operations
                </Link>
                <Link
                  to="/challenges?status=open"
                  className="block py-1 text-sm text-moh-darkGreen hover:text-moh-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Open Challenges
                </Link>
                <Link
                  to="/challenges?status=upcoming"
                  className="block py-1 text-sm text-moh-darkGreen hover:text-moh-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upcoming Challenges
                </Link>
              </div>
            </div>
            <Link 
              to="/innovations" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${isRouteActive('/innovations') ? 'text-moh-green bg-moh-lightGreen' : 'text-moh-darkGreen hover:bg-moh-lightGreen'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Innovations
            </Link>
            <Link 
              to="/knowledge-hub" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${isRouteActive('/knowledge-hub') ? 'text-moh-green bg-moh-lightGreen' : 'text-moh-darkGreen hover:bg-moh-lightGreen'}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Knowledge Hub
            </Link>
            
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
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full bg-moh-green hover:bg-moh-darkGreen text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/auth/login');
                      setMobileMenuOpen(false);
                    }} 
                    className="w-full border-moh-green text-moh-green hover:bg-moh-lightGreen"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/auth/register');
                      setMobileMenuOpen(false);
                    }} 
                    className="w-full bg-moh-green hover:bg-moh-darkGreen text-white"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
