
import React, { useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/home/HeroSection";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import AIDrivenSection from "@/components/home/AIDrivenSection";
import HealthcareAnimation from "@/components/home/HealthcareAnimation";
import FeaturedSection from "@/components/home/FeaturedSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import InnovationJourney from "@/components/home/InnovationJourney";
import ProcessFlowSection from "@/components/home/ProcessFlowSection";
import InnovationGallery from "@/components/home/InnovationGallery";
import GuidedPathwaysSection from "@/components/home/GuidedPathwaysSection";
import RegulatorySandboxSection from "@/components/home/RegulatorySandboxSection";
import StartupResourcesSection from "@/components/home/StartupResourcesSection";
import FundingOpportunitiesSection from "@/components/home/FundingOpportunitiesSection";
import AboutSection from "@/components/home/AboutSection";
import EventsSection from "@/components/home/EventsSection";
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
            {/* Reorganized sections with new guidance components */}
            <HeroSection />
            <PlatformHighlights />
            <GuidedPathwaysSection />
            <InnovationGallery />
            <ChallengesSection />
            <RegulatorySandboxSection />
            <StartupResourcesSection />
            <FundingOpportunitiesSection />
            <EventsSection />
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
    </AnimatePresence>
  );
};

export default Index;
