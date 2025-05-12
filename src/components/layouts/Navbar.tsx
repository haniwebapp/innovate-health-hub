
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarMainLinks } from "@/components/layouts/NavbarMainLinks";
import NavbarUserMenu from "@/components/layouts/NavbarUserMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import { SearchDialog } from "@/components/layouts/SearchDialog";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";

export default function Navbar() {
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
  
  return (
    <>
      {/* Optional announcement banner */}
      <div className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white text-sm py-1.5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>Welcome to the new Ministry of Health Innovation Platform! <Link to="/about" className="underline font-medium">Learn more</Link></p>
        </div>
      </div>
      
      <header 
        className={`relative z-50 transition-all duration-300 
        ${scrolled 
          ? 'bg-white/85 backdrop-blur-md shadow-sm py-2' 
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
                  <motion.img 
                    src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                    alt="Ministry of Health Logo" 
                    className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`}
                  />
                </Link>
              </motion.div>
            </div>
            
            <NavbarMainLinks isRouteActive={isRouteActive} />
            
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              <NotificationBadge />
              
              <div className="h-6 border-l border-gray-200 mx-1"></div>
              
              <NavbarUserMenu />
            </div>
            
            {/* Mobile menu button with improved animation */}
            <div className="flex md:hidden">
              <Button 
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
              </Button>
            </div>
          </div>
        </motion.div>
      </header>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && <NavbarMobileMenu isRouteActive={isRouteActive} setMobileMenuOpen={setMobileMenuOpen} />}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
