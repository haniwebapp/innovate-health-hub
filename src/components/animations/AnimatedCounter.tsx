
import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  scaleDuration?: boolean;
  importance?: 'low' | 'medium' | 'high';
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2,
  delay = 0,
  scaleDuration = false,
  importance = 'medium'
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (!hasAnimated) {
      setTimeout(() => {
        // Adjust duration based on value or importance if scaleDuration is true
        let animationDuration = duration;
        if (scaleDuration) {
          if (value > 1000) {
            animationDuration = duration * 1.5;
          } else if (value < 10) {
            animationDuration = duration * 0.5;
          }
          
          // Further adjust based on importance
          if (importance === 'high') {
            animationDuration *= 0.8; // Faster for high importance
          } else if (importance === 'low') {
            animationDuration *= 1.2; // Slower for low importance
          }
        }
        
        animate(count, value, { duration: animationDuration, delay: 0 });
        setHasAnimated(true);
      }, delay * 1000);
    }
  }, [count, value, duration, delay, hasAnimated, scaleDuration, importance]);
  
  return (
    <div className="flex items-center">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  );
}
