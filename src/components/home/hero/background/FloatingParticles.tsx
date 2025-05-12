
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Generate random particles with higher visibility
    const colors = [
      'rgba(0, 129, 74, 0.3)',    // moh-green with increased opacity
      'rgba(195, 168, 107, 0.3)',  // moh-gold with increased opacity
      'rgba(0, 107, 62, 0.25)',    // moh-darkGreen with increased opacity
      'rgba(163, 138, 86, 0.25)',  // moh-darkGold with increased opacity
    ];
    
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10, // Larger particles
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [
              0,
              Math.random() * 120 - 60,
              Math.random() * 120 - 60,
              0
            ],
            y: [
              0,
              Math.random() * 120 - 60,
              Math.random() * 120 - 60, 
              0
            ],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.3, 0.9, 0.5, 0.3] // Increased opacity for better visibility
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}
