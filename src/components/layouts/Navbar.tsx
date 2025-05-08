import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Globe, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
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
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" alt="Ministry of Health Logo" className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`} />
              
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-moh-darkGreen hover:text-moh-green transition-colors flex items-center">
              About
            </Link>
            <Link to="/challenges" className="text-moh-darkGreen hover:text-moh-green transition-colors flex items-center gap-1">
              Challenges
              <ChevronDown className="h-4 w-4" />
            </Link>
            <Link to="/innovations" className="text-moh-darkGreen hover:text-moh-green transition-colors">
              Innovations
            </Link>
            <Link to="/knowledge-hub" className="text-moh-darkGreen hover:text-moh-green transition-colors">
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
            
            {user ? <Button variant="outline" onClick={() => navigate('/dashboard')} className="border-moh-green text-moh-green hover:bg-moh-lightGreen flex gap-2 items-center">
                <User className="h-4 w-4" />
                Dashboard
              </Button> : <>
                <Button variant="outline" onClick={() => navigate('/auth/login')} className="border-moh-green text-moh-green hover:bg-moh-lightGreen">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/auth/register')} className="bg-moh-green hover:bg-moh-darkGreen text-white">
                  Register
                </Button>
              </>}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-moh-darkGreen" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link to="/about" className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/challenges" className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen" onClick={() => setMobileMenuOpen(false)}>
              Challenges
            </Link>
            <Link to="/innovations" className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen" onClick={() => setMobileMenuOpen(false)}>
              Innovations
            </Link>
            <Link to="/knowledge-hub" className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen" onClick={() => setMobileMenuOpen(false)}>
              Knowledge Hub
            </Link>
            
            <div className="flex items-center justify-between pt-3 pb-2">
              <Button variant="ghost" size="sm" className="flex-1 justify-center text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 justify-center text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green">
                <Globe className="h-4 w-4 mr-2" />
                Language
              </Button>
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              {user ? <Button onClick={() => {
            navigate('/dashboard');
            setMobileMenuOpen(false);
          }} className="w-full bg-moh-green hover:bg-moh-darkGreen text-white">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button> : <>
                  <Button variant="outline" onClick={() => {
              navigate('/auth/login');
              setMobileMenuOpen(false);
            }} className="w-full border-moh-green text-moh-green hover:bg-moh-lightGreen">
                    Sign In
                  </Button>
                  <Button onClick={() => {
              navigate('/auth/register');
              setMobileMenuOpen(false);
            }} className="w-full bg-moh-green hover:bg-moh-darkGreen text-white">
                    Register
                  </Button>
                </>}
            </div>
          </div>
        </div>}
    </header>;
}