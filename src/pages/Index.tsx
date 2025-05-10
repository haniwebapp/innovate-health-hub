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
  // Page transition animations
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0
    }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <AnimatePresence mode="wait">
      <motion.div className="min-h-screen flex flex-col bg-white" initial="initial" animate="animate" exit="exit" variants={pageVariants} key="home-page">
        <Navbar />
        <ScrollProgress />
        
        <main className="flex-grow pt-16 my-0 rounded-none py-0">
          <TooltipProvider>
            {/* Enhanced home page section order for better user engagement */}
            <HeroSection />
            <PlatformHighlights />
            <InnovationGallery />
            <ChallengesSection />
            <AIDrivenSection />
            <InnovationJourney />
            <HealthcareAnimation />
            <ProcessFlowSection />
            <AboutSection />
            <FeaturedSection />
          </TooltipProvider>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>;
};
export default Index;