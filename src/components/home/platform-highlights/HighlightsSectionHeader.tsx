
import React from "react";
import { motion } from "framer-motion";

export function HighlightsSectionHeader() {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
        Platform Features
      </span>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
        Advancing Healthcare Innovation
      </h2>
      
      <p className="max-w-2xl mx-auto text-gray-700">
        Our platform provides comprehensive tools and resources to support healthcare innovations from concept to implementation.
      </p>
    </motion.div>
  );
}
