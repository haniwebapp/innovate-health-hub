
import { motion } from "framer-motion";

interface DataParticleProps {
  index: number;
  isVisible: boolean;
}

export function DataParticle({ index, isVisible }: DataParticleProps) {
  return (
    <motion.div
      className="absolute bg-moh-lightGold rounded-full w-2 h-2 md:w-3 md:h-3"
      style={{
        left: `${20 + (index * 8)}%`,
        top: `${40 + (Math.sin(index) * 30)}%`
      }}
      animate={isVisible ? {
        x: [0, 10, 0, -10, 0],
        y: [0, -10, 0, 10, 0],
        scale: [1, 1.2, 1, 0.8, 1],
        opacity: [0.6, 1, 0.6]
      } : {}}
      transition={{
        duration: 4,
        delay: index * 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
