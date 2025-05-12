
import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

export function FeaturesHero() {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-moh-darkGreen to-moh-green"
        variants={itemVariants}
      >
        Platform Features
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 mb-8"
        variants={itemVariants}
      >
        Discover all the innovative tools and capabilities our healthcare innovation platform offers to accelerate your journey.
      </motion.p>
    </div>
  );
}
