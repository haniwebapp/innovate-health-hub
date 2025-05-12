
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  importance?: "low" | "medium" | "high";
  scaleDuration?: boolean;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
  delay = 0,
  importance = "medium",
  scaleDuration = false
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Optionally scale duration based on value size
      const finalDuration = scaleDuration ? Math.min(Math.max(duration * (value / 100), 1), 4) : duration;
      
      const controls = animate(0, value, {
        duration: finalDuration,
        onUpdate: (value) => {
          setDisplayValue(Math.floor(value));
        },
        ease: "easeOut"
      });
      
      return () => controls.stop();
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [value, duration, delay, scaleDuration]);
  
  const importanceClasses = {
    low: "text-xl md:text-2xl font-medium",
    medium: "text-2xl md:text-3xl font-semibold",
    high: "text-3xl md:text-5xl font-bold text-moh-darkGreen"
  };
  
  return (
    <span className={cn("font-playfair transition-all", importanceClasses[importance])}>
      <span className="tabular-nums">{displayValue.toLocaleString()}</span>
      <span className="ml-1 text-moh-gold">{suffix}</span>
    </span>
  );
}
