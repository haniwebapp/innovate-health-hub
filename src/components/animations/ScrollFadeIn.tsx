
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  amount?: number;
  className?: string;
}

export function ScrollFadeIn({
  children,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
  className = ""
}: ScrollFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  
  // Set initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { y: 40, opacity: 0 };
      case "down":
        return { y: -40, opacity: 0 };
      case "left":
        return { x: 40, opacity: 0 };
      case "right":
        return { x: -40, opacity: 0 };
      default:
        return { y: 40, opacity: 0 };
    }
  };
  
  // Set animation values
  const initialValues = getInitialValues();
  const animateValues = direction === "up" || direction === "down" 
    ? { y: 0, opacity: 1 } 
    : { x: 0, opacity: 1 };
    
  return (
    <motion.div
      ref={ref}
      initial={initialValues}
      animate={isInView ? animateValues : initialValues}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
