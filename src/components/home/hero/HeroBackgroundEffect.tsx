
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroBackgroundEffect() {
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
    // Generate random particles
    const colors = ['#00814A20', '#C3A86B20', '#00814A15', '#C3A86B15'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
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
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            y: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50, 
              0
            ],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.7, 0.5, 0.3]
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

      {/* Main gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-moh-lightGreen opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-[25rem] h-[25rem] bg-moh-lightGold opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
      
      {/* Network lines effect */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.07]">
        <defs>
          <pattern
            id="network-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 25L25 0M25 50L50 25M50 25L25 50M25 0L0 25"
              fill="none"
              stroke="#00814A"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-pattern)" />
      </svg>
    </div>
  );
}
