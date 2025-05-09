
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingIconProps {
  icon: LucideIcon;
  color: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform: string;
  };
  animationDelay: number;
  isVisible: boolean;
}

export function FloatingIcon({ 
  icon: Icon, 
  color, 
  position, 
  animationDelay, 
  isVisible 
}: FloatingIconProps) {
  return (
    <motion.div 
      animate={isVisible ? {
        y: [0, -15, 0],
        transition: {
          duration: 3 + animationDelay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      } : {}}
      className="absolute bg-white p-3 md:p-4 rounded-full shadow-lg"
      style={position}
    >
      <motion.div 
        animate={isVisible ? {
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
      </motion.div>
    </motion.div>
  );
}
