
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HeroLogo } from "./hero/HeroLogo";
import { HeroHeading } from "./hero/HeroHeading";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroStats } from "./hero/HeroStats";
import { HeroDecorations } from "./hero/HeroDecorations";
import { HeroBackgroundEffect } from "./hero/HeroBackgroundEffect";
import { ChevronDown, Dna, Atom, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { GradientBackground } from "@/components/animations/GradientBackground";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glassmorphism";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { animationsEnabled } = useAnimation();
  const [isInteracting, setIsInteracting] = useState(false);
  
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
      className="pt-0 pb-20 md:pb-32 lg:pb-36 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <GradientBackground variant="green-gold" animate={animationsEnabled} className="absolute inset-0" />
      
      {animationsEnabled && <HeroBackgroundEffect isInteracting={isInteracting} />}
      
      {/* Floating DNA icon - using the Reveal component */}
      <Reveal delay={0.8} direction="right">
        <motion.div
          className="absolute top-24 left-8 hidden md:block"
          initial={animationsEnabled ? dnaIconAnimation.initial : { opacity: 1 }}
          animate={animationsEnabled ? dnaIconAnimation.animate : { opacity: 1 }}
        >
          <Dna className="text-moh-green/30" size={36} strokeWidth={1} />
        </motion.div>
      </Reveal>
      
      {/* Floating Atom icon */}
      <Reveal delay={1} direction="left">
        <motion.div
          className="absolute top-28 right-14 hidden md:block"
          initial={animationsEnabled ? dnaIconAnimation.initial : { opacity: 1 }}
          animate={animationsEnabled ? {
            scale: [0.8, 1.1, 0.8],
            opacity: [0, 0.7, 0],
            rotate: [0, 360],
            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse" as const
            }
          } : { opacity: 1 }}
        >
          <Atom className="text-moh-gold/30" size={32} strokeWidth={1} />
        </motion.div>
      </Reveal>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center pt-28 md:pt-32 lg:pt-36">
          <Reveal delay={0.5} duration={0.7}>
            <HeroLogo />
          </Reveal>
          
          <Reveal delay={0.7} duration={0.8}>
            <HeroHeading />
          </Reveal>
          
          <Reveal delay={0.9}>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"> 
              A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia in alignment with <span className="font-semibold text-moh-darkGreen">Vision 2030</span>.
            </p>
          </Reveal>
          
          <Reveal delay={1.1}>
            <HeroButtons />
          </Reveal>
          
          <Reveal delay={1.3}>
            <HeroStats />
          </Reveal>
          
          {/* Vision 2030 alignment note */}
          <Reveal delay={1.5}>
            <GlassCard 
              variant="subtle" 
              className="mt-12 mb-8 max-w-2xl mx-auto p-4"
              whileHover={animationsEnabled ? { y: -3 } : {}}
            >
              <div className="flex items-center">
                <Sparkles size={18} className="text-moh-gold mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-moh-darkGreen">Ministry of Health Innovation Platform</span> is aligned with Saudi Vision 2030's healthcare transformation goals, empowering digital health initiatives and fostering innovation across the healthcare ecosystem.
                </p>
              </div>
            </GlassCard>
          </Reveal>
          
          {/* Enhanced scroll indicator with animation */}
          <Reveal delay={1.7}>
            <motion.div 
              className="mt-16 cursor-pointer"
              onClick={scrollToNextSection}
              animate={animationsEnabled ? { 
                y: [0, 8, 0], 
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ 
                y: { duration: 1.5, repeat: Infinity },
                opacity: { duration: 1.5, repeat: Infinity }
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-moh-green/80 font-medium mb-1">Discover Platform Features</span>
                <div className="relative">
                  <ChevronDown className="text-moh-green/80 h-8 w-8" />
                  {animationsEnabled && (
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
                      <ChevronDown className="text-moh-green/40 h-8 w-8" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
      
      {animationsEnabled && <HeroDecorations />}
    </motion.section>
  );
}
