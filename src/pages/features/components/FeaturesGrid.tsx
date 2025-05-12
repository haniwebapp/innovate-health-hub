
import React from "react";
import { motion } from "framer-motion";
import { features } from "@/components/home/platform-highlights/features";
import { FeatureCard } from "./FeatureCard";

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

export function FeaturesGrid() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { 
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1
          }
        }
      }}
    >
      {features.map((feature) => (
        <motion.div 
          key={feature.title} 
          variants={itemVariants}
          className="h-full"
        >
          <FeatureCard feature={feature} />
        </motion.div>
      ))}
    </motion.div>
  );
}
