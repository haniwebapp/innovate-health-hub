
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface NavbarLogoProps {
  scrolled?: boolean;
}

export function NavbarLogo({ scrolled = false }: NavbarLogoProps) {
  const { t, language } = useLanguage();
  
  return (
    <Link to="/" className="flex items-center">
      <motion.div 
        className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-moh-green to-moh-darkGreen shadow-sm ${scrolled ? 'scale-90' : ''} transition-all duration-300`}>
          <span className="text-white font-bold text-xl select-none">م</span>
        </div>
        <div className={`ml-2 ${language === 'ar' ? 'mr-2 ml-0' : ''} ${scrolled ? 'scale-95' : ''} transition-all duration-300`}>
          <div className="text-lg font-bold text-moh-darkGreen">
            {t('home.about.tag')}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
