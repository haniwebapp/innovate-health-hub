
import { motion } from "framer-motion";
import { useMemo } from "react";

export function GlowingDots() {
  const dots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
      color: i % 2 === 0 ? "#00814A" : "#C3A86B"
    }));
  }, []);

  return (
    <>
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full mix-blend-screen filter blur-sm"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.size / 2}px ${dot.color}`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
          }}
        />
      ))}
    </>
  );
}
