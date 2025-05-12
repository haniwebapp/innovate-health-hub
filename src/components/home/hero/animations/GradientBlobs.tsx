
import { motion } from "framer-motion";

export function GradientBlobs() {
  return (
    <>
      {/* Main gradient blobs */}
      <motion.div 
        className="hidden md:block absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-moh-lightGreen via-moh-green to-moh-darkGreen rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.2, 0.25, 0.2],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="hidden md:block absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-moh-lightGold via-moh-gold to-moh-darkGold rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.2, 0.25, 0.2],
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
    </>
  );
}
