
import { motion } from "framer-motion";
import React from "react";

export function PulseRings() {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-moh-green/30"
          initial={{ 
            width: 50, 
            height: 50, 
            opacity: 0.7,
            x: "-50%",
            y: "-50%",
          }}
          animate={{ 
            width: [50, 400], 
            height: [50, 400], 
            opacity: [0.6, 0],
            x: "-50%",
            y: "-50%",
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity, 
            delay: i * 1.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
