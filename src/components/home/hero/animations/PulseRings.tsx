
import { motion } from "framer-motion";

export function AnimatedPulseRings() {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-moh-green/5"
          initial={{ 
            width: 50, 
            height: 50, 
            opacity: 0.8,
            x: "-50%",
            y: "-50%",
          }}
          animate={{ 
            width: [50, 300], 
            height: [50, 300], 
            opacity: [0.3, 0],
            x: "-50%",
            y: "-50%",
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity, 
            delay: i * 1.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
