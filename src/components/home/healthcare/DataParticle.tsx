
import { motion } from "framer-motion";

interface DataParticleProps {
  index: number;
  isVisible: boolean;
}

export function DataParticle({ index, isVisible }: DataParticleProps) {
  // Create a variety of colors for the data particles based on index
  const colors = ["#00814A", "#C3A86B", "#33C3F0", "#9b87f5", "#4AAF46"];
  const particleColor = colors[index % colors.length];
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${20 + (index * 8)}%`,
        top: `${40 + (Math.sin(index) * 30)}%`,
        width: index % 3 === 0 ? "8px" : "6px",
        height: index % 3 === 0 ? "8px" : "6px",
        background: particleColor,
        boxShadow: `0 0 6px ${particleColor}`
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? {
        x: [0, 10, 0, -10, 0],
        y: [0, -10, 0, 10, 0],
        scale: [1, 1.2, 1, 0.8, 1],
        opacity: [0.6, 1, 0.6]
      } : { opacity: 0, scale: 0 }}
      transition={{
        duration: 4 + (index % 3),
        delay: index * 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
