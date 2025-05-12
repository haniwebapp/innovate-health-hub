
import { motion } from "framer-motion";
import React from "react";

export function MedicalCrossEffect() {
  return (
    <div className="absolute right-[25%] top-[35%]">
      <motion.div
        className="relative"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="absolute w-8 h-24 bg-moh-gold/40 rounded-md"
          style={{ left: '8px', top: '-8px' }}
        />
        <motion.div 
          className="absolute w-24 h-8 bg-moh-gold/40 rounded-md"
          style={{ left: '-8px', top: '8px' }}
        />
        
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cross-pulse-${i}`}
            className="absolute rounded-md border-2 border-moh-gold/20"
            style={{
              width: 40,
              height: 40,
              left: 0,
              top: 0,
            }}
            animate={{ 
              width: [40, 100],
              height: [40, 100],
              x: [-20, -50],
              y: [-20, -50],
              opacity: [0.4, 0],
              borderRadius: ['0.375rem', '1rem'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
