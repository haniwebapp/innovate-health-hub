import { motion } from "framer-motion";
import React from "react";
interface ArabicVerticalTextProps {
  text: string;
  className?: string;
  delay?: number;
}
export function ArabicVerticalText({
  text,
  className = "",
  delay = 0
}: ArabicVerticalTextProps) {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  return <motion.div className={`flex flex-col ${className}`} variants={containerVariants} initial="hidden" animate="visible">
      {text.split("").map((char, index) => {})}
    </motion.div>;
}