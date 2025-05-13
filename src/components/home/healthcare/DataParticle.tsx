
import { motion } from "framer-motion";

interface DataParticleProps {
  index: number;
  isVisible: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  size?: 'small' | 'normal' | 'large';
}

export function DataParticle({ 
  index, 
  isVisible,
  speed = 'normal',
  size = 'normal'
}: DataParticleProps) {
  // Data-driven speed factors
  const speedFactor = {
    slow: 1.5,
    normal: 1,
    fast: 0.6
  }[speed];
  
  // Data-driven size
  const particleSize = {
    small: 'w-1.5 h-1.5',
    normal: 'w-2 h-2',
    large: 'w-3 h-3'
  }[size];
  
  // Calculate random position and path
  const topPos = 10 + Math.random() * 80;
  const leftPos = 10 + Math.random() * 80;
  const xOffset = -30 + Math.random() * 60;
  const yOffset = -30 + Math.random() * 60;
  
  // Get particle color based on index using MOH colors
  const getParticleColor = () => {
    // Alternate between MOH Green and MOH Gold
    const colors = [
      'bg-moh-green/80',   // MOH Green with 80% opacity
      'bg-moh-gold/80'    // MOH Gold with 80% opacity
    ];
    
    // Fast particles get brighter colors
    if (speed === 'fast') {
      return colors[index % colors.length].replace('/80', '/100');
    }
    
    // Slow particles get more transparent colors
    if (speed === 'slow') {
      return colors[index % colors.length].replace('/80', '/60');
    }
    
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className={`absolute rounded-full ${particleSize} ${getParticleColor()}`}
      style={{
        top: `${topPos}%`,
        left: `${leftPos}%`,
        boxShadow: "0 0 6px currentColor",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? {
        x: [0, xOffset, 0],
        y: [0, yOffset, 0],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0]
      } : {}}
      transition={{
        duration: 4 * speedFactor,
        delay: index * 0.5 * speedFactor,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    />
  );
}
