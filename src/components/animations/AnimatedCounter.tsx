
import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2,
  delay = 0
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (!hasAnimated) {
      setTimeout(() => {
        animate(count, value, { duration, delay: 0 });
        setHasAnimated(true);
      }, delay * 1000);
    }
  }, [count, value, duration, delay, hasAnimated]);
  
  return (
    <div className="flex items-center">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  );
}
