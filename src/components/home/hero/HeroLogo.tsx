
import { motion } from "framer-motion";

export function HeroLogo() {
  return (
    <motion.div 
      className="mb-6 flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.3 
      }}
    >
      <div className="relative">
        <motion.div 
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-moh-green/20 to-moh-gold/20 blur-md"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <img 
          src="/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
          alt="MOH Innovation Platform" 
          className="h-20 w-20 object-contain relative z-10" 
        />
      </div>
    </motion.div>
  );
}
