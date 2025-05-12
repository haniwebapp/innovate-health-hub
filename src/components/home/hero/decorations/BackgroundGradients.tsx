
import { motion } from "framer-motion";

export function BackgroundGradients() {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
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
