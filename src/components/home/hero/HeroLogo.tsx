
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function HeroLogo() {
  const { t } = useLanguage();
  const [hasLoaded, setHasLoaded] = useState(false);
  
  useEffect(() => {
    // Mark the logo as loaded after a short delay to trigger animations
    const timer = setTimeout(() => setHasLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="w-32 h-32 mx-auto mb-8 bg-white/80 rounded-full shadow-xl flex items-center justify-center overflow-hidden relative" 
      initial={{ y: -100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.2 
      }}
    >
      {/* Glass effect outer ring with subtle glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm"
        animate={{ 
          boxShadow: ["0 0 15px 5px rgba(255, 255, 255, 0.3)", "0 0 25px 10px rgba(255, 255, 255, 0.5)", "0 0 15px 5px rgba(255, 255, 255, 0.3)"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Enhanced orbital rings with improved animations */}
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
      
      {/* Additional diagonal orbit */}
      <motion.div 
        className="absolute w-full h-full rounded-full border border-moh-green/20"
        style={{ transform: "rotate(120deg)" }}
        animate={{ rotate: "480deg" }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-moh-gold/80 rounded-full"
          animate={{ 
            boxShadow: ["0 0 3px 1px rgba(195, 168, 107, 0.3)", "0 0 8px 4px rgba(195, 168, 107, 0.6)", "0 0 3px 1px rgba(195, 168, 107, 0.3)"] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* MOH Logo - Main Circle with Palm Tree and Infinity Symbol */}
      <motion.div 
        className="w-24 h-24 bg-moh-green rounded-full flex items-center justify-center relative z-10"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 4, 
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
        
        {/* Animated logo container */}
        <motion.div
          className="w-16 h-16 relative flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotateY: [0, 10, 0, -10, 0],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            },
            rotateY: {
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
        >
          {/* Logo base with shimmer effect */}
          <div className="w-full h-full relative">
            <img 
              src="/lovable-uploads/fc6609f7-b2c9-4eb5-8a3a-6baa876025c7.png" 
              alt="MOH Logo" 
              className="w-full h-full object-contain"
            />
            
            {/* Animated shimmer overlay */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 50%)",
                  "linear-gradient(45deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 80%)"
                ],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4
              }}
            />
            
            {/* Palm tree highlight animation */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: hasLoaded ? [0, 0.7, 0] : 0 }}
              transition={{
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 5,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-4 h-8 bg-white/30 rounded-full blur-sm" />
              </div>
            </motion.div>
            
            {/* Infinity symbol glow animation */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: hasLoaded ? [0, 0.7, 0] : 0 }}
              transition={{
                duration: 2.5, 
                repeat: Infinity, 
                repeatDelay: 4,
                delay: 2
              }}
            >
              <div className="w-10 h-3 bg-white/30 rounded-full blur-md transform translate-y-2" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced sparkle effects */}
      {[...Array(12)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
          initial={{ 
            x: (Math.random() - 0.5) * 60, 
            y: (Math.random() - 0.5) * 60,
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: i * 0.6, 
            repeatDelay: Math.random() * 4
          }}
        />
      ))}
      
      {/* Sparkles icon animations */}
      <motion.div
        className="absolute -top-3 -right-1"
        animate={{
          y: [-2, 2, -2],
          rotate: [0, 10, 0, -10, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="text-moh-gold/60 w-4 h-4" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-2 -left-1"
        animate={{
          y: [2, -2, 2],
          rotate: [0, -10, 0, 10, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="text-moh-green/60 w-3 h-3" />
      </motion.div>
      
      {/* Pulse rings */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute rounded-full border border-moh-green/10"
            initial={{ 
              width: 50, 
              height: 50, 
              opacity: 0.8,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ 
              width: [50, 200], 
              height: [50, 200], 
              opacity: [0.3, 0],
              x: "-50%",
              y: "-50%",
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
