
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMainLinks } from "./NavbarMainLinks";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarAuth } from "./NavbarAuth";
import { NavbarLanguageSwitcher } from "./NavbarLanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTLDirection } from "@/utils/rtlUtils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  
  // Set RTL direction based on language
  useRTLDirection(language);
  
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <NavbarLogo scrolled={scrolled} />
          
          {/* Main Navigation (Desktop) */}
          <NavbarMainLinks isRouteActive={isRouteActive} />
          
          {/* Right Side Items */}
          <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-4`}>
            <NavbarLanguageSwitcher />
            <NavbarAuth />
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <NavbarMobileMenu 
            isRouteActive={isRouteActive} 
            setMobileMenuOpen={setMobileMenuOpen} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
