
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Lottie from "lottie-react";
import healthInnovationAnim from "@/assets/animations/health-innovation-anim.json";

export function HeroLogo() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="w-32 h-32 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden relative" 
      initial={{ y: -100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.2 
      }}
    >
      {/* Orbital rings with enhanced animations */}
      <motion.div 
        className="absolute w-full h-full rounded-full border-2 border-moh-green/30"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-moh-gold rounded-full"
          animate={{ 
            boxShadow: ["0 0 5px 2px rgba(195, 168, 107, 0.4)", "0 0 12px 6px rgba(195, 168, 107, 0.7)", "0 0 5px 2px rgba(195, 168, 107, 0.4)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute w-full h-full rounded-full border border-moh-gold/40"
        style={{ transform: "rotate(45deg)" }}
        animate={{ rotate: "-315deg" }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-moh-green rounded-full"
          animate={{ 
            boxShadow: ["0 0 5px 2px rgba(0, 129, 74, 0.4)", "0 0 12px 6px rgba(0, 129, 74, 0.7)", "0 0 5px 2px rgba(0, 129, 74, 0.4)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Central logo container with enhanced animation */}
      <motion.div 
        className="w-24 h-24 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center relative"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      >
        {/* Enhanced pulsing glow effect */}
        <motion.div 
          className="absolute inset-0 bg-moh-green rounded-full blur-md"
          animate={{ 
            opacity: [0.3, 0.7, 0.3], 
            scale: [0.8, 1.2, 0.8] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        />
        
        {/* Use Lottie animation instead of static image */}
        <div className="w-20 h-20 relative z-10">
          <Lottie 
            animationData={healthInnovationAnim}
            loop={true}
            autoplay={true}
          />
        </div>
      </motion.div>
      
      {/* Enhanced sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 80 - 40, 
            y: Math.random() * 80 - 40,
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: i * 0.8, 
            repeatDelay: Math.random() * 3
          }}
        />
      ))}
      
      {/* DNA helix animation in the background */}
      <motion.div 
        className="absolute inset-0 opacity-20 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "url('/dna-pattern.svg')",
          backgroundSize: "200%"
        }}
      />
    </motion.div>
  );
}
