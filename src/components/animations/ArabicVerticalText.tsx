
import React from "react";
import { motion } from "framer-motion";

interface ArabicVerticalTextProps {
  text: string;
  className?: string;
}

export function ArabicVerticalText({ text, className = "" }: ArabicVerticalTextProps) {
  return (
    <div className={`relative ${className}`}>
      {text.split("").map((char, i) => (
        <motion.div
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="mb-1"
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
}
