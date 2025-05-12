
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  // Show indicator only after scrolling starts
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setIsVisible(value > 0.01);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <>
      {/* Top progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-moh-green via-moh-gold to-moh-green z-50 origin-left"
        style={{ 
          scaleX,
          opacity: isVisible ? 1 : 0 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Discrete progress points for larger screens */}
      <div className="fixed top-1/4 right-4 h-1/2 hidden lg:flex flex-col justify-between z-40 items-center">
        {[0, 0.25, 0.5, 0.75, 1].map((target, index) => (
          <motion.div 
            key={index}
            className="w-2 h-2 rounded-full bg-white/20 relative"
            style={{
              borderWidth: 1,
              borderColor: scrollYProgress.get() >= target ? "#C3A86B" : "transparent"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-moh-gold"
              initial={{ scale: 0 }}
              animate={{ 
                scale: scrollYProgress.get() >= target ? 1 : 0,
                opacity: scrollYProgress.get() >= target ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
        <motion.div 
          className="absolute inset-y-0 w-0.5 bg-white/10 -z-10"
        />
      </div>
      
      {/* Mobile scroll indicator */}
      <motion.div 
        className="fixed bottom-4 right-4 h-16 w-2 bg-gray-200/20 rounded-full overflow-hidden lg:hidden z-50"
        animate={{ opacity: isVisible ? [0, 1, 1, 1, 0] : 0 }}
        transition={{ 
          duration: 3,
          times: [0, 0.1, 0.5, 0.9, 1],
          repeat: isVisible ? Infinity : 0,
          repeatDelay: 5
        }}
      >
        <motion.div 
          className="w-full bg-gradient-to-t from-moh-green to-moh-gold rounded-full"
          style={{ 
            height: scrollYProgress, 
            transformOrigin: "bottom" 
          }}
        />
      </motion.div>
    </>
  );
};
