
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroContent } from "./hero/HeroContent";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroVisual } from "./hero/HeroVisual";
import { WaveDivider } from "@/components/animations/WaveDivider";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-b from-moh-green via-[#076b3e] to-[#065832] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Modern gradient background with subtle animations */}
      <HeroBackground />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 h-[85vh] lg:min-h-[650px] items-center">
          {/* Content side */}
          <motion.div 
            style={{ opacity, scale }}
            className="flex flex-col justify-center"
          >
            <HeroContent />
          </motion.div>
          
          {/* Visual side */}
          <motion.div 
            style={{ opacity, scale }}
            className="hidden lg:flex lg:justify-end items-center mt-8 lg:mt-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
      
      {/* Modern scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById('platform-highlights');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm text-gray-300 font-medium mb-2">Explore Platform</span>
          <motion.div
            className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <WaveDivider color="#ffffff" />
      </div>
    </motion.section>
  );
}
