
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroLogo() {
  const { t } = useLanguage();
  
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
        
        {/* Use the uploaded logo image */}
        <motion.div
          className="w-16 h-16 relative flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img 
            src="/lovable-uploads/fc6609f7-b2c9-4eb5-8a3a-6baa876025c7.png" 
            alt="MOH Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
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
    </motion.div>
  );
}
