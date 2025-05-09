
import React, { useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import AIDrivenSection from "@/components/home/AIDrivenSection";
import HealthcareAnimation from "@/components/home/HealthcareAnimation";
import FeaturedSection from "@/components/home/FeaturedSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import InnovationJourney from "@/components/home/InnovationJourney";
import ProcessFlowSection from "@/components/home/ProcessFlowSection";
import InnovationGallery from "@/components/home/InnovationGallery";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useRTLDirection } from "@/utils/rtlUtils";

const Index = () => {
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

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
      <main className="flex-grow pt-16">
        <TooltipProvider>
          <HeroSection />
          <HealthcareAnimation />
          <AboutSection />
          <InnovationJourney />
          <PlatformHighlights />
          <InnovationGallery />
          <ProcessFlowSection />
          <AIDrivenSection />
          <ChallengesSection />
          <FeaturedSection />
        </TooltipProvider>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
