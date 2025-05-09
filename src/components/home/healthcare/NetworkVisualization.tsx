
import { motion } from "framer-motion";

interface NetworkVisualizationProps {
  isVisible: boolean;
}

export function NetworkVisualization({ isVisible }: NetworkVisualizationProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72"
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="fill-none">
        {/* Base network connections */}
        <motion.path 
          d="M100,20 L60,80 L100,180 L140,80 Z" 
          stroke="#E5DEFF"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.path 
          d="M60,80 L140,80" 
          stroke="#D3E4FD"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        <motion.path 
          d="M40,60 C60,100 140,100 160,60" 
          stroke="#E5DEFF"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        
        {/* Animated paths */}
        <motion.path 
          d="M100,20 C130,50 130,150 100,180" 
          stroke="#9b87f5"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.path 
          d="M140,80 C110,50 110,150 60,80" 
          stroke="#33C3F0"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.path 
          d="M40,60 C80,110 120,90 160,60" 
          stroke="#4AAF46"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Pulse circles at connection points */}
        {[
          { cx: 100, cy: 20, r: 3, color: "#9b87f5", delay: 0 },
          { cx: 60, cy: 80, r: 3, color: "#33C3F0", delay: 0.5 },
          { cx: 140, cy: 80, r: 3, color: "#4AAF46", delay: 1 },
          { cx: 100, cy: 180, r: 3, color: "#C3A86B", delay: 1.5 }
        ].map((circle, i) => (
          <motion.circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={circle.color}
            initial={{ scale: 0 }}
            animate={isVisible ? {
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            } : { scale: 0 }}
            transition={{
              duration: 2,
              delay: circle.delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* Central circle with pulse effect */}
        <motion.circle 
          cx="100" 
          cy="100" 
          r="20" 
          fill="#7E69AB"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        <motion.circle 
          cx="100" 
          cy="100" 
          r="15" 
          fill="#6E59A5"
          animate={isVisible ? {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Central pulse effect */}
        <motion.circle
          cx="100"
          cy="100"
          r="5"
          fill="white"
          animate={isVisible ? {
            scale: [1, 3, 1],
            opacity: [0.8, 0, 0.8]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity
          }}
        />
      </svg>
    </motion.div>
  );
}
