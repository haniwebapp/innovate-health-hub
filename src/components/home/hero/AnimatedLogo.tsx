
import { motion } from "framer-motion";

export const AnimatedLogo = () => {
  return (
    <motion.div 
      className="w-28 h-28 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }}
    >
      <motion.div 
        className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <img alt="MOH Innovation Logo" className="w-18 h-18 object-contain" src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" />
      </motion.div>
    </motion.div>
  );
};
