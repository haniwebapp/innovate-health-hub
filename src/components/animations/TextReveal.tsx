
import { motion } from "framer-motion";
import React from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "chars" | "words";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "chars"
}: TextRevealProps) {
  // Split text either by characters or words
  const items = splitBy === "chars" 
    ? text.split("")
    : text.split(" ");
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay,
      },
    }),
  };
  
  const child = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };
  
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: splitBy === "chars" ? "inline-block" : "inline-block",
            marginRight: splitBy === "chars" ? "0" : "0.3em",
          }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
