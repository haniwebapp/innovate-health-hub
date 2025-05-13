
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HeroLogo } from "./HeroLogo";
import { HeroHeading } from "./HeroHeading";
import { HeroButtons } from "./HeroButtons";
import { HeroStats } from "./HeroStats";
import { HeroBackgroundEffect } from "./HeroBackgroundEffect";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('platform-highlights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Container animation variant
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
      }
    }
  };

  // Child elements animation variant
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="pt-16 pb-20 md:pb-24 lg:pb-28 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <HeroBackgroundEffect />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center pt-20 md:pt-24 lg:pt-28"
          variants={containerVariant}
        >
          <motion.div variants={itemVariant}>
            <HeroLogo />
          </motion.div>
          
          <motion.div variants={itemVariant}>
            <HeroHeading />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed" 
            variants={itemVariant}
          >
            A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia in alignment with <span className="font-semibold text-moh-darkGreen">Vision 2030</span>.
          </motion.p>
          
          <HeroButtons />
          
          <HeroStats />
          
          {/* Vision 2030 alignment note */}
          <motion.div
            className="mt-12 mb-8 max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm"
            variants={itemVariant}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-moh-darkGreen">Ministry of Health Innovation Platform</span> is aligned with Saudi Vision 2030's healthcare transformation goals, empowering digital health initiatives and fostering innovation across the healthcare ecosystem.
            </p>
          </motion.div>
          
          {/* Enhanced scroll indicator with animation */}
          <motion.div 
            className="mt-16 cursor-pointer"
            onClick={scrollToNextSection}
            variants={itemVariant}
            animate={{ 
              y: [0, 8, 0], 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity },
              opacity: { duration: 1.5, repeat: Infinity }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-moh-green/80 font-medium mb-1">Discover Platform Features</span>
              <ChevronDown className="text-moh-green/80 h-8 w-8" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
