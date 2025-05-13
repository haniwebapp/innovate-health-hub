
import { motion } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import PolicyHero from "@/components/policy/PolicyHero";
import PolicyFramework from "@/components/policy/PolicyFramework";
import RegulatoryGuidelines from "@/components/policy/RegulatoryGuidelines";
import ComplianceTools from "@/components/policy/ComplianceTools";
import PolicyResources from "@/components/policy/PolicyResources";
import Vision2030Section from "@/components/policy/Vision2030Section";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PolicyPage() {
  const { language } = useLanguage();
  
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
        <PolicyHero />
        <PolicyFramework />
        <RegulatoryGuidelines />
        <ComplianceTools />
        <Vision2030Section />
        <PolicyResources />
      </main>
      
      <Footer />
    </motion.div>
  );
}
