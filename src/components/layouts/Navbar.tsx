
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarMainLinks } from "@/components/layouts/NavbarMainLinks";
import NavbarUserMenu from "@/components/layouts/NavbarUserMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import { SearchDialog } from "@/components/layouts/SearchDialog";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { GlassButton } from "@/components/ui/glassmorphism";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const { animationsEnabled, toggleAnimations } = useAnimation();

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
  
  // Animated navigation variants
  const navVariants = {
    hidden: { 
      y: -100,
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      y: -100,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <>
      {/* Announcement banner with animated gradient */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white text-sm py-1.5 relative">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" /> 
              Welcome to the new Ministry of Health Innovation Platform! 
              <Link to="/about" className="underline font-medium hover:text-moh-lightGold transition-colors">
                Learn more
              </Link>
            </p>
          </div>
          
          {/* Animated gradient overlay */}
          {animationsEnabled && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "linear",
                repeatDelay: 1
              }}
            />
          )}
        </div>
      </motion.div>
      
      <AnimatePresence>
        <motion.header 
          key="navbar"
          className={`sticky top-0 z-50 transition-all duration-300 
            ${scrolled 
              ? 'bg-white/85 backdrop-blur-md shadow-sm py-2' 
              : 'bg-transparent py-3'}`}
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <Link to="/" className="flex items-center group">
                  <motion.img 
                    src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                    alt="Ministry of Health Logo" 
                    className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <NavbarMainLinks isRouteActive={isRouteActive} />
              </motion.div>
              
              <motion.div 
                className="hidden md:flex items-center space-x-4"
                variants={itemVariants}
              >
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
                
                <motion.div 
                  className="h-6 border-l border-gray-200 mx-1"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 24, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-1.5 items-center text-moh-green"
                  onClick={toggleAnimations}
                >
                  <Sparkles size={14} className={animationsEnabled ? "text-moh-gold" : "text-gray-400"} />
                  {animationsEnabled ? "Animations On" : "Animations Off"}
                </Button>
                
                <NavbarUserMenu />
              </motion.div>
              
              {/* Mobile menu button with improved animation */}
              <motion.div 
                className="flex md:hidden"
                variants={itemVariants}
              >
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full transition-colors ${mobileMenuOpen ? 'bg-moh-lightGreen text-moh-green' : 'text-moh-darkGreen'}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  aria-expanded={mobileMenuOpen} 
                  aria-label="Toggle navigation menu"
                >
                  <AnimatePresence mode="wait">
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
              </motion.div>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && <NavbarMobileMenu isRouteActive={isRouteActive} setMobileMenuOpen={setMobileMenuOpen} />}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
