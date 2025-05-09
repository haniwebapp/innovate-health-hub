
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2, 
  delay = 0,
  className = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationId: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      // Use easeOutExpo for smoother counting at the end
      const easeOutExpo = 1 - Math.pow(2, -10 * progressRatio);
      const currentCount = Math.floor(easeOutExpo * value);
      
      setCount(currentCount);
      
      if (progressRatio < 1) {
        animationId = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };
    
    // Delay the start of the animation
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(updateCount);
    }, delay * 1000);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [inView, value, duration, delay]);
  
  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
}
