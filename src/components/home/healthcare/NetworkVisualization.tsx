
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
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64"
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="fill-none">
        {/* Network connections */}
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
        
        {/* Animated path 1 */}
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
        
        {/* Animated path 2 */}
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
        
        {/* Central circle */}
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
      </svg>
    </motion.div>
  );
}
