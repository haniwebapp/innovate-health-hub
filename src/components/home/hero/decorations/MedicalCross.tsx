
import { motion } from "framer-motion";
import React from "react";

export function MedicalCross() {
  return (
    <div className="absolute bottom-1/4 left-1/6 lg:block">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute top-0 left-4 h-12 w-4 bg-moh-gold/40 rounded-sm"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-4 left-0 h-4 w-12 bg-moh-gold/40 rounded-sm"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cross-pulse-${i}`}
            className="absolute rounded-sm"
            style={{
              top: 0,
              left: 0,
              width: 12,
              height: 12,
            }}
            animate={{ 
              width: [12, 36],
              height: [12, 36],
              x: [-6, -18],
              y: [-6, -18],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
