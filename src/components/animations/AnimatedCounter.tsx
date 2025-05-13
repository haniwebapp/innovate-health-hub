
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  decimals?: number;
}

export function AnimatedCounter({ 
  value, 
  className = "", 
  duration = 2, 
  decimals = 0 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  
  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animateValue = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: cubic-bezier(0.17, 0.67, 0.83, 0.67)
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        const currentValue = Math.floor(easeProgress * value);
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animateValue);
        } else {
          setDisplayValue(value); // Ensure final value is exact
        }
      };
      
      requestAnimationFrame(animateValue);
    }
  }, [inView, value, duration]);
  
  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : displayValue.toString();
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formattedValue}
    </motion.span>
  );
}
