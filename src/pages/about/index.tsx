
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/about/HeroSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import FocusAreasSection from "@/components/about/FocusAreasSection";
import PartnersSection from "@/components/about/PartnersSection";
import JoinCommunitySection from "@/components/about/JoinCommunitySection";
import { motion } from "framer-motion";
import { useRTLDirection } from "@/utils/rtlUtils";

const AboutPage = () => {
  const { language } = useLanguage();
  
  // Apply RTL direction using the enhanced utility hook
  useRTLDirection(language);
  
  // Page transition animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };
  
  return (
    <motion.div 
      className={`min-h-screen flex flex-col bg-white ${language === 'ar' ? 'rtl-mode' : ''}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
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
};

export default AboutPage;
