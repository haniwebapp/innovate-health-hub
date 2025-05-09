
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Import all about page sections
import HeroSection from "@/components/about/HeroSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import FocusAreasSection from "@/components/about/FocusAreasSection";
import PartnersSection from "@/components/about/PartnersSection";
import TeamMembersSection from "@/components/about/TeamMembersSection";
import ImpactMetricsSection from "@/components/about/ImpactMetricsSection";
import JoinCommunitySection from "@/components/about/JoinCommunitySection";

const AboutPage = () => {
  const { language } = useLanguage();
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-white" 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <main className="flex-grow pt-16">
        <HeroSection />
        <VisionMissionSection />
        <FocusAreasSection />
        <ImpactMetricsSection />
        <TeamMembersSection />
        <PartnersSection />
        <JoinCommunitySection />
      </main>
      
      <Footer />
    </motion.div>
  );
}

export default AboutPage;
