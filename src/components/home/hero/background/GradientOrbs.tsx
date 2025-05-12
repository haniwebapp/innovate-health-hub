
import { motion } from "framer-motion";
import React from "react";

export function GradientOrbs() {
  return (
    <>
      {/* Enhanced gradient orbs with more vibrant colors */}
      <motion.div
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-gradient-to-br from-moh-lightGreen to-moh-green/30 opacity-30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] bg-gradient-to-tl from-moh-lightGold to-moh-gold/30 opacity-30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
    </>
  );
}
