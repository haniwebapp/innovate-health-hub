
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  decimals?: number;
  suffix?: string;
  delay?: number;
  scaleDuration?: boolean;
  importance?: 'low' | 'medium' | 'high';
}

export function AnimatedCounter({ 
  value, 
  className = "", 
  duration = 2,
  delay = 0,
  decimals = 0,
  suffix = "",
  scaleDuration = false,
  importance
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  
  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      
      // Adjust duration based on importance or value size if scaleDuration is true
      let finalDuration = duration;
      if (scaleDuration) {
        if (importance === 'high') {
          finalDuration = Math.min(duration * 1.5, 4);
        } else if (importance === 'low') {
          finalDuration = Math.max(duration * 0.6, 1);
        }
        
        // Scale by value size as well (larger numbers animate longer)
        const valueScale = Math.log10(Math.max(value, 10)) / 2;
        finalDuration = finalDuration * valueScale;
      }
      
      const animateValue = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (finalDuration * 1000), 1);
        
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
      
      // Use setTimeout to respect the delay prop
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animateValue);
      }, delay * 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [inView, value, duration, delay, importance, scaleDuration]);
  
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
      {formattedValue}{suffix}
    </motion.span>
  );
}
