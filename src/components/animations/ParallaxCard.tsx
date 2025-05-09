
import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  tiltFactor?: number;
  perspective?: number;
  scale?: number;
}

export function ParallaxCard({
  children,
  className = "",
  tiltFactor = 15,
  perspective = 1000,
  scale = 1.05
}: ParallaxCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate cursor position relative to card center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt angles (divide by width/height for normalization)
    const tiltX = (mouseY / (rect.height / 2)) * tiltFactor;
    const tiltY = -(mouseX / (rect.width / 2)) * tiltFactor;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };
  
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
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.5
      }}
    >
      {children}
    </motion.div>
  );
}
