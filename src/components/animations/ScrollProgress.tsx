
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-moh-green via-moh-gold to-moh-green z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      {/* Height indicator (only visible when scrolling) */}
      <motion.div 
        className="fixed bottom-4 right-4 h-16 w-2 bg-gray-200/20 rounded-full overflow-hidden z-50"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 2,
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        <motion.div 
          className="w-full bg-moh-green rounded-full"
          style={{ 
            height: scrollYProgress, 
            transformOrigin: "bottom" 
          }}
        />
      </motion.div>
    </>
  );
};
