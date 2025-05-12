
import { motion } from "framer-motion";
import React from "react";
import { FlaskConical } from "lucide-react";

export function AnimatedFlask() {
  // Generate random bubbles for the animation
  const createBubbles = (count: number, color: string, offset: number = 0) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${color}-bubble-${i}`,
      size: Math.random() * 6 + 2, // 2-8px bubbles
      left: `${Math.random() * 80 + 10}%`, // Position across the flask (10-90%)
      delay: Math.random() * 3 + offset, // Random delay with offset
      duration: Math.random() * 3 + 2, // 2-5s duration
      color: color,
    }));
  };

  // Create gold and green bubbles
  const goldBubbles = createBubbles(10, "bg-moh-gold/80");
  const greenBubbles = createBubbles(8, "bg-moh-green/80", 1.5);
  
  // All bubbles combined
  const allBubbles = [...goldBubbles, ...greenBubbles];

  return (
    <div className="absolute bottom-1/4 left-1/3 lg:block">
      <div className="relative w-16 h-24">
        {/* Flask outline with gradient */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FlaskConical
            size={64}
            className="text-moh-darkGreen"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Liquid container inside the flask */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-14 overflow-hidden rounded-b-xl">
          {/* Gradient liquid background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-moh-lightGold/80 to-moh-lightGreen/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Moving wave effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-moh-gold/40"
            animate={{
              y: [0, -1, 0, 1, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />

          {/* Bubbles */}
          {allBubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className={`absolute rounded-full ${bubble.color}`}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                bottom: "-10%",
              }}
              animate={{
                y: ["0%", "-100%"],
                opacity: [0.7, 0],
                scale: [1, 1.2, 0.8, 0],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-50"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating particles around the flask */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${
              i % 2 === 0 ? "bg-moh-gold/30" : "bg-moh-green/30"
            }`}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 120}%`,
              top: `${Math.random() * 120}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
