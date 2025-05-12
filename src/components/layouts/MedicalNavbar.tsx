
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Bell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedicalButton } from "@/components/ui/medical-button";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export default function MedicalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Handle scrolling effect with throttling for better performance
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(lastScrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Main links with icons
  const mainLinks = [
    { path: "/innovations", label: "Innovations" },
    { path: "/challenges", label: "Challenges" },
    { path: "/investment", label: "Investment" },
    { path: "/regulatory", label: "Regulatory" },
    { path: "/knowledge-hub", label: "Knowledge Hub" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      <ScrollProgress />
      
      {/* Optional announcement banner */}
      <div className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white text-sm py-1.5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>Welcome to the Ministry of Health Innovation Platform! <Link to="/about" className="underline font-medium">Learn more</Link></p>
        </div>
      </div>
      
      <header 
        className={`relative z-50 transition-all duration-300 
        ${scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-3'}`}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/" className="flex items-center group">
                  <img 
                    src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                    alt="Ministry of Health Logo" 
                    className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto object-contain`}
                  />
                </Link>
              </motion.div>
            </div>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {mainLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-full text-[15px] font-medium transition-all ${
                      isRouteActive(link.path)
                        ? 'bg-gradient-to-r from-moh-green to-moh-darkGreen text-white shadow-sm'
                        : 'text-moh-darkGreen hover:bg-moh-lightGreen/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-moh-darkGreen hover:bg-moh-lightGreen/50 rounded-full"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </MedicalButton>
              
              {/* Notifications */}
              <div className="relative">
                <MedicalButton 
                  variant="ghost" 
                  size="icon" 
                  className="text-moh-darkGreen hover:bg-moh-lightGreen/50 rounded-full"
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-moh-gold rounded-full"></span>
                </MedicalButton>
              </div>
              
              <div className="h-6 border-l border-gray-200 mx-1"></div>
              
              {/* User menu */}
              {user ? (
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button className="flex items-center gap-2 hover:bg-moh-lightGreen/50 px-3 py-2 rounded-full text-sm font-medium text-moh-darkGreen">
                      <div className="h-8 w-8 rounded-full bg-moh-green/10 flex items-center justify-center">
                        <span className="font-medium text-moh-green">
                          {user.first_name?.[0]}
                          {user.last_name?.[0]}
                        </span>
                      </div>
                      <div className="hidden lg:block text-left">
                        <div className="text-sm font-medium">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Healthcare Professional
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                  </motion.div>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-1 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-moh-lightGreen">Dashboard</Link>
                      <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-moh-lightGreen">Profile</Link>
                      <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-moh-lightGreen">Settings</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <MedicalButton variant="outline" asChild>
                    <Link to="/login">Sign in</Link>
                  </MedicalButton>
                  <MedicalButton asChild>
                    <Link to="/register">Register</Link>
                  </MedicalButton>
                </div>
              )}
            </div>
            
            {/* Mobile menu button with improved animation */}
            <div className="flex md:hidden">
              <MedicalButton 
                type="button" 
                variant="ghost" 
                size="icon" 
                className={`rounded-full transition-colors ${mobileMenuOpen ? 'bg-moh-lightGreen text-moh-green' : 'text-moh-darkGreen'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                aria-expanded={mobileMenuOpen} 
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence initial={false} mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </MedicalButton>
            </div>
          </div>
        </motion.div>
      </header>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {mainLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className={`px-4 py-3 rounded-md block ${
                        isRouteActive(link.path)
                          ? 'bg-moh-lightGreen text-moh-darkGreen font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-gray-100 my-2 pt-2">
                  <Link to="/login" className="px-4 py-3 rounded-md block text-moh-green hover:bg-moh-lightGreen">
                    Sign in
                  </Link>
                  <Link to="/register" className="px-4 py-3 rounded-md block text-moh-green font-medium hover:bg-moh-lightGreen">
                    Register
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
