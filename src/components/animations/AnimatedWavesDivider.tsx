
import React from "react";
import { motion } from "framer-motion";

interface AnimatedWavesDividerProps {
  className?: string;
  direction?: "top" | "bottom";
  color?: string;
  secondaryColor?: string;
  animate?: boolean;
}

export function AnimatedWavesDivider({ 
  className = "", 
  direction = "bottom", 
  color = "text-white",
  secondaryColor = "text-moh-lightGreen",
  animate = true 
}: AnimatedWavesDividerProps) {
  // Set attributes based on direction
  const rotation = direction === "top" ? "rotate-180" : "";
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className={`w-full ${rotation}`}>
        <motion.div
          initial={animate ? { y: 10 } : false}
          animate={animate ? { y: [-6, 6, -6] } : false}
          transition={animate ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : {}}
          className="relative z-10"
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 md:h-24 ${color}`}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81"></path>
          </svg>
        </motion.div>

        <motion.div
          initial={animate ? { y: -10 } : false}
          animate={animate ? { y: [6, -6, 6] } : false}
          transition={animate ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : {}}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 md:h-24 ${secondaryColor} opacity-50`}>
            <path d="M85.39,98.44c52-3.79,104.16-12.13,162-16.86,82.39-6.72,148.19-5.73,230.45,7.61C523.78,101,606.67,112,685.66,100.83c70.05-10.52,146.53-24.09,214.34-49.09V120H0V99.8C29.71,97.92,50.83,100.41,85.39,98.44"></path>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
