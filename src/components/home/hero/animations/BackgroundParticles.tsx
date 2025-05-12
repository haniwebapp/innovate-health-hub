
import { motion } from "framer-motion";
import { useMemo } from "react";

export function BackgroundParticles() {
  // Generate a set of random positions for animated elements
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 10 + 5
    }));
  }, []);

  return (
    <>
      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-moh-green hidden lg:block"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}
