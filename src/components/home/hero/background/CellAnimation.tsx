
import { motion } from "framer-motion";
import React from "react";

export function CellAnimation() {
  return (
    <div className="absolute left-[30%] top-[45%]">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-16 h-16 rounded-full border-4 border-moh-green/40"
          animate={{ 
            scale: [1, 1.5, 2, 0],
            opacity: [0.8, 0.6, 0.4, 0] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatDelay: 1,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-moh-green/30"
          animate={{ 
            x: [0, 30],
            y: [0, -30],
            scale: [0, 1],
            opacity: [0, 0.7]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatDelay: 1,
            ease: "easeOut"
          }}
        />
        
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-moh-green/30"
          animate={{ 
            x: [0, -30],
            y: [0, 30],
            scale: [0, 1],
            opacity: [0, 0.7]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatDelay: 1,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </div>
  );
}
