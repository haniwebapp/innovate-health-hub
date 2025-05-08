
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Globe, ChevronDown, User, ArrowRight, ArrowUpRight, BrainCircuit, Award, FileText, Lightbulb } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import MegaMenu from "@/components/navigation/MegaMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
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

  // Toggle mega menu
  const toggleMegaMenu = (menuName: string) => {
    if (activeMegaMenu === menuName) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menuName);
    }
  };

  // Challenge mega menu data
  const challengeMenuData = {
    categoryLinks: [
      {
        category: "Challenge Types",
        items: [
          {
            title: "Healthcare Innovations",
            description: "Solving healthcare delivery challenges",
            to: "/challenges?category=healthcare",
            icon: <BrainCircuit className="h-5 w-5 text-moh-green" />
          },
          {
            title: "Digital Health",
            description: "Technology-driven healthcare solutions",
            to: "/challenges?category=digital-health",
            icon: <Lightbulb className="h-5 w-5 text-moh-green" />
          },
          {
            title: "Accessibility",
            description: "Making healthcare accessible for all",
            to: "/challenges?category=accessibility",
            icon: <FileText className="h-5 w-5 text-moh-green" />
          },
        ]
      },
      {
        category: "Challenge Status",
        items: [
          {
            title: "Open Challenges",
            description: "Currently accepting submissions",
            to: "/challenges?status=open",
            icon: <ArrowRight className="h-5 w-5 text-moh-green" />
          },
          {
            title: "Upcoming Challenges",
            description: "Launching soon",
            to: "/challenges?status=upcoming",
            icon: <ArrowUpRight className="h-5 w-5 text-moh-green" />
          },
          {
            title: "Completed Challenges",
            description: "View past winners and solutions",
            to: "/challenges?status=completed",
            icon: <Award className="h-5 w-5 text-moh-green" />
          },
        ]
      },
      {
        category: "Resources",
        items: [
          {
            title: "Challenge Guidelines",
            description: "Learn how to participate",
            to: "/knowledge-hub/challenge-guidelines",
          },
          {
            title: "Submission Tips",
            description: "Improve your submission quality",
            to: "/knowledge-hub/submission-tips",
          },
          {
            title: "FAQ",
            description: "Frequently asked questions",
            to: "/knowledge-hub/faq",
          },
        ]
      },
    ],
    featuredLinks: [
      {
        title: "Telehealth Optimization Challenge",
        description: "Deadline: June 15, 2025",
        to: "/challenges/telehealth-optimization",
        image: "/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png",
      },
      {
        title: "Healthcare AI Solutions",
        description: "Deadline: July 30, 2025",
        to: "/challenges/healthcare-ai",
        image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png",
      }
    ]
  };

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
            <div className="relative">
              <button 
                className={`transition-colors flex items-center gap-1 mega-menu-trigger ${isRouteActive('/challenges') || activeMegaMenu === 'challenges' ? 'text-moh-green font-medium' : 'text-moh-darkGreen hover:text-moh-green'}`}
                onClick={() => toggleMegaMenu('challenges')}
                aria-expanded={activeMegaMenu === 'challenges'}
              >
                Challenges
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMegaMenu === 'challenges' ? 'rotate-180' : ''}`} />
              </button>
              <MegaMenu 
                isOpen={activeMegaMenu === 'challenges'} 
                onClose={() => setActiveMegaMenu(null)} 
                categoryLinks={challengeMenuData.categoryLinks}
                featuredLinks={challengeMenuData.featuredLinks}
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
            <button 
              className={`flex w-full justify-between items-center px-4 py-2 rounded-md text-base font-medium ${isRouteActive('/challenges') ? 'text-moh-green bg-moh-lightGreen' : 'text-moh-darkGreen hover:bg-moh-lightGreen'}`}
              onClick={() => toggleMegaMenu('challenges-mobile')}
            >
              Challenges
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMegaMenu === 'challenges-mobile' ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile Challenges Mega Menu */}
            {activeMegaMenu === 'challenges-mobile' && (
              <div className="pl-4 space-y-3 border-l-2 border-moh-lightGreen ml-4">
                {challengeMenuData.categoryLinks.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-medium text-moh-darkGreen pl-4 pt-2">{category.category}</h3>
                    {category.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-moh-green hover:bg-moh-lightGreen rounded-md"
                      >
                        <div className="flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
            
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
