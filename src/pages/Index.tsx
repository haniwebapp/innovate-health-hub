
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
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useRTLDirection } from "@/utils/rtlUtils";

const Index = () => {
  const { language } = useLanguage();
  
  // Apply RTL direction using the new utility hook
  useRTLDirection(language);
  
  return (
    <motion.div 
      className={`min-h-screen flex flex-col bg-white ${language === 'ar' ? 'rtl-mode' : ''}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="flex-grow pt-16">
        <TooltipProvider>
          <HeroSection />
          <HealthcareAnimation />
          <AboutSection />
          <InnovationJourney />
          <PlatformHighlights />
          <ProcessFlowSection />
          <AIDrivenSection />
          <FeaturedSection />
          <ChallengesSection />
        </TooltipProvider>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
