
import { motion } from "framer-motion";
import React from "react";
import { Sparkles } from "lucide-react";

export function SparkleEffects() {
  return (
    <>
      {/* Sparkle icon animations */}
      <motion.div
        className="absolute top-1/4 left-1/5 lg:block"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.8, 1, 0.8],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="text-moh-gold/60 w-8 h-8" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/5 lg:block"
        animate={{
          y: [10, -10, 10],
          opacity: [0.8, 1, 0.8],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <Sparkles className="text-moh-green/60 w-8 h-8" />
      </motion.div>
    </>
  );
}
