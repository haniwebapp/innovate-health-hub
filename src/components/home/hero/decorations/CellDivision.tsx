
import { motion } from "framer-motion";
import React from "react";

export function CellDivision() {
  return (
    <div className="absolute top-2/3 left-1/4 lg:block">
      <motion.div
        className="relative w-12 h-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-moh-green/50"
          animate={{ 
            scale: [1, 0.5, 0.5, 1],
            x: [0, -15, -15, 0],
            y: [0, -15, -15, 0]
          }}
          transition={{ 
            duration: 8, 
            times: [0, 0.4, 0.6, 1],
            repeat: Infinity
          }}
        />
        
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-moh-green/50"
          animate={{ 
            scale: [1, 0.5, 0.5, 1],
            x: [0, 15, 15, 0],
            y: [0, 15, 15, 0]
          }}
          transition={{ 
            duration: 8, 
            times: [0, 0.4, 0.6, 1],
            repeat: Infinity
          }}
        />
      </motion.div>
    </div>
  );
}
