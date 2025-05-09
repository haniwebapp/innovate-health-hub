
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineItemProps {
  children: React.ReactNode;
  isLeft?: boolean;
  index?: number;
}

export function TimelineItem({ children, isLeft = true, index = 0 }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className={`flex items-center relative ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}>
        {children}
      </div>
      
      <motion.div 
        className="w-4 h-4 rounded-full bg-moh-green z-10"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.2 + 0.2 }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-moh-lightGreen z-0"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      />
    </motion.div>
  );
}
