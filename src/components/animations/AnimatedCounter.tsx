
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  scaleDuration?: boolean;
  importance?: 'low' | 'medium' | 'high';
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2, 
  delay = 0,
  className = "",
  scaleDuration = true,
  importance = 'medium'
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Scale duration based on value size
  const scaledDuration = scaleDuration ? 
    Math.max(1, Math.min(3, duration * (Math.log10(value + 1) / 2))) : 
    duration;
  
  // Scale delay based on importance
  const importanceDelayFactor = {
    'low': 0.5,
    'medium': 1,
    'high': 0.3,  // High importance shows earlier
  }[importance];
  
  const effectiveDelay = delay * importanceDelayFactor;
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationId: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (scaledDuration * 1000), 1);
      
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
    }, effectiveDelay * 1000);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [inView, value, scaledDuration, effectiveDelay]);
  
  // Add data-driven animation effects based on value size
  const getValueScale = () => {
    if (value >= 1000) return 1.2;
    if (value >= 500) return 1.15;
    if (value >= 100) return 1.1;
    return 1.05;
  };
  
  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5, delay: effectiveDelay * 0.5 }
      } : {}}
      whileHover={{ 
        scale: getValueScale(),
        transition: { duration: 0.2 }
      }}
    >
      {count}{suffix}
    </motion.span>
  );
}
