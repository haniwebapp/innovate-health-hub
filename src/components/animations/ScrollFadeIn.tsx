
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.5
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // Define initial position based on direction
  const initialPosition = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialPosition[direction]}
      animate={inView ? { y: 0, x: 0, opacity: 1 } : {}}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1] // easeOutCubic
      }}
    >
      {children}
    </motion.div>
  );
}
