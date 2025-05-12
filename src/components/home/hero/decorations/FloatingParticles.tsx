
import { motion } from "framer-motion";
import React from "react";

export function FloatingParticles() {
  // Generate a set of random positions for animated elements
  const generateRandomPositions = (count: number, areaSize: { width: number, height: number }) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * areaSize.width,
      y: Math.random() * areaSize.height,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 10 + 5
    }));
  };

  // Background particles
  const particles = generateRandomPositions(15, { width: 100, height: 100 });
  
  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-moh-green"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
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
