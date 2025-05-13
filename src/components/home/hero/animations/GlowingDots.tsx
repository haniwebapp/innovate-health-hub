
import { motion } from "framer-motion";
import { useMemo } from "react";

interface GlowingDotsProps {
  intensity?: "low" | "normal" | "high";
}

export function GlowingDots({ intensity = "normal" }: GlowingDotsProps) {
  // Determine number of dots based on intensity
  const dotCount = intensity === "low" ? 5 : intensity === "normal" ? 10 : 15;
  
  // Generate random dots with memoization
  const dots = useMemo(() => {
    return Array.from({ length: dotCount }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 3,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      color: Math.random() > 0.5 ? "moh-green" : "moh-gold",
    }));
  }, [dotCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full bg-${dot.color}/20`}
          style={{
            top: dot.y,
            left: dot.x,
            width: dot.size,
            height: dot.size,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.size}px rgba(${
              dot.color === "moh-green" ? "0, 129, 74" : "195, 168, 107"
            }, 0.3)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: dot.duration,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
