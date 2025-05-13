
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
    shape: "circle" | "triangle" | "square" | "diamond";
    pattern: number;
  }>>([]);

  useEffect(() => {
    // Generate random particles
    const colors = [
      'rgba(0, 129, 74, 0.15)',   // moh-green
      'rgba(195, 168, 107, 0.15)', // moh-gold
      'rgba(0, 107, 62, 0.1)',    // moh-darkGreen
      'rgba(163, 138, 86, 0.1)',   // moh-darkGold
      'rgba(232, 245, 240, 0.2)',  // moh-lightGreen
      'rgba(240, 234, 214, 0.2)',  // moh-lightGold
    ];
    
    const shapes = ["circle", "triangle", "square", "diamond"];
    
    const newParticles = Array.from({ length: 50 }, (_, i) => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)] as "circle" | "triangle" | "square" | "diamond";
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 35 + 5,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        pattern: Math.floor(Math.random() * 4)
      };
    });
    
    setParticles(newParticles);
  }, []);

  const getShapeClass = (shape: string) => {
    switch (shape) {
      case "circle": return "rounded-full";
      case "triangle": return "clip-path-triangle";
      case "square": return "rounded-none";
      case "diamond": return "rotate-45";
      default: return "rounded-full";
    }
  };

  return (
    <>
      {particles.map((particle) => {
        const shapeClass = getShapeClass(particle.shape);
        
        return (
          <motion.div
            key={particle.id}
            className={`absolute ${shapeClass} backdrop-blur-sm`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              border: particle.pattern === 1 ? `1px solid ${particle.color}` : "none",
              backgroundImage: particle.pattern === 2 ? 
                `radial-gradient(circle at center, ${particle.color} 0%, transparent 70%)` : 
                particle.pattern === 3 ? 
                `linear-gradient(45deg, ${particle.color} 0%, transparent 100%)` : 
                "none",
            }}
            animate={{
              x: particle.pattern % 2 === 0 ?
                [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0] :
                [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
              y: particle.pattern % 2 === 0 ?
                [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0] :
                [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
              scale: [1, particle.pattern === 3 ? 1.5 : 1.2, particle.pattern === 1 ? 0.8 : 0.9, 1],
              opacity: [0.2, particle.shape === "circle" ? 0.8 : 0.6, 0.4, 0.2],
              rotate: particle.shape === "triangle" || particle.shape === "diamond" ? [0, 180, 360, 0] : [0, 0, 0, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        );
      })}

      {/* Add CSS for triangle clip path - fixed style tag */}
      <style>
        {`.clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }`}
      </style>
    </>
  );
}
