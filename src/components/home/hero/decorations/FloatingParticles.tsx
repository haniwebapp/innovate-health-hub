
import { motion } from "framer-motion";
import { useRandomPositions } from "../hooks/useRandomPositions";

export function FloatingParticles() {
  // Generate a set of random positions for animated particles
  const particles = useRandomPositions(12, { width: 100, height: 100 });
  
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
