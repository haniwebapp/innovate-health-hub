
import { motion } from "framer-motion";
import React from "react";
import { Sparkles } from "lucide-react";

export function SparkleEffects() {
  // Array of sparkle configurations for more variety
  const sparkleConfigs = [
    // Original sparkles with slight modifications
    { 
      position: "top-1/4 left-1/5", 
      color: "text-moh-gold/60", 
      size: 8,
      animation: {
        y: [-10, 10, -10],
        opacity: [0.8, 1, 0.8],
        scale: [0.8, 1, 0.8],
      },
      duration: 5,
      delay: 0
    },
    { 
      position: "bottom-1/4 right-1/5", 
      color: "text-moh-green/60", 
      size: 8,
      animation: {
        y: [10, -10, 10],
        opacity: [0.8, 1, 0.8],
        scale: [0.8, 1, 0.8],
      },
      duration: 6,
      delay: 2
    },
    
    // New sparkles with different positions, sizes, and colors
    { 
      position: "top-1/3 right-1/4", 
      color: "text-moh-lightGold/70", 
      size: 6,
      animation: {
        y: [-5, 5, -5],
        x: [3, -3, 3],
        opacity: [0.7, 1, 0.7],
        scale: [0.9, 1.1, 0.9],
      },
      duration: 4,
      delay: 1
    },
    { 
      position: "bottom-1/3 left-1/4", 
      color: "text-moh-lightGreen/70", 
      size: 5,
      animation: {
        y: [8, -4, 8],
        x: [-2, 4, -2],
        opacity: [0.6, 0.9, 0.6],
        scale: [0.7, 1, 0.7],
      },
      duration: 7,
      delay: 0.5
    },
    { 
      position: "top-2/3 right-1/3", 
      color: "text-moh-darkGreen/50", 
      size: 10,
      animation: {
        y: [-8, 12, -8],
        opacity: [0.5, 0.8, 0.5],
        scale: [0.6, 0.9, 0.6],
      },
      duration: 8,
      delay: 3
    },
    { 
      position: "bottom-2/5 left-1/6", 
      color: "text-moh-darkGold/60", 
      size: 7,
      animation: {
        y: [5, -15, 5],
        x: [3, -3, 3],
        opacity: [0.6, 0.9, 0.6],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 15, 0],
      },
      duration: 6.5,
      delay: 2.5
    },
    { 
      position: "top-1/2 right-1/6", 
      color: "text-moh-gold/50", 
      size: 9,
      animation: {
        y: [-7, 7, -7],
        x: [-3, 3, -3],
        opacity: [0.7, 1, 0.7],
        scale: [0.7, 1, 0.7],
        rotate: [0, -10, 0],
      },
      duration: 5.5,
      delay: 1.8
    },
    { 
      position: "bottom-1/6 right-1/3", 
      color: "text-moh-green/70", 
      size: 6,
      animation: {
        y: [10, 0, 10],
        opacity: [0.8, 1, 0.8],
        scale: [0.9, 1.2, 0.9],
      },
      duration: 4.5,
      delay: 0.3
    }
  ];

  return (
    <>
      {/* Map through the sparkle configurations to create diverse sparkle effects */}
      {sparkleConfigs.map((config, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className={`absolute ${config.position} block`}
          animate={config.animation}
          transition={{ 
            duration: config.duration, 
            repeat: Infinity, 
            delay: config.delay 
          }}
        >
          <Sparkles className={`${config.color} w-${config.size} h-${config.size}`} />
        </motion.div>
      ))}
      
      {/* Add a few randomly twinkling sparkles with CSS animations instead of motion */}
      <div className="absolute top-1/4 right-1/2 block">
        <Sparkles className="text-moh-gold/40 w-4 h-4 animate-pulse-glow" />
      </div>
      
      <div className="absolute bottom-1/3 right-2/3 block">
        <Sparkles className="text-moh-green/40 w-3 h-3 animate-pulse-glow animation-delay-300" />
      </div>
    </>
  );
}
