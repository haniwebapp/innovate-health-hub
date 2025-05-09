
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroLogo() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="w-28 h-28 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden" 
      initial={{ y: -100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.2 
      }}
    >
      <motion.div 
        className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center relative"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-moh-green rounded-full blur-md"
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [0.8, 1.1, 0.8] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        />
        
        <img 
          alt={t('home.hero.logoAlt') || "MOH Innovation Logo"} 
          className="w-16 h-16 object-contain relative z-10" 
          src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" 
        />
      </motion.div>
      
      {/* Orbit effect */}
      <motion.div 
        className="absolute w-full h-full rounded-full border-2 border-moh-green/20"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-moh-gold rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
