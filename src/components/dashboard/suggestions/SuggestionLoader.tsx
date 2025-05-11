
import { motion } from "framer-motion";

interface SuggestionLoaderProps {
  index: number;
}

export function SuggestionLoader({ index }: SuggestionLoaderProps) {
  // Animation variants for shimmer effect
  const shimmerAnimation = {
    initial: { left: "-100%" },
    animate: { 
      left: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }
    }
  };

  return (
    <div key={index} className="border-b pb-3 last:border-0">
      <div className="flex items-start mb-2">
        <div className="w-full">
          <div className="h-4 bg-moh-lightGreen/50 rounded relative overflow-hidden w-4/5 mb-2">
            <motion.div 
              className="absolute inset-0 bg-shimmer-gradient" 
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
          <div className="h-3 bg-moh-lightGreen/50 rounded relative overflow-hidden w-2/3">
            <motion.div 
              className="absolute inset-0 bg-shimmer-gradient" 
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="h-6 w-20 bg-moh-lightGreen/50 rounded relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-shimmer-gradient" 
            variants={shimmerAnimation}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>
    </div>
  );
}
