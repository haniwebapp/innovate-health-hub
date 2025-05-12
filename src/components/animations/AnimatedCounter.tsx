
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

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
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        onUpdate: (value) => {
          setDisplayValue(Math.floor(value));
        },
      });
      
      return () => controls.stop();
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [value, duration, delay]);
  
  return (
    <span>
      {displayValue}
      <span>{suffix}</span>
    </span>
  );
}
