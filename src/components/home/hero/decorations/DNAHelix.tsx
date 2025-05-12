
import { motion } from "framer-motion";
import React from "react";

export function DNAHelix() {
  return (
    <svg className="absolute top-1/4 left-1/5 w-16 h-32 lg:block" viewBox="0 0 60 120">
      <motion.path
        d="M30,10 C45,20 15,40 30,50 C45,60 15,80 30,90 C45,100 15,120 30,130"
        fill="none"
        stroke="rgba(0, 129, 74, 0.4)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M30,10 C15,20 45,40 30,50 C15,60 45,80 30,90 C15,100 45,120 30,130"
        fill="none"
        stroke="rgba(195, 168, 107, 0.4)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      
      {/* DNA Connectors */}
      {[20, 40, 60, 80, 100].map((y, i) => (
        <motion.line
          key={`dna-connector-${i}`}
          x1="20"
          y1={y}
          x2="40"
          y2={y}
          stroke={i % 2 === 0 ? "rgba(0, 129, 74, 0.4)" : "rgba(195, 168, 107, 0.4)"}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 1 }}
        />
      ))}
    </svg>
  );
}
