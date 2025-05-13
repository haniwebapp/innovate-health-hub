
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HeroLogo } from "./hero/HeroLogo";
import { HeroHeading } from "./hero/HeroHeading";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroStats } from "./hero/HeroStats";
import { HeroDecorations } from "./hero/HeroDecorations";
import { HeroBackgroundEffect } from "./hero/HeroBackgroundEffect";
import { ChevronDown, Dna, Atom, Stethoscope, HeartPulse, Tablets, Microscope, Flask } from "lucide-react";
import { useRef } from "react";
import { HealthcareIconsCluster } from "./hero/HealthcareIconsCluster";

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

  // DNA icon animation
  const dnaIconAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="pt-0 pb-20 md:pb-24 lg:pb-28 bg-gradient-to-br from-moh-darkGreen via-moh-green to-moh-darkGreen relative overflow-hidden text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <HeroBackgroundEffect />
      
      {/* Floating DNA icon */}
      <motion.div
        className="absolute top-24 left-8 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={dnaIconAnimation.animate}
      >
        <Dna className="text-white/50" size={36} strokeWidth={1} />
      </motion.div>
      
      {/* Floating Atom icon */}
      <motion.div
        className="absolute top-28 right-14 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0, 0.7, 0],
          rotate: [0, 360],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }}
      >
        <Atom className="text-moh-gold/60" size={32} strokeWidth={1} />
      </motion.div>
      
      {/* Medical icons floating around */}
      <motion.div
        className="absolute bottom-40 left-10 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }}
      >
        <Stethoscope className="text-white/50" size={28} strokeWidth={1} />
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-28 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
          transition: {
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }}
      >
        <HeartPulse className="text-moh-gold/60" size={24} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute bottom-60 right-20 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse" as const,
            delay: 1
          }
        }}
      >
        <Tablets className="text-white/50" size={22} strokeWidth={1} />
      </motion.div>
      
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-28 md:pt-32 lg:pt-36">
          <motion.div 
            className="lg:max-w-xl text-center lg:text-left"
            variants={containerVariant}
          >
            <motion.div variants={itemVariant}>
              <HeroLogo />
            </motion.div>
            
            <motion.div variants={itemVariant}>
              <HeroHeading />
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed" 
              variants={itemVariant}
            >
              A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia in alignment with <span className="font-semibold text-moh-lightGold">Vision 2030</span>.
            </motion.p>
            
            <HeroButtons />
            
            <HeroStats />
            
            {/* Vision 2030 alignment note */}
            <motion.div
              className="mt-12 mb-8 max-w-2xl mx-auto lg:mx-0 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              variants={itemVariant}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-sm text-white/90">
                <span className="font-semibold text-moh-lightGold">Ministry of Health Innovation Platform</span> is aligned with Saudi Vision 2030's healthcare transformation goals, empowering digital health initiatives and fostering innovation across the healthcare ecosystem.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Healthcare innovation visualization - right column */}
          <motion.div 
            className="lg:max-w-md w-full"
            variants={itemVariant}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <HealthcareIconsCluster />
          </motion.div>
        </div>

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
            <span className="text-sm text-white/80 font-medium mb-1">Discover Platform Features</span>
            <div className="relative">
              <ChevronDown className="text-white/80 h-8 w-8" />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  y: [0, 4, 0], 
                  opacity: [0.3, 1, 0.3] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: 0.5 
                }}
              >
                <ChevronDown className="text-white/40 h-8 w-8" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <HeroDecorations />
      
      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-white"></path>
        </svg>
      </div>
    </motion.section>
  );
}
