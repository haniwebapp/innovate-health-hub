
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { FeaturesHero } from "./components/FeaturesHero";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { AdditionalFeatures } from "./components/AdditionalFeatures";

export default function FeaturesPage() {
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
        variants={{
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: {
              duration: 0.5,
              staggerChildren: 0.1
            }
          },
          exit: { opacity: 0 }
        }}
        key="features-page"
      >
        <Navbar />
        <ScrollProgress />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <FeaturesHero />
          <FeaturesGrid />
          <AdditionalFeatures />
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
