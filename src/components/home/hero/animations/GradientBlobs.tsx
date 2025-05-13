
import { motion } from "framer-motion";

export function GradientBlobs() {
  return (
    <>
      {/* Main gradient blobs with enhanced animation */}
      <motion.div 
        className="hidden md:block absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-moh-lightGreen via-moh-green to-moh-darkGreen rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.2, 1.1, 1], 
          opacity: [0.2, 0.25, 0.23, 0.2],
          x: [0, -10, -5, 0],
          y: [0, 10, 5, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="hidden md:block absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-moh-lightGold via-moh-gold to-moh-darkGold rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.15, 0.95, 1], 
          opacity: [0.2, 0.25, 0.18, 0.2],
          x: [0, 10, 15, 0],
          y: [0, -10, -5, 0],
          rotate: [0, -5, 10, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* New interactive blob */}
      <motion.div 
        className="hidden lg:block absolute top-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-moh-green/20 to-moh-gold/20 rounded-full opacity-10 blur-lg" 
        animate={{ 
          scale: [1, 1.3, 0.9, 1.1, 1], 
          opacity: [0.1, 0.2, 0.15, 0.18, 0.1],
          x: [-20, 20, 0, -10, -20],
          y: [0, 30, 15, -15, 0],
          borderRadius: ["50%", "60% 40% 70% 30%", "40% 60% 30% 70%", "50% 50% 50% 50%", "50%"]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          repeatType: "loop"
        }}
      />
    </>
  );
}
