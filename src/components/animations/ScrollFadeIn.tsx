
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}

export function ScrollFadeIn({ 
  children, 
  delay = 0, 
  threshold = 0.2,
  className = ""
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
