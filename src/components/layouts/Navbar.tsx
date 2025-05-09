import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import NavbarMainLinks from "@/components/layouts/NavbarMainLinks";
import NavbarUserMenu from "@/components/layouts/NavbarUserMenu";
import LanguageSwitcher from "@/components/layouts/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-white py-4'
      }`}
    >
      <Container>
        <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>
          
          <NavbarMainLinks isRouteActive={isRouteActive} />
          
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <LanguageSwitcher />
            
            <NavbarUserMenu user={user} navigate={navigate} />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              type="button" 
              variant="ghost"
              size="icon"
              className="rounded-full text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <NavbarMobileMenu 
            isRouteActive={isRouteActive} 
            setMobileMenuOpen={setMobileMenuOpen} 
            user={user} 
            navigate={navigate} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
