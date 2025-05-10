
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Lottie from "lottie-react";
import healthInnovationAnim from "@/assets/animations/health-innovation-anim.json";

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

      {/* MOH Logo - Main Circle with Palm Tree and Symbol */}
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
        
        {/* MOH Logo Symbol */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-16 h-16 fill-white"
        >
          {/* Palm Tree */}
          <motion.path 
            d="M50,20 C50,20 45,25 45,30 C45,35 50,38 50,45 C50,38 55,35 55,30 C55,25 50,20 50,20 Z" 
            animate={{ y: [0, -1, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Infinity/Medical Symbol */}
          <motion.path 
            d="M35,55 C35,50 40,48 45,48 C50,48 55,50 55,55 C55,60 50,62 45,62 C40,62 35,60 35,55 Z M65,55 C65,50 60,48 55,48 C50,48 45,50 45,55 C45,60 50,62 55,62 C60,62 65,60 65,55 Z"
            fillRule="evenodd"
            strokeWidth="2"
            stroke="white"
            fill="none"
            animate={{ 
              strokeDashoffset: [0, -30],
              strokeDasharray: 100
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* "2030" Text */}
          <motion.text 
            x="50" 
            y="75" 
            textAnchor="middle" 
            className="text-xs font-bold"
            fill="white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            2030
          </motion.text>
        </svg>
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
