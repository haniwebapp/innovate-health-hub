
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/about/HeroSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import FocusAreasSection from "@/components/about/FocusAreasSection";
import PartnersSection from "@/components/about/PartnersSection";
import JoinCommunitySection from "@/components/about/JoinCommunitySection";
import { motion } from "framer-motion";

const AboutPage = () => {
  const { language } = useLanguage();
  
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
      className="min-h-screen flex flex-col bg-white"
      dir={language === 'ar' ? "rtl" : "ltr"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        <HeroSection />
        <VisionMissionSection />
        <FocusAreasSection />
        <PartnersSection />
        <JoinCommunitySection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default AboutPage;
