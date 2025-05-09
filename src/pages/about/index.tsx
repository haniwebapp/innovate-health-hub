
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/about/HeroSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import FocusAreasSection from "@/components/about/FocusAreasSection";
import PartnersSection from "@/components/about/PartnersSection";
import JoinCommunitySection from "@/components/about/JoinCommunitySection";
import { useEffect } from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const { language } = useLanguage();
  
  // Apply RTL direction to document when language is Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add special RTL class to document for global RTL styles if needed
    if (language === 'ar') {
      document.documentElement.classList.add('rtl-layout');
    } else {
      document.documentElement.classList.remove('rtl-layout');
    }
    
    // Add global inline override for alignment in RTL mode
    document.documentElement.style.textAlign = language === 'ar' ? 'right' : 'left';
  }, [language]);
  
  return (
    <motion.div 
      className={`min-h-screen flex flex-col bg-white ${language === 'ar' ? 'rtl-mode' : ''}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <HeroSection />
      <VisionMissionSection />
      <FocusAreasSection />
      <PartnersSection />
      <JoinCommunitySection />
      
      <Footer />
    </motion.div>
  );
}

export default AboutPage;
