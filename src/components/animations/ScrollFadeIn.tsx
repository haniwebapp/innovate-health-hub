
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollFadeIn({ 
  children, 
  delay = 0, 
  threshold = 0.2,
  className = "",
  direction = "up"
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const getInitialPosition = () => {
    switch(direction) {
      case "down": return { opacity: 0, y: -20 };
      case "left": return { opacity: 0, x: 20 };
      case "right": return { opacity: 0, x: -20 };
      case "up":
      default: return { opacity: 0, y: 20 };
    }
  };

  const variants = {
    hidden: getInitialPosition(),
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
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
