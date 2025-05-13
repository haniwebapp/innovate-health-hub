
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
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { GradientBackground } from "@/components/animations/GradientBackground";
import { Reveal } from "@/components/ui/reveal";

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

  // Smooth scrolling progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        
        {/* Enhanced scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-moh-green via-moh-gold to-moh-green origin-left z-50"
          style={{ scaleX }}
        />
        
        <main className="flex-grow pt-0 my-0 rounded-none py-0">
          <TooltipProvider>
            <HeroSection />
            
            <Reveal>
              <GradientBackground variant="light-green" animate={false} className="py-12">
                <PlatformHighlights />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <GuidedPathwaysSection />
            </Reveal>
            
            <Reveal>
              <GradientBackground variant="subtle" animate={false} className="py-12">
                <InnovationGallery />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <ChallengesSection />
            </Reveal>
            
            <Reveal>
              <GradientBackground variant="light-gold" animate={false} className="py-12">
                <RegulatorySandboxSection />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <StartupResourcesSection />
            </Reveal>
            
            <Reveal>
              <GradientBackground variant="subtle" animate={false} className="py-12">
                <FundingOpportunitiesSection />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <EventsSection />
            </Reveal>
            
            <Reveal>
              <AIDrivenSection />
            </Reveal>
            
            <Reveal>
              <GradientBackground variant="green-gold" animate={true} className="py-12">
                <InnovationJourney />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <HealthcareAnimation />
            </Reveal>
            
            <Reveal>
              <ProcessFlowSection />
            </Reveal>
            
            <Reveal>
              <GradientBackground variant="light-green" animate={false} className="py-12">
                <AboutSection />
              </GradientBackground>
            </Reveal>
            
            <Reveal>
              <FeaturedSection />
            </Reveal>
          </TooltipProvider>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
