
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState } from "react";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  onHover?: () => void;
  priority?: 'low' | 'medium' | 'high';
  dataValue?: number;
}

export function ParallaxCard({ 
  children, 
  className = "", 
  depth = 20,
  onHover,
  priority = 'medium',
  dataValue
}: ParallaxCardProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Adjust depth based on priority
  const adjustedDepth = priority === 'high' ? depth * 1.2 : 
                        priority === 'low' ? depth * 0.8 : 
                        depth;
  
  const mouseX = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 25 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [adjustedDepth, -adjustedDepth]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-adjustedDepth, adjustedDepth]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative position of mouse in element (0-1)
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    if (onHover) onHover();
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  // Check for screen resize to disable effect on mobile
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => onHover && onHover()}
      style={{
        transformStyle: "preserve-3d",
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0
      }}
      whileHover={{ 
        z: dataValue || 20, 
        scale: !isMobile ? 1.05 : 1.02 
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
}
