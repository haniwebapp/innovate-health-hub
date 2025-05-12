
import { motion } from "framer-motion";
import React from "react";

export function PulseCircles() {
  return (
    <>
      {/* Animated glowing circles - more visible */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 border-moh-green/20"
          style={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{ width: 50, height: 50, opacity: 0 }}
          animate={{ 
            width: [50, 600],
            height: [50, 600],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );
}
