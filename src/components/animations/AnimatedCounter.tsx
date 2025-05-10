
import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

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
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            setTimeout(() => {
              animate(0, value, {
                duration,
                onUpdate: (latest) => {
                  setDisplayValue(latest);
                },
                ease: "easeOut"
              });
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current);
      }
    };
  }, [value, duration, delay]);

  // Format the display value
  let formattedValue: string;
  if (Number.isInteger(value)) {
    formattedValue = Math.round(displayValue).toString();
  } else {
    formattedValue = displayValue.toFixed(1);
  }

  return (
    <span ref={nodeRef} className="tabular-nums">
      {formattedValue}{suffix}
    </span>
  );
}
