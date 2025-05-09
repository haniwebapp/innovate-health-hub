
import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  tiltFactor?: number;
  perspective?: number;
  scale?: number;
  priority?: 'low' | 'medium' | 'high'; // Data-driven priority
  dataValue?: number; // Any numerical value to influence animation
  interactive?: boolean; // Whether card should show interactive effects
}

export function ParallaxCard({
  children,
  className = "",
  tiltFactor = 15,
  perspective = 1000,
  scale = 1.05,
  priority = 'medium',
  dataValue,
  interactive = true
}: ParallaxCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Adjust tilt factor based on priority
  const adjustedTiltFactor = {
    'low': tiltFactor * 0.7,
    'medium': tiltFactor,
    'high': tiltFactor * 1.3
  }[priority];
  
  // Adjust scale based on priority and data value
  const getHoverScale = () => {
    // Base scale from props
    let baseScale = scale;
    
    // Adjust for priority
    if (priority === 'high') baseScale *= 1.02;
    if (priority === 'low') baseScale *= 0.98;
    
    // Adjust for data value if present (normalized to 0-1 range)
    if (dataValue !== undefined) {
      const normalizedValue = Math.min(1, Math.max(0, dataValue / 100));
      baseScale *= (1 + (normalizedValue * 0.03));
    }
    
    return baseScale;
  };
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate cursor position relative to card center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt angles (divide by width/height for normalization)
    const tiltX = (mouseY / (rect.height / 2)) * adjustedTiltFactor;
    const tiltY = -(mouseX / (rect.width / 2)) * adjustedTiltFactor;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const handleMouseEnter = () => interactive && setIsHovering(true);
  
  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovering(false);
      setTilt({ x: 0, y: 0 });
    }
  };
  
  // Create separate animation objects for interactive and non-interactive states
  // to avoid type conflicts
  const nonInteractiveAnimation = !interactive ? {
    y: [0, -5, 0],
    rotateX: tilt.x,
    rotateY: tilt.y,
    scale: 1,
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      ease: "easeInOut" 
    }
  } : undefined;
  
  const interactiveAnimation = interactive ? {
    rotateX: tilt.x,
    rotateY: tilt.y,
    scale: isHovering ? getHoverScale() : 1
  } : undefined;
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d"
      }}
      animate={nonInteractiveAnimation || interactiveAnimation}
      transition={interactive ? {
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.5
      } : undefined}
    >
      {children}
      
      {/* Add data-driven hover effect overlay based on priority */}
      {interactive && (
        <motion.div
          className={`absolute inset-0 pointer-events-none ${
            priority === 'high' 
              ? 'bg-gradient-to-tr from-moh-green/5 to-moh-gold/10' 
              : priority === 'low'
              ? 'bg-gradient-to-tr from-gray-100/5 to-gray-300/5'
              : 'bg-gradient-to-tr from-moh-lightGreen/5 to-moh-lightGold/5'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Add subtle particle effect for high priority cards on hover */}
      {interactive && priority === 'high' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-moh-gold/40"
              initial={{ x: '50%', y: '50%', opacity: 0 }}
              animate={isHovering ? {
                x: `${50 + (Math.random() * 40 - 20)}%`,
                y: `${50 + (Math.random() * 40 - 20)}%`,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                transition: {
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2
                }
              } : {}}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
