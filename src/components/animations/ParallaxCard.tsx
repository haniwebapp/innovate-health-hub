
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState } from "react";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  onHover?: () => void;
}

export function ParallaxCard({ 
  children, 
  className = "", 
  depth = 20,
  onHover
}: ParallaxCardProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 25 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  
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
        z: 20, 
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
