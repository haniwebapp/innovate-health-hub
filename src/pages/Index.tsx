
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
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

const Index = () => {
  // Enhanced page transition animations
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Child elements animation
  const childVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    exit: { y: -20, opacity: 0 }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen flex flex-col bg-white" 
        initial="initial" 
        animate="animate" 
        exit="exit" 
        variants={pageVariants} 
        key="home-page"
      >
        <Navbar />
        <ScrollProgress />
        
        <main className="flex-grow pt-0 my-0 rounded-none py-0">
          <TooltipProvider>
            {/* Enhanced home page section order for better user engagement */}
            <motion.div variants={childVariants}>
              <HeroSection />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <PlatformHighlights />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <InnovationGallery />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <ChallengesSection />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <AIDrivenSection />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <InnovationJourney />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <HealthcareAnimation />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <ProcessFlowSection />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <AboutSection />
            </motion.div>
            
            <motion.div variants={childVariants}>
              <FeaturedSection />
            </motion.div>
          </TooltipProvider>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
