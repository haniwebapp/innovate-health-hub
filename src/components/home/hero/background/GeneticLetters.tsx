
import { motion } from "framer-motion";
import React from "react";

export function GeneticLetters() {
  // DNA genetic code letters
  const geneticLetters = ['A', 'T', 'G', 'C'];
  
  // Generate genetic code particles
  const geneticParticles = Array.from({ length: 25 }, (_, i) => ({
    letter: geneticLetters[Math.floor(Math.random() * geneticLetters.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.2 // Increased opacity for better visibility
  }));

  return (
    <>
      {geneticParticles.map((particle, index) => (
        <motion.div
          key={`genetic-${index}`}
          className="absolute font-mono font-bold"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            color: index % 2 === 0 ? 'rgba(0, 129, 74, 0.6)' : 'rgba(195, 168, 107, 0.6)', // Alternating colors with higher opacity
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.1, 1],
            rotate: [0, index % 2 === 0 ? 5 : -5, 0], // Slight rotation for more dynamism
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.letter}
        </motion.div>
      ))}
    </>
  );
}
