
import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <>
      {/* Secondary floating orbs */}
      <motion.div 
        className="hidden lg:block absolute top-1/3 right-16 w-24 h-24 bg-moh-gold rounded-full opacity-10 blur-md" 
        animate={{ 
          x: [0, 15, 0, -15, 0], 
          y: [0, -10, -20, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <motion.div 
        className="hidden lg:block absolute bottom-1/3 left-16 w-32 h-32 bg-moh-green rounded-full opacity-10 blur-md" 
        animate={{ 
          x: [0, -20, 0, 20, 0], 
          y: [0, 15, 30, 15, 0],
          scale: [1, 1.1, 1.2, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
    </>
  );
}
