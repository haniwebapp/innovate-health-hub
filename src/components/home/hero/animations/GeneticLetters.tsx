
import { motion } from "framer-motion";
import { useMemo } from "react";

export function GeneticLetters() {
  // DNA genetic code letters
  const geneticLetters = ['A', 'T', 'G', 'C'];
  
  // Generate genetic code particles
  const geneticParticles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      letter: geneticLetters[Math.floor(Math.random() * geneticLetters.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, []);

  return (
    <>
      {geneticParticles.map((particle, index) => (
        <motion.div
          key={`genetic-${index}`}
          className="absolute font-mono font-bold text-moh-green/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.1, 1],
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
