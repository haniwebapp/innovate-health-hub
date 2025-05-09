import { useRef } from "react";
import { motion, useInView } from "framer-motion";
interface TimelineItemProps {
  children: React.ReactNode;
  isLeft?: boolean;
  index?: number;
  isActive?: boolean; // Is this the current active step
  importance?: 'low' | 'medium' | 'high'; // Importance level
  duration?: number; // For event duration indication
}
export function TimelineItem({
  children,
  isLeft = true,
  index = 0,
  isActive = false,
  importance = 'medium',
  duration
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  // Calculate animation delay based on importance
  const getAnimationDelay = () => {
    const baseDelay = index * 0.2;
    // High importance items appear faster
    if (importance === 'high') return Math.max(0, baseDelay - 0.1);
    // Low importance items appear later
    if (importance === 'low') return baseDelay + 0.1;
    // Medium is default
    return baseDelay;
  };

  // Get node color and size based on item properties
  const getNodeColor = () => {
    if (isActive) return "bg-moh-gold";
    switch (importance) {
      case 'high':
        return "bg-moh-darkGreen";
      case 'low':
        return "bg-moh-lightGreen";
      default:
        return "bg-moh-green";
    }
  };
  const getNodeSize = () => {
    if (isActive) return "w-5 h-5";
    switch (importance) {
      case 'high':
        return "w-5 h-5";
      case 'low':
        return "w-3 h-3";
      default:
        return "w-4 h-4";
    }
  };
  return <motion.div ref={ref} className={`flex items-center relative ${isLeft ? "flex-row" : "flex-row-reverse"}`} initial={{
    opacity: 0,
    x: isLeft ? -20 : 20
  }} animate={inView ? {
    opacity: 1,
    x: 0
  } : {}} transition={{
    duration: 0.5,
    delay: getAnimationDelay(),
    ease: importance === 'high' ? "easeOut" : "easeInOut"
  }}>
      <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}>
        {children}
      </div>
      
      {/* Node with pulsing effect for active items */}
      <div className="relative">
        <motion.div className={`${getNodeSize()} rounded-full ${getNodeColor()} z-10`} initial={{
        scale: 0
      }} animate={inView ? {
        scale: 1
      } : {}} transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: getAnimationDelay() + 0.2
      }} />
        
        {/* Active item pulse effect */}
        {isActive && <motion.div className="absolute top-0 left-0 w-full h-full rounded-full bg-moh-gold/50 z-0" animate={{
        scale: [1, 1.8, 1],
        opacity: [0.6, 0, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }} />}
        
        {/* Duration indicator line if item has duration */}
        {duration && <motion.div className={`absolute h-${Math.min(40, Math.max(4, duration))} w-1 ${isActive ? "bg-moh-gold/40" : "bg-moh-lightGreen/50"} rounded-full z-0`} style={{
        top: '100%',
        left: '50%',
        marginLeft: '-2px'
      }} initial={{
        scaleY: 0,
        transformOrigin: "top"
      }} animate={inView ? {
        scaleY: 1
      } : {
        scaleY: 0
      }} transition={{
        duration: 0.5,
        delay: getAnimationDelay() + 0.3
      }} />}
      </div>
      
      <motion.div initial={{
      scaleX: 0
    }} animate={inView ? {
      scaleX: 1
    } : {}} transition={{
      duration: duration ? Math.min(1.5, 0.5 + duration / 10) : 0.8,
      delay: getAnimationDelay()
    }} className="" />
    </motion.div>;
}