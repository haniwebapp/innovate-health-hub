
import { motion } from "framer-motion";

export const HeroDecorations = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
      <motion.div 
        className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-moh-lightGreen rounded-full opacity-30 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      
      <motion.div 
        className="hidden md:block absolute -top-16 -left-16 w-48 h-48 bg-moh-lightGold rounded-full opacity-30 blur-xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      
      <motion.div 
        className="hidden lg:block absolute top-1/4 right-16 w-24 h-24 bg-moh-gold rounded-full opacity-20 blur-md"
        animate={{
          x: [0, 10, 0, -10, 0],
          y: [0, 15, 0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      ></motion.div>
      
      <motion.div 
        className="hidden lg:block absolute bottom-1/4 left-16 w-24 h-24 bg-moh-green rounded-full opacity-20 blur-md"
        animate={{
          x: [0, -15, 0, 15, 0],
          y: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      ></motion.div>
    </>
  );
};
