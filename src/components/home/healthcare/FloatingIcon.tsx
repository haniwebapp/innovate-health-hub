
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
  pulseIntensity?: 'low' | 'medium' | 'high'; // Added this prop
}

export function FloatingIcon({ 
  icon: Icon, 
  color, 
  position, 
  animationDelay, 
  isVisible,
  pulseIntensity = 'medium'  // Default value
}: FloatingIconProps) {
  // Get the pulse scale based on intensity
  const getPulseScale = () => {
    switch (pulseIntensity) {
      case 'low': return [1, 1.05, 1];
      case 'high': return [1, 1.2, 1];
      default: return [1, 1.1, 1];
    }
  };

  // Get the pulse opacity based on intensity
  const getPulseOpacity = () => {
    switch (pulseIntensity) {
      case 'low': return [0.6, 0.8, 0.6];
      case 'high': return [0.7, 1, 0.7];
      default: return [0.7, 0.9, 0.7];
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: animationDelay * 0.3
        }
      } : { opacity: 0, y: 20 }}
      className="absolute"
      style={position}
    >
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
        className="bg-white p-3 md:p-4 rounded-full shadow-lg relative"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        <motion.div 
          animate={isVisible ? {
            scale: getPulseScale(),
            opacity: getPulseOpacity(),
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
        </motion.div>
        
        {/* Add a soft glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            zIndex: -1
          }}
          animate={isVisible ? {
            scale: getPulseScale().map(s => s * 1.1),
            opacity: getPulseOpacity()
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
